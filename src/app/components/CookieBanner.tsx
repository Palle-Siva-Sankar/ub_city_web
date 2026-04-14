import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { useCookieConsent } from "../hooks/useFeatures";

export function CookieBanner() {
  const { consented, accept } = useCookieConsent();

  if (consented) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6"
      >
        <div className="max-w-[1000px] mx-auto glass-pane rounded-[2rem] p-6 md:p-8 border border-[var(--glass-border)] shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <Cookie className="w-8 h-8 text-accent shrink-0" />
          <div className="flex-1">
            <p className="text-page text-sm font-medium mb-1">We use cookies to enhance your experience</p>
            <p className="text-muted-custom text-xs font-light">By continuing to browse, you agree to our use of cookies for analytics, personalization, and ads.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={accept}
              className="px-6 py-2.5 bg-accent text-[var(--btn-text-on-accent)] font-bold tracking-widest uppercase text-xs rounded-full hover:scale-105 transition-all"
            >
              Accept All
            </button>
            <button
              onClick={accept}
              className="px-6 py-2.5 border border-[var(--border)] text-page font-bold tracking-widest uppercase text-xs rounded-full hover:border-accent transition-all"
            >
              Necessary Only
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
