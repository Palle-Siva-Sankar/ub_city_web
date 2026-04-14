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

export function Dine() {
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

  return (
    <div className="page-wrapper bg-page min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="Dining Hero Video"
          posterImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000"
          videoSrc="/videos/dining-hero.mp4"
        />
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-8 mx-auto group hover:bg-white/10 transition-colors">
               <UtensilsCrossed className="w-4 h-4 text-accent" />
               <span className="text-[11px] font-black tracking-[0.4em] uppercase hero-video-kicker">World-Class Gastronomy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-black font-['Outfit'] hero-video-title mb-6 uppercase tracking-tighter leading-[0.95] md:leading-none">
              Dine <span className="text-gradient">& Savour.</span>
            </h1>
            <p className="text-xl hero-video-subtitle font-light max-w-2xl mx-auto leading-relaxed hero-video-glass p-4 rounded-2xl">
              From chef-led dining rooms to artisanal patisseries, {RESTAURANTS.length} culinary destinations await at UB City.
            </p>
            <div className="location-pill mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs">
              <MapPin className="w-4 h-4 text-accent" />
              {locationInfo.loading ? "Detecting your dining location..." : `Dining offers near ${locationInfo.city}, ${locationInfo.region}`}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-page relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {RESTAURANTS.map((restaurant, i) => (
              <motion.div
                key={restaurant.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
              >
                <Link
                  to={`/brand/${restaurant.slug}`}
                  className="group block glass-pane lighting-card rounded-[3rem] overflow-hidden border border-[var(--glass-border)] hover:border-accent/40 transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 h-full"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-10">
                      <div className="inline-flex px-3 py-1 rounded-full bg-accent text-[9px] font-black text-black uppercase tracking-widest mb-3">
                         Fine Dining
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-['Outfit'] text-white uppercase tracking-tighter group-hover:text-accent transition-colors">{restaurant.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7 md:p-10">
                    <p className="text-page-text-muted font-light text-sm sm:text-base line-clamp-3 leading-relaxed mb-6 md:mb-10 h-18 opacity-80 group-hover:opacity-100 transition-opacity">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-black tracking-[0.12em] sm:tracking-[0.15em] text-page/50 uppercase border-y border-[var(--border)] py-4 sm:py-6 mb-6 sm:mb-8">
                      <span className="flex items-center gap-2 group-hover:text-accent transition-colors"><MapPin className="w-5 h-5 text-accent" /> {restaurant.floor}</span>
                      <span className="flex items-center gap-2 group-hover:text-accent transition-colors"><Clock className="w-5 h-5 text-accent" /> {restaurant.hours.split(",")[0]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Reserve & Explore</span>
                       <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
                        <ArrowRight className="w-5 h-5" />
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-page-bg-alt/40">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-3">20 Curated Varieties</p>
            <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] tracking-tighter text-ink-gradient">
              Order Dining Favorites
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DINING_VARIETIES.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link to={`/dine/menu/${item.slug}`} className="glass-pane lighting-card rounded-[2rem] overflow-hidden block h-full">

                  <img src={item.image} alt={item.name} className="w-full h-44 object-cover" loading="lazy" decoding="async" onError={handleImageError} />
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{item.cuisine}</p>
                    <h3 className="text-lg font-black card-title-contrast leading-tight">{item.name}</h3>
                    <p className="card-text-contrast text-sm mt-2 line-clamp-2">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-accent font-black">{formatINR(item.price * 83)}</span>
                      <span className="text-[11px] text-[color:var(--text-dim)]">{item.prepTime}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          toggle(`dine-${item.slug}`);
                        }}
                        className="rounded-xl py-2 border border-white/10 bg-white/5 inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.12em]"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(`dine-${item.slug}`) ? "text-accent fill-accent" : "text-[color:var(--text-dim)]"}`} />
                        Wishlist
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          addDiningItemToCart(item);
                        }}
                        className="rounded-xl py-2 bg-accent text-black inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.12em]"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewedDine.length > 0 && (
        <section className="py-24 border-t border-[var(--border)] bg-page-bg-alt relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
            <div className="flex items-center gap-5 mb-16">
               <div className="w-14 h-14 rounded-[1.25rem] bg-accent/10 border border-accent/20 flex items-center justify-center shadow-xl">
                  <History className="w-7 h-7 text-accent" />
               </div>
               <div>
                 <p className="text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-1">Stay Inspired</p>
                 <h2 className="text-4xl font-black font-['Outfit'] text-page uppercase tracking-tighter">Your Recent Visits</h2>
               </div>
            </div>
            <div className="flex gap-10 overflow-x-auto pb-12 scrollbar-hide px-2">
              {recentlyViewedDine.map((item) => (
                <Link key={item.slug} to={`/brand/${item.slug}`} className="flex-shrink-0 w-80 glass-pane lighting-card p-6 rounded-[3rem] border border-[var(--border)] hover:border-accent/40 transition-all hover:shadow-2xl">
                   <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" onError={handleImageError} />
                   </div>
                   <h4 className="text-2xl font-black text-page mb-3 uppercase tracking-tighter">{item.name}</h4>
                   <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <MapPin className="w-4 h-4" /> {item.floor}
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

