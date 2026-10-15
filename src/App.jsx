import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, MapPin, Menu, Minus, Phone, Plus, X } from "lucide-react";
import SITE from "./site.js";

// -----------------------------------------------------------------------------
// All business content lives in src/site.js. This file only lays it out.
// -----------------------------------------------------------------------------

const { COMPANY, PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, CITY, MAPS_QUERY, FOUNDED, FALLBACK_RATING } = SITE;
const GOOGLE_REVIEWS_URL = SITE.GOOGLE_PLACE_ID
  ? `https://search.google.com/local/reviews?placeid=${SITE.GOOGLE_PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const GOOGLE_WRITE_REVIEW_URL = SITE.GOOGLE_PLACE_ID ? `https://search.google.com/local/writereview?placeid=${SITE.GOOGLE_PLACE_ID}` : null;

// Public contact details for the studio — edit here, no environment variables required.
const STUDIO_PHONE = "+17205156647";
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";
const STUDIO_SOURCE = `${SITE.ABBR}.blueprintwebstudio.com`;

const END_DATE = import.meta.env.VITE_CONCEPT_END_DATE || SITE.END_DATE;

function Title({ parts }) {
  const [plain, em] = parts;
  return <>{plain}{em && <em>{em}</em>}</>;
}

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN + INTEREST FORM (Blueprint WebStudio)
// -----------------------------------------------------------------------------

function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    expired: ms === 0,
  };
}

function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (form.website) { setStatus("sent"); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: STUDIO_SOURCE,
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not {COMPANY}.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function ConceptWidget() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const [showForm, setShowForm] = useState(false);
  const closeForm = useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

function BrandMark() {
  const Icon = SITE.BRAND.icon;
  return <span className="brand-mark" aria-hidden="true"><Icon strokeWidth={2} /></span>;
}

function Brand({ onClick }) {
  if (SITE.BRAND.logo) {
    return (
      <a className="brand brand-logo" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
        <img src={SITE.BRAND.logo} alt={SITE.BRAND.logoAlt || COMPANY} width="865" height="170" />
      </a>
    );
  }
  return (
    <a className="brand" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
      <BrandMark />
      <span className="brand-text"><strong>{SITE.BRAND.name}</strong><small>{SITE.BRAND.sub}</small></span>
    </a>
  );
}

function navItems() {
  return SITE.NAV;
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="announce">
        <div className="container announce-inner">
          <span><i className="announce-dot" aria-hidden="true" />{SITE.ANNOUNCE}</span>
          <div className="announce-contact">
            {SITE.SOCIAL_LINKS.some(({ top }) => top) && (
              <div className="announce-social">
                {SITE.SOCIAL_LINKS.filter(({ url, top }) => url && top).map(({ name, url, icon: Icon }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY} on ${name}`} title={name}><Icon size={14} /></a>
                ))}
              </div>
            )}
            <a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand onClick={closeMenu} />
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            {navItems().map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="links-cta" href="#book" onClick={closeMenu}>{SITE.BOOK.nav}</a>
          </nav>
          <a className="nav-cta" href="#book">{SITE.BOOK.nav} <ArrowUpRight size={17} /></a>
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((current) => !current)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS (Mancinelli's: odometer + sign-band stripe motifs)
// -----------------------------------------------------------------------------

function Odometer({ value, label, small }) {
  const digits = String(value).split("");
  return (
    <span className={`odometer${small ? " small" : ""}`} role="img" aria-label={label || String(value)}>
      {digits.map((d, i) => <span className="odo-digit" key={i} aria-hidden="true">{d}</span>)}
    </span>
  );
}

function SignBand({ className = "" }) {
  return <div className={`sign-band ${className}`} aria-hidden="true"><i /><i /><i /></div>;
}

function Hero({ rating }) {
  const { HERO, YEARS } = SITE;
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">{HERO.eyebrow}</span>
          <h1><Title parts={HERO.title} /></h1>
          <p>{HERO.text}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">{HERO.cta} <ArrowUpRight size={19} /></a>
            <a className="btn ghost" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
          {rating && (
            <a className="hero-rating-chip" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              <strong>{rating.rating.toFixed(1)}</strong>
              <span><span className="stars" aria-hidden="true">★★★★★</span><small>{rating.userRatingCount.toLocaleString()} Google reviews</small></span>
            </a>
          )}
        </div>
        <div className="hero-prints">
          <figure className="print print-main">
            <img src={HERO.photo.src} alt={HERO.photo.alt} width="450" height="230" fetchPriority="high" />
            <figcaption>{HERO.note}</figcaption>
          </figure>
          <figure className="print print-second">
            <img src={HERO.photo2.src} alt={HERO.photo2.alt} width="450" height="230" />
            <figcaption>the crew, today</figcaption>
          </figure>
          <div className="hero-odo">
            <span className="hero-odo-kicker">SERVING DENVER FOR</span>
            <Odometer value={String(YEARS).padStart(4, "0")} label={`${YEARS} years`} />
            <span className="hero-odo-unit">YEARS · SINCE {FOUNDED}</span>
          </div>
        </div>
      </div>
      <SignBand />
    </section>
  );
}

function QuickBar() {
  const { QUICK, OFFER } = SITE;
  return (
    <section className="quickbar" aria-label="Contact and current offer">
      <div className="container quickbar-inner">
        <ul className="quick-list">
          {QUICK.map(({ label, value, href }) => (
            <li key={label}>
              <small>{label}</small>
              {href ? <a href={href}>{value}</a> : <span>{value}</span>}
            </li>
          ))}
        </ul>
        <article className="coupon">
          <div className="coupon-left">
            <small>{OFFER.kicker}</small>
            <strong>{OFFER.big}</strong>
          </div>
          <div className="coupon-right">
            <p>{OFFER.text}</p>
            <span>{OFFER.expires} · <a href="#book">{OFFER.cta} <ArrowRight size={14} /></a></span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Story() {
  const { STORY } = SITE;
  return (
    <section className="section story" id="story">
      <div className="container story-inner">
        <div className="story-copy">
          <span className="eyebrow">{STORY.eyebrow}</span>
          <h2><Title parts={STORY.title} /></h2>
          {STORY.text.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          <blockquote className="mission">
            <p>“{STORY.quote}”</p>
            <footer>{STORY.quoteBy}</footer>
          </blockquote>
        </div>
        <ol className="timeline" aria-label="Mancinelli's through the years">
          {STORY.timeline.map(([year, title, text]) => (
            <li key={year}>
              {/^\d+$/.test(year) ? <Odometer value={year} small /> : <span className="odometer small today">{year}</span>}
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Awards() {
  const { AWARDS } = SITE;
  return (
    <section className="awards" id="awards" aria-labelledby="awards-title">
      <div className="container">
        <div className="awards-head">
          <span className="eyebrow">{AWARDS.eyebrow}</span>
          <h2 id="awards-title">{AWARDS.title}</h2>
        </div>
        <ul className="awards-list">
          {AWARDS.items.map(({ img, icon: Icon, title, sub, round }) => (
            <li key={title}>
              <span className={`award-art${round ? " round" : ""}`}>
                {img ? <img src={img} alt="" loading="lazy" /> : <Icon size={40} strokeWidth={1.5} />}
              </span>
              <strong>{title}</strong>
              <small>{sub}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  const { SERVICES } = SITE;
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{SERVICES.eyebrow}</span>
            <h2><Title parts={SERVICES.title} /></h2>
          </div>
          <div>
            <p>{SERVICES.text}</p>
            <div className="makes">{SERVICES.makes.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
        </div>
        <div className="repair-order">
          <div className="ro-head" aria-hidden="true">
            <span>REPAIR ORDER</span>
            <span>MANCINELLI'S · 375 LOGAN ST</span>
            <span>No. {FOUNDED}</span>
          </div>
          <ul className="ro-list">
            {SERVICES.items.map(({ title, desc, icon: Icon }, index) => (
              <li key={title}>
                <span className="ro-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="ro-icon"><Icon size={22} strokeWidth={1.7} /></span>
                <span className="ro-text"><strong>{title}</strong><small>{desc}</small></span>
                <a href="#book" data-service={title} aria-label={`${SERVICES.cta}: ${title}`}>{SERVICES.cta} <ArrowRight size={14} /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Feature() {
  const { FEATURE } = SITE;
  return (
    <section className="section feature" id={FEATURE.id}>
      <div className="feature-glow" aria-hidden="true" />
      <div className="container feature-inner">
        <figure className="feature-photo">
          <img src={FEATURE.photo.src} alt={FEATURE.photo.alt} loading="lazy" width="641" height="365" />
          <figcaption>{FEATURE.caption}</figcaption>
          <span className="charge-tag"><span aria-hidden="true">⚡</span> Complimentary charging for regulars</span>
        </figure>
        <div>
          <span className="eyebrow light">{FEATURE.eyebrow}</span>
          <h2><Title parts={FEATURE.title} /></h2>
          <p className="feature-lead">{FEATURE.text}</p>
          <ul className="ev-types">
            {FEATURE.types.map(([abbr, name]) => <li key={abbr}><strong>{abbr}</strong><small>{name}</small></li>)}
          </ul>
          <ul className="feature-points">
            {FEATURE.points.map((p) => <li key={p}><CheckCircle2 size={17} /> {p}</li>)}
          </ul>
          <a className="btn primary" href="#book" data-service="Hybrid & EV service">Book hybrid or EV service <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

function LittleThings() {
  const { LITTLE } = SITE;
  return (
    <section className="section little" id="little-things">
      <div className="container">
        <div className="little-head">
          <span className="eyebrow">{LITTLE.eyebrow}</span>
          <h2 className="script">{LITTLE.script}</h2>
          <p>{LITTLE.text}</p>
        </div>
        <ul className="little-grid">
          {LITTLE.items.map(({ icon: Icon, title, desc }) => (
            <li key={title}>
              <span className="little-icon"><Icon size={24} strokeWidth={1.6} /></span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Team() {
  const { TEAM } = SITE;
  return (
    <section className="section team" id="team">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{TEAM.eyebrow}</span>
            <h2><Title parts={TEAM.title} /></h2>
          </div>
          <p>{TEAM.text}</p>
        </div>
        <ul className="team-grid">
          {TEAM.people.map(({ name, role, photo }) => (
            <li key={name}>
              <img src={photo} alt={`${name}, ${role}`} width="300" height="250" />
              <strong>{name}</strong>
              <small>{role}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const live = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  const { REVIEWS } = SITE;
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="reviews-top">
          <div>
            <span className="eyebrow light">CUSTOMER REVIEWS</span>
            <h2><Title parts={REVIEWS.title} /></h2>
            <p>{REVIEWS.text}</p>
          </div>
          <div className="reviews-score">
            <span className="google-wordmark">Google</span>
            {rating ? (
              <>
                <strong>{rating.rating.toFixed(1)}</strong>
                <span className="stars" aria-hidden="true">★★★★★</span>
                <small>{rating.userRatingCount.toLocaleString()} Google reviews</small>
              </>
            ) : <small>See what customers say on Google.</small>}
            <a className="btn primary" href={rating?.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
            {GOOGLE_WRITE_REVIEW_URL && <a className="btn ghost" href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a review</a>}
          </div>
        </div>
        {live.length > 0 ? (
          <>
            <div className="quotes-grid">
              {live.slice(0, 3).map((review, i) => (
                <article className="quote-card" key={`${review.publishTime || i}-${i}`}>
                  <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                  <blockquote>{review.text?.text || review.originalText?.text}</blockquote>
                  <footer>{review.authorAttribution?.displayName || "Google reviewer"}<small>{review.relativePublishTimeDescription}</small></footer>
                </article>
              ))}
            </div>
            <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>
          </>
        ) : (
          <div className="quotes-grid">
            {REVIEWS.quotes.map(([text, name]) => (
              <article className="quote-card" key={name}>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>{text}</blockquote>
                <footer>{name}<small>{REVIEWS.quoteSource}</small></footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RequestForm() {
  const { BOOK } = SITE;
  const blank = Object.fromEntries([...BOOK.fields.flat().map((field) => [field.name, ""]), ["website", ""]]);
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="book-form book-done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? `This is where ${SITE.BRAND.name} gets your request.` : "Request received."}</h3>
        <p>
          {status === "demo"
            ? `In this concept preview, requests aren't sent anywhere. On the live site they'd land in the ${SITE.NOUN} inbox with everything ${SITE.BRAND.name} needs to call back.`
            : `Thanks, ${form.name.split(" ")[0]}. We'll be in touch to confirm.`}
        </p>
        <button type="button" className="btn dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  const renderField = (field) => {
    const common = { value: form[field.name], onChange: (e) => update(field.name, e.target.value), required: field.required };
    let control;
    if (field.type === "select") {
      control = (
        <select {...common}>
          <option value="">{field.placeholder || "Choose…"}</option>
          {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    } else if (field.type === "textarea") {
      control = <textarea rows={4} maxLength={3000} placeholder={field.placeholder} {...common} />;
    } else {
      control = <input type={field.type || "text"} maxLength={field.type === "email" ? 254 : 160} placeholder={field.placeholder} autoComplete={field.autoComplete} {...common} />;
    }
    return <label key={field.name}>{field.label}{field.required ? " *" : ""}{control}</label>;
  };

  return (
    <form className="book-form" onSubmit={submit}>
      {BOOK.fields.map((row, index) => (Array.isArray(row) ? <div className="book-row" key={index}>{row.map(renderField)}</div> : renderField(row)))}
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn primary full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : BOOK.submit} <ArrowUpRight size={18} /></button>
      <p className="form-note">{BOOK.note} <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Book() {
  const { BOOK } = SITE;
  return (
    <section className="section book" id="book">
      <div className="container book-inner">
        <div>
          <span className="eyebrow light">{BOOK.eyebrow}</span>
          <h2><Title parts={BOOK.title} /></h2>
          <p>{BOOK.text}</p>
          <ul className="book-points">
            {BOOK.points.map((point) => <li key={point}><CheckCircle2 size={18} /> {point}</li>)}
          </ul>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function Visit() {
  const { VISIT, HOURS } = SITE;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="container visit-inner">
        <div className="visit-info">
          <span className="eyebrow">{VISIT.eyebrow}</span>
          <h2><Title parts={VISIT.title} /></h2>
          <div className="visit-blocks">
            {ADDRESS && (
              <div>
                <MapPin size={20} />
                <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
              </div>
            )}
            <div>
              <Phone size={20} />
              <span><small>PHONE</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>{EMAIL && <><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></>}</span>
            </div>
            {HOURS.length > 0 && (
              <div>
                <Clock size={20} />
                <span><small>HOURS</small>
                  {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
                </span>
              </div>
            )}
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} /></a>
          <p className="areas">{VISIT.areas}</p>
        </div>
        <div className="visit-map">
          <iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Brand />
          <p>{SITE.FOOTER_BLURB}</p>
          <div className="footer-social">
            {SITE.SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {SITE.SERVICES.items.slice(0, 5).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>{SITE.NOUN === "shop" ? "Shop" : "Company"}</b>
          {navItems().slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="#book">{SITE.BOOK.nav}</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          {EMAIL && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
          {ADDRESS && <span>{ADDRESS}</span>}
          {ADDRESS && <span>{CITY}</span>}
          {SITE.HOURS_SHORT && <span>{SITE.HOURS_SHORT}</span>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent design concept, not an official company website.</span>
        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept redesign by</span>
          <span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" />
          <strong>Blueprint WebStudio</strong>
        </a>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------

export default function App() {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setReviewData(data); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const live = typeof reviewData?.rating === "number" && typeof reviewData?.userRatingCount === "number";
  const rating = live
    ? { rating: reviewData.rating, userRatingCount: reviewData.userRatingCount, googleMapsUri: reviewData.googleMapsUri || null }
    : FALLBACK_RATING
      ? { rating: FALLBACK_RATING.rating, userRatingCount: FALLBACK_RATING.userRatingCount, googleMapsUri: null }
      : null;

  return (
    <>
      <ConceptWidget />
      <SiteHeader />
      <main id="home">
        <Hero rating={rating} />
        <QuickBar />
        <Story />
        <Awards />
        <Services />
        <Feature />
        <LittleThings />
        <Team />
        <Reviews data={reviewData} rating={rating} />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
