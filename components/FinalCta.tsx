"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK, splitClasses } from "@/lib/gsap";
import { brand, finalCta } from "@/lib/content";
import { Arrow } from "./Hero";

/** Pinned finale: a small framed shot opens up to fill the screen as the headline rises. */
export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".fc-title", { ...splitClasses, type: "lines,words", mask: "lines" });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=140%", pin: true, scrub: 1, anticipatePin: 1 },
        });
        tl.fromTo(
          ".fc-frame",
          { clipPath: "inset(22% 26% 22% 26% round 40px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }
        )
          .fromTo(".fc-img", { scale: 1.4 }, { scale: 1, ease: "power2.out", duration: 1 }, 0)
          .fromTo(".fc-shade", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.35)
          .from(split.words, { yPercent: 110, stagger: 0.04, duration: 0.5, ease: "power3.out" }, 0.5)
          .from(".fc-fade", { y: 30, opacity: 0, stagger: 0.08, duration: 0.4 }, 0.75);

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-ink">
      <div className="fc-frame absolute inset-0 overflow-hidden">
        <Image
          src={`${finalCta.image}?auto=format&fit=crop&w=2400&q=75`}
          alt="Bright, freshly cleaned commercial hallway with glass doors"
          fill
          sizes="100vw"
          className="fc-img object-cover"
        />
        <div className="fc-shade absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,7,13,0.75))]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center">
        <h2 className="fc-title text-balance text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
          Ready for a <span className="font-serif font-normal italic text-frost">Cleaner</span> Property?
        </h2>
        <p className="fc-fade mt-8 max-w-xl text-lg text-white/75">{finalCta.body}</p>
        <a href={brand.bookingUrl} data-book className="fc-fade btn-primary mt-10">
          {finalCta.cta} <Arrow />
        </a>
      </div>
    </section>
  );
}
