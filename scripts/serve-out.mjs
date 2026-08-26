/** Lokálny náhľad statického exportu tak, ako beží na GitHub Pages (/rewora). */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const OUT = join(process.cwd(), 'out');
const BASE = process.env.SERVE_BASE ?? '/rewora';
const PORT = Number(process.env.SERVE_PORT ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.json': 'application/json',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split('?')[0]);
  if (BASE && !path.startsWith(BASE)) {
    res.writeHead(302, { Location: BASE + '/' }).end();
    return;
  }
  path = path.slice(BASE.length) || '/';
  let file = join(OUT, path);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    if (!extname(file)) file += '.html';
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end('404');
  }
}).listen(PORT, () => console.log(`out/ na http://localhost:${PORT}${BASE}/`));
