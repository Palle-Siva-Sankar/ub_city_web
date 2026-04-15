import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useNewsletter } from "../hooks/useFeatures";

export function NewsletterSignup() {
  const { status, subscribe, isSubscribed, feedActive } = useNewsletter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(email);
  };

  if (isSubscribed || status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
        <div className="flex items-center gap-4 py-4 px-8 rounded-[1.5rem] glass-pane border border-accent/20 shadow-gold relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent group-hover:from-accent/10 transition-colors" />
          <div className="relative flex items-center gap-4">
             <div className="relative">
                <div className="w-3 h-3 rounded-full bg-accent animate-ping absolute inset-0 opacity-40" />
                <div className="w-3 h-3 rounded-full bg-accent relative z-10 shadow-gold" />
             </div>
             <div>
                <p className="text-ink-gradient font-black text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Intelligence Feed: Active</p>
                <p className="text-accent text-[8px] font-black uppercase tracking-widest opacity-60">Synchronized with Nexus Portfolio</p>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2 rounded-full glass-pane border border-[var(--border)] w-fit">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
           <span className="text-[8px] font-black tracking-widest uppercase opacity-40">System Status: Optimal</span>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full group">
      <div className="relative w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full bg-page border border-[var(--border)] text-ink-gradient rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all font-medium tracking-wide placeholder:opacity-30 shadow-sm"
        />
        <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/10 transition-all pointer-events-none" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto px-8 py-4 bg-accent text-black font-black tracking-[0.2em] uppercase text-[10px] rounded-2xl hover:shadow-gold hover:scale-[1.02] transition-all flex items-center justify-center gap-3 !text-black shadow-lg"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>Subscribe <ArrowRight className="w-3.5 h-3.5" /></>
        )}
      </button>
    </form>
  );
}
