import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import moaLuxury from "../../assets/images/moa-luxury.png";
import moaAerial from "../../assets/images/moa-aerial.png";
import { VIDEOS } from "../data/mediaAssets";

export function Luxury() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Tesla/Apple style parallax scale effects for the deep dive section
  const opacityProduct1 = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const opacityText1 = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 1, 0]);
  
  const opacityProduct2 = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);
  const opacityText2 = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 1, 0]);

  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      {/* REAL CINEMATIC VIDEO HERO */}
      <section className="relative min-h-[76vh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Luxury Hero Video"
          posterImage={moaLuxury}
          videoSrc={VIDEOS.fashion}
          slideImages={[
            moaLuxury,
            moaAerial,
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2200",
          ]}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <div className="mb-12">
               <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mx-auto pointer-events-auto">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Nexus
               </Link>
            </div>
            <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-8 shadow-2xl">The Luxury Collection</p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-['Outfit'] mb-8 leading-none text-ink-gradient tracking-tighter uppercase drop-shadow-2xl">
              Absolute<br /><span className="text-gradient">Sovereignty.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium max-w-3xl mx-auto leading-relaxed mb-12">
              The destination operates not just as a shopping district, but as a sovereign luxury ecosystem—a small city where the world’s most elite brands converge.
            </p>
            <div className="pointer-events-auto flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#deep-dive" className="btn-luxe px-12">
                Explore The Sector
              </a>
              <Link to="/strategy" className="hero-cta-secondary px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-[var(--border)] hover:bg-white/10 flex items-center justify-center gap-3">
                Strategic Deck <ArrowRight className="w-4 h-4 text-accent" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* APPLE STYLE BRAND / PRODUCT DEEP DIVE */}
      <section id="deep-dive" ref={containerRef} className="relative h-[190vh] lg:h-[250vh] bg-page">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-page">
          
          {/* PRODUCT 1: Louis Vuitton Flagship */}
          <motion.div className="absolute inset-0 flex items-center justify-between px-10 md:px-32" style={{ opacity: opacityProduct1 }}>
            <div className="w-1/2 h-[60vh] relative hidden md:block">

            </div>

            <motion.div style={{ opacity: opacityText1 }} className="md:w-1/2 flex flex-col items-start text-left pl-0 md:pl-20">
              <p className="font-black uppercase tracking-[0.4em] text-[10px] mb-4 text-accent">Maison Louis Vuitton</p>
              <h2 className="text-5xl md:text-8xl font-black font-['Outfit'] text-ink-gradient mb-8 uppercase tracking-tighter leading-none">Art of Travel.<br/>Perfected Here.</h2>
              <div className="glass-pane rounded-[3rem] p-10 max-w-lg pointer-events-auto border border-[var(--border)]">
                <p className="text-[color:var(--text-dim)] text-lg leading-relaxed mb-10 font-medium">Experience the largest LV flagship in the Midwest. Featuring exclusive leather goods salons, private bespoke tailoring suites, and VIP entrances right from the valet.</p>
                <Link to="/opportunity/flagship-anchor" className="text-accent text-[10px] font-black tracking-widest border-b-2 border-accent hover:opacity-50 transition-colors uppercase pb-2">
                  Request Luxury Leasing Deck
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* PRODUCT 2: Tesla Showroom Spotlight */}
          <motion.div className="absolute inset-0 flex flex-row-reverse items-center justify-between px-10 md:px-32" style={{ opacity: opacityProduct2 }}>
            <div className="w-1/2 h-[60vh] relative hidden md:flex items-center justify-center">
               <img src={moaLuxury} alt="Tesla" className="w-[80%] h-[80%] object-cover rounded-[3.5rem] shadow-2xl mix-blend-multiply dark:mix-blend-screen opacity-80" />
            </div>

            <motion.div style={{ opacity: opacityText2 }} className="md:w-1/2 flex flex-col items-start text-left pr-0 md:pr-20">
              <p className="font-black uppercase tracking-[0.4em] text-[10px] mb-4 text-accent">Tesla Design Studio</p>
              <h2 className="text-5xl md:text-8xl font-black font-['Outfit'] text-ink-gradient mb-8 uppercase tracking-tighter leading-none">The Future.<br/>In Showroom.</h2>
              <div className="glass-pane rounded-[3rem] p-10 max-w-lg pointer-events-auto border border-[var(--border)]">
                <p className="text-[color:var(--text-dim)] text-lg leading-relaxed mb-10 font-medium">Not just a showroom. An experiential gallery where high-intent visitors engage with premium design, innovation, and craft—right in the CBD.</p>
                <Link to="/opportunity/sponsorship-signature" className="text-accent text-[10px] font-black tracking-widest border-b-2 border-accent hover:opacity-50 transition-colors uppercase pb-2">
                  Request Brand Partnership Deck
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GLASSMORPHIC FEATURES GRID */}
      <section className="py-40 px-6 md:px-12 bg-page relative z-20 border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Bespoke Architecture", desc: "Italian marble, custom glass facades, and tailored lighting for absolute brand purity.", to: "/opportunity/bespoke-architecture" },
              { title: "VIP Concierge", desc: "Private styling suites, valet, and a dedicated high-net-worth individual support team.", to: "/opportunity/vip-concierge" },
              { title: "Unmatched Exclusivity", desc: "Hermetically curated adjacencies ensuring your brand sits among true peers.", to: "/opportunity/unmatched-exclusivity" }
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative">
                <Link to={f.to} className="glass-pane active-card lighting-card rounded-[3.5rem] p-12 block h-full border border-[var(--border)] group-hover:border-accent transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-40 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                    <Sparkles className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60">Luxury Protocol</p>
                  <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-8 leading-none group-hover:text-accent transition-colors">{f.title}</h3>
                  <p className="text-[color:var(--text-dim)] text-xs font-black uppercase tracking-[0.2em] leading-relaxed mb-12 opacity-80 group-hover:opacity-100">{f.desc}</p>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-accent uppercase tracking-widest border-b border-accent/30 pb-1">Establish Protocol</span>
                     <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform" />
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent group-hover:w-full transition-all duration-700" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

