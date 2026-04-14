import { Link, useParams } from "react-router";
import { ArrowLeft, Clock, Languages, Ticket } from "lucide-react";
import { CINEMA_MOVIES } from "../data/cinemaData";
import { formatINR } from "../utils/currency";

export function CinemaMovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movie = CINEMA_MOVIES.find((item) => item.id === id);

  if (!movie) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-36 px-6">
        <div className="max-w-4xl mx-auto text-center py-24">
          <h1 className="text-5xl font-black font-['Outfit'] text-ink-gradient">Movie Not Found</h1>
          <Link to="/cinema" className="btn-luxe mt-8">Back to Cinema</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      <section className="px-6 md:px-12 pt-32 mb-10">
        <div className="max-w-[1400px] mx-auto rounded-[4rem] overflow-hidden relative h-[450px] shadow-gold lighting-card">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover grayscale-[0.3] dark:grayscale-0" />
          <div className="video-gradient-mask absolute inset-0" />
          
          <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-end relative z-10">
            <Link to="/cinema" className="group inline-flex items-center gap-4 px-6 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mb-10 w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Cinematic Vault
            </Link>
             <div className="flex items-center gap-4 mb-8">
               <Ticket className="w-6 h-6 text-accent" />
               <span className="text-[10px] font-black tracking-[0.5em] text-accent uppercase">Executive Screening</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] text-white uppercase tracking-tighter leading-none mb-10 shadow-2xl">
               {movie.title}
             </h1>
             
             <div className="flex flex-wrap gap-4 text-[10px] font-black tracking-widest uppercase items-center">
               <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{movie.rating}</span>
               <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{movie.duration}</span>
               <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{movie.genre}</span>
             </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-12">
          <div className="glass-pane lighting-card rounded-[3.5rem] p-12 md:p-16 border border-[var(--border)] shadow-sm">
            <p className="text-ink-gradient text-2xl md:text-3xl font-light italic leading-relaxed mb-12">"{movie.synopsis}"</p>
            <div className="grid sm:grid-cols-3 gap-8 pt-10 border-t border-[var(--border)]">
              {[
                { icon: Languages, label: "Experience Languages", value: movie.languages.join(", ") },
                { icon: Clock, label: "Total Runtime", value: movie.duration },
                { icon: Ticket, label: "Price Scale", value: `${formatINR(movie.priceInr)} onwards` }
              ].map((info, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <info.icon className="w-5 h-5 text-accent" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent">{info.label}</p>
                  </div>
                  <p className="text-ink-gradient font-black text-lg tracking-tight uppercase leading-none">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-pane lighting-card rounded-[3.5rem] p-12 border border-[var(--border)] flex flex-col shadow-sm">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
               </div>
               <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter">Showtimes</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              {movie.showtimes.map((time) => (
                <Link
                  key={time}
                  to={`/checkout?movie=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(time)}`}
                  className="px-6 py-5 glass-pane border border-[var(--border)] rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase hover:bg-accent hover:text-black transition-all text-center shadow-sm active:scale-95"
                >
                  {time}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto p-8 rounded-[2.5rem] bg-accent/10 border border-accent/20">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-3 text-center">Executive Support</p>
               <p className="text-center text-[color:var(--text-dim)] text-xs font-medium leading-relaxed">Early booking unlocks preferential seating in the Platinum suites.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


