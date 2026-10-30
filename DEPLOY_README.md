# Atlas of Entomology — ئەتلەسی مێرووناسی

## 🚀 GitHub Pages Deployment Guide

### Step 1 — Create GitHub Repo
1. Go to github.com → New repository
2. Name it: `atlas-entomology`
3. Set to Public → Create

### Step 2 — Edit package.json
Replace `YOUR-USERNAME` with your actual GitHub username:
```json
"homepage": "https://YOUR-USERNAME.github.io/atlas-entomology"
```

### Step 3 — Setup & Deploy
```bash
# Install dependencies
npm install

# Deploy to GitHub Pages (auto builds + publishes)
npm run deploy
```

### Step 4 — Enable GitHub Pages
- Go to your repo Settings → Pages
- Source: Deploy from `gh-pages` branch → Save

### ✅ Your site will be live at:
`https://YOUR-USERNAME.github.io/atlas-entomology`

---
## Local Development
```bash
npm install
npm start
```
