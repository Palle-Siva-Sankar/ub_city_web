import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Calendar, MapPin, Clock, Users, Music, Heart, ArrowRight, Star, Sparkles } from "lucide-react";
import { UPCOMING_EVENTS } from "../data/mallData";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Events() {
  const [filter, setFilter] = useState<"all" | "today" | "weekend">("all");
  const visibleEvents = useMemo(() => {
    if (filter === "all") return UPCOMING_EVENTS;
    if (filter === "today") {
      const today = new Date().toDateString();
      return UPCOMING_EVENTS.filter((event) => new Date(event.date).toDateString() === today);
    }
    return UPCOMING_EVENTS;
  }, [filter]);

  return (
    <div className="page-wrapper bg-page min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="Events Hero Video"
          posterImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000"
          videoSrc="/videos/events-hero.mp4"
        />
        
        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-10 mx-auto group hover:bg-white/10 transition-colors">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Always Something Extraordinary</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter mb-6 md:mb-8 uppercase leading-[0.95] md:leading-none">
              What's <span className="text-gradient">On.</span>
            </h1>
            <p className="text-xl hero-video-subtitle font-light max-w-2xl mx-auto leading-relaxed hero-video-glass p-6 rounded-[2rem]">
              From midnight madness sales to premium brand activations and cultural showcases, explore UB City's live event calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Feed */}
      <section className="py-16 md:py-32 px-4 sm:px-6 md:px-10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8 px-0 sm:px-2 md:px-4">
            <div>
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-accent mb-4">Live Calendar</p>
              <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-page uppercase tracking-tighter">Upcoming Experiences</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
              <button onClick={() => setFilter("all")} className={`px-4 sm:px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === "all" ? "bg-gradient-premium text-black shadow-xl scale-105" : "bg-white/5 border border-white/10 text-white/60"}`}>All Events</button>
              <button onClick={() => setFilter("today")} className={`px-4 sm:px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === "today" ? "bg-gradient-premium text-black shadow-xl scale-105" : "bg-white/5 border border-white/10 text-white/60"}`}>Today</button>
              <button onClick={() => setFilter("weekend")} className={`px-4 sm:px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${filter === "weekend" ? "bg-gradient-premium text-black shadow-xl scale-105" : "bg-white/5 border border-white/10 text-white/60"}`}>This Weekend</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {visibleEvents.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-pane lighting-card group flex flex-col rounded-[3rem] overflow-hidden border border-[var(--border)] hover:border-accent/40 transition-all duration-700 hover:shadow-2xl hover:-translate-y-4"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-8 left-8 px-5 py-2 rounded-full bg-white backdrop-blur-3xl text-black text-[9px] font-black uppercase tracking-widest shadow-2xl">
                    {event.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-5 sm:p-8 md:p-12 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-['Outfit'] text-page mb-5 md:mb-8 uppercase tracking-tighter group-hover:text-accent transition-colors line-clamp-2 leading-none">{event.title}</h3>
                  
                  <div className="space-y-3 sm:space-y-5 md:space-y-6 mb-7 md:mb-12">
                    <div className="flex items-center gap-3 sm:gap-5 text-page/60 text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      {event.date}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-5 text-page/60 text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-3 sm:gap-5 text-page/60 text-[10px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-widest">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      {event.location}
                    </div>
                  </div>

                  <p className="text-page-text-muted text-base font-light leading-relaxed mb-10 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {event.description}
                  </p>

                  <div className="mt-auto pt-10 border-t border-[var(--border)] overflow-hidden">
                    <Link to="/opportunity/venue-rotunda" className="flex items-center justify-between w-full group/btn">
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent group-hover:tracking-[0.4em] transition-all">Experience Details</span>
                      <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                        <ArrowRight className="w-5 h-5 text-accent" />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Lighting Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Section (Elevated) */}
      <section className="py-40 px-6 md:px-10 bg-page-bg-alt relative overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] opacity-50" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 mb-10">
             <Star className="w-4 h-4 text-accent fill-accent" />
             <span className="text-[9px] font-black tracking-[0.5em] uppercase text-white/40">Premium Partnerships</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black font-['Outfit'] text-white mb-10 md:mb-20 uppercase tracking-tighter leading-none">
            The Nation's Most <span className="text-gradient">Celebrated Stage.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Music, title: "Concerts", desc: "A world-famous venue in the Rotunda with global digital reach." },
              { icon: Users, title: "Corporate", desc: "Bespoke experiences from product summits to global summits." },
              { icon: Heart, title: "Private", desc: "Breathtaking galas and VIP celebrations across our resort." }
            ].map((t, i) => (
              <div key={i} className="glass-pane lighting-card p-6 sm:p-12 rounded-2xl sm:rounded-[3.5rem] text-center border border-white/5 group hover:border-accent/40 transition-all duration-700 hover:shadow-3xl">
                <div className="w-20 h-20 bg-accent/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 border border-accent/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl">
                   <t.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-6 font-['Outfit'] uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">{t.title}</h3>
                <p className="text-page-text-muted font-light mb-12 text-base leading-relaxed h-12 opacity-80">{t.desc}</p>
                <Link to="/opportunity/venue-concert-spaces" className="w-full py-5 border-2 border-white/10 rounded-full text-white font-black tracking-[0.3em] uppercase text-[10px] hover:bg-gradient-premium hover:border-transparent hover:text-black transition-all shadow-lg active:scale-95 block">Book Event Slot</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

