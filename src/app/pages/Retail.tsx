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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 1.15]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.33], [0, 1, 0]);

  const scale2 = useTransform(scrollYProgress, [0.33, 0.66], [1, 1.15]);
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.45, 0.66], [0, 1, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.66, 0.85, 1], [0, 1, 1]);

  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      {/* HERO CINEMATIC (Video-first) */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable">
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <p className="text-accent text-[9px] md:text-[10px] font-black tracking-[0.6em] uppercase mb-6 md:mb-8">
              Strategic Retail Environments
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-black font-['Outfit'] text-ink-gradient uppercase leading-[0.9] tracking-tighter mb-8 shadow-2xl">
              Retail <br />
              <span className="text-gradient">Redefined.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl text-[color:var(--text-dim)] max-w-2xl mx-auto font-medium leading-relaxed px-4 md:px-0"
            >
              A premium, high-intent retail environment in the heart of
              Bloomington, MN’s CBD—built for flagships, boutiques, and category
              leaders.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* APPLE STYLE SCROLL PRESENTATION FOR LEASING PATHS */}
      <section ref={containerRef} className="relative h-[200vh] lg:h-[240vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Flagship Anchors */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0, 0.33, 0.34],
                [1, 1, 0],
              ),
            }}
          >
            <motion.img
              style={{ scale: scale1 }}
              src={moaAerial}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
              <motion.div
                style={{ opacity: opacity1 }}
                className="max-w-3xl w-full"
              >
                <div className="glass-pane lighting-card p-8 md:p-16 rounded-[4rem] border border-[var(--border)] shadow-2xl pointer-events-auto">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-8">
                    <Building2 className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                    50,000 – 200,000+ SQ FT
                  </p>
                  <h2 className="text-4xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-6 leading-none">
                    Flagship
                    <br />
                    Anchors
                  </h2>
                  <p className="text-[color:var(--text-dim)] text-base md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                    Premium large-format positions for brands that need scale,
                    visibility, and custom buildouts—designed for destination
                    traffic.
                  </p>
                  <Link to="/opportunity/flagship-anchor" className="btn-luxe">
                    View Opportunity
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Inline Retail */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.33, 0.34, 0.66, 0.67],
                [0, 1, 1, 0],
              ),
            }}
          >
            <motion.img
              style={{ scale: scale2 }}
              src={moaLuxury}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
              <motion.div
                style={{ opacity: opacity2 }}
                className="max-w-3xl w-full text-center"
              >
                <div className="glass-pane lighting-card p-8 md:p-16 rounded-[4rem] border border-[var(--border)] shadow-2xl pointer-events-auto">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 mx-auto">
                    <Store className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                    500 – 10,000 SQ FT
                  </p>
                  <h2 className="text-4xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-6 leading-none">
                    Inline
                    <br />
                    Retail
                  </h2>
                  <p className="text-[color:var(--text-dim)] text-base md:text-xl font-medium leading-relaxed mb-10 max-w-xl mx-auto">
                    High-performance inline placements with curated adjacencies,
                    designed to convert everyday footfall into repeat customers.
                  </p>
                  <Link to="/opportunity/inline-retail" className="btn-luxe">
                    Lease Space
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Pop-Up Spaces */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-page"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.66, 0.67, 1],
                [0, 1, 1],
              ),
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
              <motion.div
                style={{ opacity: opacity3 }}
                className="max-w-3xl w-full text-center"
              >
                <div className="glass-pane lighting-card p-8 md:p-16 rounded-[4rem] border border-[var(--border)] shadow-2xl pointer-events-auto">
                  <div className="w-16 h-16 rounded-3xl bg-accent/20 flex items-center justify-center mb-10 mx-auto">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4">
                    200 – 2,000 SQ FT
                  </p>
                  <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-6 leading-none">
                    Pop-Up &<br />
                    Experiential
                  </h2>
                  <p className="text-[color:var(--text-dim)] text-base md:text-xl font-medium leading-relaxed mb-10 max-w-xl mx-auto">
                    Flexible short-term spaces for launches, collaborations, and
                    seasonal activations—perfect for testing and scaling demand.
                  </p>
                  <Link
                    to="/opportunity/popup-experiential"
                    className="btn-luxe"
                  >
                    Book a Session
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA / CLOSURE TO REMOVE GAP */}
      <section className="relative py-20 px-6 md:px-12 bg-page-bg-alt border-t border-[var(--border)] z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-8">
              Architect Your{" "}
              <span className="text-gradient">Retail Legacy.</span>
            </h2>
            <p className="text-lg text-[color:var(--text-dim)] font-medium italic border-l-4 border-accent pl-8 leading-relaxed">
              From flagship anchors to experimental pop-ups, find your place in
              Bloomington, MN's most prestigious commercial district.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <Link
              to="/leasing"
              className="btn-luxe !px-12 !py-6 text-center shadow-gold"
            >
              Lease Now
            </Link>
            <Link
              to="/reach-us"
              className="px-12 py-6 rounded-full glass-pane border border-[var(--border)] text-[var(--text-main)] font-black tracking-widest uppercase text-[10px] hover:border-accent text-center transition-all"
            >
              Visit Site
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
