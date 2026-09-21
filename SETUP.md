# Setup steps (yours to do — Code Puppy won't do these)

Do these after Code Puppy generates the project from `code-puppy-prompt.md`.

## 1. Create the Firebase project
- Go to console.firebase.google.com → Add project → free Spark plan is enough.
- In the project, open **Build → Firestore Database → Create database** (start in production mode; you'll paste in the rules Code Puppy generates next).
- Go to **Project settings → General → Your apps → Web app (`</>`)** and register an app. Firebase gives you a `firebaseConfig` object (apiKey, projectId, etc.) — this is safe to paste directly into your public `app.js`; it's a client identifier, not a secret.

## 2. Deploy the Firestore security rules
- In Firestore → **Rules** tab, paste in the contents of the `firestore.rules` file Code Puppy generates, and hit Publish.
- Skip this and there's no rules restriction by default — anyone with your project ID could read/write anything, not just people who know your sync key.

## 3. Put the code somewhere with a real HTTPS URL
- Service workers and "Add to Home Screen" both require HTTPS — a `file://` page opened straight from OneDrive won't support either, so this step is mandatory, not optional.
- Create a **public** GitHub repo, push the files Code Puppy generates.
- Repo → **Settings → Pages** → Source: deploy from branch → pick `main` / `root`. GitHub gives you a URL like `https://yourname.github.io/repo-name/`.

## 4. Install it on your iPhone
- Open that GitHub Pages URL in **Safari** (must be Safari — Chrome on iOS can't install PWAs).
- Tap the Share icon → **Add to Home Screen**. It'll show up as an app icon, launching without browser chrome.

## 5. First run on each device
- Open the app on your phone and desktop separately, enter the *same* Sync Key on both when prompted. That's what links them to the same data.
- **Write the Sync Key down somewhere outside the app.** iOS Safari evicts `localStorage` after roughly a week of the site not being opened — if that happens you'll be re-prompted, and without the original key you're locked out of your own data.

---

## Optional: giving Code Puppy extra tools for this job

Code Puppy doesn't have a Claude-style "Skills" system — it uses `AGENTS.md` (already in this bundle) for standing instructions, and **MCP servers** for extra tool access. Two worth adding before you start, inside Code Puppy via its `/mcp` command (`/mcp install` or `/mcp add`):

1. **Firebase MCP server** (Google's own, bundled with `firebase-tools`) — run via `npx -y firebase-tools@latest mcp`. Lets Code Puppy actually stand up Firestore config and deploy rules instead of just handing you code to paste in by hand.
2. **GitHub MCP server** (`github.com/github/github-mcp-server`) — optional, only if you want Code Puppy to create the repo and push code itself rather than you running `git push` manually.

Skip a filesystem MCP server (Code Puppy already has file tools built in) and skip Playwright/browser MCP servers — Code Puppy ships its own Playwright-based testing agent already, so adding another is redundant.
