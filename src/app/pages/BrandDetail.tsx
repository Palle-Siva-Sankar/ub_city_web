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
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold font-['Outfit'] text-page mb-4 uppercase tracking-tighter">404</h1>
          <p className="text-page-text-muted font-light mb-8 uppercase tracking-widest">Destination not found.</p>
          <Link to="/shopping" className="px-10 py-5 bg-gradient-premium rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-105 transition-all">
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
    <div className="bg-page min-h-screen">
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 backdrop-blur-3xl bg-black/90"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-6xl aspect-video glass-pane rounded-[4rem] border border-white/20 p-12 overflow-hidden shadow-[0_0_100px_rgba(200,169,81,0.1)]"
            >
              <button onClick={() => setShowMap(false)} className="absolute top-10 right-10 w-16 h-16 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/10 text-white transition-all backdrop-blur-3xl z-20">
                <X className="w-8 h-8" />
              </button>
              
              <div className="flex flex-col h-full relative z-10">
                <div className="mb-12">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-[10px] font-black text-black uppercase tracking-[0.3em] mb-4">Live Navigator</div>
                   <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-white uppercase tracking-tighter mb-4">{item.name} Location</h2>
                   <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase">{item.floor} • Wing North Central</p>
                </div>
                
                <div className="flex-1 bg-white/5 rounded-[3rem] border border-white/5 flex items-center justify-center relative overflow-hidden group/map">
                   {/* Realistic Stylized Mall Layout Overlay */}
                   <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                   <div className="absolute inset-0 opacity-10 pointer-events-none transition-transform duration-[5s] group-hover/map:scale-110">
                      <div className="w-full h-full border-[30px] border-white rounded-[5rem]" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-[10px] border-dashed border-white/50 rounded-[3rem]" />
                      <div className="absolute top-[20%] right-[20%] w-40 h-40 border-4 border-accent/40 rounded-full" />
                   </div>
                   
                   <div className="relative text-center">
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="w-32 h-32 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(200,169,81,0.4)] mb-8 mx-auto relative"
                      >
                        <div className="absolute inset-0 rounded-full animate-ping bg-accent opacity-20" />
                        <MapPin className="w-14 h-14 text-accent drop-shadow-2xl" />
                      </motion.div>
                      <p className="text-white font-black text-3xl font-['Outfit'] uppercase tracking-tight">Level {item.floor.split(" ").pop()} • Section A</p>
                      <p className="text-white/60 text-sm mt-4 font-bold tracking-widest uppercase">Direct access via North Entrance Valet</p>
                   </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-page-bg">
          {heroVideo ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-50 scale-105" />
          )}
          <div className="video-gradient-mask" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-white/50 hover:text-white transition-all uppercase mb-12 group/back">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover/back:bg-white group-hover/back:text-black transition-all">
              <ArrowLeft className="w-5 h-5" /> 
            </div>
            Go Back
          </button>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
               <Sparkles className="w-5 h-5 text-accent" />
               <span className="text-[10px] font-black tracking-[0.5em] text-accent uppercase">World-Class Partner</span>
            </div>
            <h1 className="text-6xl md:text-[8rem] xl:text-[10rem] font-black font-['Outfit'] text-white tracking-tighter leading-[0.85] mb-8 uppercase">
              <span className="text-gradient inline-block">{item.name}</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 mt-10">
              <div className="flex items-center gap-4 text-xs tracking-widest text-white/70 font-bold uppercase backdrop-blur-2xl bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <MapPin className="w-4 h-4 text-accent" /> {item.floor}
              </div>
              <div className="flex items-center gap-4 text-xs tracking-widest text-white/70 font-bold uppercase backdrop-blur-2xl bg-white/5 px-6 py-3 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-accent" /> {item.hours}
              </div>
              {avgRating && (
                <div className="flex items-center gap-3 text-xs text-accent font-black uppercase tracking-widest backdrop-blur-2xl bg-accent/5 px-6 py-3 rounded-full border border-accent/20">
                  <Star className="w-4 h-4 fill-accent" /> {avgRating} <span className="opacity-40">/</span> {reviewCount} Reviews
                </div>
              )}
            </div>

            {/* Premium Action Cluster */}
            <div className="flex flex-wrap gap-5 mt-14">
              <button
                onClick={() => setShowMap(true)}
                className="flex items-center gap-4 px-10 py-5 bg-gradient-premium rounded-full text-xs font-black tracking-[0.25em] uppercase transition-all shadow-2xl hover:scale-110 active:scale-95 z-20"
              >
                <Map className="w-5 h-5" /> Locate In Mall
              </button>
              
              <button
                onClick={() => toggle(item.slug)}
                className={`flex items-center gap-4 px-10 py-5 rounded-full text-xs font-black tracking-[0.25em] uppercase transition-all border-2 backdrop-blur-2xl ${
                  wishlisted
                    ? "bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                    : "border-white/20 text-white hover:border-accent hover:text-accent hover:shadow-[0_0_30px_rgba(200,169,81,0.2)]"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-500" : "fill-none"}`} />
                {wishlisted ? "Registered In Wishlist" : "Add To Collection"}
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-4 px-10 py-5 rounded-full text-xs font-black tracking-[0.25em] uppercase border-2 border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                <Share2 className="w-5 h-5" />
                {copied ? "Link Copied" : "Share Experience"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Immersive Info section */}
      <section className="py-32 bg-page-bg relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-24 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-accent text-[10px] tracking-[0.5em] font-black uppercase mb-8">Iconic Destination</p>
              <h2 className="text-5xl md:text-7xl font-black font-['Outfit'] text-white mb-10 leading-tight uppercase tracking-tighter">
                Redefining <br /> {(item as Brand).category?.replace("-", " ") || "Dining"}
              </h2>
              <div className="flex gap-4 flex-wrap mt-12">
                <Link to={`/inquire/${item.slug}`} className="px-10 py-5 bg-white text-black font-black tracking-[0.2em] uppercase text-[10px] rounded-full hover:scale-105 transition-all shadow-xl">
                  Contact Venue
                </Link>
                <Link to="/shopping" className="px-10 py-5 border-2 border-white/10 text-white font-black tracking-[0.2em] uppercase text-[10px] rounded-full hover:border-accent hover:text-accent transition-all">
                   Full Directory
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="glass-pane lighting-card rounded-[4rem] p-16 border border-white/10 relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                 <Sparkles className="w-48 h-48 text-white" />
              </div>
              <p className="text-white text-2xl font-light italic leading-[1.8] mb-12 relative z-10">
                "{item.description}"
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-accent" />
                <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent">Authorized MOA Landmark</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Destinations section */}
      {related.length > 0 && (
        <section className="py-32 border-t border-white/5 bg-page-bg-alt relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
            <div className="flex items-end justify-between mb-16 px-4">
               <div>
                  <p className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4">You May Also Like</p>
                  <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-white uppercase tracking-tighter">Related Elite Retail</h2>
               </div>
               <Link to="/shopping" className="hidden md:flex items-center gap-3 text-white/40 hover:text-accent transition-all uppercase font-black text-[10px] tracking-widest">
                  View All Collection <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {related.map((r, i) => (
                  <motion.div key={r.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/brand/${r.slug}`} className="glass-pane lighting-card group rounded-[3rem] overflow-hidden border border-white/5 hover:border-accent/40 transition-all p-5 shadow-sm hover:shadow-2xl">
                       <div className="aspect-[16/10] overflow-hidden rounded-[2rem] mb-8">
                          <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       </div>
                       <div className="px-4 pb-4">
                          <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-accent transition-colors">{r.name}</h4>
                          <div className="flex items-center gap-3">
                             <MapPin className="w-4 h-4 text-accent/50" />
                             <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">{r.floor}</p>
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
      <section className="py-32 bg-page-bg relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-20">
            <div>
              <p className="text-accent text-[10px] tracking-[0.5em] font-black uppercase mb-4">Voice Of The Visitor</p>
              <h2 className="text-4xl md:text-6xl font-black font-['Outfit'] text-white uppercase tracking-tighter leading-none">
                {reviewCount > 0 ? `${reviewCount} Guest Experiences` : "Unrivaled Journeys"}
              </h2>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-10 py-5 bg-white text-black font-black tracking-[0.25em] uppercase text-[10px] rounded-full hover:scale-110 transition-all shadow-2xl active:scale-95"
            >
              Document Experience
            </button>
          </div>

          {/* Review Form (Styled) */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: "5rem" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                onSubmit={handleReviewSubmit}
                className="glass-pane lighting-card rounded-[3.5rem] p-16 border border-accent/20 relative overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.4em] uppercase text-accent ml-2">Visitor Identity</label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Master Traveler"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-[1.5rem] px-8 py-5 focus:outline-none focus:border-accent transition-all text-sm font-bold placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                     <label className="text-[10px] font-black tracking-[0.4em] uppercase text-accent ml-2 mb-4">Luxe Rating</label>
                     <div className="flex items-center gap-4">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button key={n} type="button" onClick={() => setReviewRating(n)} className="transition-all hover:scale-125">
                          <Star className={`w-8 h-8 ${n <= reviewRating ? "text-accent fill-accent" : "text-white/10"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-12">
                  <label className="text-[10px] font-black tracking-[0.4em] uppercase text-accent ml-2">The Testimony</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={`Describe the excellence of ${item.name}...`}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-[2rem] px-8 py-6 focus:outline-none focus:border-accent transition-all resize-none text-base font-light italic leading-relaxed"
                  />
                </div>
                <button type="submit" className="px-14 py-6 bg-gradient-premium text-black font-black tracking-[0.3em] uppercase text-[10px] rounded-full hover:scale-105 transition-all flex items-center gap-4 shadow-[0_20px_40px_rgba(200,169,81,0.3)]">
                  <Send className="w-5 h-5" /> Publish Testimony
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Existing Reviews Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-pane rounded-[2.5rem] p-12 border border-white/5 hover:bg-white/5 transition-all duration-700 relative group/review"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent font-black text-xl shadow-xl border border-accent/20">
                    {review.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xl font-black text-white uppercase tracking-tighter mb-2 leading-none">{review.name}</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} className={`w-3.5 h-3.5 ${n <= review.rating ? "text-accent fill-accent" : "text-white/10"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-[9px] font-black tracking-[0.3em] uppercase text-white/20 group-hover/review:text-accent/50 transition-colors">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/60 font-light text-lg leading-relaxed italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

