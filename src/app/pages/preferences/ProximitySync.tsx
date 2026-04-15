import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Radio, EyeOff, Globe, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const PREFS_KEY = "mall_profile_preferences";

export function ProximitySync() {
  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY) || '{"locationOffers": true}');
    } catch {
      return { locationOffers: true };
    }
  });

  const toggle = () => {
    const next = { ...prefs, locationOffers: !prefs.locationOffers };
    setPrefs(next);
    localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    toast.success(`Proximity Sync: ${next.locationOffers ? "Broadcasting" : "Invisible"}`);
  };

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/profile" className="inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-12 hover:gap-4 transition-all">
          <ArrowLeft className="w-4 h-4" /> Return to Profile
        </Link>

        <section className="glass-pane lighting-card rounded-[3rem] p-10 md:p-16 border border-[var(--border)] shadow-2xl overflow-hidden relative">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-gold">
              <MapPin className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-2">Proximity Sync</h1>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Spatial Awareness Registry</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 rounded-[2rem] border border-[var(--border)] bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-md">
                <h3 className="text-xl font-black text-ink-gradient uppercase mb-2">Beacon Discovery</h3>
                <p className="text-sm text-[color:var(--text-dim)] font-medium leading-relaxed italic">Synchronize with UB City's hyper-local beacon network for boutique navigation and real-time floor-specific experiences.</p>
              </div>
              <button 
                onClick={toggle}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-700 ${
                  prefs.locationOffers ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)]"
                }`}
              >
                {prefs.locationOffers ? "Discovery Active" : "Incognito Mode"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <Radio className="w-8 h-8 text-accent mb-6 animate-pulse" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Sensitivity Protocol</h4>
                 <select className="w-full glass-pane border border-accent/20 rounded-[1.5rem] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-accent outline-none bg-page/50">
                    <option>High Sensitivity (Real-time)</option>
                    <option>Standard Discovery</option>
                    <option>Passive Sync Only</option>
                 </select>
              </div>

              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <EyeOff className="w-8 h-8 text-red-400 mb-6" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Stealth Analytics</h4>
                 <p className="text-xs text-[color:var(--text-dim)] leading-relaxed italic mb-6">Prevent the central dashboard from logging your exact floor-pathing data.</p>
                 <div className="flex items-center gap-3 text-red-400/60 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> Global Steath Protocol Offline
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

