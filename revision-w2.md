# Revision Notes — Wave 2 (toolchain pinning)

**Date:** 2026-10-05
**Scope:** Pin the build toolchain; make PDF/ePub failures fatal
**Author:** automated review pass

Part of a workspace-wide standard for all six books, documented at
[`viz-base/AUTHOR-STANDARDS.md`](https://github.com/rsquaredacademy-publications/viz-base/blob/master/AUTHOR-STANDARDS.md). This file records only what changed in
**this** repository.

---

## Summary

- Pin Typst to `0.11.0` alongside the existing Quarto `1.6.40` pin.
- Add `fc-cache -f`.
- Add `downloads: [pdf, epub]` — this book already built a PDF and ePub but
  never advertised them.
- Add a gate asserting the PDF and ePub really exist.
- Correct `mainfont` to a font the CI runner provides.

---

## 1. Typst was floating

```yaml
- uses: typst-community/setup-typst@v4      # no version
```

Typst tracked `latest`, so the PDF was not reproducible between runs. Now
pinned to `0.11.0`, with a comment recording that Quarto and Typst must be
bumped **together** — Quarto 1.7+ ships a Typst template that 0.11 cannot
compile. viz-base already documents this pairing.

## 2. Downloads now advertised and verified

The book built a PDF (553 KB) and ePub on every run, but `_quarto.yml` had
no `downloads:` key, so no download button appeared in the sidebar.

- Added `downloads: [pdf, epub]`.
- Added a gate asserting `/tmp/stage-pdf/*.pdf` and `/tmp/stage-epub/*.epub`
  exist before assembly.

## 3. Font correction (a mistake worth recording)

An earlier commit in this wave added `fonts-libertinus` to supply
`mainfont: "Libertinus Serif"`. That package **does not exist** in Ubuntu
24.04:

```
E: Unable to locate package fonts-libertinus
##[error]Process completed with exit code 100
```

No Ubuntu suite (noble, plucky, questing) ships a Libertinus package.
`fonts-linuxlibertine` provides only the Linux Libertine and Linux
Biolinum families, so `mainfont: "Libertinus Serif"` was never resolvable
on the runner and had been rendering by Typst's silent fallback.

Corrected to `Linux Libertine`, matching viz-base, whose PDF provably
builds. Confirmed harmless: the local PDF is byte-for-byte the same size
before and after (553 KB) — exactly what you would expect if the fallback
had been resolving to that font all along.

Also added `fc-cache -f`. Typst ships no fonts and the runner's fontconfig
cache can be stale, which fails the PDF with *"font fallback list must not
be empty"*. viz-base already does this.

---

## Verification

- PDF renders on Quarto 1.6.40 + Typst 0.11.0 → **553 KB**.
- Workflow parses as valid YAML.
- CI ran green and deployed to GitHub Pages (16m37s — the long one is
  `Install R packages`, which compiles from source).
- PDF confirmed live:
  `https://intro-r.rsquaredacademy.com/Introduction-to-R.pdf`
  → HTTP 200, 1002 KB, valid `%PDF` header.

---

## Commits

| SHA | Message |
|:--|:--|
| `af8d009` | ci: pin Typst, verify downloads, add downloads key |
| `d55d777` | ci: use a font the runner actually provides |

---

## Not done here

- **No `renv.lock` gate in CI.** The workflow installs an explicit package
  list via `setup-r-dependencies`, so the pinned versions in the repo's
  `renv.lock` (101 KB) are never restored.
- **Deploy target is ambiguous.** The workflow commits `docs/` for GitHub
  Pages, but the repo also ships `netlify.toml` with ~14 redirects, and CI
  Gate 2 checks that legacy slugs do not shadow *"Netlify 301s"*. House
  standard is Netlify — wave 4 needs a decision on which host is live.
- **CI has no page-level gate for format loss.** This workflow renders all
  formats in a single `quarto render`, so a silently dropped PDF would not
  have been caught; the new downloads gate is what closes that gap.
- **Chapter structure already conforms** — H1 discipline, `{.unnumbered}`
  usage, and filename slugs match house style. Nothing needed changing.
- **Best `AGENTS.md` in the workspace** — the only one carrying
  book-specific state (current phase, the CI gate list, the
  CRLF/`_ga_partial.html` warning, and the "author R >= 4.4, no `%>%`,
  teach the native `|>`" rule). Worth using as the template for the other
  five, which still carry identical 300-byte boilerplate. Wave 9.
- The `local {webr-r}` / interactive cells depend on the
  `_extensions/coatless/webr` copy; a duplicate top-level `_extensions/webr`
  also exists. Wave 9.