import { motion } from "motion/react";
import { Link } from "react-router";
import { ShieldCheck, Download, Store, Zap, Handshake } from "lucide-react";
import { VIDEOS } from "../data/mediaAssets";

export function Leasing() {
  return (
    <div className="page-wrapper">
      {/* REAL CINEMATIC VIDEO HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-page">
        <div className="video-bg-container">
          <video autoPlay loop muted playsInline className="video-bg opacity-70">
            <source src={VIDEOS.citySkyline} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        
        <div className="relative z-10 text-center pointer-events-none">
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="text-7xl md:text-9xl font-bold font-['Outfit'] text-page tracking-tighter mb-6 drop-shadow-2xl">
            Leasing <span className="text-gold-gradient">Paths.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-page drop-shadow-md font-light max-w-2xl mx-auto">
            From temporary pop-ups to flagship anchors, structure your global presence here.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE LEASING TIERS */}
      <section className="py-32 px-6 md:px-10 bg-page relative z-10 -mt-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "Flagship Anchor", icon: ShieldCheck, desc: "Massive multi-level footprints for global statements and extreme visibility.", segment: "Luxury / Flagship", detailPath: "/opportunity/flagship-anchor" },
            { title: "Inline Retail", icon: Store, desc: "Strategic corridor placement based on highly curated brand adjacencies.", segment: "Retail / Lifestyle", detailPath: "/opportunity/inline-retail" },
            { title: "Pop-Up & Experiential", icon: Zap, desc: "Short-term incubation spaces to test local markets over heavy traffic weekends.", segment: "F&B / Pop-up", detailPath: "/opportunity/popup-experiential" }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-pane glass-pane-hover rounded-[3rem] p-12 transition-all duration-500 hover:-translate-y-4 group">
              <item.icon className="w-16 h-16 text-accent mb-8 bg-accent/10 p-3 rounded-3xl group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold font-['Outfit'] text-page mb-6">{item.title}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-4 font-black">{item.segment}</p>
              <p className="text-muted-custom font-light mb-12 text-lg">{item.desc}</p>
              <Link to={item.detailPath} className="text-page text-sm font-bold uppercase tracking-widest border-b-2 border-accent pb-1 group-hover:text-accent transition-colors outline-none">View Details</Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-40 bg-page-alt border-y border-[var(--card-border)] text-center px-6 relative z-20">
        <Handshake className="w-20 h-20 text-accent mx-auto mb-10 drop-shadow-lg" />
        <h2 className="text-6xl font-['Outfit'] font-bold text-page mb-8">Need Detailed Data?</h2>
        <p className="text-2xl text-muted-custom mb-12 max-w-2xl mx-auto font-light">Download our comprehensive Retail & Demographics prospectus for 2026.</p>
        <Link to="/strategy" className="inline-flex items-center gap-4 bg-page text-page border border-[var(--card-border)] font-bold uppercase tracking-widest text-sm px-12 py-6 rounded-full hover:bg-accent hover:text-[var(--btn-text-on-accent)] hover:border-accent transition-all shadow-xl">
          <Download className="w-6 h-6" /> Download Full Packet
        </Link>
      </section>
    </div>
  );
}

