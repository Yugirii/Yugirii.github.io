# Marcus' Portfolio

Personal portfolio website showcasing my work as a Web Developer, Software QA Analyst, and Project Manager.

🔗 **Live site:** [yugirii-github-io.vercel.app](https://yugirii-github-io.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## Overview

A single-page portfolio built to showcase my technical stack, featured projects, background, and a working contact form — deployed as a fully dynamic Next.js app on Vercel.

**Sections:** Home · Tech Stack · Projects · About · Contact

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript, React
- **Styling:** Tailwind CSS
- **Email:** [Resend](https://resend.com) — powers the contact form's server-side delivery
- **Hosting:** Vercel

## Features

- Responsive, dark-themed design with a consistent gold/blue accent system
- Interactive Tech Stack section with scroll and cursor-based motion
- Project showcase linking out to live sites and documentation
- Contact form with real email delivery via a server-side API route (no exposed API keys)

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Yugirii/Yugirii.github.io.git
cd Yugirii.github.io
npm install
```

Run the local dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Environment Variables

Create a `.env.local` file in the project root:

```
RESEND_API_KEY=your_resend_api_key_here
```

This key is required for the contact form's API route (`app/api/contact/route.ts`) and should also be set in your Vercel project's Environment Variables for production.

## Deployment

This project deploys automatically to [Vercel](https://vercel.com) on every push to `main`.

## Contact

- **Email:** almendares.johnmarcus@gmail.com
- **LinkedIn:** [linkedin.com/in/john-marcus-almendares](https://www.linkedin.com/in/john-marcus-almendares/)
