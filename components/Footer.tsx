"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { brand, contact, footer } from "@/lib/content";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".ft-col", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        });
        gsap.from(".ft-letter", {
          yPercent: 100,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: ".ft-word", start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        });
      });
    },
    { scope: root }
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/10 bg-ink px-5 pt-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="ft-col lg:col-span-6">
          <p className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[13px] font-bold">H</span>
            {brand.name}
          </p>
          <p className="mt-5 max-w-xs text-white/55">{footer.blurb}</p>
          <a href={brand.phoneHref} className="mt-6 inline-block text-white/80 hover:text-brand-2">
            {brand.phone}
          </a>
        </div>
        <FooterCol title="Services" items={footer.services.map((s) => ({ label: s, href: "#services" }))} />
        <FooterCol title="Company" items={footer.company} />
        <FooterCol title="Service Area" items={contact.cities.map((c) => ({ label: c }))} />
      </div>

      <div className="ft-word mx-auto mt-20 flex max-w-7xl select-none justify-between overflow-hidden" aria-hidden>
        {"HERO".split("").map((l, i) => (
          <span
            key={i}
            className="ft-letter block bg-gradient-to-b from-white/90 to-white/5 bg-clip-text text-[clamp(7rem,30vw,26rem)] font-bold leading-[0.8] tracking-[-0.06em] text-transparent"
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 py-8 text-xs text-white/40 sm:flex-row">
        <p>© {year} {brand.legal}. All rights reserved.</p>
        <p>Commercial cleaning · Dallas-Fort Worth</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href?: string }[] }) {
  return (
    <div className="ft-col lg:col-span-2">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            {it.href ? (
              <a href={it.href} className="text-white/75 transition-colors hover:text-white">
                {it.label}
              </a>
            ) : (
              <span className="text-white/75">{it.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
