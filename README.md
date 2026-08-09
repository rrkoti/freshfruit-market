# FreshFruit Market 🍓

A modern, responsive ecommerce website for selling fresh fruits. Built with pure HTML, CSS, and JavaScript — no build step required. Ready to deploy on **GitHub Pages**.

## ✨ Features

- 🛒 **Shopping cart** with add/remove, quantity controls, and persistent storage (localStorage)
- 🔍 **Live search** and category filtering (berries, citrus, tropical, stone fruit, melons)
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🎨 **Modern UI** with animations, toast notifications, and a slide-out cart drawer
- 🚀 **Zero dependencies** — pure HTML/CSS/JS, instant load

## 📁 Structure

```
├── index.html        # Main page
├── css/styles.css    # All styling
├── js/
│   ├── products.js   # Product catalog data
│   ├── cart.js       # Cart logic + localStorage
│   └── main.js       # Rendering, search, filters, UI
└── README.md
```

## 🏃 Run Locally

Open `index.html` directly in your browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve
```

Then visit `http://localhost:8000`.

## 🚀 Publish on GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it (e.g., `freshfruit-market`)
3. Set to **Public**, then **Create repository**

### Step 2 — Push your code

```bash
git init
git add .
git commit -m "FreshFruit Market ecommerce site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/freshfruit-market.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**: select **Deploy from a branch**
3. **Branch**: `main` → folder: `/ (root)` → **Save**
4. Wait 1–2 minutes. Your site goes live at:

```
https://YOUR_USERNAME.github.io/freshfruit-market/
```

### (Optional) Use GitHub Actions for auto-deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in **Settings → Pages → Source**, select **GitHub Actions**.

## 🛠️ Customize

- **Add products**: edit `js/products.js` — add objects to the `PRODUCTS` array
- **Change colors**: edit CSS variables in `:root` at the top of `css/styles.css`
- **Update contact info**: edit the Contact section in `index.html`

## 📄 License

MIT — free to use and modify.
