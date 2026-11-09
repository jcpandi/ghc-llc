"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { why } from "@/lib/content";

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Image unveils from the bottom like a blind, then settles from a zoom
        gsap.fromTo(
          ".why-frame",
          { clipPath: "inset(100% 0% 0% 0% round 32px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: ".why-frame", start: "top 80%" },
          }
        );
        gsap.fromTo(
          ".why-img",
          { scale: 1.35 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from(".why-badge", {
          y: 40,
          opacity: 0,
          duration: 1.2,
          delay: 0.8,
          scrollTrigger: { trigger: ".why-frame", start: "top 75%" },
        });

        const split = SplitText.create(".why-title", { ...splitClasses, type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".why-title", start: "top 85%" },
        });
        gsap.from(".why-fade", { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".why-title", start: "top 75%" } });

        gsap.utils.toArray<HTMLElement>(".why-point").forEach((li) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: li, start: "top 88%" } });
          tl.from(li.querySelector(".why-rule"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
            .from(li.querySelector(".why-num"), { yPercent: 100, opacity: 0, duration: 0.8 }, 0.3)
            .from(li.querySelector(".why-text"), { x: -30, opacity: 0, duration: 1 }, 0.35)
            .from(li.querySelector(".why-check"), { scale: 0, rotate: -90, duration: 0.8, ease: "back.out(2)" }, 0.5);
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section id="why" ref={root} className="relative px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="why-frame relative aspect-[4/5] overflow-hidden rounded-[32px]">
              <Image
                src={`${why.image}?auto=format&fit=crop&w=1400&q=75`}
                alt="Gloved hands wiping down a desk with a spray bottle"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="why-img object-cover brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
            <div className="why-badge relative -mt-16 ml-6 w-fit rounded-2xl border border-white/10 bg-ink/70 px-6 py-5 backdrop-blur-xl sm:ml-10">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-2">Peace of mind</p>
              <p className="mt-1 text-lg font-medium">Fully insured &amp; bonded crews</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <p className="why-fade mb-8 text-xs uppercase tracking-[0.25em] text-brand-2">(02) — Why Us</p>
          <h2 className="why-title text-balance text-[clamp(2.25rem,4.6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Why Property Managers <span className="font-serif font-normal italic text-frost">Trust</span> Hero Cleaning Group
          </h2>
          <p className="why-fade mt-8 max-w-xl text-lg leading-relaxed text-white/65">{why.body}</p>

          <ul className="mt-16">
            {why.points.map((p, i) => (
              <li key={p} className="why-point relative py-8">
                <span className="why-rule absolute inset-x-0 top-0 h-px origin-left bg-white/15" />
                <div className="flex items-start gap-6 sm:gap-10">
                  <span className="overflow-hidden">
                    <span className="why-num block font-serif text-2xl italic text-white/40">0{i + 1}</span>
                  </span>
                  <p className="why-text flex-1 text-xl font-medium tracking-[-0.02em] sm:text-2xl">{p}</p>
                  <span className="why-check grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
