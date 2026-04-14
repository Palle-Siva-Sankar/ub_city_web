import { useState } from "react";
import { motion } from "motion/react";
import { Package, Truck, Bell, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

const PREFS_KEY = "mall_profile_preferences";

export function AcquisitionIntel() {
  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY) || '{"orderUpdates": true}');
    } catch {
      return { orderUpdates: true };
    }
  });

  const toggle = () => {
    const next = { ...prefs, orderUpdates: !prefs.orderUpdates };
    setPrefs(next);
    localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    toast.success(`Logistics Tracking: ${next.orderUpdates ? "Active" : "Deactivated"}`);
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
              <Package className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-2">Acquisition Intel</h1>
              <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Logistics & Deployment Registry</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 rounded-[2rem] border border-[var(--border)] bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-md">
                <h3 className="text-xl font-black text-ink-gradient uppercase mb-2">Real-time Logistics Sync</h3>
                <p className="text-sm text-[color:var(--text-dim)] font-medium leading-relaxed italic">Receive sub-second updates on dispatch, routing, and final delivery protocols.</p>
              </div>
              <button 
                onClick={toggle}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-700 ${
                  prefs.orderUpdates ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)]"
                }`}
              >
                {prefs.orderUpdates ? "Active Protocol" : "Standby Mode"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <Bell className="w-8 h-8 text-accent mb-6" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Notification Channels</h4>
                 <div className="space-y-4">
                    {["Direct SMS Protocol", "Secure Email Link", "OS-Level Push Alerts"].map(c => (
                      <div key={c} className="flex items-center justify-between py-3 border-b border-white/5">
                        <span className="text-[10px] font-bold text-[color:var(--text-dim)] uppercase tracking-widest">{c}</span>
                        <div className="w-10 h-5 rounded-full bg-accent/20 border border-accent/30 relative">
                           <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-accent shadow-gold" />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 rounded-[2rem] border border-[var(--border)] glass-pane">
                 <Shield className="w-8 h-8 text-accent mb-6" />
                 <h4 className="text-lg font-black text-ink-gradient uppercase mb-4">Privacy Layers</h4>
                 <p className="text-xs text-[color:var(--text-dim)] leading-relaxed italic mb-6">Aggregate your logistics data without exposing PII to external carrier networks.</p>
                 <div className="flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> Military Grade Encryption Active
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
