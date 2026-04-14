import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { useCookieConsent } from "../hooks/useFeatures";

export function CookieBanner() {
  const { consented, accept } = useCookieConsent();

  if (consented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 150, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[150] p-6 md:p-12 pointer-events-none"
      >
        <div className="max-w-[1200px] mx-auto glass-pane lighting-card rounded-[3rem] p-8 md:p-12 border border-accent/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center gap-8 md:gap-12 pointer-events-auto relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-gold">
             <Cookie className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-ink-gradient text-lg md:text-xl font-black font-['Outfit'] mb-3 uppercase tracking-tighter">Consent Protocol Initialized</p>
            <p className="text-[color:var(--text-dim)] text-sm font-medium italic leading-relaxed opacity-80">
              We deploy analytical persistence layers to optimize your high-fidelity experience. By proceeding, you authorize the synchronization of analytical streams and personalization metadata.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={accept}
              className="px-10 py-4 bg-accent text-black font-black tracking-[0.3em] uppercase text-[10px] rounded-full hover:shadow-gold hover:scale-105 transition-all shadow-lg"
            >
              Authorize All
            </button>
            <button
              onClick={accept}
              className="px-10 py-4 glass-pane border border-[var(--border)] text-ink-gradient font-black tracking-[0.3em] uppercase text-[10px] rounded-full hover:border-accent hover:text-accent transition-all duration-500"
            >
              Essential Only
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
