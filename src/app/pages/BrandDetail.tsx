import { motion, AnimatePresence } from "motion/react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Clock, ArrowRight, Heart, Star, Share2, Send, Map, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getBrandBySlug, getRestaurantBySlug, BRANDS, Brand, Restaurant } from "../data/mallData";
import { useWishlist, useRecentlyViewed, useReviews } from "../hooks/useFeatures";

export function BrandDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wishlist, toggle } = useWishlist();
  const { addViewed } = useRecentlyViewed();
  const { reviews, addReview, count: reviewCount } = useReviews(id || "");
  const avgRating = reviewCount > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1) : null;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) addViewed(id);
  }, [id, addViewed]);

  const brand = getBrandBySlug(id || "");
  const restaurant = getRestaurantBySlug(id || "");
  const item: Brand | Restaurant | undefined = brand || restaurant;

  if (!item) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center transition-colors duration-500">
        <div className="text-center px-6">
          <h1 className="text-6xl md:text-9xl font-black font-['Outfit'] text-ink-gradient mb-8 uppercase tracking-tighter shadow-2xl">404</h1>
          <p className="text-[color:var(--text-dim)] font-black mb-12 uppercase tracking-[0.4em] text-[10px]">Destination not found in our collection.</p>
          <Link to="/shopping" className="btn-luxe">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const heroVideo = (item as Brand).heroVideo;
  const wishlisted = wishlist.includes(item.slug);

  // Filter related items
  const itemCategory = (item as Brand).category || "dining";
  const related = BRANDS.filter(b => b.category === itemCategory && b.slug !== item.slug).slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: item.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({ name: reviewName || "Anonymous", text: reviewText, rating: reviewRating });
    setReviewText("");
    setReviewName("");
    setReviewRating(5);
    setShowReviewForm(false);
  };

  return (
    <div className="bg-page min-h-screen transition-colors duration-500">
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 backdrop-blur-3xl bg-[color:var(--page-bg)]/90"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-6xl aspect-video glass-pane lighting-card rounded-[4rem] border border-[var(--border)] p-12 overflow-hidden shadow-gold"
            >
              <button onClick={() => setShowMap(false)} className="absolute top-10 right-10 w-16 h-16 flex items-center justify-center glass-pane border border-[var(--border)] rounded-full hover:bg-accent hover:text-black transition-all z-20">
                <X className="w-8 h-8" />
              </button>
              
              <div className="flex flex-col h-full relative z-10">
                <div className="mb-12">
                   <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent text-[10px] font-black text-black uppercase tracking-[0.4em] mb-6 shadow-gold">Live Navigator</div>
                   <h2 className="text-5xl md:text-[6rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter mb-4 leading-none">{item.name} <span className="text-gradient">Sector.</span></h2>
                   <p className="text-accent text-sm font-black tracking-[0.5em] uppercase">{item.floor} • UB City Nexus</p>
                </div>
                
                <div className="flex-1 glass-pane rounded-[3.5rem] border border-[var(--border)] flex items-center justify-center relative overflow-hidden group/map shadow-inner">
                   <div className="absolute inset-0 bg-accent/5" />
                   <div className="relative text-center">
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="w-40 h-40 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center shadow-gold mb-10 mx-auto relative"
                      >
                        <div className="absolute inset-0 rounded-full animate-ping bg-accent opacity-20" />
                        <MapPin className="w-16 h-16 text-accent" />
                      </motion.div>
                      <p className="text-ink-gradient font-black text-4xl font-['Outfit'] uppercase tracking-tight mb-4 leading-none">Level {item.floor.split(" ").pop()}</p>
                      <p className="text-[color:var(--text-dim)] text-[10px] font-black tracking-[0.6em] uppercase italic">Synchronized with Valet Entry North</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-end overflow-hidden hero-readable virtual-section compositor-layer">
        <div className="absolute inset-0 z-0">
          {heroVideo ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale-[0.2]">
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 dark:opacity-30 scale-105" />
          )}
          <div className="video-gradient-mask" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
          <div className="mb-16">
             <button onClick={() => navigate(-1)} className="group inline-flex items-center gap-6 px-8 py-4 glass-pane border border-accent/30 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Return to Sector Index
             </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2 }}>
            <div className="flex items-center gap-6 mb-10">
               <div className="w-16 h-[2px] bg-accent" />
               <span className="text-[10px] font-black tracking-[0.8em] text-accent uppercase">Authorized UB City Landmark</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] xl:text-[13rem] font-black font-['Outfit'] text-ink-gradient tracking-tighter leading-none mb-12 uppercase">
              {item.name}<span className="text-gradient">.</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 mt-16">
              <div className="flex items-center gap-4 text-[11px] tracking-widest text-[color:var(--text-dim)] font-black uppercase glass-pane px-10 py-5 rounded-3xl border border-[var(--border)] shadow-xl translate-y-2">
                <MapPin className="w-5 h-5 text-accent" /> {item.floor}
              </div>
              <div className="flex items-center gap-4 text-[11px] tracking-widest text-[color:var(--text-dim)] font-black uppercase glass-pane px-10 py-5 rounded-3xl border border-[var(--border)] shadow-xl -translate-y-2">
                <Clock className="w-5 h-5 text-accent" /> {item.hours}
              </div>
              {avgRating && (
                <div className="flex items-center gap-4 text-[11px] text-accent font-black uppercase tracking-tighter glass-pane px-12 py-6 rounded-3xl border border-accent/20 shadow-gold">
                  <Star className="w-5 h-5 fill-accent" /> {avgRating} <span className="opacity-30 mx-2">|</span> {reviewCount} Manifests
                </div>
              )}
            </div>

            {/* Premium Action Cluster */}
            <div className="flex flex-wrap gap-8 mt-20">
              <button
                onClick={() => setShowMap(true)}
                className="btn-luxe !px-16 !py-8 z-20 text-sm"
              >
                <Map className="w-6 h-6 mr-4" /> Tactical Location
              </button>
              
              <button
                onClick={() => toggle(item.slug)}
                className={`flex items-center gap-5 px-16 py-8 rounded-[2rem] text-[11px] font-black tracking-[0.4em] uppercase transition-all duration-700 border-2 backdrop-blur-3xl shadow-2xl ${
                  wishlisted
                    ? "bg-red-500 text-white border-red-500 shadow-red-500/40"
                    : "glass-pane border-[var(--border)] text-ink-gradient hover:border-accent hover:text-accent"
                }`}
              >
                <Heart className={`w-6 h-6 ${wishlisted ? "fill-white" : "fill-none"}`} />
                {wishlisted ? "Secured" : "Add Protocol"}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-5 px-16 py-8 rounded-[2rem] text-[11px] font-black tracking-[0.4em] uppercase border-2 border-[var(--border)] text-[color:var(--text-dim)] hover:text-accent hover:border-accent transition-all glass-pane shadow-lg"
              >
                <Share2 className="w-6 h-6" />
                {copied ? "Link Isolated" : "Share Node"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Immersive Info section */}
      <section className="py-56 bg-page relative overflow-hidden transition-colors duration-500 virtual-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-32 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.1, margin: "-10px" }}>
              <p className="text-accent text-[11px] tracking-[0.8em] font-black uppercase mb-10">The Distinction</p>
              <h2 className="text-6xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient mb-16 leading-[0.8] uppercase tracking-tighter">
                Refining <br /> <span className="text-gradient">{(item as Brand).category?.replace("-", " ") || "Dining"}.</span>
              </h2>
              <div className="flex gap-8 flex-wrap mt-16">
                <Link to={`/inquire/${item.slug}`} className="btn-luxe !px-20">
                  Inquire
                </Link>
                <Link to="/shopping" className="px-16 py-6 glass-pane border border-[var(--border)] text-[color:var(--text-main)] font-black tracking-[0.4em] uppercase text-[10px] rounded-full hover:border-accent hover:text-accent transition-all shadow-xl">
                   Archive Access
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: false, amount: 0.1, margin: "-10px" }} 
              className="glass-pane lighting-card rounded-[5rem] p-20 border border-[var(--border)] relative shadow-2xl"
            >
              <div className="absolute top-10 left-10 text-accent opacity-20">
                 <Sparkles className="w-16 h-16" />
              </div>
              <p className="text-ink-gradient text-4xl md:text-5xl font-light italic leading-relaxed mb-16 relative z-10 font-['Outfit'] tracking-tight">
                "{item.description}"
              </p>
              <div className="flex items-center gap-8">
                <div className="w-24 h-px bg-accent" />
                <span className="text-[10px] font-black tracking-[0.6em] uppercase text-accent">Corporate Identity Documented</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Destinations section */}
      {related.length > 0 && (
        <section className="py-56 border-t border-[var(--border)] bg-page-bg-alt relative overflow-hidden virtual-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 px-10">
               <div className="max-w-3xl">
                  <p className="text-accent text-[11px] font-black tracking-[0.8em] uppercase mb-8">Executive Network</p>
                  <h2 className="text-5xl md:text-[7rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">Related Elite <span className="text-gradient">Sectors.</span></h2>
               </div>
               <Link to="/shopping" className="inline-flex items-center gap-6 text-accent hover:scale-110 transition-all uppercase font-black text-[11px] tracking-[0.4em] glass-pane px-10 py-5 rounded-full border border-accent/20">
                  Full Archive <ArrowRight className="w-7 h-7" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
               {related.map((r, i) => (
                  <motion.div key={r.slug} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="group">
                    <Link to={`/brand/${r.slug}`} className="glass-pane active-card lighting-card rounded-[4rem] overflow-hidden border border-[var(--border)] hover:border-accent transition-all p-12 shadow-xl hover:shadow-gold duration-700 block relative">
                       <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 backdrop-blur-3xl transition-all duration-700" />
                       <div className="relative z-10">
                         <div className="aspect-[16/11] overflow-hidden rounded-[3rem] mb-12 shadow-inner border border-[var(--border)]">
                            <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.6] group-hover:grayscale-0" />
                         </div>
                         <div className="px-6 pb-2">
                            <p className="text-accent text-[8px] font-black uppercase tracking-[0.5em] mb-4 opacity-60">Partner Portfolio</p>
                            <h4 className="text-4xl font-black text-ink-gradient uppercase tracking-tighter mb-8 group-hover:text-accent transition-colors font-['Outfit'] leading-none">{r.name}</h4>
                            <div className="flex items-center gap-4">
                               <MapPin className="w-6 h-6 text-accent" />
                               <p className="text-[10px] text-[color:var(--text-dim)] font-black uppercase tracking-[0.4em]">{r.floor}</p>
                            </div>
                         </div>
                       </div>
                    </Link>
                  </motion.div>
               ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Review Section */}
      <section className="py-56 bg-page relative border-t border-[var(--border)] transition-colors duration-500 virtual-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-16 mb-40">
            <div className="max-w-4xl">
              <p className="text-accent text-[11px] tracking-[0.8em] font-black uppercase mb-10">The Social Consensus</p>
              <h2 className="text-6xl md:text-[9rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none mb-10">
                {reviewCount > 0 ? "Visitor <span className='text-gradient'>Testimonies.</span>" : "Unrivaled <span className='text-gradient'>Journeys.</span>"}
              </h2>
              <p className="text-xl md:text-2xl text-[color:var(--text-dim)] font-medium italic italic leading-relaxed">Verified account experiences from the UB City inner circle.</p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-luxe !px-16 !py-8 text-sm"
            >
              Log Testimony
            </button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleReviewSubmit}
                className="glass-pane lighting-card rounded-[5rem] p-24 border border-accent/40 relative overflow-hidden mb-40 shadow-gold"
              >
                <div className="grid md:grid-cols-2 gap-20 mb-20">
                  <div className="space-y-6">
                    <label className="text-[10px] font-black tracking-[0.5em] uppercase text-accent ml-8">Visitor Authentication ID</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Master Curated"
                      className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[2.5rem] px-10 py-8 focus:outline-none focus:border-accent transition-all text-lg font-bold placeholder:opacity-20 shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                     <label className="text-[10px] font-black tracking-[0.5em] uppercase text-accent ml-8 mb-10">Quality Valuation</label>
                     <div className="flex items-center gap-10">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" onClick={() => setReviewRating(n)} className="transition-all hover:scale-125">
                          <Star className={`w-12 h-12 transition-all ${n <= reviewRating ? "text-accent fill-accent shadow-gold" : "opacity-10 text-[color:var(--text-main)]"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mb-20">
                  <label className="text-[10px] font-black tracking-[0.5em] uppercase text-accent ml-8">Testimony Input</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={`Define the standard of excellence at ${item.name}...`}
                    required
                    rows={4}
                    className="w-full glass-pane border border-[var(--border)] text-ink-gradient rounded-[3rem] px-12 py-10 focus:outline-none focus:border-accent transition-all resize-none text-2xl font-light italic leading-relaxed placeholder:opacity-20 shadow-inner"
                  />
                </div>
                <button type="submit" className="btn-luxe !px-20 !py-8 text-sm">
                  <Send className="w-5 h-5 mr-4" /> Finalize Transmission
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id || i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1, margin: "-10px" }}
                transition={{ delay: i * 0.1 }}
                className="scroll-reveal compositor-layer glass-pane lighting-card rounded-[4rem] p-16 border border-[var(--border)] hover:bg-accent/5 transition-all duration-1000 relative group/review shadow-lg"
              >
                <div className="flex items-center gap-8 mb-12">
                  <div className="w-20 h-20 rounded-[2rem] bg-accent/20 flex items-center justify-center text-accent font-black text-2xl shadow-gold border border-accent/20">
                    {review.name[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-3xl font-black text-ink-gradient uppercase tracking-tighter mb-4 leading-none truncate font-['Outfit']">{review.name}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} className={`w-5 h-5 ${n <= review.rating ? "text-accent fill-accent shadow-gold" : "opacity-10 text-[color:var(--text-main)]"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[10px] font-black tracking-[0.4em] uppercase text-accent opacity-20 group-hover/review:opacity-100 transition-opacity">
                    {new Date(review.date).getFullYear()} Registry
                  </span>
                </div>
                <p className="text-ink-gradient font-medium text-2xl leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}




