import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Search, ShoppingCart } from "lucide-react";
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
          <Link to="/shopping" className="btn-luxe mt-8">Back to Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-page min-h-screen pt-32">
      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1400px] mx-auto rounded-[2.5rem] overflow-hidden relative h-[320px]">
          <img src={category.heroImage} alt={category.label} className="w-full h-full object-cover" onError={handleImageError} />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <Link to="/shopping" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/80 mb-5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <h1 className="text-4xl md:text-6xl font-black font-['Outfit'] text-white uppercase tracking-tighter max-w-3xl">
              {category.label}
            </h1>
            <p className="text-white/75 text-sm mt-3">Curated products in this category.</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_auto] gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[color:var(--text-dim)]" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${category.label}`}
              className="w-full rounded-full bg-white/5 border border-white/10 pl-12 pr-5 py-3 text-[color:var(--text-main)]"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-[color:var(--text-main)]"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pageItems.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass-pane lighting-card rounded-[2rem] overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" loading="lazy" decoding="async" onError={handleImageError} />
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-dim)] mb-2">{category.label}</p>
                <h2 className="text-lg font-bold text-[color:var(--text-main)] leading-tight mb-2">{product.name}</h2>
                <p className="text-sm text-[color:var(--text-dim)] line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-accent">{formatINR(product.price * 83)}</span>
                  <button
                    onClick={() => toggle(product.id)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "text-accent fill-accent" : "text-[color:var(--text-dim)]"}`} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="btn-luxe w-full !py-3 !text-[9px]"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto mt-10 flex justify-center gap-3 items-center">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-full border border-white/10">
            Prev
          </button>
          <span className="text-sm text-[color:var(--text-dim)]">Page {page} of {pageCount}</span>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="px-4 py-2 rounded-full border border-white/10">
            Next
          </button>
        </div>
      </section>
    </div>
  );
}


