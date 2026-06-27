# ATS Resume Analyzer

**Created by Tejas C**

A modern, production-ready ATS (Applicant Tracking System) Resume Analyzer with premium UI design.

---

## 🚀 Features

### Core Functionality
- ✅ **PDF Upload** - Drag & drop or click to upload
- ✅ **Instant ATS Analysis** - Comprehensive resume evaluation
- ✅ **Resume Preview** - View uploaded resume details
- ✅ **Dark & Light Theme** - Toggle between themes
- ✅ **Responsive Design** - Works on all devices

### Analysis Components

#### 📊 Overall ATS Score
- Large circular score display (0-100)
- Color-coded scoring (Green/Amber/Red)

#### 📈 Detailed Scores (13 Metrics)
- ATS Compatibility
- Resume Quality
- Formatting
- Keyword Optimization
- Technical Skills
- Soft Skills
- Experience Quality
- Project Quality
- Education
- Grammar
- Spelling
- Readability
- Recruiter Impression

#### 📑 Resume Sections Analysis (9 Sections)
- Contact Information
- Professional Summary
- Skills
- Experience
- Projects
- Education
- Certifications
- Achievements
- Languages

Each section shows:
- ✅ Strengths
- ❌ Weaknesses
- 💡 Suggestions

#### 🔍 Keyword Analysis
- Missing Keywords
- Strong Keywords
- Weak Keywords
- Duplicate Keywords
- Technical Keywords
- ATS Keywords

#### 💪 Skills Analysis
- Programming Languages
- Frameworks & Libraries
- Cloud & DevOps
- Databases
- Present Skills
- Missing Skills
- Recommended Skills

#### ✏️ Grammar & Spelling
- Grammar mistakes detection
- Spelling errors
- Incorrect punctuation
- Weak action verbs
- Passive voice detection
- Repeated words
- Capitalization issues

#### 📐 Formatting Analysis
- ATS Compatibility check
- Tables, Icons, Images detection
- Columns, Fonts, Colors analysis
- Hyperlinks, Bullet Points check
- Margins, White Space evaluation
- Section Titles validation

#### 👥 Recruiter Analysis
- Readability Score
- First Impression Score
- Strongest Section
- Weakest Section
- Resume Length Assessment
- Resume Flow Score

#### 💼 Job Match Analysis
Estimates suitability for:
- Software Engineer
- AI Engineer
- Machine Learning Engineer
- Data Scientist
- Data Analyst
- Full Stack Developer
- Backend Developer
- Frontend Developer
- DevOps Engineer

#### 🎯 Improvement Suggestions
Categorized by priority:
- 🔴 High Priority
- 🟡 Medium Priority
- 🟢 Low Priority

#### 📋 Final Report
- Overall ATS Score
- Resume Rating
- Interview Chance %
- Recruiter Shortlist Chance %
- Top 10 Improvements
- Biggest Strengths
- Biggest Weaknesses
- Grammar Report
- Spelling Report
- Formatting Report
- Keyword Report
- Skills Report
- Final Recommendation

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Recharts** - Charts & Graphs

### PDF Processing
- **PDF.js** - PDF Text Extraction

### Export
- **html2canvas** - Screenshot Generation
- **jsPDF** - PDF Report Generation

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 UI Design Features

- ✨ **Glassmorphism UI** - Modern frosted glass effect
- 🌈 **Gradient Backgrounds** - Beautiful color transitions
- 🎭 **Smooth Animations** - Framer Motion powered
- 📱 **Fully Responsive** - Mobile, Tablet, Desktop
- 🌓 **Dark/Light Mode** - Theme toggle
- 🎯 **Interactive Elements** - Hover effects & transitions
- 📊 **Visual Charts** - Bar charts, Progress bars, Radial graphs
- 🔄 **Loading States** - Animated progress indicators

---

## 📤 Export Options

1. **Download PDF Report** - Generate downloadable PDF
2. **Print Report** - Print-friendly version
3. **Copy Report** - Copy to clipboard

---

## 🎯 Usage

1. **Upload Resume**
   - Drag & drop PDF file
   - Or click to browse

2. **View Analysis**
   - Navigate through tabs:
     - Overview
     - Details
     - Keywords
     - Skills
     - Grammar
     - Formatting
     - Job Match
     - Final Report

3. **Export Results**
   - Download PDF
   - Print
   - Copy to clipboard

---

## ⚠️ Important Notes

- **PDF Only** - Only PDF files are supported
- **Text-Based PDFs** - Scanned images may not work
- **Internet Required** - PDF.js loads from CDN
- **No Information Invention** - Analysis is based only on uploaded content
- **No Resume Rewriting** - Provides suggestions only

---

## 🔒 Privacy

- All processing happens client-side
- No data is sent to external servers
- Resume content stays in your browser

---

## 📄 License

This project is created by **Tejas C**.

---

## 🤝 Support

For issues or questions, please check the browser console for error messages.

---

**Built with ❤️ by Tejas C**
