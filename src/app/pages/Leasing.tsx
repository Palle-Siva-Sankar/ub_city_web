import { motion } from "motion/react";
import { Link } from "react-router";
import { ShieldCheck, Download, Store, Zap, Handshake } from "lucide-react";
import { VIDEOS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

export function Leasing() {

  const handleDownload = () => {
    const data = new Blob(["UB City Mall 2026 Prospectus\n\n- Flagship Anchors\n- Inline Retail\n- Pop-up Experiential\n- Demographic Intelligence"], { type: "application/pdf" });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "UB_City_Prospectus_2026.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <div className="page-wrapper bg-page transition-colors duration-500">
      {/* REAL CINEMATIC VIDEO HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Leasing Experience"
          posterImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
          videoSrc={VIDEOS.citySkyline}
        />
        
        <div className="relative z-10 text-center pointer-events-none px-6">
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="text-7xl md:text-9xl font-black font-['Outfit'] text-ink-gradient tracking-tighter mb-8 uppercase leading-none shadow-2xl">
            Leasing <span className="text-gradient">Paths.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium max-w-2xl mx-auto leading-relaxed">
            From temporary pop-ups to flagship anchors, structure your global presence here.
          </motion.p>
        </div>
      </section>

      {/* INTERACTIVE LEASING TIERS */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-page relative z-10 -mt-16 md:-mt-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Flagship Anchor", icon: ShieldCheck, desc: "Massive multi-level footprints for global statements and extreme visibility.", segment: "Luxury / Flagship", detailPath: "/opportunity/flagship-anchor" },
            { title: "Inline Retail", icon: Store, desc: "Strategic corridor placement based on highly curated brand adjacencies.", segment: "Retail / Lifestyle", detailPath: "/opportunity/inline-retail" },
            { title: "Pop-Up & Experiential", icon: Zap, desc: "Short-term incubation spaces to test local markets over heavy traffic weekends.", segment: "F&B / Pop-up", detailPath: "/opportunity/popup-experiential" }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-pane glass-pane-hover active-card lighting-card rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 transition-all duration-500 hover:-translate-y-4 group">
              <item.icon className="w-12 h-12 md:w-16 md:h-16 text-accent mb-6 md:mb-8 bg-accent/10 p-3 rounded-2xl md:rounded-3xl group-hover:scale-110 transition-transform" />
              <h3 className="text-xl md:text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tight mb-4 md:mb-6">{item.title}</h3>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-accent mb-3 md:mb-4 font-black">{item.segment}</p>
              <p className="text-[color:var(--text-dim)] font-black uppercase tracking-[0.1em] mb-8 md:mb-12 text-[10px] md:text-xs leading-relaxed opacity-60 group-hover:opacity-100">{item.desc}</p>
              <Link to={item.detailPath} className="text-ink-gradient text-[10px] md:text-sm font-black uppercase tracking-widest border-b-2 border-accent pb-1 group-hover:text-accent transition-colors outline-none">View Details</Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-32 md:py-40 bg-page-bg-alt border-y border-[var(--border)] text-center px-6 relative z-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-page-bg-alt via-transparent to-page-bg-alt" />
        </div>
        
        <div className="relative z-10">
          <Handshake className="w-16 h-16 md:w-20 md:h-20 text-accent mx-auto mb-8 md:mb-10 drop-shadow-lg" />
          <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-6 md:mb-8 leading-none">Need Detailed Data?</h2>
          <p className="text-lg md:text-2xl text-[color:var(--text-dim)] font-medium italic border-l-4 border-accent pl-8 inline-block mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">Download our comprehensive Retail & Demographics prospectus for 2026.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center gap-4 bg-accent text-black font-black uppercase tracking-[0.4em] text-[10px] md:text-xs px-12 md:px-16 py-5 md:py-6 rounded-full hover:shadow-gold hover:scale-105 transition-all shadow-xl !text-black"
            >
              <Download className="w-5 h-5" /> Download Full Packet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

