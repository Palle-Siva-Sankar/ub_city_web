import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Search, ShoppingCart, SlidersHorizontal } from "lucide-react";
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
    <div className="page-wrapper bg-page min-h-screen pt-32">
      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1400px] mx-auto rounded-[2.5rem] overflow-hidden relative">
          <img src={brand.image} alt={brand.name} className="w-full h-[340px] object-cover" onError={handleImageError} />
          <div className="video-gradient-mask absolute inset-0" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <Link to="/shopping" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to brands
            </Link>
            <h1 className="text-5xl md:text-7xl font-black font-['Outfit'] text-white uppercase tracking-tighter">
              {brand.name}
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl">{brand.description}</p>
            <p className="text-accent text-xs uppercase tracking-[0.25em] mt-4">
              Store collection available
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_auto] gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[color:var(--text-dim)]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search in ${brand.name}`}
              className="w-full rounded-full bg-white/5 border border-white/10 pl-12 pr-5 py-3 text-[color:var(--text-main)] focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-[color:var(--text-dim)]" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-[color:var(--text-main)]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentPageProducts.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass-pane rounded-[2rem] overflow-hidden lighting-card"
            >
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" loading="lazy" decoding="async" onError={handleImageError} />
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-dim)] mb-2">{product.category}</p>
                <h2 className="text-lg font-bold text-[color:var(--text-main)] leading-tight mb-2">{product.name}</h2>
                <p className="text-sm text-[color:var(--text-dim)] mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-accent">{formatINR(product.price * 83)}</span>
                  <button
                    onClick={() => toggle(product.id)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "text-accent fill-accent" : "text-[color:var(--text-dim)]"}`} />
                  </button>
                </div>
                <button onClick={() => addItemToCart(product)} className="btn-luxe w-full !py-3 !text-[9px]">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-full border border-white/10 text-[color:var(--text-main)]"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-[color:var(--text-dim)]">Page {page} of {pageCount}</span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="px-4 py-2 rounded-full border border-white/10 text-[color:var(--text-main)]"
            disabled={page === pageCount}
          >
            Next
          </button>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto glass-pane rounded-[2rem] p-6">
          <h3 className="text-xl font-black text-[color:var(--text-main)] mb-3">Explore Other Brand Stores</h3>
          <div className="flex flex-wrap gap-3">
            {BRANDS.filter((b) => b.slug !== brand.slug).map((b) => (
              <Link key={b.slug} to={`/shopping/${b.slug}`} className="px-4 py-2 rounded-full border border-white/10 text-[color:var(--text-main)] hover:border-accent">
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


