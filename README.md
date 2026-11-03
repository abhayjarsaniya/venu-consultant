# Venu Consultants Pvt. Ltd. — Corporate Web Portal & CMS

A high-performance modern web application and dynamic content management system built with **Vite**, **React**, and **Tailwind CSS** for **Venu Consultants Pvt. Ltd.** (Architectural, Civil, Structural, Environmental & Industrial Engineering Consultancy).

---

## Features

- **Luxury Corporate Interface:** Pixel-perfect typography (Fraunces & Manrope), responsive grid, and signature gold palette (`#D9A520`).
- **Interactive In-Folder Admin Panel (`/admin`):**
  - Section-by-section hide/unhide toggles across all pages.
  - Complete CRUD for Careers (Job Ads) and Blog Articles.
  - Live editing of Hero, Stats, Services, Sectors, Team, Clients, Testimonials, and Contact details.
  - SEO Crawler Keywords & Meta Tags manager per page with live Google SERP preview.
  - Cloud Sync with Firebase Firestore (one-click push/pull).
  - JSON Backup & Restore.
- **Search Engine Optimization (SEO):**
  - Dynamic canonical tags, Open Graph, meta titles, and descriptions.
  - Static sitemap generator at `/sitemap.xml` and `/robots.txt`.
- **Zero-Config Deployment:**
  - Standard Vite SPA preset ready for 1-click deployment on **Vercel** (`vercel.json`) and **Firebase Hosting** (`firebase.json`).

---

## Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment on Vercel

1. Import repository on [Vercel](https://vercel.com/new).
2. Framework Preset will automatically detect **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.
