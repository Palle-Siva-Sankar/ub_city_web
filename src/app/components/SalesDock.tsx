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
          className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(760px,calc(100vw-20px))]"
        >
          <div className="glass-pane lighting-card rounded-[2rem] border border-accent/20 flex items-center justify-between gap-4 px-3 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar scroll-smooth">
              {ACTIONS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="group relative inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all min-w-0 border border-transparent hover:border-accent/40 bg-accent/5 hover:bg-accent hover:text-black shadow-lg"
                >
                  <a.icon className="w-4 h-4 text-accent group-hover:text-black shrink-0 transition-colors" />
                  <span className="truncate">{a.label}</span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHidden(true)}
              className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-accent/20 bg-accent/5 hover:bg-accent hover:text-black transition-all group"
              aria-label="Terminate Dock"
            >
              <X className="w-5 h-5 text-accent group-hover:text-black transition-colors" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

