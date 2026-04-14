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
        <div className="relative flex items-center gap-4 px-6 py-4 rounded-full glass-pane border border-accent/30 shadow-[0_20px_60px_rgba(198,163,95,0.4)] backdrop-blur-3xl transition-all duration-500 hover:border-accent">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black shadow-gold group-hover:rotate-[15deg] transition-all">
             <Sparkles className="w-4 h-4 fill-black" />
          </div>
          <span className="relative text-[10px] font-black uppercase tracking-[0.4em] text-accent group-hover:text-ink-gradient">Concierge</span>
        </div>
      </motion.button>

      {/* Concierge Interface */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xl glass-pane border border-accent/30 rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-black shadow-gold">
                        <MessageSquare className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black font-['Outfit'] text-ink-gradient leading-none uppercase">AI Concierge</h2>
                        <p className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mt-2">Personal Assistant Live</p>
                    </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-black transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-4 mb-10">
                 <p className="text-[11px] font-black uppercase tracking-[0.6em] text-accent mb-2 px-2">Knowledge Base</p>
                 {CONCIERGE_ACTIONS.map((action, i) => (
                    <Link
                      key={action.id}
                      to={action.to}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-6 rounded-[2rem] glass-pane border border-[var(--border)] hover:border-accent hover:bg-accent/5 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                           <action.icon className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-sm font-black text-ink-gradient uppercase tracking-widest leading-none">{action.label}</p>
                           <p className="text-[10px] font-medium text-accent/60 uppercase tracking-widest mt-1.5">{action.sub}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </Link>
                 ))}
              </div>

              <div className="bg-accent/5 rounded-3xl p-6 border border-accent/10">
                  <div className="flex items-start gap-4">
                      <Sparkles className="w-4 h-4 text-accent shrink-0 mt-1" />
                      <p className="text-xs font-medium text-ink-gradient/80 leading-relaxed italic">
                        "Welcome to UB City. I can help you locate flagship stores, book premium dining experiences, or assist with strategic leasing opportunities. How may I serve you today?"
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
