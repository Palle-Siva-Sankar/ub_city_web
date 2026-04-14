import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop", caption: "Mall Atrium" },
  { src: "https://images.unsplash.com/photo-1567449303078-57ad995bd329?q=80&w=800&auto=format&fit=crop", caption: "Luxury Wing" },
  { src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop", caption: "Fashion Boulevard" },
  { src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop", caption: "Retail Floor" },
  { src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop", caption: "Luxury Atrium Lounge" },
  { src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop", caption: "INOX Cinema" },
  { src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop", caption: "Fine Dining" },
  { src: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800&auto=format&fit=crop", caption: "Entertainment Zone" },
  { src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", caption: "Food Court" },
  { src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop", caption: "Sportswear District" },
  { src: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop", caption: "Ethnic Fashion" },
  { src: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=800&auto=format&fit=crop", caption: "Tech Hub" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-page hero-readable">
        <HeroVideoEmbed
          title="Gallery"
          posterImage={POSTERS.fashion}
          videoSrc={VIDEOS.fashion}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <div className="mb-12">
               <Link to="/" className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mx-auto pointer-events-auto">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Nexus
               </Link>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-8 mx-auto group hover:bg-accent hover:text-black transition-all">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Visual Stories</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black font-['Outfit'] hero-video-title tracking-tighter uppercase leading-none text-ink-gradient shadow-2xl">
              The <span className="text-gradient">Gallery.</span>
            </h1>
            <p className="text-xl md:text-2xl hero-video-subtitle font-medium max-w-2xl mx-auto leading-relaxed hero-video-glass p-8 rounded-[3rem] text-[color:var(--text-dim)] shadow-xl">
              A curated visual journey through the property's most iconic spaces and moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-page">
        <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div className="overflow-hidden rounded-[3rem] border border-[var(--border)] hover:border-accent transition-all duration-700 shadow-sm hover:shadow-3xl bg-[color:var(--page-bg-alt)]">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                />
              </div>
              <p className="text-center text-[10px] font-black tracking-[0.4em] uppercase text-[color:var(--text-dim)] mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">{img.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 backdrop-blur-3xl bg-[color:var(--page-bg)]/90"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-10 right-10 w-16 h-16 bg-accent border border-accent/20 rounded-full flex items-center justify-center text-black hover:scale-110 transition-all shadow-gold z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
               initial={{ scale: 0.9, y: 30 }}
               animate={{ scale: 1, y: 0 }}
               className="relative max-w-6xl w-full"
               onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-[3rem] shadow-gold border border-accent/20"
              />
              <div className="mt-10 text-center">
                 <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-4">Capturing Excellence</p>
                 <p className="text-ink-gradient text-3xl md:text-5xl font-black font-['Outfit'] uppercase tracking-tighter">{GALLERY_IMAGES[lightbox].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
