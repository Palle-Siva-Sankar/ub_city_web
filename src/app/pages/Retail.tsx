import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { Building2, Store, Zap } from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import moaLuxury from "../../assets/images/moa-luxury.png";
import moaAerial from "../../assets/images/moa-aerial.png";
import { VIDEOS } from "../data/mediaAssets";

export function Retail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 1.15]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.33], [0, 1, 0]);

  const scale2 = useTransform(scrollYProgress, [0.33, 0.66], [1, 1.15]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.45, 0.66], [0, 1, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.66, 0.85, 1], [0, 1, 1]);

  return (
    <div className="page-wrapper">
      {/* HERO CINEMATIC (Video-first) */}
      <section className="relative min-h-[72vh] md:h-[82vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Retail Hero Video"
          posterImage={moaAerial}
          videoSrc={VIDEOS.shoppingMall}
          slideImages={[
            moaAerial,
            moaLuxury,
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2200",
          ]}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="text-6xl md:text-8xl font-bold font-['Outfit'] text-page mb-6 drop-shadow-2xl">
            Retail <span className="text-gold-gradient">Redefined.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-xl text-page max-w-2xl mx-auto font-light drop-shadow-md">
            A premium, high-intent retail environment in the heart of Bengaluru’s CBD—built for flagships, boutiques, and category leaders.
          </motion.p>
        </div>
      </section>

      {/* APPLE STYLE SCROLL PRESENTATION FOR LEASING PATHS */}
      <section ref={containerRef} className="relative h-[280vh] lg:h-[360vh] bg-page">
        <div className="sticky-presentation bg-page overflow-hidden">
          
          {/* Flagship Anchors */}
          <motion.div className="absolute inset-0 w-full h-full" style={{ opacity: useTransform(scrollYProgress, [0, 0.33, 0.34], [1, 1, 0]) }}>
            <motion.img style={{ scale: scale1 }} src={moaAerial} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div style={{ opacity: opacity1 }} className="max-w-2xl text-left px-6">
                <div className="glass-pane p-12 rounded-[3rem] shadow-2xl pointer-events-auto">
                  <Building2 className="w-16 h-16 text-accent mb-8" />
                  <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6">Flagship<br/>Anchors</h2>
                  <p className="text-xl font-bold text-accent mb-6 uppercase tracking-widest">50,000 – 200,000+ sq ft</p>
                  <p className="text-page opacity-80 text-lg leading-relaxed mb-8">Premium large-format positions for brands that need scale, visibility, and custom buildouts—designed for destination traffic.</p>
                  <Link to="/opportunity/flagship-anchor" className="inline-block bg-page text-page border border-page hover:border-accent hover:bg-accent hover:text-[var(--btn-text-on-accent)] font-bold uppercase text-sm px-8 py-4 rounded-full transition-all outline-none">View Opportunity</Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Inline Retail */}
          <motion.div className="absolute inset-0 w-full h-full" style={{ opacity: useTransform(scrollYProgress, [0.33, 0.34, 0.66, 0.67], [0, 1, 1, 0]) }}>
            <motion.img style={{ scale: scale2 }} src={moaLuxury} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
              <motion.div style={{ opacity: opacity2 }} className="max-w-2xl px-6">
                <div className="glass-pane p-12 rounded-[3rem] shadow-2xl pointer-events-auto">
                  <Store className="w-16 h-16 text-accent mb-8 mx-auto" />
                  <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6">Inline<br/>Corridors</h2>
                  <p className="text-xl font-bold text-accent mb-6 uppercase tracking-widest">500 – 10,000 sq ft</p>
                  <p className="text-page opacity-80 text-lg leading-relaxed">High-performance inline placements with curated adjacencies, designed to convert everyday footfall into repeat customers.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Pop-Up Spaces */}
          <motion.div className="absolute inset-0 w-full h-full bg-page" style={{ opacity: useTransform(scrollYProgress, [0.66, 0.67, 1], [0, 1, 1]) }}>

            <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
              <motion.div style={{ opacity: opacity3 }} className="glass-pane p-16 max-w-2xl px-6 pointer-events-auto shadow-2xl rounded-[3rem]">
                <Zap className="w-16 h-16 text-accent mb-8 mx-auto" />
                <h2 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6">Pop-Up &<br/>Short Term</h2>
                <p className="text-xl font-bold text-accent mb-6 uppercase tracking-widest">200 – 2,000 sq ft</p>
                <p className="text-page opacity-80 leading-relaxed mb-10 text-lg">Flexible short-term spaces for launches, collaborations, and seasonal activations—perfect for testing and scaling demand.</p>
                <Link to="/opportunity/popup-experiential" className="bg-accent text-[var(--btn-text-on-accent)] font-bold tracking-widest uppercase text-sm px-10 py-5 rounded-full w-full hover:brightness-110 transition-all outline-none border-none inline-block">Book a Pop-Up</Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

