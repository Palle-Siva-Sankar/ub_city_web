import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { VIDEOS } from "../data/mediaAssets";

export function Wellness() {
  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500 pt-20">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden premium-card mx-6 md:mx-12 rounded-[4rem]">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.2]">
            <source src={VIDEOS.spaWellness} type="video/mp4" />
          </video>
          <div className="video-gradient-mask" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <div className="mb-12">
               <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mx-auto pointer-events-auto">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Nexus
               </Link>
            </div>
            <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-8">Sanctuary of Serenity</p>
            <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] text-ink-gradient uppercase leading-none tracking-tighter mb-8 shadow-2xl">
              Wellness.<br/><span className="text-gradient">Refined.</span>
            </h1>
            <p className="text-xl text-[color:var(--text-dim)] font-medium leading-relaxed max-w-2xl mx-auto mb-12">Luxury spa experiences, wellness consultations, and premium recovery packages in the heart of the city.</p>
            <Link to="/inquire/wellness" className="btn-luxe">Book Consultation</Link>
          </motion.div>
        </div>
      </section>
      
      <section className="py-32 px-6 md:px-12 bg-page">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="glass-pane p-12 rounded-[3rem] lighting-card border border-[var(--border)]">
                <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase mb-6">Signature Spa</h3>
                <p className="text-[color:var(--text-dim)] leading-relaxed mb-10">Holistic treatments designed to rejuvenate the body and mind using world-class therapeutic techniques.</p>
                <Link to="/wellness/spa" className="inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">Explore Treatments →</Link>
            </div>
            <div className="glass-pane p-12 rounded-[3rem] lighting-card border border-[var(--border)]">
                <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase mb-6">Recovery Suite</h3>
                <p className="text-[color:var(--text-dim)] leading-relaxed mb-10">Advanced sports recovery and therapeutic alignment sessions tailored for the elite urban professional.</p>
                <Link to="/wellness/recovery" className="inline-flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest hover:gap-4 transition-all">View Packages →</Link>
            </div>
         </div>
      </section>
    </div>
  );
}






