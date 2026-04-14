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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 py-4">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <p className="text-page font-medium text-sm">You're subscribed! Thank you.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 bg-page border border-[var(--border)] text-page rounded-full px-5 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-accent text-[var(--btn-text-on-accent)] font-bold tracking-widest uppercase text-xs rounded-full hover:scale-105 transition-all flex items-center gap-2 shrink-0"
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>Subscribe <ArrowRight className="w-3 h-3" /></>
        )}
      </button>
    </form>
  );
}
