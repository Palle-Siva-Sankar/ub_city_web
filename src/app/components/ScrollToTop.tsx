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
    // We use 'instant' behavior to ensure the user landed on the top before any paint occurs.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Fallback for older browsers or stubborn layout shifts
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
