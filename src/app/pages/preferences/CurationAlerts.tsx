import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, MessageSquare, Zap, Target, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const PREFS_KEY = "mall_profile_preferences";

export function CurationAlerts() {
  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY) || '{"promoAlerts": true}');
    } catch {
      return { promoAlerts: true };
    }
  });

  const toggle = () => {
    const next = { ...prefs, promoAlerts: !prefs.promoAlerts };
    setPrefs(next);
    localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    toast.success(`Curation Alerts: ${next.promoAlerts ? "Synchronized" : "Paused"}`);
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
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-2">Curation Alerts</h1>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Elite Drop Synchronization</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 rounded-[2rem] border border-[var(--border)] bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-md">
                <h3 className="text-xl font-black text-ink-gradient uppercase mb-2">Tactical Drop Updates</h3>
                <p className="text-sm text-[color:var(--text-dim)] font-medium leading-relaxed italic">Stay ahead of the curve with real-time alerts on boutique launches, seasonal curations, and priority events.</p>
              </div>
              <button 
                onClick={toggle}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-700 ${
                  prefs.promoAlerts ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)]"
                }`}
              >
                {prefs.promoAlerts ? "Sync Active" : "Sync Disabled"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <Target className="w-8 h-8 text-accent mb-6" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Interest Sectors</h4>
                 <div className="flex flex-wrap gap-2">
                    {["Luxury Retail", "Fine Dining", "Cinematic Arts", "Wellness Hub"].map(s => (
                      <div key={s} className="px-5 py-2 rounded-full glass-pane border border-accent/20 text-[9px] font-black uppercase tracking-widest text-accent">
                        {s}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <Zap className="w-8 h-8 text-accent mb-6" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Priority Frequency</h4>
                 <p className="text-xs text-[color:var(--text-dim)] leading-relaxed italic mb-6">Control how often you receive high-signal alerts from our boutique network.</p>
                 <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-[70%] bg-accent shadow-gold" />
                 </div>
                 <div className="flex justify-between mt-4 text-[8px] font-black uppercase text-accent/40 tracking-widest">
                    <span>Sparse</span>
                    <span>Hyper-Focused</span>
                    <span>Critical</span>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

