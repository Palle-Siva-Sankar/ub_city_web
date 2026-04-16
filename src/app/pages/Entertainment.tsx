import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, Fish, Film, Plane } from "lucide-react";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import moaNick from "../../assets/images/moa-nickelodeon.png";
import moaAquarium from "../../assets/images/moa-aquarium.png";

export function Entertainment() {
  return (
    <div className="page-wrapper">
      {/* REAL CINEMATIC VIDEO HERO (Disney/Universal Style) */}
      <section className="relative min-h-[100svh] md:h-screen flex items-center justify-center overflow-hidden bg-page hero-readable compositor-layer">
        <HeroVideoEmbed
          title="Entertainment Hero Video"
          posterImage={POSTERS.themePark}
          videoSrc={VIDEOS.themePark}
        />

        <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="w-16 h-16 text-accent mb-6 mx-auto animate-pulse gpu-accelerated" />
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-['Outfit'] hero-video-title mb-6 tracking-tighter leading-[0.95]">
              Pure{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-accent">
                Adrenaline.
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-3xl hero-video-subtitle hero-video-glass rounded-2xl px-4 sm:px-5 py-3 sm:py-4 max-w-2xl mx-auto font-light">
              Experience the nation's largest indoor theme park.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PANEL 1: Nickelodeon - Separate Section */}
      <section className="relative min-h-[80vh] md:min-h-screen bg-page virtual-section overflow-hidden compositor-layer">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 p-4 sm:p-6 md:p-12 lg:p-20 flex flex-col justify-center relative z-10 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pane p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl gpu-accelerated"
            >
              <span className="text-pink-500 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
                7 Acres of Thrills
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] text-ink-gradient mb-4 md:mb-5">
                Nickelodeon
                <br />
                Universe
              </h2>
              <p className="text-base text-ink-gradient/70 font-light mb-6 max-w-md">
                24 rides, rollercoasters, and attractions under a spectacular
                glass ceiling.
              </p>
              <Link
                to="/opportunity/venue-rotunda"
                className="inline-block px-6 py-3 bg-pink-500 font-bold rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(236,72,153,0.4)] !text-white"
              >
                Book Activation Slot
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative h-[50vh] md:h-auto min-h-[50vh] order-1 md:order-2 overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={moaNick}
              alt="Nickelodeon"
              className="absolute inset-0 w-full h-full object-cover md:rounded-l-3xl shadow-2xl gpu-accelerated"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-page via-transparent to-transparent opacity-60 md:opacity-80" />
          </div>
        </div>
      </section>

      {/* PANEL 2: SEA LIFE Aquarium - Separate Section */}
      <section className="relative min-h-[80vh] md:min-h-screen bg-page virtual-section overflow-hidden compositor-layer">
        <div className="flex flex-col-reverse md:flex-row h-full">
          <div className="md:w-1/2 relative h-[50vh] md:h-auto min-h-[50vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              src={moaAquarium}
              alt="Aquarium"
              className="absolute inset-0 w-full h-full object-cover md:rounded-r-3xl shadow-2xl gpu-accelerated"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-page via-transparent to-transparent opacity-60 md:opacity-80" />
          </div>
          <div className="md:w-1/2 p-4 sm:p-6 md:p-12 lg:p-20 flex flex-col justify-center md:items-end text-left md:text-right relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-pane p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl gpu-accelerated"
            >
              <span className="text-blue-500 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
                1.2 Million Gallons
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Outfit'] text-ink-gradient mb-4 md:mb-5">
                SEA LIFE
                <br />
                Aquarium
              </h2>
              <p className="text-base text-ink-gradient/70 font-light mb-6 max-w-md md:ml-auto">
                Walk beneath the ocean inside a 300-foot curved glass tunnel.
                Host events surrounded by sharks.
              </p>
              <Link
                to="/opportunity/venue-concert-spaces"
                className="inline-block px-6 py-3 bg-blue-500 font-bold rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(59,130,246,0.4)] !text-white"
              >
                Book Immersive Event
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GRID FOR OTHER ATTRACTIONS */}
      <section className="py-16 md:py-32 px-4 md:px-12 bg-page relative z-20 virtual-section compositor-layer">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex flex-col items-center mb-12 md:mb-24">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-6 gpu-accelerated">
              Discovery Module
            </div>
            <h2 className="text-3xl md:text-6xl font-['Outfit'] font-black text-ink-gradient uppercase tracking-tighter leading-none shadow-2xl">
              The Magic <span className="text-gradient">Continues.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16">
            {[
              {
                slug: "flyover",
                icon: Plane,
                color: "text-orange-500",
                title: "FlyOver America",
                desc: "A breathtaking flight simulation ride that takes guests soaring over iconic landscapes.",
              },
              {
                slug: "cmx-cinemas",
                icon: Film,
                color: "text-purple-500",
                title: "CMX Cinemas",
                desc: "Premium movie theatre with reclining leather seats and in-theatre dining.",
              },
              {
                slug: "crayola",
                icon: Fish,
                color: "text-cyan-500",
                title: "Crayola Experience",
                desc: "Interactive creative zones for families and kids of all ages.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full group flex"
              >
                <Link
                  to={`/entertainment/${item.slug}`}
                  className="glass-pane active-card lighting-card p-6 md:p-8 rounded-3xl text-left transition-all block h-full w-full border border-[var(--border)] hover:border-accent hover:shadow-gold duration-700 relative overflow-hidden gpu-accelerated"
                >
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 backdrop-blur-3xl transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform shadow-gold">
                      <item.icon
                        className={`w-8 h-8 md:w-10 md:h-10 ${item.color}`}
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black font-['Outfit'] text-ink-gradient mb-4 md:mb-6 uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-ink-gradient/70 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-accent/20 pl-4 md:pl-6">
                      {item.desc}
                    </p>
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
