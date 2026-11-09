"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { services } from "@/lib/content";

const words = [...services.items.map((s) => s.title), ...services.also];

/** Infinite ticker whose speed and direction respond to scroll velocity. */
export default function Marquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".mq-track");
        const loops = rows.map((row, i) =>
          gsap.fromTo(
            row,
            { xPercent: i % 2 ? -50 : 0 },
            { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }
          )
        );

        // Scroll faster -> ticker speeds up, then eases back to cruising speed
        const speed = { v: 1 };
        const apply = () => loops.forEach((l) => l.timeScale(speed.v));
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 300);
            gsap.killTweensOf(speed);
            speed.v = boost;
            apply();
            gsap.to(speed, { v: 1, duration: 1.2, delay: 0.1, ease: "power2.out", onUpdate: apply });
          },
        });

        gsap.from(root.current, {
          opacity: 0,
          y: 40,
          scrollTrigger: { trigger: root.current, start: "top 95%", end: "top 70%", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="Our services" className="relative overflow-hidden border-y border-white/10 bg-ink py-8 sm:py-10">
      {[0, 1].map((r) => (
        <div key={r} className={`flex w-max ${r ? "mt-3 text-white/30" : "text-white"}`} aria-hidden={r === 1}>
          <div className="mq-track flex w-max">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 || r === 1}>
                {words.map((w) => (
                  <li key={w} className="flex items-center whitespace-nowrap px-6 text-[clamp(1.75rem,4.2vw,3.75rem)] font-medium tracking-[-0.03em]">
                    {r ? <span className="font-serif italic">{w}</span> : w}
                    <svg className="ml-12 h-5 w-5 text-brand" viewBox="0 0 24 24" aria-hidden>
                      <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
                    </svg>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
