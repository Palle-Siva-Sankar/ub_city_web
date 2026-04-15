import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag, Utensils, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { BRANDS, RESTAURANTS, UPCOMING_EVENTS } from "../data/mallData";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return { brands: [], dine: [], events: [] };
    const q = query.toLowerCase();
    return {
      brands: BRANDS.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)).slice(0, 5),
      dine: RESTAURANTS.filter(r => r.name.toLowerCase().includes(q)).slice(0, 5),
      events: UPCOMING_EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)).slice(0, 3)
    };
  }, [query]);

  const isEmpty = results.brands.length === 0 && results.dine.length === 0 && results.events.length === 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm md:backdrop-blur-2xl flex items-start justify-center pt-20 sm:pt-24 px-4 sm:px-6"
        >
          <motion.div
            initial={{ scale: 0.98, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-4xl rounded-[2rem] p-3 sm:p-4 border border-white/10 bg-black/25"
          >
            {/* Search Input Area */}
            <div className="relative mb-12">
              <Search className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-8 sm:h-8 text-accent" />
              <input
                autoFocus
                type="text"
                placeholder="Find a luxury brand, restaurant, or event..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/8 border-2 border-white/12 rounded-2xl sm:rounded-[2.5rem] py-4 sm:py-8 pl-14 sm:pl-24 pr-24 sm:pr-32 text-base sm:text-2xl font-['Outfit'] font-black text-white caret-accent placeholder:text-white/40 focus:outline-none focus:border-accent group transition-all shadow-2xl uppercase tracking-tighter"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              />
              <button
                onClick={onClose}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 min-w-11 h-11 sm:min-w-14 sm:h-14 px-3 sm:px-4 bg-white/12 text-white hover:bg-accent hover:text-black rounded-full flex items-center justify-center gap-2 transition-all border border-white/10"
                aria-label="Close search"
                title="Back"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-[0.2em]">Back</span>
              </button>
            </div>

            {/* Content Results */}
            <div 
              className="relative z-10 custom-scrollbar max-h-[62vh] overflow-y-auto pr-2 sm:pr-4" 
              data-lenis-prevent="true"
              style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {query.length > 0 ? (
                  isEmpty ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-white/20" />
                      </div>
                      <p className="text-2xl font-black font-['Outfit'] text-white uppercase tracking-tighter">No destinations found for "{query}"</p>
                      <p className="text-white/40 font-bold uppercase tracking-widest text-xs mt-2">Try searching for 'Apple', 'Dine', or 'Sales'</p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
                      {/* Brands & Dining Combined Result Feed */}
                      <div className="space-y-12">
                        {results.brands.length > 0 && (
                          <section>
                            <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                               <ShoppingBag className="w-4 h-4" /> Retail Collection
                            </h3>
                            <div className="space-y-3">
                              {results.brands.map(b => (
                                <Link key={b.slug} to={`/brand/${b.slug}`} onClick={onClose} className="group block glass-pane p-6 rounded-[2rem] border border-white/5 hover:border-accent hover:bg-white/5 transition-all">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden">
                                          <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                                       </div>
                                       <div>
                                          <h4 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-accent transition-colors">{b.name}</h4>
                                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{b.floor}</p>
                                       </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </section>
                        )}

                        {results.dine.length > 0 && (
                          <section>
                            <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                               <Utensils className="w-4 h-4" /> Gastronomy
                            </h3>
                            <div className="space-y-3">
                              {results.dine.map(r => (
                                <Link key={r.slug} to={`/brand/${r.slug}`} onClick={onClose} className="group block glass-pane p-6 rounded-[2rem] border border-white/5 hover:border-accent hover:bg-white/5 transition-all">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden">
                                          <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                                       </div>
                                       <div>
                                          <h4 className="text-lg font-black text-white uppercase tracking-tighter group-hover:text-accent transition-colors">{r.name}</h4>
                                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{r.floor}</p>
                                       </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </section>
                        )}
                      </div>

                      {/* Events Results */}
                      {results.events.length > 0 && (
                        <div className="space-y-12">
                          <section>
                            <h3 className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                               <Calendar className="w-4 h-4" /> Live Events
                            </h3>
                            <div className="space-y-6">
                              {results.events.map(e => (
                                <Link key={e.id} to="/events" onClick={onClose} className="group block lighting-card glass-pane p-8 rounded-[2.5rem] border border-white/5 hover:border-accent transition-all relative overflow-hidden">
                                   <div className="relative z-10">
                                      <p className="text-accent text-[8px] font-black tracking-[0.4em] uppercase mb-1">{e.category}</p>
                                      <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-accent transition-colors leading-none">{e.title}</h4>
                                      <div className="flex flex-col gap-2 mb-6 opacity-60">
                                         <p className="text-[10px] font-bold text-white uppercase tracking-widest">{e.date}</p>
                                         <p className="text-[10px] font-bold text-white uppercase tracking-widest">{e.location}</p>
                                      </div>
                                      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-all">
                                         Read Details <ArrowRight className="w-4 h-4" />
                                      </span>
                                   </div>
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </section>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20 opacity-40">
                    <Sparkles className="w-16 h-16 text-accent mb-6 animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white">Interactive Command Center</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
