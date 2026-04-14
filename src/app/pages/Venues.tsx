import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Mic, Building2, Presentation, Music } from "lucide-react";
import moaEvent from "../../assets/images/moa-event.png";
import { VIDEOS } from "../data/mediaAssets";

const venues = [
  { name: "The Rotunda", desc: "The iconic central gathering space for up to 10,000 guests.", icon: Building2 },
  { name: "Nickelodeon Universe", desc: "Private theme park rentals for epic corporate events.", icon: Music },
  { name: "Concert Spaces", desc: "Multiple stages for live entertainment and comedy.", icon: Mic },
  { name: "Level 4 Expo", desc: "Modular convention space for B2B trade shows.", icon: Presentation },
];

export function Venues() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const videoOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      <section ref={containerRef} className="relative h-[120vh] lg:h-[150vh] px-6 md:px-12 pt-24 virtual-section">
        <div className="sticky top-24 h-[80vh] w-full overflow-hidden rounded-[4rem] premium-card">
          <img
            src={moaEvent}
            alt="Venues hero"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale"
          />
          <motion.div className="absolute inset-0" style={{ opacity: videoOpacity }}>
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
              <source src={VIDEOS.citySkyline} type="video/mp4" />
            </video>
            <div className="video-gradient-mask" />
          </motion.div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-8 pointer-events-none">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
              <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-8">Not A Mall. A Commercial District.</p>
              <h1 className="text-6xl md:text-9xl font-black font-['Outfit'] text-ink-gradient uppercase leading-none tracking-tighter mb-8 shadow-2xl">
                Global <span className="text-gradient">Venues.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[color:var(--text-dim)] max-w-2xl mx-auto font-medium leading-relaxed">
                12 customizable environments for launches, culture, and business events across Bengaluru’s premium core.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-page relative z-20 virtual-section">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
            {/* Massive Parallax Featured Venue */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-[3.5rem] overflow-hidden group shadow-2xl border border-[var(--border)] lighting-card min-h-[600px] scroll-reveal compositor-layer">
              <img src={moaEvent} alt="The Rotunda" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-page via-page/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 md:p-16">
                <p className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-4">The Flagship Stage</p>
                <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tight">The Rotunda</h2>
                <p className="text-[color:var(--text-dim)] text-lg mb-10 max-w-sm font-medium leading-relaxed">The heartbeat of UB City. Unmatched visibility for major brand activations and global cultural summits.</p>
                <Link to="/opportunity/venue-rotunda" className="btn-luxe">Book Venue</Link>
              </div>
            </motion.div>

            {/* List of other venues */}
            <div className="flex flex-col gap-8">
              <div className="pb-6 border-b border-[var(--border)]">
                 <h3 className="text-accent text-[10px] font-black tracking-[0.5em] uppercase">Executive Spaces</h3>
              </div>
              {venues.slice(1).map((v, i) => (
                <Link to="/opportunity/venue-concert-spaces" key={i}>
                  <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="glass-pane lighting-card p-10 rounded-[2.5rem] flex items-center justify-between transition-all group cursor-pointer border border-[var(--border)] h-full scroll-reveal compositor-layer">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-[1.2rem] bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-500">
                        <v.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase mb-2 leading-none tracking-tight">{v.name}</h3>
                        <p className="text-[color:var(--text-dim)] font-medium text-sm leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform opacity-0 md:opacity-100" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

