"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { brand, services } from "@/lib/content";
import { Arrow } from "./Hero";

/**
 * Desktop: section pins and the cards travel horizontally, with parallax
 * inside each image. Mobile: a vertical stack with staggered reveals.
 */
export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".sv-title", { ...splitClasses, type: "lines,words", mask: "lines" });
        gsap.from(split.words, {
          yPercent: 110,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sv-title", start: "top 85%" },
        });
        gsap.from(".sv-intro-fade", {
          y: 24,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: ".sv-title", start: "top 80%" },
        });
        return () => split.revert();
      });

      // Horizontal journey (all screen sizes)
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector<HTMLElement>(".sv-track")!;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const travel = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to(".sv-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>(".sv-card").forEach((card) => {
          const img = card.querySelector(".sv-img");
          if (img) gsap.fromTo(
            img,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
            }
          );
          gsap.from(card.querySelectorAll(".sv-reveal"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            scrollTrigger: { trigger: card, containerAnimation: travel, start: "left 75%" },
          });
          gsap.fromTo(
            card,
            { clipPath: "inset(12% 0% 12% 0% round 28px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: travel, start: "left right", end: "left 45%", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="relative overflow-hidden bg-ink max-lg:motion-safe:h-[100svh] lg:h-screen">
      <div className="sv-track flex flex-col gap-6 px-5 py-24 sm:px-8 max-lg:motion-safe:h-full max-lg:motion-safe:w-max max-lg:motion-safe:flex-row max-lg:motion-safe:items-center max-lg:motion-safe:gap-4 max-lg:motion-safe:py-0 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:px-[6vw] lg:py-0">
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-between gap-10 max-lg:motion-safe:h-[72svh] max-lg:motion-safe:w-[min(84vw,520px)] lg:h-[72vh] lg:w-[38vw] lg:pr-10">
          <div>
            <p className="sv-intro-fade mb-8 text-xs uppercase tracking-[0.25em] text-brand-2">(01) — Services</p>
            <h2 className="sv-title text-[clamp(2.5rem,4.3vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              Comprehensive <span className="font-serif font-normal italic text-frost">Cleaning</span> Services
            </h2>
          </div>
          <div>
            <p className="sv-intro-fade max-w-sm text-white/60">
              From high-volume apartment turns to detailed office janitorial work, we deliver consistent quality you can count on.
            </p>
            <div className="sv-intro-fade mt-8 hidden items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/40 max-lg:motion-safe:flex lg:flex">
              Scroll
              <span className="relative h-px w-40 bg-white/15">
                <span className="sv-progress absolute inset-0 origin-left scale-x-0 bg-brand-2" />
              </span>
            </div>
          </div>
        </div>

        {/* Service cards */}
        {services.items.map((s, i) => (
          <article
            key={s.title}
            className="sv-card group relative h-[70svh] min-h-[460px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 max-lg:motion-safe:h-[72svh] max-lg:motion-safe:min-h-0 max-lg:motion-safe:w-[min(82vw,520px)] lg:h-[72vh] lg:w-[min(36vw,560px)]"
          >
            <div className="sv-img absolute inset-y-0 -left-[12%] w-[124%]">
              <Image
                src={`${s.image}?auto=format&fit=crop&w=1400&q=75`}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover brightness-[0.7] transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
              <span className="sv-reveal font-serif text-6xl italic text-white/80">0{i + 1}</span>
              <div>
                <h3 className="sv-reveal text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{s.title}</h3>
                <p className="sv-reveal mt-4 max-w-sm text-white/70">{s.body}</p>
              </div>
            </div>
          </article>
        ))}

        {/* Also offering */}
        <div className="sv-also sv-card flex shrink-0 flex-col justify-between rounded-[28px] border border-white/10 bg-gradient-to-br from-brand/25 via-ink-2 to-ink-2 p-7 sm:p-9 max-lg:motion-safe:h-[72svh] max-lg:motion-safe:w-[min(82vw,520px)] lg:h-[72vh] lg:w-[30vw]">
          <p className="sv-reveal text-xs uppercase tracking-[0.25em] text-brand-2">Also offering</p>
          <ul className="my-10 space-y-5">
            {services.also.map((a) => (
              <li key={a} className="sv-reveal border-b border-white/10 pb-5 text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                {a}
              </li>
            ))}
          </ul>
          <a href={brand.bookingUrl} data-book className="sv-reveal btn-primary self-start">
            Schedule Free Walkthrough <Arrow />
          </a>
        </div>

        <div aria-hidden className="hidden w-[6vw] shrink-0 max-lg:motion-safe:block lg:block" />
      </div>
    </section>
  );
}
