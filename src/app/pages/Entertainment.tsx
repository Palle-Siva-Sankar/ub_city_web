import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { Sparkles, Fish, Film, Plane } from "lucide-react";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import moaNick from "../../assets/images/moa-nickelodeon.png";
import moaAquarium from "../../assets/images/moa-aquarium.png";

export function Entertainment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Parallax calculations for sticky immersive sections
  const yImage1 = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);
  const yImage2 = useTransform(scrollYProgress, [0.4, 1], ["50%", "0%"]);
  const opacityText1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const opacityText2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);

  return (
    <div className="page-wrapper">
      {/* REAL CINEMATIC VIDEO HERO (Disney/Universal Style) */}
      <section className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Entertainment Hero Video"
          posterImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000"
          videoSrc="/videos/entertainment-hero.mp4"
        />
        
        <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
            <Sparkles className="w-16 h-16 text-accent mb-6 mx-auto animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-['Outfit'] hero-video-title mb-6 tracking-tighter leading-[0.95]">
              Pure <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-accent">Adrenaline.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-3xl hero-video-subtitle hero-video-glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 max-w-2xl mx-auto font-light">
              Experience the nation's largest indoor theme park.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DUAL SCROLLING EXPERIENTIAL PANELS */}
      <section ref={containerRef} className="relative h-[190vh] lg:h-[250vh] bg-page virtual-section">
        <div className="sticky top-0 h-screen w-full bg-page-alt overflow-hidden">
          
          {/* PANEL 1: Nickelodeon */}
          <motion.div className="absolute inset-0 flex flex-col md:flex-row" style={{ y: yImage1 }}>
            <div className="md:w-1/2 p-4 sm:p-6 md:p-20 flex flex-col justify-center relative z-10">
              <motion.div style={{ opacity: opacityText1 }} className="glass-pane p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl">
                <span className="text-pink-500 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">7 Acres of Thrills</span>
                <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold font-['Outfit'] text-ink-gradient mb-5 md:mb-6">Nickelodeon<br/>Universe</h2>
                <p className="text-lg text-ink-gradient/70 font-light mb-8 max-w-md">24 rides, rollercoasters, and attractions under a spectacular glass ceiling.</p>
                <Link to="/opportunity/venue-rotunda" className="inline-block px-8 py-4 bg-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(236,72,153,0.4)]">Book Activation Slot</Link>
              </motion.div>
            </div>
            <div className="md:w-1/2 relative h-[50vh] md:h-full">
              <img src={moaNick} alt="Nickelodeon" className="absolute inset-0 w-full h-full object-cover md:rounded-l-[4rem] shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-page md:from-page-alt via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* PANEL 2: SEA LIFE Aquarium */}
          <motion.div className="absolute inset-0 flex flex-col-reverse md:flex-row" style={{ y: yImage2 }}>
            <div className="md:w-1/2 relative h-[50vh] md:h-full">
              <img src={moaAquarium} alt="Aquarium" className="absolute inset-0 w-full h-full object-cover md:rounded-r-[4rem] shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-page md:from-page-alt via-transparent to-transparent opacity-80" />
            </div>
            <div className="md:w-1/2 p-4 sm:p-6 md:p-20 flex flex-col justify-center md:items-end text-left md:text-right relative z-10">
              <motion.div style={{ opacity: opacityText2 }} className="glass-pane p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl">
                <span className="text-blue-500 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">1.2 Million Gallons</span>
                <h2 className="text-3xl sm:text-4xl lg:text-7xl font-bold font-['Outfit'] text-ink-gradient mb-5 md:mb-6">SEA LIFE<br/>Aquarium</h2>
                <p className="text-lg text-ink-gradient/70 font-light mb-8 max-w-md md:ml-auto">Walk beneath the ocean inside a 300-foot curved glass tunnel. Host events surrounded by sharks.</p>
                <Link to="/opportunity/venue-concert-spaces" className="inline-block px-8 py-4 bg-blue-500 text-white font-bold rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(59,130,246,0.4)]">Book Immersive Event</Link>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* GRID FOR OTHER ATTRACTIONS */}
      <section className="py-16 md:py-32 px-4 md:px-12 bg-page relative z-20 virtual-section">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex flex-col items-center mb-12 md:mb-24">
             <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6">Discovery Module</div>
             <h2 className="text-4xl md:text-8xl font-['Outfit'] font-black text-ink-gradient uppercase tracking-tighter leading-none shadow-2xl">The Magic <span className="text-gradient">Continues.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
            {[
              { slug: "flyover", icon: Plane, color: "text-orange-500", title: "FlyOver America", desc: "A breathtaking flight simulation ride that takes guests soaring over iconic landscapes." },
              { slug: "cmx-cinemas", icon: Film, color: "text-purple-500", title: "CMX Cinemas", desc: "Premium movie theatre with reclining leather seats and in-theatre dining." },
              { slug: "crayola", icon: Fish, color: "text-cyan-500", title: "Crayola Experience", desc: "Interactive creative zones for families and kids of all ages." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 1, y: 0 }} 
                className="h-full group flex"
              >
                <Link to={`/entertainment/${item.slug}`} className="glass-pane active-card lighting-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-left transition-all block h-full w-full border border-accent/10 hover:border-accent hover:shadow-gold duration-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 backdrop-blur-3xl transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform">
                        <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color}`} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-['Outfit'] text-ink-gradient mb-4 md:mb-6 uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-ink-gradient/70 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-accent/20 pl-4 md:pl-6">{item.desc}</p>
                    <div className="mt-12 flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                       Explore Attraction →
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




