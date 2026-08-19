---
name: internship-resume-builder
description: Build a tailored resume for Vivek Desai for a specific internship listing — checks the listing's required skills against his known profile, asks about any gaps before adding them, and generates a resume emphasizing only the relevant projects/skills for that listing.
---

# Internship Resume Builder — Vivek Desai

## What this skill does
Given a job/internship listing (pasted text, screenshot, or URL), produce a
tailored one-page resume (.docx and .pdf) for that specific listing, following
a strict "verify before claiming" process — never invent skills he hasn't
confirmed.

## Process (always follow in this order)
1. **Extract requirements** from the listing: required skills, bonus skills,
   role type, stipend, remote/onsite, any special conditions (unpaid trial
   period, notice period questions, custom application questions, etc.)
2. **Compare against the Known Profile Data below.** Mark each required/bonus
   skill as: already confirmed / not yet confirmed.
3. **Ask before adding anything.** For every "not yet confirmed" skill in the
   listing, ask Vivek directly (multi-select works well) whether he has
   hands-on experience. Only add a skill to the resume if he confirms it.
   Never assume or infer skill possession from adjacent skills (e.g. Firebase
   experience does NOT imply Supabase experience — ask separately).
4. **Flag anything worth knowing before he applies** — e.g. unpaid trial
   periods, tier-1-college preference in the listing, stipend below his
   target, low hiring-rate signals, skills gaps he should be ready to address
   honestly in an interview.
5. **Select only relevant projects/skills** for this specific listing — don't
   dump every project on every resume. Pick 2–4 projects that best match what
   the listing asks for, and order them with the strongest match first.
6. **Build the resume**: one page, clean formatting, honest content only.
   Reuse the contact block, education block, and project descriptions from
   the Known Profile Data below verbatim where possible; only the Objective
   line, Skills section, and project selection/ordering should change per
   listing.
7. **Output both .docx and .pdf.** PDF is the default recommendation for
   submission (formatting stays locked); .docx only if the portal explicitly
   asks for it.
8. **Never fabricate metrics, employers, dates, or skills.** If a listing
   needs something he doesn't have and can't reasonably claim, leave it out
   and say so directly — don't paper over the gap.

## Known Profile Data

### Contact
- Name: Vivek Vijaykumar Desai
- Email: vivax.work@gmail.com
- Phone: 9209509694
- Location: Kolhapur, Maharashtra
- LinkedIn: https://in.linkedin.com/in/vivek-desai-8b20142b1
- Portfolio: https://zenviashopping.in

### Education
- MCA — Tatyasaheb Kore Institute of Engineering and Technology, Warananagar, Kolhapur (In Progress)
- BCA — Yashwantrao Chavan Mahavidyalaya, Halkarni, Tal. Chandgad, Dist. Kolhapur (Completed)

### Target
- Remote internship, target stipend ~₹15,000/month (flexible; flag if a listing pays notably less or has an unpaid period)

### Confirmed Skills (only add to a resume if genuinely relevant to the listing)
- **Languages:** JavaScript, TypeScript, Python, PHP
- **Frontend:** HTML5, CSS3, Bootstrap, Vue.js, responsive UI development
- **Backend:** Node.js, Express, PHP, REST API development, asynchronous job processing
- **Databases:** MySQL, SQLite, Firebase
- **CMS:** WordPress (site building & customization)
- **Automation/Data:** Playwright (browser automation, web scraping)
- **Tools:** Git, VS Code
- **AI-native development:** Claude, Antigravity — used to move fast and pick up new stacks quickly; owns core logic/architecture decisions himself, not just AI output
- Comfortable building applications/tools in any language with AI-tool assistance, even without prior direct experience in that language

### Explicitly NOT confirmed (do not add unless he confirms in a future check)
React, Next.js, Angular, NestJS, MongoDB, AWS, React Native, PostgreSQL, Redis, Docker, Supabase, jQuery

### Projects (pick relevant subset per listing; don't include all on every resume)

**KiranaBill — Offline-First Billing System** (kiranabill.ct.ws)
Independent Build — PHP, MySQL, Bootstrap, IndexedDB, PWA
- Full-stack offline-first PWA for billing at Indian kirana (grocery) shops, hosted live, works without stable internet.
- MySQL backend with full registration/settings system; IndexedDB offline storage layer with twice-daily randomized sync to reconcile local/server data.
- Complete system documentation (DFD/ER diagrams, system design docs).
- Best for: listings needing PHP, MySQL, Bootstrap, full-stack ownership.

**Zenvia — Product Discovery Web App** (zenviashopping.in)
Founder & Builder — HTML, CSS, JavaScript, Node.js
- Live Gen Z fashion/lifestyle discovery app aggregating listings from Myntra, Amazon, Meesho, Flipkart into one responsive browsing experience.
- Client-side fuzzy search engine handling up to 1,000 products in-browser.
- Storefront UX and sponsored-content system (scroll-triggered banners, brand carousel) balancing UX with the app's ad revenue model.
- Best for: any web dev / product / frontend listing; his flagship live product.

**Zenvia Curator — Backend Data/Scraping Pipeline** (local/private repo)
Independent Build — Node.js, Playwright, SQLite, REST APIs
- Asynchronous backend: background worker polls a SQLite job queue, processes/streams data from four e-commerce platforms in real time.
- Dedicated scraper modules per platform (Amazon, Flipkart, Myntra, Meesho), each handling platform-specific DOM quirks.
- Anti-bot evasion: stealth script injection, user-agent rotation, human-scroll emulation, randomized jitter delays.
- Auto-retry logic for network failures; performance optimizations (resource blocking, in-browser DOM queries).
- Best for: scraping, automation, backend/API, AI-native "builder" style listings.

**Zenvia Insta — Content Automation Tool** (local tool)
Independent Build — Vue.js, Node/Express, SQLite, yt-dlp, FFmpeg
- Local full-stack tool for Instagram content ops: bulk reel downloading + automated video text removal, supporting Zenvia's affiliate content pipeline.
- Best for: automation-heavy or full-stack listings when Zenvia Curator isn't a fit.

## Resume format rules
- One page. Sections in order: Name/Contact → Objective (2–3 sentences,
  tailored per listing) → Skills (grouped, 4–5 bullet lines) → Projects
  (2–4, strongest match first, 2–4 bullets each) → Education.
- Navy section headers with a thin bottom border, clean sans-serif body text,
  bullet points for achievements — match the visual style already established
  in prior resumes (see reference .docx files if available).
- Objective line changes per listing to mirror the role type (e.g. "Web
  Development," "Product Engineer," "Full-Stack Developer") without copying
  the listing's exact wording.

## After building
- Point out any required skill still missing from his profile and suggest
  how he might honestly address it if asked in an interview.
- If the listing has custom application questions (e.g. "why this company,"
  portfolio links, availability), offer to draft those too, grounded in this
  same profile data — never invented achievements.
