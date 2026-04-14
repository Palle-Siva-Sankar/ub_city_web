import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, MapPin, ArrowLeft } from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { useUserLocation } from "../hooks/useUserLocation";

export function Shopping() {
  const locationInfo = useUserLocation();
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
        { label: "Calvin Klein", slug: "calvin-klein" },
        { label: "Tommy Hilfiger", slug: "tommy-hilfiger" },
        { label: "BOSS", slug: "boss" },
        { label: "Armani Exchange", slug: "armani-exchange" },
        { label: "Calvin Klein", slug: "calvin-klein" },
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
          { label: "Nykaa Luxe", slug: "nykaa-luxe" },
          { label: "Kiehl's", slug: "kiehls" },
        ],
      },
  ];

  return (
    <div className="page-wrapper bg-page min-h-screen pt-40 transition-colors duration-500 pb-40">
      <section className="px-6 md:px-12 mb-40 hero-readable">
        <div className="max-w-[1500px] mx-auto relative min-h-[70vh] rounded-[5rem] overflow-hidden group shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-[var(--border)]">
          <HeroVideoEmbed
            title="Shopping Hero"
            posterImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2600"
            videoSrc="https://videos.pexels.com/video-files/3249673/3249673-uhd_2560_1440_25fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-page/90 via-page/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 flex flex-col justify-center px-16 md:px-32">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="mb-14">
                         <Link to="/" className="group inline-flex items-center gap-5 px-10 py-4 glass-pane border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-[0.6em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold pointer-events-auto">
                             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-3 transition-transform" /> Back to Home
                         </Link>
                  </div>
                   <div className="inline-flex items-center gap-5 px-8 py-3 rounded-full bg-accent/20 backdrop-blur-3xl border border-accent/40 mb-12 shadow-gold">
                     <Sparkles className="w-5 h-5 text-accent" />
                     <span className="text-[11px] font-black tracking-[0.8em] uppercase text-accent">Shopping Experience</span>
                   </div>
                  <h1 className="text-7xl md:text-[11rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-10 leading-none hero-video-title">
                    Curation <br/><span className="text-gradient">Refined.</span>
                  </h1>
                  <p className="hero-video-subtitle hero-video-glass rounded-[3rem] px-12 py-10 font-medium italic max-w-2xl text-2xl leading-relaxed text-[color:var(--text-dim)] border border-white/5 shadow-2xl">
                    Deploying world-class flagship environments in the heart of Bengaluru's most sophisticated district.
                  </p>
                  
                  <div className="mt-14 flex flex-col md:flex-row items-center gap-8">
                    <div className="inline-flex items-center gap-5 px-10 py-4 rounded-full glass-pane border border-accent/20 text-[12px] font-black uppercase tracking-[0.3em] text-accent shadow-gold">
                      <MapPin className="w-6 h-6 animate-pulse" />
                      <span>
                        {locationInfo.loading ? "Synchronizing..." : `Operating from: ${locationInfo.city}`}
                      </span>
                    </div>
                    {!locationInfo.loading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 px-8 py-3 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-black uppercase tracking-widest text-accent">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                        Secure District Uplink Live
                      </motion.div>
                    )}
                  </div>
              </motion.div>
            </div>
          </div>
      </section>

      <section className="px-6 md:px-12 mb-40 virtual-section">
        <div className="max-w-[1500px] mx-auto">
          <div className="glass-pane lighting-card active-card rounded-[3.5rem] p-8 md:p-14 border border-[var(--border)] shadow-2xl overflow-hidden relative shine-effect compositor-layer">
            <div className="grid lg:grid-cols-[320px_1fr] gap-20 lg:gap-32">
              <aside className="pr-16 hidden lg:block border-r border-[var(--border)]">
                <h3 className="text-accent text-[12px] font-black tracking-[0.8em] uppercase mb-16 flex items-center gap-4">
                   <div className="w-10 h-px bg-accent" /> Filter Core
                </h3>
                <div className="space-y-8">
                  {SHOPPING_CATEGORIES.map((cat) => (
                    <Link key={cat.slug} to={`/shopping/category/${cat.slug}`} className="text-[16px] font-black text-ink-gradient hover:text-accent transition-all flex items-center justify-between group uppercase tracking-[0.2em] opacity-40 hover:opacity-100 italic">
                      {cat.label}
                      <span className="translate-x-[-15px] group-hover:translate-x-0 transition-transform text-accent">→</span>
                    </Link>
                  ))}
                </div>
              </aside>

              <div>
                <div className="text-center mb-20">
                   <p className="text-accent text-[10px] font-black tracking-[0.8em] uppercase mb-6">Strategic Positioning</p>
                   <h2 className="text-4xl md:text-7xl font-['Outfit'] font-black tracking-tighter text-ink-gradient uppercase leading-none">
                     Tier 1 <br/><span className="text-gradient">Ecosystems.</span>
                   </h2>
                </div>

                <div className="space-y-32">
                  {featuredBrandWalls.map((row) => (
                    <div key={row.title} className="border-t border-[var(--border)] pt-24 group/row">
                      <div className="flex items-center gap-10 mb-16">
                         <h3 className="text-3xl md:text-5xl font-['Outfit'] font-black tracking-tighter text-ink-gradient uppercase leading-none italic">
                           {row.title}
                         </h3>
                         <div className="flex-1 h-px bg-[var(--border)] group-hover/row:bg-accent/40 transition-all duration-700" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {row.items.map((item) => (
                          <Link
                            key={`${row.title}-${item.slug}-${item.label}`}
                            to={`/shopping/${item.slug}`}
                             className="glass-pane lighting-card active-card rounded-[2rem] flex flex-col items-center justify-center p-8 text-center hover:border-accent hover:shadow-gold transition-all duration-700 border border-[var(--border)] group/card relative overflow-hidden shine-effect"
                          >
                             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent mb-4 opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">Visit Store</span>
                            <span className="text-xl md:text-2xl font-black font-['Outfit'] uppercase tracking-tight text-ink-gradient group-hover:text-accent transition-colors">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
