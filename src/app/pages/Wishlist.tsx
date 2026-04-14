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
    <div className="page-wrapper bg-page">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-['Outfit'] text-page mb-6">
              My <span className="text-red-500">Wishlist</span>
            </h1>
            <p className="text-xl text-muted-custom font-light max-w-2xl mx-auto">
              Your curated collection of favorite stores and dining destinations at UB City. Saved for your next visit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-6 md:px-10 min-h-[40vh]">
        <div className="max-w-[1400px] mx-auto">
          {savedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {savedItems.map((item) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="glass-pane group relative rounded-[2.5rem] overflow-hidden border border-[var(--glass-border)] hover:border-red-500/30 transition-all duration-500"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                           <h3 className="text-2xl font-bold font-['Outfit'] text-page mb-1 group-hover:text-red-500 transition-colors uppercase tracking-tight">{item.name}</h3>
                           <div className="flex items-center gap-2 text-xs text-muted-custom font-medium">
                             <MapPin className="w-3 h-3 text-red-500" /> {item.floor}
                           </div>
                        </div>
                        <button 
                          onClick={() => toggle(item.slug)}
                          className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>

                      <p className="text-sm text-page/60 line-clamp-2 font-light leading-relaxed mb-8 h-10">
                        {item.description}
                      </p>

                      <Link 
                        to={`/brand/${item.slug}`}
                        className="flex items-center justify-between w-full p-4 bg-page/50 border border-[var(--border)] rounded-2xl text-xs font-bold tracking-widest uppercase text-page hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        Explore Store <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20 glass-pane rounded-[3rem] border border-dashed border-[var(--border)] max-w-lg mx-auto"
            >
              <div className="w-20 h-20 bg-page/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search className="w-8 h-8 text-page opacity-20" />
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-page mb-4">Your wishlist is empty</h3>
              <p className="text-muted-custom mb-8 px-10">Start saving your favorite brands and restaurants while exploring the directory.</p>
              <Link to="/shopping" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-[var(--btn-text-on-accent)] font-bold tracking-widest uppercase text-xs rounded-full hover:scale-105 transition-all">
                Browse Directory
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

