import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

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
    <div className="page-wrapper">
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
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-page text-xs tracking-[0.5em] font-bold mb-6 uppercase drop-shadow-md">The Luxury Collection</p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-['Outfit'] mb-6 leading-[0.9] text-page drop-shadow-2xl">
              Absolute<br /><span className="text-gold-gradient">Sovereignty.</span>
            </h1>
            <p className="text-lg md:text-2xl text-page drop-shadow-lg mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              The destination operates not just as a shopping district, but as a sovereign luxury ecosystem—a small city where the world’s most elite brands converge.
            </p>
            <div className="pointer-events-auto flex gap-4 justify-center">
              <a href="#deep-dive" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-sm font-semibold bg-page text-page border border-[var(--border)] rounded-full hover:scale-105 transition-all duration-500 hover:border-accent shadow-2xl">
                Explore The Sector <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/strategy" className="hidden md:inline-flex items-center justify-center gap-2 px-10 py-5 text-sm font-semibold bg-transparent text-page border border-page rounded-full hover:bg-page hover:text-black transition-all duration-500 shadow-2xl">
                View Strategy Deck
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* APPLE STYLE BRAND / PRODUCT DEEP DIVE */}
      <section id="deep-dive" ref={containerRef} className="relative h-[190vh] lg:h-[250vh] bg-page">
        <div className="sticky-presentation bg-page-alt">
          
          {/* PRODUCT 1: Louis Vuitton Flagship */}
          <motion.div className="absolute inset-0 flex items-center justify-between px-10 md:px-32" style={{ opacity: opacityProduct1 }}>
            <div className="w-1/2 h-[60vh] relative hidden md:block">

            </div>

            <motion.div style={{ opacity: opacityText1 }} className="md:w-1/2 flex flex-col items-start text-left pl-0 md:pl-20">
              <p className="font-semibold uppercase tracking-[0.4em] text-sm mb-4 text-page opacity-70">Maison Louis Vuitton</p>
              <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6">Art of Travel.<br/>Perfected Here.</h2>
              <div className="glass-pane rounded-3xl p-8 max-w-md pointer-events-auto shadow-2xl border-[var(--border)]">
                <p className="text-page opacity-80 text-base leading-relaxed mb-6 font-light">Experience the largest LV flagship in the Midwest. Featuring exclusive leather goods salons, private bespoke tailoring suites, and VIP entrances right from the valet.</p>
                <Link to="/opportunity/flagship-anchor" className="text-page text-sm font-bold tracking-wider border-b-2 border-page hover:opacity-50 transition-colors uppercase pb-1">
                  Request Luxury Leasing Deck
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* PRODUCT 2: Tesla Showroom Spotlight */}
          <motion.div className="absolute inset-0 flex flex-row-reverse items-center justify-between px-10 md:px-32" style={{ opacity: opacityProduct2 }}>
            <div className="w-1/2 h-[60vh] relative hidden md:flex items-center justify-center">
               <img src={moaLuxury} alt="Tesla" className="w-[80%] h-[80%] object-cover rounded-[3rem] shadow-2xl mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <motion.div style={{ opacity: opacityText2 }} className="md:w-1/2 flex flex-col items-start text-left pr-0 md:pr-20">
              <p className="font-semibold uppercase tracking-[0.4em] text-sm mb-4 text-page opacity-70">Tesla Design Studio</p>
              <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6 tracking-tight">The Future.<br/>In Showroom.</h2>
              <div className="glass-pane rounded-3xl p-8 max-w-md pointer-events-auto shadow-2xl">
                <p className="text-page opacity-80 text-base leading-relaxed mb-6 font-light">Not just a showroom. An experiential gallery where high-intent visitors engage with premium design, innovation, and craft—right in the CBD.</p>
                <Link to="/opportunity/sponsorship-signature" className="text-page text-sm font-bold tracking-wider border-b-2 border-page hover:opacity-50 transition-colors uppercase pb-1">
                  Request Brand Partnership Deck
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GLASSMORPHIC FEATURES GRID */}
      <section className="py-32 px-6 md:px-10 bg-page relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Bespoke Architecture", desc: "Italian marble, custom glass facades, and tailored lighting for absolute brand purity." },
              { title: "VIP Concierge", desc: "Private styling suites, valet, and a dedicated high-net-worth individual support team." },
              { title: "Unmatched Exclusivity", desc: "Hermetically curated adjacencies ensuring your brand sits among true peers." }
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                className="glass-pane glass-pane-hover group relative overflow-hidden rounded-[2rem] p-10 transition-all duration-700">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                  <Sparkles className="w-8 h-8 text-page opacity-30" />
                </div>
                <h3 className="text-2xl font-['Outfit'] font-bold text-page mb-4">{f.title}</h3>
                <p className="text-page opacity-60 leading-relaxed font-light">{f.desc}</p>
                <div className="mt-8 h-1 w-12 bg-page opacity-20 group-hover:w-full group-hover:opacity-100 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

