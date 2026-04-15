import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Building2, Handshake, Music2, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

const ACTIONS = [
  { to: "/leasing", label: "Leasing", icon: Building2 },
  { to: "/sponsorship", label: "Sponsorship", icon: Handshake },
  { to: "/venues", label: "Book Venue", icon: Music2 },
] as const;

export function SalesDock() {
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
          className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(500px,calc(100vw-24px))]"
        >
          <div className="glass-pane lighting-card rounded-xl border border-accent/20 flex items-center justify-between gap-1.5 px-3 h-11 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto no-scrollbar scroll-smooth">
              {ACTIONS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="group relative inline-flex items-center gap-2 rounded-lg px-3.5 h-8 text-[8.5px] font-black uppercase tracking-[0.15em] transition-all min-w-0 border border-transparent hover:border-accent/40 bg-accent/5 hover:bg-accent hover:text-black shadow-lg"
                >
                  <a.icon className="w-3.5 h-3.5 text-accent group-hover:text-black shrink-0 transition-colors" />
                  <span className="truncate">{a.label}</span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHidden(true)}
              className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent hover:text-black transition-all group"
              aria-label="Terminate Dock"
            >
              <X className="w-4 h-4 text-accent group-hover:text-black transition-colors" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

