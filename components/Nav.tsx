"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { brand, nav } from "@/lib/content";

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const header = root.current!;
      const bar = header.querySelector<HTMLElement>(".nav-bar")!;

      // Scroll progress line
      gsap.to(".nav-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // Glass background once we leave the top; hide on scroll down, reveal on scroll up
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onToggle: (self) => bar.classList.toggle("is-scrolled", self.isActive),
        onUpdate: (self) => {
          if (header.dataset.menu === "open") return;
          gsap.to(header, {
            yPercent: self.direction === 1 && self.scroll() > 400 ? -110 : 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".nav-item", {
          y: -20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.9,
          delay: 1.9,
        });
      });
    },
    { scope: root }
  );

  return (
    <header
      ref={root}
      data-menu={open ? "open" : "closed"}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="nav-progress absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-2" />
      <div className="nav-bar mt-3 flex max-w-7xl items-center justify-between rounded-full border border-transparent px-5 py-3 transition-all duration-500 sm:px-6 [&.is-scrolled]:border-white/10 [&.is-scrolled]:bg-ink/60 [&.is-scrolled]:backdrop-blur-xl mx-3 sm:mx-6 xl:mx-auto">
        <a href="#top" className="nav-item flex items-center gap-2.5" aria-label={`${brand.name} home`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[13px] font-bold">H</span>
          <span className="text-[15px] font-semibold tracking-tight">{brand.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-item group relative text-sm text-white/70 transition-colors hover:text-white"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={brand.phoneHref} className="nav-item hidden text-sm text-white/70 hover:text-white lg:block">
            {brand.phone}
          </a>
          <a href={brand.bookingUrl} data-book className="nav-item btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Free Walkthrough
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="nav-item grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-white transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mx-3 mt-2 overflow-hidden rounded-3xl border border-white/10 bg-ink/90 backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6" aria-label="Mobile">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-2xl font-medium tracking-tight last:border-0"
            >
              {n.label}
            </a>
          ))}
          <a href={brand.phoneHref} className="mt-4 text-sm text-white/60">
            Call or text {brand.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
