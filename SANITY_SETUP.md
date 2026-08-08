# Sanity setup - Egipskie Wakacje

How to go from the current state (site ships content from typed local files) to
a CMS-driven site, without breaking anything on the way.

**Current state:** the public site runs in `local` mode. Content lives in
`src/content/local/*.ts` and is compiled into the static export. Sanity is not
contacted at all. Everything below is optional and reversible - flipping one
environment variable back returns you to local mode.

**Existing project:** `ej04dib0`, dataset `production`. It already contains
legacy documents (`tourPackage`, and possibly an old `siteSettings`) from an
earlier all-inclusive concept. Nothing in this guide deletes them.

---

## 0. How the pieces fit

```
studio/                    standalone package - the editing UI + seed script
  schemas/                 what editors can enter
  seed/                    one-off import of the current content + images
src/content/index.ts       the ONLY module pages import content from
src/content/sanity/        GROQ queries + read-only fetch (no token)
public/media/              the image files the seed uploads into Sanity
```

The frontend never writes to Sanity and never holds a token. In `sanity` mode it
does anonymous reads against the public CDN at build time. If a query returns
nothing, `src/content/index.ts` falls back to the local content, so a
half-seeded dataset still produces a complete site.

`studio/` is invisible to the frontend build: it has its own `package.json`, and
the root `tsconfig.json` and `eslint.config.mjs` both exclude it. Do not add it
to the root `package.json` as a workspace.

### Images are native Sanity assets

Editors never type a file path, an extension or a pixel size. Every image field
is a real Sanity image asset with **hotspot/crop** plus a **required Polish
`alt`** - defined once in `studio/schemas/objects/imageWithAlt.ts` and reused by
`destination.heroImage`, `tour.heroImage`, `tour.gallery`,
`blogPost.featuredImage`, every `ogImage`, and the `blockImage` / `blockGallery`
body blocks.

Stored shape:

```json
{ "_type": "image", "alt": "Piramidy w Gizie o złotej godzinie",
  "asset": { "_ref": "image-<sha1>-1600x1000-jpg" },
  "hotspot": { "x": 0.5, "y": 0.4, "height": 1, "width": 1 } }
```

Width, height and the LQIP blur placeholder come from the asset metadata, so
they cannot drift out of sync with the file. The hotspot is what keeps the
subject in frame when the same photo is cropped differently on a phone, a card
and an OG preview.

### The field-name contract

`src/content/sanity/queries.ts` maps Sanity fields onto the frontend types in
`src/content/types.ts`. Some names differ between the two sides:

| Sanity field | Frontend |
| --- | --- |
| `adultPrice`, `childPrice`, `infantFree`, `childAgeMinimum`, `childAgeMaximum`, `currency`, `priceLastVerifiedAt`, `priceVariable` | `Tour.price` |
| `guideLanguageLabel`, `guidePolishConfirmed` | `Tour.guide` |
| `pickupTime`, `returnTime` | `pickupLabel`, `returnLabel` |
| `relatedPost` (single reference) | `relatedPostSlug` |
| `relatedTours[]` | `relatedTourSlugs` |
| `seoTitle`, `seoDescription`, `canonicalPath`, `ogImage` | `Tour.seo` / `BlogPost.seo` / `Destination.seo` |
| `heroImage`, `featuredImage`, `gallery[]`, `ogImage` (image assets) | `MediaImage` - built from `asset->url` + `asset->metadata` |

`faqs` is now spelled the same on every type (`destination.faqs`, `tour.faqs`,
`blogPost.faqs`) and SEO is flat everywhere - there is no nested `seo` object
and no `mediaImage` object type any more.

Renaming a field in `studio/schemas/` without editing `queries.ts` breaks sanity
mode silently: the query returns `null` for that field and the page renders
blank instead of failing loudly. Change both files together.

### Projecting images and body blocks in GROQ

Images need the asset dereferenced; body blocks map their Sanity `_type` onto
the `PostBlock` discriminator in `src/content/types.ts`:

```groq
"heroImage": {
  "alt": heroImage.alt,
  "src": heroImage.asset->url,
  "width": heroImage.asset->metadata.dimensions.width,
  "height": heroImage.asset->metadata.dimensions.height,
  "lqip": heroImage.asset->metadata.lqip,
  "sources": {
    "avif": heroImage.asset->url + "?w=1600&fm=avif&q=65&fit=crop",
    "webp": heroImage.asset->url + "?w=1600&fm=webp&q=72&fit=crop",
    "jpg":  heroImage.asset->url + "?w=1600&fm=jpg&q=78&fit=crop"
  }
},
body[]{
  _type == "blockHeading"    => { "type": "heading", "id": anchor.current, text },
  _type == "blockParagraph"  => { "type": "paragraph", text },
  _type == "blockList"       => { "type": "list", ordered, items },
  _type == "blockCallout"    => { "type": "callout", tone, text },
  _type == "blockImage"      => { "type": "image", caption,
                                  "image": { "alt": image.alt, "src": image.asset->url,
                                             "width": image.asset->metadata.dimensions.width,
                                             "height": image.asset->metadata.dimensions.height,
                                             "lqip": image.asset->metadata.lqip } },
  _type == "blockGallery"    => { "type": "gallery",
                                  "images": images[]{ alt, "src": asset->url,
                                             "width": asset->metadata.dimensions.width,
                                             "height": asset->metadata.dimensions.height } },
  _type == "blockQuote"      => { "type": "quote", text, cite },
  _type == "blockTable"      => { "type": "table", caption, headers, "rows": rows[].cells },
  _type == "blockLinkButton" => { "type": "linkButton", label, href, external },
  _type == "blockRelatedTour"=> { "type": "relatedTour", "tourSlug": tour->slug.current }
}
```

Add `&fit=crop&crop=focalpoint` to a transform URL to make the CDN honour the
hotspot an editor set.

---

## 1. Install and run the Studio locally

```bash
cd studio
cp .env.example .env      # optional - defaults already point at ej04dib0/production
npm install
npm run dev               # http://localhost:3333
```

First run asks you to log in with the Sanity account that owns `ej04dib0`.

What you should see: `Ustawienia serwisu` (singleton), `Kierunki`, `Wycieczki`,
`Kategorie wycieczek`, `Poradnik`, `Autorzy`, `FAQ`, `Opinie`, `Strony prawne`,
and a `Dokumenty legacy` list holding the old `tourPackage` documents. Those
render as "unknown type" - expected, since the type is deliberately not declared
in the new schema. Review them by hand before deleting anything.

### About "deploying the schema"

Sanity's content lake is schemaless. The files in `studio/schemas/` only drive
the editing UI - there is no server-side migration step, and nothing to deploy
before seeding. `npm run deploy` (step 5) publishes the *Studio UI*; it does not
touch data.

---

## 2. Create a write token

1. <https://www.sanity.io/manage> -> project `ej04dib0` -> **API** -> **Tokens**
2. **Add API token**, name `seed`, permissions **Editor**
3. Copy the value once and store it in a password manager

Never prefix it with `NEXT_PUBLIC_` or `SANITY_STUDIO_`. Both prefixes are
public: `NEXT_PUBLIC_` is inlined into the browser bundle and `SANITY_STUDIO_`
is baked into the Studio bundle. Either one hands anonymous write access to your
dataset. The token belongs only to the seed script, running on your machine.

---

## 3. Allow the origins that read the dataset

<https://www.sanity.io/manage> -> project `ej04dib0` -> **API** -> **CORS
origins** -> **Add CORS origin**:

| Origin | Credentials |
| --- | --- |
| `https://egipskiewakacje.pl` | off |
| `http://localhost:3000` | off |

Leave "Allow credentials" **off** - these are anonymous public reads, and a
token must never travel from a browser. `http://localhost:3333` is added
automatically for the Studio.

To be precise about why: `npm run build` fetches from Node at build time, where
CORS does not apply. These entries matter for anything querying the dataset from
a *browser* - a page you open locally, a future client-side query, a preview.
Adding them now costs nothing and removes a confusing class of failure later.

Also check **Dataset visibility** on the same page: `production` must be
**public** for the anonymous build-time reads to work.

---

## 4. Seed the dataset (documents + images)

```bash
cd studio
node ./seed/seed.mjs                          # dry run - no token, no deps needed
npm install                                   # required before a real run
SANITY_WRITE_TOKEN=sk... npm run seed:dry     # dry run against the live dataset
SANITY_WRITE_TOKEN=sk... npm run seed         # uploads images, then writes
```

The seed mirrors the current local content exactly: **22 documents** - 3
destinations, 3 tours, 1 article, 3 legal pages, site settings, 1 author
(`Zespół Egipskie Wakacje`), 2 tour categories and the 8 site-wide FAQ entries -
plus **15 image assets**.

### How the images get in

`seed/data.mjs` does not store finished image values. It stores a marker with a
path under `public/media`:

```js
heroImage: img("tours/hurghada-kair.jpg", "Piramidy w Gizie o złotej godzinie")
```

`seed/seed.mjs` walks the payload, uploads each distinct file with
`client.assets.upload("image", fs.createReadStream(path))`, and swaps the marker
for `{ _type: "image", alt, asset: { _ref: "image-..." } }` before the write.

- **Uploads are deduplicated by SHA-1.** Before uploading, the script looks for
  an existing `sanity.imageAsset` with the same `sha1hash` and reuses it. Run
  the seed ten times and you get 15 assets, not 150.
- **Uploads happen before the write.** If one file fails, nothing is written.
- **A missing file aborts the run** with the list of paths, before any upload.
- The dry run prints every file with its size and how many documents use it, so
  you can see exactly what would be uploaded.
- Hotspots are left unset (= centre). Set them in the Studio afterwards; a
  later re-seed replaces the document and resets them, so do hotspot work after
  your last seed run.

### Safety properties

- **Idempotent.** Every document has a fixed id (`tour.kair-gem-piramidy`,
  `destination.hurghada`, `siteSettings`, ...) and is written with
  `createOrReplace`. Run it ten times, get the same 22 documents.
- **Non-destructive.** It never deletes. Legacy `tourPackage` documents are
  counted and reported, then left alone.
- **Collision-guarded.** Before writing it checks whether any target id is
  already held by a document of a different `_type` and aborts with a list
  instead of overwriting. `--force` overrides, once you have looked.
- **Atomic.** One transaction: it all lands or none of it does.
- **No token, no error.** Without `SANITY_WRITE_TOKEN` it prints the plan plus
  these instructions and exits 0. The token is only ever read from
  `process.env.SANITY_WRITE_TOKEN` - it is never hardcoded and never logged.

One thing to check first: the seed writes `_id: "siteSettings"`. If a legacy
document already sits at that exact id *and* is also of type `siteSettings`, the
collision guard will not fire and it will be replaced. Open it in the Studio
first if you care about its contents.

Reviews are deliberately **not** seeded. The frontend renders only
`verified: true` reviews and hides the whole section when there are none. Add
review documents when you have real ones.

---

## 5. Deploy the Studio (optional)

Only needed if someone other than you should edit content without running it
locally.

```bash
cd studio
npm run deploy            # asks for a hostname -> https://<name>.sanity.studio
```

**Keep it out of the index.** `studio/static/robots.txt` disallows all crawlers
and is served from the root of the deployed Studio. Do not delete that file. If
you ever move the Studio onto `egipskiewakacje.pl` instead of a `.sanity.studio`
subdomain, add an `X-Robots-Tag: noindex` response header at the host level too -
a `robots.txt` disallow stops crawling, not indexing of a URL someone links to.

Access is controlled by project membership in sanity.io/manage, not by the
hostname. Invite editors there.

---

## 6. Rebuild on publish - Sanity webhook to GitHub

The site is a static export, so content changes only appear after a rebuild.

### 6a. GitHub side

`.github/workflows/deploy.yml` already carries the trigger:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [sanity-publish]
```

Nothing to add there. Create a **fine-grained personal access token** with
**Contents: read and write** on `ahmedBahgatt/egipskiewakacje.pl` - that is the
scope `repository_dispatch` requires. Store it in a password manager; you paste
it into the Sanity webhook header in the next step.

### 6b. Sanity side

<https://www.sanity.io/manage> -> project `ej04dib0` -> **API** -> **Webhooks**
-> **Create webhook**:

| Field | Value |
| --- | --- |
| Name | `Rebuild site` |
| URL | `https://api.github.com/repos/ahmedBahgatt/egipskiewakacje.pl/dispatches` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `!(_id in path("drafts.**")) && _type in ["tour","blogPost","destination","siteSettings","legalPage","faq","author","tourCategory","review"]` |
| Projection | `{"event_type": "sanity-publish"}` |
| HTTP method | `POST` |
| API version | `v2021-03-25` |
| Include drafts | off |

Headers:

```
Authorization: Bearer <github-pat>
Accept: application/vnd.github+json
X-GitHub-Api-Version: 2022-11-28
```

The `drafts.**` filter matters: without it every keystroke autosaved as a draft
fires a rebuild.

Test it by publishing a trivial edit and watching the Actions tab. GitHub
answers `repository_dispatch` with `204 No Content` and no body, which the
Sanity webhook log shows as a success with an empty response - that is correct.

---

## 7. Switch production to Sanity

Only after step 4 has run and you have eyeballed the documents in the Studio.

Locally, to try it first:

```bash
# .env.local
NEXT_PUBLIC_CONTENT_SOURCE=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=ej04dib0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

```bash
npm run verify     # typecheck + lint + unit tests
npm run build      # static export into out/
```

In production, the switch is a **GitHub repository variable**: Settings ->
Secrets and variables -> Actions -> **Variables** -> New repository variable,
`NEXT_PUBLIC_CONTENT_SOURCE` = `sanity`. Rerun the workflow (or publish anything
in the Studio) and the next build reads from the CMS.

> **One-line workflow change is still required for that to take effect.**
> `.github/workflows/deploy.yml` currently hardcodes
> `NEXT_PUBLIC_CONTENT_SOURCE: local` in the build job's `env:`. Change it to
> `NEXT_PUBLIC_CONTENT_SOURCE: ${{ vars.NEXT_PUBLIC_CONTENT_SOURCE || 'local' }}`
> so the repository variable wins and the default stays `local`.

Check `out/` before publishing: open a tour page and a `/poradnik/` page and
confirm prices, the pickup window, the guide-language label, the hero image and
the article body all render. Because the adapter falls back to local content per
collection, a broken query looks like "nothing changed", not like an error - so
compare against something you edited in the Studio on purpose.

To roll back: set the variable to `local` and rerun the workflow. Nothing else
changes.

Note that only **tours** and **blog posts** are read from Sanity today - those
are the only two GROQ queries in `src/content/sanity/queries.ts`. Destinations,
legal pages, site settings, FAQ and reviews are seeded into the CMS so the
content model is complete, but the frontend keeps reading them from the local
files until matching queries are added there.

---

## 8. Editing rules worth keeping

These are enforced in the schema, and they are the reason the site reads as
trustworthy:

- **`guidePolishConfirmed` starts at `false`.** Tick it only when the operator
  unambiguously confirms a Polish-speaking guide. The Sharm el Sheikh tour is
  seeded with `false` and the label "Potwierdzamy przed rezerwacją" because the
  operator's own page contradicts itself. Do not "fix" that by guessing.
- **`priceLastVerifiedAt` is required** and shown on the page. Update it when
  you re-check a price, not when you edit unrelated copy.
- **There are no discount, old-price, countdown or bestseller fields.** That is
  deliberate. Do not add them.
- **`excluded` should list everything people mistake for included** - drinks,
  the pyramid interior ticket, the Nile cruise.
- **Every image needs a real Polish `alt`.** It is a required field, and it
  describes what is in the photo - not the page it sits on.
- **Set the hotspot on hero images.** The same file is cropped to a wide banner,
  a square card and a 1200x630 OG preview; the hotspot is what keeps the subject
  in all three.
- **Legal pages still carry a warning callout** about missing operator identity
  (entity name, address, registration numbers). Remove the callout only when the
  real data is filled in and reviewed.
- **Body text is a closed block set** - heading, paragraph, list, callout,
  image, gallery, quote, table, link button and related-tour card. There is no
  rich-text or HTML field anywhere, so nothing from the CMS can inject markup
  into the page. Legal pages are restricted to the four text blocks.
- **Heading anchors must be unique within a document** - they drive the table of
  contents and in-page links. The "Generate" button strips Polish diacritics for
  you.
- **Table rows must have exactly as many cells as there are headers.** The
  schema refuses to save otherwise.

---

## Troubleshooting

**Seed aborts with "ID COLLISION"** - an existing document occupies one of the
seed ids under a different type. Open it in the Studio (`Dokumenty legacy` for
`tourPackage`), decide what it is, then re-run with `--force` if it is safe to
overwrite.

**Seed aborts with "Missing image file(s) under public/media"** - a path in
`seed/data.mjs` does not exist. Paths are relative to `public/media` and include
the extension (`tours/hurghada-kair.jpg`). Nothing was uploaded or written.

**Seed says "Could not load @sanity/client"** - run `npm install` inside
`studio/`. The no-token dry run works without any dependencies; uploading and
writing do not.

**Images uploaded twice** - they were not identical files. Deduplication is by
SHA-1 of the bytes, so a re-exported or re-compressed JPG counts as new. Delete
the orphan in the Studio's media browser.

**Studio shows "unknown type" documents** - that is the legacy `tourPackage`
data. Expected. Not an error.

**Site looks unchanged after switching to sanity mode** - the per-collection
fallback kicked in. Check in this order: the repository variable actually
reaches the build (see the note in step 7), `published == true` on the
documents, the dataset is public (Manage -> API -> Dataset visibility), and the
field names still match `src/content/sanity/queries.ts`. Vision (the Studio's
query tab) is the fastest way to see what the query actually returns - paste the
query from `queries.ts` into it.

**Studio field renamed and now something is blank** - see the field-name
contract table at the top.
