import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { VIDEOS, POSTERS } from "../data/mediaAssets";
import { HeroVideoEmbed } from "../components/HeroVideoEmbed";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200",
    caption: "The Grand Rotunda",
  },
  {
    src: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1200",
    caption: "Technology & Innovation Wing",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
    caption: "Luxury Fashion Avenue",
  },
  {
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200",
    caption: "Premium Retail Hub",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
    caption: "World-Class Gastronomy",
  },
  {
    src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200",
    caption: "Mall of America Cinemas",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    caption: "Evening Exterior View",
  },
  {
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200",
    caption: "Rotunda Event Space",
  },
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
    caption: "Artisan Dining Court",
  },
  {
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200",
    caption: "Entertainment District",
  },
  {
    src: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1200",
    caption: "North Wing Atrium",
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200",
    caption: "Guest Wellness Lounge",
  },
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="mb-12">
              <Link
                to="/"
                className="group inline-flex items-center gap-4 px-8 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-on-accent transition-all shadow-gold mx-auto pointer-events-auto"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />{" "}
                Return to Nexus
              </Link>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/20 backdrop-blur-2xl border border-accent/30 mb-8 mx-auto group hover:bg-accent hover:text-black transition-all">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase hero-video-kicker">
                Visual Stories
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-8xl font-black font-['Outfit'] hero-video-title tracking-tighter uppercase leading-none text-ink-gradient shadow-2xl">
              The <span className="text-gradient">Gallery.</span>
            </h1>
            <p className="text-lg md:text-xl hero-video-subtitle font-medium max-w-2xl mx-auto leading-relaxed hero-video-glass p-6 md:p-8 rounded-3xl text-[color:var(--text-dim)] shadow-xl">
              A curated visual journey through the property's most iconic spaces
              and moments.
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
              viewport={{ once: false, amount: 0.1, margin: "-10px" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <div className="overflow-hidden rounded-3xl border border-[var(--border)] hover:border-accent transition-all duration-700 shadow-sm hover:shadow-3xl bg-[color:var(--page-bg-alt)]">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <p className="text-center text-[10px] font-black tracking-[0.4em] uppercase text-[color:var(--text-dim)] mt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                {img.caption}
              </p>
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
              className="absolute top-10 right-10 w-16 h-16 bg-accent border border-accent/20 rounded-full flex items-center justify-center text-on-accent hover:scale-110 transition-all shadow-gold z-[110]"
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
                className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-gold border border-accent/20"
              />
              <div className="mt-10 text-center">
                <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-4">
                  Capturing Excellence
                </p>
                <p className="text-ink-gradient text-2xl md:text-4xl font-black font-['Outfit'] uppercase tracking-tighter">
                  {GALLERY_IMAGES[lightbox].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
