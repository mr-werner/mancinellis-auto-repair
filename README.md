# Mancinelli's Auto Repair Center — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.mancinellis.com/ (Denver, CO).
Preview: https://mar.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

All business content is in `src/site.js`; colors and fonts are in `src/theme.css`. `src/App.jsx` is the shared layout.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `mancinellis-auto-repair` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `mar.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-20) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Request-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Leads with the 75-year, three-generation family story, which the current site barely tells.
- One phone number for calls and one for texts (the current page shows three different numbers).
- Removed the leftover COVID-19 slide, the "My Garage" link to #, empty image links and the legacy goo.gl map link.
- "Schedule Online Appointment" opens a real form (on the current site it is a javascript:void(0) link).
- Gives hybrid and EV service its own section, with the shuttle, night drop, digital inspections and complimentary charging up front.

## Before client presentation

- Confirm which number to publish for calls and which for texts: the concept uses (720) 330-3807 to call and (303) 778-9761 to text; the SMS opt-in uses 303-997-1991.
- Confirm the Google rating and count. 4.8 / 755 is a fallback from a third-party listing checked 2026-10-14 (the current site shows 1,432 reviews across platforms).
- Confirm the Fall Inflation Buster ($35 off, expires 11/30/2026) and the $25 text opt-in offer before showing them.
- Confirm the family history details (1950, third generation, Steve's medical-school story) and the 12-month / 12,000-mile warranty.
- Their current site already links to online scheduling and payment; connect the concept form to that system rather than email if they prefer.
- Add the shop's email and decide where appointment requests go.
- Replace the icon wordmark with the business's real logo, and add real photos with permission.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
