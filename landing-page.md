# Product Requirements Document (PRD): Personal Portfolio Landing Page

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React.
**Goal:** To establish a professional online presence, showcase projects/skills, and facilitate contact from potential clients or recruiters.

---

## 1. Project Overview
A high-performance, SEO-friendly, single-page application (SPA) focused on clean UI and smooth user experience. The portfolio will highlight your dual expertise in development (React/Laravel) and creative video management.

---

## 2. Core Features

### A. Hero Section (Introduction)
* **Headline:** Catchy introduction (e.g., "Crafting Digital Experiences | [Your Name]").
* **Sub-headline:** Brief value proposition (e.g., "Fullstack Developer specializing in React, Next.js, and Scalable Backend Solutions").
* **CTA (Call to Action):** Primary button for "View Projects" and secondary for "Download CV".
* **Visuals:** Aesthetic profile image or a subtle code-based animation.

### B. About & Tech Stack
* **Professional Bio:** Narrative of your background and career journey.
* **Skills Cloud:** Interactive grid of technology icons (Next.js, Laravel, MySQL, Tailwind) using a consistent icon set.

### C. Project Showcase (Portfolio)
* **Grid Display:** A collection of project cards.
* **Card Attributes:** * Project Thumbnail.
    * Title and short description.
    * Tech tags (e.g., "Next.js", "MySQL").
    * External links to Live Demo and GitHub Repository.
* **Interactivity:** Smooth scale-up animations on hover via Framer Motion.

### D. Featured Video Dashboard
* **Function:** A specific section to showcase your video-related projects or recorded app demos.
* **Player Integration:** Use a lightweight player (e.g., `react-player`) to play local or hosted MP4 files.
* **User Context:** This section specifically demonstrates your ability to handle media-heavy dashboards.

### E. Contact & Footer
* **Contact Form:** Fields for Name, Email, and Message (integrated with services like Resend or Formspree).
* **Social Hub:** Links to GitHub, LinkedIn, and professional social accounts.

---

## 3. Technical Requirements

### A. Performance & SEO
* **Server-Side Rendering (SSR):** Optimized for search engine indexing.
* **Image Optimization:** Utilization of the `next/image` component for automatic lazy loading and resizing.
* **Dark Mode Support:** Implementation of a theme switcher (Dark/Light) using `next-themes`.

### B. Responsiveness
* **Mobile-First Design:** Ensuring the layout is seamless across smartphones, tablets, and high-resolution monitors.

---

## 4. Proposed Folder Structure (App Router)
```text
/app
  /components
    - Navbar.tsx
    - Hero.tsx
    - Projects.tsx
    - VideoSection.tsx
    - ContactForm.tsx
  /lib
    - utils.ts
  /assets
    - images/
    - videos/
  page.tsx (Main Entry)
  layout.tsx