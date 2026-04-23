import { useEffect, useRef } from 'react';

export function useScrollSnapDelay(delay: number = 800, duration: number = 600) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getSections = () => {
      return Array.from(container.querySelectorAll('section[data-snap-section]')) as HTMLElement[];
    };

    const getTargetSection = () => {
      const sections = getSections();
      if (sections.length === 0) return null;
      const scrollTop = window.scrollY;
      const viewportCenter = scrollTop + window.innerHeight / 2;
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

    const snapToSection = (section: HTMLElement) => {
      isSnappingRef.current = true;
      const targetY = section.offsetTop;
      const startY = window.scrollY;
      const dist = targetY - startY;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + dist * eased);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => { isSnappingRef.current = false; }, 100);
        }
      };
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (isSnappingRef.current) return;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const target = getTargetSection();
        if (target) snapToSection(target);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [delay, duration]);

  return containerRef;
}
