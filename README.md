# CV.forge — IT CV Builder

A production-grade IT CV building application built with **Next.js**, **React**, **Material UI**, and **MongoDB**.

## ✨ Features

- 📸 **Profile Picture** — Upload and display a photo
- 👤 **Personal Info** — Name, title, contact info, social links, professional summary
- 🛠️ **Skills** — Categorized skill chips with a **6-level proficiency system** (Beginner → Master)
  - Click any skill chip to open a level selector with a visual slider
  - Skills can be tied to specific jobs
- 💼 **Work Experience** — Expandable job cards with responsibilities, dates, and linked skills
- 🎓 **Education** — Degree, institution, grades
- 🏅 **Certifications** — With expiry tracking and credential links
- 💾 **MongoDB persistence** — All data saved to a MongoDB database
- 🗂️ **CV List Dashboard** — Manage multiple CVs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# Edit .env.local and set your MONGODB_URI

# 3. Run in development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
├── components/
│   ├── CVLayout.jsx          # Main layout composing all sections
│   ├── PersonalInfo.jsx      # Name, photo, contact, summary
│   ├── ProfilePicture.jsx    # Photo upload with hover overlay
│   ├── SkillChip.jsx         # Skill badge with level dialog
│   ├── SkillsSection.jsx     # Skills grid by category
│   ├── JobCard.jsx           # Individual job entry (editable)
│   ├── JobsSection.jsx       # Work experience list
│   ├── EducationSection.jsx  # Education entries
│   └── CertificationsSection.jsx
├── lib/
│   └── mongodb.js            # MongoDB connection with caching
├── models/
│   └── CV.js                 # Mongoose schema
├── pages/
│   ├── index.js              # CV dashboard / list page
│   ├── cv/[id].js            # CV editor page
│   └── api/cv/
│       ├── index.js          # GET all, POST create
│       └── [id].js           # GET, PUT, PATCH, DELETE
└── theme/
    └── theme.js              # MUI theme (IBM Plex fonts, dark-tech palette)
```

## 🎨 Skill Levels

| Level        | Description                     |
|-------------|----------------------------------|
| Beginner    | Just getting started             |
| Elementary  | Basic understanding              |
| Intermediate| Can work independently           |
| Advanced    | Strong expertise                 |
| Expert      | Deep mastery & mentoring ability |
| Master      | Industry-level authority         |

## 🔗 API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | `/api/cv`       | List all CVs         |
| POST   | `/api/cv`       | Create new CV        |
| GET    | `/api/cv/:id`   | Get CV by ID         |
| PUT    | `/api/cv/:id`   | Full update CV       |
| PATCH  | `/api/cv/:id`   | Partial update CV    |
| DELETE | `/api/cv/:id`   | Delete CV            |

## 🛠️ Tech Stack

- **Next.js 14** — React framework with API routes
- **React 18** — UI components
- **Material UI v5** — Component library
- **MongoDB + Mongoose** — Database and ODM
- **IBM Plex Mono / Sans** — Typography
