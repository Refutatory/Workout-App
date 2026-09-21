# Project conventions

Drop this file in the project root (same folder Code Puppy is working in) before or right after you paste in the brief from `code-puppy-prompt.md`. Code Puppy reads `AGENTS.md` automatically for standing instructions, so this keeps it from "helpfully" reaching for tooling the brief explicitly rules out.

- No build step, no bundler, no framework (no React/Vue/Vite/webpack). Plain HTML/CSS/vanilla JS only.
- No `npm install` / no `node_modules`. Firebase JS SDK loaded via CDN `<script type="module">` ESM imports only, modular v10+ API — never the legacy "compat" script tags, never both mixed together.
- Firestore data lives under `syncKeys/{hashedKey}/...` as separate top-level subcollections (`routines`, `workouts`, `activities`, `diet`, `goalHistory`) plus a single `meta/settings` document. Never collapse this into one big user document.
- Auth is the sync-key scheme described in the brief only — do not add Firebase Auth, email/password, or any login flow beyond that.
- Every list/history view query must use `orderBy('date', 'desc').limit(...)` — never an unbounded `onSnapshot` over an entire collection.
- Mobile-first responsive CSS — one codebase for phone and desktop, no separate mobile build.
- Keep code readable and commented at a high level. This is a personal single-user tool, not production SaaS — don't over-engineer, don't add features not in the brief.
