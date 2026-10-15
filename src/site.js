import { BatteryCharging, Camera, Car, Cog, Disc3, Gauge, Gift, KeyRound, AppWindow, Moon, MessageSquare, Search, ShieldCheck, Thermometer, Truck, Wrench, Award, Leaf, Star, Facebook, Fuel, Droplets, CarFront, Heart } from "lucide-react";
import { YelpIcon } from "./social-icons.jsx";
import logo from "./assets/mancinellis-logo-white.svg";
import aseBadge from "./assets/badge-ase.png";
import asaBadge from "./assets/badge-asa.png";
import nextdoorBadge from "./assets/badge-nextdoor-2019.png";
import laurelBadge from "./assets/badge-laurel.png";

const COMPANY = "Mancinelli's Auto Repair Center";
const MAPS_QUERY = "Mancinelli's Auto Repair Center, 375 Logan St, Denver, CO 80203";
const FOUNDED = 1950;
const YEARS = new Date().getFullYear() - FOUNDED;

export default {
  COMPANY,
  ABBR: "mar",
  NOUN: "shop",
  // Main number from the current site header ("Call Us"). The site also shows (303) 778-9761 (Text Us, footer)
  // and 303-997-1991 (SMS opt-in); see the README checklist.
  PHONE: "7203303807",
  PHONE_DISPLAY: "(720) 330-3807",
  EMAIL: "",
  ADDRESS: "375 Logan Street",
  CITY: "Denver, CO 80203",
  MAPS_QUERY,
  FOUNDED,
  YEARS,
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. From our lead research on 2026-10-14; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 755 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Mancinelli's", sub: `AUTO REPAIR · SINCE ${FOUNDED}`, icon: Wrench, logo, logoAlt: COMPANY },
  ANNOUNCE: `Family owned on Logan Street since ${FOUNDED} · Mon–Fri 7:00 am – 5:00 pm`,

  HOURS: [
    ["Monday – Friday", "7:00 am – 5:00 pm"],
    ["Saturday & Sunday", "Closed"],
  ],
  HOURS_SHORT: "Mon–Fri 7:00 am – 5:00 pm",

  NAV: [
    ["#story", "Our Story"],
    ["#services", "Services"],
    ["#hybrid-ev", "Hybrid & EV"],
    ["#team", "Team"],
    ["#reviews", "Reviews"],
    ["#visit", "Visit"],
  ],

  HERO: {
    eyebrow: `375 LOGAN STREET · DENVER · SINCE ${FOUNDED}`,
    title: ["Three generations. ", "One family name on the sign."],
    text: "Grandpa Mancinelli opened the doors in 1950. Today his grandson Steve runs the shop with a team of ASE-certified master technicians, fixing everything from a classic to a Tesla, with the same old-fashioned service.",
    cta: "Schedule an Appointment",
    photo: { src: "/photos/shop-front.webp", alt: "The Mancinelli's Auto Repair Center sign above the service bays on Logan Street" },
    photo2: { src: "/photos/team-van.webp", alt: "The Mancinelli's team standing in front of the shop and the shuttle van" },
    note: "375 Logan St.",
  },

  QUICK: [
    { label: "Call", value: "(720) 330-3807", href: "tel:7203303807" },
    { label: "Hours", value: "Mon–Fri · 7 am – 5 pm" },
    { label: "Find us", value: "375 Logan St, Denver", href: "#visit" },
    { label: "Warranty", value: "12 mo / 12,000 mi nationwide" },
  ],

  OFFER: {
    kicker: "FALL INFLATION BUSTER",
    big: "$35 off",
    text: "Any service or repair. Excludes oil services and tire repairs. Not valid with other offers or discounts. Present at time of service.",
    expires: "Good through 11/30/2026",
    cta: "Redeem when you book",
  },

  STORY: {
    eyebrow: `${YEARS} YEARS ON LOGAN STREET`,
    title: ["It started with a grandfather ", "and a garage."],
    text: [
      `In ${FOUNDED}, Steve Mancinelli's grandfather opened a repair shop in downtown Denver. ${YEARS} years later the family name is still on the sign, and the third generation is behind the counter.`,
      "Steve was training to be a doctor when he realized he couldn't separate the emotion from the task at hand with his patients. So he came home to the family business, where he could put his entire heart and soul into the work. That diagnostic mindset is still how every car is inspected here: methodically, like a physical at the doctor's office.",
      "Customers notice. Some have trusted the shop for 20 years and counting, and many came over from the dealership and never went back.",
    ],
    quote: "Mancinelli's Auto Repair Center is committed to achieving total customer satisfaction by delivering error-free service on time with service second to none.",
    quoteBy: "Steve Mancinelli, Owner · our mission statement",
    timeline: [
      ["1950", "The doors open", "Steve's grandfather starts the family business in downtown Denver."],
      ["1983", "Steve comes home", "After graduating from Creighton University, Steve chooses the family business over medicine."],
      ["2005", "Russ joins the bench", "Russ Hutton moves from Arizona and becomes shop foreman."],
      ["2006", "Small Business of the Year", "Recognition for the little shop on Logan Street."],
      ["2019", "Neighborhood Favorite", "Voted a Nextdoor Neighborhood Favorite by Denver neighbors."],
      ["Today", "Third generation, newest tech", "ASE master techs servicing domestic, Asian, European, hybrid and electric vehicles, Tesla included."],
    ],
  },

  // Every award and badge shown on the current mancinellis.com (home and About pages).
  AWARDS: {
    eyebrow: "AWARDS & CREDENTIALS",
    title: "Recognized by the industry and the neighborhood.",
    items: [
      { img: aseBadge, title: "ASE Blue Seal of Excellence", sub: "Recognized facility" },
      { img: asaBadge, title: "ASA Gold Medallion", sub: "Repair facility" },
      { img: nextdoorBadge, title: "Nextdoor Neighborhood Favorite", sub: "2019 winner", round: true },
      { img: laurelBadge, title: "Small Business of the Year", sub: "2006" },
      { icon: Award, title: "Best of Colorado", sub: "Award recipient" },
      { icon: Leaf, title: "Green Denver", sub: "Member business" },
    ],
  },

  SERVICES: {
    eyebrow: "WHAT WE FIX",
    title: ["Full-service repair for ", "every make we see."],
    text: "Domestic, Asian and European cars, SUVs and light trucks, plus hybrids and EVs. Our technicians train at least 60 hours a year to stay ahead of what's rolling in.",
    makes: ["Domestic", "Asian", "European", "German", "Hybrid", "Electric", "Tesla"],
    cta: "Book this",
    items: [
      { title: "Check engine light", desc: "Accurate diagnosis, explained with photos.", icon: Search },
      { title: "Brake repair", desc: "Pads, rotors, calipers and fluid.", icon: Disc3 },
      { title: "European & German auto", desc: "Factory-level procedures and diagnostics.", icon: Car },
      { title: "Hybrid & EV service", desc: "HEV, PHEV, EREV and BEV, Tesla included.", icon: BatteryCharging },
      { title: "Timing belts & engine", desc: "Timing belts, engine, clutch and fuel pumps.", icon: Cog },
      { title: "Steering, suspension & alignment", desc: "A straight, planted, quiet ride.", icon: Gauge },
      { title: "Transmission repair", desc: "Diagnosis, service and repair.", icon: Wrench },
      { title: "Auto electronics & A/C", desc: "Including newer R1234yf A/C systems.", icon: Thermometer },
      { title: "Oil change service", desc: "Done right, with a full inspection.", icon: Droplets },
      { title: "Fuel induction service", desc: "Clean injectors and intake for efficiency.", icon: Fuel },
      { title: "Cooling, exhaust & emissions", desc: "Radiators, mufflers and emissions repair.", icon: CarFront },
      { title: "Window replacement", desc: "Regulators, motors and glass.", icon: AppWindow },
    ],
  },

  FEATURE: {
    id: "hybrid-ev",
    eyebrow: "HYBRID & ELECTRIC",
    title: ["The dealer couldn't fix it? ", "Bring it to Logan Street."],
    text: "Hybrids and EVs are a specialty here. Two of our technicians hold the ASE L3 Light-Duty Hybrid/Electric certification, and we often fix cars other shops and even dealerships can't.",
    photo: { src: "/photos/nissan-leaf.webp", alt: "A customer's Nissan Leaf plugged in and charging at Mancinelli's" },
    caption: "A regular's Nissan Leaf, on the charger at the shop.",
    types: [["HEV", "Hybrid"], ["PHEV", "Plug-in hybrid"], ["EREV", "Extended range"], ["BEV", "Battery electric"]],
    points: [
      "Nissan hybrid specialists",
      "Chevrolet Volt and Bolt, Nissan Leaf and Tesla",
      "ASE L3 hybrid/electric certified technicians",
      "Complimentary charging for our regular customers",
    ],
  },

  LITTLE: {
    eyebrow: "WHAT MAKES US DIFFERENT",
    script: "It's all about the little things.",
    text: "A repair should fit into your day, not take it over. Here's what comes standard.",
    items: [
      { icon: Camera, title: "Digital inspections", desc: "A report with photos and notes, sorted by urgency, sent to your phone." },
      { icon: Truck, title: "Free local shuttle", desc: "A ride to work or home for downtown Denver drivers." },
      { icon: KeyRound, title: "Concierge & rentals", desc: "Free pick-up and delivery, Uber or Lyft, or a rental car if needed." },
      { icon: Moon, title: "Night drop", desc: "Drop the car off after hours, keys in the box." },
      { icon: ShieldCheck, title: "12/12 nationwide warranty", desc: "12 months or 12,000 miles on all service and repair." },
      { icon: MessageSquare, title: "Updates by text", desc: "Questions and approvals by text, then pay online." },
      { icon: Gift, title: "Popcorn & small surprises", desc: "Popcorn, chapstick, emery boards, post-its and dog treats." },
      { icon: Heart, title: "Giving back", desc: "Reliable transportation for families through Hands of the Carpenter." },
    ],
  },

  TEAM: {
    eyebrow: "THE PEOPLE BEHIND THE COUNTER",
    title: ["Meet the ", "Mancinelli's team."],
    text: "Certified master technicians and trained service advisors, with the owner's name on the building.",
    people: [
      { name: "Steve Mancinelli", role: "Owner · ASE Master Technician, AMAM", photo: "/photos/steve.webp" },
      { name: "Russ Hutton", role: "Shop Foreman · ASE Master, L1 & L3", photo: "/photos/russ.webp" },
      { name: "Andrew Finucane", role: "European Specialist · ASE Master, L1 & L3", photo: "/photos/andrew.webp" },
      { name: "Brandon Gilbert", role: "ASE Certified Master Technician", photo: "/photos/brandon.webp" },
      { name: "Alexandra Giovanni", role: "Assistant Manager · Service Advisor", photo: "/photos/alex.webp" },
      { name: "Jennifer Wise", role: "Assistant Service Advisor", photo: "/photos/jennifer.webp" },
    ],
  },

  REVIEWS: {
    title: ["Customers for ", "decades."],
    text: "Real words from Mancinelli's customers, as published on the current website.",
    quoteSource: "Customer review, from the current website",
    // Verbatim from the homepage of mancinellis.com.
    quotes: [
      ["In my 60 years of driving I have never had the service I receive at Mancinelli's. They are honest and forthright and show you what needs repairing, the cost, what can be watched for a bit. Pictures of broken/defective parts show what needs to be repaired. They leave no stone unturned. My '07 CR-V's have 330,000 and 130,000 miles on them and run like new. I'll never take my cars anywhere else.", "Richard Schugar"],
      ["I had a blow out destroy a large portion of my coolant system. When Mancinelli's did their (very thorough) assessment, they provided a PDF online that had photographs and clear explanations of everything, sorted in terms of severity/urgency. Steve Mancinelli himself called to go over all options and repairs were completed on time and exactly as agreed upon. After four years in Denver, I've finally found my mechanic. A fantastic experience all around.", "Keith Skylance"],
      ["Amazing service. Mancinelli's saved me nearly $500 for an air conditioning repair this summer. Other shops were telling me to completely replace the compressor, but Steve at Mancinelli's fixed the issue without replacing the compressor which saved me so much. Really appreciate it and know I can trust that I won't be taken advantage of when I bring my car here.", "Angela S"],
      ["I am always impressed by the quality and professionalism at Mancinelli's. I have been using them for some 20 years and recommend them to all my friends.", "Tom Fryar"],
      ["I have trusted Mancinelli's with my car maintenance and repairs for decades. They have the most helpful and knowledgeable staff, with reasonable prices and turnaround times.", "Susan Dunlap"],
      ["Great local, independent shop nestled in the Speer neighborhood in Denver. Friendly and quick. Loved that I could communicate via text.", "Lindsay Gross"],
    ],
  },

  BOOK: {
    nav: "Schedule Service",
    eyebrow: "SCHEDULE SERVICE",
    title: ["Request a time. ", "We'll handle the little things."],
    text: "Tell us about your car and when you'd like to bring it in. Need the shuttle, a rental or the night drop? Let us know.",
    points: ["Free local shuttle for downtown drivers", "Digital inspection with photos", "12-month / 12,000-mile nationwide warranty"],
    submit: "Request Appointment",
    note: "We'll confirm by phone. Need it sooner? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / diagnosis", "Check engine light", "Brake repair", "European & German auto", "Hybrid & EV service", "Timing belts & engine", "Steering, suspension & alignment", "Transmission repair", "Auto electronics & A/C", "Oil change service", "Fuel induction service", "Cooling, exhaust & emissions"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's going on?", type: "textarea", placeholder: "Symptoms, shuttle or rental request, Fall Inflation Buster…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["375 Logan Street, ", "near downtown."],
    areas: "Serving downtown Denver, Speer, Baker, Capitol Hill and drivers from Lakewood, Aurora, Parker and Highlands Ranch.",
  },

  FOOTER_BLURB: `Third-generation, family-owned auto repair in Denver since ${FOUNDED}. It's all about the little things.`,
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/mancinellisdenver/", icon: Facebook, top: true },
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star, top: true },
    { name: "Yelp", url: "https://www.yelp.com/biz/mancinellis-auto-repair-denver", icon: YelpIcon, top: true },
  ],
};
