// Loads recipes and site settings from /content. Nothing here knows about layout.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function site() {
  return readJSON(path.join(ROOT, 'content', 'site.json'));
}

// An image is, in order of priority:
//   1. the path written in the recipe JSON (relative to /images, or a full URL)
//   2. a file dropped at public/images/<slug>/<name>.<ext>  (dish.jpg, step-1.jpg ...)
//   3. null, which renders a labelled placeholder
function resolveImage(slug, name, explicit) {
  if (explicit) return /^https?:/.test(explicit) ? explicit : '/images/' + explicit.replace(/^\/+/, '');
  for (const ext of IMAGE_EXTS) {
    if (fs.existsSync(path.join(ROOT, 'public', 'images', slug, `${name}.${ext}`))) {
      return `/images/${slug}/${name}.${ext}`;
    }
  }
  return null;
}

function hydrate(r) {
  const slug = r.slug;
  const out = { ...r };
  out.dishImage = resolveImage(slug, 'dish', r.images && r.images.dish);
  out.dishHint = `public/images/${slug}/dish.jpg`;
  out.steps = (r.steps || []).map((s, i) => ({
    ...s,
    n: i + 1,
    img: resolveImage(slug, `step-${i + 1}`, s.image),
    imgHint: `public/images/${slug}/step-${i + 1}.jpg`
  }));
  return out;
}

function allRecipes() {
  const dir = path.join(ROOT, 'content', 'recipes');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => hydrate(readJSON(path.join(dir, f))))
    .sort((a, b) => (a.status === b.status ? a.title.localeCompare(b.title) : a.status === 'published' ? -1 : 1));
}

const isLive = (r) => r.status === 'published';

module.exports = { site, allRecipes, isLive };
