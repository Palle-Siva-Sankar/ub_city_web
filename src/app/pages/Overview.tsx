import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  ChevronDown,
  Building2,
  Handshake,
  Music,
  Store,
  Crown,
  Sparkles,
  UtensilsCrossed,
  Star,
} from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { WhyMOA } from "../components/WhyMOA";
import { VIDEOS, POSTERS } from "../data/mediaAssets";

export function Overview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-page overflow-x-hidden w-full transition-colors duration-500">
      {/* ═══════════ SECTION 1: HERO (MOA Scale) ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden paint-contained compositor-layer">
        <HeroVideoEmbed
          videoSrc={VIDEOS.shoppingMall}
          posterImage={POSTERS.shoppingMall}
          title="Mall of America"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-glass backdrop-blur-3xl border border-white/20 mb-8 mx-auto shadow-2xl"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-accent">
                Defining the Future of Retail
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-8xl font-black font-['Outfit'] leading-[0.9] tracking-tighter mb-8 hero-video-title uppercase"
            >
              The Epicenter <br />
              <span className="text-gradient">of Retail &</span>
              <br />
              Entertainment.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-3xl hero-video-subtitle hero-video-glass rounded-[2.5rem] px-10 py-8 mb-14 max-w-3xl mx-auto font-medium leading-relaxed border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 dark:bg-transparent pointer-events-none" />
              <span className="relative z-10">
                Welcoming over 40 million annual guests to North America's
                premier shopping and entertainment destination.
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link
                to="/leasing"
                className="btn-luxe !px-16 !py-6 text-xs transition-transform hover:scale-105"
              >
                Explore Leasing
              </Link>
              <Link
                to="/sponsorship"
                className="hero-cta-secondary !px-16 !py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all border border-white/20 hover:bg-white/10 backdrop-blur-xl"
              >
                Brand Partnership
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronDown className="w-8 h-8 text-accent" />
        </div>
      </section>

      <WhyMOA />

      {/* ═══════════ SECTION 2: RETAIL (MOA Reach) ═══════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20 group virtual-section compositor-layer">
        <HeroVideoEmbed
          posterImage={POSTERS.shoppingMall}
          title="Retail Mastery"
        />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-10px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="glass-pane active-card lighting-card p-10 md:p-14 rounded-[3rem] border border-[var(--border)] shadow-2xl shine-effect gpu-accelerated">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 border border-accent/30 shadow-gold">
                <Store className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-ink-gradient uppercase leading-[0.9]">
                Unrivaled
                <br />
                <span className="text-gradient">Reach.</span>
              </h2>
              <p className="text-lg md:text-xl text-ink-gradient/90 mb-10 font-medium leading-relaxed border-l-2 border-accent/40 pl-6">
                Over 5.6 million square feet of opportunity. Strategically
                located flagsips and pop-ups capturing a captive, high-intent
                global audience.
              </p>
              <Link to="/retail" className="btn-luxe !px-8 !py-3 text-[9px]">
                Leasing Brochure <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 3: ENTERTAINMENT (The Anchor) ═══════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20 virtual-section compositor-layer">
        <HeroVideoEmbed
          posterImage={POSTERS.entertainment}
          title="Entertainment"
        />
        <div className="relative z-10 container mx-auto px-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-10px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-right"
          >
            <div className="glass-pane active-card lighting-card p-8 md:p-10 rounded-3xl border border-[var(--border)] shadow-2xl shine-effect gpu-accelerated">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-8 ml-auto border border-accent/30 shadow-gold">
                <Crown className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-ink-gradient uppercase leading-[0.9]">
                Infinite
                <br />
                <span className="text-gradient">Engagement.</span>
              </h2>
              <p className="text-lg md:text-xl text-ink-gradient/90 mb-10 font-medium leading-relaxed border-r-2 border-accent/40 pr-6">
                From Nickelodeon Universe to SEA LIFE Aquarium—we bridge the gap
                between world-class entertainment and high-ticket retail
                conversion.
              </p>
              <Link
                to="/attractions"
                className="btn-luxe !px-8 !py-3 text-[9px] flex-row-reverse"
              >
                <ArrowRight className="mr-3 w-4 h-4 rotate-180" /> Explore
                Venues
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 4: DINING ═══════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 hero-readable virtual-section compositor-layer">
        <HeroVideoEmbed
          posterImage="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000"
          title="Dining"
        />
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-10px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-24 h-24 rounded-[2rem] bg-accent/20 backdrop-blur-3xl flex items-center justify-center mb-12 mx-auto border border-accent/40 shadow-gold">
              <UtensilsCrossed className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-ink-gradient uppercase leading-none hero-video-title">
              Culinary.
              <br />
              <span className="text-gradient">Excellence.</span>
            </h2>
            <p className="text-2xl md:text-3xl hero-video-subtitle hero-video-glass rounded-[2rem] px-10 py-8 mb-16 max-w-3xl mx-auto font-medium leading-relaxed border border-white/10 shadow-2xl">
              Showcasing over 50 unique dining concepts. A food & beverage
              platform architected for maximum dwell time and tenant success.
            </p>
            <Link to="/dine" className="btn-luxe !px-20 !py-8 text-sm">
              View Dining Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 5: FINAL CTA (Partnership Cards) ═══════════ */}
      <section className="relative py-24 bg-page overflow-hidden virtual-section compositor-layer">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent-gold)_0%,transparent_60%)] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "-10px" }}
            transition={{ duration: 1 }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-accent/20 border border-accent/40 mb-12 mx-auto shadow-gold">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-[11px] font-black tracking-[0.6em] uppercase text-accent">
                Join the Destination
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-ink-gradient uppercase leading-tight">
              Elevate Your <span className="text-gradient">Brand.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Retail Leasing",
                desc: "Strategically position your brand within North America's most productive retail environment.",
                icon: Building2,
                to: "/leasing",
                cta: "Leasing Portal",
              },
              {
                title: "Sponsorship",
                desc: "Activate and dominate through tactical marketing and naming rights across iconic venues.",
                icon: Handshake,
                to: "/sponsorship",
                cta: "Partner Now",
              },
              {
                title: "Event Booking",
                desc: "Utilize the Huntington Bank Rotunda and other high-capacity spaces for your next launch.",
                icon: Music,
                to: "/venues",
                cta: "Book Venue",
              },
            ].map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-10px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <Link to={path.to} className="group block h-full">
                  <div className="glass-pane active-card lighting-card gpu-accelerated p-6 md:p-8 h-full flex flex-col transition-all duration-700 rounded-2xl border border-[var(--border)] shadow-2xl shine-effect">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-3xl flex items-center justify-center mb-6 border border-accent/30 group-hover:bg-accent group-hover:text-on-accent transition-all shadow-gold group-hover:scale-110">
                      <path.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black mb-3 uppercase tracking-tight text-[var(--text-main)]">
                      {path.title}
                    </h3>
                    <p className="text-[color:var(--text-dim)] text-sm mb-6 flex-1 font-medium leading-relaxed">
                      {path.desc}
                    </p>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent flex items-center gap-3 group-hover:gap-6 transition-all opacity-100">
                      {path.cta} <ArrowRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
