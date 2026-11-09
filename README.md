# Hero Cleaning Group — Next.js + Tailwind + GSAP

A one-page marketing site for Hero Cleaning Group LLC. The copy comes from herocleaninggroup.com. It has a cinematic hero, and every section animates on scroll.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP 3 (ScrollTrigger and SplitText), `@gsap/react`, and Lenis for smooth scrolling.

## Structure

```
app/
  layout.tsx       fonts (Inter Tight + Instrument Serif), metadata, smooth scroll
  page.tsx         section order
  globals.css      theme tokens (@theme), buttons, film grain, SplitText mask fix
components/
  Nav.tsx          glass pill nav that hides on scroll down and shows on scroll up, scroll progress bar, mobile menu
  Hero.tsx         curtain lift, then a glowing "squeegee" wipe from hazy to crisp; on scroll the frame shrinks into a rounded card
  Marquee.tsx      two-row services ticker that speeds up with scroll velocity
  Statement.tsx    words fade from blurred to sharp as you scroll
  Services.tsx     desktop: pinned horizontal scroll with image parallax and clip reveals; mobile: stacked reveals
  WhyUs.tsx        blind-style image reveal, lines that draw in, checkmarks that pop
  Schedule.tsx     scroll-filled timeline rail and a 3D-tilt booking card
  Contact.tsx      character-split title and rows that draw in
  FinalCta.tsx     pinned section where the framed image opens to full screen
  Footer.tsx       giant "HERO" wordmark that rises with scroll
  BookingModal.tsx popup with the booking calendar, opened by any [data-book] link
  ChatWidget.tsx   LeadConnector chat widget (same as herocleaninggroup.com)
  SmoothScroll.tsx Lenis driven by GSAP's ticker
lib/
  content.ts       all copy, contact details and image URLs, so edit text here
  gsap.ts          plugin registration and shared helpers
```

## Notes

- **Reduced motion:** every animation sits inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Visitors who turn motion off see the content statically, with no smooth scrolling.
- **Images:** placeholders from Unsplash (free license) are loaded through `next/image` (`images.unsplash.com` is allowed in `next.config.ts`). Swap in your own photos by changing the URLs in `lib/content.ts`, or put files in `/public` and use `/your-file.jpg`.
- **Booking:** every "Schedule Free Walkthrough" button opens `components/BookingModal.tsx`, a popup that embeds the booking calendar at `link.herocleaninggroup.com`. To make any other link or button open it, add `data-book` (and point its `href` at `brand.bookingUrl` so it still works without JavaScript). The calendar URL is set in `lib/content.ts`.
