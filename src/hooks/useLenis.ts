import { useEffect } from 'react';
import Lenis from 'lenis';

const HEADER_OFFSET = -76;
// First section after the landing hero (template showcase) — the hero snap's
// target. On other pages the zone math collapses and the snap stays inert
// (on /create the same section sits at the top, so no zone can form).
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
      // Touch handling is split by region (see onScroll): Lenis owns touch
      // gestures only inside the hero, where the snap animation needs full
      // control of the scroll position — a native fling would fight it
      // frame-by-frame. Everywhere below, this flag is switched off at
      // runtime and the page scrolls 100% natively on phones. Inner
      // scrollables opt out with data-lenis-prevent.
      syncTouch: true,
      // Lenis' default inertia settle (0.075) feels syrupy-slow; a higher
      // lerp keeps the same flick physics but settles noticeably faster.
      syncTouchLerp: 0.12,
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
    // scroll-margin-top is static (Tailwind scroll-mt-*), so read it once —
    // getComputedStyle on every scroll frame is wasted layout work on phones.
    let snapMargin: number | undefined;
    const getSnapPoint = (section: HTMLElement, sectionTop: number) => {
      snapMargin ??= Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      return sectionTop - snapMargin + HEADER_OFFSET;
    };

    // Hero snap: the zone opens only once the hero's bottom edge — where the
    // "Keşfet" cue sits — is fully on screen, so on small viewports the stats
    // above it are scrolled through normally instead of being flown past.
    const onScroll = () => {
      const section = document.getElementById(SNAP_SECTION_ID);
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + lenis.scroll;
      const snapPoint = getSnapPoint(section, sectionTop);

      // Lenis emulates touch inertia only where the snap needs to own the
      // scroll: the hero region. Past the snap point the flag is switched
      // off, so the rest of the page keeps the native mobile scroll feel.
      lenis.options.syncTouch = lenis.scroll < snapPoint;

      // While a finger is on the screen the user is still gesturing — snapping
      // now would lock a live drag mid-touch (felt as stutter). Wait for the
      // release: the inertia phase that follows still emits scroll events with
      // a direction, so the intent is not lost.
      if (autoScrolling || lenis.isTouching) return;

      // Never snap against browser-driven movement (native touch fling,
      // scrollbar drag): a programmatic glide would fight it frame-by-frame.
      // Scrolling up from below the hero therefore stays fully native.
      if (lenis.isScrolling === 'native') return;

      // Scroll position at which the hero is fully revealed; 0 on screens
      // tall enough to show the whole hero at once.
      const heroFloor = Math.max(0, sectionTop - window.innerHeight);
      const inSnapZone = lenis.scroll > heroFloor + SNAP_TRIGGER && lenis.scroll < snapPoint - SNAP_TRIGGER;
      if (!inSnapZone) return;
      if (lenis.direction === 1) glideTo(section, 1.2, true);
      else if (lenis.direction === -1) glideTo(heroFloor, 1.2, true);
    };
    lenis.on('scroll', onScroll);
    // Evaluate the region flag once up front: the page may load scrolled
    // (browser scroll restoration), and the first touch must already be
    // native below the hero. direction is 0 here, so no glide can trigger.
    onScroll();

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
