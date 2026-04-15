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
    <div className="page-wrapper bg-page transition-colors duration-500 pb-32">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <HeroVideoEmbed
              title={`${selected.title} trailer`}
              posterImage={selected.poster}
              videoSrc="https://videos.pexels.com/video-files/5664972/5664972-uhd_2560_1440_30fps.mp4"
            />
            <div className="absolute inset-0 bg-page/30 dark:bg-black/30 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-pane border border-accent/40 mb-10 hero-video-glass shadow-gold">
               <Film className="w-5 h-5 text-accent" />
               <span className="text-[10px] font-black tracking-[0.8em] text-accent uppercase">Premium Cinema Experience</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black font-['Outfit'] mb-8 tracking-tighter leading-none text-ink-gradient uppercase">
              Now <span className="text-gradient">Playing.</span>
            </h1>
            <p className="text-lg md:text-2xl font-black font-['Outfit'] italic max-w-3xl mx-auto hero-video-subtitle hero-video-glass rounded-[2rem] px-8 md:px-10 py-6 md:py-8 text-ink-gradient border border-[var(--border)] leading-tight mb-12">
              {selected.title} <span className="text-accent opacity-40 mx-4">/</span> <span className="font-medium text-base md:text-lg leading-relaxed opacity-80">{selected.synopsis}</span>
            </p>
            
            <div className="flex items-center justify-center gap-6 md:gap-10">
              <button onClick={() => go(-1)} className="w-16 h-16 md:w-20 md:h-20 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-black transition-all group shadow-xl">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-active:scale-95" />
              </button>
              <div className="px-8 md:px-12 py-4 md:py-5 rounded-3xl glass-pane border border-accent/30 text-accent text-[9px] md:text-[12px] font-black tracking-[0.4em] uppercase shadow-gold bg-accent/10">
                {selected.rating} <span className="opacity-30 mx-3">|</span> {selected.duration}
              </div>
              <button onClick={() => go(1)} className="w-16 h-16 md:w-20 md:h-20 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center hover:bg-accent hover:text-black transition-all group shadow-xl">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-active:scale-95" />
              </button>
            </div>
          </motion.div>
        </div>
        <div className="video-gradient-mask" />
      </section>

      {/* MOVIE GRID (Universal Style) */}
      <section className="py-24 px-6 md:px-12 bg-page relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20 md:mb-24 pb-12 border-b border-[var(--border)]">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-accent/20 border border-accent/20 flex items-center justify-center shadow-gold">
                 <Film className="w-8 h-8 md:w-10 md:h-10 text-accent" />
              </div>
              <div className="min-w-0">
                 <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-4">Theater Schedule</p>
                 <h2 className="text-4xl md:text-7xl font-black font-['Outfit'] tracking-tighter text-ink-gradient uppercase leading-none">The Showcase.</h2>
              </div>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 px-2">
              <button
                onClick={() => setActiveLanguage("All")}
                className={`px-8 md:px-10 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-black tracking-widest uppercase transition-all duration-500 shadow-sm ${activeLanguage === "All" ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-ink-gradient opacity-60 hover:opacity-100"}`}
              >
                All Languages
              </button>
              {WORLD_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-8 md:px-10 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-black tracking-widest uppercase transition-all duration-500 shadow-sm whitespace-nowrap ${activeLanguage === lang ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-ink-gradient opacity-60 hover:opacity-100"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-12">
            {filteredMovies.map((movie, i) => (
              <motion.div 
                key={movie.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: false, amount: 0.1 }} 
                transition={{ delay: i * 0.1 }}
                className="compositor-layer glass-pane active-card lighting-card p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-[var(--border)] group hover:border-accent/40 shadow-xl transition-all duration-700 relative overflow-hidden"
              >
                <Link to={`/cinema/movie/${movie.id}`} className="absolute inset-0 z-0" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10 pointer-events-none">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-6 mb-6">
                      <h3 className="text-3xl md:text-6xl font-black font-['Outfit'] group-hover:text-accent transition-colors leading-none tracking-tighter text-ink-gradient uppercase">{movie.title}</h3>
                      <span className="px-3 md:px-4 py-1 text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase border border-accent/40 text-accent rounded-xl shadow-gold shrink-0">{movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-accent">
                      <span className="inline-flex items-center gap-3 px-4 md:px-5 py-2 glass-pane border border-[var(--border)] rounded-full text-ink-gradient opacity-80"><div className="w-2 h-2 rounded-full bg-accent animate-pulse" /> {movie.languages.join(", ")}</span>
                      <span className="inline-flex items-center gap-3"><Clock className="w-4 h-4 opacity-40 text-ink-gradient" /> {movie.duration}</span>
                      <span className="underline underline-offset-8 decoration-accent/30">{movie.genre}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pointer-events-auto">
                    {movie.showtimes.map((time, j) => (
                      <Link
                        key={j}
                        to={`/cinema/movie/${movie.id}`}
                        onClick={(event) => event.stopPropagation()}
                        className="px-6 md:px-8 py-3 md:py-4 glass-pane border border-[var(--border)] rounded-2xl text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-accent hover:text-black hover:border-accent hover:shadow-gold transition-all duration-500 shadow-md"
                      >
                         {time}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-12 relative z-10">
                  <div className="flex items-center gap-10">
                     <div className="flex flex-col gap-1">
                        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-accent">Tickets From</p>
                        <span className="text-ink-gradient font-black text-2xl md:text-3xl tracking-tighter uppercase font-['Outfit']">{formatINR(movie.priceInr)}</span>
                     </div>
                     <div className="h-10 w-px bg-[var(--border)]" />
                     <p className="max-w-xs text-[10px] md:text-xs font-medium italic text-[color:var(--text-dim)] leading-relaxed">Experience global cinema with state-of-the-art visuals and spatial audio.</p>
                  </div>
                  
                  <div className="flex items-center gap-5 pointer-events-auto">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setActiveMovie(CINEMA_MOVIES.findIndex((m) => m.id === movie.id));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 rounded-2xl glass-pane border border-[var(--border)] text-[9px] md:text-[10px] font-black tracking-widest uppercase hover:bg-accent hover:text-black hover:border-accent transition-all duration-700 shadow-xl"
                    >
                      <PlayCircle className="w-5 h-5" /> Play Trailer
                    </button>
                    <Link
                      to={`/cinema/movie/${movie.id}`}
                      className="btn-luxe !px-8 md:!px-10 !py-3 md:!py-4 !text-[8px] md:!text-[9px]"
                    >
                      Book Tickets
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto relative min-h-[400px] md:min-h-[550px] rounded-[3rem] md:rounded-[5rem] overflow-hidden glass-pane lighting-card border border-[var(--border)] flex items-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 p-10 md:p-32 max-w-5xl">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] bg-accent/20 border border-accent/20 flex items-center justify-center mb-8 md:mb-12 shadow-gold">
                <Ticket className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] md:tracking-[0.8em] text-accent mb-6 md:mb-8">Luxury Theater Experience</p>
            <h3 className="text-4xl md:text-[8rem] font-black font-['Outfit'] mb-8 md:mb-10 tracking-tighter leading-none text-ink-gradient uppercase">Immersive <br/><span className="text-gradient">Cinema.</span></h3>
            <p className="text-lg md:text-2xl text-ink-gradient font-medium leading-relaxed max-w-3xl border-l-2 border-accent/40 pl-6 md:pl-10 italic">Experience cinema redefined with precision optics and world-class sound. Our theaters provide a futuristic presentation for every narrative.</p>
          </div>
        </div>
      </section>
    </div>

  );
}


