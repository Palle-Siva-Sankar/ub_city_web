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
    <div className="page-wrapper bg-page">
      <section ref={containerRef} className="relative h-[120vh] lg:h-[150vh]">
        <div className="sticky-presentation bg-page overflow-hidden">
          <img
            src={moaEvent}
            alt="Venues hero"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <motion.div className="video-bg-container" style={{ opacity: videoOpacity }}>
            <video autoPlay loop muted playsInline className="video-bg opacity-80">
              <source src={VIDEOS.citySkyline} type="video/mp4" />
            </video>
            <div className="video-gradient-mask" />
          </motion.div>
          
          <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center pointer-events-none">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="text-accent text-sm tracking-[0.4em] font-bold mb-6 uppercase drop-shadow-md">Not A Mall. A Commercial District.</p>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-['Outfit'] text-page mb-6 drop-shadow-2xl">
                Global <span className="text-gold-gradient">Venues.</span>
              </h1>
              <p className="text-xl md:text-2xl text-page drop-shadow-md max-w-2xl mx-auto font-light">
                12 customizable environments for launches, culture, and business events across Bengaluru’s premium core.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-10 bg-page relative z-20 -mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Massive Parallax Featured Venue */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-[3rem] overflow-hidden group shadow-2xl">
              <img src={moaEvent} alt="The Rotunda" className="w-full h-full object-cover min-h-[600px] group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12">
                <h2 className="text-5xl font-['Outfit'] font-bold text-white mb-4">The Rotunda</h2>
                <p className="text-white/70 text-lg mb-8 max-w-sm">The heartbeat of UB City. Unmatched visibility for major brand activations.</p>
                <Link to="/opportunity/venue-rotunda" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all outline-none border-none">Book Venue</Link>
              </div>
            </motion.div>

            {/* List of other venues */}
            <div className="grid grid-rows-3 gap-8">
              {venues.slice(1).map((v, i) => (
                <Link to="/opportunity/venue-concert-spaces" key={i}>
                  <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="glass-pane p-8 rounded-[2rem] flex items-center justify-between transition-all group cursor-pointer shadow-lg hover:-translate-x-2 h-full">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                        <v.icon className="w-8 h-8 text-accent group-hover:text-[var(--btn-text-on-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-page mb-1">{v.name}</h3>
                        <p className="text-muted-custom font-light">{v.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-custom group-hover:text-accent group-hover:translate-x-2 transition-all opacity-0 md:opacity-100" />
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

