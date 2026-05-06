import { useState, useEffect } from 'react';

// Generate a persistent visitor number that stays the same for each browser
function getPersistentVisitorId(): number {
  const STORAGE_KEY = 'etheria-visitor-id';
  const GLOBAL_COUNT_KEY = 'etheria-global-count';

  // Check if this browser already has an assigned visitor ID
  let myId = localStorage.getItem(STORAGE_KEY);

  if (!myId) {
    // First visit: increment the global counter and assign this visitor their number
    const currentGlobal = parseInt(localStorage.getItem(GLOBAL_COUNT_KEY) || '1042', 10);
    const newGlobal = currentGlobal + 1;
    localStorage.setItem(GLOBAL_COUNT_KEY, newGlobal.toString());
    localStorage.setItem(STORAGE_KEY, newGlobal.toString());
    myId = newGlobal.toString();
  }

  return parseInt(myId, 10);
}

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay for visual effect
    const timer = setTimeout(() => {
      const visitorId = getPersistentVisitorId();
      setCount(visitorId);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { count, loading };
}
