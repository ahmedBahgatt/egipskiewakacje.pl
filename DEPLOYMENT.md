# Deployment

The site is a static export deployed to **GitHub Pages** through the official GitHub Actions Pages pipeline, served on the custom domain **egipskiewakacje.pl** over HTTPS.

- Repository: <https://github.com/ahmedBahgatt/egipskiewakacje.pl>
- Production URL: <https://egipskiewakacje.pl>
- Build output: `out/` (from `next build` with `output: "export"`)

> **Do not change the GoDaddy DNS records.** See [DNS](#dns-do-not-change) below.

---

## Table of contents

- [How the pipeline works](#how-the-pipeline-works)
- [Required repository settings](#required-repository-settings)
- [Custom domain handling](#custom-domain-handling)
- [DNS - do not change](#dns-do-not-change)
- [Triggers](#triggers)
  - [Push to main](#1-push-to-main)
  - [Manual run - workflow_dispatch](#2-manual-run---workflow_dispatch)
  - [Sanity-triggered rebuild - repository_dispatch](#3-sanity-triggered-rebuild---repository_dispatch)
- [Environment variables in CI](#environment-variables-in-ci)
- [Verifying a deployment](#verifying-a-deployment)
- [Rollback](#rollback)
- [Branches and tags of record](#branches-and-tags-of-record)
- [Moving to another host later](#moving-to-another-host-later)
- [Troubleshooting](#troubleshooting)

---

## How the pipeline works

A single workflow in `.github/workflows/` performs two jobs.

**Job 1 - build**

1. Checks out the repository.
2. Sets up Node.js (version from `.nvmrc`, currently 20) with npm caching.
3. Installs dependencies with `npm ci` (lockfile-exact, no drift).
4. Runs the quality gate: `npm run typecheck`, `npm run lint`, `npm test`. A failure here stops the deployment - broken output never reaches production.
5. Runs `npm run build`. `next.config.ts` sets `eslint.ignoreDuringBuilds: false` and `typescript.ignoreBuildErrors: false`, so the build itself is a second gate.
6. Uploads `out/` as a Pages artifact (`actions/upload-pages-artifact`).

**Job 2 - deploy**

1. Waits for the build job.
2. Publishes the artifact with `actions/deploy-pages` into the `github-pages` environment.

The workflow uses the official Pages permissions model:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false
```

`concurrency` with `cancel-in-progress: false` means two rapid pushes queue rather than cancel each other, so the last commit always wins deterministically.

The media pipeline (`npm run media`, `npm run media:video`) does **not** run in CI. Generated assets under `public/media/` are committed to the repository and shipped as-is. This keeps CI fast and removes `ffmpeg` from the CI dependency surface.

---

## Required repository settings

In **Settings -> Pages**:

| Setting | Required value |
| --- | --- |
| Source | **GitHub Actions** (not "Deploy from a branch") |
| Custom domain | `egipskiewakacje.pl` |
| Enforce HTTPS | Enabled |

In **Settings -> Environments -> github-pages**: leave the default protection rules unless you deliberately want a manual approval step before every production deploy.

If Source is ever switched back to "Deploy from a branch", the Actions deployment silently stops taking effect. That is the first thing to check when a green workflow does not change the live site.

---

## Custom domain handling

Two things reference the domain, and they must agree:

1. **The Pages setting** (`Settings -> Pages -> Custom domain`). This is the **source of truth**. GitHub uses it to provision and renew the TLS certificate.
2. **`public/CNAME`**, containing exactly `egipskiewakacje.pl`. It is copied into `out/CNAME` by the export and re-asserts the domain on every deploy.

Keeping `public/CNAME` in the repository prevents the classic GitHub Pages failure mode where an Actions deployment overwrites the site root and drops the `CNAME` file, which clears the custom domain and breaks HTTPS until it is re-entered by hand.

Rules:

- Never delete `public/CNAME`.
- Never put a different hostname in `public/CNAME` than the one configured in the Pages setting.
- If you must change the domain, change the Pages setting **first**, wait for the certificate to be reissued, then update `public/CNAME` in the same change window.

---

## DNS - do not change

DNS for `egipskiewakacje.pl` is managed at **GoDaddy** and is already correct.

**Do not modify, delete or "clean up" any DNS record at GoDaddy.** The apex and `www` records currently resolve to GitHub Pages, and the TLS certificate GitHub issues is bound to that configuration. A DNS edit can:

- invalidate the GitHub-issued certificate and produce browser TLS warnings on the live site,
- take the domain offline for as long as the previous TTL,
- silently disable "Enforce HTTPS" in the Pages settings.

If a DNS change is genuinely required (for example moving hosts), plan it as its own change window with the owner, and read [Moving to another host later](#moving-to-another-host-later) first.

---

## Triggers

The workflow declares three triggers:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [sanity-publish]
```

### 1. Push to main

The normal path. Merge or push to `main` and the site rebuilds and deploys.

Work happens on feature branches (current working branch: `build/v1-cairo-tours`) and reaches production through a merge into `main`.

### 2. Manual run - workflow_dispatch

Use when nothing in the repository changed but you want a fresh build - for example after seeding Sanity, or to re-issue the deployment after changing a Pages setting.

- UI: **Actions -> Deploy to GitHub Pages -> Run workflow -> main**.
- CLI:

```bash
gh workflow run "Deploy to GitHub Pages" --ref main
gh run watch
```

### 3. Sanity-triggered rebuild - repository_dispatch

Because the site is static, content published in Sanity only appears after a rebuild. A Sanity webhook (or any external system) can trigger one by sending a `repository_dispatch` with the event type `sanity-publish`.

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_PAT" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/ahmedBahgatt/egipskiewakacje.pl/dispatches \
  -d '{"event_type":"sanity-publish"}'
```

Notes:

- `$GITHUB_PAT` must be a token with **write access to this repository only** - a fine-grained PAT scoped to `ahmedBahgatt/egipskiewakacje.pl` with the `contents: write` permission. Do not use a classic token with broad `repo` scope.
- Store the token in the Sanity webhook configuration, never in this repository.
- A successful call returns HTTP `204` with an empty body.
- `repository_dispatch` always runs against the repository default branch (`main`).
- This trigger is only meaningful once `NEXT_PUBLIC_CONTENT_SOURCE=sanity` is actually in use. While the site is in local content mode, a `sanity-publish` rebuild produces an identical site.

---

## Environment variables in CI

The production build needs **no secrets**. Everything required has a safe default in code.

| Variable | In CI | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTENT_SOURCE` | optional | Unset or `local` today. Set to `sanity` in the workflow env only after the dataset is seeded and verified. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` | optional | Public values, already defaulted in `src/content/sanity/adapter.ts`. |
| `NEXT_PUBLIC_SITE_URL` | optional | Defaults to `https://egipskiewakacje.pl`. |
| `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_GTM_ID` | not set | Leaving these unset keeps analytics a true no-op with no cookies and no banner. Do not set them without first reading [ANALYTICS.md](./ANALYTICS.md). |
| `SANITY_WRITE_TOKEN` | **never** | Script/server only. It must never appear in the Pages workflow, never be prefixed with `NEXT_PUBLIC_`, and never be committed. If it is ever needed by an automation, add it as a repository **secret** used by a separate, non-Pages workflow. |

Every `NEXT_PUBLIC_*` value is inlined into the published static files and is therefore public by definition. Never place a secret behind that prefix.

---

## Verifying a deployment

After the workflow reports success:

```bash
# 1. The site is live and served over HTTPS
curl -sSI https://egipskiewakacje.pl/ | head -n 1

# 2. HTTP redirects to HTTPS
curl -sSI http://egipskiewakacje.pl/ | grep -i '^location'

# 3. The custom domain survived the deploy
curl -sS https://egipskiewakacje.pl/CNAME

# 4. Key routes resolve with their trailing slash
for p in / /wycieczki/ /cennik/ /rezerwacja/ \
         /wycieczki-z-hurghady/kair-piramidy-muzeum-egipskie/ \
         /wycieczki-z-marsa-alam/kair-stary-kair-piramidy/ \
         /wycieczki-z-sharm-el-sheikh/kair-gem-piramidy/; do
  printf '%s -> %s\n' "$p" "$(curl -o /dev/null -sS -w '%{http_code}' "https://egipskiewakacje.pl$p")"
done

# 5. Crawl surface
curl -sS https://egipskiewakacje.pl/robots.txt
curl -sS https://egipskiewakacje.pl/sitemap.xml | head -n 20
```

Also confirm in a browser that the WhatsApp button opens `wa.me/201055850536`.

---

## Rollback

Pick the smallest option that fixes the problem.

**Option A - revert the offending commit (preferred).** History stays linear and auditable, and the redeploy is automatic.

```bash
git checkout main
git pull
git revert <bad-sha>     # or: git revert <first-sha>..<last-sha>
git push origin main
```

**Option B - redeploy a known-good commit.** In **Actions -> Deploy to GitHub Pages**, open the last successful run for the good commit and choose **Re-run all jobs**. This republishes that exact artifact without touching history.

**Option C - restore the previous placeholder site.** The site that was live before this build is preserved:

- branch `backup/static-placeholder-2026-08-08`
- tag `placeholder-2026-08-08`

To put it back, restore its content onto `main` as a new commit (do not force-push `main`):

```bash
git checkout main
git pull
git restore --source=placeholder-2026-08-08 --staged --worktree -- .
git commit -m "revert: restore static placeholder site"
git push origin main
```

Verify afterwards that `public/CNAME` (or the root `CNAME`, depending on the placeholder layout) still contains `egipskiewakacje.pl`, and that **Settings -> Pages -> Source** still matches whatever the restored site expects. The placeholder was a plain static `index.html`; if it is restored, the Pages source may need to point at a branch rather than Actions.

In all cases: **do not touch DNS during a rollback.** Rollback is a content operation, not a DNS operation.

---

## Branches and tags of record

| Ref | Purpose |
| --- | --- |
| `main` | Production. Every push deploys. |
| `build/v1-cairo-tours` | Working branch for the v1 site build. |
| `backup/static-placeholder-2026-08-08` | Full snapshot of the previous placeholder site. |
| `placeholder-2026-08-08` (tag) | Immutable pointer to the same snapshot. |

Never delete the backup branch or the tag. Never force-push `main`.

---

## Moving to another host later

The project was built to be host-independent: static export, no server routes, no Server Actions, no runtime image optimizer, no environment-specific paths, and no absolute host references outside `siteConfig.url`. Moving hosts does **not** require changing any URL, so rankings and inbound links are preserved.

### To Vercel

1. Import the repository in Vercel. Framework preset: Next.js. Build command `npm run build`.
2. Keep `output: "export"` (Vercel serves the static export) or drop it if you later want ISR or server features. Keep `trailingSlash: true` either way - changing it changes every URL.
3. Add the environment variables you actually need (see the table above). Never add `SANITY_WRITE_TOKEN` to the frontend project.
4. Add the domain in Vercel, then **plan a DNS change window with the owner**. Until DNS is repointed, Vercel serves on its own subdomain and production remains on GitHub Pages.
5. Cut over, verify with the checks in [Verifying a deployment](#verifying-a-deployment), then disable the GitHub Pages deployment.

If `images.unoptimized` is later set back to `false` on Vercel, re-check the `<picture>`-based `OptimizedImage` component first - it already serves AVIF/WebP/JPG and does not need the Next optimizer.

### To Cloudflare Pages

1. Connect the repository. Build command `npm run build`, output directory `out`.
2. Set the Node version to 20 (`NODE_VERSION=20` or `.nvmrc` is honoured).
3. Add the custom domain in Cloudflare Pages. If the domain is moved onto Cloudflare nameservers this is a **registrar-level change at GoDaddy** - treat it as a separate, owner-approved change window, not part of a deployment.

### Rules that apply to any host

- Keep `trailingSlash: true`. Turning it off rewrites every URL on the site.
- Keep the route structure. The Polish slugs are the SEO asset - see [SEO_PLAN.md](./SEO_PLAN.md).
- Keep `public/CNAME` until GitHub Pages is fully decommissioned; it is harmless on other hosts.
- Re-verify `robots.txt` and `sitemap.xml` after the move, and re-submit the sitemap in Search Console.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Workflow is green but the site is unchanged | Pages Source reset to "Deploy from a branch" | Set Source back to **GitHub Actions**, then re-run the workflow |
| Custom domain cleared after a deploy | `public/CNAME` missing from the export | Restore `public/CNAME` with `egipskiewakacje.pl`, redeploy, re-enter the domain in Settings -> Pages if needed |
| "Enforce HTTPS" greyed out | Certificate not provisioned yet, or DNS changed | Wait for provisioning; do not edit DNS. If DNS was edited, revert it |
| Build fails on lint or types | Intentional - the build is a quality gate | Fix locally with `npm run verify`, then push |
| 404 on a page that exists locally | Missing trailing slash, or route not exported | Link with the trailing slash; confirm the page exists in `out/` after `npm run build` |
| Images 404 in production | Base path referenced with an extension, or media not committed | `OptimizedImage` appends `.avif`/`.webp`/`.jpg` to an extensionless base; run `npm run media` and commit `public/media/` |
| `repository_dispatch` returns 404 | PAT lacks write access to the repository | Issue a fine-grained PAT scoped to this repository with `contents: write` |
