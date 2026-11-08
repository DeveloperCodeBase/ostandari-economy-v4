import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);
for (const ref of refs) {
  if (/^(https?:|data:)/.test(ref)) continue;
  await fs.access(path.join(root, ref));
}
for (const file of ['data.js','charts.js','app.js']) {
  const source = await fs.readFile(path.join(root, file), 'utf8');
  new vm.Script(source, { filename: file });
  if (/\bfetch\s*\(|XMLHttpRequest|WebSocket/.test(source)) throw new Error(file + ': unexpected external network API.');
}
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(await fs.readFile(path.join(root, 'charts.js'),'utf8'),sandbox);
for (const name of ['revenue','fulfillment','throughput','cohort','donut','telemetry','gauge','capsules']) {
  const rendered = sandbox.window.CRMCharts[name]();
  if (!rendered.startsWith('<svg') || !rendered.includes('aria-labelledby=') || /NaN|undefined|Infinity/.test(rendered)) throw new Error('Invalid chart: ' + name);
}
console.log('Passed: local asset references, JavaScript syntax, eight SVG chart renderers, and no external network calls.');
