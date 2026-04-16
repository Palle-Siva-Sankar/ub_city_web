import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  Sparkles,
  MapPin,
  ArrowLeft,
  ShoppingBag,
  Heart,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { getAllStoreProducts } from "../data/storeCatalog";
import { useUserLocation } from "../hooks/useUserLocation";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { formatUSD } from "../utils/currency";
import { toast } from "sonner";

export function Shopping() {
  const navigate = useNavigate();
  const locationInfo = useUserLocation();
  const [visibleRows, setVisibleRows] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();

  const featuredBrandWalls = [
    {
      title: "Luxury & Couture",
      items: [
        { label: "Gucci", slug: "gucci" },
        { label: "Burberry", slug: "burberry" },
        { label: "Louis Vuitton", slug: "louis-vuitton" },
        { label: "Tiffany & Co.", slug: "tiffany-co" },
      ],
    },
    {
      title: "Contemporary Global",
      items: [
        { label: "BOSS", slug: "boss" },
        { label: "Armani Exchange", slug: "armani-exchange" },
        { label: "Calvin Klein", slug: "calvin-klein-jeans" },
        { label: "Tommy Hilfiger", slug: "tommy-hilfiger" },
      ],
    },
    {
      title: "High-Performance Sport",
      items: [
        { label: "Nike", slug: "nike" },
        { label: "Adidas", slug: "adidas" },
        { label: "Puma", slug: "puma" },
        { label: "Under Armour", slug: "under-armour" },
      ],
    },
    {
      title: "Elite Beauty",
      items: [
        { label: "Sephora", slug: "sephora" },
        { label: "MAC", slug: "mac-cosmetics" },
        { label: "Bluemercury", slug: "bluemercury" },
        { label: "Kiehl's", slug: "kiehls" },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleRows < featuredBrandWalls.length
        ) {
          setVisibleRows((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [visibleRows, featuredBrandWalls.length]);

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pb-40 !pt-0">
      <section className="relative min-h-[100svh] md:h-screen w-full flex flex-col justify-center overflow-hidden hero-readable mb-20 md:mb-40 compositor-layer">
        <HeroVideoEmbed
          title="Shopping Hero"
          posterImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2600"
          videoSrc="https://videos.pexels.com/video-files/3249673/3249673-uhd_2560_1440_25fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-page/90 via-page/40 to-transparent pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-32 max-w-[1800px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8 md:mb-14">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-5 px-8 md:px-10 py-3 md:py-4 glass-pane border border-accent/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-on-accent transition-all shadow-gold pointer-events-auto"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-3 transition-transform" />{" "}
                Back to Nexus
              </button>
            </div>
            <div className="inline-flex items-center gap-3 md:gap-5 px-6 md:px-8 py-2 md:py-3 rounded-full bg-accent/20 backdrop-blur-3xl border border-accent/40 mb-8 md:mb-12 shadow-gold gpu-accelerated">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="text-[10px] md:text-[11px] font-black tracking-[0.6em] md:tracking-[0.8em] uppercase text-accent">
                Retail Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-['Outfit'] mb-6 md:mb-8 tracking-tighter leading-none text-[var(--text-main)] uppercase hero-video-title">
              The <span className="text-gradient">Storefronts.</span>
            </h1>
            <p className="hero-video-subtitle hero-video-glass rounded-[1.5rem] md:rounded-[2.5rem] px-6 md:px-10 py-5 md:py-8 font-medium italic max-w-2xl text-base md:text-xl leading-relaxed text-[color:var(--text-dim)] border border-white/5 shadow-2xl">
              Discover world-class labels and exclusive seasonal collections at
              North America's premier shopping destination.
            </p>

            <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-location"))
                }
                className="inline-flex items-center gap-4 md:gap-5 px-8 md:px-10 py-3 md:py-4 rounded-full glass-pane border border-accent/20 text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-accent hover:border-accent hover:text-white transition-all active:scale-95 group/loc shadow-gold"
              >
                <MapPin className="w-5 h-5 md:w-6 md:h-6 group-hover/loc:animate-bounce" />
                <span>
                  {locationInfo.loading
                    ? "Locating..."
                    : `Explore ${locationInfo.city}`}
                </span>
              </button>
              {!locationInfo.loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 px-8 py-3 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-black uppercase tracking-widest text-accent gpu-accelerated"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                  Live Store Availability
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-40 virtual-section">
        <div className="max-w-[1500px] mx-auto">
          <div className="glass-pane lighting-card active-card rounded-3xl p-6 md:p-10 border border-[var(--border)] shadow-2xl overflow-hidden relative shine-effect compositor-layer gpu-accelerated">
            <div className="grid lg:grid-cols-[320px_1fr] gap-20 lg:gap-32">
              <aside className="pr-16 hidden lg:block border-r border-[var(--border)]">
                <h3 className="text-accent text-[11px] font-black tracking-[0.8em] uppercase mb-12 flex items-center gap-4">
                  <div className="w-8 h-px bg-accent" /> Categories
                </h3>
                <div className="space-y-8">
                  {SHOPPING_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/shopping/category/${cat.slug}`}
                      className="text-[16px] font-black text-ink-gradient hover:text-accent transition-all flex items-center justify-between group uppercase tracking-[0.2em] opacity-80 hover:opacity-100 italic"
                    >
                      {cat.label}
                      <span className="translate-x-[-15px] group-hover:translate-x-0 transition-transform text-accent">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>

              <div>
                <div className="text-center mb-16">
                  <p className="text-accent text-[9px] font-black tracking-[0.8em] uppercase mb-5">
                    Our Brands
                  </p>
                  <h2 className="text-3xl md:text-5xl font-['Outfit'] font-black tracking-tighter text-[var(--text-main)] uppercase leading-none">
                    Curated <br />
                    <span className="text-gradient">Experiences.</span>
                  </h2>
                </div>

                <div className="space-y-20 md:space-y-24 section-optimize">
                  {featuredBrandWalls.slice(0, visibleRows).map((row) => (
                    <div
                      key={row.title}
                      className="border-t border-[var(--border)] pt-12 md:pt-16 group/row"
                    >
                      <div className="flex items-center gap-6 md:gap-8 mb-10 md:mb-12">
                        <h3 className="text-xl md:text-3xl font-['Outfit'] font-black tracking-tighter text-[var(--text-main)] uppercase leading-none italic">
                          {row.title}
                        </h3>
                        <div className="flex-1 h-px bg-[var(--border)] group-hover/row:bg-accent/40 transition-all duration-700" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                        {row.items.map((item, idx) => (
                          <div
                            key={`${row.title}-${item.slug}-${item.label}-${idx}`}
                            className="scroll-reveal-luxe flex flex-col gap-4 gpu-accelerated"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            <Link
                              to={`/shopping/${item.slug}`}
                              className="glass-pane active-card rounded-[2rem] flex flex-col items-center justify-center p-10 h-full text-center hover:border-accent hover:shadow-gold transition-all duration-700 border border-[var(--border)] group/card relative overflow-hidden min-h-[160px]"
                            >
                              <span className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10 pointer-events-none" />
                              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[var(--text-main)] mb-4 opacity-0 group-hover/card:opacity-100 transition-all translate-y-3 group-hover/card:translate-y-0 z-20 relative">
                                Visit Store
                              </span>
                              <h3 className="text-xl md:text-2xl font-black font-['Outfit'] uppercase tracking-tighter text-[var(--text-main)] z-20 relative group-hover/card:text-accent transition-colors !opacity-100">
                                {item.label}
                              </h3>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Virtualization Trigger */}
                  {visibleRows < featuredBrandWalls.length && (
                    <div
                      ref={observerRef}
                      className="h-20 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Dine Card Style) */}
      <section className="py-24 px-6 md:px-12 border-t border-[var(--border)] bg-page-bg-alt/20 virtual-section compositor-layer">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <p className="text-accent text-[9px] font-black tracking-[0.5em] uppercase mb-4 flex items-center gap-4">
                <div className="w-8 h-px bg-accent" /> Exclusive Selection
              </p>
              <h2 className="text-3xl md:text-6xl font-black font-['Outfit'] tracking-tighter text-ink-gradient uppercase leading-none">
                Featured <span className="text-gradient">Collections.</span>
              </h2>
            </div>
            <Link
              to="/shopping/category/all"
              className="group inline-flex items-center gap-4 text-accent text-[11px] font-black uppercase tracking-[0.4em] hover:gap-6 transition-all mb-4"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 section-optimize">
            {getAllStoreProducts()
              .slice(0, 8)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.8 }}
                  className="glass-pane lighting-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-[var(--border)] group hover:border-accent hover:shadow-gold transition-all duration-700 bg-[color:var(--page-bg-alt)]/80 gpu-accelerated"
                >
                  <Link
                    to={`/shopping/product/${product.id}`}
                    className="block flex-1 group/link"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/link:scale-110 transition-transform duration-1000"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-accent/90 text-on-accent px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        New Arrival
                      </div>
                    </div>
                    <div className="p-5 pb-0">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-accent mb-2 font-black opacity-70">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-black text-[var(--text-main)] leading-tight uppercase tracking-tighter mb-2 group-hover/link:text-accent transition-colors !opacity-100">
                        {product.name}
                      </h3>
                      <p className="text-[color:var(--text-dim)] text-[11px] font-medium mb-4 line-clamp-2 leading-relaxed opacity-80">
                        {product.description}
                      </p>
                      <span className="text-accent font-black text-xl tracking-tighter mb-4 block">
                        {formatUSD(product.price)}
                      </span>
                    </div>
                  </Link>
                  <div className="p-6 pt-0 mt-auto">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => toggle(product.id)}
                        className="rounded-2xl py-3.5 glass-pane border border-[var(--border)] inline-flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all active:scale-95"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${wishlist.includes(product.id) ? "text-accent fill-accent" : ""}`}
                        />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.name} added to cart`);
                        }}
                        className="rounded-2xl py-3.5 bg-accent text-[var(--btn-text-on-accent)] inline-flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-gold"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
