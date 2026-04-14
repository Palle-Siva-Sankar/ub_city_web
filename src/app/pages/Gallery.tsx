import { motion } from "motion/react";
import { useState } from "react";
import { X, Sparkles } from "lucide-react";
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
    <div className="page-wrapper bg-page">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-page hero-readable pb-16">
        <HeroVideoEmbed
          title="Gallery"
          posterImage={POSTERS.fashion}
          videoSrc={VIDEOS.fashion}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 mb-8 mx-auto group hover:bg-white/10 transition-colors">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">Visual Stories</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter uppercase leading-[0.95] mb-6">
              The <span className="text-gradient">Gallery.</span>
            </h1>
            <p className="text-xl hero-video-subtitle font-light max-w-2xl mx-auto leading-relaxed hero-video-glass p-4 rounded-2xl">
              A curated visual journey through the property's most iconic spaces and moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-20 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div className="overflow-hidden rounded-[2rem] border border-[var(--glass-border)] hover:border-accent transition-all duration-500 shadow-lg hover:shadow-2xl">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-center text-sm text-muted-custom font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={GALLERY_IMAGES[lightbox].src}
            alt={GALLERY_IMAGES[lightbox].caption}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-10 text-white text-lg font-['Outfit'] font-bold tracking-widest">{GALLERY_IMAGES[lightbox].caption}</p>
        </motion.div>
      )}
    </div>
  );
}

