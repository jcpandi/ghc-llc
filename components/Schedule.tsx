"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { brand, schedule } from "@/lib/content";
import { Arrow } from "./Hero";

export default function Schedule() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".sc-title", { ...splitClasses, type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 110,
          stagger: 0.1,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sc-title", start: "top 85%" },
        });
        gsap.from(".sc-fade", { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: ".sc-title", start: "top 75%" } });

        // Timeline rail fills as you scroll through the steps
        gsap.fromTo(
          ".sc-rail-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".sc-steps", start: "top 70%", end: "bottom 55%", scrub: 0.6 } }
        );
        gsap.utils.toArray<HTMLElement>(".sc-step").forEach((step) => {
          gsap.timeline({ scrollTrigger: { trigger: step, start: "top 72%" } })
            .from(step.querySelector(".sc-dot"), { scale: 0, duration: 0.7, ease: "back.out(2.5)" })
            .from(step.querySelectorAll(".sc-step-fade"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.1);
        });

        gsap.from(".sc-card", {
          y: 80,
          opacity: 0,
          rotateX: -12,
          transformPerspective: 1200,
          transformOrigin: "50% 100%",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sc-card", start: "top 85%" },
        });
        gsap.to(".sc-glow", {
          rotate: 360,
          duration: 14,
          repeat: -1,
          ease: "none",
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section id="schedule" ref={root} className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="sc-fade mb-8 text-xs uppercase tracking-[0.25em] text-brand-2">(03) — Get Started</p>
          <h2 className="sc-title text-balance text-[clamp(2.25rem,4.6vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Schedule Your Free <span className="font-serif font-normal italic text-frost">Call</span> or Walkthrough
          </h2>
          <p className="sc-fade mt-8 max-w-lg text-lg leading-relaxed text-white/65">{schedule.body}</p>

          <ol className="sc-steps relative mt-16 space-y-12 pl-12">
            <span className="absolute bottom-2 left-[11px] top-2 w-px bg-white/10" aria-hidden>
              <span className="sc-rail-fill absolute inset-0 origin-top bg-gradient-to-b from-brand to-brand-2" />
            </span>
            {schedule.steps.map((s, i) => (
              <li key={s.title} className="sc-step relative">
                <span className="sc-dot absolute -left-12 top-0.5 grid h-6 w-6 place-items-center rounded-full border border-brand-2/60 bg-ink text-[10px] font-semibold text-brand-2">
                  {i + 1}
                </span>
                <h3 className="sc-step-fade text-2xl font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="sc-step-fade mt-2 text-white/55">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center">
          <div className="sc-card relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-ink-2 p-8 sm:p-12">
            <div className="sc-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,#2f6bff,transparent_40%,#7aa5ff,transparent_80%)] opacity-40 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Free · No obligation</p>
              <p className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                Book your free walkthrough today.
              </p>
              <p className="mt-4 text-white/60">{schedule.note}</p>

              <a
                href={brand.phoneHref}
                className="group mt-10 block border-y border-white/10 py-6"
                aria-label={`Call ${brand.phone}`}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">Call or text</span>
                <span className="mt-1 flex items-center justify-between text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[-0.03em] transition-colors group-hover:text-brand-2">
                  {brand.phone}
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-brand-2">
                    <Arrow />
                  </span>
                </span>
              </a>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={brand.bookingUrl} data-book className="btn-primary">
                  Schedule Free Walkthrough <Arrow />
                </a>
                <a href={brand.smsHref} className="btn-ghost">
                  Text Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
