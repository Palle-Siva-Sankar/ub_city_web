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
        className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-8 pointer-events-none"
      >
        <div className="max-w-4xl mx-auto glass-pane lighting-card rounded-[2rem] p-5 md:p-8 border border-accent/20 shadow-[0_0_80px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-center gap-6 md:gap-10 pointer-events-auto relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-gold">
             <Cookie className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-ink-gradient text-base md:text-lg font-black font-['Outfit'] mb-1.5 uppercase tracking-tighter">Consent Protocol</p>
            <p className="text-[color:var(--text-dim)] text-[11px] font-medium italic leading-relaxed opacity-80 max-w-[50ch]">
              We deploy analytical persistence layers to optimize your high-fidelity experience. Synchronization of analytical streams authorized by proceeding.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={accept}
              className="px-8 py-3 bg-accent text-black font-black tracking-[0.3em] uppercase text-[9px] rounded-full hover:shadow-gold hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              Authorize
            </button>
            <button
              onClick={accept}
              className="px-8 py-3 glass-pane border border-[var(--border)] text-ink-gradient font-black tracking-[0.3em] uppercase text-[9px] rounded-full hover:border-accent hover:text-accent transition-all duration-500 active:scale-95"
            >
              Essential
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
