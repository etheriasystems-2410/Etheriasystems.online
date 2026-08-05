import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollSnapDelay(delay: number = 800, duration: number = 600, threshold: number = 0.05) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);
  const lastSnappedSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () => {
      return Array.from(container.querySelectorAll('section[data-snap-section]')) as HTMLElement[];
    };

    const getVisibleAmount = (section: HTMLElement) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      const visible = Math.max(0, Math.min(sectionBottom, viewportBottom) - Math.max(sectionTop, viewportTop));
      return visible;
    };

    const getTargetSection = () => {
      const sections = getSections();
      if (sections.length === 0) return null;

      // Prefer any section that has at least `threshold` fraction of the viewport visible.
      const viewportHeight = window.innerHeight;
      let bestSection: HTMLElement | null = null;
      let bestVisible = 0;

      for (const section of sections) {
        const visible = getVisibleAmount(section);
        if (visible > bestVisible) {
          bestVisible = visible;
          bestSection = section;
        }
      }

      if (bestSection && bestVisible > threshold * viewportHeight) {
        return bestSection;
      }

      // Fallback: choose the section whose center is closest to viewport center (previous behavior)
      const scrollTop = window.scrollY;
      const viewportCenter = scrollTop + viewportHeight / 2;
      let closestSection: HTMLElement | null = null;
      let closestDistance = Infinity;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionCenter = sectionTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      });
      return closestSection;
    };

    const snapToSection = (section: HTMLElement, snapDuration = duration) => {
      if (isSnappingRef.current) return;
      isSnappingRef.current = true;
      lastSnappedSectionRef.current = section;

      const targetY = section.offsetTop;
      const startY = window.scrollY;
      const dist = targetY - startY;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / snapDuration, 1);
        // cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, Math.round(startY + dist * eased));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Give a tiny buffer before allowing another snap and refresh ScrollTrigger to keep GSAP in sync
          setTimeout(() => {
            isSnappingRef.current = false;
            try { ScrollTrigger.refresh(); } catch (e) { /* ignore if not available */ }
          }, 120);
        }
      };
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (isSnappingRef.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      // If any (non-current) section has even a small visible portion beyond thresholdFraction
      // choose the section with the largest visible portion and snap to it immediately with a tight duration.
      let largestVisibleSection: HTMLElement | null = null;
      let largestVisible = 0;
      for (const section of sections) {
        const visible = getVisibleAmount(section);
        if (visible > largestVisible) {
          largestVisible = visible;
          largestVisibleSection = section;
        }
      }

      if (largestVisibleSection && largestVisible > 0) {
        // If any portion is visible (user requested tight snap), snap immediately but avoid snapping
        // to the same section repeatedly.
        if (lastSnappedSectionRef.current !== largestVisibleSection) {
          // Use a tight duration for an immediate, crisp snap.
          const tightDuration = Math.min(duration, 200);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
          snapToSection(largestVisibleSection, tightDuration);
          return;
        }
      }

      // Otherwise, debounce and snap to whichever section is closest to center after the user stops scrolling.
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const target = getTargetSection();
        if (target) snapToSection(target, duration);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also trigger once so the page snaps on load if needed
    setTimeout(handleScroll, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [delay, duration, threshold]);

  return containerRef;
}
