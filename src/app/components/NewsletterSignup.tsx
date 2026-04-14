import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useNewsletter } from "../hooks/useFeatures";

export function NewsletterSignup() {
  const { status, subscribe } = useNewsletter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe(email);
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 py-4 px-8 rounded-full glass-pane border border-accent/30 shadow-gold">
        <CheckCircle2 className="w-6 h-6 text-accent" />
        <p className="text-ink-gradient font-black text-xs uppercase tracking-widest">Successfully Subscribed. Welcome to UB City.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email Address"
        required
        className="flex-1 min-w-0 bg-page border border-[var(--border)] text-ink-gradient rounded-full px-10 py-5 text-base focus:outline-none focus:border-accent transition-all font-black uppercase tracking-widest placeholder:opacity-20 shadow-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-12 py-5 bg-accent text-black font-black tracking-[0.3em] uppercase text-[11px] rounded-full hover:shadow-gold hover:scale-105 transition-all flex items-center justify-center gap-3 shrink-0 whitespace-nowrap !text-black shadow-lg"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>Subscribe <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
}
