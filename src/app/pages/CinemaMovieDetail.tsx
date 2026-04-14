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
    <div className="page-wrapper bg-page min-h-screen pt-32">
      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1300px] mx-auto rounded-[2.5rem] overflow-hidden relative h-[360px]">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <Link to="/cinema" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/90 mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to Cinema
            </Link>
            <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] hero-video-title uppercase tracking-tight">{movie.title}</h1>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90">{movie.rating}</span>
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90">{movie.duration}</span>
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90">{movie.genre}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="glass-pane rounded-[2rem] p-8">
            <p className="card-text-contrast text-lg leading-relaxed">{movie.synopsis}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-[color:var(--text-dim)]">
              <span className="inline-flex items-center gap-2"><Languages className="w-4 h-4 text-accent" /> {movie.languages.join(", ")}</span>
              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> {movie.duration}</span>
              <span className="inline-flex items-center gap-2"><Ticket className="w-4 h-4 text-accent" /> {formatINR(movie.priceInr)} onwards</span>
            </div>
          </div>

          <div className="glass-pane rounded-[2rem] p-8">
            <h3 className="text-2xl font-black font-['Outfit'] mb-5">Book Showtime</h3>
            <div className="grid grid-cols-2 gap-3">
              {movie.showtimes.map((time) => (
                <Link
                  key={time}
                  to={`/checkout?movie=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(time)}`}
                  className="px-4 py-3 border border-[var(--border)] rounded-xl text-sm font-bold hover:bg-accent hover:border-accent hover:text-black transition-all text-center"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


