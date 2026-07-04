import { useEffect } from 'react';
import Lenis from 'lenis';

const HEADER_OFFSET = -76;
const SNAP_SECTION_ID = 'animasyon-ve-onizleme';
const SNAP_TRIGGER = 60; // px of scroll intent past the cue before the snap kicks in
const EASE_OUT_QUART = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Buttery-smooth inertia scrolling (Lenis) + smooth anchor navigation
 * with sticky-header offset. Respects prefers-reduced-motion.
 *
 * Also snaps the hero: once its bottom edge — the "Keşfet" cue — is fully
 * on screen, continued downward scrolling glides automatically to the
 * explore section, and scrolling back up glides to that cue point (the top
 * of the page on screens tall enough to show the whole hero at once).
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      // Own touch scrolling too: the hero snap animates the scroll position,
      // and a native touch fling would fight that animation frame-by-frame
      // (the stutter seen on phones). Inner scrollables opt out with
      // data-lenis-prevent.
      syncTouch: true,
      touchMultiplier: 1
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
    const getSnapPoint = (section: HTMLElement, sectionTop: number) => {
      const scrollMargin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      return sectionTop - scrollMargin + HEADER_OFFSET;
    };

    // Hero snap: the zone opens only once the hero's bottom edge — where the
    // "Keşfet" cue sits — is fully on screen, so on small viewports the stats
    // above it are scrolled through normally instead of being flown past.
    const onScroll = () => {
      if (autoScrolling) return;
      const section = document.getElementById(SNAP_SECTION_ID);
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + lenis.scroll;
      // Scroll position at which the hero is fully revealed; 0 on screens
      // tall enough to show the whole hero at once.
      const heroFloor = Math.max(0, sectionTop - window.innerHeight);
      const snapPoint = getSnapPoint(section, sectionTop);
      const inSnapZone = lenis.scroll > heroFloor + SNAP_TRIGGER && lenis.scroll < snapPoint - SNAP_TRIGGER;
      if (!inSnapZone) return;
      if (lenis.direction === 1) glideTo(section, 1.2, true);
      else if (lenis.direction === -1) glideTo(heroFloor, 1.2, true);
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
