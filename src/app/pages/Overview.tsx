import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, Building2, Handshake, Music, Store, Crown, Sparkles, UtensilsCrossed, Mic, Star } from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { WhyUBCity } from "../components/WhyUBCity";
import { VIDEOS } from "../data/mediaAssets";

export function Overview() {
  return (
    <div className="digideck-container bg-page overflow-x-hidden w-full max-w-[100vw]">
      {/* ═══════════ SLIDE 1: OPENING (Scale & Energy) ═══════════ */}
      <section className="digideck-slide relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed cinematic hero video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2200&auto=format"
          >
            <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--page-bg)] via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 mb-10 mx-auto group hover:bg-white/10 transition-colors">
               <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">The Epicenter of Global Commerce</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-8xl lg:text-[9rem] font-black font-['Outfit'] leading-[0.9] tracking-tighter mb-8 md:mb-10 hero-video-title uppercase">
              The Collection<br />
              <span className="text-gradient">at UB City</span><br />
              Bengaluru.
            </h1>
            <p className="text-xl md:text-3xl hero-video-subtitle drop-shadow-lg max-w-2xl mx-auto font-light leading-relaxed hero-video-glass rounded-[1.5rem] px-5 py-4">
              A landmark luxury district blending shopping, dining, entertainment, and culture. <br />
              Where <span className="text-white font-black">Destination</span> meets <span className="text-accent font-black">Lifestyle</span>.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-5">
              <Link to="/leasing" className="btn-luxe !py-3 !px-7 !text-[9px]">
                Start Leasing
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/50">
                <Link to="/sponsorship" className="hover:text-accent transition-colors">Sponsorship</Link>
                <span className="opacity-30">•</span>
                <Link to="/venues" className="hover:text-accent transition-colors">Book a Venue</Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {[
                { k: "Built-up Area", v: "1.5M+ sq ft" },
                { k: "Land", v: "13 acres" },
                { k: "Footfall", v: "500k+/month" },
              ].map((p) => (
                <div key={p.k} className="glass-pane border border-white/10 bg-white/5 rounded-2xl px-5 py-4">
                  <p className="text-[9px] font-black tracking-[0.4em] uppercase text-white/35">{p.k}</p>
                  <p className="mt-1 text-lg font-black font-['Outfit'] text-white tracking-tight">{p.v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.5em] font-black text-white uppercase opacity-40">Explore Mall Territory</span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center animate-bounce">
            <ChevronDown className="w-4 h-4 text-accent" />
          </div>
        </motion.div>
      </section>

      <WhyUBCity />

      {/* ═══════════ SLIDE 3: RETAIL ═══════════ */}
      <section className="digideck-slide">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-60">
            <source src={VIDEOS.shoppingMall} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative z-10 w-full px-4 sm:px-6 md:px-32 flex justify-start">
          <div className="glass-pane lighting-card p-6 sm:p-10 md:p-16 rounded-2xl md:rounded-[4rem] shadow-3xl max-w-2xl border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-10">
               <Store className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-['Outfit'] text-white mb-8 uppercase tracking-tighter leading-none">Retail<br/><span className="text-gradient">Mastery.</span></h2>
            <p className="text-xl text-white/50 font-light mb-12 leading-relaxed italic">
              Premium retail adjacency in Bengaluru’s CBD—built for category leaders, high-intent footfall, and repeat visits.
            </p>
            <Link to="/shopping" className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-premium rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
               Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SLIDE 4: LUXURY ═══════════ */}
      <section className="digideck-slide">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-70 saturate-0">
            <source src={VIDEOS.fashion} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative z-10 w-full px-4 sm:px-6 md:px-32 flex justify-end">
          <div className="glass-pane lighting-card p-6 sm:p-10 md:p-16 rounded-2xl md:rounded-[4rem] shadow-3xl max-w-2xl text-right border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-10 ml-auto">
               <Crown className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-['Outfit'] text-white mb-8 uppercase tracking-tighter leading-none">Elite<br/><span className="text-gradient">Sovereignty.</span></h2>
            <p className="text-xl text-white/50 font-light mb-12 leading-relaxed italic">
              Hermetically curated adjacencies designed for the world's most elite luxury brands, featuring VIP concierge services and bespoke architecture.
            </p>
            <Link to="/shopping#luxury" className="inline-flex items-center gap-4 px-10 py-5 border-2 border-white/10 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all">
               View The Row <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SLIDE 5: DINING & LIFESTYLE ═══════════ */}
      <section className="digideck-slide bg-page-bg relative">
        <div className="absolute inset-0">

          <div className="absolute inset-0 bg-gradient-to-t from-page-bg via-transparent to-page-bg mix-blend-multiply opacity-80" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10 text-center px-6 max-w-5xl">
          <div className="glass-pane lighting-card rounded-2xl sm:rounded-[4rem] p-6 sm:p-10 md:p-20 border border-white/5 shadow-[0_0_100px_rgba(200,169,81,0.05)]">
             <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-10 mx-auto shadow-2xl">
                <UtensilsCrossed className="w-10 h-10 text-accent" />
             </div>
            <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black font-['Outfit'] text-white mb-8 md:mb-10 uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
              Taste.<br/><span className="text-gradient">Elevated.</span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-white/50 leading-relaxed font-light mb-10 md:mb-14 italic max-w-3xl mx-auto">
              From award-winning fine dining chef concepts to late-night craft cocktail lounges, food is a major regional draw, not just an amenity.
            </p>
            <Link to="/dine" className="inline-flex items-center gap-3 sm:gap-5 px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-premium rounded-full text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-3xl hover:scale-110 active:scale-95 transition-all">
               Browse Gastronomy <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SLIDE 6: ATTRACTIONS ═══════════ */}
      <section className="digideck-slide">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-90 saturate-150">
            <source src={VIDEOS.entertainment} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative z-10 w-full px-10 md:px-32 flex justify-start">
          <div className="glass-pane lighting-card p-16 rounded-[4rem] shadow-3xl max-w-2xl border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-10">
               <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-white mb-8 uppercase tracking-tighter leading-none">Pulse &<br/><span className="text-gradient">Precision.</span></h2>
            <p className="text-xl text-white/50 font-light mb-12 leading-relaxed italic">The nation's largest indoor theme park acts as an unstoppable foot-traffic engine, guaranteeing massive dwell times year-round.</p>
            <Link to="/entertainment" className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-premium rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
               Experience Scale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ SLIDE 8: FINAL CTA ═══════════ */}
      <section className="digideck-slide bg-page-bg relative z-20 overflow-hidden">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-30">
            <source src={VIDEOS.businessDistrict} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 py-10 overflow-y-auto h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
             <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 mb-8">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40">Immediate Opportunity</span>
             </div>
            <h2 className="text-6xl md:text-[8rem] font-black font-['Outfit'] mb-8 text-white uppercase tracking-tighter leading-none">Determine Your <span className="text-gradient">Legacy.</span></h2>
            <p className="text-xl text-white/40 font-light uppercase tracking-[0.3em]">Commit to the premier destination.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Lease Territory", desc: "Flagship, inline, F&B, or pop-up. Secure your position.", icon: Building2, to: "/leasing", cta: "Inquire Leasing" },
              { title: "Brand Synergy", desc: "Sponsorship tiers, activations, and marketing dominance.", icon: Handshake, to: "/sponsorship", cta: "Activate Brand" },
              { title: "Stage Scale", desc: "12 world-class venues for events of any magnitude.", icon: Music, to: "/venues", cta: "Book Venue" },
            ].map((path, i) => (
              <motion.div key={path.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={path.to} className="group block h-full">
                  <div className="glass-pane lighting-card rounded-[3rem] p-12 h-full flex flex-col transition-all duration-700 hover:shadow-3xl border border-white/5 hover:border-accent/30">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:scale-110 transition-all shadow-xl">
                      <path.icon className="w-10 h-10 text-accent group-hover:text-black" />
                    </div>
                    <h3 className="text-3xl font-black font-['Outfit'] mb-6 text-white uppercase tracking-tighter group-hover:text-accent transition-colors">{path.title}</h3>
                    <p className="text-white/40 leading-relaxed mb-12 flex-1 font-light text-lg italic group-hover:text-white/70 transition-colors">"{path.desc}"</p>
                    <div className="inline-flex items-center justify-between w-full text-[10px] font-black tracking-[0.3em] text-accent uppercase group-hover:tracking-[0.4em] transition-all">
                      {path.cta} <ArrowRight className="w-5 h-5" />
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
