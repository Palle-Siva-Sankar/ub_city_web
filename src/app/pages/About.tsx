import { Link } from "react-router";
import { motion } from "motion/react";
import { Building2, Brush, HeartPulse, CalendarDays, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function About() {
  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pb-32">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="About Collection"
          posterImage={POSTERS.citySkyline}
          videoSrc={VIDEOS.citySkyline}
        />
        <div className="absolute inset-0 bg-page/30 dark:bg-black/30 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <div className="mb-12">
               <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mx-auto pointer-events-auto">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Nexus
               </Link>
            </div>
            <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass-pane border border-accent/40 mb-10 mx-auto group hover:bg-accent hover:text-black transition-all shadow-gold">
              <Sparkles className="w-5 h-5 text-accent group-hover:text-black transition-colors" />
              <span className="text-[10px] font-black tracking-[0.8em] uppercase text-accent group-hover:text-black transition-colors">The Destination Protocol</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black font-['Outfit'] tracking-tighter uppercase leading-none mb-12 text-ink-gradient shadow-2xl">
              The <span className="text-gradient">Collection.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-black font-['Outfit'] italic max-w-4xl mx-auto leading-tight hero-video-glass p-12 rounded-[4rem] text-ink-gradient border border-[var(--border)] shadow-2xl">
              Inspired by UB City-style luxury district experiences with premium shopping, dining, events, and art.
            </p>
          </motion.div>
        </div>
        <div className="video-gradient-mask" />
      </section>

      <section className="py-40 px-6 md:px-12 bg-page transition-colors duration-500 virtual-section">
        <div className="max-w-[1400px] mx-auto">
            <div className="mb-24 text-center">
                <div className="flex items-center justify-center gap-6 mb-8">
                   <div className="w-16 h-px bg-accent" />
                   <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase">Curated Frameworks</p>
                   <div className="w-16 h-px bg-accent" />
                </div>
                <h2 className="text-6xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-8">Pillars of <span className="text-gradient">Excellence.</span></h2>
                <p className="text-2xl text-[color:var(--text-dim)] font-medium italic border-l-2 border-accent/30 pl-8 inline-block">Constructing the future of urban lifestyle through precise curation.</p>
            </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Brands", desc: "Luxury and premium brand storefronts with dedicated secure digital assets.", to: "/shopping", icon: Building2, label: "Retail Nexus" },
              { title: "Dining", desc: "20+ curated gastronomy varieties with universal ordering protocols.", to: "/dine", icon: HeartPulse, label: "Gastronomy" },
              { title: "Art Gallery", desc: "Immersive gallery visuals and non-linear experiential content streams.", to: "/gallery", icon: Brush, label: "Cultural Vault" },
              { title: "Events", desc: "Upcoming sector events, highlights, and global brand activations.", to: "/events", icon: CalendarDays, label: "Deployments" },
            ].map((item, index) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: false, amount: 0.1, margin: "-10px" }} 
                transition={{ delay: index * 0.1, duration: 1 }}
                className="scroll-reveal compositor-layer"
              >
                <Link to={item.to} className="glass-pane active-card lighting-card rounded-[4rem] p-12 block h-full border border-[var(--border)] group hover:border-accent hover:shadow-gold transition-all duration-700 relative overflow-hidden">
                  <div className="w-20 h-20 rounded-[1.8rem] bg-accent/10 border border-accent/20 flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-black transition-all shadow-lg relative z-10">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <p className="text-[10px] font-black tracking-[0.6em] uppercase text-accent mb-6 opacity-70 group-hover:opacity-100">{item.label}</p>
                  <h3 className="text-4xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tighter leading-none group-hover:text-accent duration-700">{item.title}</h3>
                  <p className="text-[color:var(--text-dim)] font-black text-xs uppercase tracking-[0.2em] leading-relaxed mb-12 opacity-80 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                  <span className="inline-flex items-center gap-4 text-accent text-[11px] font-black uppercase tracking-[0.4em] group-hover:translate-x-4 transition-transform duration-500">
                    Initialize Protocol <ArrowRight className="w-6 h-6" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



