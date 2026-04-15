import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import { PRODUCTS, getProductById } from "../data/mallData";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { toast } from "sonner";
import { formatINR } from "../utils/currency";

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : undefined;
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();

  if (!product) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-black">Product Not Found</h1>
        <Link to="/shopping" className="btn-luxe mt-8">Return to Shopping</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-16 hover:gap-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="relative aspect-square rounded-[4rem] overflow-hidden lighting-card border border-[var(--border)] shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-8 right-8">
               <button onClick={() => toggle(product.id)} className="w-16 h-16 rounded-full glass-pane border border-accent/20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-gold">
                  <Heart className={`w-6 h-6 ${wishlist.includes(product.id) ? "text-accent fill-accent" : ""}`} />
               </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-4 mb-6">
               <span className="px-5 py-1.5 rounded-full bg-accent text-[10px] font-black text-black uppercase tracking-widest">{product.category} Vector</span>
               <div className="flex items-center gap-1 text-accent">
                 <Star className="w-4 h-4 fill-accent" />
                 <Star className="w-4 h-4 fill-accent" />
                 <Star className="w-4 h-4 fill-accent" />
                 <Star className="w-4 h-4 fill-accent" />
                 <Star className="w-4 h-4 fill-accent/20" />
               </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-tight mb-8">
              {product.name}
            </h1>
            <p className="text-xl text-ink-gradient/70 font-medium leading-relaxed mb-12 italic border-l-2 border-accent/20 pl-8">
              {product.description}
            </p>
            
            <div className="py-10 border-y border-[var(--border)] mb-12">
               <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Market Valuation</p>
               <h3 className="text-5xl font-black text-ink-gradient font-['Outfit'] tracking-tighter">{formatINR(product.price * 83)}</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="flex items-center gap-4 p-6 glass-pane rounded-3xl border border-[var(--border)]">
                 <Truck className="w-6 h-6 text-accent" />
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent">Deployment</p>
                    <p className="text-xs font-bold text-ink-gradient">Sovereign Express</p>
                 </div>
               </div>
               <div className="flex items-center gap-4 p-6 glass-pane rounded-3xl border border-[var(--border)]">
                 <RefreshCw className="w-6 h-6 text-accent" />
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent">Returns</p>
                    <p className="text-xs font-bold text-ink-gradient">30 Day Protocol</p>
                 </div>
               </div>
            </div>

            <div className="flex gap-6">
               <button onClick={handleAddToCart} className="btn-luxe flex-1 !py-6 shadow-gold">
                  <ShoppingCart className="w-5 h-5 mr-3" /> Add to Acquisition Cart
               </button>
            </div>

            <div className="mt-16 flex items-center gap-4 p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10">
               <ShieldCheck className="w-8 h-8 text-accent" />
               <p className="text-xs font-medium text-ink-gradient/60 leading-relaxed italic">Verified authentic luxury asset. Synchronized with the UB City Sovereign Inventory.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

