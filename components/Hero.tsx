"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { hero, contact } from "@/lib/content";

/**
 * Cinematic hero: a curtain lifts on a hazy, desaturated scene, then a
 * glowing "squeegee" line wipes across and leaves the crisp image behind it.
 * On scroll the frame recedes into a rounded card while the copy drifts away.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".hero-title", { ...splitClasses, type: "lines", mask: "lines"});

        gsap.set(".hero-clean", { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.set(".hero-curtain", { animation: "none" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero-curtain", { yPercent: -100, duration: 1.3, ease: "expo.inOut" })
          .from(".hero-media", { scale: 1.28, duration: 2.6 }, 0.15)
          .set(".hero-squeegee", { opacity: 1 }, 0.85)
          .to(".hero-clean", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "power2.inOut" }, 0.85)
          .fromTo(".hero-squeegee", { left: "0%" }, { left: "100%", duration: 1.7, ease: "power2.inOut" }, 0.85)
          .to(".hero-squeegee", { opacity: 0, duration: 0.3 }, 2.45)
          .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1 }, 1.1)
          .from(split.lines, { yPercent: 115, duration: 1.4, stagger: 0.12 }, 1.2)
          .from(".hero-fade", { y: 30, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.6)
          .from(".hero-card", { x: 40, opacity: 0, duration: 1.4 }, 1.9)
          .from(".hero-cue", { opacity: 0, duration: 1 }, 2.3);

        // Scroll: frame recedes, image drifts, copy lifts away
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.8 };
        gsap.fromTo(
          ".hero-frame",
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          { clipPath: "inset(7% 4% 7% 4% round 36px)", ease: "none", scrollTrigger: st }
        );
        gsap.to(".hero-media-inner", { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(".hero-content", { y: -140, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
        // fromTo + immediateRender:false so this doesn't fight the intro's from() states
        gsap.fromTo(
          ".hero-card, .hero-cue",
          { y: 0, opacity: 1 },
          { y: -60, opacity: 0, ease: "none", immediateRender: false, scrollTrigger: { ...st, end: "40% top" } }
        );

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-curtain", { autoAlpha: 0 });
        gsap.set(".hero-squeegee", { opacity: 0 });
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Image frame */}
      <div className="hero-frame absolute inset-0 overflow-hidden">
        <div className="hero-media absolute inset-0">
          <div className="hero-media-inner absolute inset-0">
            {/* "Before" — hazy and desaturated */}
            <Image
              src={`${hero.image}?auto=format&fit=crop&w=2400&q=70`}
              alt=""
              aria-hidden
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover blur-[10px] brightness-[0.35] grayscale"
            />
            {/* "After" — crisp, revealed by the wipe */}
            <div className="hero-clean absolute inset-0">
              <Image
                src={`${hero.image}?auto=format&fit=crop&w=2400&q=80`}
                alt="Bright, freshly cleaned commercial hallway with glass doors"
                fill
                priority
                sizes="100vw"
                className="object-cover brightness-[0.62] saturate-[1.1]"
              />
            </div>
          </div>
        </div>

        {/* Squeegee light */}
        <div className="hero-squeegee pointer-events-none absolute inset-y-0 left-0 z-10 w-[3px] -translate-x-1/2 bg-white opacity-0 shadow-[0_0_40px_10px_rgba(122,165,255,0.75),0_0_120px_40px_rgba(47,107,255,0.35)]" />

        {/* Grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(47,107,255,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      {/* Curtain */}
      <div className="hero-curtain curtain-fallback absolute inset-0 z-30 bg-ink" />

      {/* Copy */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="hero-content max-w-4xl">
          <p className="hero-eyebrow mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-brand-2">
            <span className="h-px w-10 bg-brand-2" />
            {hero.eyebrow}
          </p>
          <h1 className="hero-title text-[clamp(2.9rem,8.4vw,8.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {hero.title[0]}
            <br />
            <span className="font-serif font-normal italic tracking-[-0.02em] text-frost">Cleaning</span> in DFW
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{hero.body}</p>
          <div className="hero-fade mt-10 flex flex-wrap gap-4">
            <a href="#schedule" className="btn-primary">
              {hero.primary}
              <Arrow />
            </a>
            <a href="#services" className="btn-ghost">
              {hero.secondary}
            </a>
          </div>
        </div>

        {/* Service area card */}
        <div className="hero-card absolute bottom-24 right-8 hidden w-64 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl xl:block">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Service Area</p>
          <p className="mt-2 text-lg font-medium leading-snug">Dallas-Fort Worth Metroplex</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {contact.cities.map((c) => (
              <li key={c} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70">
                {c.replace(", TX", "")}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:flex">
          Scroll
          <span className="relative h-12 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_ease-in-out_infinite] bg-white" />
          </span>
        </div>
      </div>

      <style>{`@keyframes cue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="relative">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
