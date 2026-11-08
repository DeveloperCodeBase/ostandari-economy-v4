/* Focused, dependency-free application DOM QA; jsdom is the test-only dependency.
 * Run: npm test, or node tests/dom-qa.cjs [path/to/dist]
 * Does not start a server/browser or contact a network service.
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const dist = process.argv[2] || path.resolve(__dirname, '../dist');
const root = path.resolve(__dirname, '../test-results');
fs.mkdirSync(root, { recursive: true });
const key = 'glassy-crm-v1';
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<link\b[^>]*>/gi, '');
const sources = ['data.js', 'charts.js', 'app.js'].map(name => [name, fs.readFileSync(path.join(dist, name), 'utf8')]);
const allEnvironments = [];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function boot({ width = 1440, route = 'overview', saved } = {}) {
  const runtimeErrors = [], network = [], downloads = [], blobs = new Map();
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => runtimeErrors.push(error.stack || String(error)));
  const dom = new JSDOM(html, { url: 'https://glassy.test/#' + route, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
  const w = dom.window;
  Object.defineProperty(w, 'innerWidth', { value: width, configurable: true, writable: true });
  w.scrollTo = () => {};
  w.Blob = Blob;
  w.URL.createObjectURL = blob => { const id = 'blob:qa-' + blobs.size; blobs.set(id, blob); return id; };
  w.URL.revokeObjectURL = () => {};
  w.HTMLAnchorElement.prototype.click = function () { downloads.push({ filename: this.download, href: this.href, blob: blobs.get(this.href) }); };
  w.fetch = (...args) => { network.push(['fetch', ...args]); throw new Error('Unexpected network fetch'); };
  w.XMLHttpRequest.prototype.open = function (...args) { network.push(['xhr', ...args]); throw new Error('Unexpected XHR'); };
  w.WebSocket = function (...args) { network.push(['websocket', ...args]); throw new Error('Unexpected WebSocket'); };
  w.navigator.sendBeacon = (...args) => { network.push(['beacon', ...args]); return false; };
  w.addEventListener('error', e => { runtimeErrors.push(e.error?.stack || e.message); e.preventDefault(); });
  w.addEventListener('unhandledrejection', e => runtimeErrors.push(String(e.reason)));
  if (saved) w.localStorage.setItem(key, typeof saved === 'string' ? saved : JSON.stringify(saved));
  for (const [name, source] of sources) w.eval(source + '\n//# sourceURL=' + name);
  const env = {
    dom, w, d: w.document, runtimeErrors, network, downloads,
    $: selector => w.document.querySelector(selector),
    $$: selector => [...w.document.querySelectorAll(selector)],
    state: () => w.GlassyCRM.getState(),
    saved: () => JSON.parse(w.localStorage.getItem(key)),
    text: selector => w.document.querySelector(selector)?.textContent.replace(/\s+/g, ' ').trim(),
    click(selector) { const el = this.$(selector); assert.ok(el, 'Missing click target ' + selector); el.click(); return el; },
    async nav(routeName) { this.click('[data-nav="' + routeName + '"]'); await wait(25); },
    async search(query) { const el = this.$('#global-search'); el.value = query; el.dispatchEvent(new w.Event('input', { bubbles: true })); await wait(120); },
    submit(selector) { const el = this.$(selector); assert.ok(el, 'Missing form ' + selector); el.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })); },
    async resize(size) { w.innerWidth = size; w.dispatchEvent(new w.Event('resize')); await wait(130); },
    escape() { w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); },
    close() { dom.window.close(); }
  };
  allEnvironments.push(env);
  return env;
}
const tests = [];
function test(name, fn) { tests.push({ name, fn }); }

test('All five routes populate complete card layouts, accessible navigation and valid chart markup', async () => {
  const e = boot();
  const cards = { overview: 8, orders: 6, ecosystem: 8, customers: 6, performance: 4 };
  for (const route of Object.keys(cards)) {
    await e.nav(route);
    assert.equal(e.state().route, route);
    assert.equal(e.$$('#page-content .card').length, cards[route], route + ' complete cards');
    assert.equal(e.$$('.nav-item[aria-current="page"]').length, 1);
    assert.equal(e.$('.nav-item[aria-current="page"]').dataset.nav, route);
    assert.ok(e.text('#page-title').length > 5);
    assert.ok(e.$$('#page-content svg.chart-svg').length > 0, route + ' charts');
    assert.doesNotMatch(e.$('#page-content').innerHTML, /\b(?:NaN|Infinity|undefined)\b/);
    const ids = e.$$('#page-content [id]').map(el => el.id);
    assert.equal(new Set(ids).size, ids.length, route + ' unique chart IDs');
  }
  e.close();
});

test('Search opens the selected order detail and navigates by metric; keyboard search focus works', async () => {
  const e = boot();
  e.d.dispatchEvent(new e.w.KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
  assert.equal(e.d.activeElement.id, 'global-search');
  await e.search('Sophia');
  assert.equal(e.$('#search-results').hidden, false);
  assert.ok(e.$$('#search-results button').length >= 2);
  e.click('#search-results [data-action="order:ORD-8942"]');
  assert.equal(e.text('#modal-title'), 'Order details');
  assert.match(e.text('#modal'), /Sophia Reynolds/);
  assert.equal(e.$('#search-results').hidden, true);
  e.escape();
  await e.search('Net profit');
  e.click('#search-results [data-action="metric:Net profit"]');
  await wait(25);
  assert.equal(e.state().route, 'performance');
  assert.equal(e.$('#search-results').hidden, true);
  await e.search('unmatchable-qa-827381');
  assert.equal(e.$$('#search-results button').length, 0);
  assert.match(e.text('#search-results'), /No results found/);
  e.close();
});

test('Order filters, dispatch queue updates and persisted dispatch state', async () => {
  const e = boot({ route: 'orders' });
  assert.equal(e.$$('.order-row').length, 4);
  e.click('[data-filter="pending"]'); assert.equal(e.$$('.order-row').length, 4);
  e.click('[data-filter="shipped"]'); assert.equal(e.$$('.order-row').length, 0);
  e.click('[data-action="dispatch"]');
  assert.equal(e.$$('.order-row').length, 3);
  assert.ok(e.$$('.order-row').every(el => /Shipped/.test(el.textContent)));
  assert.equal(e.$('[data-action="dispatch"]').disabled, true);
  e.click('[data-filter="pending"]');
  assert.equal(e.$$('.order-row').length, 1);
  assert.match(e.text('.order-row'), /Backorder/);
  assert.equal(e.saved().dispatched, true);
  const persisted = e.saved(); e.close();
  const reloaded = boot({ route: 'orders', saved: persisted });
  assert.equal(reloaded.$$('.order-row').filter(el => /Shipped/.test(el.textContent)).length, 3);
  assert.equal(reloaded.$('[data-action="dispatch"]').disabled, true);
  assert.match(reloaded.text('.kpi-row'), /94 ord/);
  reloaded.close();
});

test('Integration switches update telemetry and survive a reload, including zero enabled', async () => {
  const e = boot({ route: 'ecosystem' });
  assert.equal(e.$$('[data-integration][aria-checked="true"]').length, 5);
  assert.match(e.text('.telemetry-legend'), /650k/);
  e.click('[data-integration="5"]');
  assert.equal(e.$('[data-integration="5"]').getAttribute('aria-checked'), 'true');
  assert.match(e.text('.telemetry-legend'), /780k/);
  assert.equal(e.saved().connections[5], true);
  for (let index = 0; index < 6; index++) e.click('[data-integration="' + index + '"]');
  assert.equal(e.$$('[data-integration][aria-checked="true"]').length, 0);
  assert.match(e.text('.telemetry-legend'), /0k/);
  assert.match(e.text('.telemetry-legend'), /Disconnected/);
  assert.doesNotMatch(e.$('#page-content').innerHTML, /\b(?:NaN|Infinity)\b/);
  const persisted = e.saved(); e.close();
  const reloaded = boot({ route: 'ecosystem', saved: persisted });
  assert.equal(reloaded.$$('[data-integration][aria-checked="true"]').length, 0);
  reloaded.close();
});

test('Quarter changes update KPI/ledger values and PDF contains the selected quarter', async () => {
  const e = boot({ route: 'performance' });
  assert.match(e.text('.executive-kpis'), /\$482\.9k/);
  e.click('[data-quarter="1"]');
  assert.match(e.text('.executive-kpis'), /\$356\.1k/);
  assert.match(e.text('.executive-kpis'), /28\.1%/);
  assert.match(e.text('.ledger-net'), /\$100\.1k/);
  assert.equal(e.saved().quarter, 1);
  e.click('[data-quarter="4"]');
  assert.match(e.text('.executive-kpis'), /\$526\.8k/);
  assert.match(e.text('.ledger-net'), /\$174\.9k/);
  assert.doesNotMatch(e.text('.finance-middle .chart-box'), /\$98000k/);
  e.click('[data-action="export-pdf"]');
  const download = e.downloads.at(-1);
  assert.equal(download.filename, 'glassy-crm-performance-Q4.pdf');
  assert.equal(download.blob.type, 'application/pdf');
  const buffer = Buffer.from(await download.blob.arrayBuffer());
  const pdf = buffer.toString('ascii');
  assert.ok(pdf.startsWith('%PDF-1.4'));
  assert.ok(pdf.endsWith('%%EOF'));
  assert.match(pdf, /Quarter 4/);
  assert.match(pdf, /\$526,800/);
  assert.match(pdf, /\$174,900/);
  assert.doesNotMatch(pdf, /\$482,900/);
  const xrefOffset = Number(pdf.match(/startxref\n(\d+)/)[1]);
  assert.equal(pdf.slice(xrefOffset, xrefOffset + 4), 'xref');
  fs.writeFileSync(path.join(root, 'qa-performance-Q4.pdf'), buffer);
  e.close();
});

test('Profile hostile markup is escaped in greeting, form value and persisted reload', async () => {
  const e = boot();
  const payload = '<img src=x onerror="window.pwned=1">';
  e.click('#profile-button');
  e.$('#profile-form [name="displayName"]').value = payload;
  e.submit('#profile-form');
  assert.ok(e.text('#page-title').includes(payload));
  assert.equal(e.$$('#page-title img').length, 0);
  assert.equal(e.w.pwned, undefined);
  e.click('#profile-button');
  assert.equal(e.$('#profile-form [name="displayName"]').value, payload);
  assert.equal(e.$$('#profile-form [onerror]').length, 0);
  const persisted = e.saved(); e.close();
  const reloaded = boot({ saved: persisted });
  assert.ok(reloaded.text('#page-title').includes(payload));
  assert.equal(reloaded.$$('#page-title img').length, 0);
  reloaded.close();
});

test('Draft create/edit/delete persists safely with no network calls', async () => {
  const e = boot({ route: 'customers' });
  e.click('[data-action="compose"]');
  e.$('#compose-form [name="to"]').value = 'sophia@example.com';
  e.$('#compose-form [name="subject"]').value = '<svg onload="window.pwned=1">';
  e.$('#compose-form [name="message"]').value = 'Hello <img src=x onerror="window.pwned=1">\nSecond line';
  e.submit('#compose-form');
  assert.equal(e.saved().drafts.length, 1);
  assert.equal(e.$$('.message-card').length, 1);
  assert.equal(e.$$('.message-card [onload], .message-card [onerror]').length, 0);
  const id = e.saved().drafts[0].id;
  e.click('[data-action="draft:' + id + '"]');
  e.$('#compose-form [name="message"]').value += ' updated';
  e.submit('#compose-form');
  assert.equal(e.saved().drafts.length, 1);
  assert.match(e.saved().drafts[0].message, /updated$/);
  e.click('[data-action="delete-draft:' + id + '"]');
  assert.equal(e.saved().drafts.length, 0);
  assert.equal(e.$$('.message-card').length, 0);
  assert.equal(e.network.length, 0);
  e.close();
});

test('Mark all notifications read updates modal, toolbar dot and sidebar badge', async () => {
  const e = boot();
  e.click('#notifications-button');
  assert.equal(e.$$('.notification-item.unread').length, 2);
  e.click('[data-action="mark-read"]');
  assert.equal(e.$$('.notification-item.unread').length, 0);
  assert.equal(e.$('#notification-dot').hidden, true);
  assert.equal(e.$$('.nav-count').length, 0);
  assert.equal(e.saved().notificationsRead, true);
  assert.equal(e.$('[data-action="mark-read"]').disabled, true);
  e.close();
});

test('Settings update wallpaper, reduced motion and persisted sidebar choice', async () => {
  const e = boot();
  e.click('#settings-button');
  e.click('[data-wallpaper-choice="aurora"]');
  assert.equal(e.d.body.dataset.wallpaper, 'aurora');
  assert.equal(e.$('[data-wallpaper-choice="aurora"]').getAttribute('aria-pressed'), 'true');
  e.click('[data-setting="reduceMotion"]');
  assert.equal(e.d.body.dataset.reduceMotion, 'true');
  assert.equal(e.$('[data-setting="reduceMotion"]').getAttribute('aria-checked'), 'true');
  e.click('[data-setting="collapsed"]');
  assert.equal(e.$('#workspace').dataset.collapsed, 'true');
  assert.equal(e.saved().reduceMotion, true);
  assert.equal(e.saved().wallpaper, 'aurora');
  assert.equal(e.saved().collapsed, true);
  e.escape();
  assert.equal(e.$('#workspace').inert, false);
  e.close();
});

test('Collapsed desktop/mobile transitions, drawer close and modal focus return', async () => {
  const e = boot();
  e.click('#sidebar-toggle');
  assert.equal(e.$('#workspace').dataset.collapsed, 'true');
  await e.resize(390);
  assert.equal(e.$('#workspace').dataset.collapsed, 'false');
  assert.equal(e.$('#sidebar').inert, true);
  e.click('#mobile-menu');
  assert.equal(e.$('#workspace').classList.contains('mobile-open'), true);
  assert.equal(e.$('#sidebar').inert, false);
  await e.nav('orders');
  assert.equal(e.$('#workspace').classList.contains('mobile-open'), false);
  assert.equal(e.$('#sidebar').inert, true);
  await e.resize(360);
  e.click('#mobile-menu');
  e.escape();
  assert.equal(e.$('#mobile-menu').getAttribute('aria-expanded'), 'false');
  assert.equal(e.d.activeElement.id, 'mobile-menu');
  e.click('#mobile-menu');
  e.$('[data-nav="messages"]').focus();
  e.click('[data-nav="messages"]');
  await wait(25);
  assert.equal(e.$('#modal-backdrop').hidden, false);
  assert.equal(e.$('#workspace').inert, true);
  assert.equal(e.$('#workspace').classList.contains('mobile-open'), false);
  e.escape();
  assert.equal(e.d.activeElement.id, 'mobile-menu');
  assert.equal(e.$('#sidebar').inert, true);
  await e.resize(1440);
  assert.equal(e.$('#sidebar').inert, false);
  assert.equal(e.$('#workspace').dataset.collapsed, 'true');
  e.close();
});

test('Persian lang/dir and all translated view headings survive navigation/reload', async () => {
  const e = boot();
  e.click('#language-button');
  assert.equal(e.d.documentElement.lang, 'fa');
  assert.equal(e.d.documentElement.dir, 'rtl');
  for (const route of ['overview', 'orders', 'ecosystem', 'customers', 'performance']) {
    await e.nav(route);
    assert.match(e.text('#page-title'), /[\u0600-\u06ff]/);
    assert.ok(e.$$('#page-content bdi').length > 0);
    assert.doesNotMatch(e.$('#page-content').innerHTML, /\b(?:NaN|undefined)\b/);
  }
  const persisted = e.saved(); e.close();
  const reloaded = boot({ width: 390, saved: persisted });
  assert.equal(reloaded.d.documentElement.dir, 'rtl');
  assert.equal(reloaded.d.documentElement.lang, 'fa');
  assert.equal(reloaded.$('#sidebar').inert, true);
  reloaded.close();
});

(async () => {
  const results = [];
  for (const { name, fn } of tests) {
    const start = Date.now();
    try { await fn(); results.push({ name, status: 'passed', ms: Date.now() - start }); }
    catch (error) { results.push({ name, status: 'failed', error: error.stack, ms: Date.now() - start }); }
  }
  const runtimeErrors = allEnvironments.flatMap(e => e.runtimeErrors);
  const networkCalls = allEnvironments.flatMap(e => e.network);
  allEnvironments.forEach(e => { try { e.close(); } catch {} });
  const report = { generatedAt: new Date().toISOString(), dist, environment: 'jsdom; no layout or browser rendering claims', passed: results.filter(r => r.status === 'passed').length, failed: results.filter(r => r.status === 'failed').length, runtimeErrors, networkCalls, results };
  fs.writeFileSync(path.join(root, 'dom-qa-results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.failed || runtimeErrors.length || networkCalls.length ? 1 : 0;
})();
