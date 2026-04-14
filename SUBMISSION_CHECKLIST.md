# Submission Checklist

Use this before sharing your interview project.

## 1) Deployment

- [ ] Deploy latest build to Vercel / Netlify / GitHub Pages
- [ ] Confirm production URL opens without local dependencies
- [ ] Verify all route links work on deployed URL (no 404 fallbacks)

## 2) Core Journey Validation

- [ ] Landing `Overview` loads with hero media and visible CTAs
- [ ] Non-linear nav works across:
  - [ ] `Retail`
  - [ ] `Luxury`
  - [ ] `Dining`
  - [ ] `Entertainment`
  - [ ] `Events`
  - [ ] `Sponsorship`
  - [ ] `Leasing`
  - [ ] `Venues`
  - [ ] `Demographics`
- [ ] CTA flows route correctly:
  - [ ] `/inquire/leasing`
  - [ ] `/inquire/sponsorship`
  - [ ] `/inquire/venue-booking`

## 3) Visual Quality

- [ ] Dark mode readability pass complete
- [ ] Light mode readability pass complete (hero buttons, cards, tags, links)
- [ ] No broken video sections (hero fallbacks/slider visible where needed)
- [ ] No layout overlap in desktop nav or account popup

## 4) Performance Evidence

- [ ] Run Lighthouse on deployed URL (desktop baseline)
- [ ] Capture screenshots for:
  - [ ] Performance
  - [ ] Accessibility
  - [ ] Best Practices
  - [ ] SEO
- [ ] Note any known trade-off (e.g. heavy 3D vendor chunk) with mitigation plan

## 5) Repo Readiness

- [ ] `README.md` includes:
  - [ ] product positioning
  - [ ] module architecture
  - [ ] rubric mapping
  - [ ] AI usage notes
  - [ ] run/build steps
- [ ] `INTERVIEW_DEMO_SCRIPT.md` present and reviewed
- [ ] This checklist reviewed and fully completed

## 6) Assets To Include In Submission

- [ ] Live URL
- [ ] GitHub repository URL
- [ ] 3-5 key screenshots:
  - [ ] opening hero
  - [ ] one story module page
  - [ ] one conversion/inquiry page
  - [ ] one expandable module page
  - [ ] Lighthouse proof
- [ ] Short note on architecture decisions and trade-offs

## 7) Final Dry Run (5-7 min)

- [ ] Run through `INTERVIEW_DEMO_SCRIPT.md` once end-to-end
- [ ] Ensure pace: opening impact -> story -> conversion -> technical summary
- [ ] Keep close focused on business outcomes (lease, sponsor, book venue)
