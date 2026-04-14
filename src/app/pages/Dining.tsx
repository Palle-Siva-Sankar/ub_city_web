import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { UtensilsCrossed, Wine, ChefHat, Coffee, ArrowRight } from "lucide-react";


export function Dining() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "10px", "20px"]);

  return (
    <div className="page-wrapper">

      {/* REAL CINEMATIC OVERLAY HERO */}
      <section ref={containerRef} className="relative h-[120vh] lg:h-[160vh] bg-page">
        <div className="sticky-presentation bg-page overflow-hidden">

          {/* Animated Video Background via Framer */}
          <motion.div className="absolute inset-0" style={{ filter: `blur(${blurValue})` }}>
            <video autoPlay loop muted playsInline className="video-bg opacity-70 scale-100 md:scale-[0.96] object-center md:object-[center_30%]">
              <source src="/videos/dining-hero.mp4" type="video/mp4" />
            </video>
            <div className="video-gradient-mask" />
          </motion.div>

          <div className="relative z-10 w-full px-6 pointer-events-none">
            {/* STAGE 1: Hero Titles */}
            <motion.div className="text-center" style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]), y: useTransform(scrollYProgress, [0, 0.3], [0, -100]) }}>
              <p className="text-accent tracking-[0.4em] text-sm uppercase mb-6 drop-shadow-md font-bold">Culinary Excellence</p>
              <h1 className="text-7xl md:text-9xl font-['Outfit'] font-bold text-page leading-tight drop-shadow-2xl">
                Taste.<br />Elevated.
              </h1>
            </motion.div>

            {/* STAGE 2: Menu/Categories Reveal */}
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]) }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px] pointer-events-auto mt-32">
                {[
                  { icon: ChefHat, title: "Fine Dining", desc: "Award-winning chef concepts", inquiry: "/opportunity/inline-retail" },
                  { icon: Wine, title: "Lounges & Bars", desc: "Craft cocktails & late night", inquiry: "/opportunity/inline-retail" },
                  { icon: UtensilsCrossed, title: "Global Fare", desc: "International food courts", inquiry: "/opportunity/inline-retail" },
                  { icon: Coffee, title: "Caf�s", desc: "Artisanal coffee & pastries", inquiry: "/opportunity/inline-retail" }
                ].map((item, i) => (
                  <Link key={i} to={item.inquiry} className="glass-pane p-8 rounded-[2rem] text-center hover:bg-white/10 dark:hover:bg-white/5 transition-all cursor-pointer group shadow-2xl block">
                    <item.icon className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold font-['Outfit'] text-page mb-2">{item.title}</h3>
                    <p className="text-muted-custom text-sm">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA WITH SPLINE */}
      <section className="relative h-[60vh] flex items-center justify-center bg-page overflow-hidden z-20">
        {/* Integrating a very subtle Spline background just for the CTA section */}

        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-['Outfit'] font-bold text-page mb-8">Ready to <span className="text-gold-gradient">Serve?</span></h2>
          <Link to="/opportunity/inline-retail" className="inline-flex items-center gap-3 bg-accent text-[var(--btn-text-on-accent)] font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:scale-105 transition-all shadow-2xl hover:brightness-110">
            F&B Leasing Opportunities <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

