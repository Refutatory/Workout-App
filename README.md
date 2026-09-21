# Form & Fuel

A static, mobile-first fitness tracker for routines, movement, nutrition, and history. It is plain HTML/CSS/vanilla JavaScript: no bundler, framework, npm install, or server-side code.

## Firebase setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and stay on the free Spark plan.
2. Build -> Firestore Database -> Create database. Paste and publish `firestore.rules` in the Rules tab.
3. Project settings -> General -> Your apps -> register a Web app.
4. Copy the `firebaseConfig` object into the top of `app.js`, replacing the `PASTE_...` values.
5. Host the folder over HTTPS. Firestore's modular v10 CDN imports and the service worker work directly from these static files.

The app uses `initializeFirestore(..., { localCache: persistentLocalCache() })`, so Firestore can work offline and automatically reconcile when connectivity returns. Each collection has its own bounded `onSnapshot` listener; activity, workouts, and history stay limited to the latest 50 records.

## Sync key and privacy

On first run, each device asks for the same Sync Key. The client hashes it with SHA-256 and uses the hash as `syncKeys/{hashedKey}`. There is no login or password account. The unguessable hash is the password: anyone who knows the key can read and write that data. That tradeoff is acceptable for personal fitness data, but not for sensitive information. Use **Settings -> Change sync key** to switch datasets.

Firebase Anonymous Auth is a possible future upgrade, but it is not included: anonymous auth alone would not let a second device join the same data without an account-linking flow.

## GitHub Pages deployment

1. Create a public GitHub repository and push every file in this folder.
2. Repository -> Settings -> Pages -> deploy from the `main` branch and repository root.
3. Open the resulting `https://yourname.github.io/repository/` URL. Do not use `file://` for the installed app; HTTPS is required for service workers and iOS home-screen installation.

## iPhone installation

Open the GitHub Pages URL in Safari, tap Share, then **Add to Home Screen**. The manifest, icons, standalone display mode, safe-area viewport, and Apple meta tags are already included.

## Manual handoff

See the supplied `SETUP.md` for the Firebase console, GitHub Pages, and iPhone steps that must be completed manually. Data-sync setup cannot be performed by a static code bundle.
