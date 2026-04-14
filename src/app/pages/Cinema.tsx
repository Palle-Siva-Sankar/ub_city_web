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
            <h1 className="text-6xl md:text-8xl font-bold font-['Outfit'] mb-4 hero-video-title">
              Now <span className="text-[#C8A951]">Showing.</span>
            </h1>
            <p className="text-xl font-light max-w-2xl mx-auto hero-video-subtitle hero-video-glass rounded-2xl px-5 py-4">
              {selected.title} - {selected.synopsis}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button onClick={() => go(-1)} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-5 py-2 rounded-full bg-accent text-black text-xs font-black tracking-widest uppercase">
                {selected.rating} • {selected.duration} • {selected.genre}
              </span>
              <button onClick={() => go(1)} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 bg-page">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <Film className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold font-['Outfit']">Today's Showtimes</h2>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveLanguage("All")}
                className={`px-4 py-2 rounded-full text-xs font-bold ${activeLanguage === "All" ? "bg-accent text-black" : "bg-white/5 border border-white/10"}`}
              >
                All
              </button>
              {WORLD_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${activeLanguage === lang ? "bg-accent text-black" : "bg-white/5 border border-white/10"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-pane rounded-[2rem] p-8 border border-[var(--glass-border)] hover:border-accent transition-all duration-500 group cursor-pointer"
                onClick={() => navigate(`/cinema/movie/${movie.id}`)}
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold font-['Outfit'] group-hover:text-accent transition-colors">{movie.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border border-accent text-accent rounded-full">{movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm card-text-contrast">
                      <span className="inline-flex items-center gap-1"><Languages className="w-4 h-4 text-accent" /> {movie.languages.join(", ")}</span>
                      <span>{movie.duration}</span>
                      <span>{movie.genre}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {movie.showtimes.map((time, j) => (
                      <Link
                        key={j}
                        to={`/checkout?movie=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(time)}`}
                        onClick={(event) => event.stopPropagation()}
                        className="px-5 py-2.5 border border-[var(--border)] rounded-full text-sm font-bold hover:bg-accent hover:border-accent hover:text-black transition-all flex items-center gap-2"
                      >
                        <Clock className="w-3 h-3" /> {time}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-accent font-black inline-flex items-center gap-2"><Ticket className="w-4 h-4" /> {formatINR(movie.priceInr)} onwards</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveMovie(CINEMA_MOVIES.findIndex((m) => m.id === movie.id));
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold"
                    >
                      <PlayCircle className="w-4 h-4 text-accent" /> View Trailer
                    </button>
                    <Link
                      to={`/cinema/movie/${movie.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black text-xs font-bold"
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

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-[1200px] mx-auto relative min-h-[280px] rounded-[2rem] overflow-hidden glass-pane border border-white/10">

          <div className="relative z-10 p-8 md:p-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-3">3D Theater Module</p>
            <h3 className="text-3xl md:text-4xl font-black font-['Outfit'] mb-3">Immersive Screen Technology</h3>
            <p className="card-text-contrast max-w-2xl">New Spline-powered 3D visuals are embedded for cinematic storytelling and futuristic theater presentation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

