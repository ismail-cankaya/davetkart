import { useEffect } from 'react';
import Lenis from 'lenis';

const HEADER_OFFSET = -76;
const SNAP_SECTION_ID = 'animasyon-ve-onizleme';
const SNAP_TRIGGER = 60; // px of scroll intent before the hero snap kicks in
const EASE_OUT_QUART = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Buttery-smooth inertia scrolling (Lenis) + smooth anchor navigation
 * with sticky-header offset. Respects prefers-reduced-motion.
 *
 * Also snaps the hero: scrolling down glides automatically to the
 * explore section, scrolling back up glides to the top.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    let autoScrolling = false;
    let unlockTimer: number | undefined;

    const glideTo = (target: HTMLElement | number, duration: number, lock = false) => {
      autoScrolling = true;
      window.clearTimeout(unlockTimer);
      // Fallback unlock in case the animation gets interrupted before onComplete
      unlockTimer = window.setTimeout(() => { autoScrolling = false; }, duration * 1000 + 300);
      lenis.scrollTo(target, {
        offset: typeof target === 'number' ? 0 : HEADER_OFFSET,
        duration,
        lock,
        easing: EASE_OUT_QUART,
        onComplete: () => { autoScrolling = false; }
      });
    };

    // Where the snap-down actually lands: Lenis subtracts the element's
    // scroll-margin-top (e.g. Tailwind `scroll-mt-*`) on top of our offset,
    // so the zone boundary must use the same math or the landing point can
    // end up inside the zone and re-trigger the snap on every scroll.
    const getSnapPoint = (section: HTMLElement) => {
      const scrollMargin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      return section.getBoundingClientRect().top + lenis.scroll - scrollMargin + HEADER_OFFSET;
    };

    // Hero snap: any scroll intent inside the hero zone completes the journey
    const onScroll = () => {
      if (autoScrolling) return;
      const section = document.getElementById(SNAP_SECTION_ID);
      if (!section) return;
      const snapPoint = getSnapPoint(section);
      const inHeroZone = lenis.scroll > SNAP_TRIGGER && lenis.scroll < snapPoint - SNAP_TRIGGER;
      if (!inHeroZone) return;
      if (lenis.direction === 1) glideTo(section, 1.2, true);
      else if (lenis.direction === -1) glideTo(0, 1.2, true);
    };
    lenis.on('scroll', onScroll);

    // Intercept in-page anchors so they glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      glideTo(target, 1.4);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(unlockTimer);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}
