// Zero-dependency server. Run with `npm start`, then open http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');
const { site, allRecipes, isLive } = require('./lib/content');
const T = require('./lib/templates');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon'
};

const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};

function send(res, code, type, body) {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}
const html = (res, code, body) => send(res, code, MIME['.html'], body);

function serveStatic(req, res, pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch (e) { return false; }
  const file = path.normalize(path.join(PUBLIC, decoded));
  if (!file.startsWith(PUBLIC + path.sep)) return false;
  if (path.relative(PUBLIC, file).split(path.sep).some((part) => part.startsWith('.'))) return false; // never serve dotfiles such as .DS_Store or .env
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return false;
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
  return true;
}

http
  .createServer((req, res) => {
    for (const [k, val] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, val);
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Method not allowed'); }
    const { pathname, searchParams } = new URL(req.url, 'http://x');
    const q = (searchParams.get('q') || '').slice(0, 80);
    const prefill = { nojs: searchParams.get('nojs') === '1' };
    try {
      if (serveStatic(req, res, pathname)) return;
      // Content is re-read on every request, so editing a JSON file shows up on refresh.
      const s = site();
      const recipes = allRecipes();
      let m;
      if (pathname === '/') return html(res, 200, T.landing({ site: s, recipes, q, prefill }));
      if ((m = pathname.match(/^\/recipes\/([a-z0-9-]+)\/?$/))) {
        const r = recipes.find((x) => x.slug === m[1] && isLive(x));
        if (r) return html(res, 200, T.recipePage({ site: s, r }));
      }
      if ((m = pathname.match(/^\/countries\/([a-z]{2})\/?$/))) {
        const list = recipes.filter((x) => x.country.code === m[1]);
        if (list.length) return html(res, 200, T.countryPage({ site: s, country: list[0].country, recipes: list, q, prefill }));
      }
      html(res, 404, T.notFound({ site: s }));
    } catch (e) {
      console.error(e);
      send(res, 500, 'text/plain; charset=utf-8', 'Something went wrong reading the recipes. Check the JSON files in content/.');
    }
  })
  .listen(PORT, () => console.log(`a little bit of home is running at http://localhost:${PORT}`));
