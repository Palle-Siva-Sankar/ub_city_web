import { motion } from "motion/react";
import { Link } from "react-router";
import { ShieldCheck, Eye, Sparkles } from "lucide-react";

import { VIDEOS } from "../data/mediaAssets";

export function Sponsorship() {
  return (
    <div className="page-wrapper bg-page">
      {/* REAL CINEMATIC HERO */}
      <section className="relative min-h-[76vh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-70">
            <source src={VIDEOS.aerialCity} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>

        <div className="relative z-10 text-center pointer-events-none">
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="text-7xl md:text-[clamp(6rem,10vw,12rem)] leading-[0.8] font-bold font-['Outfit'] text-page mb-6 drop-shadow-2xl">
            Own The <span className="text-gold-gradient">Moment.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-2xl text-page drop-shadow-lg font-light max-w-2xl mx-auto">
            A premium, high-intent audience. Unprecedented brand integrations.
          </motion.p>
        </div>
      </section>

      {/* SPLINE INTERACTIVE SPONSORSHIP TIERS */}
      <section className="py-32 px-6 md:px-10 bg-page relative z-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-6xl font-['Outfit'] font-bold text-page mb-20">Partnership Tiers</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {[
              { t: "Presenting Partner", sub: "Premier", features: ["Exclusive category ownership across the entire footprint", "Naming rights on world-class major activations", "Premium digital signage blockouts", "VIP Hospitality Suites for 365 days"] },
              { t: "Official Partner", sub: "Signature", features: ["Category affiliation in core digital directories", "Digital signage block in specific retail zones", "2 massive branded pop-up events annually", "Dedicated account sponsorship integration setup"] }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-pane glass-pane-hover rounded-[3rem] p-16 text-left relative overflow-hidden group">
                {/* 3D Spline embedded functionally directly as a card background */}

                
                <div className="relative z-10">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity">
                    {i === 0 ? <ShieldCheck className="w-32 h-32 text-accent" /> : <Eye className="w-32 h-32 text-accent" />}
                  </div>
                  <span className="text-xs font-bold tracking-[0.3em] bg-accent text-[var(--btn-text-on-accent)] px-6 py-2 rounded-full mb-8 inline-block uppercase shadow-lg">{p.sub}</span>
                  <h3 className="text-4xl lg:text-5xl font-['Outfit'] font-bold text-page mb-10">{p.t}</h3>
                  <ul className="space-y-6 mb-16">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-4 text-page font-light text-lg">
                        <Sparkles className="w-5 h-5 text-accent shrink-0 mt-1" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={i === 0 ? "/opportunity/sponsorship-presenting" : "/opportunity/sponsorship-signature"} className="bg-page text-page border border-[var(--card-border)] font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full w-full hover:bg-accent hover:border-accent hover:text-[var(--btn-text-on-accent)] transition-all outline-none shadow-xl inline-flex items-center justify-center">
                    Start Sponsorship Inquiry
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 bg-page-bg-alt">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Audience Reach", value: "500k+ monthly footfall", note: "High-intent traffic across premium, lifestyle, and destination visits." },
            { title: "Activation Surfaces", value: "12 key zones", note: "Rotunda, atriums, lifestyle corridors, and venue overlays." },
            { title: "Campaign Modes", value: "Always-on + Event Burst", note: "Mix long-term branding with high-impact launch windows." },
          ].map((metric) => (
            <div key={metric.title} className="glass-pane rounded-[2rem] p-6 border border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">{metric.title}</p>
              <p className="text-2xl font-black font-['Outfit']">{metric.value}</p>
              <p className="text-sm text-[color:var(--text-dim)] mt-2">{metric.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

