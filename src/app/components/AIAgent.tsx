import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Store, Utensils, Calendar, MessageSquare, ArrowRight, Building2, Package } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const CONCIERGE_ACTIONS = [
  { id: 'leasing', label: "Leasing Office", sub: "Business Inquiry", icon: Building2, to: "/leasing" },
  { id: 'brands', label: "Find Brands", sub: "Directory Access", icon: Store, to: "/shopping" },
  { id: 'dining', label: "Book a Table", sub: "Cuisine Discovery", icon: Utensils, to: "/dine" },
  { id: 'orders', label: "Track Orders", sub: "Live Updates", icon: Package, to: "/profile" },
];

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 220,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.98,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 200 }
    },
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:right-12 z-[70] group"
      >
        <div className="relative flex items-center gap-3 md:gap-4 px-4 py-2.5 md:px-5 md:py-3.5 rounded-full glass-pane border border-accent/30 shadow-[0_15px_45px_rgba(198,163,95,0.35)] backdrop-blur-3xl transition-all duration-500 hover:border-accent transform-gpu">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent flex items-center justify-center text-black shadow-gold group-hover:rotate-[15deg] transition-all">
             <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[var(--btn-text-on-accent)] text-[var(--btn-text-on-accent)]" />
          </div>
          <span className="relative text-[8.5px] md:text-[9.5px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-accent group-hover:text-ink-gradient">Concierge</span>
        </div>
      </motion.button>

      {/* Concierge Interface */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-[min(calc(100vw-32px),500px)] glass-pane border border-accent/25 rounded-[3rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden transform-gpu will-change-transform"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <div className="flex items-center gap-4 md:gap-5">
                    <div className="w-12 h-12 rounded-[1.25rem] bg-accent flex items-center justify-center text-[var(--btn-text-on-accent)] shadow-gold">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black font-['Outfit'] text-ink-gradient leading-none uppercase">AI Concierge</h2>
                        <p className="text-[8px] md:text-[9px] font-bold text-accent tracking-[0.3em] uppercase mt-1.5 opacity-80">Active Live</p>
                    </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-black transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid gap-3 mb-8">
                 <p className="text-[9px] font-black uppercase tracking-[0.6em] text-accent mb-1 px-2 opacity-60">Knowledge Base</p>
                 {CONCIERGE_ACTIONS.map((action) => (
                    <motion.div key={action.id} variants={itemVariants}>
                      <Link
                        to={action.to}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] glass-pane border border-[var(--border)] hover:border-accent hover:bg-accent/5 transition-all"
                      >
                        <div className="flex items-center gap-4 md:gap-5">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                             <action.icon className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="text-[11px] md:text-[12px] font-black text-ink-gradient uppercase tracking-widest leading-none">{action.label}</p>
                             <p className="text-[8px] md:text-[9px] font-medium text-accent/60 uppercase tracking-widest mt-1">{action.sub}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                      </Link>
                    </motion.div>
                 ))}
              </div>

              <div className="bg-accent/5 rounded-[2rem] p-5 border border-accent/10">
                  <div className="flex items-start gap-4">
                      <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <p className="text-[11px] font-medium text-ink-gradient/80 leading-relaxed italic">
                        "Welcome to UB City. I can help locate flagship stores, book premium dining, or assist with strategic leasing. How may I serve you today?"
                      </p>
                  </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
