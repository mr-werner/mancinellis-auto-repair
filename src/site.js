import { ExternalLink, BatteryCharging, Camera, Car, Clock, Cog, Disc3, Facebook, Gauge, MapPin, MessageSquare, Plug, Search, ShieldCheck, Star, Thermometer, Truck, Wrench, Zap, Users } from "lucide-react";

const COMPANY = "Mancinelli's Auto Repair Center";
const MAPS_QUERY = "Mancinelli's Auto Repair Center, 375 Logan St, Denver, CO 80203";
const FOUNDED = 1950;
const YEARS = new Date().getFullYear() - FOUNDED;

export default {
  COMPANY,
  ABBR: "mar",
  NOUN: "shop",
  PHONE: "7203303807",
  PHONE_DISPLAY: "(720) 330-3807",
  EMAIL: "",
  ADDRESS: "375 Logan Street",
  CITY: "Denver, CO 80203",
  MAPS_QUERY,
  FOUNDED,
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. From a third-party listing on 2026-10-14; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 755 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Mancinelli's", sub: `AUTO REPAIR · SINCE ${FOUNDED}`, icon: Wrench },
  ANNOUNCE: "Three generations serving Denver since 1950 · Text us at (303) 778-9761",

  HOURS: [
    ["Monday – Friday", "7:00 am – 5:00 pm"],
    ["Saturday", "Closed"],
    ["Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:00 am – 5:00 pm",

  HERO: {
    eyebrow: `LOGAN STREET, DOWNTOWN DENVER · SINCE ${FOUNDED}`,
    title: ["Three generations. ", `${YEARS} years. It's all about the little things.`],
    text: "Family-owned auto repair near downtown Denver, with ASE-certified master technicians, photo inspections you can see for yourself, and a shuttle to get you where you need to go.",
    cta: "Schedule an Appointment",
    card: [
      { icon: Clock, title: "Hours", text: "Mon–Fri, 7:00 am – 5:00 pm" },
      { icon: MapPin, title: "375 Logan Street", text: "Denver, CO 80203" },
      { icon: ShieldCheck, title: "12 mo / 12,000 mi", text: "Nationwide limited warranty" },
    ],
  },

  STATS: (rating) => [
    [String(FOUNDED), "Family owned since"],
    ["3rd gen", "Mancinelli family"],
    [rating ? `${rating.rating.toFixed(1)} ★` : "5 ★", "Google rating"],
    ["60 hrs", "Yearly training per tech"],
  ],

  OFFERS: [
    ["$35 off", "Fall Inflation Buster on any service or repair. Excludes oil services and tire repairs. Expires 11/30/2026."],
    ["$25 off", "Opt in to text updates and save on any service."],
    ["Free charging", "Complimentary charging for our regular hybrid and EV customers."],
  ],

  SERVICES: {
    eyebrow: "WHAT WE DO",
    title: ["Domestic, Asian, European, ", "hybrid and electric."],
    text: "ASE-certified master technicians who train at least 60 hours a year, so the newest cars get the same expert care as the classics.",
    cta: "Book this service",
    items: [
      { title: "Check Engine Light", desc: "Accurate diagnosis and repair, explained with photos and notes.", icon: Search },
      { title: "Brake Repair", desc: "Pads, rotors, calipers and fluid for safe, quiet stops.", icon: Disc3 },
      { title: "European Auto Service", desc: "Factory-level care for German and other European makes.", icon: Car },
      { title: "Hybrid & EV Service", desc: "HEV, PHEV, EREV and BEV maintenance and repair, including Tesla.", icon: BatteryCharging },
      { title: "Timing Belts & Engine", desc: "Timing belt replacement, engine, clutch and fuel pump repair.", icon: Cog },
      { title: "Steering, Suspension & Alignment", desc: "Steering, suspension and wheel alignments for a planted ride.", icon: Gauge },
      { title: "Transmission Repair", desc: "Transmission diagnosis, service and repair.", icon: Wrench },
      { title: "A/C & Electronics", desc: "Auto electronics and A/C service, including newer R1234yf systems.", icon: Thermometer },
    ],
  },

  FEATURE: {
    id: "hybrid-ev",
    nav: "Hybrid & EV",
    eyebrow: "HYBRID & ELECTRIC VEHICLES",
    title: ["The dealer couldn't fix it? ", "Bring it to us."],
    text: "Hybrids and EVs are a specialty here, from hybrid systems to a Tesla, a Volt or a Leaf.",
    cards: [
      { name: "Hybrids", icon: Zap, lead: "HEV and PHEV maintenance and repair.", items: ["Nissan hybrid specialists", "Ford and other hybrid makes", "Hybrid system diagnostics"] },
      { name: "Electric", icon: Plug, lead: "BEV and EREV service.", items: ["Tesla", "Chevrolet Bolt and Volt", "Nissan Leaf"] },
      { name: "Made easy", icon: MessageSquare, lead: "Service that fits a downtown day.", items: ["Digital inspections with photos", "Updates by text", "Complimentary charging for regulars"] },
    ],
  },

  PROCESS: {
    eyebrow: "HOW IT WORKS",
    title: ["Error-free service, ", "on time, every time."],
    text: "Our mission is total customer satisfaction. Here's how a visit works.",
    steps: [
      ["Book or night drop", "Schedule online or by phone, or use our night drop."],
      ["Ride the shuttle", "Our local shuttle gets downtown drivers to work or home."],
      ["See the inspection", "A digital report with photos and plain-English notes, sent to your phone."],
      ["Approve and pick up", "You approve the work, pay online, and pick up when it's ready."],
    ],
  },

  ABOUT: {
    nav: "Our Family",
    eyebrow: `SERVING DENVER FOR ${YEARS} YEARS`,
    title: ["A family name ", "on the sign since 1950."],
    text: [
      "Mancinelli's has been fixing Denver's cars since 1950, and today it's run by the third generation of the family. Owner Steve Mancinelli was headed for medical school before he joined the shop, and that same diagnostic mindset shows up in every inspection.",
      "Customers stay for decades because of the little things: clear explanations, honest options, a shuttle downtown, and a few small gifts on the way out.",
    ],
    badge: [String(FOUNDED), "Three generations"],
    tiles: [
      { label: "Family", icon: Users },
      { label: "Hybrid & EV", icon: BatteryCharging },
      { label: "Photo reports", icon: Camera },
      { label: "Shuttle", icon: Truck },
    ],
    credentials: [
      { title: "ASE-certified master techs", desc: "At least 60 hours of training every year." },
      { title: "12 / 12 nationwide warranty", desc: "12 months or 12,000 miles on service and repair." },
      { title: "ASA member & Green Denver", desc: "Industry and community recognition." },
      { title: "Night drop & rentals", desc: "After-hours drop-off and rental cars on request." },
    ],
  },

  REVIEWS: {
    title: ["Customers for ", "decades."],
    text: "Some customers have trusted us for 20 years and counting. Read their reviews on Google.",
    quoteSource: "",
    quotes: [],
  },

  BOOK: {
    nav: "Schedule Service",
    eyebrow: "SCHEDULE SERVICE",
    title: ["Request a time. ", "We'll handle the little things."],
    text: "Tell us about your car and when you'd like to bring it in. Need the shuttle? Let us know.",
    points: ["Local shuttle for downtown drivers", "Digital inspection with photos", "12-month / 12,000-mile nationwide warranty"],
    submit: "Request Appointment",
    note: "We'll confirm by phone or text. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Check Engine Light", "Brake Repair", "European Auto Service", "Hybrid & EV Service", "Timing Belts & Engine", "Steering, Suspension & Alignment", "Transmission Repair", "A/C & Electronics", "Oil change"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's going on?", type: "textarea", placeholder: "Symptoms, shuttle or rental request…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["375 Logan, ", "just off downtown."],
    areas: "Serving downtown Denver, Capitol Hill, Speer, Baker and the greater metro.",
  },

  FOOTER_BLURB: "Third-generation, family-owned auto repair serving downtown Denver since 1950.",
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/mancinellisdenver", icon: Facebook },
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
    { name: "Yelp", url: "https://www.yelp.com/biz/mancinellis-auto-repair-denver", icon: ExternalLink },
  ],
};
