import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
  /** Hero videos load immediately; others lazy-load when scrolled into view */
  hero?: boolean;
  /** Low-priority videos load after the page is idle */
  lowPriority?: boolean;
}

/**
 * Performance-optimized video component.
 *
 * - Hero videos preload immediately with high fetch priority.
 * - Non-hero videos lazy-load via Intersection Observer (no download until visible).
 * - Low-priority videos also wait for requestIdleCallback when available.
 */
export default function LazyVideo({
  src,
  className = '',
  style,
  poster,
  hero = false,
  lowPriority = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(hero);

  useEffect(() => {
    if (hero) return; // already set to load

    const video = videoRef.current;
    if (!video) return;

    // For low-priority videos, delay observer setup until browser is idle
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '200px 0px', // start loading 200px before visible
          threshold: 0,
        }
      );

      observer.observe(video);

      return () => observer.disconnect();
    };

    if (lowPriority && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(setupObserver, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    return setupObserver();
  }, [hero, lowPriority]);

  // Once shouldLoad becomes true, start playing
  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — poster will show instead
      });
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload={shouldLoad ? 'auto' : 'none'}
      poster={poster}
      className={className}
      style={style}
      fetchPriority={hero ? 'high' : 'auto'}
      decoding="async"
      src={shouldLoad ? src : undefined}
    />
  );
}
