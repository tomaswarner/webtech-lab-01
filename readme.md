# webtech-lab-01

Personal page for the WebTech labs, built by **Tomás Warner**, Industrial Civil Engineering student at Universidad de los Andes.

- **Live site:** https://tomaswarner.github.io/webtech-lab-01/
- **Repository:** this one

## Contents

- `index.html` — the page
- `styles.css` — all styling, no frameworks or CSS libraries
- `script.js` — the interactive features added in Lab 2
- `assets/uandes-logo.webp` — the logo used in the About section

## How it was published

1. Created an empty public repository on GitHub.
2. Pushed `index.html`, `styles.css`, `README.md`, and `assets/`.
3. Enabled GitHub Pages under Settings → Pages: deploy from a branch, branch `main`, folder `/ (root)`.
4. Waited for the build to finish and confirmed the published link.

## Lab 2 — interactive features

- **Watchlist filter**: in the "What I've watched this year" section, type in the search box to filter by title as you type, or click Movies/Series to filter by category. Clearing the search restores the full list.
- **Add to watchlist**: the form below the list adds a new title (name, type, genre, year). New items appear instantly and respect the active filter and the remove action, same as the original entries.
- **Remove an item**: every item in the watchlist, including newly added ones, has a "Remove" button.
- **Dark mode toggle**: top right of the header, switches the whole site between light and dark themes.
- **Contact form validation**: submitting the form with missing or invalid fields shows an error message under the relevant field instead of submitting; the error clears automatically once corrected.