# Form & Fuel Roadmap

This file is the durable backlog for future app updates. Chat is useful for discussion, but decisions and requested features should be recorded here so they do not disappear when a conversation is lost.

## How to use this file

When adding an idea, use this format:

```md
- [ ] **Short title** — What should change and why.
  - Acceptance: What must be true when it is finished.
  - Priority: Now / Next / Later
```

When an item is completed, change `[ ]` to `[x]` and add a short note under it if useful.

## Planned updates

### Now

- [ ] **Workout session flow** — Replace browser prompt boxes with a mobile-friendly guided workout screen.
  - Acceptance: Start a routine, see the current exercise, enter sets/reps/weight, move through exercises, finish or cancel, and save the workout using the existing Firestore workout format.
  - Priority: Now

- [ ] **Rest timer** — Add a configurable countdown between sets.
  - Acceptance: Start, pause, skip, and reset the timer; use the existing rest-timer setting; work on phone and desktop.
  - Priority: Now

- [ ] **App notes** — Add a Notes section for thoughts about the app itself.
  - Acceptance: Create, edit, delete, and view notes; sync notes across devices; keep them separate from workout/activity notes.
  - Data path: `syncKeys/{hashedKey}/appNotes/{noteId}`
  - Suggested fields: title, body, category, status, createdAt, updatedAt.
  - Priority: Now

### Next

- [ ] **Ad-hoc workouts** — Log a workout without first creating a saved routine.
  - Acceptance: Add exercises and sets during a session, then save it to workout history.
  - Priority: Next

- [ ] **Sync and connection status** — Make saving and connectivity visible.
  - Acceptance: Show loading, syncing, saved, offline, and error states; retry failed saves without silently losing data.
  - Priority: Next

- [ ] **Delete confirmations** — Confirm destructive actions.
  - Acceptance: Confirm before deleting routines, workouts, activities, meals, or app notes.
  - Priority: Next

- [ ] **Local date/time handling** — Prevent UTC date errors near midnight.
  - Acceptance: User-facing dates use the device's local date consistently.
  - Priority: Next

- [ ] **Meal editing and deletion** — Improve daily diet management.
  - Acceptance: Edit or delete individual meals and recalculate daily totals correctly.
  - Priority: Next

- [ ] **Diet trends** — Show recent nutrition progress.
  - Acceptance: Display 7-day and/or 30-day calorie and macro totals compared with goals.
  - Priority: Next

- [ ] **History filters and details** — Make the unified history easier to use.
  - Acceptance: Filter by date and record type; show readable expandable details for workouts, activities, and diet.
  - Priority: Next

### Later

- [ ] **Personal records** — Track and display exercise PRs.
  - Priority: Later

- [ ] **Body-weight tracking** — Record weight over time and show a trend.
  - Priority: Later

- [ ] **Weekly summary** — Add a compact dashboard for recent training, activity, diet, and goals.
  - Priority: Later

- [ ] **Data export** — Export personal data to JSON and/or CSV.
  - Priority: Later

- [ ] **Exercise library** — Add reusable common exercises and improve exercise naming consistency.
  - Priority: Later

- [ ] **Routine improvements** — Reorder exercises, duplicate routines, and repeat the last workout.
  - Priority: Later

- [ ] **PWA polish** — Add a clear update notice and improve install/offline messaging.
  - Priority: Later

- [ ] **Theme options** — Consider dark mode after core workflows are stable.
  - Priority: Later

## Decisions and guardrails

- Keep the app plain HTML/CSS/vanilla JavaScript with no build step or framework.
- Keep Firestore collections separate; do not put the entire app state in one document.
- Keep the Sync Key model unless we explicitly decide to redesign identity/authentication.
- Preserve cross-device sync and offline persistence.
- Prefer small, testable changes over feature sprawl.

## Ideas / parking lot

Add uncommitted ideas here before deciding whether they belong in Planned updates.

- [ ] scanning nutrition labels
- 

## Change log

- **2026-09-27** — Created roadmap from the existing project brief and planning conversation. Added the app Notes feature requested by Brandon.
