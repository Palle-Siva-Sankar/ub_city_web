import { motion } from "motion/react";

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

export function WhyUBCity() {
  // Light, presentation-friendly metrics (avoid heavy chart libs).
  const footfallMax = 700;
  const catchmentMax = 10;

  return (
    <section className="overflow-hidden bg-page">
      <div className="relative z-10 px-6 max-w-[1400px] mx-auto py-18 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10 md:mb-14">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black tracking-[0.5em] uppercase text-accent mb-4">Why This Property</p>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-[0.95]">
                UB City is a <span className="text-gradient">CBD destination</span>, not a strip.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[color:var(--text-dim)] max-w-2xl">
                Premium retail + dining + culture, positioned in Bengaluru’s core with consistent footfall and a high-intent audience.
              </p>
            </div>

            <div className="glass-pane rounded-3xl border p-5 sm:p-6 w-full lg:w-[420px]" style={{ borderColor: "var(--card-border)" }}>
              <p className="text-[10px] font-black tracking-[0.4em] uppercase text-ink-gradient/50 mb-4">Snapshot</p>
              <div className="space-y-3">
                <Bar label="Footfall/mo" value={500} max={footfallMax} />
                <Bar label="Peak/mo" value={650} max={footfallMax} />
                <Bar label="Catchment km" value={5} max={catchmentMax} />
              </div>
              <p className="mt-4 text-[11px] text-[color:var(--text-dim)]">
                Use these as a talk-track baseline; refine with your official numbers in the deck.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { k: "Built-up Area", v: "1.5M+ sq ft", d: "Mixed-use scale across retail, offices, hospitality." },
              { k: "Site", v: "13 acres", d: "Prime CBD location with premium access and visibility." },
              { k: "Footfall", v: "500k+ / month", d: "Consistent traffic with weekend & festive peaks." },
            ].map((c) => (
              <div key={c.k} className="glass-pane lighting-card rounded-[2.2rem] p-6 sm:p-8 border border-[var(--border)]">
                <p className="text-[10px] font-black tracking-[0.35em] uppercase text-ink-gradient/50">{c.k}</p>
                <p className="mt-2 text-3xl sm:text-4xl font-black font-['Outfit'] text-ink-gradient tracking-tight">{c.v}</p>
                <p className="mt-3 text-sm text-[color:var(--text-dim)]">{c.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

