# Documentary Promotional Website - Requirements

Reference Site: wewerethesceneryfilm.com

---

## 1. SITE OVERVIEW

### Purpose
Promotional website for a documentary film to:
- Showcase the film and its accolades
- Provide screening information
- Share team credits
- Enable contact for press, screenings, and inquiries

### Target Audience
- Film festival programmers
- Press/journalists
- General audience/film enthusiasts
- Potential distributors
- Educational institutions

---

## 2. PAGES & CONTENT REQUIREMENTS

### 2.1 Home/About Page

**Required Sections:**

| Section | Content Required |
|---------|------------------|
| Hero | Film poster/key art image (clickable to trailer) |
| Platforms | Links to streaming platforms where film is available |
| Synopsis | 2-3 paragraph description of the documentary |
| Awards | Major awards highlighted, followed by festival selections |
| Press Quotes | 2-4 critical acclaim pull quotes with attribution |
| Press Coverage | List of publications that covered the film |

### 2.2 Screenings Page

**Required Sections:**

| Section | Content Required |
|---------|------------------|
| Upcoming | Date, venue, location, ticket/info links |
| Past | Chronological list of previous screenings |
| Host Request | CTA for organizations wanting to host screenings |

### 2.3 Team Page

**Required Sections:**

| Section | Content Required |
|---------|------------------|
| Key Creatives | Photo, name, role, bio for director/producer |
| Full Credits | Complete crew credits list |

### 2.4 Contact Page

**Required Sections:**

| Section | Content Required |
|---------|------------------|
| Email Contacts | Categorized emails (press, screenings, general) |
| Contact Form | Optional form with subject categorization |
| Social Links | Links to social media profiles |

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Navigation
- [ ] Fixed/sticky navigation bar
- [ ] Logo links to home page
- [ ] Four main navigation items
- [ ] Mobile hamburger menu
- [ ] Active page indicator

### 3.2 Hero Section
- [ ] Full-width image display
- [ ] Clickable - opens trailer (Vimeo embed or link)
- [ ] Responsive image sizing

### 3.3 External Links
- [ ] Streaming platform links (open in new tab)
- [ ] Social media links (open in new tab)
- [ ] Press article links (open in new tab)
- [ ] Email links (mailto:)

### 3.4 Contact Form (if implemented)
- [ ] Name field (required)
- [ ] Email field (required, validated)
- [ ] Subject/category selection
- [ ] Message textarea (required)
- [ ] Submit button
- [ ] Success/error messaging
- [ ] Spam protection (honeypot or captcha)

### 3.5 Responsive Design
- [ ] Desktop layout (1200px+)
- [ ] Tablet layout (768px - 1199px)
- [ ] Mobile layout (<768px)
- [ ] Mobile navigation menu

---

## 4. TECHNICAL REQUIREMENTS

### 4.1 Performance
- [ ] Page load time < 3 seconds
- [ ] Optimized images (WebP with fallbacks)
- [ ] Lazy loading for below-fold images
- [ ] Minimal JavaScript

### 4.2 SEO
- [ ] Semantic HTML structure
- [ ] Meta titles and descriptions per page
- [ ] Open Graph tags for social sharing
- [ ] Structured data for film (Schema.org)
- [ ] XML sitemap
- [ ] robots.txt

### 4.3 Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Sufficient color contrast
- [ ] Skip-to-content link
- [ ] ARIA labels where needed

### 4.4 Browser Support
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 5. DESIGN REQUIREMENTS

### 5.1 Visual Style
- Minimalist, clean aesthetic
- Text-forward design
- Generous whitespace
- Professional, institutional feel
- Single-column content layout

### 5.2 Color Palette
```
Primary Accent:  #[TBD - brand color from film]
Background:      #FFFFFF (white)
Text Primary:    #000000 (black)
Text Secondary:  #666666 (gray)
Dividers:        #CCCCCC (light gray)
```

### 5.3 Typography
```
Headings:     Sans-serif (e.g., Helvetica, Inter, or custom)
Body:         Sans-serif, regular weight
Awards/Bold:  Sans-serif, bold weight
Size Scale:   16px base, 1.5 line height
```

### 5.4 Spacing
```
Section padding:  80px vertical (desktop), 40px (mobile)
Content max-width: 800px - 1000px
Container padding: 20px horizontal
```

---

## 6. CONTENT INVENTORY

### Required Assets (Client to Provide)

| Asset | Format | Notes |
|-------|--------|-------|
| Film poster/key art | JPG/PNG, min 1920px wide | Hero image |
| Film logo | SVG preferred | Navigation |
| Director headshot | JPG/PNG, min 400px | Team page |
| Producer headshot | JPG/PNG, min 400px | Team page |
| Synopsis text | Text/doc | 200-400 words |
| Awards list | Text/doc | With dates |
| Festival selections | Text/doc | Full list |
| Press quotes | Text/doc | With attributions |
| Press links | URL list | Publications |
| Screening schedule | Text/doc | Current + past |
| Team bios | Text/doc | Key creatives |
| Full credits | Text/doc | All crew |
| Social media URLs | URL list | Active accounts |
| Contact emails | Email list | By category |
| Trailer URL | Vimeo/YouTube | For hero link |

---

## 7. HOSTING & DEPLOYMENT

### Options
1. **Static Site** (Recommended)
   - Netlify, Vercel, or GitHub Pages
   - Fast, secure, low cost

2. **CMS-Based**
   - Squarespace (like reference)
   - WordPress
   - Good for client self-management

### Domain
- Client to provide domain
- SSL certificate required (HTTPS)

---

## 8. FUTURE CONSIDERATIONS

### Potential Additions
- Film clips/video gallery
- Photo gallery
- Press kit download
- Newsletter signup
- Educational resources
- Behind-the-scenes content
- Merchandise store integration

---

## 9. TIMELINE PHASES

### Phase 1: Setup
- Project scaffolding
- Design system setup
- Navigation component
- Footer component

### Phase 2: Core Pages
- Home/About page
- Screenings page
- Team page
- Contact page

### Phase 3: Polish
- Responsive testing
- Performance optimization
- SEO implementation
- Accessibility audit

### Phase 4: Launch
- Content population
- Final QA
- Deployment
- Analytics setup
