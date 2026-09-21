# Prompt for Code Puppy

Paste everything below this line as the project brief in Code Puppy. Before you paste it in, also drop `AGENTS.md` (same folder, other file in this bundle) into the project root — Code Puppy reads it automatically for standing conventions.

---

Build a personal fitness-tracking web app with four sections: Routines, Activity, Diet, and History. It must run as a single static site (no build step, no server-side code) so it can be hosted for free and installed on an iPhone as a home-screen app, while also working normally in a desktop browser. Data must sync in real time between whatever devices open it.

## Stack

- Plain HTML, CSS, and vanilla JS (or a single small JS module) — no bundler, no framework build step. Everything should run by opening `index.html` or serving the folder as-is.
- Firebase Firestore (free Spark tier) for data storage and cross-device sync, loaded via the **modular v10+ Firebase JS SDK** via `<script type="module">` and CDN ESM imports (`https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js` etc.) — no npm install required. Don't mix in the old "compat" script tags; pick one API style.
- Enable Firestore's offline persistence using the current modular API (`persistentLocalCache` passed into `initializeFirestore`), not the deprecated `enableIndexedDbPersistence`, so the app still works with no signal and syncs automatically once back online.
- Deployable to GitHub Pages (static files, HTTPS, required for both service workers and iOS "Add to Home Screen").

## Cross-device identity (no login/password flow)

Single-user personal app, so skip real auth:
- On first load, prompt for a "Sync Key" (a passphrase the user picks themselves, e.g. "leg-day-42-onyx").
- Store it in `localStorage` so the device remembers it after the first run.
- Hash it (SHA-256) client-side and use the hash as the Firestore top-level document/collection path. Every device that enters the same key reads/writes the same data.
- Security tradeoff to call out explicitly in the README: the unguessable hash *is* the password — anyone who knows it can read/write that data, and this is acceptable for personal fitness data, not for anything sensitive. Note Firebase Anonymous Auth as a future upgrade, but don't build it now — it wouldn't let a second device join the same data without an account-linking flow anyway.
- **The rules must block collection enumeration**, not just require the hash — `allow read: if true` on its own lets someone list the whole `syncKeys` collection and harvest every hash. Use exactly this shape in `firestore.rules`:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /syncKeys/{key} {
        allow get, list: if false;   // no data lives directly here; also blocks enumerating all keys

        match /{document=**} {
          allow read, write: if true;  // only reachable if you already know the exact key
        }
      }
    }
  }
  ```
- Include a "Change sync key" option in settings.

## Data model (Firestore) — use subcollections, not one giant document

A single document per user would blow past Firestore's 1MiB doc cap and resend everything on every `onSnapshot` update. Structure it as:

```
syncKeys/{hashedKey}/
  meta/settings           → { macroGoals: { calories, proteinG, carbsG, fatG }, weightUnit, restTimerSeconds }
  goalHistory/{id}        → { date, macroGoals }              // one doc per time the goals were changed
  routines/{routineId}    → { name, exercises: [{ id, name, targetSets, targetReps }] }
  workouts/{workoutId}    → { date, routineId?, entries: [{ exerciseId, sets: [{ reps, weight, unit }] }] }
  activities/{activityId} → { date, type, durationMin, notes, caloriesEst? }   // non-routine activity: run, walk, yoga, sports, etc.
  diet/{YYYY-MM-DD}       → { meals: [{ name, calories, proteinG, carbsG, fatG }], totals: { calories, proteinG, carbsG, fatG } }
```
(`meta/settings` is a single document — fine to read whole. Everything else is its own top-level subcollection under the key, not nested inside `meta`, since a path can't mix a doc and a collection at the same extra segment.)

Use `onSnapshot` listeners scoped to each subcollection (not the whole user doc) so edits on one device appear on the other live without re-fetching unrelated data. For `workouts`, `activities`, and `history` views, always query with `orderBy('date', 'desc').limit(50)` (or similar) — an unbounded listener re-streams every record ever logged on every load.

## Navigation / pages

1. **Routines** — create/edit/delete workout routines (ordered list of exercises with target sets/reps).
2. **Activity** — the daily action log. From here you can:
   - Start a logged workout session against a routine (or ad-hoc), recording actual sets/reps/weight per exercise, with a configurable rest timer between sets.
   - Log a non-workout activity (run, walk, sport, class, etc.) with type, duration, and optional notes/calorie estimate.
   - Both save into their respective collections above, timestamped.
3. **Diet** — macro tracking:
   - Editable macro goals (calories, protein, carbs, fat) — adjustable in-page at any time; changing them writes a new `goalHistory` entry so past goals aren't lost.
   - Log meals/food entries for the current day; auto-sum into daily totals.
   - A simple trend view (table or lightweight chart, e.g. `<canvas>` with basic drawing or a small dependency-free sparkline) showing daily totals vs. active goal over the last 7/30 days.
4. **History** — unified log of past performance: completed workouts, logged activities, and daily diet totals, browsable by date, each expandable to full detail. This is the "did I actually do the thing" view across all three domains.

## Mobile + desktop layout

- Mobile-first responsive layout using CSS (flexbox/grid + media queries) — one codebase, not two builds.
- Add `manifest.json` (name, icons, `display: standalone`, theme colors) and iOS-specific meta tags (`apple-touch-icon`, `apple-mobile-web-app-capable`, `viewport-fit=cover`) so it installs cleanly via Safari's "Add to Home Screen" and looks native (no browser chrome).
- Add a minimal service worker to cache the app shell for fast reloads/offline app access (data sync stays via Firestore, not the service worker).
- On desktop, reuse the same layout but use the extra width sensibly (e.g. multi-column Routines/History view) instead of staying phone-narrow.

## Deliverables

- Full file tree (`index.html`, `styles.css`, `app.js`, `manifest.json`, `service-worker.js`, icon assets, `firestore.rules`).
- A short `README.md` covering: creating the free Firebase project and pasting in the config keys, deploying `firestore.rules`, deploying to GitHub Pages, and installing on an iPhone home screen.
- Keep the code readable and commented at a high level — this is a personal single-user tool, not a production SaaS. Don't over-engineer.

---

Once Code Puppy finishes, see `SETUP.md` in this bundle for the manual steps it can't do for you (Firebase console, GitHub Pages, iPhone install).
