# Lalit Prajapat — Developer Portfolio

Lightweight, responsive portfolio. No build step, no backend. Just open `index.html` or serve the folder.

## Run locally

```bash
cd lalit-portfolio
python3 -m http.server 8080
# → http://localhost:8080
```

## Edit your content (important)

All personal content lives in **`js/config.js`**:

- `contact.github / discord / discordUrl / email` — leave `""` to hide that option
- `projects[]` — name, category, description, tags, `repo` / `demo` / `details` (omit = button hidden)
- `skills[]` — add/remove categories freely
- `profileImage` — e.g. `"assets/profile.jpg"`; leave `""` for the LP placeholder

To use your own photo: drop it in `assets/` (e.g. `assets/profile.jpg`, keep it small, ~200–400px) and set `profileImage` accordingly.

## Adding a Minecraft mod (2 steps)

1. Copy the `.jar` into `downloads/`
2. Add one entry to `js/mods.js` (the file explains every field)

The mod then appears automatically on `mods.html` with a working download button. If a detail is unknown, write `TODO: confirm` — never guess compatibility.

## Structure

```
index.html  — sections: hero, projects, about, skills, approach, contact
mods.html   — Minecraft Mods collection (data-driven cards + search)
css/style.css — dark theme (#0B0D0F) + neon green (#39FF88)
js/config.js  — EDIT ME: all personal data
js/mods.js    — EDIT ME: Minecraft mods data
js/mods-page.js — mods collection rendering + search
js/main.js    — rendering, nav, scrollspy, reveal, copy-to-clipboard
downloads/    — JAR files served for direct download
assets/       — favicon, your photo (optional)
404.html      — simple not-found page
```

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, nginx). Upload the folder contents as-is.
