# Karl+Karla Pitches

Password-protected pitch pages, live at **pitch.karlpluskarla.de**.
Each pitch is reachable at `pitch.karlpluskarla.de/<slug>`.

This repo is **separate from the main website on purpose** — nothing you do
here can break karlpluskarla.de.

## Add a new pitch (no coding)

A pitch = **two files** in `lib/pitches/`, both named after the slug (the URL):

```
lib/pitches/condor-illombardia.html   ← the pitch itself (self-contained HTML)
lib/pitches/condor-illombardia.json   ← title, subtitle, and login
```

Steps:

1. Make a branch: `git checkout -b pitch/<slug>`
2. Add your `<slug>.html` (the AI-generated pitch — one self-contained file).
3. Add `<slug>.json` next to it:
   ```json
   {
     "title": "Il Lombardia<br>2026",
     "sub": "Condor · Pitch · Karl+Karla",
     "user": "admin",
     "pass": "choose-a-password"
   }
   ```
   - `title` shows big on the login screen (`<br>` = line break, optional).
   - `sub` is the small line under it.
   - `user` / `pass` are the login the client uses.
4. `git push` → Vercel gives you a **preview URL** to check / share before it's live.
5. Merge to `main` → live at `pitch.karlpluskarla.de/<slug>`.

That's it. You never touch any `.ts` files.

## Rules for the slug

Lowercase letters, numbers, and hyphens only (e.g. `condor-illombardia`).
The `.html` and `.json` filenames **must match** the slug exactly.

## Notes

- Passwords live in the `.json` files. These are share-with-client gate
  passwords, not real secrets — fine to keep in the repo.
- A broken pitch file only breaks **its own** page, never the others.
- Logout link for testing: `pitch.karlpluskarla.de/<slug>?logout`

## Run locally (optional)

```bash
npm install
npm run dev      # http://localhost:3000/<slug>
```
