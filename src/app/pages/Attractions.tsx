import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, MapPin, ArrowRight, Music, Camera, Brush, ArrowLeft } from "lucide-react";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

const attractions = [
  {
    id: "sky-deck",
    title: "The Sky Deck",
    desc: "Breathtaking 800ft views of Bengaluru's skyline with a premium lounge and telescopes.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
    link: "/opportunity/venue-rotunda"
  },
  {
    id: "sublime-art",
    title: "Sublime Art Gallery",
    desc: "A sky-high cultural vault featuring global contemporary artists and immersive exhibits.",
    icon: Brush,
    image: "https://images.unsplash.com/photo-1518998053502-53cc8f61bb88?q=80&w=1200",
    link: "/gallery"
  },
  {
    id: "amphitheatre",
    title: "Open Air Amphitheatre",
    desc: "The heartbeat of UB City's nightlife with world-class acoustics and starlit concerts.",
    icon: Music,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200",
    link: "/opportunity/venue-concert-spaces"
  }
];

export function Attractions() {
  return (
    <div className="page-wrapper bg-page min-h-screen pb-32 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="Attractions Experience"
          posterImage={POSTERS.entertainment}
          videoSrc={VIDEOS.entertainment}
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
              <span className="text-[10px] font-black tracking-[0.8em] uppercase text-accent group-hover:text-black transition-colors">Legendary Landmarks</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black font-['Outfit'] tracking-tighter uppercase leading-none mb-12 text-ink-gradient shadow-2xl">
              World Class <br /><span className="text-gradient">Attractions.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-black font-['Outfit'] italic max-w-4xl mx-auto leading-tight hero-video-glass p-12 rounded-[4rem] text-ink-gradient border border-[var(--border)] shadow-2xl">
              From sky-high views to starlit amphitheaters, experience Bengaluru's most iconic leisure destinations.
            </p>
          </motion.div>
        </div>
        <div className="video-gradient-mask" />
      </section>

      {/* Main Grid */}
      <section className="py-40 px-6 md:px-12 bg-page transition-colors duration-500 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 text-center">
              <div className="flex items-center justify-center gap-6 mb-8">
                 <div className="w-16 h-px bg-accent" />
                 <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase">The Experience Matrix</p>
                 <div className="w-16 h-px bg-accent" />
              </div>
              <h2 className="text-6xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-8">Curated <span className="text-gradient">Spectacles.</span></h2>
              <p className="text-2xl text-[color:var(--text-dim)] font-medium italic border-l-2 border-accent/30 pl-8 inline-block max-w-2xl">Discover why UB City is the cultural and architectural heartbeat of the city.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {attractions.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: false, amount: 0.1 }} 
                transition={{ delay: index * 0.1, duration: 1 }}
                className="group"
              >
                <Link to={item.link} className="glass-pane active-card lighting-card rounded-[4rem] overflow-hidden border border-[var(--border)] hover:border-accent transition-all p-12 shadow-xl hover:shadow-gold duration-700 block relative">
                   <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-md" />
                   <div className="relative z-10">
                     <div className="aspect-[16/11] overflow-hidden rounded-[3rem] mb-12 shadow-inner border border-[var(--border)] relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.6] group-hover:grayscale-0" />
                        <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl glass-pane border border-white/20 flex items-center justify-center text-white">
                           <item.icon className="w-7 h-7" />
                        </div>
                     </div>
                     <div className="px-6 pb-2">
                        <p className="text-accent text-[9px] font-black uppercase tracking-[0.5em] mb-4 opacity-60">Attraction Registry</p>
                        <h4 className="text-4xl font-black text-ink-gradient uppercase tracking-tighter mb-8 group-hover:text-accent transition-colors font-['Outfit'] leading-none h-16">{item.title}</h4>
                        <p className="text-[color:var(--text-dim)] text-xs font-black uppercase tracking-[0.2em] leading-relaxed mb-12 opacity-80 group-hover:opacity-100 line-clamp-3">
                          {item.desc}
                        </p>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <MapPin className="w-6 h-6 text-accent" />
                              <p className="text-[10px] text-[color:var(--text-dim)] font-black uppercase tracking-[0.4em]">UB City Pinnacle</p>
                           </div>
                           <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform" />
                        </div>
                     </div>
                   </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-page-bg-alt border-t border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-8">Ready to <span className="text-gradient">Experience?</span></h2>
            <p className="text-xl text-[color:var(--text-dim)] font-medium italic border-l-4 border-accent pl-8 leading-relaxed">Book a VIP tour or secure priority access to our starlit events.</p>
          </div>
          <Link to="/reach-us" className="btn-luxe !px-16 !py-8 shrink-0 shadow-gold">Plan Your Visit</Link>
        </div>
      </section>
    </div>
  );
}

