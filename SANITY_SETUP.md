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
  seed/                    one-off import of the current content
src/content/index.ts       the ONLY module pages import content from
src/content/sanity/        GROQ queries + read-only fetch (no token)
```

The frontend never writes to Sanity and never holds a token. In `sanity` mode it
does anonymous reads against the public CDN at build time. If a query returns
nothing, `src/content/index.ts` falls back to the local content, so a
half-seeded dataset still produces a complete site.

`studio/` is invisible to the frontend build: it has its own `package.json`, and
the root `tsconfig.json` and `eslint.config.mjs` both exclude it. Do not add it
to the root `package.json` as a workspace.

### The field-name contract

`src/content/sanity/queries.ts` maps Sanity fields onto the frontend types in
`src/content/types.ts`. Some names differ between the two sides:

| Sanity field | Frontend |
| --- | --- |
| `adultPrice`, `childPrice`, `infantFree`, `childAgeMinimum`, `childAgeMaximum`, `currency`, `priceLastVerifiedAt`, `priceVariable` | `Tour.price` |
| `guideLanguageLabel`, `guidePolishConfirmed` | `Tour.guide` |
| `pickupTime`, `returnTime` | `pickupLabel`, `returnLabel` |
| `extraFees` | `transferSupplements` |
| `FAQs` (tour), `FAQ` (blogPost) | `faqs` |
| `relatedArticles[0]` | `relatedPostSlug` |
| `seoTitle`, `seoDescription`, `ogImage`, `route` | `Tour.seo` / `BlogPost.seo` |

Renaming a field in `studio/schemas/` without editing `queries.ts` breaks sanity
mode silently: the query returns `null` for that field and the page renders
blank instead of failing loudly. Change both files together.

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
before seeding. `npm run deploy` (step 4) publishes the *Studio UI*; it does not
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

## 3. Seed the dataset

```bash
cd studio
node ./seed/seed.mjs                          # dry run - no token needed, no deps needed
SANITY_WRITE_TOKEN=sk... npm run seed:dry     # dry run against the live dataset
SANITY_WRITE_TOKEN=sk... npm run seed         # writes
```

The seed mirrors the current local content exactly: 3 destinations, 3 tours,
1 article, 3 legal pages, site settings, 1 author (`Zespół Egipskie Wakacje`),
2 tour categories and the 8 site-wide FAQ entries - 22 documents.

Safety properties:

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
  these instructions and exits 0.

One thing to check first: the seed writes `_id: "siteSettings"`. If a legacy
document already sits at that exact id *and* is also of type `siteSettings`, the
collision guard will not fire and it will be replaced. Open it in the Studio
first if you care about its contents.

Reviews are deliberately **not** seeded. The frontend renders only
`verified: true` reviews and hides the whole section when there are none. Add
review documents when you have real ones.

---

## 4. Deploy the Studio (optional)

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

## 5. Rebuild on publish - Sanity webhook to GitHub

The site is a static export, so content changes only appear after a rebuild.

### 5a. GitHub side

The repository has **no workflow file yet** (`.github/workflows/` does not
exist). Whoever adds the deploy workflow needs this trigger on it:

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [sanity-publish]
```

Then create a fine-grained personal access token with **Contents: read and
write** on `ahmedBahgatt/egipskiewakacje.pl` - that is the scope
`repository_dispatch` requires.

### 5b. Sanity side

<https://www.sanity.io/manage> -> project `ej04dib0` -> **API** -> **Webhooks**
-> **Create webhook**:

| Field | Value |
| --- | --- |
| Name | `Rebuild site` |
| URL | `https://api.github.com/repos/ahmedBahgatt/egipskiewakacje.pl/dispatches` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `!(_id in path("drafts.**")) && _type in ["tour","destination","blogPost","legalPage","siteSettings","faq","author","tourCategory","review"]` |
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

## 6. Switch the frontend to Sanity

Only after step 3 has run and you have eyeballed the documents in the Studio.

```bash
# .env.local (or the repository/CI environment)
NEXT_PUBLIC_CONTENT_SOURCE=sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=ej04dib0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

```bash
npm run verify     # typecheck + lint + unit tests
npm run build      # static export into out/
```

Check `out/` before publishing: open a tour page and a `/poradnik/` page and
confirm prices, the pickup window, the guide-language label and the article body
all render. Because the adapter falls back to local content per collection, a
broken query looks like "nothing changed", not like an error - so compare
against something you edited in the Studio on purpose.

To roll back: set `NEXT_PUBLIC_CONTENT_SOURCE=local` and rebuild. Nothing else
changes.

Note that only **tours** and **blog posts** are read from Sanity today - those
are the only two GROQ queries in `src/content/sanity/queries.ts`. Destinations,
legal pages, site settings, FAQ and reviews are seeded into the CMS so the
content model is complete, but the frontend keeps reading them from the local
files until matching queries are added there.

---

## 7. Editing rules worth keeping

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
- **Legal pages still carry a warning callout** about missing operator identity
  (entity name, address, registration numbers). Remove the callout only when the
  real data is filled in and reviewed.
- **Body text is a closed block set** (heading / paragraph / list / callout).
  There is no rich-text or HTML field anywhere, so nothing from the CMS can
  inject markup into the page.
- **Anchor ids on headings must be unique within a document** - they drive the
  table of contents and in-page links.

---

## Troubleshooting

**Seed aborts with "ID COLLISION"** - an existing document occupies one of the
seed ids under a different type. Open it in the Studio (`Dokumenty legacy` for
`tourPackage`), decide what it is, then re-run with `--force` if it is safe to
overwrite.

**Seed says "Could not load @sanity/client"** - run `npm install` inside
`studio/`. The no-token dry run works without any dependencies; writing does not.

**Studio shows "unknown type" documents** - that is the legacy `tourPackage`
data. Expected. Not an error.

**Site looks unchanged after switching to sanity mode** - the per-collection
fallback kicked in. Check in this order: `published == true` on the documents,
the dataset is public (Manage -> API -> Dataset visibility), and the field names
still match `src/content/sanity/queries.ts`. Vision (the Studio's query tab) is
the fastest way to see what the query actually returns - paste the query from
`queries.ts` into it.

**Studio field renamed and now something is blank** - see the field-name
contract table at the top.
