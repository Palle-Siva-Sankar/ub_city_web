import { Link } from "react-router";
import { motion } from "motion/react";
import { Building2, Brush, HeartPulse, CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function About() {
  return (
    <div className="page-wrapper bg-page min-h-screen">
      <section className="relative h-[72vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="About Collection"
          posterImage={POSTERS.citySkyline}
          videoSrc={VIDEOS.citySkyline}
        />
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-8 mx-auto group hover:bg-white/10 transition-colors">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Destinations</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter uppercase leading-[0.95] mb-6">
            The <span className="text-gradient">Collection.</span>
          </h1>
          <p className="text-xl hero-video-subtitle font-light max-w-3xl mx-auto leading-relaxed hero-video-glass p-4 rounded-2xl">
            Inspired by UB City-style luxury district experiences with premium shopping, dining, events, and art.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Brands", desc: "Luxury and premium brand storefronts with dedicated pages.", to: "/shopping", icon: Building2 },
            { title: "Dining", desc: "20+ curated varieties with ordering and payment flow.", to: "/dine", icon: HeartPulse },
            { title: "Art Gallery", desc: "Immersive gallery visuals and experiential content.", to: "/gallery", icon: Brush },
            { title: "Events", desc: "Upcoming events, weekend highlights, and brand activations.", to: "/events", icon: CalendarDays },
          ].map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <Link to={item.to} className="glass-pane lighting-card rounded-[2rem] p-8 block h-full">
                <item.icon className="w-10 h-10 text-accent mb-5" />
                <h3 className="text-2xl font-black card-title-contrast mb-3">{item.title}</h3>
                <p className="card-text-contrast text-sm leading-relaxed mb-6">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-accent text-xs font-black uppercase tracking-[0.2em]">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


