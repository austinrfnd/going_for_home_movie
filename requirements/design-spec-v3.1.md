# Going for Home — Design Specification v3.1

This document captures the design intent, micro-interactions, and nuanced details that may not be immediately apparent from reading the code. Use this as a reference when building the production site.

---

## Design Philosophy

**Theme:** Cinematic Dark with Premium Polish  
**Mood:** Prestige documentary, HBO/A24 aesthetic, emotionally weighty but hopeful  
**Inspiration:** Film festival sites, Criterion Collection, Ken Burns documentaries

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-dark` | `#080808` | Primary background, near-black |
| `--bg-card` | `#111111` | Card backgrounds, elevated surfaces |
| `--bg-elevated` | `#1a1a1a` | Hover states, secondary surfaces |
| `--text-primary` | `#FAFAFA` | Headlines, primary text |
| `--text-secondary` | `#A0A0A0` | Body text, descriptions |
| `--text-muted` | `#5A5A5A` | Labels, captions, tertiary text |
| `--accent-gold` | `#C9A962` | Primary accent — buttons, highlights, links |
| `--accent-gold-light` | `#E8D5A3` | Title accent (second line of "Home") |
| `--border` | `#222222` | Subtle dividers, card borders |

**Key insight:** The gold accent (`#C9A962`) is used sparingly for maximum impact — section labels, hover states, and the play button. It evokes film festival laurels and prestige cinema.

---

## Typography

### Font Stack
- **Display:** Bebas Neue (headlines, navigation logo, dates)
- **Serif:** Cormorant Garamond (body text, quotes, labels, taglines)
- **Sans-serif:** Work Sans (UI elements, credits, buttons)

### Hierarchy Details
- Hero title: `clamp(4rem, 12vw, 9rem)` — responsive scaling
- Hero title splits into two lines: "Going for" (white) / "Home" (gold-light)
- Section labels use italic Cormorant with `0.15em` letter-spacing
- Body text in synopsis uses a decorative drop cap (first letter is 4rem, gold, floated left)
- Credits grid uses italic Cormorant for role labels, regular Work Sans for names

---

## Animations & Micro-interactions

### Page Load Sequence (Hero)
Elements animate in with staggered delays using `fadeUp` keyframes:
1. **0.3s** — Eyebrow ("A Documentary Film")
2. **0.5s** — Title
3. **0.7s** — Hero media (image/video container)
4. **0.9s** — Tagline (moved below media)
5. **1.0s** — Scroll indicator

### Scroll-triggered Reveals
- Elements with `.reveal` class fade up (30px → 0) with 0.8s duration
- Uses `IntersectionObserver` with `threshold: 0.1` and `-50px` bottom margin
- Stagger delays available: `.reveal-delay-1` (0.1s), `.reveal-delay-2` (0.2s), `.reveal-delay-3` (0.3s)

### Parallax Effects
1. **Hero background:** Moves at 40% of scroll speed (`scrollY * 0.4`)
2. **Parallax image section:** Background moves at 20% relative to section position
3. Both use `will-change: transform` for GPU acceleration
4. Hero background has `inset: -20%` to prevent edge visibility during parallax

### Button Hover States
- **Gold outline buttons** (hero play, nav links): Background fills from left using `scaleX(0)` → `scaleX(1)` transform
- **White outline buttons** (screening tickets): Same fill animation, text inverts to dark
- **Solid gold buttons** (CTAs): Lift up 2px with subtle gradient overlay fade-in

### Navigation
- Fixed position with blur backdrop (`blur(20px)`)
- Background opacity increases on scroll (0.85 → 0.95)
- Border becomes more visible on scroll
- Link underlines animate width from 0 → 100% on hover
- Active link maintains underline

### Card Hover Effects
- Award cards: Gold line appears at top (width animates 40px → 60px)
- Award laurels: Scale up 1.1x and increase opacity
- Team photos: Scale 1.02x, border color transitions to gold
- Credit items: Background lightens to `--bg-elevated`
- Contact cards: Background lightens on hover

### Mobile Menu
- Full-screen overlay with staggered link animations
- Close button rotates 90° on hover
- Links fade in with 0.05s stagger between each

---

## Hero Media Behavior

### Click-to-Play Trailer
1. Initial state: Hero image with play button overlay
2. On click: 
   - Container gets `.playing` class
   - Image and overlay fade out (`opacity: 0`)
   - Vimeo iframe fades in and autoplays
   - iframe `src` is updated to include `&autoplay=1`
3. On page navigation away: Video resets to poster state

### Play Button Design
- 80px circular button with gold border
- Dark semi-transparent background
- Triangle play icon using CSS borders
- On hover: Button scales 1.1x, fills with gold, icon inverts to dark

---

## Parallax Image Section

- Height: 50vh (min 400px)
- Background image: Same as hero (`hero_image.png`)
- Overlay: Gradient that fades to solid `--bg-dark` at top and bottom edges
- Content: Pull quote from synopsis in large italic Cormorant
- Creates visual break between story section and quote section

---

## Section-Specific Details

### Film Stats Bar
- Centered flex layout with 48px gaps
- Values in Bebas Neue, labels in tiny uppercase Work Sans
- Bordered top and bottom with `--border`
- Stats: Release (2026), Runtime (82 Min), Language (English), Country (USA)

### Synopsis ("The Story")
- Section label has decorative line extending to the right (gradient fade)
- Three paragraphs of body text
- First paragraph has decorative drop cap
- Full container width (no max-width constraint)

### Quote Section
- Dark card background (`--bg-card`)
- Giant decorative quotation mark behind text (20rem, `--border` color)
- Quote in 2rem italic Cormorant
- Citation in small uppercase gold text

### Screenings Page
- Date in gold Bebas Neue
- Venue name in medium weight, location in italic Cormorant
- Ticket buttons with fill animation
- "Host a Screening" CTA has gold gradient line at top

### Team Page
- 200px square photo placeholders (will need actual photos)
- Name in Bebas Neue, role in italic gold Cormorant
- Bio text in lighter weight for readability
- Full credits grid: 2 columns, 1px gap creates grid lines effect

### Contact Page
- 3-column grid for email cards
- All emails currently point to `simonsoneric@mac.com`
- Social links as square buttons with fill-up animation on hover

---

## Responsive Breakpoints

### 900px
- Container padding reduces
- Film stats wrap
- Credits grid goes single column

### 768px
- Navigation collapses to hamburger menu
- Hero title reduces to 3.5rem
- Synopsis stays single column (already is)
- Screening items stack vertically
- Team photos max-width 180px
- Contact grid goes single column
- Quote text reduces to 1.5rem

---

## Assets Required for Production

1. **Hero image** — Currently `hero_image.png` (Little League team photo)
2. **Team headshots** — 4 photos needed (Eric Simonson, Sue Cremin, Gordon Gano, Mark Herzog)
3. **Vimeo video** — Trailer embedded from `vimeo.com/1101026967`
4. **Fonts** — Google Fonts: Bebas Neue, Cormorant Garamond, Work Sans

---

## Accessibility Considerations

- All interactive elements have visible focus states (inherits from hover)
- Mobile menu has aria-labels on toggle buttons
- Video iframe has descriptive title attribute
- Color contrast: Gold on dark passes WCAG AA for large text
- Consider adding `prefers-reduced-motion` media query to disable parallax/animations

---

## Performance Notes

- Parallax uses `passive: true` scroll listener
- `will-change: transform` on animated backgrounds
- Vimeo iframe loads immediately but doesn't autoplay until clicked
- Consider lazy-loading team photos in production
- Noise texture is inline SVG data URI (no extra request)

---

## Future Enhancements to Consider

- Add actual film festival laurel graphics for awards section
- Press section could link to actual articles when available
- Screenings page needs real dates/venues when confirmed
- Consider adding a mailing list signup
- Social links need real URLs (currently `#`)
