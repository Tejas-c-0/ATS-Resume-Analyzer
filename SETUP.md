# 🚀 Quick Setup Guide - ATS Resume Analyzer

## For Users Who Clone Your Repository

### Step 1: Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ats-resume-analyzer.git
cd ats-resume-analyzer
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- PDF.js
- Recharts
- html2canvas
- jsPDF
- Lucide React
- And more...

### Step 3: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```

Production files will be in the `dist/` folder.

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📋 System Requirements

- **Node.js:** Version 18 or higher
- **npm:** Version 8 or higher
- **Browser:** Modern browser (Chrome, Firefox, Edge, Safari)

### Check Your Versions:
```bash
node --version
npm --version
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🌐 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages
1. Go to repository Settings → Pages
2. Select branch: main
3. Folder: / (root)
4. Save

---

## 🐛 Troubleshooting

### Issue: "npm install" fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port already in use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: Build fails
```bash
# Clear dist folder
rm -rf dist

# Rebuild
npm run build
```

---

## 📦 Project Structure

```
ats-resume-analyzer/
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── .gitignore              # Git ignore rules
├── README.md               # Documentation
├── SETUP.md                # This file
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Main component
    ├── index.css           # Global styles
    └── utils/
        └── cn.ts           # Utility functions
```

---

## 🎯 Features Overview

- ✅ PDF Resume Upload (Drag & Drop)
- ✅ ATS Score Analysis (0-100)
- ✅ 13 Detailed Metrics
- ✅ 9 Resume Sections Analysis
- ✅ Keyword Optimization Check
- ✅ Skills Analysis
- ✅ Grammar & Spelling Check
- ✅ Formatting Analysis
- ✅ Job Match Prediction
- ✅ Improvement Suggestions
- ✅ Dark/Light Theme
- ✅ Export to PDF
- ✅ Print Report
- ✅ Copy to Clipboard

---

## 📞 Support

If you encounter any issues:

1. Check browser console for errors (F12)
2. Ensure Node.js version is 18+
3. Clear npm cache and reinstall
4. Check internet connection (for CDN resources)

---

**Created by Tejas C**

Enjoy using the ATS Resume Analyzer! 🎉
