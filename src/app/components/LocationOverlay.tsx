import { motion, AnimatePresence } from "motion/react";
import { MapPin, X, Check, Search, Map } from "lucide-react";
import { useState, useEffect } from "react";
import { useUserLocation } from "../hooks/useUserLocation";

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_CITIES = [
  { city: "Bloomington, MN", region: "Karnataka" },
  { city: "Mumbai", region: "Maharashtra" },
  { city: "Delhi", region: "NCR" },
  { city: "Hyderabad", region: "Telangana" },
  { city: "Chennai", region: "Tamil Nadu" },
];

export function LocationOverlay({ isOpen, onClose }: LocationOverlayProps) {
  const { city: currentCity, setManualLocation } = useUserLocation();
  const [inputValue, setInputValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setInputValue("");
    } else {
      document.body.style.overflow = "";
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // Simulate pincode or city processing
    // In a real app, we'd look up the pincode, but here we'll just set it
    setManualLocation(inputValue, "Selected Region");
    setIsSuccess(true);
    setTimeout(onClose, 800);
  };

  const handleSelect = (city: string, region: string) => {
    setManualLocation(city, region);
    setIsSuccess(true);
    setTimeout(onClose, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-lg glass-pane border border-accent/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-gold">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-ink-gradient uppercase tracking-tight">Select Location</h2>
                  <p className="text-[9px] font-black text-accent uppercase tracking-[0.3em]">Current: {currentCity}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            {/* Input Field */}
            <form onSubmit={handleSubmit} className="relative mb-10">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/50" />
              <input
                autoFocus
                type="text"
                placeholder="Enter Pincode or City..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-24 text-[13px] font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all uppercase tracking-widest"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-3 bg-accent text-on-accent text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-gold transition-all"
              >
                Set
              </button>
            </form>

            {/* Popular Cities */}
            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">Popular Destinations</p>
              <div className="grid grid-cols-1 gap-3">
                {POPULAR_CITIES.map((item) => (
                  <button
                    key={item.city}
                    onClick={() => handleSelect(item.city, item.region)}
                    className="flex items-center justify-between p-5 rounded-2xl border border-white/5 hover:border-accent/40 bg-white/5 hover:bg-accent/10 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <Map className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                      <span className="text-[11px] font-black text-white/80 group-hover:text-white uppercase tracking-widest">{item.city}</span>
                    </div>
                    <span className="text-[8px] font-bold text-white/20 group-hover:text-accent/50 uppercase">{item.region}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-10 bg-black/95 flex flex-col items-center justify-center text-center p-8 transition-all"
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6 shadow-gold"
                  >
                    <Check className="w-10 h-10 text-on-accent" strokeWidth={4} />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Location Updated</h3>
                  <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing local catalog...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
