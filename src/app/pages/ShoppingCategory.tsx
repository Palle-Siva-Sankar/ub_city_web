import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Search, ShoppingCart, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { getCategoryProducts } from "../data/storeCatalog";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { toast } from "sonner";
import { formatINR } from "../utils/currency";

const PRODUCTS_PER_PAGE = 12;

export function ShoppingCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = SHOPPING_CATEGORIES.find((item) => item.slug === categorySlug);
  const products = getCategoryProducts(categorySlug || "");
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200";
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const sorted = [...filtered];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, searchQuery, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const pageItems = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  if (!category) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-36 px-6">
        <div className="max-w-4xl mx-auto text-center py-24">
          <h1 className="text-5xl font-black font-['Outfit'] text-ink-gradient">Category Not Found</h1>
          <Link to="/shopping" className="btn-luxe mt-8">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 transition-colors duration-500">
      <section className="px-4 md:px-12 mb-12 md:mb-16">
        <div className="max-w-[1400px] mx-auto rounded-[3rem] md:rounded-[4rem] overflow-hidden relative h-[350px] md:h-[450px] lighting-card border border-[var(--border)] shadow-2xl">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={category.heroImage} 
            alt={category.label} 
            className="w-full h-full object-cover grayscale-[0.2]" 
            onError={handleImageError} 
          />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 bg-page/20 dark:bg-black/20 pointer-events-none" />
          
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-20 flex flex-col justify-end relative z-10">
            <Link to="/shopping" className="group inline-flex items-center gap-4 px-6 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mb-6 md:mb-10 w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Categories
            </Link>
            <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8 mb-4 md:mb-6">
                <h1 className="text-3xl sm:text-5xl md:text-[7rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">
                {category.label}
                </h1>
                <div className="px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Collection</div>
            </div>
             <p className="text-sm md:text-2xl text-ink-gradient/80 mt-2 md:mt-6 max-w-3xl font-medium italic border-l-2 border-accent/30 pl-4 md:pl-8 leading-relaxed opacity-80">
                Premium collections curated for your lifestyle. Explore our latest arrivals below.
             </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_auto] gap-8">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-8 top-1/2 -translate-y-1/2 text-accent group-focus-within:scale-110 transition-transform" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder={`Search in ${category.label}...`}
              className="w-full rounded-full bg-page border border-[var(--border)] pl-16 pr-8 py-5 text-ink-gradient font-black uppercase tracking-widest text-xs focus:outline-none focus:border-accent shadow-lg transition-all placeholder:opacity-40"
            />
          </div>
          <div className="flex items-center gap-6 glass-pane border border-[var(--border)] rounded-full px-8 py-3 shadow-lg">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <select
               value={sortBy}
               onChange={(e) => {
                 setSortBy(e.target.value);
                 setPage(1);
               }}
               className="bg-transparent border-none text-ink-gradient font-black uppercase tracking-widest text-[10px] focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-page">Best Match</option>
              <option value="price-asc" className="bg-page">Price: Low to High</option>
              <option value="price-desc" className="bg-page">Price: High to Low</option>
              <option value="name" className="bg-page">Name</option>
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {pageItems.map((product, idx) => {
            const [localQty, setLocalQty] = useState(1);
            
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1, margin: "-10px" }}
                transition={{ delay: idx * 0.05 }}
                className="glass-pane lighting-card active-card rounded-[2.5rem] overflow-hidden border border-[var(--border)] shadow-xl group relative flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden shrink-0">
                   <Link to={`/shopping/${product.storeSlug}`} className="block w-full h-full">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" decoding="async" onError={handleImageError} />
                   </Link>
                   <div className="absolute top-4 right-4 z-20">
                      <button
                          onClick={() => toggle(product.id)}
                          className="w-10 h-10 rounded-full glass-pane border border-white/20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-lg"
                      >
                          <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "text-accent fill-accent" : "text-white"}`} />
                      </button>
                   </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <Link to={`/shopping/${product.storeSlug}`} className="block group/link">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-accent mb-3 opacity-70">{category.label}</p>
                    <h2 className="text-xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-tight mb-3 group-hover/link:text-accent transition-colors">{product.name}</h2>
                    <p className="text-[10px] text-[color:var(--text-dim)] font-medium leading-relaxed line-clamp-2 mb-6 opacity-80">{product.description}</p>
                  </Link>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6 border-t border-[var(--border)] pt-6">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">Price</span>
                          <span className="text-xl font-black text-ink-gradient font-['Outfit']">{formatINR(product.price * 83)}</span>
                       </div>
                      
                      <div className="flex items-center gap-3 glass-pane border border-[var(--border)] rounded-full px-4 py-2 bg-page/50 backdrop-blur-xl">
                        <button onClick={() => setLocalQty(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-sm">-</button>
                        <span className="font-black text-sm min-w-[1.2rem] text-center">{localQty}</span>
                        <button onClick={() => setLocalQty(q => q + 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all font-black text-sm">+</button>
                      </div>
                    </div>

                      <button
                        onClick={() => {
                          for(let i=0; i<localQty; i++) addToCart(product);
                          toast.success(`${localQty}x ${product.name} added to cart`);
                          setLocalQty(1);
                        }}
                        className="btn-luxe w-full !py-4 !text-[10px] !rounded-2xl"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-2" /> Add to Cart
                      </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="max-w-[1400px] mx-auto mt-20 flex justify-center gap-8 items-center">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-14 h-14 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center text-ink-gradient hover:border-accent hover:text-accent transition-all disabled:opacity-20 shadow-lg">
             <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-1">Index</span>
             <span className="text-lg font-black text-ink-gradient">0{page} / 0{pageCount}</span>
          </div>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="w-14 h-14 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center text-ink-gradient hover:border-accent hover:text-accent transition-all disabled:opacity-20 shadow-lg">
             <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}





