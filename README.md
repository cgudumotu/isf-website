# International Student Fellowship (ISF) — Website


The website for **International Student Fellowship (ISF)**, a recognized club
at California State University, Long Beach. Built as a fast, fully static
single-page app — no backend, no database, no CMS.

> **Tone matters here.** ISF is a *pre-evangelism* club, so the site leads with
> friendship and American culture, not faith language. The official mission
> line — used verbatim on the site — is: *"We exist to help students build
> friendships with Americans and fellow students, learn about American culture,
> and explore following Jesus."* Avoid insider words a first-time international
> student wouldn't use (ministry, gospel, Christ-centered, outreach, testimony).
> The full tone guide lives at the top of `src/data/content.ts`.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite 7** (build tooling)
- **Tailwind CSS v3** with a custom, logo-inspired design system
- **React Router v6** with lazy-loaded, code-split pages
- Google Fonts: **Cormorant Garamond** (headings) + **Inter** (body)

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the local dev server (http://localhost:5173)
npm run build    # type-check + build the production site into dist/
npm run preview  # preview the production build locally
```

You need **Node 20.19+ or 22.12+** (Vite 7 requirement).

---

## Deploying — GitHub Pages (current setup)

The site auto-deploys via GitHub Actions (`.github/workflows/deploy.yml`).
The repo **must be named `isf-website`** because `base: '/isf-website/'` in
`vite.config.ts` must match the repo name.

**One-time setup:** push the code to GitHub, then in the repo go to
**Settings → Pages → Source** and choose **"GitHub Actions"**.

**Publishing an update** (the everyday routine):

```bash
git add .
git commit -m "Describe what changed"
git push
```

That's it — the push triggers the workflow, which builds the site and
publishes it to `https://<your-username>.github.io/isf-website/` in ~1–2
minutes (watch progress in the repo's **Actions** tab).

Notes:
- Deep links like `/about` keep working because the `postbuild` script copies
  `index.html` → `404.html` (GitHub Pages serves `404.html` for unknown
  paths, which re-boots the app and lets React Router take over).
- Asset paths resolve through `src/lib/asset.ts` + `import.meta.env.BASE_URL`,
  so the sub-path never needs hardcoding in components.

## Deploying to IONOS (later, with a custom domain)

1. Set `base: '/'` in `vite.config.ts` (the only change needed).
2. Run `npm run build`.
3. Upload **the contents of `dist/`** (not the folder itself) into IONOS
   **`public_html`** via the File Manager or an SFTP client (e.g. FileZilla).
   Include the hidden **`.htaccess`** file — it rewrites deep links like
   `/about` back to the app so refreshing works (same job the `404.html`
   trick does on GitHub Pages).
4. To publish updates later, re-run `npm run build` and re-upload `dist/`.

---

## Where to edit things

### ✏️ All text / copy — `src/data/content.ts`
**Every** headline, paragraph, list, testimonial, event, and label lives in this
one file. Edit it to change wording anywhere on the site — you do not need to
touch component code. Items marked `// TODO` are placeholders to replace.

### 🖼️ Images
- **Logo** — `public/isf-logo.svg`. This is a clean recreation of the ISF logo.
  Replace it with your official artwork (keep the filename `isf-logo.svg`, or
  swap in a PNG and update the `asset('isf-logo.svg')` references in
  `Header.tsx`, `Footer.tsx`, and `sections/Hero.tsx`).
- **Gallery photos** — the Gallery tiles are colored placeholders. To use real
  photos: drop images into `public/gallery/`, then update
  `src/pages/Gallery.tsx` to render `<img src={asset('gallery/your-photo.jpg')} .../>`
  in place of the placeholder tiles (import `asset` from `../lib/asset`).
- **Leader photos** — in `src/data/content.ts`, set each leader's `image` field
  to a path like `"leaders/jane.jpg"` and place the file in `public/leaders/`.
  If `image` is empty, a tasteful initials avatar is shown automatically.
- Why `asset(...)` instead of a plain `"/path"`? On GitHub Pages the site
  lives under `/isf-website/`, not the domain root — the helper prepends the
  right prefix automatically in every environment (see `src/lib/asset.ts`).

### 🎨 Colors, fonts, shadows — `tailwind.config.js`
The full palette (ruby / ocean / gold / sage / cream / ink) is documented with
comments at the top of `tailwind.config.js`. Custom helpers
(`btn-primary`, `btn-secondary`, `card-ministry`, `ministry-tag`,
`container-ministry`, `section-divider`, `shadow-ministry`, `form-input`) live
in `src/index.css`.

---

## The student questionnaire form

The **Connect** page carries the web version of the printed International
Student Questionnaire. Submissions go straight into the "Fall 2026" Google
Sheet through a Google Apps Script web app. No third-party form service, no
monthly fee, and the data stays inside the ISF Google account.

Setup instructions are in the comment at the top of
`google-apps-script/Code.gs`. The short version:

1. Open the sheet, then Extensions > Apps Script, and paste that file in.
2. Run `setUpSheet` once to write the column headers.
3. Deploy > New deployment > Web app, "Execute as: Me",
   "Who has access: Anyone", and copy the `/exec` URL.
4. Paste that URL into `questionnaire.endpoint` in `src/data/content.ts`.

Until step 4 is done the form shows a "not connected" notice and refuses to
submit, so nobody's details are ever lost silently.

**If you add or rename a form field**, update `HEADERS` in `Code.gs` to match,
re-run `setUpSheet`, and redeploy the script (Deploy > Manage deployments >
pencil > Version: New version). The field `name` in the form and the key in
`HEADERS` have to be identical.

---

## TODO checklist (replace placeholders)

- [ ] Direct Facebook group URL — `site.contacts.facebook.href` in
      `src/data/content.ts` (currently a Facebook search for the group name)
- [ ] Upcoming / past events — `gallery.upcoming` and `gallery.past`
- [ ] More photos — add four files to `public/gallery/` and an entry to
      `src/data/photos.ts` (see the comment at the top of that file)
- [ ] Each semester's real schedule — `gallery.upcoming` (copy it from the
      printed postcard)
- [ ] Connect the Connect form (see above)
- [ ] Swap in the official logo — `public/isf-logo.svg`

---

## Project structure

```
src/
  components/
    layout/   Header, Footer, Layout, ScrollToTop
    ui/       Button, Card, SectionHeader, MinistryTag, PageHero, StaticForm, icons
    sections/ Hero, ImpactMap, WeeklyRhythm, CallToAction, TestimonialPreview
  data/
    content.ts   ← single source of truth for ALL copy
  pages/      Home, About, Gallery, Connection, NotFound
  App.tsx     routes (all pages lazy-loaded / code-split)
  main.tsx    app entry (BrowserRouter)
  index.css   Tailwind layers + custom ministry utility classes
public/
  isf-logo.svg   logo asset
  .htaccess      SPA routing fallback for IONOS (ships into dist/)
```

---

Made with care for students far from home.
