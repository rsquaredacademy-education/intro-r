# Revision Notes — Wave 3 (CI convergence)

**Date:** 2026-10-05
**Scope:** One workflow shape per book; gates that cannot drift
**Author:** automated review pass

Part of a workspace-wide standard for all six books, documented at
[`viz-base/AUTHOR-STANDARDS.md`](https://github.com/rsquaredacademy-publications/viz-base/blob/master/AUTHOR-STANDARDS.md).
This file records only what changed in **this** repository.

---

## Summary

- Rename `ci.yml` to `render.yml`, and align its internal `name:` with the others.
- Replace Gate 2's hand-maintained 15-slug list with `scripts/verify-slugs.sh`.
- Replace Gate 4's count-based sitemap check with `scripts/verify-sitemap.sh`.
- Delete the stale root `sitemap.xml`; it is now generated.
- Split the stale-slug check into its own gate.
- Add a weekly `linkcheck.yml`.

---

## 1. This book had the most elaborate gates — and one that could not fail

Gate 4 counted pages against `<url>` entries:

```yaml
pages=$(ls docs/*.html | grep -v 404.html | grep -v 'google.*\.html' | wc -l)
urls=$(grep -c '<url>' docs/sitemap.xml)
if [ "$pages" -ne "$urls" ]; then ...
```

That looks thorough, but it is not. viz-base had **17 entries for 17 pages while
omitting `privacy.html` entirely**, because a bare `/` root entry that is not a
page offset the missing one. A count-based gate passes that class of bug by
construction.

`scripts/verify-sitemap.sh` compares the *set* of pages against the *set* of URLs
and names the difference.

---

## 2. The slug list is now derived

Gate 2 listed 15 slugs by hand. `scripts/verify-slugs.sh` reads them from
`_quarto.yml` instead, so a new chapter is covered when declared.

The stale-slug check moved to its own gate rather than sharing Gate 2, because
"this legacy URL must **not** exist" is a different assertion from "every
declared chapter **does** exist". Conflating them made the original gate harder
to read.

---

## 3. The sitemap was missing three live pages

The root `sitemap.xml` omitted `first-plot.html`, `first-wrangle.html` and
`projects-import.html`. All three are live and linked from the book — they were
simply absent from the sitemap.

`scripts/make-sitemap.sh` generates the file from the rendered pages instead.
All three are now listed, and the root file is deleted.

---

## 4. Workflow renamed

`ci.yml` → `render.yml`, matching the other five books. The internal `name:` was
still `CI`, which was the last inconsistency of its kind, and is now
`Build & Deploy to GitHub Pages (docs/)`.

Only the display label changed; the workflow key is the filename, so behaviour
is identical.

---

## Verification

- Slug gate: all 15 chapters pass against committed `docs/`.
- Sitemap gate: all 15 pages covered, including the three that were missing.
- Workflow parses as valid YAML; 18 steps.
- CI green. All six gates passed on the runner, not just locally:

```
Gate 1 - no unresolved cross-references   completed/success
Gate 2 - slugs rendered                   completed/success
Gate 3 - no stale legacy slugs            completed/success
Gate 4 - redirect targets resolve         completed/success
Gate 5 - sitemap covers every page        completed/success
Gate 6 - link check (advisory)            completed/success
```

Confirmed live: `https://intro-r.rsquaredacademy.com/sitemap.xml` now lists 15
URLs and includes `first-plot.html`.

---

## Commits

| SHA | Message |
|:--|:--|
| `b650517` | ci: derive gates from _quarto.yml and regenerate the sitemap |
| `d99330e` | ci: align workflow name with the other books |

---

## Not done here

- **No `renv.lock` gate in CI.** The workflow installs an explicit package list
  via `setup-r-dependencies`, so the pinned versions in the repo's `renv.lock`
  (101 KB) are never restored. This is why `Install R packages` compiles from
  source for ~20 minutes on every run.
- **Deploy target is still ambiguous.** The workflow commits `docs/` for GitHub
  Pages, but the repo also ships `netlify.toml` with ~14 redirects, and Gate 4
  checks that legacy slugs do not shadow *"Netlify 301s"*. House standard is
  Netlify — wave 4 needs a decision on which host is live.
- **Best `AGENTS.md` in the workspace** — the only one carrying book-specific
  state. Worth using as the template for the other five. Wave 9.
- Chapter structure already conforms: H1 discipline, `{.unnumbered}` usage and
  filename slugs all match house style.
- A duplicate top-level `_extensions/webr` sits alongside
  `_extensions/coatless/webr`. Wave 9.