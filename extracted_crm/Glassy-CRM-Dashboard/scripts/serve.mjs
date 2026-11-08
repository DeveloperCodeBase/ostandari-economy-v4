import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const args = process.argv.slice(2);
function option(name, fallback) {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1] || fallback;
}
const host = option('--host', '127.0.0.1');
const port = Number(option('--port', process.env.PORT || '4173'));
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Use a valid port: 1–65535.');
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.json': 'application/json; charset=utf-8', '.woff2': 'font/woff2'
};
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end('Method not allowed');
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    const data = await fs.readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : 400);
    response.end('Not found');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'Port is busy. Try: npm start -- --port 4174' : error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log('Glassy CRM is running at http://' + (host === '0.0.0.0' ? 'localhost' : host) + ':' + port + '/');
  console.log('Press Ctrl+C to stop.');
});
