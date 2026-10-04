# AGENTS.md — Persistent Workflow Instructions

This file stores standing instructions so they don't need repeating.

## Workflow

1. Read `roadmap/roadmap.md` §7.4 first — it records what actually shipped. Sections 1–6 are the historical plan and are stale where they conflict with it.
2. Fix one issue at a time (one logical change per commit).
3. Commit the changes with a short single-line commit message.
4. Use Conventional Commits style for commit messages (e.g. `fix: ...`, `chore: ...`, `docs: ...`, `ci: ...`).
5. Push at the end of a batch of related commits, not after every single commit.

## Current state

All five roadmap phases are shipped. The site is Quarto, not Bookdown — sources
are `.qmd`, rendered with `quarto render` into `docs/`.

**Do not start from Phase 0 or Phase 1.** Those are complete. The open work is:

- **Static perf fix 2** (§7.3): `bootstrap-icons.woff` is 172 KB on every page
  to draw 5 icons, and Lato's `@import` inside the compiled theme CSS
  serialises the critical path. Both need a post-render patch of vendored
  Quarto output.
- **Perf budgets are advisory.** `.github/workflows/ci.yml` runs
  `scripts/perf-audit.mjs --runs 3` with `continue-on-error: true`; GitHub's
  runners throttle ~2.6x harder than a workstation, so the budgets need
  runner-specific recalibration before they can block.

## Notes

- `roadmap/` is git-ignored via `.gitignore` and never committed.
- **Never commit `docs/` from a local render.** Local renders are HTML-only
  (`typst not found` — Typst is installed in CI only) and pick up CRLF
  artifacts from `_ga_partial.html` that inject blank lines into every page.
  The CI `Commit docs` job owns `docs/`; leave it out of local commits.
- CI gates that actually block: no `??` cross-refs, redirect targets exist and
  resolve, sitemap covers every page, webR cell count <= 5.
- Author R >= 4.4. No `%>%`; teach the native `|>` only.
