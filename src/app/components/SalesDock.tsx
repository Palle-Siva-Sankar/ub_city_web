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
          <div
            className="glass-pane rounded-[1.2rem] sm:rounded-[1.4rem] border flex items-center justify-between gap-2 px-1.5 sm:px-2 py-1.5 sm:py-2 shadow-2xl"
            style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="flex items-center gap-1 min-w-0 overflow-x-auto no-scrollbar">
              {ACTIONS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="group inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-colors min-w-0"
                  style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)", color: "var(--text-main)" }}
                >
                  <a.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="truncate">{a.label}</span>
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setHidden(true)}
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{ border: "1px solid var(--card-border)", backgroundColor: "var(--card-bg)" }}
              aria-label="Hide actions"
            >
              <X className="w-4 h-4 text-[color:var(--text-dim)]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

