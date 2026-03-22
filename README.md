# DevEvents 🚀

> **The hub for developer events** — Discover, create, and book hackathons, conferences, workshops, and meetups all in one place.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## About the Project

**DevEvents** is a full-stack web application built for the developer community. It provides a centralised platform where developers can:

- Discover curated developer events near them or online
- Create and manage their own events as an organiser
- Book tickets to events and receive email confirmations
- Track all their upcoming bookings in a personal dashboard

Whether you're a developer looking for the next hackathon to join or an organiser wanting to reach a targeted tech audience, DevEvents has you covered.

---

## Features

### 🔐 Authentication
- JWT-based authentication stored in secure HTTP-only cookies
- Sign up / Login with email and password
- 24-hour session management with automatic expiry

### �� Event Discovery
- Browse all upcoming developer events
- Real-time search by title or description
- Filter events by location, mode (Online / Offline / Hybrid), and tags

### 🛠️ Event Management (Organisers)
- Create events with rich details: title, description, agenda, venue, date/time, tags, and cover image
- Upload event cover images via Cloudinary
- Edit and delete your created events
- View all events you've organised in a personal dashboard

### 🎟️ Booking System
- Book tickets to any event (up to 10 guests per booking)
- Duplicate booking prevention (one booking per email per event)
- Automated email confirmation sent on successful booking via Resend

### 📊 Analytics
- PostHog integration for tracking user interactions, page views, and conversion events

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), TailwindCSS Merge |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [jose](https://github.com/panva/jose) (JWT), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Image Upload** | [Cloudinary](https://cloudinary.com/), [next-cloudinary](https://next.cloudinary.dev/) |
| **Email** | [Resend](https://resend.com/) |
| **Analytics** | [PostHog](https://posthog.com/) |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A [MongoDB](https://www.mongodb.com/atlas) database (Atlas free tier works great)
- A [Cloudinary](https://cloudinary.com/) account (free tier available)
- A [Resend](https://resend.com/) account for email (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nawaz-B-04/dev-events.git

# 2. Navigate into the project directory
cd dev-events

# 3. Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dev-events

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cloudinary (Image Uploads)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Resend (Email Notifications)
RESEND_API_KEY=your_resend_api_key

# PostHog (Analytics) — optional
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

> ⚠️ Never commit your `.env.local` file to version control. It is already included in `.gitignore`.

### Running the App

```bash
# Development server (with hot reload)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

```bash
# Production build
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

---

## Project Structure

```
dev-events/
├── app/                    # Next.js App Router (pages & API routes)
│   ├── api/                # REST API endpoints
│   │   ├── events/         # GET all events, POST create event
│   │   └── search/         # Search events by query
│   ├── events/             # Event pages (browse, detail, create)
│   ├── my-bookings/        # User's bookings dashboard
│   ├── my-events/          # Organiser's events dashboard
│   ├── login/              # Login page
│   ├── signup/             # Sign up page
│   └── users/              # User profiles
├── components/             # Reusable React components
│   ├── Navbar.tsx
│   ├── EventCard.tsx
│   ├── SearchEvents.tsx
│   ├── BookEvent.tsx
│   └── FileUploader.tsx
├── database/               # Mongoose models (Event, User, Booking)
├── lib/
│   ├── actions/            # Server actions (auth, events, bookings)
│   ├── mongodb.ts          # MongoDB connection helper
│   ├── validator.ts        # Zod schemas
│   └── utils.ts            # Utility functions
└── public/                 # Static assets (images, icons)
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events` | Fetch all events |
| `POST` | `/api/events` | Create a new event |
| `GET` | `/api/events/:slug` | Get a single event by slug |
| `PUT` | `/api/events/:slug` | Update an event |
| `DELETE` | `/api/events/:slug` | Delete an event |
| `GET` | `/api/search?q=query` | Search events by title or description |

---

## Deployment

The easiest way to deploy DevEvents is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Add all your environment variables in the Vercel dashboard
4. Click **Deploy** — Vercel handles the rest!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nawaz-B-04/dev-events)

---

## Contributing

Contributions are welcome! If you have suggestions for new features or found a bug:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<p align="center">Built with ❤️ for the developer community</p>
