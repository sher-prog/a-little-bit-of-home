// Page templates. Plain functions that return HTML strings.
const { isLive } = require('./content');
const illustrations = require('./illustrations');

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const searchText = (r) =>
  [r.title, r.category, r.country && r.country.name, r.country && r.country.place, ...(r.ingredients || []).flatMap((g) => g.items.map((i) => i.item))]
    .filter(Boolean).join(' ').toLowerCase();
const matches = (r, q) => !q || q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => searchText(r).includes(w));

// Hand-placed look: each polaroid gets a slightly different tilt, but always the same one.
const TILTS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2];
const tilt = (i) => TILTS[Math.abs(i) % TILTS.length];

const arrow = () => '<svg class="arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M19 6H2M8 1L2 6l6 5"/></svg>';

function layout({ title, description, body, page, back }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#573A35">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/NanumPenScript-400.woff2" as="font" type="font/woff2" crossorigin>
<script src="/js/js-flag.js"></script>
<link rel="stylesheet" href="/css/fonts.css">
<link rel="stylesheet" href="/css/site.css">
<script src="/js/site.js" defer></script>
</head>
<body id="top" data-page="${esc(page)}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="wordmark" href="/" aria-label="a little bit of home, home page">a little bit of home.</a>
  <nav aria-label="Main">
    ${back ? `<a href="/countries/${esc(back.code)}">${arrow('l')} ${esc(back.name)}</a><a href="/#recipes">Back to the box</a>` : `<a href="/#recipes"${page === 'home' ? ' aria-current="page"' : ''}>recipes</a><a href="/#about">about</a><a href="/countries/za"${page === 'country' ? ' aria-current="page"' : ''}>countries</a>`}
  </nav>
</header>
<main id="main">
${body}
</main>
<nav class="page-end" aria-label="Back navigation">
  ${back ? `<a href="/countries/${esc(back.code)}">${arrow()} ${esc(back.name)}</a><a href="/#recipes">${arrow()} Back to the box</a>` : page === 'country' ? `<a href="/#recipes">${arrow()} Back to the box</a>` : ''}
  <a href="#top" class="to-top">Back to top <svg class="arrow up" viewBox="0 0 12 20" aria-hidden="true"><path d="M6 19V2M1 8l5-6 5 6"/></svg></a>
</nav>
<footer class="foot">
  <p>a little bit of home.</p>
  <p>Recipes from Durban, South Africa.</p>
</footer>
</body>
</html>`;
}

// A taped polaroid. With no image it is a labelled slot that names the file it is waiting for.
function polaroid({ src, alt, hint, label, caption, i = 0, eager, cls = '' }) {
  const style = `--tilt:${tilt(i)}deg;--tw:${[6.2, 5.2, 7, 5.6, 6.6, 4.8][Math.abs(i) % 6]}rem;--tx:${[0, -18, 14, -8, 20, -12][Math.abs(i) % 6]}%`;
  if (src) {
    return `<figure class="polaroid ${cls}" style="${style}"><span class="tape" aria-hidden="true"></span>
  <div class="pic"><img src="${esc(src)}" alt="${esc(alt)}" ${eager ? '' : 'loading="lazy"'} decoding="async"></div>
  ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
</figure>`;
  }
  return `<figure class="polaroid slot ${cls}" style="${style}" aria-hidden="true"><span class="tape"></span>
  <div class="pic"><span class="slot-label">[photo${label ? ': ' + esc(label) : ''}]</span><code>${esc(hint).replace(/\//g, '/<wbr>')}</code></div>
  <figcaption>[${esc(caption || 'caption in your handwriting')}]</figcaption>
</figure>`;
}

function mini(r, i) {
  const live = isLive(r);
  const inner = `${polaroid({ src: r.dishImage, alt: r.title, hint: r.dishHint, label: live ? 'the finished dish' : '', caption: '', i, cls: 'mini-photo' })}
  <h3>${esc(r.title)}</h3>
  ${live ? `<p class="from">from: ${esc(r.author.name)}</p>` : '<p class="soon-note">soon</p>'}`;
  return `<li class="mini${live ? '' : ' is-soon'}" data-category="${esc(r.category)}" data-search="${esc(searchText(r))}">${
    live ? `<a href="/recipes/${esc(r.slug)}">${inner}</a>` : `<div>${inner}</div>`
  }</li>`;
}

const previewIngredient = (r, idx) => {
  const items = r.ingredients.flatMap((g) => g.items);
  const it = items[idx];
  return it ? `${it.qty ? it.qty + ' ' : ''}${it.item.split(',')[0]}` : '';
};


function searchBox({ action, q, id }) {
  return `<form class="search" role="search" action="${esc(action)}" method="get">
  <noscript><input type="hidden" name="nojs" value="1"></noscript>
  <label for="${id}">Search the box</label>
  <div class="search-row">
    <input id="${id}" name="q" type="search" value="${esc(q || '')}" placeholder="bunny chow, pie, koeksister…" autocomplete="off" data-search-input>
    <button type="submit" class="go">Search</button>
  </div>
</form>`;
}

function landing({ site, recipes, q, prefill }) {
  const sq = prefill && prefill.nojs ? q : ''; // JS filters live in the browser; the server only filters when JS is off
  const live = recipes.filter((r) => isLive(r) && matches(r, sq));
  const soon = recipes.filter((r) => !isLive(r) && matches(r, sq));
  const featured = recipes.filter(isLive).find((r) => r.featured) || recipes.find(isLive);
  const cats = site.categories.filter((c) => c.toLowerCase() !== 'all'); // every tab you list shows, even before it has a recipe
  const countries = [...new Map(recipes.map((r) => [r.country.code, r.country])).values()];
  const grid = [...live, ...soon];
  const secondary = recipes.find((r) => isLive(r) && r.slug === (site.hero && site.hero.secondary)) || recipes.find((r) => isLive(r) && r !== featured);

  const body = `
<section class="hero wrap" aria-labelledby="hero-title">
  <h1 id="hero-title">${esc(site.hero.title)}</h1>
  <article class="letter ruled" id="about" aria-label="About this site">
    <h2>${esc(site.hello.greeting)}</h2>
    ${site.hello.lines.map((l) => `<p>${esc(l)}</p>`).join('')}
    <p class="yours">${esc(site.hello.signoff)}</p>${site.hello.ps ? `<p class="ps">${esc(site.hello.ps)}</p>` : ''}
  </article>
  ${featured ? `<div class="pile enter">
    ${polaroid({ src: featured.dishImage, alt: featured.dishAlt || featured.title, hint: featured.dishHint, label: 'the finished dish', caption: featured.dishCaption || 'caption', i: 0, eager: true, cls: 'big' })}
    ${secondary ? polaroid({ src: secondary.dishImage, alt: secondary.dishAlt || secondary.title, hint: secondary.dishHint, label: 'the finished dish', caption: secondary.dishCaption || 'caption', i: 1, cls: 'small' }) : ''}
  </div>` : ''}
</section>

${featured ? `<section class="wrap" aria-labelledby="feat-h">
  <article class="card ruled featured">
    <p class="start-here" aria-hidden="true">start here <svg viewBox="0 0 60 40"><path d="M3 8c18-6 40-2 48 22M51 30l-9-4M51 30l2-10"/></svg></p>
    <div class="feat-text">
      <h2 id="feat-h">${esc(site.featuredLabel)}</h2>
      <p class="dish-name">${esc(featured.title)}</p>
      <p class="src">${featured.source ? `source: ${esc(featured.source.name)}` : `by: ${esc(featured.author.name)}`}</p>
      <ul class="plain">${(featured.preview || [0, 1, 7].map((n) => previewIngredient(featured, n))).filter(Boolean).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <p><a class="open" href="/recipes/${esc(featured.slug)}">Open this card</a></p>
    </div>
  </article>
</section>` : ''}

<section class="wrap recipes" id="recipes" aria-labelledby="recipes-h">
  <h2 id="recipes-h" class="sr-only">All the recipes</h2>
  ${searchBox({ action: '/', q, id: 'q-home' })}
  <div class="tabs" role="group" aria-label="Filter by category" data-filters>
    <button type="button" class="tab" aria-pressed="true" data-cat="">All</button>
    ${cats.map((c) => `<button type="button" class="tab" aria-pressed="false" data-cat="${esc(c)}">${esc(c)}</button>`).join('')}
  </div>
  <div class="box">
    <p class="sr-only" role="status" aria-live="polite" data-status></p>
    <ul class="minis" data-grid>${grid.map(mini).join('')}</ul>
    <p class="empty" data-empty${grid.length ? ' hidden' : ''}>Nothing filed here yet. More recipes are on the way.</p>
  </div>
</section>

<section class="wrap two" id="note">
  <article class="card ruled note-card" aria-labelledby="note-h">
    <h2 id="note-h">${esc(site.note.heading)}</h2>
    ${(site.note.lines || site.note.prompts || []).map((p) => `<p class="ink">${esc(p)}</p>`).join('')}
  </article>
  <aside class="pin-card" aria-labelledby="pin-h">
    <h2 id="pin-h">${esc(site.community.heading)}</h2>
    <p>${esc(site.community.text)}</p>
    ${site.community.videos ? `<p class="soon-tag"><span>Coming soon</span> ${esc(site.community.videos)}</p>` : ''}
    <p class="flags">
      ${countries.map((c) => `<a class="flag on" href="/countries/${esc(c.code)}">${esc(c.name)}</a>`).join('')}
      <span class="flag">[your country]</span>
    </p>
  </aside>
</section>`;
  return layout({ title: `${site.title} — recipes from Durban`, description: site.tagline, body, page: 'home' });
}

function recipePage({ site, r }) {
  const ing = r.ingredients
    .map(
      (g) => `<h3>${esc(g.group)}</h3>
<ul class="ing">${g.items
        .map((i) => `<li><label><input type="checkbox"><span class="line"><span class="qty">${esc(i.qty)}</span> ${esc(i.item)}</span></label></li>`)
        .join('')}</ul>`
    )
    .join('');
  const steps = r.steps
    .map((s, n) => {
      const hint = (r.noteHints && r.noteHints[n]) || 'a few words in your own handwriting';
      return `<li class="step">
  ${polaroid({ src: s.img, alt: s.alt || `Step ${s.n}: ${s.title}`, hint: s.imgHint, label: `step ${s.n}`, caption: s.caption || 'caption', i: n + 1, cls: 'step-photo' })}
  <div class="step-text">
    <h3 id="step-h-${s.n}">${s.n}. ${esc(s.title)}</h3>
    ${s.tasks && s.tasks.length ? `<ul class="ing tasks" aria-labelledby="step-h-${s.n}">${s.tasks.map((k) => `<li><label><input type="checkbox"><span class="line">${esc(k)}</span></label></li>`).join('')}</ul>` : `<p>${esc(s.text)}</p>`}
    <p class="ink">${s.note ? esc(s.note) : `[your note: ${esc(hint)}]`}</p>
  </div>
</li>`;
    })
    .join('');
  const total = r.time && (r.time.total || [r.time.prep, r.time.cook].filter(Boolean).join(' + '));
  const body = `
<article class="sheet recipe">
  ${polaroid({ src: r.dishImage, alt: r.dishAlt || r.title, hint: r.dishHint, label: 'the finished dish', caption: r.dishCaption || 'caption in your handwriting', i: 0, eager: true, cls: 'big dish' })}
  <header class="r-head">
    <div class="r-title">
      <h1>${esc(r.title)}</h1>
      ${r.source ? `<p class="meta">source: ${esc(r.source.name)}</p>` : `<p class="meta">by: ${esc(r.author.name)}</p>`}
      <p class="meta">makes: ${esc(r.serves)}${total ? `&nbsp;&nbsp; time: ${esc(total)}` : ''}</p>
      <p class="meta">from: ${esc(r.country.place || '')}${r.country.place ? ', ' : ''}${esc(r.country.name)}</p>
    </div>
  </header>
  <section class="ingredients" aria-labelledby="ing-h">
    <h2 id="ing-h" class="sr-only">Ingredients</h2>
    ${ing}
  </section>
  <section class="method" aria-labelledby="m-h">
    <h2 id="m-h">Method</h2>
    <ol class="steps">${steps}</ol>
  </section>
  ${r.goodToKnow && r.goodToKnow.length ? `<section class="know" aria-labelledby="k-h"><h2 id="k-h">Good to know</h2>${r.goodToKnow.map((g) => `<p>${esc(g)}</p>`).join('')}</section>` : ''}
  ${r.source && r.source.adapted ? `<p class="credit">Recipe adapted from <a href="${esc(/^https?:\/\//.test(r.source.url) ? r.source.url : '#')}" rel="noopener noreferrer">${esc(r.source.name)}</a>.</p>` : ''}
</article>`;
  return layout({ title: `${r.title} — ${site.title}`, description: r.summary, body, page: 'recipe', back: r.country });
}

function countryPage({ site, country, recipes, q, prefill }) {
  const shown = recipes.filter((r) => matches(r, prefill && prefill.nojs ? q : ''));
  const art = illustrations[country.code];
  const body = `
<section class="wrap country">
  <div class="country-head">
    <div class="country-copy">
      <h1>${esc(country.name)}</h1>
      <p class="lede">Recipes tagged ${esc(country.name)}. When other cooks join, their cards from here will be filed in this box too.</p>
      ${searchBox({ action: `/countries/${country.code}`, q, id: 'q-country' })}
    </div>
    ${art ? `<figure class="print" style="--tilt:1.6deg;--tw:6.4rem;--tx:6%"><span class="tape" aria-hidden="true"></span><img src="${esc(art.src)}" alt="${esc(art.alt)}" width="1400" height="934" decoding="async"><figcaption>${esc(art.caption)}</figcaption></figure>` : ''}
  </div>
  <div class="box">
    <p class="sr-only" role="status" aria-live="polite" data-status></p>
    <ul class="minis" data-grid>${shown.map(mini).join('')}</ul>
    <p class="empty" data-empty${shown.length ? ' hidden' : ''}>Nothing from ${esc(country.name)} matches that yet.</p>
  </div>
</section>`;
  return layout({ title: `${country.name} — ${site.title}`, description: `Recipes from ${country.name}`, body, page: 'country' });
}

function notFound({ site }) {
  return layout({
    title: `Not found — ${site.title}`,
    description: 'Page not found',
    page: 'nf',
    body: `<section class="wrap country"><h1>That card is not in the box</h1><p class="lede">Try the <a href="/#recipes">recipe list</a>.</p></section>`
  });
}

module.exports = { landing, recipePage, countryPage, notFound };
