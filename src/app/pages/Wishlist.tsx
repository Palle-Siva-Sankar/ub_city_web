import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Heart, ArrowRight, MapPin, Search } from "lucide-react";
import { useWishlist } from "../hooks/useFeatures";
import { BRANDS, RESTAURANTS, Brand, Restaurant } from "../data/mallData";

export function Wishlist() {
  const { wishlist, toggle } = useWishlist();

  // Combine data to find wishlisted items
  const savedItems: (Brand | Restaurant)[] = [
    ...BRANDS,
    ...RESTAURANTS
  ].filter(item => wishlist.includes(item.slug));

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      {/* Hero */}
      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-red-500/10 border border-red-500/20 mb-10 shadow-gold rotate-3">
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">
              Your <span className="text-red-500">Selection.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium max-w-3xl mx-auto italic leading-relaxed">
              A private catalog of your favorite UB City destinations. Curated by you, secured for your next executive visit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-40 px-6 md:px-12 min-h-[50vh]">
        <div className="max-w-[1400px] mx-auto">
          {savedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
              <AnimatePresence mode="popLayout">
                {savedItems.map((item) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-pane lighting-card group relative rounded-[3.5rem] overflow-hidden border border-[var(--border)] hover:border-red-500/30 transition-all duration-700 shadow-sm"
                  >
                    <div className="aspect-[16/11] overflow-hidden grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="p-10">
                      <div className="flex items-start justify-between mb-8">
                        <div>
                           <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight leading-none">{item.name}</h3>
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
                             <MapPin className="w-4 h-4" /> {item.floor}
                           </div>
                        </div>
                        <button 
                          onClick={() => toggle(item.slug)}
                          className="w-14 h-14 rounded-full glass-pane flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all shadow-gold"
                        >
                          <Heart className="w-6 h-6 fill-current" />
                        </button>
                      </div>

                      <p className="text-sm font-medium text-[color:var(--text-dim)] leading-relaxed mb-10 h-12 line-clamp-2 italic">
                        "{item.description}"
                      </p>

                      <Link 
                        to={`/brand/${item.slug}`}
                        className="btn-luxe w-full py-5 flex items-center justify-center gap-4 text-[10px]"
                      >
                        Explore Sanctuary <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center py-32 glass-pane lighting-card rounded-[4rem] border border-dashed border-[var(--border)] border-2 max-w-2xl mx-auto shadow-2xl"
            >
              <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-accent/10">
                 <Search className="w-12 h-12 text-accent opacity-30" />
              </div>
              <h3 className="text-4xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tighter leading-none">Catalog Dormant</h3>
              <p className="text-[color:var(--text-dim)] text-lg font-medium mb-12 px-16 leading-relaxed">Your private selections are currently vacant. Discover the directory to secure your favorites.</p>
              <Link to="/shopping" className="btn-luxe px-16 py-6 inline-flex uppercase">
                Browse Discovery
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

