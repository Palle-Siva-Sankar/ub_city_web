// ─── UB City Bengaluru — Experience Data Engine ───
// Core mall identity adapted for Bengaluru luxury district

export interface Brand {
  slug: string;
  name: string;
  category: string;
  floor: string;
  hours: string;
  description: string;
  image: string;
  heroVideo?: string;
}

export interface Restaurant {
  slug: string;
  name: string;
  floor: string;
  hours: string;
  description: string;
  image: string;
}

export interface Product {
    id: string;
    storeSlug: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export interface Movie {
  title: string;
  language: string;
  showtimes: string[];
  rating: string;
}

export interface EntertainmentVenue {
  name: string;
  description: string;
  image: string;
}

export interface MallEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: "Family" | "Sales" | "Entertainment" | "Community";
}

// ─── Constants ───

export const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"] as const;
export type OrderStatus = typeof ORDER_STATUSES[number];

// ─── Shopping Categories ───
export const SHOPPING_CATEGORIES = [
  {
    slug: "sportswear",
    label: "Sportswear & Athleisure",
    heroImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "lifestyle-apparel",
    label: "Lifestyle Apparel",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "department-stores",
    label: "Department Stores",
    heroImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "footwear",
    label: "Footwear",
    heroImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "beauty-personal-care",
    label: "Beauty & Personal Care",
    heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "electronics",
    label: "Electronics",
    heroImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "luxury",
    label: "Luxury Brands",
    heroImage: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=1200&auto=format&fit=crop",
  },
];

// ─── Products (Extensive Marketplace Data) ───
export const PRODUCTS: Product[] = [
    // NIKE
    { id: "p1", storeSlug: "nike", name: "Air Max Plus OG", price: 180, category: "footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", description: "The legend returns with Tuned Air for stability and cushioning." },
    { id: "p2", storeSlug: "nike", name: "Tech Fleece Hoodie", price: 130, category: "sportswear", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600", description: "Lightweight warmth with a signature tech design." },
    { id: "p3", storeSlug: "nike", name: "ZoomX Vaporfly 3", price: 250, category: "footwear", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600", description: "The ultimate racing shoe for marathon performance." },
    
    // APPLE
    { id: "p4", storeSlug: "apple", name: "iPhone 15 Pro Max", price: 1199, category: "electronics", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600", description: "Titanium design, the most advanced camera system, and the A17 Pro chip." },
    { id: "p5", storeSlug: "apple", name: "MacBook Pro 14 M3", price: 1599, category: "electronics", image: "https://images.unsplash.com/photo-1517336710212-d033502787e9?q=80&w=600", description: "The world's best pro laptop. Even faster with M3 chips." },
    { id: "p6", storeSlug: "apple", name: "AirPods Max Silver", price: 549, category: "electronics", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600", description: "High-fidelity audio meets industry-leading Active Noise Cancellation." },

    // ZARA
    { id: "p7", storeSlug: "zara", name: "Structured Suit Jacket", price: 129, category: "lifestyle-apparel", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", description: "Regular fit blazer with a notched lapel and long sleeves." },
    { id: "p8", storeSlug: "zara", name: "Leather Slingback Heels", price: 89, category: "footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600", description: "Pointed toe leather heels with high stiletto and slingback strap." },
    { id: "p9", storeSlug: "zara", name: "Oversized Crochet Knit", price: 59, category: "lifestyle-apparel", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600", description: "Round neck sweater with long sleeves and a relaxed silhouette." },

    // SEPHORA
    { id: "p10", storeSlug: "sephora", name: "Dior Sauvage Elixir", price: 165, category: "beauty-personal-care", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600", description: "An extraordinarily concentrated fragrance steeped in the emblematic freshness of Sauvage." },
    { id: "p11", storeSlug: "sephora", name: "Rare Beauty Blush", price: 23, category: "beauty-personal-care", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600", description: "A weightless, long-lasting liquid blush that blends and builds beautifully." },

    // ADIDAS
    { id: "p12", storeSlug: "adidas", name: "Samba OG Shoes", price: 100, category: "footwear", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600", description: "Born on the pitch, the Samba is a timeless icon of street style." },
    { id: "p13", storeSlug: "adidas", name: "Y-3 Futureground", price: 400, category: "luxury", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600", description: "Experimental luxury sneakers from Yamamoto's collection." },
];

// ─── All Brands (UB City Style) ───
export const BRANDS: Brand[] = [
  { slug: "nike", name: "Nike", category: "sportswear", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "The ultimate destination for athletes and sneaker enthusiasts. Nike at UB City features the latest in performance footwear, apparel, and customized experiences.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
  { slug: "adidas", name: "Adidas", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Innovative sportswear and streetwear from the global leader in athletic performance. Find your legendary style with three stripes.", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop" },
  { slug: "lululemon", name: "Lululemon", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Technical athletic apparel for yoga, running, and most other sweaty pursuits.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" },
  { slug: "asics", name: "Asics", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Performance-focused running and training footwear with advanced comfort engineering.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600&auto=format&fit=crop" },
  { slug: "reebok", name: "Reebok", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Athleisure and workout essentials combining heritage sports styling with modern performance.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop" },
  { slug: "skechers", name: "Skechers", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Comfort-driven casual and active footwear collections for all-day wear.", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600&auto=format&fit=crop" },
  { slug: "zara", name: "Zara", category: "lifestyle-apparel", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Spanish fashion retailer known for its fast-track production of trend-setting styles.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { slug: "boss", name: "BOSS", category: "lifestyle-apparel", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Contemporary premium fashion and tailoring for refined modern wardrobes.", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=600&auto=format&fit=crop" },
  { slug: "armani-exchange", name: "Armani Exchange", category: "lifestyle-apparel", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Urban Italian fashion essentials with youthful luxury styling.", image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=600&auto=format&fit=crop" },
  { slug: "calvin-klein-jeans", name: "Calvin Klein Jeans", category: "lifestyle-apparel", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Iconic denim and modern wardrobe staples from Calvin Klein.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop" },
  { slug: "tommy-hilfiger", name: "Tommy Hilfiger", category: "lifestyle-apparel", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Classic American cool fashion, denim, and elevated casualwear.", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop" },
  { slug: "levis", name: "Levi's", category: "lifestyle-apparel", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Legendary denim craftsmanship and timeless everyday fits.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop" },
  { slug: "marks-spencer", name: "Marks & Spencer", category: "department-stores", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Department store destination for fashion, essentials, and curated lifestyle products.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop" },
  { slug: "shoppers-stop", name: "Shoppers Stop", category: "department-stores", floor: "Level 3", hours: "10:00 AM – 9:00 PM", description: "Multi-brand department store featuring fashion, beauty, and home collections.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format&fit=crop" },
  { slug: "lifestyle-store", name: "Lifestyle", category: "department-stores", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Popular department store with trend-led apparel and daily living categories.", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop" },
  { slug: "puma", name: "Puma", category: "footwear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Sportstyle and performance footwear inspired by speed and street culture.", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop" },
  { slug: "bata", name: "Bata", category: "footwear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Trusted footwear brand offering everyday, formal, and active shoe ranges.", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" },
  { slug: "woodland", name: "Woodland", category: "footwear", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Rugged outdoor and casual footwear with durable construction.", image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8f1f?q=80&w=600&auto=format&fit=crop" },
  { slug: "apple", name: "Apple", category: "electronics", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Discover the world of Apple. Shop the latest iPhone, iPad, Mac, and Apple Watch models.", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600&auto=format&fit=crop" },
  { slug: "samsung", name: "Samsung", category: "electronics", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Smartphones, wearables, TVs, and connected home electronics from Samsung.", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop" },
  { slug: "sony", name: "Sony", category: "electronics", floor: "Level 3", hours: "10:00 AM – 9:00 PM", description: "Premium audio, gaming, and entertainment electronics by Sony.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop" },
  { slug: "sephora", name: "Sephora", category: "beauty-personal-care", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "The leader in prestige omni-retail, offering a diverse selection of beauty brands.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop" },
  { slug: "nykaa-luxe", name: "Nykaa Luxe", category: "beauty-personal-care", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Premium beauty destination with global skincare, makeup, and fragrance brands.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600&auto=format&fit=crop" },
  { slug: "mac-cosmetics", name: "MAC Cosmetics", category: "beauty-personal-care", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Professional-grade makeup collections and signature artistry services.", image: "https://images.unsplash.com/photo-1596704017254-9f7dc9c2dc64?q=80&w=600&auto=format&fit=crop" },
  { slug: "gucci", name: "Gucci", category: "luxury", floor: "Level 4", hours: "10:30 AM – 9:00 PM", description: "Italian luxury house featuring ready-to-wear, leather goods, and accessories.", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop" },
  { slug: "burberry", name: "Burberry", category: "luxury", floor: "Level 4", hours: "10:30 AM – 9:00 PM", description: "British luxury label known for outerwear, tailoring, and iconic check patterns.", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop" },
  { slug: "tiffany-co", name: "Tiffany & Co.", category: "luxury", floor: "Level 4", hours: "10:30 AM – 9:00 PM", description: "Fine jewelry and luxury gifting from the iconic Tiffany blue box maison.", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" },
  { slug: "louis-vuitton", name: "Louis Vuitton", category: "luxury", floor: "Level 4", hours: "10:30 AM – 9:00 PM", description: "Maison of heritage and innovation, offering the finest in leather goods, fashion, and travel accessories.", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=600&auto=format&fit=crop" },
  { slug: "under-armour", name: "Under Armour", category: "sportswear", floor: "Level 1", hours: "10:00 AM – 9:00 PM", description: "Empowering athletes with high-performance sports apparel, footwear, and accessories.", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop" },
  { slug: "kiehls", name: "Kiehl's", category: "beauty-personal-care", floor: "Level 2", hours: "10:00 AM – 9:00 PM", description: "Natural skincare and apothecary traditions since 1851. Experience personalized skin consultations and premium formulas.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop" },
];

// ─── Dining (UB City Elite Portfolio) ───
export const RESTAURANTS: Restaurant[] = [
  { 
    slug: "shiro", 
    name: "Shiro", 
    floor: "Level 2", 
    hours: "12:00 PM – 11:30 PM", 
    description: "Immersive Japanese dining with dramatic interiors and panoramic city views. A cornerstone of Bengaluru's luxury nightlife.", 
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200" 
  },
  { 
    slug: "farzi-cafe", 
    name: "Farzi Cafe", 
    floor: "Level 2", 
    hours: "12:00 PM – 1:00 AM", 
    description: "Modern Indian bistro that merges global techniques with traditional comfort. Known for its molecular gastronomy and vibrant energy.", 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" 
  },
  { 
    slug: "toscano", 
    name: "Toscano", 
    floor: "Level 1", 
    hours: "11:00 AM – 10:30 PM", 
    description: "Classic Italian wine bar and restaurant offering artisanal pizzas, handmade pastas, and an extensive curated wine list.", 
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200" 
  },
];

export const UPCOMING_EVENTS: MallEvent[] = [
  { id: "e1", title: "Midnight Madness", date: "July 12, 2026", time: "10:00 PM – 2:00 AM", location: "The Collection, UB City", description: "Exclusive late-night shopping experiences across premium stores.", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600", category: "Sales" },
];

// ─── Cinema Showtimes ───
export const MOVIES: Movie[] = [
  { title: "Interstellar: UB City IMAX", language: "English", showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"], rating: "PG-13" },
  { title: "The Mall Mystery", language: "English", showtimes: ["1:15 PM", "5:30 PM", "9:45 PM"], rating: "PG" },
];

// ─── Contact Info (UB City Bengaluru) ───
export const CONTACT = {
  address: "The Collection, UB City, Vittal Mallya Road, Bengaluru, Karnataka 560001",
  phone: "+91 80 4177 1111",
  email: "info@ubcitybangalore.in",
  feedback: "contact@ubcitybangalore.in",
  hours: "Mon–Sun: 10:30 AM – 10:00 PM",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3887.9701729063226!2d77.59395197593678!3d12.97116748734414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167191f6f147%3A0x6a0a09e0ea3a5d8!2sUB%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

// Helpers
export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}

export function getProductsByStore(slug: string): Product[] {
    return PRODUCTS.filter(p => p.storeSlug === slug);
}

export function getBrandsByCategory(categorySlug: string): Brand[] {
  return BRANDS.filter(b => b.category === categorySlug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug);
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return RESTAURANTS.find(r => r.slug === slug);
}
