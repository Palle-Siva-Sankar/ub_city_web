import { motion } from "motion/react";
import { ArrowLeft, Users, Globe2, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router";

export function Demographics() {
  return (
    <div className="bg-page min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Link to={-1 as any} className="inline-flex items-center gap-2 text-sm font-black tracking-widest text-ink-gradient opacity-60 hover:opacity-100 transition-opacity uppercase mb-12">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4">Market Intelligence Registry</p>
          <h1 className="text-5xl md:text-[8rem] font-['Outfit'] font-black text-ink-gradient mb-6 tracking-tighter uppercase leading-none">
            Footfall & <br/><span className="text-gold-gradient">Demographics.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium max-w-3xl leading-relaxed italic border-l-2 border-accent/30 pl-8">
            Live metrics showing this destination operates not as a traditional shopping center, but as a commercial district with premium repeat footfall and strong regional pull.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Monthly Footfall", value: "500k+", icon: Users },
            { label: "Regional Draw", value: "5 km Core Catchment", icon: Globe2 },
            { label: "Avg Dwell Time", value: "3.5 Hours", icon: TrendingUp },
            { label: "Premium Spend Mix", value: "High", icon: DollarSign },
          ].map((stat, i) => (
             <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-pane p-8 rounded-[2rem] border border-[var(--border)] lighting-card group">
               <stat.icon className="w-8 h-8 text-accent mb-6" />
               <div className="text-4xl font-black font-['Outfit'] text-ink-gradient mb-2 group-hover:text-accent transition-colors tracking-tighter">{stat.value}</div>
               <div className="text-[10px] font-black tracking-[0.2em] uppercase text-ink-gradient opacity-60 group-hover:opacity-100">{stat.label}</div>
             </motion.div>
          ))}
        </div>

        {/* Data Dashboards */}
        <div className="grid md:grid-cols-2 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-pane rounded-[3rem] p-10 border border-[var(--border)] shadow-xl lighting-card">
              <h3 className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tight mb-8">Audience Capture Rates</h3>
              {/* Fake Bar Chart */}
              <div className="space-y-6">
                {[
                  { segment: "Local (0-5m)", pct: 45 },
                  { segment: "Regional (5-25km)", pct: 35 },
                  { segment: "National / Global", pct: 20 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-black tracking-[0.2em] uppercase text-ink-gradient mb-2">
                       <span className="opacity-60">{item.segment}</span>
                       <span className="text-accent">{item.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-page-bg-alt rounded-full overflow-hidden border border-[var(--border)]">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-accent" />
                    </div>
                  </div>
                ))}
              </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-pane rounded-[3rem] p-10 border border-[var(--border)] shadow-xl hidden md:flex flex-col lighting-card">
              <h3 className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tight mb-8">Sales Velocity Heatmap</h3>
              <div className="flex-1 rounded-2xl bg-page-bg-alt border border-[var(--border)] relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent to-transparent mix-blend-screen" />
                 <p className="text-ink-gradient opacity-40 font-black uppercase tracking-[0.2em] text-[10px] z-10 text-center px-4 leading-loose">Interactive Heatmap Loading...<br/>(Live Integration Required)</p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

