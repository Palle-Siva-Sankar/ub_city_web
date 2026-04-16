import { useParams, useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
} from "lucide-react";
import { PRODUCTS, getProductById, Product } from "../data/mallData";
import { DINING_VARIETIES } from "../data/diningData";
import { getAllStoreProducts } from "../data/storeCatalog";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { toast } from "sonner";
import { formatUSD } from "../utils/currency";

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const isDining = productId?.startsWith("dine-");
  let product: Product | undefined = undefined;

  if (isDining && productId) {
    const slug = productId.replace("dine-", "");
    const diningItem = DINING_VARIETIES.find((d) => d.slug === slug);
    if (diningItem) {
      product = {
        id: `dine-${diningItem.slug}`,
        storeSlug: "dining",
        name: diningItem.name,
        price: diningItem.price,
        description: diningItem.description,
        image: diningItem.image,
        category: diningItem.cuisine,
      };
    }
  } else {
    product = productId
      ? getAllStoreProducts().find((p) => p.id === productId)
      : undefined;
  }

  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();

  if (!product) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-black">Product Not Found</h1>
        <Link to="/shopping" className="btn-luxe mt-8">
          Return to Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="page-wrapper bg-page min-h-screen !pt-0 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-4 text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-16 hover:gap-6 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[4rem] overflow-hidden lighting-card border border-[var(--border)] shadow-2xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-8 right-8">
              <button
                onClick={() => toggle(product.id)}
                className="w-16 h-16 rounded-full glass-pane border border-accent/20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-gold"
              >
                <Heart
                  className={`w-6 h-6 ${wishlist.includes(product.id) ? "text-accent fill-accent" : ""}`}
                />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-['Outfit'] text-[var(--text-main)] uppercase tracking-tighter leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-[var(--text-main)]/70 font-medium leading-relaxed mb-8 italic border-l-2 border-accent/20 pl-6">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-2xl md:text-3xl font-black text-accent tracking-tighter">
                {formatUSD(product.price)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4 p-6 glass-pane rounded-3xl border border-[var(--border)]">
                <Truck className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent">
                    Deployment
                  </p>
                  <p className="text-xs font-bold text-ink-gradient">
                    Sovereign Express
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 glass-pane rounded-3xl border border-[var(--border)]">
                <RefreshCw className="w-6 h-6 text-accent" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent">
                    Returns
                  </p>
                  <p className="text-xs font-bold text-ink-gradient">
                    30 Day Protocol
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button
                onClick={handleAddToCart}
                className="btn-luxe flex-1 !py-6 shadow-gold"
              >
                <ShoppingCart className="w-5 h-5 mr-3" /> Add to Acquisition
                Cart
              </button>
            </div>

            <div className="mt-16 flex items-center gap-4 p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10">
              <ShieldCheck className="w-8 h-8 text-accent" />
              <p className="text-xs font-medium text-ink-gradient/60 leading-relaxed italic">
                Verified authentic luxury asset. Synchronized with the Mall of
                America Sovereign Inventory.
              </p>
            </div>
          </motion.div>
        </div>

        {/* SUGGESTIONS SECTION */}
        <div className="mt-32 pt-20 border-t border-[var(--border)]">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-2">
              Curated for you
            </p>
            <h2 className="text-4xl font-black font-['Outfit'] uppercase tracking-tighter text-ink-gradient">
              You Might Also <span className="text-gradient">Like.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(isDining
              ? DINING_VARIETIES.filter((d) => `dine-${d.slug}` !== product!.id)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 4)
                  .map((d) => ({
                    id: `dine-${d.slug}`,
                    name: d.name,
                    price: d.price,
                    image: d.image,
                    category: d.cuisine,
                  }))
              : [...PRODUCTS, ...getAllStoreProducts()]
                  .filter(
                    (p) =>
                      p.id !== product!.id &&
                      p.storeSlug === product!.storeSlug,
                  )
                  .slice(0, 4)
            ).map((suggestion) => (
              <Link
                key={suggestion.id}
                to={`/shopping/product/${suggestion.id}`}
                className="glass-pane rounded-3xl border border-[var(--border)] hover:border-accent hover:shadow-gold transition-all duration-500 overflow-hidden group flex flex-col h-full bg-[color:var(--page-bg-alt)]/50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-2">
                    {suggestion.category}
                  </p>
                  <h4 className="text-sm font-black text-[#111111] dark:text-[#f5f5f7] uppercase tracking-tight mb-2 group-hover:text-accent transition-colors flex-1 !opacity-100">
                    {suggestion.name}
                  </h4>
                  <span className="text-accent font-bold text-sm tracking-tighter mb-4">
                    {formatUSD(suggestion.price)}
                  </span>

                  <div className="relative z-10 mt-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(suggestion as any);
                        toast.success(`${suggestion.name} added to cart`);
                      }}
                      className="btn-luxe w-full !py-3 !text-[9px] shadow-gold flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
