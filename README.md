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

## 🌐 Live Website

The production version is available on Vercel:

**https://7icons-web.vercel.app**

---

## 💜 About the Project

**7ICONS Web** is the public-facing website of the 7ICONS digital ecosystem.

It brings together stories, member profiles, schedules, galleries, community
activity, fan representatives, and account features in one place while keeping
the experience centered around 7ICONS and ICONIA.

The project is designed as a growing digital archive where memories from the
past, activities from the present, and future chapters can remain connected.

> **7ICONS creates the memories.**  
> **ICONIA helps keep them alive.**

This digital home exists between those two sides — preserving the journey while
helping the community stay connected to every chapter.

This website does not replace official 7ICONS platforms. It exists as a
community-driven digital space built with appreciation for 7ICONS and the
ICONIA community.

---

# 🚀 Current Release

## V1.1 — Live

The public website has completed its main V1 foundation and is currently live.

V1.1 adds additional polish and community-facing improvements on top of the
original V1 release, including:

- Per-page browser titles
- Branded global loading screen
- `Loading... | 7ICONS` browser-tab loading state
- Active newsletter subscription
- Profile and Edit Profile browser metadata
- Refined sign-up consent flow
- Improved Google OAuth username onboarding

---

# ✨ Main Features

## 🏠 Homepage

The Homepage acts as the central gateway to the main areas of the website.

Current sections include:

- Hero
- Featured Articles
- Meet the Members
- Upcoming Schedule
- Dynamic calendar
- Upcoming Events
- ICONIA Across Indonesia
- Responsive navigation
- Footer
- Newsletter subscription

---

## 📰 Blog & Stories

A dedicated space for stories, updates, community moments, and memorable
chapters from the journey.

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

### Categories

- News
- Story
- Behind the Scene
- Community
- Member Spotlight

Dynamic article route:

```text
/blog/[slug]
```

---

## 👥 Members

A digital archive for current and former members of 7ICONS.

### Features

- Members Hero
- Current Members
- Former Members
- Responsive member grid
- Individual member portraits
- Dynamic member profile pages
- Profile Story
- About
- Personality
- Memorable Moments
- Member journey information

Dynamic member route:

```text
/members/[slug]
```

Some profile information may still use development or placeholder content until
verified information is available.

---

## 🖼 Gallery

The Gallery provides a visual archive for 7ICONS and ICONIA moments.

### Features

- Public gallery browsing
- Album-based content
- Responsive gallery experience
- Community comment integration
- Direct linking to gallery discussions

Main route:

```text
/gallery
```

---

## 📅 Schedule

A dynamic scheduling system for 7ICONS activities.

The Schedule system is connected to both the Homepage and the dedicated Schedule
page.

### Homepage Schedule

- Current month and year
- Automatic calendar generation
- Today indicator
- Event indicators
- Previous / next month navigation
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

Dynamic event route:

```text
/schedule/[slug]
```

Event status is determined automatically from its date.

```text
Future / Today
→ Upcoming

Past Date
→ Completed
```

---

## 💜 Fan Representatives

A dedicated community section for ICONIA representatives from different regions
across Indonesia.

### Features

- Fan Representatives Hero
- Representative Grid
- Region labels
- City information
- Representative portraits
- Our Role
- Community CTA
- Responsive layout
- Individual representative profiles

Dynamic representative route:

```text
/fan-representatives/[slug]
```

Representative profiles can include:

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

Some representative and contact information may remain placeholder data until
verified community information is available.

---

## 📖 About

The About page explains the purpose, philosophy, and development journey behind
the 7ICONS digital home.

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

> **7ICONS creates the memories.**  
> **ICONIA helps keep them alive.**

This digital home exists between those two sides — preserving the journey while
helping the community stay connected to every chapter.

---

# 🔐 Accounts & Authentication

The website includes a working account system backed by Supabase.

### Main Routes

```text
/login
/signup
/forgot-password
/profile
/profile/edit
/onboarding/username
```

### Current Account Features

- Email/password authentication
- Google OAuth
- Google username onboarding
- Account profile
- Full name
- Username
- Bio
- Avatar
- Profile background
- Profile background positioning
- Account badges
- Email verification status display
- Recent community activity
- Comment bookmarks
- Profile editing
- Account-aware navigation

Google users who do not yet have a username are automatically directed through
the username onboarding flow before entering the main website experience.

---

# 💬 Community Features

Community interaction is integrated into the public website.

Current functionality includes:

- Authenticated commenting
- Replies
- Article discussions
- Gallery discussions
- Comment activity history
- Comment bookmarks
- Account badges
- Community notifications
- Community guidelines
- Moderation-aware comment states

Community-related routes include:

```text
/community
/guidelines
```

---

# 🔔 Notifications

The account experience includes community notification support so users can stay
aware of relevant activity connected to their participation.

Notifications are integrated with the wider account and community system shared
across the 7ICONS ecosystem backend.

---

# 📬 Newsletter

The **Stay Connected** section in the Footer is active.

Visitors can subscribe using their email address.

Subscription flow:

```text
Visitor
   ↓
Footer Newsletter Form
   ↓
Supabase RPC
   ↓
newsletter_subscribers
   ↓
Active Subscriber
```

Current newsletter functionality includes:

- Email validation
- Normalized email storage
- Duplicate prevention
- Active subscriber status
- Re-subscription support
- Success / error feedback
- Supabase-backed subscriber storage

Newsletter campaign delivery is planned as a future enhancement.

The current release focuses on securely collecting opt-in subscribers.

---

# 🔎 Global Search

A data-driven global search system is available at:

```text
/search
```

Global Search can surface content across major public website areas, including:

- Blog Articles
- Members
- Former Members
- Fan Representatives
- Cities
- Regions
- Schedule Events
- Event Categories
- Event Locations

Search results link directly to the appropriate destination.

---

# ⚡ Navigation & Loading Experience

V1.1 introduces additional browser and navigation polish.

## Page Titles

Main pages use consistent browser-tab titles.

Examples:

```text
7ICONS | Official Digital Home
7ICONS | Blog
7ICONS | Members
7ICONS | Gallery
7ICONS | Fan Representatives
7ICONS | About
7ICONS | Schedule
7ICONS | Profile
7ICONS | Edit Profile
```

## Global Loading Screen

Next.js route loading uses a branded 7ICONS loading screen with:

- 7ICONS logo
- Animated loading dots
- ICONIA Digital Home branding
- Matching violet visual identity

During the loading state, the browser tab displays:

```text
Loading... | 7ICONS
```

After navigation completes, the browser automatically switches to the title of
the destination page.

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
├── /gallery
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
├── /community
│
├── /guidelines
│
├── /login
│
├── /signup
│
├── /forgot-password
│
├── /profile
│   └── /profile/edit
│
└── /onboarding/username
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
- **Supabase**
- **GitHub**
- **Vercel**

Supabase provides the shared backend foundation for:

- Authentication
- User profiles
- Account badges
- Community interaction
- Comments and replies
- Bookmarks
- Notifications
- Newsletter subscribers
- Shared ecosystem data

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

Backend-dependent features require the appropriate Supabase environment
variables to be configured locally.

---

# 🏗 Production Build

Before pushing major updates, run:

```bash
npm run build
```

A successful production build confirms that the application can be compiled
correctly before deployment.

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

# 🧩 7ICONS Ecosystem

`7icons-web` is the public-facing application of the wider 7ICONS ecosystem.

```text
7icons-web
→ Public website and community experience

7icons-admin
→ Administrative and content management tools

7icons-apply
→ Fan Representative application experience
```

The three applications share the same overall vision:

```text
7ICONS
   ↓
Digital Archive
   ↓
Community
   ↓
ICONIA
```

---

# 🧪 Content & Development Data

The application architecture and core functionality are live, but some public
content can still use development or placeholder information until verified
content becomes available.

This may include parts of:

- Member biographies
- Fan Representative profiles
- Instagram accounts
- WhatsApp contacts
- Schedule information
- Event information
- Blog content

These values can be replaced without rebuilding the underlying page
architecture.

---

# ✅ Development Status

```text
Core Public Website                 ✅
Responsive Navigation               ✅

Homepage                            ✅

Blog                                ✅
Blog Search & Filter                ✅
Article Detail                      ✅

Members                             ✅
Current Member Profiles             ✅
Former Member Profiles              ✅

Gallery                             ✅

Homepage Schedule                   ✅
Full Schedule                       ✅
Schedule Filter                     ✅
Schedule History                    ✅
Event Detail                        ✅

Fan Representatives                 ✅
Representative Profiles             ✅

About                               ✅
Global Search                       ✅

Authentication Backend              ✅
Email / Password Authentication     ✅
Google OAuth                        ✅
Google Username Onboarding          ✅

User Profile                        ✅
Profile Editing                     ✅
Avatar                              ✅
Profile Background                  ✅
Account Badges                      ✅

Comment System                      ✅
Replies                             ✅
Comment Activity                    ✅
Comment Bookmarks                   ✅
Community Notifications             ✅
Community Guidelines                ✅

Newsletter Subscription             ✅

Per-page Browser Titles             ✅
Global Loading Screen               ✅
Loading Browser Title               ✅

Supabase Integration                ✅
Vercel Deployment                   ✅
Production Website                  ✅
```

---

# 🔮 Planned Development

Future updates may include:

- Newsletter campaign delivery
- Newsletter unsubscribe flow
- Newsletter subscriber management
- Expanded verified member information
- Expanded Fan Representative coverage
- Verified representative contacts
- More schedule data
- More blog and archive content
- Additional community tools
- Search improvements
- Further account personalization
- Additional notification improvements
- Continued accessibility and UX polish

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