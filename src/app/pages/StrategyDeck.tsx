import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";

const DECK_SLIDES = [
  { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop", text: "Executive Summary & Master Plan" },
  { img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop", text: "Global Leasing Footprints" },
  { img: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop", text: "Audience Monetization Architecture" }
];

export function StrategyDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => (prev + 1) % DECK_SLIDES.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + DECK_SLIDES.length) % DECK_SLIDES.length);
  const downloadCurrentSlide = () => {
    const link = document.createElement("a");
    link.href = DECK_SLIDES[currentSlide].img;
    link.download = `ub-city-strategy-slide-${currentSlide + 1}.jpg`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  return (
    <>
      <div className="bg-page min-h-screen flex flex-col pt-32 pb-20 transition-colors duration-500 relative overflow-hidden">
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[120px] pointer-events-none" />
       
       <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
         <Link to="/" className="group inline-flex items-center gap-6 px-8 py-4 glass-pane border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Terminate Perspective
         </Link>
         <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-2">Secure Archive Protocol</p>
            <h1 className="text-3xl md:text-5xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">Operational <span className="text-gradient">Mandates.</span></h1>
         </div>
         <button onClick={downloadCurrentSlide} className="group inline-flex items-center gap-6 px-8 py-4 rounded-full bg-accent/10 border border-accent/20 text-accent font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent hover:text-black transition-all shadow-lg">
            <Download className="w-5 h-5" /> Initialize Download <span className="opacity-40">(24MB Secure)</span>
         </button>
       </div>

       <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-center relative z-10">
          <div className="w-full aspect-[16/9] glass-pane lighting-card rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden relative group border border-accent/20">
             <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
             
             <AnimatePresence mode="wait">
               <motion.div 
                 key={currentSlide}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute inset-0"
               >
                 <img src={DECK_SLIDES[currentSlide].img} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" alt="Slide" />
                 <div className="absolute inset-0 bg-gradient-to-t from-page via-page/20 to-transparent flex items-end p-16 md:p-24">
                    <div className="max-w-3xl">
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-px bg-accent" />
                          <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase">Sector Analysis {currentSlide + 1}</p>
                       </div>
                       <h2 className="text-5xl md:text-7xl font-['Outfit'] font-black text-ink-gradient uppercase tracking-tighter leading-none drop-shadow-2xl">{DECK_SLIDES[currentSlide].text}</h2>
                    </div>
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Navigation Controls */}
             <div className="absolute inset-y-0 left-0 flex items-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button onClick={prev} className="w-20 h-20 glass-pane rounded-full border border-accent/40 flex items-center justify-center text-accent hover:bg-accent hover:text-black transition-all shadow-gold group/btn">
                   <ChevronLeft className="w-8 h-8 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
             </div>
             <div className="absolute inset-y-0 right-0 flex items-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button onClick={next} className="w-20 h-20 glass-pane rounded-full border border-accent/40 flex items-center justify-center text-accent hover:bg-accent hover:text-black transition-all shadow-gold group/btn">
                   <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" />
                </button>
             </div>

             {/* Registry Index */}
             <div className="absolute bottom-12 right-12 glass-pane border border-accent/30 px-10 py-4 rounded-full shadow-gold text-accent font-black tracking-[0.4em] text-[10px] uppercase">
               Registry Node 0{currentSlide + 1} // 0{DECK_SLIDES.length}
             </div>
          </div>
       </div>
      </div>
      <Footer />
    </>
  );
}



