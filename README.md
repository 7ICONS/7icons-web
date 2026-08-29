<p align="center">
  <img
    src="./assets/7icons-web-banner.png"
    alt="7ICONS Official Digital Home Banner"
    width="100%"
  />
</p>

<h1 align="center">
  7ICONS — Official Digital Home of 7ICONS & ICONIA
</h1>

<p align="center">
  <strong>BUILD FOR ICONIA BY ICONIA</strong>
</p>

<p align="center">
  A community-driven digital home dedicated to preserving stories,
  memories, members, schedules, community moments, and the continuing
  journey of <strong>7ICONS & ICONIA</strong>.
</p>

---

## 🌐 Live Demo

The latest production version is available on Vercel:

**https://7icons-web.vercel.app**

---

## 💜 About the Project

**7ICONS Web** is a community-driven digital home created to bring
together stories, memories, member profiles, schedules, articles,
community activities, and other moments connected to the journey of
7ICONS and ICONIA.

The project is designed as a growing digital archive where memories
from the past, activities from the present, and future chapters can
remain connected in one place.

> **7ICONS creates the memories.**  
> **ICONIA helps keep them alive.**

This website does not replace official 7ICONS platforms.

It exists as a community-driven digital space built with appreciation
for 7ICONS and the ICONIA community.

---

# ✨ Current Features

## 🏠 Homepage

The main entry point of the 7ICONS digital home.

Current Homepage sections include:

- Hero
- Featured Articles
- Meet the Members
- Upcoming Schedule
- Dynamic calendar
- Upcoming Events
- ICONIA Across Indonesia
- Responsive navigation
- Footer

The Homepage acts as the central gateway to the main areas of the
website.

---

## 📰 Blog & Stories

A dedicated space for stories, updates, community moments, and
memorable chapters from the journey.

### Features

- Blog Hero
- Search
- Category filtering
- Responsive article grid
- Article result counter
- Dynamic article pages
- Article metadata
- Individual article content
- Responsive article detail layout

### Current Categories

- News
- Story
- Behind the Scene
- Community
- Member Spotlight

Dynamic article routes:

```text
/blog/[slug]
```

Example:

```text
/blog/the-beginning-of-our-journey
```

---

## 👥 Members

A digital archive for current and former members of 7ICONS.

### Current Structure

```text
Current Members
├── Member 01
├── Member 02
├── Member 03
├── Member 04
├── Member 05
└── Member 06

Former Members
├── Former Member 01
├── Former Member 02
└── Former Member 03
```

### Features

- Members Hero
- Current Members section
- Former Members section
- Responsive member grid
- Individual member portraits
- Dynamic profile pages
- Profile Story
- About
- Personality
- Memorable Moments
- Member journey information

Dynamic member routes:

```text
/members/[slug]
```

Example:

```text
/members/member-01
```

The current member information is still development/demo data and can
later be replaced with verified information without changing the page
architecture.

---

## 📅 Schedule

A dynamic scheduling system for 7ICONS activities.

The Schedule system is connected both to the Homepage and the dedicated
Full Schedule page.

### Homepage Schedule

Includes:

- Current month
- Current year
- Automatic calendar generation
- Today indicator
- Event indicators
- Previous month navigation
- Next month navigation
- Automatic year changes
- Upcoming Events
- Link to Full Schedule

### Full Schedule Page

Available at:

```text
/schedule
```

Features:

- Dynamic monthly calendar
- Automatic month and year
- Month navigation
- Today button
- Event date highlighting
- Selected Date panel
- Event information
- Upcoming Events
- Category filtering
- Schedule History
- Past Events
- Dynamic event details

### Schedule Categories

- Performance
- Fan Meeting
- Livestream
- TV
- Other

Dynamic event routes:

```text
/schedule/[slug]
```

Example:

```text
/schedule/7icons-live-performance
```

### Automatic Event Status

Event status is determined automatically from its date.

```text
Future / Today
→ Upcoming

Past Date
→ Completed
```

This means event status does not need to be changed manually.

---

## 💜 Fan Representatives

A dedicated community section for ICONIA representatives from different
regions across Indonesia.

### Main Page

Features:

- Fan Representatives Hero
- Representative Grid
- Region labels
- City information
- Representative portraits
- More Regions Coming Soon
- Our Role
- Community CTA
- Responsive layout

### Current Development Representatives

The current development version contains 9 dummy representatives:

```text
DKI Jakarta
Jawa Barat
Jawa Tengah
Jawa Timur
Bali
Sumatera Utara
Sulawesi Selatan
Kalimantan Timur
DI Yogyakarta
```

These are placeholder profiles created to develop and test the website
architecture.

The system can later support additional regions without rebuilding the
page.

### Representative Profiles

Each representative has an individual dynamic profile.

Dynamic routes:

```text
/fan-representatives/[slug]
```

Representative profiles currently support:

- Portrait
- Name
- City
- Region
- Representative role
- Instagram
- WhatsApp
- Representative since
- Community Mission
- Community Motto
- About
- Community Role
- Local Community
- Supporting ICONIA
- Representative Story

Instagram usernames and WhatsApp numbers currently used in development
are dummy data.

They can later be replaced with verified representative contact
information.

---

## 📖 About

The About page explains the purpose, philosophy, and development
journey behind the 7ICONS digital home.

Available at:

```text
/about
```

### Sections

- About Hero
- Our Story
- What This Website Is
- 7ICONS & ICONIA
- The Connection
- Our Values
- Website Journey
- Closing CTA

### The Connection

One of the core messages of this digital home:

> **7ICONS creates the memories.**  
> **ICONIA helps keep them alive.**

This digital home exists between those two sides — preserving the
journey while helping the community stay connected to every chapter.

---

## 🔐 Account UI

The first visual foundation for the future account system has been
created.

### Current Pages

```text
/login
/signup
/forgot-password
```

### Login UI

Includes:

- Email Address
- Password
- Remember Me
- Forgot Password
- Sign In
- Google sign-in placeholder
- Link to Sign Up

### Sign Up UI

Includes:

- Full Name
- Username
- Email Address
- Password
- Confirm Password
- Terms checkbox
- Create Account
- Google sign-up placeholder
- Link to Login

### Forgot Password UI

Includes:

- Email Address
- Send Reset Instructions
- Account recovery information
- Back to Sign In

### Current Status

The account system is currently:

```text
UI Only
```

The following are **not active yet**:

- Authentication backend
- User database
- Sessions
- Google authentication
- Password reset email
- Account verification
- Real account creation

These pages currently serve as the frontend foundation for the future
authentication system.

---

## 🔎 Global Search

A data-driven global search system is available at:

```text
/search
```

Global Search currently searches across:

- Blog Articles
- Members
- Former Members
- Fan Representatives
- Cities
- Regions
- Schedule Events
- Event Categories
- Event Locations

### Example Queries

```text
Aulia
Jakarta
Journey
ICONIA
Performance
```

Search results automatically link to the appropriate detail page.

For example:

```text
Aulia Rahma
→ /fan-representatives/aulia-rahma-jakarta
```

or:

```text
7ICONS Live Performance
→ /schedule/7icons-live-performance
```

The Global Search is connected directly to the Search icon in the
navigation bar.

---

# 🧭 Site Structure

```text
/
│
├── /blog
│   └── /blog/[slug]
│
├── /members
│   └── /members/[slug]
│
├── /schedule
│   └── /schedule/[slug]
│
├── /fan-representatives
│   └── /fan-representatives/[slug]
│
├── /about
│
├── /search
│
├── /login
│
├── /signup
│
└── /forgot-password
```

---

# 🛠 Tech Stack

The project currently uses:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Next.js App Router**
- **React Compiler**
- **GitHub**
- **Vercel**

---

# 📁 Project Structure

```text
7icons-web/
│
├── public/
│   │
│   ├── brand/
│   │   ├── 7icons-logo-v2.png
│   │   └── 7Icons Iconic Story Banner.png
│   │
│   ├── blog/
│   │
│   ├── members/
│   │
│   └── fan-representatives/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── about/
│   │   │
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │
│   │   ├── fan-representatives/
│   │   │   └── [slug]/
│   │   │
│   │   ├── forgot-password/
│   │   │
│   │   ├── login/
│   │   │
│   │   ├── members/
│   │   │   └── [slug]/
│   │   │
│   │   ├── schedule/
│   │   │   └── [slug]/
│   │   │
│   │   ├── search/
│   │   │
│   │   ├── signup/
│   │   │
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── about/
│   │   ├── blog/
│   │   ├── fan-representatives/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── members/
│   │   ├── schedule/
│   │   └── search/
│   │
│   └── data/
│       ├── blogArticles.ts
│       ├── fanRepresentatives.ts
│       ├── members.ts
│       └── schedule.ts
│
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

# 🚀 Local Development

Clone the repository:

```bash
git clone https://github.com/7icons/7icons-web.git
```

Enter the project directory:

```bash
cd 7icons-web
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🏗 Production Build

Before pushing major updates, run:

```bash
npm run build
```

A successful production build confirms that the application can be
compiled correctly before deployment.

---

# ☁️ Deployment

The website is deployed using **Vercel**.

The project is connected directly to the GitHub repository.

Updates pushed to:

```text
main
```

are automatically built and deployed by Vercel.

Production:

**https://7icons-web.vercel.app**

Deployment flow:

```text
Local Development
        ↓
npm run build
        ↓
Git Commit
        ↓
GitHub main
        ↓
Vercel Build
        ↓
Production
```

---

# 🧪 Development Data

Several areas of the website currently use dummy or placeholder
information while the architecture and interface continue to be
developed.

This currently includes parts of:

- Member information
- Member biographies
- Fan Representative information
- Instagram accounts
- WhatsApp contacts
- Schedule information
- Event information
- Blog content

These values can later be replaced with verified information without
rebuilding the underlying page structure.

---

# ✅ Development Status

```text
Homepage                       ✅
Responsive Navigation          ✅
Blog                           ✅
Blog Search & Filter           ✅
Article Detail                 ✅
Members                        ✅
Current Member Profiles        ✅
Former Member Profiles         ✅
Homepage Schedule              ✅
Full Schedule                  ✅
Schedule Filter                ✅
Schedule History               ✅
Event Detail                   ✅
Fan Representatives            ✅
Representative Profiles        ✅
Instagram / WhatsApp UI        ✅
About                          ✅
Login UI                       ✅
Sign Up UI                     ✅
Forgot Password UI             ✅
Global Search                  ✅
Vercel Deployment              ✅

Authentication Backend         ⏳
User Account Database          ⏳
User Profile                   ⏳
Comment System                 ⏳
Account Activity / History     ⏳
```

---

# 🔮 Planned Development

Future versions may include:

- Real authentication
- User account database
- Google authentication
- Email verification
- Password recovery backend
- User profiles
- Profile avatars
- Comment system
- Comment history
- User activity history
- Saved articles
- Saved events
- Personalized account features
- Expanded Fan Representatives
- Verified community contacts
- Expanded schedule information
- More blog content
- Search improvements
- Content management tools
- Community-oriented features

---

# 🎨 Design Direction

The website uses a consistent visual identity centered around:

- White
- Lavender
- Violet
- Soft purple gradients
- Editorial typography
- Rounded cards
- Light borders
- Soft shadows
- Responsive layouts

The design is intended to feel:

```text
Modern
Warm
Editorial
Community-driven
Memorable
Connected
```

while keeping a recognizable visual identity across every page.

---

# 💜 Project Philosophy

This digital home is built around three simple ideas:

**Preserve the memories.**

**Connect the community.**

**Continue the story.**

And at the center of that journey:

> **7ICONS creates the memories.**  
> **ICONIA helps keep them alive.**

---

<p align="center">
  <strong>Every Voice. One Iconic Story.</strong>
</p>

<p align="center">
  <strong>BUILD FOR ICONIA BY ICONIA</strong>
</p>