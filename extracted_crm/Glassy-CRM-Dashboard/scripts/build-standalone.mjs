import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const assetNames = await fs.readdir(path.join(root, 'assets'));
const assets = new Map();
for (const name of assetNames) {
  const extension = path.extname(name);
  const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' }[extension];
  if (!mime) continue;
  assets.set('assets/' + name, 'data:' + mime + ';base64,' + (await fs.readFile(path.join(root, 'assets', name))).toString('base64'));
}
const embedAssets = value => {
  for (const [asset, data] of assets) value = value.split(asset).join(data);
  return value;
};
let html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
for (const file of ['styles.css', 'liquid-glass.css', 'liquid-responsive.css']) {
  const css = embedAssets(await fs.readFile(path.join(root, file), 'utf8'));
  html = html.replace('<link rel="stylesheet" href="' + file + '">', () => '<style>\n' + css + '\n</style>');
}
for (const file of ['data.js', 'charts.js', 'app.js']) {
  html = html.replace('<script defer src="' + file + '"></script>', '');
}
let scripts = '';
for (const file of ['data.js', 'charts.js', 'app.js']) {
  const js = embedAssets(await fs.readFile(path.join(root, file), 'utf8')).replace(/<\/script/gi, '<\\/script');
  scripts += '<script>\n' + js + '\n</script>\n';
}
html = embedAssets(html).replace('</body>', () => scripts + '</body>');
await fs.writeFile(path.join(root, 'Glassy-Dashboard.html'), html);
console.log('Built dist/Glassy-Dashboard.html — ' + Buffer.byteLength(html).toLocaleString('en-US') + ' bytes, no external assets.');
