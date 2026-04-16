import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Luxe-Engine Scroll Reset
 * Forces the browser to jump to the very top (the "start") on every route change.
 * This eliminates the 'starting at ending' bug caused by persistent scroll states.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll reset
    const performScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    performScroll();

    // Fallback for lazy-loaded content or complex layout shifts
    const timer = setTimeout(performScroll, 50);
    const raf = requestAnimationFrame(performScroll);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
