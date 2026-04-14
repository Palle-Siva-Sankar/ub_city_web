import { motion } from "motion/react";
import { Link } from "react-router";
import { Sparkles, MapPin } from "lucide-react";

import { HeroVideoEmbed } from "../components/HeroVideoEmbed";
import { SHOPPING_CATEGORIES } from "../data/mallData";
import { useUserLocation } from "../hooks/useUserLocation";

export function Shopping() {
  const locationInfo = useUserLocation();
  const featuredBrandWalls = [
    {
      title: "Sportswear & Athleisure",
      items: [
        { label: "Adidas", slug: "adidas" },
        { label: "Nike", slug: "nike" },
        { label: "Asics", slug: "asics" },
        { label: "Reebok", slug: "reebok" },
        { label: "Skechers", slug: "skechers" },
      ],
    },
    {
      title: "Lifestyle Apparel",
      items: [
        { label: "BOSS", slug: "boss" },
        { label: "Armani Exchange", slug: "armani-exchange" },
        { label: "Calvin Klein Jeans", slug: "calvin-klein-jeans" },
        { label: "Tommy Hilfiger", slug: "tommy-hilfiger" },
        { label: "Levi's", slug: "levis" },
      ],
    },
    {
      title: "Kids Apparel",
      items: [
        { label: "Tommy Kids", slug: "tommy-hilfiger" },
        { label: "M&S", slug: "marks-spencer" },
        { label: "Adidas Kids", slug: "adidas" },
        { label: "U.S. Polo Kids", slug: "shoppers-stop" },
      ],
    },
    {
      title: "Electronics",
      items: [
        { label: "Apple", slug: "apple" },
        { label: "Samsung", slug: "samsung" },
        { label: "Sony", slug: "sony" },
      ],
    },
    {
      title: "Footwear",
      items: [
        { label: "Puma", slug: "puma" },
        { label: "Bata", slug: "bata" },
        { label: "Woodland", slug: "woodland" },
        { label: "Nike", slug: "nike" },
      ],
    },
    {
      title: "Beauty & Personal Care",
      items: [
        { label: "Sephora", slug: "sephora" },
        { label: "Nykaa Luxe", slug: "nykaa-luxe" },
        { label: "MAC Cosmetics", slug: "mac-cosmetics" },
      ],
    },
    {
      title: "Luxury Brands",
      items: [
        { label: "Gucci", slug: "gucci" },
        { label: "Burberry", slug: "burberry" },
        { label: "Tiffany & Co.", slug: "tiffany-co" },
      ],
    },
  ];
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1200";
  };
  return (
    <div className="page-wrapper bg-page min-h-screen pt-32">
      <section className="px-6 md:px-12 mb-20 hero-readable">
        <div className="max-w-[1400px] mx-auto relative min-h-[50vh] md:h-[60vh] lg:h-[65vh] rounded-[3rem] overflow-hidden group">
          <HeroVideoEmbed
            title="Shopping Hero Video"
            posterImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000"
            videoSrc="/videos/shopping-hero.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 mb-8">
                 <Sparkles className="w-4 h-4 text-accent" />
                 <span className="text-[10px] font-black tracking-[0.3em] uppercase hero-video-kicker">The Elite Feed</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-['Outfit'] hero-video-title uppercase tracking-tighter mb-6 leading-none">
                Curation <span className="text-gradient">Redefined.</span>
              </h1>
              <p className="hero-video-subtitle hero-video-glass rounded-2xl px-5 py-4 font-light max-w-lg text-lg leading-relaxed">
                Discover flagship stores, new collections, and premium fashion in one immersive shopping district experience.
              </p>
              <div className="location-pill mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px]">
                <MapPin className="w-4 h-4 text-accent" />
                {locationInfo.loading ? "Detecting your location..." : `Shopping near ${locationInfo.city}, ${locationInfo.region}`}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 mb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="shopping-board-shell shopping-board-contrast rounded-[2.5rem] p-6 md:p-10">
            <div className="grid lg:grid-cols-[240px_1fr] gap-6 md:gap-10">
              <aside className="shopping-board-aside pr-4 hidden lg:block">
                <h3 className="shopping-board-heading text-sm font-black tracking-[0.12em] uppercase mb-4">Categories</h3>
                <div className="space-y-2">
                  {SHOPPING_CATEGORIES.map((cat) => (
                    <Link key={cat.slug} to={`/shopping/category/${cat.slug}`} className="shopping-board-muted block text-sm hover:text-accent">
                      &rsaquo; {cat.label.replace(" &", " & ")}
                    </Link>
                  ))}
                </div>
              </aside>

              <div>
                <p className="shopping-board-muted text-center text-sm md:text-lg tracking-[0.08em] uppercase mb-2">Our Brands</p>
                <h2 className="shopping-board-heading text-center text-3xl md:text-5xl font-['Outfit'] font-black tracking-tight mb-10">
                  All The Trending Shops For You
                </h2>

                <div className="space-y-8">
                  {featuredBrandWalls.map((row) => (
                    <div key={row.title} id={row.title === "Luxury Brands" ? "luxury" : undefined} className="shopping-board-divider pt-6">
                      <h3 className="shopping-board-heading text-center text-xl md:text-4xl font-['Outfit'] font-black tracking-tight mb-6">
                        {row.title}
                      </h3>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 sm:gap-6">
                        {row.items.map((item) => (
                          <Link
                            key={`${row.title}-${item.slug}-${item.label}`}
                            to={`/shopping/${item.slug}`}
                            className="premium-card min-h-[100px] flex items-center justify-center px-6 text-center text-sm md:text-lg font-bold tracking-tight hover:text-accent transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto relative rounded-[2.5rem] overflow-hidden glass-pane border border-white/10 min-h-[340px]">

          <div className="relative z-10 p-10 md:p-14 max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-4">3D Commerce Experience</p>
            <h3 className="text-4xl md:text-5xl font-black font-['Outfit'] text-[color:var(--text-main)] tracking-tighter mb-4">
              Explore Interactive Shopping Spaces
            </h3>
            <p className="text-[color:var(--text-dim)] mb-8">
              Real-time 3D components are now integrated into the experience to make discovery feel modern and immersive.
            </p>
            <Link to="/shopping/category/luxury" className="btn-luxe">
              Launch 3D Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

