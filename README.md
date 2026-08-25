<p align="center">
  <img src="assets/7icons-web-banner.png" alt="7ICONS Web Banner" width="100%">
</p>

<h1 align="center">7ICONS Web</h1>

<p align="center">
  <strong>Official Public Website for 7ICONS &amp; ICONIA</strong>
</p>

<p align="center">
  <em>Every Voice. One Iconic Story.</em>
</p>

<p align="center">
  <a href="https://7icons-web.vercel.app">
    <strong>🌐 View Live Demo</strong>
  </a>
</p>

---

## 🌐 Live Demo

The **7ICONS Web Homepage V1** is now live and available publicly.

### 🔗 Production

**https://7icons-web.vercel.app**

The live demo currently showcases the completed responsive Homepage V1 across desktop, tablet, and mobile devices.

> Some navigation links and interactive features are still under development and may not be available yet.

---

## 💜 About

**7ICONS Web** is the public-facing website of the 7ICONS digital platform — a place for stories, articles, member information, fan representatives, archives, and the ICONIA community.

The website is designed as a combination of a **blog, digital archive, and community platform** dedicated to **7ICONS & ICONIA**.

Visitors will eventually be able to explore articles, discover member profiles, find fan representatives across Indonesia, access archived content, create accounts, and interact with the community.

---

## 🏠 Homepage V1

The first version of the homepage has been completed and deployed.

### Included Sections

* ✅ Responsive Navbar
* ✅ Hero Section
* ✅ Featured Articles
* ✅ Meet the Members
* ✅ ICONIA Across Indonesia
* ✅ Responsive Footer
* ✅ Desktop layout
* ✅ Tablet layout
* ✅ Mobile layout
* ✅ Production build
* ✅ Vercel deployment

---

## ✨ Planned Features

### 🏠 Home

* Featured content
* Latest articles
* News and updates
* Member highlights
* Fan representative highlights
* Community information

### 📰 Blog & Articles

* Article listing
* Featured articles
* Categories
* Search
* Individual article pages
* Related articles

### 👩 Members

* Member profiles
* Member information
* Stories and related content

### 🇮🇩 Fan Representatives

* Fan representatives across Indonesia
* Regional information
* Representative profiles
* Community connections

### 👤 User Accounts

* Registration
* Login
* User profiles
* Custom profile pictures
* Account settings
* Comment history

### 💬 Community

* Article comments
* Community interaction
* User activity
* Moderated discussions

### 🗂️ Archive

* Historical content
* Stories
* Articles
* Community memories
* Past moments surrounding 7ICONS & ICONIA

---

## 🛠️ Tech Stack

The project currently uses:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **App Router**
* **React Compiler**
* **Vercel**

Additional technologies will be introduced as the project develops.

---

## 📁 Project Structure

```text
7icons-web/
├── assets/
│   └── 7icons-web-banner.png
│
├── public/
│   ├── brand/
│   │   └── 7icons-logo-v2.png
│   │
│   ├── community/
│   │   └── indonesia-map.png
│   │
│   ├── featured/
│   │   ├── featured-journey.png
│   │   ├── featured-practice-day.png
│   │   └── featured-seven-voices.png
│   │
│   ├── hero/
│   │   └── 7icons-hero-desktop.png
│   │
│   └── members/
│       ├── member-01.png
│       ├── member-02.png
│       ├── member-03.png
│       ├── member-04.png
│       ├── member-05.png
│       └── member-06.png
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   └── components/
│       ├── home/
│       │   ├── FeaturedArticles.tsx
│       │   ├── Hero.tsx
│       │   ├── IconiaAcrossIndonesia.tsx
│       │   └── MeetMembers.tsx
│       │
│       └── layout/
│           ├── Footer.tsx
│           └── Navbar.tsx
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

The project structure will continue to evolve as new pages, components, services, and features are introduced.

---

## 🚀 Getting Started

### Requirements

Make sure **Node.js** and **npm** are installed on your system.

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the local development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Starts the production server after a successful build.

### Lint

```bash
npm run lint
```

Runs ESLint to check the project source code.

---

## 🚀 Deployment

The project is deployed using **Vercel**.

Production deployment:

```text
https://7icons-web.vercel.app
```

The production project is connected directly to the GitHub repository.

Current deployment workflow:

```text
Local Development
        ↓
Test & Production Build
        ↓
Git Commit
        ↓
Push to main
        ↓
Vercel Automatic Build
        ↓
Production Deployment
```

Updates pushed to the `main` branch can automatically trigger a new production deployment.

---

## 🚧 Project Status

**Currently in active development.**

### Homepage V1

* [x] GitHub repository setup
* [x] Next.js initialization
* [x] TypeScript setup
* [x] Tailwind CSS setup
* [x] React Compiler setup
* [x] App Router setup
* [x] Initial Next.js template cleanup
* [x] Repository README
* [x] Responsive Navbar
* [x] Responsive Hero Section
* [x] Featured Articles
* [x] Meet the Members
* [x] ICONIA Across Indonesia
* [x] Responsive Footer
* [x] Production build
* [x] Vercel live deployment

### Next Development

* [ ] Blog page
* [ ] Article detail pages
* [ ] Members page
* [ ] Member detail pages
* [ ] Fan Representatives page
* [ ] Representative profiles
* [ ] Archive
* [ ] Search
* [ ] User authentication
* [ ] User profiles
* [ ] Profile picture management
* [ ] Comments
* [ ] Comment history
* [ ] Backend integration
* [ ] Admin integration

---

## 🌐 7ICONS Digital Ecosystem

`7icons-web` is the public-facing application within the broader **7ICONS digital ecosystem**.

The public website is responsible for the experience available to visitors and registered community members.

Administration, content management, user management, comment moderation, and other internal tools will be handled separately through the administration platform.

---

## 💜 Built for ICONIA

This project is more than a website.

It is a digital space where **ICONIA can discover, share, remember, and connect** through stories surrounding 7ICONS.

From **Sabang to Merauke**, every voice and every community has a story worth remembering.

---

<div align="center">

### Every Voice. One Iconic Story.

**BUILT FOR ICONIA, BY ICONIA.**

<br />

🌐 **Live Demo:** https://7icons-web.vercel.app

</div>
