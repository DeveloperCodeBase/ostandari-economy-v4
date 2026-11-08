import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.zip':'application/zip','.json':'application/json; charset=utf-8'};
const server = http.createServer((request,response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405,{'Allow':'GET, HEAD'}); return response.end('Method not allowed'); }
  let decoded;
  try { decoded = decodeURIComponent(new URL(request.url,'http://localhost').pathname); }
  catch { response.writeHead(400); return response.end('Invalid path'); }
  const target = path.resolve(root,'.' + decoded + (decoded.endsWith('/') ? 'index.html' : ''));
  if (!target.startsWith(root + path.sep)) { response.writeHead(403); return response.end('Forbidden'); }
  let stat;
  try { stat = fs.statSync(target); } catch { response.writeHead(404); return response.end('Not found'); }
  if (!stat.isFile()) { response.writeHead(404); return response.end('Not found'); }
  response.writeHead(200,{'Content-Type':types[path.extname(target)] || 'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
  if (request.method === 'HEAD') return response.end();
  const stream = fs.createReadStream(target);
  stream.on('error',()=>response.destroy());
  stream.pipe(response);
});
server.on('error',error => { console.error('Unable to start:',error.message); process.exitCode = 1; });
server.listen(port,'127.0.0.1',()=>console.log(`Glassy Navigation: http://127.0.0.1:${port}`));
