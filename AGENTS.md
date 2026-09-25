# AGENTS.md — Persistent Workflow Instructions

This file stores standing instructions so they don't need repeating.

## Workflow

1. Start with Phase 0 and Phase 1 (per `roadmap/roadmap.md`, which is git-ignored local planning material).
2. Fix one issue at a time (one logical change per commit).
3. Commit the changes with a short single-line commit message.
4. Use Conventional Commits style for commit messages (e.g. `fix: ...`, `chore: ...`, `docs: ...`, `ci: ...`).
5. Push the changes to the remote repo at the end of each phase (not after every single commit).

## Notes

- `roadmap/` is git-ignored via `.gitignore` and never committed.
- Phase 0: baseline only — no `.Rmd` source edits until baseline is logged.
- Phase 1: trust repair on the existing Bookdown stack, R >= 4.4.
