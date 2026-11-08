const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const html = fs.readFileSync(path.resolve(__dirname, '../dist/Glassy-Dashboard.html'), 'utf8');
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM(html, {
  url: 'https://standalone.test/', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.URL.createObjectURL = () => '';
    window.URL.revokeObjectURL = () => {};
  }
});
try {
  const window = dom.window, document = window.document;
  assert.deepEqual(errors, []);
  assert.equal(window.GlassyCRM.getState().route, 'overview');
  assert.equal(document.querySelectorAll('.metric-card').length, 4);
  document.getElementById('settings-button').click();
  assert.ok([...document.querySelectorAll('.wallpaper-option img')].every(image => image.src.startsWith('data:image/svg+xml;base64,')));
  assert.ok([...document.querySelectorAll('img')].every(image => image.src.startsWith('data:')));
  assert.equal(document.querySelectorAll('script[src],link[rel="stylesheet"]').length, 0);
  document.querySelector('[data-action="close"]').click();
  for (const route of ['orders', 'ecosystem', 'customers', 'performance']) {
    window.GlassyCRM.navigate(route);
    assert.equal(window.GlassyCRM.getState().route, route);
    assert.ok(document.querySelector('#page-content .view'));
  }
  assert.deepEqual(errors, []);
  console.log('Standalone passed: five pages, embedded assets, no external scripts or styles, zero runtime errors.');
} finally {
  dom.window.close();
}
