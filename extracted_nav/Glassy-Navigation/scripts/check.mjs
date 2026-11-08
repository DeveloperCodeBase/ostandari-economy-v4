import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const findings = [];
for (const file of ['src/navbar.js','src/sidebar.js','src/demo.js','scripts/build.mjs','scripts/serve.mjs','scripts/check.mjs']) {
  execFileSync(process.execPath,['--check',path.join(root,file)],{stdio:'pipe'});
  findings.push('Syntax: ' + file);
}
const scope = {window:{}};
vm.createContext(scope);
vm.runInContext(fs.readFileSync(path.join(root,'src/navbar.js'),'utf8'),scope);
vm.runInContext(fs.readFileSync(path.join(root,'src/sidebar.js'),'utf8'),scope);
for (const method of ['setLanguage','setActive','setSidebarExpanded','openSearch','closeSearch','destroy']) assert.equal(typeof scope.window.GlassyNavbar.prototype[method],'function');
for (const method of ['setLanguage','setActive','setCollapsed','setNotifications','destroy']) assert.equal(typeof scope.window.GlassySidebar.prototype[method],'function');
const items = [{id:'home',en:'Home',fa:'خانه'},{id:'settings',en:'Setting',fa:'تنظیمات'},{id:'pages',en:'Pages',fa:'صفحه‌ها'}];
assert.equal(scope.window.GlassyNavbar.search(items,'HOME')[0].id,'home');
assert.equal(scope.window.GlassyNavbar.search(items,'تنظيمات')[0].id,'settings');
assert.equal(scope.window.GlassyNavbar.search(items,'صفحه ها')[0].id,'pages');
assert.equal(scope.window.GlassyNavbar.search(items,'').length,0);
assert.equal(scope.window.GlassyNavbar.search(items,'<script>').length,0);
findings.push('Public component methods and English/Persian search normalization');
const html = fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for (const match of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) assert.ok(fs.existsSync(path.join(root,'dist',match[1])),'Missing asset: ' + match[1]);
const single = fs.readFileSync(path.join(root,'dist/downloads/Glassy-Navigation.html'),'utf8');
assert.ok(!/<script[^>]+src=/.test(single));
assert.ok(!/<link[^>]+rel="stylesheet"/.test(single));
assert.ok(!/url\(['"]?\.\//.test(single));
assert.ok(!single.includes('id="source-download"'));
findings.push('All linked deployment files exist; detached HTML embeds all scripts, styles and backgrounds');
console.log(JSON.stringify({passed:true,checks:findings,browser_visual_check:false,note:'Static and pure-logic checks. This command does not render or automate a browser.'},null,2));
