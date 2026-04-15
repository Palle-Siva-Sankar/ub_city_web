import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, Languages, Ticket, Armchair, ShieldCheck, CreditCard, CheckCircle2 } from "lucide-react";
import { CINEMA_MOVIES } from "../data/cinemaData";
import { formatINR } from "../utils/currency";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function CinemaMovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = CINEMA_MOVIES.find((item) => item.id === id);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 10;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingConfirmed(true);
      toast.success("Booking Request Synchronized", {
        description: `Notification dispatched to your registered vector for ${movie?.title}.`
      });
    }, 2000);
  };

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

  const totalPrice = selectedSeats.length * movie.priceInr;

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pb-40">
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

      <section className="px-6 md:px-12 mb-16">
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
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              {movie.showtimes.map((time) => (
                <button
                  key={time}
                  onClick={() => { setSelectedTime(time); setSelectedSeats([]); }}
                  className={`px-6 py-5 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all text-center shadow-sm active:scale-95 border ${selectedTime === time ? "bg-accent text-black border-accent" : "glass-pane border-[var(--border)] hover:border-accent text-ink-gradient"}`}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-widest text-accent mt-6 opacity-60 text-center">Select time to deploy seat map</p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedTime && !bookingConfirmed && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="px-6 md:px-12 mt-20"
          >
            <div className="max-w-[1400px] mx-auto glass-pane lighting-card rounded-[4rem] p-12 md:p-20 border border-accent/20 shadow-gold">
               <div className="text-center mb-20">
                  <p className="text-accent text-[11px] font-black uppercase tracking-[0.8em] mb-4">Seat Selection</p>
                  <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">Choose your <span className="text-gradient">Experience.</span></h2>
                  
                  {/* SCREEN */}
                  <div className="w-full max-w-3xl mx-auto h-2 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full shadow-[0_15px_30px_rgba(210,210,215,0.2)] mb-8" />
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent opacity-40">Cinema Screen</p>
               </div>

               <div className="flex flex-col items-center gap-10 mb-20">
                  {/* PLATINUM SECTION (Back) */}
                  <div className="w-full">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.6em] text-accent-gold mb-8 italic">Platinum Experience (INR 650)</p>
                    <div className="flex flex-col items-center gap-4">
                        {["F", "E"].map(row => (
                            <div key={row} className="flex gap-4">
                            <span className="w-8 text-[11px] font-black text-accent/40 flex items-center justify-center pt-1">{row}</span>
                            <div className="flex gap-3">
                                {Array.from({ length: seatsPerRow }).map((_, i) => {
                                    const seatId = `${row}${i + 1}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    const isReserved = (row === "F" && i > 7);
                                    
                                    return (
                                    <button
                                        key={seatId}
                                        disabled={isReserved}
                                        onClick={() => toggleSeat(seatId)}
                                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all ${isReserved ? "bg-accent/5 text-accent/10 border border-transparent cursor-not-allowed" : isSelected ? "bg-accent text-black scale-110 shadow-gold" : "glass-pane border-accent-gold/30 text-accent-gold/40 hover:border-accent-gold hover:text-accent-gold"}`}
                                    >
                                        <Armchair className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                    );
                                })}
                            </div>
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="w-2/3 h-px bg-[var(--border)] my-4 opacity-50" />

                  {/* GOLD SECTION (Front) */}
                  <div className="w-full">
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-8 italic">Gold Comfort (INR 450)</p>
                    <div className="flex flex-col items-center gap-4">
                        {["D", "C", "B", "A"].map(row => (
                            <div key={row} className="flex gap-4">
                            <span className="w-8 text-[11px] font-black text-accent/40 flex items-center justify-center pt-1">{row}</span>
                            <div className="flex gap-3">
                                {Array.from({ length: seatsPerRow }).map((_, i) => {
                                    const seatId = `${row}${i + 1}`;
                                    const isSelected = selectedSeats.includes(seatId);
                                    const isReserved = (row === "A" && i < 3);
                                    
                                    return (
                                    <button
                                        key={seatId}
                                        disabled={isReserved}
                                        onClick={() => toggleSeat(seatId)}
                                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all ${isReserved ? "bg-accent/5 text-accent/10 border border-transparent cursor-not-allowed" : isSelected ? "bg-accent text-black scale-110 shadow-gold" : "glass-pane border-[var(--border)] text-accent/40 hover:border-accent hover:text-accent"}`}
                                    >
                                        <Armchair className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                    );
                                })}
                            </div>
                            </div>
                        ))}
                    </div>
                  </div>
               </div>

               <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-16 border-t border-[var(--border)]">
                  <div className="flex gap-10">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded bg-accent/20 border border-accent/10" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Available</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded bg-accent shadow-gold" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Selected</span>
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-10">
                     <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Seats Selected</p>
                        <p className="text-lg md:text-2xl font-black text-ink-gradient uppercase tracking-tight font-['Outfit']">
                          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                        </p>
                     </div>
                     <div className="h-10 w-px bg-[var(--border)] hidden md:block" />
                     <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Total Amount</p>
                        <p className="text-2xl md:text-4xl font-black text-ink-gradient uppercase tracking-tighter font-['Outfit']">
                          {formatINR(selectedSeats.reduce((acc, seat) => acc + (["F", "E"].includes(seat[0]) ? 650 : 450), 0))}
                        </p>
                     </div>
                     <button 
                        disabled={selectedSeats.length === 0 || isBooking}
                        onClick={handleBook}
                        className="btn-luxe !px-16 !py-6 disabled:opacity-20 disabled:scale-100 disabled:grayscale transition-all"
                      >
                        {isBooking ? (
                          <div className="flex items-center gap-4">
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <CreditCard className="w-6 h-6" /> Confirm Booking
                          </div>
                        )}
                      </button>
                  </div>
               </div>
            </div>
          </motion.section>
        )}

        {bookingConfirmed && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 md:px-12 mt-20"
          >
            <div className="max-w-4xl mx-auto glass-pane rounded-[4rem] p-20 text-center border border-accent relative overflow-hidden shadow-gold">
               <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-gold" />
               <CheckCircle2 className="w-24 h-24 text-accent mx-auto mb-10" />
               <p className="text-accent text-[11px] font-black uppercase tracking-[0.5em] mb-6">Booking Confirmed</p>
               <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">Enjoy the <br/><span className="text-gradient">Show.</span></h2>
               <div className="glass-pane p-10 rounded-[2.5rem] border border-accent/10 mb-12 text-left max-w-xl mx-auto">
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-6 italic">Your Ticket</p>
                 <div className="space-y-4">
                    <div className="flex justify-between border-b border-[var(--border)] pb-4">
                       <span className="text-[10px] font-black text-accent uppercase">Movie</span>
                       <span className="text-[11px] font-black text-ink-gradient uppercase">{movie.title}</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border)] pb-4">
                       <span className="text-[10px] font-black text-accent uppercase">Showtime</span>
                       <span className="text-[11px] font-black text-ink-gradient uppercase">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border)] pb-4">
                       <span className="text-[10px] font-black text-accent uppercase">Seats</span>
                       <span className="text-[11px] font-black text-ink-gradient uppercase">{selectedSeats.join(", ")}</span>
                    </div>
                 </div>
               </div>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <Link to="/cinema" className="btn-luxe !px-16">Back to Cinema</Link>
                 <Link to="/profile" className="px-12 py-5 glass-pane border border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-ink-gradient rounded-full hover:border-accent transition-all">My Bookings</Link>
               </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}



