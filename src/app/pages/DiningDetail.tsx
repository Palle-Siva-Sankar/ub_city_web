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
    <div className="page-wrapper bg-page min-h-screen pt-24 md:pt-32">
      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1300px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative h-[220px] sm:h-[280px] md:h-[320px]">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-5 sm:p-8 md:p-12 flex flex-col justify-end">
            <Link to="/dine" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/85 mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to Dining
            </Link>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black font-['Outfit'] text-white uppercase tracking-tight">{item.name}</h1>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90">{item.cuisine}</span>
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90"><Clock className="w-3 h-3 inline mr-1" /> {item.prepTime}</span>
              <span className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white/90"><MapPin className="w-3 h-3 inline mr-1" /> {locationInfo.loading ? "Detecting..." : `${locationInfo.city}, ${locationInfo.region}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-8">
          <div className="glass-pane rounded-[2rem] p-5 sm:p-8">
            <p className="card-text-contrast text-base leading-relaxed">{item.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-black text-accent">{formatINR(item.price * 83)}</span>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3">-</button>
                <span className="font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3">+</button>
              </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => toggle(diningWishlistKey)}
                className="rounded-xl py-3 border border-white/10 bg-white/5 inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.14em]"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(diningWishlistKey) ? "text-accent fill-accent" : "text-[color:var(--text-dim)]"}`} />
                Add to Wishlist
              </button>
              <button
                onClick={addDiningToCart}
                className="rounded-xl py-3 bg-accent text-black inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.14em]"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
            <div className="mt-8 space-y-4">
              <label className="text-xs uppercase tracking-[0.2em] font-bold">Delivery address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full delivery address" className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3" />
            </div>
          </div>

          <div className="glass-pane rounded-[2rem] p-5 sm:p-8">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" /> Payment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
              {(["upi", "card", "netbanking"] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-xl py-2 text-xs uppercase tracking-[0.2em] ${paymentMethod === method ? "bg-accent text-black font-black" : "bg-white/5 border border-white/10"}`}
                >
                  {method}
                </button>
              ))}
            </div>
            <input
              value={paymentValue}
              onChange={(e) => setPaymentValue(e.target.value)}
              placeholder={paymentMethod === "upi" ? "UPI ID (name@bank)" : paymentMethod === "card" ? "Card Number" : "Bank Account / UPI Ref"}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 mb-5"
            />
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-5">
              <p className="text-sm">Subtotal: <strong>{formatINR(total * 83)}</strong></p>
              <p className="text-sm">Taxes & charges: <strong>{formatINR(total * 0.08 * 83)}</strong></p>
              <p className="text-lg font-black text-accent mt-2">Total: {formatINR(total * 1.08 * 83)}</p>
            </div>
            <button
              onClick={() => setOrderPlaced(true)}
              disabled={!address || !paymentValue}
              className="btn-luxe w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>

            {orderPlaced && (
              <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm font-bold mb-3">Order placed successfully. Need to cancel?</p>
                <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 mb-3">
                  {CANCEL_REASONS.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
                <button onClick={() => setCancelled(true)} className="w-full rounded-xl py-2 border border-red-400/40 text-red-400 hover:bg-red-500/10">
                  Cancel Order
                </button>
                {cancelled && <p className="text-xs text-red-400 mt-3">Order cancelled: {cancelReason}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1300px] mx-auto">
          <h3 className="text-2xl font-black mb-5">More Dining Options</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {DINING_VARIETIES.filter((v) => v.slug !== item.slug).slice(0, 8).map((v) => (
              <Link key={v.slug} to={`/dine/menu/${v.slug}`} className="glass-pane rounded-2xl overflow-hidden">
                <img src={v.image} alt={v.name} className="w-full h-28 object-cover" />
                <div className="p-3">
                  <p className="font-bold text-sm">{v.name}</p>
                  <p className="text-xs text-accent">{formatINR(v.price * 83)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


