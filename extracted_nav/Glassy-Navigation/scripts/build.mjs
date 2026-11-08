import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const src = name => fs.readFileSync(path.join(root, 'src', name), 'utf8');
fs.mkdirSync(path.join(dist, 'assets'), { recursive:true });
fs.mkdirSync(path.join(dist, 'downloads'), { recursive:true });
for (const name of ['ribbons.svg','aurora.svg']) fs.copyFileSync(path.join(root,'assets',name),path.join(dist,'assets',name));
const style = ['navbar.css','sidebar.css','demo.css'].map(src).join('\n\n');
const html = src('index.html');
fs.writeFileSync(path.join(dist,'styles.css'),style);
fs.writeFileSync(path.join(dist,'index.html'),html);
for (const name of ['navbar.js','sidebar.js','demo.js']) fs.writeFileSync(path.join(dist,name),src(name));

// The detached export embeds its complete visual assets and JavaScript.
const withoutDownload = text => text.replace(/\s*<a class="download-link" id="source-download"[\s\S]*?<\/a>/, '');
const embeddedStyle = style.replace(/url\(['"]?\.\/assets\/([^'"\)]+)['"]?\)/g, (_,name) => `url("data:image/svg+xml;base64,${fs.readFileSync(path.join(root,'assets',name)).toString('base64')}")`);
const script = ['navbar.js','sidebar.js','demo.js'].map(src).join('\n;\n').replace(/<\/script/gi,'<\\/script');
const standalone = withoutDownload(html)
  .replace('<link rel="stylesheet" href="./styles.css">',`<style>\n${embeddedStyle}\n</style>`)
  .replace(/\s*<script src="\.\/(?:navbar|sidebar|demo)\.js" defer><\/script>/g,'')
  .replace('</body>',`<script>\n${script}\n</script>\n</body>`);
fs.writeFileSync(path.join(dist,'downloads','Glassy-Navigation.html'),standalone);

// Portable ZIP writer: standard ZIP/deflate, no build dependencies or shell tools.
const crcTable = Array.from({length:256}, (_,n) => {
  let c = n;
  for (let k=0;k<8;k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function walk(directory,prefix) {
  return fs.readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(entry => {
    const name = prefix + '/' + entry.name;
    return entry.isDirectory() ? walk(path.join(directory,entry.name),name) : [{name,data:fs.readFileSync(path.join(directory,entry.name))}];
  });
}
const entries = [];
for (const name of ['README.md','package.json']) entries.push({name,data:fs.readFileSync(path.join(root,name))});
for (const dir of ['src','assets','scripts']) entries.push(...walk(path.join(root,dir),dir));
for (const name of ['index.html','styles.css','navbar.js','sidebar.js','demo.js']) entries.push({name:'dist/' + name,data:Buffer.from(name === 'index.html' ? withoutDownload(html) : fs.readFileSync(path.join(dist,name)))});
entries.push(...walk(path.join(dist,'assets'),'dist/assets'));
const now = new Date();
const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth()+1) << 5) | now.getDate();
const dosTime = (now.getHours()<<11) | (now.getMinutes()<<5) | Math.floor(now.getSeconds()/2);
let offset = 0;
const chunks = [], centralChunks = [];
for (const item of entries) {
  const filename = Buffer.from('Glassy-Navigation/' + item.name);
  const compressed = deflateRawSync(item.data,{level:9});
  const crc = crc32(item.data);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50,0); local.writeUInt16LE(20,4); local.writeUInt16LE(0x800,6); local.writeUInt16LE(8,8);
  local.writeUInt16LE(dosTime,10); local.writeUInt16LE(dosDate,12); local.writeUInt32LE(crc,14);
  local.writeUInt32LE(compressed.length,18); local.writeUInt32LE(item.data.length,22); local.writeUInt16LE(filename.length,26);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50,0); central.writeUInt16LE(20,4); central.writeUInt16LE(20,6); central.writeUInt16LE(0x800,8); central.writeUInt16LE(8,10);
  central.writeUInt16LE(dosTime,12); central.writeUInt16LE(dosDate,14); central.writeUInt32LE(crc,16);
  central.writeUInt32LE(compressed.length,20); central.writeUInt32LE(item.data.length,24); central.writeUInt16LE(filename.length,28); central.writeUInt32LE(offset,42);
  chunks.push(local,filename,compressed); centralChunks.push(central,filename);
  offset += local.length + filename.length + compressed.length;
}
const central = Buffer.concat(centralChunks);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50,0); end.writeUInt16LE(entries.length,8); end.writeUInt16LE(entries.length,10);
end.writeUInt32LE(central.length,12); end.writeUInt32LE(offset,16);
const archive = Buffer.concat([...chunks,central,end]);
fs.writeFileSync(path.join(dist,'downloads','Glassy-Navigation-Source.zip'),archive);
console.log(JSON.stringify({built:'dist/index.html',standalone:'dist/downloads/Glassy-Navigation.html',source:'dist/downloads/Glassy-Navigation-Source.zip',archive_files:entries.length,archive_bytes:archive.length,standalone_bytes:Buffer.byteLength(standalone)}));
