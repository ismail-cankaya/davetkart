import { useEffect } from 'react';

export function useScrollSnap() {
  // Scroll-jack effect: from Hero to Categories directly and vice-versa
  useEffect(() => {
    let isScrolling = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (isScrolling) return;

      const target = document.getElementById('animasyon-ve-onizleme');
      if (!target) return;
      const targetTop = target.offsetTop;

      if (window.innerWidth >= 768) {
        // Desktop logic
        // If near the top and scrolling down, snap to Categories
        if (isScrollingDown && currentScrollY > 10 && currentScrollY < window.innerHeight * 0.3) {
          isScrolling = true;
          target.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 800); // Cooldown
        }
        // If near the Categories top and scrolling up, snap to Hero
        else if (!isScrollingDown && currentScrollY < targetTop - 10 && currentScrollY > targetTop - window.innerHeight * 0.5) {
          isScrolling = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => { isScrolling = false; }, 800); // Cooldown
        }
      } else {
        // Mobile logic: 3-step scroll
        const heroBottomScrollPos = targetTop - window.innerHeight;
        const fitsOnScreen = heroBottomScrollPos <= 0;

        if (fitsOnScreen) {
          if (isScrollingDown && currentScrollY > 5 && currentScrollY < targetTop - 5) {
            isScrolling = true;
            target.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 800);
          } else if (!isScrollingDown && currentScrollY < targetTop - 5 && currentScrollY > 5) {
            isScrolling = true;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 800);
          }
        } else {
          if (isScrollingDown) {
            // 1. Top to Hero Bottom (Stats)
            if (currentScrollY > 5 && currentScrollY < heroBottomScrollPos - 5) {
              isScrolling = true;
              window.scrollTo({ top: heroBottomScrollPos, behavior: 'smooth' });
              setTimeout(() => { isScrolling = false; }, 800);
            }
            // 2. Hero Bottom (Stats) to Categories
            else if (currentScrollY > heroBottomScrollPos + 5 && currentScrollY < targetTop - 5) {
              isScrolling = true;
              target.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => { isScrolling = false; }, 800);
            }
          } else {
            // 3. Categories to Hero Bottom (Stats)
            if (currentScrollY < targetTop - 5 && currentScrollY > heroBottomScrollPos + 5) {
              isScrolling = true;
              window.scrollTo({ top: heroBottomScrollPos, behavior: 'smooth' });
              setTimeout(() => { isScrolling = false; }, 800);
            }
            // 4. Hero Bottom (Stats) to Top
            else if (currentScrollY < heroBottomScrollPos - 5 && currentScrollY > 5) {
              isScrolling = true;
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => { isScrolling = false; }, 800);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
