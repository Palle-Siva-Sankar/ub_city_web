import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, MapPin, Clock, CreditCard, Heart, ShoppingCart } from "lucide-react";
import { DINING_VARIETIES, getDiningBySlug } from "../data/diningData";
import { useUserLocation } from "../hooks/useUserLocation";
import { formatINR } from "../utils/currency";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { toast } from "sonner";

type PaymentMethod = "upi" | "card" | "netbanking";

const CANCEL_REASONS = [
  "Changed my mind",
  "Delivery is taking too long",
  "Ordered by mistake",
  "Need to modify order items",
  "Payment issue",
];

export function DiningDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = getDiningBySlug(slug || "");
  const locationInfo = useUserLocation();
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();

  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [paymentValue, setPaymentValue] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cancelReason, setCancelReason] = useState(CANCEL_REASONS[0]);
  const [cancelled, setCancelled] = useState(false);

  const total = useMemo(() => (item ? item.price * qty : 0), [item, qty]);
  const diningWishlistKey = item ? `dine-${item.slug}` : "";

  const addDiningToCart = () => {
    if (!item) return;
    addToCart({
      id: `dine-${item.slug}`,
      storeSlug: "dining",
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.cuisine.toLowerCase().replace(/\s+/g, "-"),
    });
    toast.success(`${item.name} added to cart`);
  };

  if (!item) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-36 px-6">
        <div className="max-w-4xl mx-auto text-center py-24">
          <h1 className="text-5xl font-black font-['Outfit'] text-ink-gradient">Menu Item Not Found</h1>
          <Link to="/dine" className="btn-luxe mt-8">Back to Dine</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen transition-colors duration-500">
      <section className="px-6 md:px-12 pt-32 mb-10">
        <div className="max-w-[1400px] mx-auto rounded-[4rem] overflow-hidden relative h-[450px] shadow-gold lighting-card group">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-10 md:p-20 flex flex-col justify-end relative z-10">
            <Link to="/dine" className="group inline-flex items-center gap-4 px-6 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mb-10 w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Gastronomy Vector
            </Link>
            <div className="flex items-center gap-4 mb-8">
               <Clock className="w-6 h-6 text-accent" />
               <p className="text-[10px] font-black tracking-[0.6em] text-accent uppercase leading-none">Curated Cuisine</p>
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-['Outfit'] text-white uppercase tracking-tighter leading-none mb-10 shadow-2xl">
              {item.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-[10px] font-black tracking-widest uppercase items-center">
              <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{item.cuisine}</span>
              <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{item.prepTime}</span>
              <span className="px-6 py-2 rounded-full glass-pane border border-white/10 text-white/90 shadow-sm">{locationInfo.loading ? "Locating..." : `${locationInfo.city}, ${locationInfo.region}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 sm:gap-16">
          <div className="glass-pane lighting-card rounded-[3.5rem] p-10 md:p-16 border border-[var(--border)] shadow-sm">
            <p className="text-ink-gradient text-2xl md:text-3xl font-light italic leading-relaxed mb-12">"{item.description}"</p>
            
            <div className="flex flex-wrap items-center gap-8 mb-12 pt-10 border-t border-[var(--border)]">
              <div className="spark-highlight p-6 rounded-[2rem] bg-accent/10 border border-accent/20">
                <span className="text-4xl md:text-5xl font-black text-accent font-['Outfit'] tracking-tighter">{formatINR(item.price * 83)}</span>
              </div>
              <div className="flex items-center gap-4 glass-pane border border-[var(--border)] rounded-full px-6 py-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-lg">-</button>
                <span className="font-black text-xl min-w-[2rem] text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-lg">+</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <button
                onClick={() => toggle(diningWishlistKey)}
                className="btn-glass py-5 flex items-center justify-center gap-3"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(diningWishlistKey) ? "text-accent fill-accent" : "text-[color:var(--text-dim)]"}`} />
                Wishlist
              </button>
              <button
                onClick={addDiningToCart}
                className="btn-luxe py-5 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black tracking-[0.4em] uppercase text-accent ml-6">Delivery Destination</label>
              <div className="relative">
                 <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                 <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full delivery coordinates" className="w-full rounded-[2.5rem] glass-pane border border-[var(--border)] pl-16 pr-10 py-6 text-ink-gradient font-bold placeholder:opacity-30 focus:border-accent outline-none" />
              </div>
            </div>
          </div>

          <div className="glass-pane lighting-card rounded-[3.5rem] p-10 md:p-16 border border-[var(--border)] flex flex-col shadow-sm">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-accent" />
               </div>
               <h3 className="text-3xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter">Secure Checkout</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {(["upi", "card", "netbanking"] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === method ? "bg-accent text-black shadow-gold" : "glass-pane border border-[var(--border)] text-[color:var(--text-dim)]"}`}
                >
                  {method}
                </button>
              ))}
            </div>

            <input
              value={paymentValue}
              onChange={(e) => setPaymentValue(e.target.value)}
              placeholder={paymentMethod === "upi" ? "UPI ID (name@bank)" : paymentMethod === "card" ? "Card Number" : "Bank Account / UPI Ref"}
              className="w-full rounded-2xl glass-pane border border-[var(--border)] px-8 py-5 mb-8 text-ink-gradient font-bold placeholder:opacity-30 outline-none focus:border-accent"
            />

            <div className="rounded-[2.5rem] bg-accent/10 border border-accent/20 p-8 mb-10 space-y-4">
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[color:var(--text-dim)]">
                 <span>Subtotal</span>
                 <span className="text-ink-gradient">{formatINR(total * 83)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[color:var(--text-dim)]">
                 <span>Taxes & Service</span>
                 <span className="text-ink-gradient">{formatINR(total * 0.08 * 83)}</span>
              </div>
              <div className="h-[1px] bg-accent/20" />
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Total Payable</span>
                 <span className="text-3xl font-black text-accent font-['Outfit'] tracking-tighter">{formatINR(total * 1.08 * 83)}</span>
              </div>
            </div>

            <button
              onClick={() => setOrderPlaced(true)}
              disabled={!address || !paymentValue}
              className="btn-luxe w-full py-6 disabled:opacity-30 disabled:grayscale transition-all"
            >
              Confirm Purchase
            </button>

            {orderPlaced && !cancelled && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[2.5rem] bg-green-500/10 border border-green-500/20 p-8">
                <p className="text-xs font-black uppercase tracking-widest text-green-500 mb-6 text-center">Order Live & Tracking</p>
                <div className="space-y-4">
                  <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full rounded-xl glass-pane border border-[var(--border)] px-5 py-3 text-xs font-bold text-ink-gradient outline-none">
                    {CANCEL_REASONS.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                  <button onClick={() => setCancelled(true)} className="w-full rounded-xl py-3 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all">
                    Request Cancellation
                  </button>
                </div>
              </motion.div>
            )}

            {cancelled && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 p-8 text-center text-red-500 text-[10px] font-black uppercase tracking-widest">
                Order Revoked: {cancelReason}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-12">
             <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--border)]" />
             <h3 className="text-[10px] font-black tracking-[0.5em] text-accent uppercase">Curated Pairings</h3>
             <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--border)]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {DINING_VARIETIES.filter((v) => v.slug !== item.slug).slice(0, 8).map((v) => (
              <Link 
                key={v.slug} 
                to={`/dine/menu/${v.slug}`} 
                className="glass-pane lighting-card active-card rounded-[2rem] overflow-hidden border border-[var(--border)] hover:border-accent group transition-all duration-700 relative p-0"
              >
                <div className="h-40 overflow-hidden relative">
                   <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.5] group-hover:grayscale-0" />
                   <div className="absolute top-3 right-3 z-20">
                     <button
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         addToCart({
                           id: `dine-${v.slug}`,
                           storeSlug: "dining",
                           name: v.name,
                           price: v.price,
                           description: v.description,
                           image: v.image,
                           category: v.cuisine.toLowerCase().replace(/\s+/g, "-"),
                         });
                         toast.success(`${v.name} Added to Collection`);
                       }}
                       className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
                     >
                       <ShoppingCart className="w-4 h-4" />
                     </button>
                   </div>
                </div>
                <div className="p-5">
                  <p className="text-ink-gradient font-black text-base font-['Outfit'] uppercase tracking-tight mb-1 leading-none group-hover:text-accent transition-colors">{v.name}</p>
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">{formatINR(v.price * 83)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


