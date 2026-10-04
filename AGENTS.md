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
- **There is no perf gate in CI, on purpose.** `scripts/perf-audit.mjs` is a
  local tool you run deliberately, not a CI step. Lighthouse mobile scores were
  too noisy on shared runners to gate on, and a gate that reddens on
  measurement noise gets ignored. Run it locally with `--runs 3`. The 4500ms
  threshold is runner-calibrated; this machine has measured 4172ms and 4703ms on
  the same build, so if it trips, add `--lcp-budget 5000` rather than editing the
  committed budget. Do not re-add a Lighthouse step without RUM to back it.

## Notes

- `roadmap/` is git-ignored via `.gitignore` and never committed.
- **Never commit `docs/` from a local render.** Local renders are HTML-only
  (`typst not found` — Typst is installed in CI only) and pick up CRLF
  artifacts from `_ga_partial.html` that inject blank lines into every page.
  The CI `Commit docs` job owns `docs/`; leave it out of local commits.
- CI gates that actually block: no `??` cross-refs, redirect targets exist and
  resolve, sitemap covers every page, webR cell count <= 5.
- Author R >= 4.4. No `%>%`; teach the native `|>` only.
