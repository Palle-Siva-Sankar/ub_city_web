import { motion } from "motion/react";
import { Link } from "react-router";

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 shrink-0 text-[10px] font-black uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
        {label}
      </div>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "color-mix(in srgb, var(--border) 55%, transparent)" }}>
        <div className="h-full rounded-full bg-gradient-premium" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-12 text-right text-[10px] font-black tracking-[0.18em] text-[color:var(--text-dim)]">{value}</div>
    </div>
  );
}

export function WhyMOA() {
  // Light, presentation-friendly metrics (avoid heavy chart libs).
  const footfallMax = 700;
  const catchmentMax = 10;

  return (
    <section className="overflow-hidden bg-page">
      <div className="relative z-10 px-6 max-w-[1400px] mx-auto py-18 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10 md:mb-14">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-accent mb-4">Why This Property</p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-[0.95]">
                MOA is a <span className="text-gradient">global hub</span>, not just a mall.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[color:var(--text-dim)] max-w-2xl">
                North America's premier retail + entertainment destination with over 40 million annual guests and world-class engagement.
              </p>
            </div>

            <div className="glass-pane rounded-3xl border p-5 sm:p-6 w-full lg:w-[420px]" style={{ borderColor: "var(--card-border)" }}>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-ink-gradient/50 mb-4">Snapshot</p>
              <div className="space-y-3">
                <Bar label="Guests / yr" value={400} max={footfallMax} />
                <Bar label="Brands" value={500} max={footfallMax} />
                <Bar label="Sq Ft (M)" value={5.6} max={catchmentMax} />
              </div>
              <p className="mt-4 text-[11px] text-[color:var(--text-dim)]">
                Use these as a talk-track baseline; refine with your official numbers in the deck.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { k: "Total Area", v: "5.6M sq ft", d: "The largest shopping and entertainment complex in North America.", to: "/opportunity/flagship-anchor" },
              { k: "Retailers", v: "520+ Stores", d: "Unrivaled category dominance from luxury to experiential retail.", to: "/opportunity/inline-retail" },
              { k: "Annual Guests", v: "40M+ / year", d: "Captive audience with high dwell time and repeat visitation.", to: "/demographics" },
            ].map((c) => (
              <Link key={c.k} to={c.to} className="glass-pane active-card lighting-card rounded-[2.2rem] p-6 sm:p-8 border border-[var(--border)] group block hover:border-accent transition-all duration-500">
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-accent mb-4 opacity-70 group-hover:opacity-100">{c.k}</p>
                <p className="mt-2 text-3xl sm:text-4xl font-black font-['Outfit'] text-ink-gradient tracking-tight uppercase leading-none group-hover:text-accent transition-colors">{c.v}</p>
                <p className="mt-6 text-xs text-[color:var(--text-dim)] font-black uppercase tracking-widest leading-relaxed opacity-60 group-hover:opacity-100">{c.d}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

