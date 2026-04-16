import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import {
  UtensilsCrossed,
  Wine,
  ChefHat,
  Coffee,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Dining() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0px", "10px", "20px"],
  );

  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      {/* REAL CINEMATIC OVERLAY HERO */}
      <section ref={containerRef} className="relative h-[150vh] lg:h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroVideoEmbed
            title="Dining Experience"
            posterImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000"
            videoSrc="https://videos.pexels.com/video-files/2620023/2620023-uhd_2560_1440_24fps.mp4"
          />
          <div className="absolute inset-0 bg-page/40 dark:bg-black/40 pointer-events-none" />

          <div className="relative z-10 w-full h-full flex items-center justify-center px-6 pointer-events-none">
            {/* STAGE 1: Hero Titles */}
            <motion.div
              className="text-center"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
                y: useTransform(scrollYProgress, [0, 0.2], [0, -150]),
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.85]),
                filter: useTransform(
                  scrollYProgress,
                  [0, 0.2],
                  ["blur(0px)", "blur(20px)"],
                ),
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
              >
                <div className="mb-12 text-center flex justify-center">
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-on-accent transition-all shadow-gold mx-auto pointer-events-auto"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />{" "}
                    Back to Home
                  </Link>
                </div>
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-10 mx-auto shadow-gold">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase">
                    The Dining Collection
                  </span>
                </div>
                <h1 className="text-4xl md:text-7xl font-['Outfit'] font-black text-ink-gradient uppercase leading-[0.9] tracking-tighter drop-shadow-2xl mb-8">
                  Exquisite.
                  <br />
                  <span className="text-gradient">Flavors.</span>
                </h1>
                <p className="text-lg md:text-xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-widest opacity-60">
                  Gourmet Cuisine & Finest Spirits
                </p>
              </motion.div>
            </motion.div>

            {/* STAGE 2: Menu/Categories Reveal */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto px-6"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [0.3, 0.5, 0.9, 1],
                  [0, 1, 1, 0],
                ),
                y: useTransform(scrollYProgress, [0.3, 0.5], [200, 0]),
                scale: useTransform(scrollYProgress, [0.8, 1], [1, 0.9]),
              }}
            >
              <div className="text-center mb-12 px-4">
                <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-4">
                  Explore Our Selection
                </p>
                <h2 className="text-3xl md:text-5xl font-['Outfit'] font-black text-ink-gradient uppercase tracking-tighter leading-none shadow-2xl">
                  Dining <span className="text-gradient">Experiences.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1400px]">
                {[
                  {
                    icon: ChefHat,
                    title: "Fine Dining",
                    desc: "Award-winning chef concepts",
                    inquiry: "/dine",
                  },
                  {
                    icon: Wine,
                    title: "Lounges & Bars",
                    desc: "Craft cocktails & late night",
                    inquiry: "/dine",
                  },
                  {
                    icon: UtensilsCrossed,
                    title: "Global Fare",
                    desc: "International flavors",
                    inquiry: "/dine",
                  },
                  {
                    icon: Coffee,
                    title: "Cafés",
                    desc: "Artisanal coffee & pastries",
                    inquiry: "/dine",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    to={item.inquiry}
                    className="glass-pane active-card lighting-card p-6 md:p-8 rounded-3xl text-center transition-all cursor-pointer group shadow-2xl block border border-[var(--border)] hover:border-accent hover:shadow-gold duration-700 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent group-hover:text-on-accent transition-all shadow-lg relative z-10">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black font-['Outfit'] text-ink-gradient uppercase mb-4 tracking-tighter leading-none relative z-10 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[color:var(--text-dim)] text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed relative z-10 opacity-70 group-hover:opacity-100">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA WITH SPLINE */}
      <section className="relative h-[80vh] flex items-center justify-center bg-page-bg-alt overflow-hidden z-20 border-t border-[var(--border)] transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-20 h-px bg-accent" />
            <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase leading-none">
              Global Partnership
            </p>
            <div className="w-20 h-px bg-accent" />
          </div>
          <h2 className="text-4xl md:text-[8rem] font-['Outfit'] font-black text-ink-gradient uppercase tracking-tighter mb-12 leading-none">
            Join the <br />
            <span className="text-gradient">Table.</span>
          </h2>
          <p className="text-lg md:text-xl text-[color:var(--text-dim)] font-medium italic mb-12 leading-relaxed px-10">
            Bring your premium culinary concept to the city's most prestigious
            destination.
          </p>
          <Link
            to="/about"
            className="btn-luxe !px-8 md:!px-14 !py-4 md:!py-6 text-[9px] md:text-xs shadow-gold"
          >
            Partner With Us{" "}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-4" />
          </Link>
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-gold" />
      </section>
    </div>
  );
}
