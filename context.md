# Rich Hair Salon & Academy — Project Context

> **Use this file** when starting a new chat session to restore full project context instantly.
> **Always read `progress.md` alongside this file** to know what's done and what's next.

---

## Project Identity

| Field | Value |
|-------|-------|
| **Client** | Rich Hair Salon & Academy |
| **Location** | Akola, Maharashtra, India |
| **Type** | Premium Luxury Salon + Beauty Academy |
| **Website Type** | Static single-page website (no backend) |
| **Goal** | Drive appointment bookings & academy enquiries |

---

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Structure | **HTML5** (semantic) | Lightweight, SEO-friendly |
| Styling | **Vanilla CSS** (no Tailwind, no Bootstrap) | Full design control, no framework overhead |
| Logic | **Vanilla JavaScript** | Minimal JS bundle, no React/Vue overhead |
| Fonts | **Google Fonts** — Playfair Display (headings) + Poppins (body) | Luxury editorial feel |
| Images | **AI-generated** via `generate_image` tool + optimized WebP | No watermark stock images |
| SEO | JSON-LD schemas (Local Business + FAQ) + OG tags + sitemap.xml | Lighthouse SEO 100 target |
| Animations | **CSS transitions** + **Intersection Observer API** | Performant, no GSAP dependency |

---

## File Structure (Target)

```
Rich_hair_salon/
├── index.html              # Main HTML file
├── plan.md                 # Original design plan (do not modify)
├── progress.md             # Phase-by-phase progress tracker
├── context.md              # This file — project context
├── sitemap.xml             # SEO sitemap
├── robots.txt              # SEO robots
├── css/
│   └── style.css           # All styles — design tokens + components
├── js/
│   └── main.js             # All JavaScript — animations, interactions
└── images/
    ├── hero.webp
    ├── about.webp
    ├── interior.webp
    ├── team.webp
    ├── service-haircut.webp
    ├── service-spa.webp
    ├── service-color.webp
    ├── service-keratin.webp
    ├── service-bridal.webp
    ├── gallery-1.webp  (to gallery-5.webp)
    └── academy.webp
```

---

## Brand & Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#F8F8F8` | Alternate sections |
| `--text-primary` | `#111111` | Headings, body |
| `--text-secondary` | `#555555` | Subtitles, captions |
| `--accent-gold` | `#C8A45D` | Accent, borders, hover |
| `--bg-dark` | `#111111` | Dark sections (academy, footer) |
| `--border` | `#ECECEC` | Card borders, dividers |
| `--success` | `#28A745` | Form success state |

### Typography
| Element | Font | Size |
|---------|------|------|
| Headings | Playfair Display | 60–72px (desktop) |
| Body | Poppins | 18px (desktop), 16px (mobile) |
| Line height | — | 1.6 |
| Weights used | — | 300, 400, 500, 600, 700 |

### Buttons
- Default: Black background, white text
- Hover: Gold (`#C8A45D`) background, black text
- Subtle scale animation on hover

### Cards
- Rounded corners: 12–16px
- Soft shadow
- On hover: lift, deeper shadow, gold border

---

## Page Sections (in order)

1. **Navigation** — Sticky, transparent → white on scroll, hamburger on mobile
2. **Hero** — Fullscreen image, dark overlay, ken-burns zoom, fade-up CTA
3. **Trust Bar** — ⭐ 4.7+ Rating · 220+ Reviews · Professional Stylists · Open Daily · Premium Products
4. **About** — Two-column (image left, story right)
5. **Services** — 12 luxury cards: Haircut, Hair Spa, Hair Color, Keratin, Smoothening, Rebonding, Scalp Treatment, Beard Styling, Facial, Cleanup, Bridal Makeup, Party Makeup
6. **Why Choose Us** — 6 feature cards with outlined icons
7. **Gallery** — Masonry layout, lightbox, hover zoom (5 categories: Hair Color, Keratin, Smoothening, Bridal Makeup, Hair Transformation)
8. **Academy** — Dark section, 6 features, "Enquire About Courses" CTA
9. **Reviews** — Auto-play carousel, pause on hover, 5 gold stars, quotation marks
10. **Instagram Feed** — 6-image grid, hover overlay, "Follow on Instagram" button
11. **Booking CTA** — Banner with WhatsApp + Call buttons
12. **FAQ** — Accordion (6 questions)
13. **Contact** — Two-column (contact info + embedded Google Map) + booking form
14. **Footer** — Dark bg, logo, quick links, social icons, copyright
15. **Floating Buttons** — WhatsApp, Call, Back-to-Top (smart hide/show)

---

## Key Interactions & Animations

| Element | Animation |
|---------|-----------|
| Hero background | Ken-burns slow zoom |
| Hero content | Fade-up on load |
| All sections | Fade-up/left/right on scroll (Intersection Observer) |
| Service cards | Lift + shadow + gold border on hover |
| Buttons | Scale + color transition |
| Nav links | Animated underline on hover |
| Gallery | Lightbox on click, zoom on hover |
| Reviews | Auto-play, pause on hover |
| FAQ | Smooth expand/collapse |
| Counters (trust bar) | Count-up animation on scroll-into-view |
| Floating buttons | Hide while scrolling down, show while scrolling up |

> All animations: 300–700ms duration, `prefers-reduced-motion` respected.

---

## SEO Details

| Field | Value |
|-------|-------|
| Page Title | Rich Hair Salon & Academy \| Premium Hair Salon in Akola |
| Meta Description | Experience premium hair styling, hair spa, hair color, bridal makeup, skin care and professional beauty academy services in Akola. Book your appointment today. |
| Schema | Local Business JSON-LD + FAQ JSON-LD |
| OG Tags | Yes |
| Sitemap | sitemap.xml |
| Robots | robots.txt |
| Keywords | Best Hair Salon in Akola, Hair Spa Akola, Hair Color Akola, Bridal Makeup Akola, Beauty Academy Akola, Keratin Treatment Akola, Smoothening Akola |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |
| Technique | Lazy-load images, modern formats, minimal JS, code splitting |

---

## WhatsApp Integration

- Floating WhatsApp button on every page
- Pre-filled message: `"Hello Rich Hair Salon & Academy, I would like to book an appointment."`
- Primary CTA buttons also link to WhatsApp

---

## Contact Form Fields

Name · Phone Number · Email (optional) · Service · Preferred Date · Preferred Time · Message  
Success message: *"Thank you! Our team will contact you shortly."*

---

## 6-Phase Build Plan Summary

| Phase | Scope |
|-------|-------|
| **Phase 1** | Foundation & Design System — folder structure, CSS tokens, fonts, JS shell, sitemap, robots, AI images |
| **Phase 2** | Core Structure & Hero — nav, mobile menu, hero, trust bar |
| **Phase 3** | Main Content — about, services (12 cards), why-choose-us |
| **Phase 4** | Gallery, Academy & Reviews — masonry gallery, lightbox, academy section, review carousel, Instagram feed |
| **Phase 5** | Booking, FAQ, Contact & Footer — CTA banner, accordion FAQ, contact form, map, footer, floating buttons |
| **Phase 6** | Polish, SEO & Performance — animations audit, responsive audit, lazy load, ARIA, schemas, Lighthouse |

---

## How to Continue in a New Chat

**Paste this prompt at the start of the new chat:**

> I'm continuing the Rich Hair Salon & Academy premium website project.  
> Workspace: `c:\downloads\Rich_hair_salon\`  
> Please read `context.md` and `progress.md` to understand the full project and current status, then continue from the next incomplete phase.

Then reference both files via `@[c:\downloads\Rich_hair_salon\context.md]` and `@[c:\downloads\Rich_hair_salon\progress.md]`.
