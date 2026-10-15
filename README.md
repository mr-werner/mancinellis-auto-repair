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

- Leads with the 76-year, three-generation family story: a hero built on the shop's own photos, an odometer counting the years, and a "service record" timeline (1950, 1983, 2005, 2006, 2019, today) with Steve's medical-school story and the mission statement.
- Uses the real Mancinelli's logo (white version in the header and footer, oval car mark as the favicon) and their own navy, royal blue and yellow.
- Every award from the current site in one strip: ASE Blue Seal, ASA Gold Medallion, Nextdoor Neighborhood Favorite 2019, Small Business of the Year 2006, Best of Colorado, Green Denver.
- One phone number, (720) 330-3807 (the current page shows three different numbers).
- Removed the leftover COVID-19 slide, "My Garage" (a link to #), the empty image links, the hiring banner and the legacy goo.gl map link.
- Fixed "Over 70 years" (now computed from 1950) and "Highland Ranch" (Highlands Ranch).
- Services shown as one scannable "repair order" (12 lines) instead of a paragraph and 14 menu links; hybrid & EV gets its own section.
- "The little things" (shuttle, concierge, rentals, night drop, digital inspections, warranty, popcorn) in one place instead of spread over three pages.
- Meet-the-team strip with the team's own portraits. Six verbatim homepage testimonials, labeled as from the current website.
- "Schedule Online Appointment" opens a real form (on the current site it is a javascript:void(0) link).

## Before client presentation

- Confirm the phone number to publish. The concept uses only (720) 330-3807 (header "Call Us"). The current site also shows (303) 778-9761 ("Text Us" link and footer) and 303-997-1991 (SMS opt-in for the $25 offer). Decide whether a text number should be added back.
- Confirm the Google rating and count (4.8 / 755 is a fallback from our lead research; the current site shows "1432 Reviews").
- Confirm the Fall Inflation Buster ($35 off, through 11/30/2026) is still running before showing it. The $25 text opt-in offer was left out because it depends on the separate SMS number.
- Confirm the timeline: 1950 opening by Steve's grandfather, 1983 (Creighton graduation and joining the business; the site doesn't say exactly when he left medical training), 2005 Russ joining, 2006 Small Business of the Year, 2019 Nextdoor award.
- Best of Colorado and Green Denver badge images could not be retrieved from the current site (lazy-loaded); they're shown as icon badges. Swap in the real logos, and confirm the year/issuer for Best of Colorado.
- The ASE and ASA badges come from the About page sprite; confirm the ASE Blue Seal and ASA Gold Medallion statuses are current.
- Confirm the team list and titles (from the current Our Team page), and that the team is fine with their portraits being used. Source photos are small (300-641 px wide); ask for higher-resolution shop and team photos before launch.
- Confirm current perks (concierge, Uber/Lyft, rental at shop expense, complimentary EV charging, Hands of the Carpenter).
- Their current site already links to online scheduling and payment; connect the concept form to that system rather than email if they prefer.
- Add the shop's email and decide where appointment requests go.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
