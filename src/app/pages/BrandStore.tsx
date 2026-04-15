import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Search, ShoppingCart, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { BRANDS, getBrandBySlug } from "../data/mallData";
import { getStoreProducts } from "../data/storeCatalog";
import { useCart, useWishlist } from "../hooks/useFeatures";
import { toast } from "sonner";
import { formatINR } from "../utils/currency";

const PRODUCTS_PER_PAGE = 12;

export function BrandStore() {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const { addToCart } = useCart();
  const { wishlist, toggle } = useWishlist();
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200";
  };

  const brand = getBrandBySlug(brandSlug || "");
  const products = getStoreProducts(brandSlug || "");

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
    );

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [products, search, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentPageProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const addItemToCart = (product: (typeof products)[number]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (!brand) {
    return (
      <div className="page-wrapper bg-page min-h-screen pt-36 px-6">
        <div className="max-w-5xl mx-auto text-center py-24">
          <h1 className="text-5xl font-black font-['Outfit'] text-[color:var(--text-main)]">Brand not found</h1>
          <Link to="/shopping" className="btn-luxe mt-8">
            Back to shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32 transition-colors duration-500">
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto rounded-[4rem] overflow-hidden relative lighting-card border border-[var(--border)] shadow-2xl">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={brand.image} 
            alt={brand.name} 
            className="w-full h-[450px] object-cover" 
            onError={handleImageError} 
          />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 bg-page/20 dark:bg-black/20 pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 relative z-10">
            <Link to="/shopping" className="group inline-flex items-center gap-4 px-6 py-3 glass-pane border border-accent/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-black transition-all shadow-gold mb-10">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Sector
            </Link>
            <div className="flex flex-col lg:flex-row items-baseline gap-8 mb-6">
                <h1 className="text-6xl md:text-[8rem] font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">
                {brand.name}
                </h1>
                <div className="px-6 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.4em]">Operational Storefront</div>
            </div>
            <p className="text-xl md:text-2xl text-ink-gradient/80 mt-6 max-w-3xl font-medium italic border-l-2 border-accent/30 pl-8 leading-relaxed">
               {brand.description}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_auto] gap-8">
          <div className="relative group">
            <Search className="w-5 h-5 absolute left-8 top-1/2 -translate-y-1/2 text-accent group-focus-within:scale-110 transition-transform" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search inventory within ${brand.name} Sector...`}
              className="w-full rounded-full bg-page border border-[var(--border)] pl-16 pr-8 py-5 text-ink-gradient font-black uppercase tracking-widest text-xs focus:outline-none focus:border-accent shadow-lg transition-all placeholder:opacity-20"
            />
          </div>
          <div className="flex items-center gap-6 glass-pane border border-[var(--border)] rounded-full px-8 py-3 shadow-lg">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border-none text-ink-gradient font-black uppercase tracking-widest text-[10px] focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-page">Featured Hierarchy</option>
              <option value="price-asc" className="bg-page">Valuation: Ascending</option>
              <option value="price-desc" className="bg-page">Valuation: Descending</option>
              <option value="name" className="bg-page">Lexicographical</option>
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {currentPageProducts.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.8 }}
              className="glass-pane rounded-[3rem] overflow-hidden lighting-card border border-[var(--border)] shadow-xl group relative"
            >
              <Link to={`/shopping/product/${product.id}`} className="absolute inset-0 z-[5]" />
              <div className="relative h-72 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" decoding="async" onError={handleImageError} />
                <div className="absolute top-6 right-6 z-10">
                   <button
                        onClick={() => toggle(product.id)}
                        className="w-12 h-12 rounded-full glass-pane border border-white/20 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-lg"
                    >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "text-accent fill-accent" : "text-white"}`} />
                    </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-10">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-4 opacity-70">{product.category} Vector</p>
                <h2 className="text-2xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-tight mb-4 group-hover:text-accent duration-500">{product.name}</h2>
                <p className="text-xs text-[color:var(--text-dim)] font-medium leading-relaxed mb-8 line-clamp-2 opacity-80">{product.description}</p>
                <div className="flex items-center justify-between mb-8 border-t border-[var(--border)] pt-8">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-1">Exchange Value</span>
                     <span className="text-2xl font-black text-ink-gradient font-['Outfit']">{formatINR(product.price * 83)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between glass-pane rounded-2xl px-6 py-3 border border-[var(--border)]">
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent">Availability</span>
                    <span className="text-[10px] font-black text-ink-gradient uppercase">In Stock</span>
                  </div>
                  <button onClick={() => addItemToCart(product)} className="btn-luxe w-full !py-5 !text-[11px] shadow-gold">
                    <ShoppingCart className="w-4 h-4 mr-3" /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto mt-20 flex items-center justify-center gap-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-14 h-14 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center text-ink-gradient hover:border-accent hover:text-accent transition-all disabled:opacity-20"
            disabled={page === 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-1">Index</span>
             <span className="text-lg font-black text-ink-gradient">0{page} / 0{pageCount}</span>
          </div>
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="w-14 h-14 rounded-full glass-pane border border-[var(--border)] flex items-center justify-center text-ink-gradient hover:border-accent hover:text-accent transition-all disabled:opacity-20"
            disabled={page === pageCount}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-40">
        <div className="max-w-[1400px] mx-auto glass-pane lighting-card rounded-[3.5rem] p-16 md:p-24 border border-[var(--border)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] pointer-events-none" />
          <div className="mb-12">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-accent" />
                <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase">Sector Navigation</p>
             </div>
             <h3 className="text-4xl md:text-6xl font-black font-['Outfit'] text-ink-gradient uppercase tracking-tighter leading-none">Explore Allied <span className="text-gradient">Districts.</span></h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link key={b.slug} to={`/shopping/${b.slug}`} className="px-8 py-4 rounded-full glass-pane border border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-ink-gradient hover:border-accent hover:text-accent transition-all shadow-lg active:scale-95">
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


