# a little bit of home

Recipes from a childhood in Durban, South Africa. A small website with no dependencies and no build step.

## Run it

```
npm start
```

Then open http://localhost:3000. You need Node 18 or newer. Change the port with `PORT=4000 npm start`.

Content is re-read on every page load, so edit a file and refresh.

## How it is organised

```
content/site.json            site title, your note, community teaser, category order
content/recipes/*.json       one file per recipe (this is the only thing you edit to add one)
public/images/<slug>/        photos for a recipe: dish.jpg, step-1.jpg, step-2.jpg ...
public/css, public/js        styles and the small filter script
lib/templates.js             page layouts
lib/content.js               reads the JSON files
server.js                    routes
```

Routes: `/` (home), `/recipes/<slug>`, `/countries/<code>`.

## Add a new recipe

1. Copy `content/recipes/chicken-and-mushroom-pie.json` to `content/recipes/<new-slug>.json`.
2. Change `slug` (lowercase, hyphens, same as the filename), `title`, `summary`, `category`, `serves`, `time`, `ingredients`, `steps`.
3. Set `"status": "published"`. Use `"coming-soon"` to show a greyed card with no page.
4. Set `"featured": true` on one recipe to show it on the "my fav recipe" card. Add a `"preview": ["6–8 eggs", ...]` list to choose the three lines shown on that card.
5. Refresh. The recipe appears on the home page and gets its own page.

`category` must be one of the names in `content/site.json` under `categories` to show up as a filter. Add a new name there to add a filter.

Soon an AI agent will be available to add your recipes via chat

### Steps as tick boxes

Each step has a `tasks` list: one line per action. On the page every line gets its own tick box, and ticks are remembered in the visitor's browser for that recipe, like the ingredient list. A step can use `text` (one paragraph) instead of `tasks` if you prefer no tick boxes.

### Steps and personal notes

Each step has a `title`, a `text`, an `image` and a `note`. Write your own words in `note` and it appears in blue handwriting under the step. Leave it empty and a bracketed prompt shows instead (the hints live in `noteHints` in the recipe file).

### Source credit

For an adapted recipe, fill the `source` block (name, title, url, note) and keep `"adapted": true`. A credit line with a link appears at the bottom of the page. For your own recipe, delete the `source` block.

## Photos

Every photo slot on the site is a labelled placeholder that shows the file it is waiting for.

To swap in a real photo, do either of these:

- **No edit at all:** save the file as `public/images/<slug>/dish.jpg` (finished dish) or `public/images/<slug>/step-1.jpg`, `step-2.jpg` ... (steps). `.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work.
- **One line:** in the recipe JSON, set `"dish": "my-photo.jpg"` under `images`, or `"image": "my-photo.jpg"` on a step. The path is relative to `public/images/`.

Write short, useful alt text when you can: the page uses the step title as alt text by default.

## Authors and countries (for the community later)

Every recipe already has an `author` and a `country`:

```json
"author": { "name": "Shernice", "slug": "shernice" },
"country": { "code": "za", "name": "South Africa", "place": "Durban" }
```

`code` is a lowercase two-letter country code. `/countries/<code>` lists every recipe tagged with that country, with an illustration under the name when one exists (`lib/illustrations.js`; South Africa has one). Accounts and recipe submissions are not built yet. When they are, new recipes will carry the same two fields, so nothing here needs restructuring.

## Search

Both the home page and each country page have a search box. It matches a recipe's title, category, country and ingredient names, and filters as you type. It works together with the category tabs. Without JavaScript the box still works as a normal form.

## Coming-soon videos

The "pin your own card" panel carries a "Coming soon" line about cook-along videos. Edit it in `content/site.json` under `community.videos`, or delete that line to remove the tag.

## Recipe page navigation

Every recipe page has a link back to its country page (from the recipe's `country`) and one back to the home page recipe box.

## Words on the home page

`content/site.json` holds the big title (`hero.title`, now "Durbanite"), the "Hello!" letter (`hello`, which the "about" link jumps to), the label on the featured card (`featuredLabel`, now "My GO-TO Favorite!"), the "A note from me" prompts, and the category tabs.


