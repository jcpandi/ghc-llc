"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { brand, contact } from "@/lib/content";
import { Arrow } from "./Hero";

const rows = [
  { label: "Service Area", value: brand.serviceArea, href: undefined },
  { label: "Phone", value: brand.phone, href: brand.phoneHref },
  { label: "Email", value: brand.email, href: `mailto:${brand.email}` },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".ct-title", { ...splitClasses, type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 110,
          stagger: 0.035,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".ct-title", start: "top 85%" },
        });
        gsap.from(".ct-fade", { y: 24, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".ct-title", start: "top 80%" } });

        gsap.utils.toArray<HTMLElement>(".ct-row").forEach((row, i) => {
          gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%" }, delay: i * 0.05 })
            .from(row.querySelector(".ct-rule"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
            .from(row.querySelectorAll(".ct-in"), { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.25);
        });

        gsap.from(".ct-city", {
          y: 20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.8,
          scrollTrigger: { trigger: ".ct-cities", start: "top 90%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="contact" ref={root} className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="ct-fade mb-8 text-xs uppercase tracking-[0.25em] text-brand-2">(04) — Contact</p>
            <h2 className="ct-title text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              Contact Us
            </h2>
            <p className="ct-fade mt-8 max-w-md text-lg leading-relaxed text-white/65">{contact.body}</p>
          </div>

          <div className="lg:col-span-7 lg:pt-24">
            {rows.map((r) => {
              const inner = (
                <>
                  <span className="ct-rule absolute inset-x-0 top-0 h-px origin-left bg-white/15" />
                  <span className="overflow-hidden">
                    <span className="ct-in block text-xs uppercase tracking-[0.2em] text-white/40">{r.label}</span>
                  </span>
                  <span className="flex items-center justify-between gap-4 overflow-hidden">
                    <span className="ct-in block break-all text-[clamp(1.25rem,2.6vw,2.25rem)] font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand-2 sm:break-normal">
                      {r.value}
                    </span>
                    {r.href && (
                      <span className="ct-in shrink-0 text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand-2">
                        <Arrow />
                      </span>
                    )}
                  </span>
                </>
              );
              return r.href ? (
                <a key={r.label} href={r.href} className="ct-row group relative grid gap-3 py-8">
                  {inner}
                </a>
              ) : (
                <div key={r.label} className="ct-row group relative grid gap-3 py-8">
                  {inner}
                </div>
              );
            })}

            <ul className="ct-cities mt-6 flex flex-wrap gap-2" aria-label="Cities we serve">
              {contact.cities.map((c) => (
                <li key={c} className="ct-city rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
