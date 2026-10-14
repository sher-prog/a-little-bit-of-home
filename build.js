// Static export for hosting (Vercel etc.): node build.js  ->  dist/
// Renders every page with the same templates the dev server uses, then copies /public.
const fs = require('fs');
const path = require('path');
const { site, allRecipes, isLive } = require('./lib/content');
const T = require('./lib/templates');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

function write(rel, html) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function copyPublic(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue; // never ship dotfiles such as .DS_Store
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyPublic(src, dst);
    else fs.copyFileSync(src, dst);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
const s = site();
const recipes = allRecipes();
const prefill = {};

write('index.html', T.landing({ site: s, recipes, q: '', prefill }));
for (const r of recipes.filter(isLive)) write(`recipes/${r.slug}/index.html`, T.recipePage({ site: s, r }));
const countries = new Map();
for (const r of recipes) if (!countries.has(r.country.code)) countries.set(r.country.code, r.country);
for (const [code, country] of countries) {
  write(`countries/${code}/index.html`, T.countryPage({ site: s, country, recipes: recipes.filter((r) => r.country.code === code), q: '', prefill }));
}
write('404.html', T.notFound({ site: s }));
copyPublic(path.join(ROOT, 'public'), DIST);

const pages = [...countries.keys()].length + recipes.filter(isLive).length + 2;
console.log(`Built ${pages} pages into dist/`);
