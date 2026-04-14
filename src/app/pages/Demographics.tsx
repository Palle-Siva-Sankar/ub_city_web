import { motion } from "motion/react";
import { ArrowLeft, Users, Globe2, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router";

export function Demographics() {
  return (
    <div className="bg-page min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Link to={-1 as any} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-page opacity-50 hover:opacity-100 transition-opacity uppercase mb-12">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-accent text-sm tracking-[0.4em] font-bold uppercase mb-4">Interactive Spreadsheet Replacement</p>
          <h1 className="text-5xl md:text-7xl font-['Outfit'] font-bold text-page mb-6 tracking-tight">
            Footfall & <br/><span className="text-gold-gradient">Demographic Intelligence</span>
          </h1>
          <p className="text-xl text-muted-custom font-light max-w-3xl">
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
             <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass-pane p-8 rounded-[2rem] border border-[var(--glass-border)]">
               <stat.icon className="w-8 h-8 text-accent mb-6" />
               <div className="text-4xl font-bold font-['Outfit'] text-page mb-2">{stat.value}</div>
               <div className="text-xs font-bold tracking-widest uppercase text-page opacity-50">{stat.label}</div>
             </motion.div>
          ))}
        </div>

        {/* Data Dashboards */}
        <div className="grid md:grid-cols-2 gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-pane rounded-[3rem] p-10 border border-[var(--glass-border)] shadow-xl">
              <h3 className="text-2xl font-['Outfit'] font-bold text-page mb-8">Audience Capture Rates</h3>
              {/* Fake Bar Chart */}
              <div className="space-y-6">
                {[
                  { segment: "Local (0-50m)", pct: 45 },
                  { segment: "Regional (50-250m)", pct: 35 },
                  { segment: "National / Global", pct: 20 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-bold tracking-widest uppercase text-page mb-2">
                       <span>{item.segment}</span>
                       <span className="text-accent">{item.pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-[var(--page-bg-alt)] rounded-full overflow-hidden border border-[var(--border)]">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-accent" />
                    </div>
                  </div>
                ))}
              </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-pane rounded-[3rem] p-10 border border-[var(--glass-border)] shadow-xl hidden md:flex flex-col">
              <h3 className="text-2xl font-['Outfit'] font-bold text-page mb-8">Sales Velocity Heatmap</h3>
              <div className="flex-1 rounded-2xl bg-[var(--page-bg-alt)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent to-transparent mix-blend-screen" />
                 <p className="text-page opacity-40 font-bold uppercase tracking-widest text-xs z-10 text-center px-4">Interactive Heatmap Loading...<br/>(Live Integration Required)</p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
