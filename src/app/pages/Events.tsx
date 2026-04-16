import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Heart,
  ArrowRight,
  Star,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { UPCOMING_EVENTS } from "../data/mallData";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Events() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "today" | "weekend">("all");
  const visibleEvents = useMemo(() => {
    if (filter === "all") return UPCOMING_EVENTS;
    if (filter === "today") {
      const today = new Date().toDateString();
      return UPCOMING_EVENTS.filter(
        (event) => new Date(event.date).toDateString() === today,
      );
    }
    return UPCOMING_EVENTS;
  }, [filter]);

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden hero-readable">
        <HeroVideoEmbed
          title="Events Hero Video"
          posterImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000"
          videoSrc="https://videos.pexels.com/video-files/2096572/2096572-uhd_2560_1440_30fps.mp4"
        />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="mb-12">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-on-accent transition-all shadow-gold mx-auto pointer-events-auto"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />{" "}
                Return to Nexus
              </button>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-10 mx-auto group hover:bg-accent hover:text-black transition-all">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">
                Always Something Extraordinary
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter mb-8 uppercase leading-none text-ink-gradient shadow-2xl">
              What's <span className="text-gradient">On.</span>
            </h1>
            <p className="text-lg md:text-xl hero-video-subtitle font-medium max-w-2xl mx-auto leading-relaxed hero-video-glass p-8 rounded-3xl text-[color:var(--text-dim)] shadow-xl">
              From midnight madness sales to premium brand activations and
              cultural showcases, explore Mall of America's live event calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Feed */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-page relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
            <div>
              <p className="text-[10px] font-black tracking-[0.6em] uppercase text-accent mb-6">
                Live Calendar
              </p>
              <h2 className="text-4xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">
                Upcoming <span className="text-gradient">Experiences.</span>
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
              {["all", "today", "weekend"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-accent text-[var(--btn-text-on-accent)] shadow-gold scale-105" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)] hover:text-accent"}`}
                >
                  {f === "all"
                    ? "All Events"
                    : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 section-optimize">
            {visibleEvents.map((event, i) => (
              <motion.div
                key={event.id}
                className="scroll-reveal-luxe"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-10 left-10 px-6 py-2 rounded-full bg-accent text-on-accent text-[9px] font-black uppercase tracking-widest shadow-gold">
                    {event.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-page via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black font-['Outfit'] text-ink-gradient mb-6 uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">
                    {event.title}
                  </h3>

                  <div className="space-y-6 mb-12">
                    {[
                      { icon: Calendar, text: event.date },
                      { icon: Clock, text: event.time },
                      { icon: MapPin, text: event.location },
                    ].map((info, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-5 text-[color:var(--text-dim)] text-[11px] font-black uppercase tracking-widest"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:text-[var(--btn-text-on-accent)] transition-all">
                          <info.icon className="w-5 h-5" />
                        </div>
                        {info.text}
                      </div>
                    ))}
                  </div>

                  <p className="text-[color:var(--text-dim)] text-lg font-medium leading-relaxed mb-12 opacity-80 group-hover:opacity-100 transition-opacity">
                    {event.description}
                  </p>

                  <div className="mt-auto pt-10 border-t border-[var(--border)]">
                    <Link
                      to="/opportunity/venue-rotunda"
                      className="flex items-center justify-between w-full group/btn"
                    >
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-accent group-hover:tracking-[0.5em] transition-all">
                        Experience Details
                      </span>
                      <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Section (Elevated) */}
      {/* EVENTS GRID (Universal Style) */}
      <section className="py-24 px-6 md:px-12 bg-page relative virtual-section">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[var(--border)] glass-pane mb-12">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent">
              Premium Partnerships
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black font-['Outfit'] text-ink-gradient mb-24 uppercase tracking-tighter leading-none">
            The Nation's Most <br />
            <span className="text-gradient">Celebrated Stage.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Music,
                title: "Concerts",
                desc: "A world-famous venue in the Rotunda with global digital reach.",
              },
              {
                icon: Users,
                title: "Corporate",
                desc: "Bespoke experiences from product summits to global summits.",
              },
              {
                icon: Heart,
                title: "Private",
                desc: "Breathtaking galas and VIP celebrations across our resort.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-pane lighting-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-center border border-[var(--border)] group hover:border-accent transition-all duration-700"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 md:mb-10 border border-accent/30 group-hover:rotate-12 transition-all">
                  <t.icon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-ink-gradient mb-4 md:mb-6 font-['Outfit'] uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">
                  {t.title}
                </h3>
                <p className="text-[color:var(--text-dim)] font-medium mb-8 md:mb-12 text-sm md:text-lg leading-relaxed h-auto md:h-14 opacity-80">
                  {t.desc}
                </p>
                <Link
                  to="/opportunity/venue-concert-spaces"
                  className="btn-luxe w-full"
                >
                  Book Event Slot
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
