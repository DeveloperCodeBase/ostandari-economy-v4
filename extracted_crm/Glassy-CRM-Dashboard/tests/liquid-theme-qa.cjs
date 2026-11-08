/* Liquid Glass update: state and interaction QA only.
 * Does not start a browser/server, load network resources, or assert visual layout.
 * Run: NODE_PATH=/tmp/glassy-crm-qa/node_modules node reference/liquid-theme-qa.cjs [dist] [--standalone]
 * Run the standalone portion after rebuilding: node reference/liquid-theme-qa.cjs [dist] --standalone-only
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
let jsdom;
try { jsdom = require('jsdom'); }
catch { jsdom = require('/tmp/glassy-crm-qa/node_modules/jsdom'); }
const { JSDOM, VirtualConsole } = jsdom;
const args = process.argv.slice(2);
const projectDist = path.join(__dirname, '../dist');
const defaultDist = fs.existsSync(path.join(projectDist, 'index.html')) ? projectDist : path.join(__dirname, '../glassy-crm/dist');
const dist = path.resolve(args.find(arg => !arg.startsWith('--')) || defaultDist);
const includeStandalone = args.includes('--standalone') || args.includes('--standalone-only');
const onlyStandalone = args.includes('--standalone-only');
const key = 'glassy-crm-v1';
const routes = ['overview', 'orders', 'ecosystem', 'customers', 'performance'];
const expectedCards = { overview: 8, orders: 6, ecosystem: 8, customers: 6, performance: 4 };
const environments = [];
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const json = value => JSON.parse(JSON.stringify(value));

function boot({ width = 1440, saved, scheme = 'dark', matchMedia = true, route = 'overview', deniedStorage = false, standalone = false, fileOrigin = false } = {}) {
  const runtimeErrors = [], cssParseWarnings = [], networkCalls = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => {
    if (/Could not parse CSS stylesheet/.test(error.message)) cssParseWarnings.push(error.message);
    else runtimeErrors.push(error.stack || error.message);
  });
  const filename = standalone ? 'Glassy-Dashboard.html' : 'index.html';
  const sourceHtml = fs.readFileSync(path.join(dist, filename), 'utf8');
  const scripts = [];
  const inertHtml = sourceHtml.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attrs, code) => {
    const src = attrs.match(/\bsrc=["']([^"']+)["']/i);
    scripts.push(src ? [src[1], fs.readFileSync(path.join(dist, src[1]), 'utf8')] : ['inline-' + scripts.length, code]);
    return '';
  }).replace(/<link\b[^>]*>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const dom = new JSDOM(standalone ? sourceHtml : inertHtml, {
    url: fileOrigin ? 'file:///Glassy-Dashboard.html#' + route : 'https://liquid-glass.test/#' + route,
    runScripts: standalone ? 'dangerously' : 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(w) {
      Object.defineProperty(w, 'innerWidth', { value: width, configurable: true, writable: true });
      w.scrollTo = () => {};
      w.URL.createObjectURL = () => 'blob:liquid-qa';
      w.URL.revokeObjectURL = () => {};
      if (matchMedia) w.matchMedia = query => {
        const color = query.match(/prefers-color-scheme\s*:\s*(light|dark)/);
        return {
          media: query,
          matches: color ? color[1] === scheme : /prefers-reduced-motion/.test(query) ? false : /pointer:\s*fine|hover:\s*hover/.test(query),
          onchange: null,
          addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; }
        };
      };
      w.fetch = (...values) => { networkCalls.push(['fetch', ...values]); throw new Error('Unexpected network call'); };
      w.XMLHttpRequest.prototype.open = function (...values) { networkCalls.push(['xhr', ...values]); throw new Error('Unexpected network call'); };
      w.WebSocket = function (...values) { networkCalls.push(['websocket', ...values]); throw new Error('Unexpected network call'); };
      w.navigator.sendBeacon = (...values) => { networkCalls.push(['beacon', ...values]); return false; };
      w.addEventListener('error', event => { runtimeErrors.push(event.error?.stack || event.message); event.preventDefault(); });
      w.addEventListener('unhandledrejection', event => runtimeErrors.push(String(event.reason)));
      if (saved !== undefined && !fileOrigin) w.localStorage.setItem(key, typeof saved === 'string' ? saved : JSON.stringify(saved));
      if (deniedStorage) {
        Object.defineProperty(w, 'localStorage', { configurable: true, get() { throw new w.DOMException('Storage blocked for QA', 'SecurityError'); } });
      }
    }
  });
  const w = dom.window, d = w.document;
  if (!standalone) for (const [name, source] of scripts) w.eval(source + '\n//# sourceURL=' + name);
  const e = {
    dom, w, d, runtimeErrors, cssParseWarnings, networkCalls,
    $: selector => d.querySelector(selector),
    $$: selector => [...d.querySelectorAll(selector)],
    state: () => json(w.GlassyCRM.getState()),
    saved: () => JSON.parse(w.localStorage.getItem(key)),
    click(selector) { const element = this.$(selector); assert.ok(element, 'Missing control: ' + selector); element.click(); return element; },
    async nav(routeName) { w.GlassyCRM.navigate(routeName); await pause(12); },
    escape() { d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); },
    async resize(newWidth) { w.innerWidth = newWidth; w.dispatchEvent(new w.Event('resize')); await pause(130); },
    close() { dom.window.close(); }
  };
  environments.push(e);
  return e;
}

function expectTheme(e, theme) {
  assert.equal(e.state().theme, theme, 'Application theme');
  assert.equal(e.d.documentElement.dataset.theme, theme, 'HTML theme');
  assert.equal(e.d.body.dataset.theme, theme, 'Body theme');
  const button = e.$('#theme-button');
  assert.ok(button, 'Toolbar theme switch is present');
  assert.ok(button.getAttribute('aria-label')?.trim(), 'Toolbar switch has an accessible name');
}

const tests = [];
function test(name, fn, standaloneTest = false) {
  if (standaloneTest ? includeStandalone : !onlyStandalone) tests.push({ name, fn });
}

test('First use follows system light/dark and falls back to dark when matchMedia is unavailable', () => {
  for (const scheme of ['light', 'dark']) {
    const e = boot({ scheme }); expectTheme(e, scheme); e.close();
  }
  const e = boot({ matchMedia: false }); expectTheme(e, 'dark'); e.close();
});

test('Explicit toolbar choice toggles in both directions, overrides system preference, and persists', () => {
  for (const initial of ['light', 'dark']) {
    const other = initial === 'light' ? 'dark' : 'light';
    const e = boot({ scheme: other, saved: { theme: initial } });
    expectTheme(e, initial);
    e.click('#theme-button'); expectTheme(e, other); assert.equal(e.saved().theme, other);
    e.click('#theme-button'); expectTheme(e, initial); assert.equal(e.saved().theme, initial);
    const persisted = e.saved(); e.close();
    const reloaded = boot({ scheme: other, saved: persisted }); expectTheme(reloaded, initial); reloaded.close();
  }
});

test('Corrupt or hostile saved themes are rejected without markup execution', () => {
  const invalid = ['{broken', null, [], 17, { theme: '<img src=x onerror="window.qaInjected=1">' }, { theme: '__proto__' }, { theme: {} }, { theme: true }, { theme: 'auto' }];
  for (const saved of invalid) {
    const e = boot({ scheme: 'light', saved });
    expectTheme(e, 'light');
    assert.equal(e.w.qaInjected, undefined);
    assert.equal(e.$$('#theme-button img, #theme-button [onerror]').length, 0);
    e.click('#theme-button'); expectTheme(e, 'dark'); assert.equal(e.saved().theme, 'dark'); e.close();
  }
});

test('Adding theme preserves existing profile, drafts, language, preferences and business demo state', () => {
  const legacy = {
    locale: 'fa', wallpaper: 'aurora', collapsed: true, reduceMotion: true,
    period: 'last', quarter: 4, connections: [false, true, false, true, true, true],
    notificationsRead: true, rewarded: true, dispatched: true, displayName: 'Max — مکس',
    drafts: [{ id: 'legacy-draft-1', to: 'sophia@example.com', subject: 'پیش‌نویس قبلی', message: 'Do not replace this draft.\nخط دوم', date: '2026-10-17' }]
  };
  const e = boot({ scheme: 'dark', saved: legacy });
  for (const [name, value] of Object.entries(legacy)) assert.deepEqual(e.state()[name], value, 'Legacy state ' + name);
  e.click('#theme-button'); expectTheme(e, 'light');
  for (const [name, value] of Object.entries(legacy)) assert.deepEqual(e.saved()[name], value, 'Persisted legacy state ' + name);
  const persisted = e.saved(); e.close();
  const reloaded = boot({ scheme: 'dark', saved: persisted });
  expectTheme(reloaded, 'light');
  for (const [name, value] of Object.entries(legacy)) assert.deepEqual(reloaded.state()[name], value, 'Reloaded state ' + name);
  reloaded.close();
});

test('All five routes render complete cards/charts in both themes and theme switches keep their active route', async () => {
  for (const theme of ['light', 'dark']) {
    const e = boot({ saved: { theme } });
    for (const route of routes) {
      await e.nav(route); expectTheme(e, theme);
      assert.equal(e.state().route, route);
      assert.equal(e.$$('#page-content .card').length, expectedCards[route], route + ' card count');
      assert.ok(e.$$('#page-content .chart-svg').length > 0, route + ' contains charts');
      assert.equal(e.$('.nav-item[aria-current="page"]').dataset.nav, route);
      assert.doesNotMatch(e.$('#page-content').innerHTML, /\b(?:NaN|Infinity|undefined)\b/);
      const ids = e.$$('#page-content [id]').map(element => element.id);
      assert.equal(ids.length, new Set(ids).size, route + ' chart identifiers are unique');
      e.click('#theme-button'); assert.equal(e.state().route, route);
      e.click('#theme-button'); expectTheme(e, theme);
    }
    e.close();
  }
});

test('Settings exposes both theme choices and selected/aria-pressed state stays synchronized', () => {
  const e = boot({ saved: { theme: 'dark' } }); e.click('#settings-button');
  assert.equal(e.$$('.theme-option[data-theme-choice]').length, 2);
  for (const theme of ['light', 'dark', 'light']) {
    e.click('.theme-option[data-theme-choice="' + theme + '"]'); expectTheme(e, theme);
    assert.equal(e.$('#modal-backdrop').hidden, false, 'Settings stays open');
    assert.equal(e.$$('.theme-option[aria-pressed="true"]').length, 1);
    assert.equal(e.$('.theme-option[aria-pressed="true"]').dataset.themeChoice, theme);
    assert.equal(e.saved().theme, theme);
  }
  e.escape(); assert.equal(e.$('#workspace').inert, false); e.close();
});

test('Changing English/Persian and navigating RTL pages preserves the selected theme', async () => {
  const e = boot({ saved: { theme: 'light' } });
  e.click('#language-button'); expectTheme(e, 'light');
  assert.equal(e.d.documentElement.lang, 'fa'); assert.equal(e.d.documentElement.dir, 'rtl');
  for (const route of routes) {
    await e.nav(route); expectTheme(e, 'light');
    assert.match(e.$('#page-title').textContent, /[\u0600-\u06ff]/);
    assert.ok(e.$$('#page-content bdi').length, route + ' bidi isolation remains');
  }
  e.click('#theme-button'); expectTheme(e, 'dark');
  e.click('#language-button'); expectTheme(e, 'dark');
  assert.equal(e.d.documentElement.dir, 'ltr');
  assert.equal(e.saved().theme, 'dark'); assert.equal(e.saved().locale, 'en'); e.close();
});

test('320px/390px drawer inertness, navigation, dismissal and theme controls work in both text directions', async () => {
  for (const width of [320, 390]) for (const locale of ['en', 'fa']) {
    const e = boot({ width, saved: { theme: 'light', locale, collapsed: true } });
    expectTheme(e, 'light');
    assert.equal(e.$('#workspace').dataset.collapsed, 'false');
    assert.equal(e.$('#sidebar').inert, true);
    e.click('#mobile-menu');
    assert.equal(e.$('#mobile-menu').getAttribute('aria-expanded'), 'true');
    assert.equal(e.$('#sidebar').inert, false);
    assert.equal(e.$('#mobile-scrim').classList.contains('visible'), true);
    e.click('[data-nav="orders"]'); await pause(12);
    assert.equal(e.$('#mobile-menu').getAttribute('aria-expanded'), 'false');
    assert.equal(e.$('#sidebar').inert, true);
    assert.equal(e.state().route, 'orders');
    e.click('#theme-button'); expectTheme(e, 'dark');
    e.click('#mobile-menu'); e.escape();
    assert.equal(e.$('#mobile-menu').getAttribute('aria-expanded'), 'false');
    assert.equal(e.d.activeElement.id, 'mobile-menu');
    e.click('#mobile-menu'); e.click('#mobile-scrim');
    assert.equal(e.$('#sidebar').inert, true);
    assert.equal(e.d.documentElement.dir, locale === 'fa' ? 'rtl' : 'ltr'); e.close();
  }
});

test('Resizing through requested phone/tablet/desktop widths preserves theme and desktop sidebar preference', async () => {
  const e = boot({ saved: { theme: 'dark', collapsed: false } });
  for (const width of [320, 360, 390, 768, 820, 1024, 1440]) {
    await e.resize(width); expectTheme(e, 'dark');
    assert.equal(e.$('#workspace').dataset.collapsed, 'false');
    assert.equal(e.$('#sidebar').inert, width <= 760);
  }
  e.click('#sidebar-toggle'); assert.equal(e.state().collapsed, true);
  for (const width of [1024, 820, 768, 390, 320, 1440]) {
    await e.resize(width); expectTheme(e, 'dark');
    assert.equal(e.$('#workspace').dataset.collapsed, String(width > 760));
  }
  e.close();
});

test('Reduced motion and wallpaper survive theme changes, and unavailable storage does not block switching', () => {
  const e = boot({ saved: { theme: 'dark', reduceMotion: true, wallpaper: 'aurora' } });
  e.click('#theme-button'); expectTheme(e, 'light');
  assert.equal(e.d.body.dataset.reduceMotion, 'true');
  assert.equal(e.d.body.dataset.wallpaper, 'aurora');
  assert.equal(e.saved().reduceMotion, true); assert.equal(e.saved().wallpaper, 'aurora'); e.close();
  const denied = boot({ deniedStorage: true, scheme: 'light' });
  expectTheme(denied, 'light'); denied.click('#theme-button'); expectTheme(denied, 'dark');
  denied.click('#theme-button'); expectTheme(denied, 'light'); denied.close();
});

test('Rebuilt standalone contains no external scripts/styles and supports all five routes in both themes', async () => {
  const e = boot({ standalone: true, scheme: 'light' }); await pause(35);
  expectTheme(e, 'light');
  assert.equal(e.$$('script[src], link[rel="stylesheet"]').length, 0);
  assert.ok(e.$$('img').every(image => image.src.startsWith('data:')));
  for (const route of routes) {
    await e.nav(route); assert.equal(e.state().route, route);
    e.click('#theme-button'); expectTheme(e, 'dark');
    assert.equal(e.$$('#page-content .card').length, expectedCards[route]);
    e.click('#theme-button'); expectTheme(e, 'light');
  }
  e.click('#settings-button');
  assert.ok(e.$$('.wallpaper-option img').every(image => image.src.startsWith('data:')));
  assert.equal(e.$$('.theme-option[data-theme-choice]').length, 2); e.close();
}, true);

test('Standalone also opens under a file URL and switches themes when file-origin storage is unavailable', async () => {
  const e = boot({ standalone: true, fileOrigin: true, scheme: 'dark', width: 320 }); await pause(35);
  expectTheme(e, 'dark'); e.click('#theme-button'); expectTheme(e, 'light');
  e.click('#mobile-menu'); assert.equal(e.$('#sidebar').inert, false);
  e.click('[data-nav="performance"]'); await pause(20);
  assert.equal(e.state().route, 'performance'); expectTheme(e, 'light');
  assert.equal(e.$('#sidebar').inert, true); e.close();
}, true);

(async () => {
  const results = [];
  for (const { name, fn } of tests) {
    const started = Date.now();
    try { await fn(); results.push({ name, status: 'passed', ms: Date.now() - started }); }
    catch (error) { results.push({ name, status: 'failed', error: error.stack, ms: Date.now() - started }); }
  }
  const report = {
    generatedAt: new Date().toISOString(), dist,
    environment: 'jsdom 26; DOM/state checks only. No browser, screenshot, CSS-layout or pixel-fidelity claims.',
    standaloneIncluded: includeStandalone,
    passed: results.filter(result => result.status === 'passed').length,
    failed: results.filter(result => result.status === 'failed').length,
    runtimeErrors: environments.flatMap(e => e.runtimeErrors),
    networkCalls: environments.flatMap(e => e.networkCalls),
    cssParseWarnings: environments.flatMap(e => e.cssParseWarnings), results
  };
  for (const e of environments) { try { e.close(); } catch {} }
  const reportName = onlyStandalone ? 'liquid-standalone-qa-results.json' : 'liquid-theme-qa-results.json';
  const reportDir = path.resolve(__dirname, '../test-results');
  fs.mkdirSync(reportDir, {recursive: true});
  fs.writeFileSync(path.join(reportDir, reportName), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.failed || report.runtimeErrors.length || report.networkCalls.length ? 1 : 0;
})();
