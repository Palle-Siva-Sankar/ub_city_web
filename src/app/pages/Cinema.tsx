import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Clock, Film, Languages, PlayCircle, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { CINEMA_MOVIES, WORLD_LANGUAGES } from "../data/cinemaData";
import { formatINR } from "../utils/currency";


import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Cinema() {
  const navigate = useNavigate();
  const [activeMovie, setActiveMovie] = useState(0);
  const [activeLanguage, setActiveLanguage] = useState("All");
  const selected = CINEMA_MOVIES[activeMovie];

  const filteredMovies = useMemo(() => {
    if (activeLanguage === "All") return CINEMA_MOVIES;
    return CINEMA_MOVIES.filter((movie) => movie.languages.includes(activeLanguage));
  }, [activeLanguage]);

  const go = (delta: number) => {
    setActiveMovie((prev) => {
      const next = (prev + delta + CINEMA_MOVIES.length) % CINEMA_MOVIES.length;
      return next;
    });
  };

  return (
    <div className="page-wrapper bg-page">
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-[#050507] hero-readable">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <HeroVideoEmbed
              title={`${selected.title} trailer`}
              posterImage={selected.poster}
              videoSrc="/videos/cinema-hero.mp4"
            />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hero-video-kicker text-sm tracking-[0.4em] font-bold uppercase mb-4">INOX Multiplex</p>
            <h1 className="text-[var(--text-hero)] font-black font-['Outfit'] mb-4 hero-video-title tracking-tighter leading-none">
              Now <span className="text-accent">Showing.</span>
            </h1>
            <p className="text-xl font-light max-w-2xl mx-auto hero-video-subtitle hero-video-glass rounded-2xl px-5 py-4">
              {selected.title} — {selected.synopsis}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <button onClick={() => go(-1)} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="px-6 py-2.5 rounded-full bg-accent text-black text-[10px] font-black tracking-[0.2em] uppercase shadow-lg">
                {selected.rating} • {selected.duration} • {selected.genre}
              </span>
              <button onClick={() => go(1)} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-page">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <Film className="w-8 h-8 text-accent" />
              <h2 className="text-[var(--text-h2)] font-black font-['Outfit'] tracking-tight">Today's Showtimes</h2>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveLanguage("All")}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${activeLanguage === "All" ? "bg-accent text-black shadow-lg" : "bg-white/5 border border-white/10 opacity-60 hover:opacity-100"}`}
              >
                All
              </button>
              {WORLD_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${activeLanguage === lang ? "bg-accent text-black shadow-lg" : "bg-white/5 border border-white/10 opacity-60 hover:opacity-100"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-8">
            {filteredMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="premium-card p-8 md:p-10 border border-[var(--glass-border)] hover:border-accent/40 transition-all duration-500 group cursor-pointer"
                onClick={() => navigate(`/cinema/movie/${movie.id}`)}
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-3xl font-black font-['Outfit'] group-hover:text-accent transition-colors leading-tight">{movie.title}</h3>
                      <span className="px-3 py-1 text-[9px] font-black tracking-widest uppercase border border-accent/40 text-accent rounded-lg">{movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm card-text-contrast opacity-70">
                      <span className="inline-flex items-center gap-2 font-medium"><Languages className="w-4 h-4 text-accent" /> {movie.languages.join(", ")}</span>
                      <span className="font-medium">{movie.duration}</span>
                      <span className="font-medium tracking-wide uppercase text-[10px]">{movie.genre}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {movie.showtimes.map((time, j) => (
                      <Link
                        key={j}
                        to={`/checkout?movie=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(time)}`}
                        onClick={(event) => event.stopPropagation()}
                        className="px-6 py-3 border border-white/10 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-accent hover:border-accent hover:text-black transition-all flex items-center gap-3 shadow-sm hover:shadow-accent/20"
                      >
                        <Clock className="w-3.5 h-3.5" /> {time}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                  <span className="text-accent font-black text-lg inline-flex items-center gap-3 tracking-tight"><Ticket className="w-5 h-5" /> {formatINR(movie.priceInr)} onwards</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveMovie(CINEMA_MOVIES.findIndex((m) => m.id === movie.id));
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4 text-accent" /> View Trailer
                    </button>
                    <Link
                      to={`/cinema/movie/${movie.id}`}
                      className="inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-accent text-black text-[10px] font-black tracking-widest uppercase hover:brightness-110 transition-all shadow-lg"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto relative min-h-[320px] rounded-[3rem] overflow-hidden premium-card border border-white/5">

          <div className="relative z-10 p-10 md:p-16 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">3D Theater Module</p>
            <h3 className="text-[var(--text-h2)] font-black font-['Outfit'] mb-4 tracking-tight leading-tight">Immersive Screen Technology</h3>
            <p className="card-text-contrast text-lg opacity-70 leading-relaxed">Experience cinema redefined with precision optics and spatial audio. Our 3D theater module integrates state-of-the-art visuals for a futuristic presentation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

