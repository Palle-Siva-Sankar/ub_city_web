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
      <div className="bg-[#050507] min-h-screen flex flex-col pt-24 pb-10">
       <div className="max-w-[1200px] w-full mx-auto px-6 mb-8 flex justify-between items-center">
         <Link to={-1 as any} className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/50 hover:text-white transition-colors uppercase">
            <ArrowLeft className="w-4 h-4" /> Exit Document Viewer
         </Link>
         <button onClick={downloadCurrentSlide} className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#C8A951] uppercase hover:text-white transition-colors">
            <Download className="w-4 h-4" /> Download PDF (24MB)
         </button>
       </div>

       <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 flex items-center justify-center relative">
          {/* Simulated PDF Viewer Frame */}
          <div className="w-full aspect-[16/9] bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group border border-white/10">
             
             <AnimatePresence mode="wait">
               <motion.div 
                 key={currentSlide}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="absolute inset-0"
               >
                 <img src={DECK_SLIDES[currentSlide].img} className="w-full h-full object-cover opacity-90" alt="Slide" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
                    <h2 className="text-4xl font-['Outfit'] font-bold text-white drop-shadow-xl">{DECK_SLIDES[currentSlide].text}</h2>
                 </div>
               </motion.div>
             </AnimatePresence>

             {/* Navigation Arrows */}
             <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black">
                <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black">
                <ChevronRight className="w-6 h-6" />
             </button>

             {/* Page Indicator */}
             <div className="absolute bottom-6 right-8 text-white font-bold font-mono tracking-widest bg-black/50 px-4 py-1 rounded-full text-xs">
               0{currentSlide + 1} / 0{DECK_SLIDES.length}
             </div>
          </div>
       </div>
      </div>
      <Footer />
    </>
  );
}
