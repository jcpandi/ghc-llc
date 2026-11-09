"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { statement } from "@/lib/content";

/** Large statement that "lights up" word by word as you scroll. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".st-text", { ...splitClasses, type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.12, filter: "blur(6px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".st-text", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          }
        );
        gsap.from(".st-label", {
          opacity: 0,
          x: -20,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
        gsap.to(".st-orb", {
          yPercent: -40,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-44">
      <div className="st-orb pointer-events-none absolute -right-40 top-20 h-[36rem] w-[36rem] rounded-full bg-brand/20 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="st-label mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50">
          <span className="h-px w-10 bg-white/40" /> Reliable · Responsive · Experienced
        </p>
        <p className="st-text text-balance text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          {statement}
        </p>
      </div>
    </section>
  );
}
