import { motion } from "motion/react";
import { Link } from "react-router";
import { ShieldCheck, Eye, Sparkles } from "lucide-react";

import { VIDEOS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Sponsorship() {
  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      {/* REAL CINEMATIC HERO */}
      <section className="relative min-h-[76vh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Own The Moment Background"
          posterImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
          videoSrc={VIDEOS.aerialCity}
        />

        <div className="relative z-10 text-center pointer-events-none px-6">
          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="text-[var(--text-hero)] font-black font-['Outfit'] text-ink-gradient mb-8 leading-none tracking-tighter uppercase drop-shadow-2xl">
            Own The <br/><span className="text-gradient">Moment.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-3xl text-[color:var(--text-dim)] font-medium max-w-2xl mx-auto leading-relaxed">
            A premium, high-intent audience.<br/>Unprecedented brand integrations.
          </motion.p>
        </div>
      </section>

      {/* PARTNERSHIP TIERS */}
      <section className="py-40 px-6 md:px-12 bg-page relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <div className="max-w-[1400px] mx-auto text-center">
            <div className="mb-24">
                <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-6">Strategic Alliances</p>
                <h2 className="text-5xl md:text-8xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter">Partnership <span className="text-gradient">Tiers.</span></h2>
            </div>
            
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { t: "Presenting Partner", sub: "Premier", features: ["Exclusive category ownership across the entire footprint", "Naming rights on world-class major activations", "Premium digital signage blockouts", "VIP Hospitality Suites for 365 days"] },
              { t: "Official Partner", sub: "Signature", features: ["Category affiliation in core digital directories", "Digital signage block in specific retail zones", "2 massive branded pop-up events annually", "Dedicated account sponsorship integration setup"] }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: i * 0.1 }} className="glass-pane lighting-card rounded-[4rem] p-12 md:p-20 text-left relative overflow-hidden group border border-[var(--border)]">
                <div className="relative z-10">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                    {i === 0 ? <ShieldCheck className="w-48 h-48 text-accent" /> : <Eye className="w-48 h-48 text-accent" />}
                  </div>
                  <div className="flex items-center gap-4 mb-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? "bg-accent text-black" : "bg-accent/10 text-accent"}`}>
                      {i === 0 ? <ShieldCheck className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                    </div>
                    <div>
                      <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-1">{p.sub}</p>
                      <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">{p.t}</h3>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-12">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-sm font-medium text-[color:var(--text-dim)] leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/inquire/sponsorship" className="btn-luxe w-full py-5 text-[10px]">Secure Invitation</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics / Tiers */}
      <section className="py-24 md:py-32 bg-page px-6 md:px-12 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Digital Dominance", 
              icon: Eye, 
              desc: "10M+ annual impressions across our premium high-resolution digital network and immersive LED arrays.",
              metric: "10M+",
              tag: "Coverage",
              slug: "digital-dominance"
            },
            { 
              title: "Event Signature", 
              icon: Sparkles, 
              desc: "Own the stage at our world-class event plazas for exclusive launches, galas, and brand activations.",
              metric: "Top Tier",
              tag: "Visibility",
              slug: "event-signature"
            },
            { 
              title: "Integrated Rights", 
              icon: ShieldCheck, 
              desc: "A sovereign brand partnership with priority access to demographics and first-right for key activations.",
              metric: "VIP Scale",
              tag: "Ownership",
              slug: "integrated-rights"
            }
          ].map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: i * 0.1 }}
              className="glass-pane lighting-card rounded-[3.5rem] p-12 border border-[var(--border)] group hover:border-accent transition-all duration-700">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                    <tier.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                    <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-1">{tier.tag}</p>
                    <p className="text-ink-gradient text-3xl font-black font-['Outfit'] tracking-tighter leading-none">{tier.metric}</p>
                </div>
              </div>
              <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase mb-6 tracking-tight leading-none">{tier.title}</h3>
              <p className="text-[color:var(--text-dim)] font-medium leading-relaxed mb-10 text-lg">{tier.desc}</p>
              <Link to={`/sponsorship/${tier.slug}`} className="inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">Explore Tier →</Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


