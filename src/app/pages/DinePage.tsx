import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Clock, MapPin, History, UtensilsCrossed, Heart, ShoppingCart } from "lucide-react";
import { RESTAURANTS } from "../data/mallData";
import { DINING_VARIETIES } from "../data/diningData";
import { useCart, useRecentlyViewed, useWishlist } from "../hooks/useFeatures";
import { useUserLocation } from "../hooks/useUserLocation";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { toast } from "sonner";
import { formatINR } from "../utils/currency";
import { useState, useEffect, useRef } from "react";

export function Dine() {
  const [visibleCount, setVisibleCount] = useState(6);
  const observerRef = useRef<HTMLDivElement>(null);
  const { recent } = useRecentlyViewed();
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();
  const locationInfo = useUserLocation();
  const addDiningItemToCart = (item: (typeof DINING_VARIETIES)[number]) => {
    addToCart({
      id: `dine-${item.slug}`,
      storeSlug: "dining",
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.cuisine.toLowerCase().replace(/\s+/g, "-"),
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200";
  };

  // Get recently viewed dining items specifically
  const recentlyViewedDine = RESTAURANTS.filter(r => recent.includes(r.slug))
    .sort((a, b) => recent.indexOf(b.slug) - recent.indexOf(a.slug))
    .slice(0, 5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < RESTAURANTS.length) {
          setVisibleCount(prev => prev + 6);
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="Dining Hero Video"
          posterImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000"
          videoSrc="/videos/dining-hero.mp4"
        />
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-8 mx-auto group hover:bg-accent hover:text-[var(--btn-text-on-accent)] transition-all">
               <UtensilsCrossed className="w-4 h-4" />
               <span className="text-[11px] font-black tracking-[0.4em] uppercase hero-video-kicker">World-Class Gastronomy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-black font-['Outfit'] hero-video-title mb-6 uppercase tracking-tighter leading-none text-ink-gradient">
              Dine <span className="text-gradient">& Savour.</span>
            </h1>
            <p className="text-xl hero-video-subtitle font-medium max-w-2xl mx-auto leading-relaxed hero-video-glass p-6 rounded-3xl text-[color:var(--text-dim)]">
              From chef-led dining rooms to artisanal patisseries, {RESTAURANTS.length} culinary destinations await at UB City.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-location'))}
              className="location-pill mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black text-accent hover:text-white glass-pane border border-accent/20 hover:border-accent transition-all active:scale-95 group/loc"
            >
              <MapPin className="w-4 h-4 text-accent group-hover/loc:animate-bounce" />
              {locationInfo.loading ? "Detecting location..." : `Dining near ${locationInfo.city}`}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-24 px-6 md:px-12 bg-page relative virtual-section">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {RESTAURANTS.slice(0, visibleCount).map((restaurant, i) => (
              <motion.div
                key={restaurant.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1, margin: "-10px" }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
              >
                <Link
                  to={`/brand/${restaurant.slug}`}
                  className="group block glass-pane lighting-card rounded-[3.5rem] overflow-hidden border border-[var(--border)] hover:border-accent transition-all duration-700 h-full"
                >

                  <div className="aspect-[16/11] overflow-hidden relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-page via-page/40 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                      <div className="inline-flex px-4 py-1.5 rounded-full bg-accent text-[10px] font-black text-[var(--btn-text-on-accent)] uppercase tracking-widest mb-4">
                         Fine Dining
                      </div>
                      <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">{restaurant.name}</h3>
                    </div>
                  </div>
                  <div className="p-10">
                    <p className="text-[color:var(--text-dim)] font-medium text-lg leading-relaxed mb-10 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-8 text-[11px] font-black tracking-[0.15em] text-[color:var(--text-dim)] uppercase border-y border-[var(--border)] py-6 mb-10">
                      <span className="flex items-center gap-2 group-hover:text-accent transition-colors"><MapPin className="w-5 h-5 text-accent" /> {restaurant.floor}</span>
                      <span className="flex items-center gap-2 group-hover:text-accent transition-colors"><Clock className="w-5 h-5 text-accent" /> {restaurant.hours.split(",")[0]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">View Menu & Details</span>
                       <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:text-[var(--btn-text-on-accent)] transition-all">
                        <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Virtualization Sentinel */}
          {visibleCount < RESTAURANTS.length && (
            <div ref={observerRef} className="h-40 flex items-center justify-center">
               <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
            </div>
          )}
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-page-bg-alt/20 border-t border-[var(--border)] virtual-section">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 relative z-10">
            <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4">Chef's Recommendations</p>
            <h2 className="text-5xl md:text-8xl font-black font-['Outfit'] tracking-tighter text-ink-gradient uppercase leading-none">
              Order <span className="text-gradient">Favorites.</span>
            </h2>
          </div>
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
            <div 
              className="absolute inset-x-0 top-0 h-[1000px] bg-cover bg-center blur-[100px]"
              style={{ backgroundImage: `url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000)` }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 section-optimize">
            {DINING_VARIETIES.map((item, index) => (
              <div
                key={item.slug}
                className="scroll-reveal-luxe"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="glass-pane lighting-card rounded-[2.5rem] overflow-hidden block h-full border border-[var(--border)] p-4 group">
                  <div className="rounded-[2rem] overflow-hidden mb-6 relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async" onError={handleImageError} />
                    <div className="absolute top-4 right-4 bg-accent/90 text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.prepTime}</div>
                  </div>
                  <div className="px-2 pb-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 font-black">{item.cuisine}</p>
                    <h3 className="text-xl font-black text-ink-gradient leading-tight uppercase tracking-tight mb-3">{item.name}</h3>
                    <p className="text-[color:var(--text-dim)] text-sm font-medium mb-6 line-clamp-2 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-accent font-black text-xl tracking-tighter">{formatINR(item.price * 83)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => toggle(`dine-${item.slug}`)}
                        className="rounded-2xl py-4 glass-pane border border-[var(--border)] inline-flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all active:scale-95"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(`dine-${item.slug}`) ? "text-accent fill-accent" : ""}`} />
                        Save
                      </button>
                      <button
                        onClick={() => addDiningItemToCart(item)}
                        className="rounded-2xl py-4 bg-accent text-[var(--btn-text-on-accent)] inline-flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-gold"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedDine.length > 0 && (
        <section className="py-32 border-t border-[var(--border)] bg-page virtual-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex items-center gap-8 mb-20">
               <div className="w-16 h-16 rounded-[1.5rem] bg-accent/20 border border-accent/30 flex items-center justify-center shadow-gold">
                  <History className="w-8 h-8 text-accent" />
               </div>
               <div>
                 <p className="text-[10px] font-black tracking-[0.6em] uppercase text-accent mb-2">Stay Inspired</p>
                 <h2 className="text-4xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">Your Recent Visits</h2>
               </div>
            </div>
            <div className="flex gap-10 overflow-x-auto pb-12 no-scrollbar px-2">
              {recentlyViewedDine.map((item) => (
                <Link key={item.slug} to={`/brand/${item.slug}`} className="flex-shrink-0 w-80 glass-pane lighting-card p-6 rounded-[3rem] border border-[var(--border)] hover:border-accent transition-all h-full group">
                   <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" decoding="async" onError={handleImageError} />
                      <div className="absolute inset-0 bg-page/20" />
                   </div>
                   <h4 className="text-3xl font-black text-ink-gradient mb-4 uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">{item.name}</h4>
                   <p className="text-[10px] text-accent font-black uppercase tracking-[0.4em] flex items-center gap-3">
                     <MapPin className="w-5 h-5" /> {item.floor}
                   </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>

  );
}




