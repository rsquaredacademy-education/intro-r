# Revision Notes

**Date:** 2026-10-05
**Scope:** Structural and build-consistency review (wave 1 — correctness)
**Author:** automated review pass

Part of a workspace-wide standard for all six books, documented at
[`viz-base/AUTHOR-STANDARDS.md`](https://github.com/rsquaredacademy-education/viz-base/blob/master/AUTHOR-STANDARDS.md). This file records only what changed in
**this** repository.

---

## Summary

One change: a root `LICENSE` file was added.

No content, structure, configuration or CI changes were made to this repository
in this pass. It was reviewed and found to need no wave-1 corrections.

---

## 1. LICENSE added

`LICENSE` — verbatim CC BY-NC-SA 4.0 International legal code (438 lines),
fetched from `creativecommons.org`. License text is never reconstructed from
memory.

This is the substantive finding for this book: CC BY-NC-SA 4.0 was declared in
the README and on a licence line in the Preface, but **no `LICENSE` file
existed** in any of the six books. The declaration was prose-only and
unenforceable by tooling or by anyone cloning the repository.

---

## Verification

- `LICENSE` is byte-identical (SHA256) across all six books.
- LF line endings.
- Confirmed visible to git as a new file and matched by no ignore rule.
- No render was necessary — nothing else in this book changed.

---

## Before committing

- Suggested message: `chore: add LICENSE`

---

## Not done here (tracked in the workspace checklist)

This book needed no wave-1 corrections, so the open items are all later-wave
work:

- **Deploy target is ambiguous.** The workflow (`ci.yml`) commits `docs/` for
  GitHub Pages, but the repo also ships `netlify.toml` with ~14 redirects, and
  CI Gate 2 checks that "legacy slugs must not exist as stale files shadowing
  **Netlify** 301s". House standard is Netlify (wave 4); this needs a decision
  about which host is actually live.
- **CI has no `renv.lock` gate** — it installs an explicit package list via
  `setup-r-dependencies`, so pinned versions are not restored. The repo does
  carry a `renv.lock` (101 KB) and a `.Rprofile`.
- Quarto is pinned to `1.6.40`, consistent with house standard. Good.
- PDF uses Typst, consistent with house standard. Good.
- `index.qmd` has `title:` in front matter — **this is correct here** and was
  deliberately left alone: it is the book landing page, where `title`/`author`/
  `date` belong, not a numbered chapter. Nine chapters in another book had the
  same key and *were* fixed, because they also had `#` H1s competing with it.
- `_extensions/` contains both `coatless/webr/` and a duplicate top-level
  `webr/` with identical contents. Wave 9.
- Best `AGENTS.md` in the workspace — the only one carrying book-specific state
  (current phase, the CI gate list, the CRLF/`_ga_partial.html` warning, and the
  "author R >= 4.4, no `%>%`, teach the native `|>`" rule). Worth using as the
  template for the other five, which still carry identical 300-byte boilerplate.
- Chapter H1 discipline, `{.unnumbered}` usage, and filename slugs already
  conform. Nothing needed changing.