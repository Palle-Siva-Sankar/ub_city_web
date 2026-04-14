
# UB City Interactive Commercial Sales Deck

This project is a browser-based, non-linear sales deck for commercial decision-makers:
- prospective retail tenants
- sponsorship and brand partners
- event promoters and venue operators

The experience is built to work both as:
- a live, screen-shared sales narrative
- a self-guided standalone destination link

## Core Business Objectives

- Drive retail leasing intent (flagship, inline, pop-up, F&B)
- Drive sponsorship inquiries with premium activation framing
- Drive venue and event booking requests

## Subject Choice Justification

This implementation uses **UB City Bengaluru** as the narrative subject while intentionally building a framework that generalizes to mega-mall sales operations.

### Why UB City was selected

- It provides a realistic mixed-use commercial environment (retail, dining, events, premium positioning).
- Publicly available media and brand-context assets made rapid prototyping and iteration practical.
- It allowed focus on the core product problem: replacing fragmented sales collateral with a single interactive commercial tool.

### How this framework generalizes to world-scale malls

- **UX/Sales First Design**: The UI is built specifically to address the questions a prospective tenant or sponsor asks, organized into linear "pitch" modules (Retail, Leasing, Events).
- **Responsive Layout & Smoothness**: Mobile users receive modified viewport sizes (`-webkit-fill-available`) and hardware-accelerated transitions (`translateZ(0)`) to maintain the cinematic feel (including correctly scaled video-backgrounds) without layout shifts or dropping frames.
- **Robust Media Delivery**: Video assets are served directly from reliable CDN nodes (e.g., Pexels) inside custom GPU-accelerated video containers that respect network speeds and graceful degradation. Overlapping videos in consecutive slides were removed to minimize browser composite load.
- **Module-first architecture**: storytelling and conversion modules are isolated by route (`Retail`, `Luxury`, `Events`, `Sponsorship`, `Leasing`, `Venues`) and can be re-skinned per property.
- **Data/content swap model**: core page shells and CTA funnels remain stable while media, stats, and tenant/event datasets can be replaced per mall.
- **Action-path consistency**: inquiry endpoints (`leasing`, `sponsorship`, `venue-booking`) are reusable across any large destination sales workflow.
- **Scalable navigation model**: non-linear exploration is already structured for large inventory and sub-module expansion.

In short, this submission demonstrates the **product system** required by mega-malls, even though the current content layer is UB City-branded.

## Information Architecture (Commercial-First)

- `Overview` (cinematic opening + immediate conversion CTAs)
- `Retail`, `Luxury`, `Dining`, `Entertainment`, `Events`
- `Sponsorship`, `Leasing`, `Venues`, `Demographics`
- Action intake flow: `Inquire` at `/inquire/:action`
  - `/inquire/leasing`
  - `/inquire/sponsorship`
  - `/inquire/venue-booking`

Consumer-style ecommerce modules remain in the codebase but are intentionally de-emphasized from the primary commercial journey.

## Tech Stack

- React + TypeScript
- React Router (v7 structured)
- Tailwind CSS v4 + custom design tokens/theme layer
- Motion (`motion/react`) for core state transitions
- `@studio-freight/lenis` for liquid-smooth inertial scrolling
- **Native Motion Engine**: CSS Scroll-Driven Animations (`animation-timeline: view()`) for GPU-offloaded scroll reveals.

## Project Structure

```
mall-website/
├── public/
│   └── videos/              # Local hero video assets (mp4)
├── scripts/
│   ├── dev-with-api.mjs     # Dev server launcher (Vite + OTP API)
│   └── lighthouse-check.mjs # Automated Lighthouse audit runner
├── server/
│   └── otp-server.mjs       # Mock OTP authentication API
├── src/
│   ├── assets/images/        # Static images (PNG) bundled by Vite
│   ├── styles/
│   │   ├── theme.css         # Master design system (tokens, glass, video, responsive)
│   │   ├── fonts.css         # Google Fonts imports
│   │   ├── tailwind.css      # Tailwind base config
│   │   └── index.css         # CSS entry point
│   ├── app/
│   │   ├── App.tsx           # Root app shell (Lenis + Theme + Router)
│   │   ├── routes.tsx        # All route definitions
│   │   ├── components/       # Shared UI components
│   │   │   ├── Layout.tsx      # Navbar, mega-menu, mobile drawer, footer
│   │   │   ├── Footer.tsx      # Site-wide footer
│   │   │   ├── HeroVideoEmbed.tsx # Reusable cinematic hero video+slideshow
│   │   │   ├── SplineBackground.tsx # 3D ambient backdrop
│   │   │   ├── SplineCardAccent.tsx # 3D card shimmer effect
│   │   │   ├── SalesDock.tsx   # Floating B2B conversion dock
│   │   │   ├── SearchOverlay.tsx # Full-screen search modal
│   │   │   ├── WhyUBCity.tsx   # "Why This Property" data section
│   │   │   ├── CookieBanner.tsx # GDPR consent banner
│   │   │   └── NewsletterSignup.tsx # Email capture widget
│   │   ├── pages/            # Route-level page components
│   │   │   ├── Overview.tsx    # Landing page (cinematic hero + modules)
│   │   │   ├── Retail.tsx      # Retail tenant pitch
│   │   │   ├── Luxury.tsx      # Luxury wing showcase
│   │   │   ├── Dining.tsx      # F&B overview
│   │   │   ├── DinePage.tsx    # Interactive restaurant directory
│   │   │   ├── DiningDetail.tsx # Individual restaurant detail
│   │   │   ├── Shopping.tsx    # Brand grid + category filters
│   │   │   ├── ShoppingCategory.tsx # Category-specific product view
│   │   │   ├── BrandStore.tsx  # Individual brand storefront
│   │   │   ├── BrandDetail.tsx # Product detail + reviews + cart
│   │   │   ├── Entertainment.tsx # Attractions overview
│   │   │   ├── EntertainmentDetail.tsx
│   │   │   ├── Events.tsx      # Upcoming events calendar
│   │   │   ├── Cinema.tsx      # Live showtimes + booking
│   │   │   ├── CinemaMovieDetail.tsx
│   │   │   ├── Gallery.tsx     # Photo gallery
│   │   │   ├── Sponsorship.tsx # Brand partnership pitch
│   │   │   ├── Leasing.tsx     # Tenant leasing pitch
│   │   │   ├── Venues.tsx      # Event venue booking
│   │   │   ├── Demographics.tsx # Audience data for sponsors
│   │   │   ├── Inquire.tsx     # Unified inquiry form
│   │   │   ├── OpportunityDetail.tsx
│   │   │   ├── StrategyDeck.tsx
│   │   │   ├── About.tsx, Wellness.tsx, Marriott.tsx
│   │   │   ├── Login.tsx       # Auth (phone/email + OTP)
│   │   │   ├── Profile.tsx     # User dashboard
│   │   │   ├── Cart.tsx, Checkout.tsx, Wishlist.tsx
│   │   │   ├── ReachUs.tsx     # Location + directions
│   │   │   └── Terms.tsx       # Legal
│   │   ├── data/             # Mock data & asset constants
│   │   │   ├── mallData.ts     # Brands, categories, products
│   │   │   ├── storeCatalog.ts # Extended product catalog (100+ items)
│   │   │   ├── diningData.ts   # Restaurant listings
│   │   │   ├── cinemaData.ts   # Movie showtimes
│   │   │   ├── entertainmentData.ts # Attractions data
│   │   │   └── mediaAssets.ts  # Centralized CDN video URLs
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useFeatures.ts  # Cart, wishlist, reviews, orders, session
│   │   │   └── useUserLocation.ts # Geolocation hook
│   │   ├── context/          # React context providers
│   │   │   └── ThemeContext.tsx # Dark/light mode state
│   │   └── utils/            # Utility functions
│   │       └── currency.ts   # INR formatting
│   └── main.tsx              # App entry point
├── guidelines/               # Project guidelines doc
├── activity-monitor/         # Real-time visitor tracking module
├── README.md                 # This file
├── ATTRIBUTIONS.md           # Media credits
├── INTERVIEW_DEMO_SCRIPT.md  # 5-min demo walkthrough
├── SUBMISSION_CHECKLIST.md   # Pre-submission QA list
├── package.json
├── vite.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## Design Decisions

- **Dark-Luxe Aesthetic**: Chosen to align with Apple and Hermès positioning, using deep shadows, translucent glassmorphism panes (`glass-pane`), and `Outfit`/`Inter` typography pairings.
- **Cinematic Pacing**: Implement autoplaying background videos and scroll-triggered reveals to ensure the tool acts as an immersive narrative rather than a static spreadsheet.
- **Native Motion architecture**: High-performance transition to CSS Scroll-Driven Animations. This offloads visual reveals from the Javascript thread to the GPU compositor thread, matching the scroll performance of industry leaders like Apple.com.
- **Non-Linear Navigation**: Implemented via a persistent floating `<SalesDock>` and Mega Menu, allowing executives to pivot the pitch based on the prospect's interests.
- **Performance Hardening (Apple Standard)**: 
  - **Section Virtualization**: Implementing `content-visibility: auto` to bypass layout/paint work for off-screen elements.
  - **GPU Layer Promotion**: Universal use of `translateZ(0)` to force hardware acceleration for all UI sections.
  - **Blur Optimization**: Dynamic scaling of backdrop filters to maintain 60FPS on high-DPI and mobile displays.

## Setup Instructions

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## AI Tools Used -- Antigravity and Cursor

AI-assisted workflow tools include:
- **Ideation & Architecture**: Claude / Gemini used for layout/system ideation and sales-deck interaction patterns.
- **Asset Generation**: Generative AI tools (Midjourney/DALL-E implicitly) and Unsplash/Coverr for filling asset gaps where official high-res media is limited.
- **Content Crafting**: LLMs used for narrative copy iteration and generating robust mock data for tenants and events.

## Rubric Mapping

- **Visual & UX Design (30%)**: luxury-styled UI, cinematic hero sections, non-linear nav, module consistency
- **Technical Execution (25%)**: modular route architecture, reusable components, build/lint validation, responsive layouts
- **AI Integration (15%)**: AI-assisted content/asset strategy and interaction ideation
- **Storytelling & Strategy (15%)**: structured commercial narrative from impact to business action
- **Expandability (10%)**: dedicated modules for events/sponsorship/leasing/venues with scalable route structure
- **Attention to Detail (5%)**: CTA consistency, loading and fallback behavior, documentation quality

### Evaluator Quick Map

| Rubric Area | Where To Review In Product |
| --- | --- |
| Visual & UX Design | `Overview` hero, premium nav, module cards, cinematic section pacing |
| Technical Execution | Route modules in `src/app/routes.tsx`, shared media/components, hooks |
| AI Integration | AI-assisted visual and interaction direction documented in this README |
| Storytelling & Strategy | `Overview` -> `Retail/Luxury/Dining/Entertainment/Events` -> inquiry paths |
| Expandability | Dedicated modules: `Sponsorship`, `Leasing`, `Venues`, `Inquire` |
| Attention to Detail | Theme contrast fixes, route cleanup, CTA consistency, fallback media handling |

## Live Demo Flow (5-7 minutes)

1. **Opening (45 sec)**  
   Show `Overview` hero and explain the objective: replace fragmented PDF/video/spreadsheet sales process with one browser-native sales tool.

2. **Commercial Narrative (2 min)**  
   Navigate non-linearly through `Retail`, `Luxury`, `Dining`, `Entertainment`, `Events` and highlight cinematic storytelling + business relevance.

3. **Business Conversion (1.5 min)**  
   Trigger key CTA paths:
   - leasing (`/inquire/leasing`)
   - sponsorship (`/inquire/sponsorship`)
   - venue booking (`/inquire/venue-booking`)

4. **Phase 2 Expandability (1 min)**  
   Open `Sponsorship`, `Leasing`, `Venues` and explain modular architecture for future sub-modules.

5. **Technical + Performance (1 min)**  
   Summarize:
   - modular routes/components
   - fallback media strategy
   - animation/perf hardening choices
   - build and lint verification

## Interview Pitch (Short)

This project is designed as a sales operating system, not a static deck.  
It combines cinematic storytelling, non-linear exploration, and direct commercial conversion pathways so a single shared link can move a prospect from interest to action.

## Performance Tracking

Lighthouse performance check (mobile + desktop):

```bash
# keep dev server running in another terminal
npm run dev

# run checks and generate reports
npm run lh:check
```

Reports are generated in `lighthouse-reports/` as both HTML and JSON files.

## Deployment Checklist

- Deploy on Vercel, Netlify, or GitHub Pages
- Confirm all primary CTAs route to inquiry actions
- Validate desktop and tablet layout behavior
- Run Lighthouse and optimize until score target is met
- Add deployed URL and screenshots to final submission notes

## Verification Checklist

- [ ] Navigation is commercial-first and non-linear
- [ ] All core modules include direct conversion paths
- [ ] Inquiry actions work for leasing/sponsorship/venue booking
- [ ] Build and lint pass cleanly
- [ ] Performance and motion remain smooth on desktop/tablet
  