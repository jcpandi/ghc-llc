"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { brand } from "@/lib/content";

type LenisLike = { stop: () => void; start: () => void };
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/**
 * Popup with the GoHighLevel booking calendar.
 * Any link or button with `data-book` opens it, so every "Schedule Free
 * Walkthrough" call to action shares one modal. Those links point at the booking
 * page, so they still work if JavaScript fails.
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // iframe loads on first open, then stays
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);

  const show = useCallback((trigger?: HTMLElement | null) => {
    returnFocus.current = trigger ?? (document.activeElement as HTMLElement);
    setMounted(true);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  // Delegate clicks from any [data-book] element
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-book]");
      if (!el) return;
      e.preventDefault();
      show(el);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  // Esc to close and a simple focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
      if (e.key === "Tab" && root.current) {
        const f = root.current.querySelectorAll<HTMLElement>("button, a[href], iframe");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  // Open/close animation and scroll lock
  useEffect(() => {
    const el = root.current;
    if (!el || (!open && !wasOpen.current)) return; // nothing to close on first render
    wasOpen.current = open;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tl.current?.kill();

    if (open) {
      getLenis()?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.set(el, { autoAlpha: 1 });
      tl.current = gsap
        .timeline()
        .fromTo(".bk-backdrop", { opacity: 0 }, { opacity: 1, duration: reduce ? 0 : 0.5, ease: "power2.out" })
        .fromTo(
          ".bk-panel",
          { clipPath: "inset(50% 0% 50% 0% round 28px)", y: 40, scale: 0.96, opacity: 1 },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, scale: 1, opacity: 1, duration: reduce ? 0 : 0.9, ease: "expo.out" },
          reduce ? 0 : 0.05
        )
        .from(".bk-head > *", { y: 16, opacity: 0, stagger: 0.06, duration: reduce ? 0 : 0.6 }, reduce ? 0 : 0.3)
        .add(() => closeBtn.current?.focus());
    } else {
      tl.current = gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
            getLenis()?.start();
            document.documentElement.style.overflow = "";
            returnFocus.current?.focus?.();
          },
        })
        .to(".bk-panel", { y: 30, opacity: 0, duration: reduce ? 0 : 0.35, ease: "power2.in" })
        .to(".bk-backdrop", { opacity: 0, duration: reduce ? 0 : 0.3 }, "<0.1");
    }
  }, [open]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bk-title"
      aria-hidden={!open}
      className="invisible fixed inset-0 z-[70] flex items-center justify-center p-3 opacity-0 sm:p-6"
    >
      <div className="bk-backdrop absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={hide} />

      <div className="bk-panel relative flex h-[min(92svh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-20px_rgba(47,107,255,0.35)]">
        <div className="bk-head flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-2">Free · 30 min</p>
            <h2 id="bk-title" className="mt-1 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
              Schedule Your Free <span className="font-serif font-normal italic text-frost">Walkthrough</span>
            </h2>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={hide}
            aria-label="Close booking"
            className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors hover:border-white/50 hover:bg-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform duration-500 group-hover:rotate-90">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 bg-white">
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center bg-ink-2">
              <div className="flex flex-col items-center gap-4 text-sm text-white/60">
                <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-brand-2" />
                Loading calendar…
              </div>
            </div>
          )}
          {mounted && (
            <iframe
              src={brand.bookingUrl}
              title="Book a free cleaning walkthrough with Hero Cleaning Group"
              onLoad={() => setLoaded(true)}
              className="h-full w-full border-0"
              scrolling="yes"
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-6 py-3 text-xs text-white/50 sm:px-8">
          <span>
            Prefer to talk?{" "}
            <a href={brand.phoneHref} className="text-white/80 underline-offset-4 hover:text-brand-2 hover:underline">
              Call or text {brand.phone}
            </a>
          </span>
          <a
            href={brand.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            Open in a new tab ↗
          </a>
        </div>
      </div>
    </div>
  );
}
