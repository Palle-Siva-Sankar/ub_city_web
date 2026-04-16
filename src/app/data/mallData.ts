// ─── Mall of America — Experience Data Engine ───
// Core mall identity for the world's most iconic retail and entertainment destination

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

// ─── Shopping Categories (MOA B2B Focus) ───
export const SHOPPING_CATEGORIES = [
  {
    slug: "luxury-wing",
    label: "Luxury & Couture",
    heroImage: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "experiential-retail",
    label: "Experiential Retail",
    heroImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "anchors",
    label: "Anchor Tenants",
    heroImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "entertainment",
    label: "World-Class Entertainment",
    heroImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "electronics",
    label: "Global Tech Hub",
    heroImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1200&auto=format&fit=crop",
  },
  {
    slug: "beauty-personal-care",
    label: "Beauty & Wellness",
    heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop",
  },
];

// ─── Contact Info (Mall of America) ───
export const CONTACT = {
  address: "60 E Broadway, Bloomington, MN 55425, United States",
  phone: "+1 952-883-8800",
  email: "partner@mallofamerica.com",
  feedback: "feedback@mallofamerica.com",
  hours: "Mon–Sat: 10:00 AM – 9:00 PM | Sun: 11:00 AM – 7:00 PM",
  mapEmbed: "https://maps.google.com/maps?q=UB%20City,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

// ─── Initial MOA Brand Portfolio (B2B Showcase) ───
// Note: We'll keep some high-performing brands but re-contextualize them for MOA
export const BRANDS: Brand[] = [
  { slug: "apple", name: "Apple Store", category: "electronics", floor: "Level 1, South", hours: "10:00 AM – 9:00 PM", description: "The premier flagship for the latest iPhone, Mac, and Apple Watch models. A key traffic driver for the North wing.", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600&auto=format&fit=crop" },
  { slug: "nike", name: "Nike Well Collective", category: "experiential-retail", floor: "Level 2, West", hours: "10:00 AM – 9:00 PM", description: "A massive multi-level experience store featuring performance footwear, apparel, and live movement sessions.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
  { slug: "zara", name: "Zara Flagship", category: "experiential-retail", floor: "Level 1, East", hours: "10:00 AM – 9:00 PM", description: "One of the largest Zara locations in North America, offering trend-setting styles for women, men, and children.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { slug: "gucci", name: "Gucci", category: "luxury-wing", floor: "Level 1, South", hours: "10:00 AM – 9:00 PM", description: "An anchor of the luxury wing, featuring signature leather goods and high-fashion collections.", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop" },
  { slug: "nordstrom", name: "Nordstrom", category: "anchors", floor: "Multiple Levels", hours: "10:00 AM – 9:00 PM", description: "A luxury department store anchor providing high-end fashion and exceptional customer service.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop" },
  { slug: "macy-s", name: "Macy's", category: "anchors", floor: "Multiple Levels", hours: "10:00 AM – 9:00 PM", description: "The quintessential American department store, driving significant volume and dwell time.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format&fit=crop" },
  { slug: "nickelodeon-universe", name: "Nickelodeon Universe", category: "entertainment", floor: "Park Level", hours: "10:00 AM – 9:00 PM", description: "A seven-acre indoor theme park featuring 27 rides and attractions. The ultimate entertainment anchor.", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop" },
  { slug: "sea-life", name: "SEA LIFE Aquarium", category: "entertainment", floor: "Lower Level", hours: "10:00 AM – 8:00 PM", description: "Minnesota's largest aquarium featuring a 300-foot ocean tunnel and over 10,000 sea creatures.", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600&auto=format&fit=crop" },
  { slug: "burberry", name: "Burberry", category: "luxury-wing", floor: "Level 1, South", hours: "10:00 AM – 9:00 PM", description: "Iconic British luxury fashion house.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
  { slug: "louis-vuitton", name: "Louis Vuitton", category: "luxury-wing", floor: "Level 1, South", hours: "10:00 AM – 9:00 PM", description: "World-renowned French luxury fashion and leather goods.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  { slug: "tiffany-co", name: "Tiffany & Co.", category: "luxury-wing", floor: "Level 1, South", hours: "10:00 AM – 9:00 PM", description: "The premier destination for the finest jewelry and timepieces.", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" },
  { slug: "boss", name: "BOSS", category: "experiential-retail", floor: "Level 2, East", hours: "10:00 AM – 9:00 PM", description: "Modern, sophisticated tailoring and premium casualwear.", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=600&auto=format&fit=crop" },
  { slug: "armani-exchange", name: "Armani Exchange", category: "experiential-retail", floor: "Level 2, East", hours: "10:00 AM – 9:00 PM", description: "Youthful and contemporary fashion inspired by urban utility.", image: "https://images.unsplash.com/photo-1618886487325-f83761cc2e66?q=80&w=600&auto=format&fit=crop" },
  { slug: "calvin-klein-jeans", name: "Calvin Klein", category: "experiential-retail", floor: "Level 2, East", hours: "10:00 AM – 9:00 PM", description: "Global lifestyle brand exemplifying bold, progressive ideals.", image: "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=600&auto=format&fit=crop" },
  { slug: "tommy-hilfiger", name: "Tommy Hilfiger", category: "experiential-retail", floor: "Level 2, East", hours: "10:00 AM – 9:00 PM", description: "Classic American cool lifestyle brand.", image: "https://images.unsplash.com/photo-1588099768531-a72d4a198538?q=80&w=600&auto=format&fit=crop" },
  { slug: "adidas", name: "Adidas", category: "experiential-retail", floor: "Level 1, West", hours: "10:00 AM – 9:00 PM", description: "Performance sportswear and athletic apparel.", image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=600&auto=format&fit=crop" },
  { slug: "puma", name: "Puma", category: "experiential-retail", floor: "Level 1, West", hours: "10:00 AM – 9:00 PM", description: "One of the world's leading sports brands.", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop" },
  { slug: "under-armour", name: "Under Armour", category: "experiential-retail", floor: "Level 1, West", hours: "10:00 AM – 9:00 PM", description: "Athletic apparel designed for peak performance.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=600&auto=format&fit=crop" },
  { slug: "sephora", name: "Sephora", category: "beauty-personal-care", floor: "Level 1, North", hours: "10:00 AM – 9:00 PM", description: "A leader in global prestige retail.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop" },
  { slug: "mac-cosmetics", name: "MAC", category: "beauty-personal-care", floor: "Level 1, North", hours: "10:00 AM – 9:00 PM", description: "The world's leading professional makeup authority.", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop" },
  { slug: "bluemercury", name: "Bluemercury", category: "beauty-personal-care", floor: "Level 1, North", hours: "10:00 AM – 9:00 PM", description: "Luxury beauty products and spa services.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop" },
  { slug: "kiehls", name: "Kiehl's", category: "beauty-personal-care", floor: "Level 1, North", hours: "10:00 AM – 9:00 PM", description: "Premium skincare, hair care, and body care.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop" },
];

export const RESTAURANTS: Restaurant[] = [
  { 
    slug: "rainforest-cafe", 
    name: "Rainforest Cafe", 
    floor: "Level 3, West", 
    hours: "11:00 AM – 10:00 PM", 
    description: "An immersive dining experience with animatronic animals and tropical rainstorms. A must-visit attraction for families.", 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" 
  },
  { 
    slug: "twin-city-grill", 
    name: "Twin City Grill", 
    floor: "Level 1, North", 
    hours: "11:30 AM – 10:00 PM", 
    description: "A classic American grill serving comfort food favorites in a sophisticated, clubby atmosphere.", 
    image: "https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?q=80&w=1200" 
  },
  { 
    slug: "shake-shack", 
    name: "Shake Shack", 
    floor: "Level 3, North", 
    hours: "11:00 AM – 10:00 PM", 
    description: "Modern-day roadside burger stand known for its 100% all-natural Angus beef burgers and hand-spun shakes.", 
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200" 
  },
  { 
    slug: "margaritaville", 
    name: "Margaritaville", 
    floor: "Level 3, East", 
    hours: "11:00 AM – 11:00 PM", 
    description: "A tropical escape featuring island-inspired flavors and signature drinks. The perfect getaway within the mall.", 
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" 
  },
  { 
    slug: "bubba-gump", 
    name: "Bubba Gump Shrimp Co.", 
    floor: "Level 3, South", 
    hours: "11:00 AM – 10:00 PM", 
    description: "Inspired by the movie Forrest Gump, this seafood favorite offers a fun, high-energy dining experience.", 
    image: "https://images.unsplash.com/photo-1559715745-e1b33a271c8f?q=80&w=1200" 
  },
  { 
    slug: "cadillac-ranch", 
    name: "Cadillac Ranch", 
    floor: "Level 3, South", 
    hours: "11:00 AM – 1:00 AM", 
    description: "An authentic rock n' roll themed restaurant featuring BBQ, steaks, and a mechanical bull.", 
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200" 
  },
  { 
    slug: "sugar-factory", 
    name: "Sugar Factory", 
    floor: "Level 3, South", 
    hours: "11:00 AM – 10:00 PM", 
    description: "A world-renowned brasserie and confectionery known for its celebrity-endorsed smoking Goblet drinks.", 
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200" 
  },
  { 
    slug: "buffalo-wild-wings", 
    name: "Buffalo Wild Wings", 
    floor: "Level 3, East", 
    hours: "11:00 AM – 11:00 PM", 
    description: "The ultimate destination for wings, beer, and sports, creating a high-traffic anchor for the dining wing.", 
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200" 
  },
  { 
    slug: "fire-ice", 
    name: "Fire & Ice", 
    floor: "Level 3, South", 
    hours: "11:30 AM – 10:00 PM", 
    description: "An interactive grill and bar experience where guests can customize their own fresh ingredients.", 
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200" 
  },
  { 
    slug: "benihana", 
    name: "Benihana", 
    floor: "Level 3, South", 
    hours: "11:30 AM – 10:00 PM", 
    description: "Exhibition-style Japanese teppanyaki dining that drives high dwell time and repeat visits.", 
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1200" 
  },
];

export const UPCOMING_EVENTS: MallEvent[] = [
  { id: "e1", title: "Holiday Music Series", date: "Dec 1 - 24, 2026", time: "12:00 PM – 4:00 PM", location: "Huntington Bank Rotunda", description: "Live performances from local choirs and musicians in our iconic Rotunda.", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600", category: "Entertainment" },
];

export const MOVIES: Movie[] = [
  { title: "Avatar: Fire and Ash", language: "English", showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"], rating: "PG-13" },
];

// ─── Products (MOA Flagship Marketplace) ───
export const PRODUCTS: Product[] = [
    // APPLE
    { id: "moa-apple-1", storeSlug: "apple", name: "iPhone 16 Pro Max", price: 1199, category: "electronics", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600", description: "The ultimate flagship experience. Featuring titanium build and the most advanced camera system yet." },
    { id: "moa-apple-2", storeSlug: "apple", name: "MacBook Pro 14 M3 Max", price: 3199, category: "electronics", image: "https://images.unsplash.com/photo-1517336710212-d033502787e9?q=80&w=600", description: "Mind-blowing performance. Extreme pro capability for creators and developers." },
    { id: "moa-apple-3", storeSlug: "apple", name: "Apple Vision Pro", price: 3499, category: "electronics", image: "https://images.unsplash.com/photo-1707064974650-71708846c483?q=80&w=600", description: "The dawn of spatial computing. Immerse yourself in a world where digital and physical reality blend." },
    
    // NIKE
    { id: "moa-nike-1", storeSlug: "nike", name: "Air Max Dn 'All Night'", price: 160, category: "experiential-retail", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", description: "The next generation of Air. Dynamic motion for superior cushioning and street style." },
    { id: "moa-nike-2", storeSlug: "nike", name: "Jordan 1 Retro High OG", price: 180, category: "experiential-retail", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600", description: "A legend in every step. The iconic silhouette that started it all." },
    { id: "moa-nike-3", storeSlug: "nike", name: "Nike Tech Fleece Set", price: 250, category: "experiential-retail", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600", description: "Ultimate warmth without the weight. Premium comfort for an active legacy." },

    // ZARA
    { id: "moa-zara-1", storeSlug: "zara", name: "Limited Edition Wool Coat", price: 299, category: "experiential-retail", image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=600", description: "Signature tailoring from the Zara MOA flagship. A timeless piece for the modern wardrobe." },
    { id: "moa-zara-2", storeSlug: "zara", name: "Studio Collection Silk Dress", price: 189, category: "experiential-retail", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600", description: "Effortless elegance. Part of the exclusive global Studio Collection." },

    // GUCCI
    { id: "moa-gucci-1", storeSlug: "gucci", name: "Horsebit 1955 Shoulder Bag", price: 2890, category: "luxury-wing", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=600", description: "A piece of fashion history. Crafted in iconic monogram canvas with signature gold-tone hardware." },
    { id: "moa-gucci-2", storeSlug: "gucci", name: "Gucci Re-Web Sneaker", price: 850, category: "luxury-wing", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600", description: "The evolution of heritage. A bold take on archive-inspired luxury sports footwear." },

    // NORDSTROM
    { id: "moa-nord-1", storeSlug: "nordstrom", name: "Burberry Heritage Trench", price: 2490, category: "anchors", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600", description: "A Nordstrom hallmark. The iconic double-breasted coat in weatherproof gabardine." },
    { id: "moa-nord-2", storeSlug: "nordstrom", name: "Le Labo Santal 33", price: 320, category: "anchors", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600", description: "The quintessential luxury fragrance, exclusively featured in our Nordstrom beauty hall." },

    // MACY'S
    { id: "moa-macy-1", storeSlug: "macy-s", name: "Charter Club Cashmere", price: 139, category: "anchors", image: "https://images.unsplash.com/photo-1625910513397-240987516930?q=80&w=600", description: "Exceptional softness and quality. A Macy's MOA standard for winter luxury." },
    { id: "moa-macy-2", storeSlug: "macy-s", name: "KitchenAid Artisan Mixer", price: 449, category: "anchors", image: "https://images.unsplash.com/photo-1594910413528-94bcc91483f4?q=80&w=600", description: "The ultimate anchor for home collections, available in multiple signature MOA colors." },

    // NICKELODEON UNIVERSE
    { id: "moa-nick-1", storeSlug: "nickelodeon-universe", name: "Unlimited Ride Wristband", price: 49.99, category: "entertainment", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600", description: "Full access to 27 rides and attractions for a complete day of adrenaline." },
    { id: "moa-nick-2", storeSlug: "nickelodeon-universe", name: "Slime Experience Kit", price: 25, category: "entertainment", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600", description: "The official Nickelodeon slime experience, a favorite for community and family engagement." },

    // SEA LIFE
    { id: "moa-sea-1", storeSlug: "sea-life", name: "VIP Shark Tour", price: 95, category: "entertainment", image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600", description: "A behind-the-scenes look at our 1.2 million gallon aquarium and its apex predators." },
    { id: "moa-sea-2", storeSlug: "sea-life", name: "Stingray Feeding Experience", price: 35, category: "entertainment", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600", description: "Interact with our gentle stingrays in a dedicated, professionally-guided session." },
];

// Reuse existing helpers
export function getProductById(id: string): Product | undefined {
    const existing = PRODUCTS.find(p => p.id === id);
    if (existing) return existing;
    if (id.includes('-mock-')) {
        const slug = id.split('-mock-')[0];
        return {
           id, storeSlug: slug, name: "Signature Collection Piece", price: 299, category: "luxury", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600", description: "Exclusive new arrival, perfectly crafted for our discerning clientele."
        };
    }
    return undefined;
}

export function getProductsByStore(slug: string): Product[] {
    const existing = PRODUCTS.filter(p => p.storeSlug === slug);
    if (existing.length >= 2) return existing;
    return [
        {
            id: `${slug}-mock-1`,
            storeSlug: slug,
            name: `Signature Piece`,
            price: 199,
            category: "luxury",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
            description: "Exclusive new arrival."
        },
        {
            id: `${slug}-mock-2`,
            storeSlug: slug,
            name: `Premium Asset`,
            price: 299,
            category: "luxury",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600",
            description: "Experience world-class quality."
        }
    ];
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
