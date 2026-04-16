import { Product } from "./mallData";

type ProductSeed = {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

const BRAND_SEEDS: Record<string, ProductSeed[]> = {
  nike: [
    { name: "Air Force 1 '07", price: 115, category: "footwear", description: "Nike classic low-top with durable leather construction.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=700" },
    { name: "Air Jordan 1 Mid", price: 135, category: "footwear", description: "Iconic Jordan silhouette with everyday street style comfort.", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=700" },
    { name: "Dunk Low Retro", price: 120, category: "footwear", description: "Basketball heritage sneaker engineered for daily wear.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=700" },
    { name: "Pegasus 41", price: 140, category: "sportswear", description: "Responsive road running shoes built for high mileage.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=700" },
    { name: "Tech Fleece Full-Zip Hoodie", price: 130, category: "sportswear", description: "Warm and lightweight signature Nike Tech Fleece layer.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
  ],
  adidas: [
    { name: "Samba OG", price: 100, category: "footwear", description: "Adidas indoor soccer icon adopted by streetwear culture.", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=700" },
    { name: "Gazelle Indoor", price: 120, category: "footwear", description: "Classic suede trainer with translucent gum tooling.", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=700" },
    { name: "Ultraboost Light", price: 190, category: "sportswear", description: "Energy-return running shoes with Boost midsole comfort.", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=700" },
    { name: "Forum Low", price: 110, category: "footwear", description: "Court-inspired leather sneaker with retro adidas DNA.", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=700" },
    { name: "Adicolor Classics Firebird Track Top", price: 80, category: "sportswear", description: "Archive-inspired adidas track jacket in tricot fabric.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=700" },
  ],
  apple: [
    { name: "iPhone 16 Pro", price: 1099, category: "electronics", description: "Apple flagship smartphone with Pro camera and A-series chip.", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=700" },
    { name: "MacBook Air 13-inch", price: 1099, category: "electronics", description: "Ultra-portable Apple laptop with all-day battery life.", image: "https://images.unsplash.com/photo-1517336710212-d033502787e9?q=80&w=700" },
    { name: "iPad Pro 11-inch", price: 999, category: "electronics", description: "Powerful iPad with pro-grade display and Apple Pencil support.", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=700" },
    { name: "AirPods Pro (2nd Gen)", price: 249, category: "electronics", description: "Active noise cancelling earbuds with adaptive audio.", image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=700" },
    { name: "Apple Watch Series 10", price: 429, category: "electronics", description: "Advanced Apple Watch with fitness and health tracking.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=700" },
  ],
  zara: [
    { name: "Tailored Wool Blend Blazer", price: 129, category: "lifestyle-apparel", description: "Structured single-breasted blazer with modern tailoring.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700" },
    { name: "Wide-Leg High-Rise Jeans", price: 59, category: "lifestyle-apparel", description: "Relaxed denim silhouette with contemporary wide-leg fit.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=700" },
    { name: "Leather Slingback Heels", price: 89, category: "footwear", description: "Pointed leather heels for elevated day-to-night outfits.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=700" },
    { name: "Textured Knit Polo", price: 49, category: "lifestyle-apparel", description: "Breathable knit polo with refined minimalist detailing.", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=700" },
    { name: "Double-Breasted Trench Coat", price: 149, category: "lifestyle-apparel", description: "Timeless trench silhouette with water-resistant finish.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
  ],
  sephora: [
    { name: "Dior Sauvage Elixir", price: 165, category: "beauty-personal-care", description: "Concentrated fragrance with bold aromatic composition.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700" },
    { name: "Rare Beauty Soft Pinch Liquid Blush", price: 23, category: "beauty-personal-care", description: "Highly pigmented liquid blush with blendable finish.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=700" },
    { name: "Fenty Beauty Pro Filt'r Foundation", price: 40, category: "beauty-personal-care", description: "Soft matte foundation available across diverse shade ranges.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=700" },
    { name: "Charlotte Tilbury Airbrush Flawless Finish", price: 48, category: "beauty-personal-care", description: "Micro-fine setting powder for smooth complexion finish.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=700" },
    { name: "Laneige Lip Sleeping Mask", price: 24, category: "beauty-personal-care", description: "Overnight lip treatment that hydrates and smooths texture.", image: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=700" },
  ],
  lululemon: [
    { name: "ABC Classic-Fit Pant", price: 128, category: "sportswear", description: "Versatile technical pant with all-day stretch comfort.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700" },
    { name: "Define Jacket Nulu", price: 128, category: "sportswear", description: "Signature lululemon slim jacket in buttery-soft Nulu fabric.", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=700" },
    { name: "Align High-Rise Pant 25\"", price: 98, category: "sportswear", description: "Ultra-soft yoga leggings for low-impact performance.", image: "https://images.unsplash.com/photo-1506629905607-45f5f2d8d8f3?q=80&w=700" },
    { name: "Metal Vent Tech Short-Sleeve", price: 78, category: "sportswear", description: "Sweat-wicking seamless training shirt for daily workouts.", image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=700" },
    { name: "Everywhere Belt Bag 1L", price: 38, category: "lifestyle-apparel", description: "Compact crossbody belt bag for essentials on the move.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=700" },
  ],
  asics: [
    { name: "Gel-Kayano 31", price: 170, category: "sportswear", description: "Stability running shoes with advanced cushioning support.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=700" },
    { name: "Novablast 4", price: 150, category: "sportswear", description: "Energetic daily trainer with responsive foam ride.", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=700" },
    { name: "Court FF 3", price: 165, category: "sportswear", description: "High-performance court shoes for quick directional movement.", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=700" },
  ],
  reebok: [
    { name: "Classic Leather 1983", price: 95, category: "sportswear", description: "Timeless Reebok street sneaker in smooth leather upper.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=700" },
    { name: "Nano X4", price: 140, category: "sportswear", description: "Cross-training shoes built for gym versatility.", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=700" },
    { name: "Vector Track Pants", price: 75, category: "sportswear", description: "Heritage-inspired athleisure pants with modern fit.", image: "https://images.unsplash.com/photo-1506629905607-45f5f2d8d8f3?q=80&w=700" },
  ],
  skechers: [
    { name: "Go Walk Max", price: 92, category: "sportswear", description: "Ultra-comfort walking shoes with lightweight cushioning.", image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8f1f?q=80&w=700" },
    { name: "Arch Fit 2.0", price: 105, category: "sportswear", description: "Supportive footwear engineered for all-day comfort.", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=700" },
    { name: "Slip-Ins Summits", price: 85, category: "sportswear", description: "Hands-free easy-wear sneakers for daily movement.", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=700" },
  ],
  boss: [
    { name: "Slim Fit Formal Blazer", price: 420, category: "lifestyle-apparel", description: "Premium tailoring with sharp modern silhouette.", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=700" },
    { name: "Cotton Pique Polo", price: 130, category: "lifestyle-apparel", description: "Minimal logo polo crafted for smart casual dressing.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
    { name: "Luxe Leather Belt", price: 115, category: "lifestyle-apparel", description: "Refined leather belt with signature metal hardware.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=700" },
  ],
  "armani-exchange": [
    { name: "Logo Tape Bomber Jacket", price: 260, category: "lifestyle-apparel", description: "Urban bomber jacket with bold AX styling.", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=700" },
    { name: "Regular Fit Denim", price: 145, category: "lifestyle-apparel", description: "Signature Armani Exchange jeans with clean finish.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=700" },
    { name: "AX Chronograph Watch", price: 295, category: "lifestyle-apparel", description: "Fashion chronograph with stainless steel bracelet.", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=700" },
  ],
  "calvin-klein-jeans": [
    { name: "90s Straight Denim", price: 118, category: "lifestyle-apparel", description: "Classic straight fit jeans inspired by 90s styling.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=700" },
    { name: "Monogram Crew Sweatshirt", price: 95, category: "lifestyle-apparel", description: "Soft cotton sweatshirt with CK monogram detailing.", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=700" },
    { name: "Essential Denim Jacket", price: 140, category: "lifestyle-apparel", description: "All-season denim jacket with modern trim fit.", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=700" },
  ],
  "tommy-hilfiger": [
    { name: "Flag Logo Hoodie", price: 115, category: "lifestyle-apparel", description: "Comfort hoodie with iconic Tommy flag branding.", image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=700" },
    { name: "Stretch Chino Trousers", price: 125, category: "lifestyle-apparel", description: "Smart-casual chinos in stretch cotton fabric.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=700" },
    { name: "Classic Oxford Shirt", price: 98, category: "lifestyle-apparel", description: "Crisp Oxford shirt for polished everyday looks.", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=700" },
  ],
  levis: [
    { name: "501 Original Fit", price: 92, category: "lifestyle-apparel", description: "Levi's original straight fit jeans with signature profile.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=700" },
    { name: "Trucker Jacket", price: 110, category: "lifestyle-apparel", description: "Iconic Levi's denim trucker jacket.", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=700" },
    { name: "Graphic Tee Pack", price: 45, category: "lifestyle-apparel", description: "Soft cotton tees with archival Levi's graphics.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
  ],
  nordstrom: [
    { name: "Nordstrom Signature Cashmere Sweater", price: 295, category: "luxury-wing", description: "Premium Italian cashmere with a relaxed, modern fit.", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=700" },
    { name: "Zella Live In High Waist Leggings", price: 59, category: "experiential-retail", description: "The fan-favorite leggings for performance and lounging.", image: "https://images.unsplash.com/photo-1506629905607-45f5f2d8d8f3?q=80&w=700" },
  ],
  macy_s: [
    { name: "Charter Club Cashmere Crew", price: 139, category: "experiential-retail", description: "Macy's exclusive luxury cashmere with exceptional softness.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
    { name: "Levis 501 Original Fit Jeans", price: 89, category: "experiential-retail", description: "A classic look that never goes out of style.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=700" },
  ],
  puma: [
    { name: "RS-X Heritage", price: 130, category: "footwear", description: "Chunky silhouette sneaker with bold PUMA style.", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=700" },
    { name: "Velocity Nitro 3", price: 160, category: "footwear", description: "Lightweight running shoe with NITRO foam cushioning.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=700" },
    { name: "Essentials Training Tee", price: 48, category: "sportswear", description: "Sweat-wicking training tee for gym sessions.", image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=700" },
  ],
  "h-m": [
    { name: "Oversized Cotton Hoodie", price: 34, category: "experiential-retail", description: "H&M Conscious collection hoodie in soft jersey.", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=700" },
    { name: "Slim Fit Linen Suit", price: 159, category: "experiential-retail", description: "Breathable linen blend for warm weather formal occasions.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700" },
  ],
  patagonia: [
    { name: "Nano Puff Jacket", price: 239, category: "experiential-retail", description: "Warm, windproof and water-resistant technical layer.", image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8f1f?q=80&w=700" },
  ],
  samsung: [
    { name: "Galaxy S25 Ultra", price: 1299, category: "electronics", description: "Flagship Android smartphone with advanced AI camera system.", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=700" },
    { name: "Galaxy Watch 8", price: 399, category: "electronics", description: "Smartwatch with wellness insights and fitness tracking.", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=700" },
    { name: "Neo QLED 4K TV", price: 1699, category: "electronics", description: "Immersive home entertainment TV with vivid contrast.", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=700" },
  ],
  sony: [
    { name: "WH-1000XM6 Headphones", price: 449, category: "electronics", description: "Industry-leading noise canceling wireless headphones.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=700" },
    { name: "PlayStation 5 Pro", price: 699, category: "electronics", description: "Next-gen console gaming with enhanced graphics performance.", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=700" },
    { name: "Alpha Mirrorless Camera", price: 1899, category: "electronics", description: "Pro-grade camera system for creators and filmmakers.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700" },
  ],
  "chanel-beauty": [
    { name: "Rouge Allure Velvet", price: 45, category: "luxury-wing", description: "Luminous matte lip colour for a bold finish.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=700" },
    { name: "N°5 Eau de Parfum", price: 160, category: "luxury-wing", description: "The world's most iconic fragrance.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700" },
  ],
  "mac-cosmetics": [
    { name: "Studio Fix Fluid Foundation", price: 48, category: "beauty-personal-care", description: "Long-wear foundation with medium to full coverage.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=700" },
    { name: "Ruby Woo Lipstick", price: 29, category: "beauty-personal-care", description: "Iconic matte red lipstick from MAC classics.", image: "https://images.unsplash.com/photo-1583241800698-68d6d8693db6?q=80&w=700" },
    { name: "Fix+ Setting Spray", price: 35, category: "beauty-personal-care", description: "Hydrating setting mist for refreshed makeup finish.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=700" },
  ],
  gucci: [
    { name: "GG Supreme Mini Bag", price: 2450, category: "luxury", description: "Iconic Gucci mini bag in signature GG Supreme canvas.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=700" },
    { name: "Horsebit Leather Loafers", price: 1150, category: "luxury", description: "Classic Gucci loafers with timeless horsebit detail.", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=700" },
    { name: "Silk Monogram Scarf", price: 540, category: "luxury", description: "Luxury silk scarf featuring archival Gucci motifs.", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=700" },
  ],
  burberry: [
    { name: "Heritage Trench Coat", price: 2200, category: "luxury", description: "Crafted trench coat with iconic Burberry detailing.", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=700" },
    { name: "Check Cashmere Scarf", price: 520, category: "luxury", description: "Signature check scarf woven in premium cashmere.", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=700" },
    { name: "Leather TB Wallet", price: 680, category: "luxury", description: "Elegant leather wallet with monogram hardware.", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=700" },
  ],
  "tiffany-co": [
    { name: "Tiffany T Wire Bracelet", price: 2900, category: "luxury", description: "Fine jewelry bracelet inspired by clean architectural lines.", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=700" },
    { name: "Elsa Peretti Pendant", price: 1450, category: "luxury", description: "Minimal pendant necklace in premium precious metal.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=700" },
    { name: "Diamond Stud Earrings", price: 3600, category: "luxury", description: "Classic Tiffany diamond studs for timeless elegance.", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=700" },
  ],
  "louis-vuitton": [
    { name: "Speedy Bandoulière 25", price: 1800, category: "luxury", description: "Iconic Louis Vuitton bag with monogram canvas.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=700" },
    { name: "LV Initiales Belt", price: 590, category: "luxury", description: "Reversible leather belt with LV buckle.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=700" },
  ],
  "under-armour": [
    { name: "Project Rock Training Shoes", price: 150, category: "sportswear", description: "Performance training shoe built for intense workouts.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=700" },
    { name: "Tech 2.0 Short Sleeve Tee", price: 25, category: "sportswear", description: "Sweat-wicking, quick-drying training tee.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
  ],
  "bluemercury": [
    { name: "M-61 Power Glow Peel", price: 32, category: "beauty-personal-care", description: "1-minute exfoliating glycolic & salicylic acid peel.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=700" },
    { name: "Lune+Aster CC Cream", price: 48, category: "beauty-personal-care", description: "Medium coverage CC cream with broad spectrum SPF.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=700" },
  ],
  "kiehls": [
    { name: "Ultra Facial Cream", price: 38, category: "beauty-personal-care", description: "24-hour daily lightweight hydrating moisturizer.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700" },
    { name: "Midnight Recovery Concentrate", price: 56, category: "beauty-personal-care", description: "Nighttime facial oil that visibly restores skin.", image: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=700" },
  ],
};

const variants = [
  "Core Black",
  "Summit White",
  "Midnight Navy",
  "Sandstone",
  "Graphite",
  "Rose Gold",
  "Olive",
  "Cobalt",
  "Burgundy",
  "Platinum",
];

const CATEGORY_SEEDS: Record<string, ProductSeed[]> = {
  "sportswear": [
    { name: "Training Performance Tee", price: 48, category: "sportswear", description: "Breathable active tee for intense workouts.", image: "https://images.unsplash.com/photo-1574182245530-967d9b3831af?q=80&w=700" },
    { name: "Elite Run Shorts", price: 65, category: "sportswear", description: "Quick-dry running shorts with lightweight liner.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=700" },
    { name: "Track Jacket Pro", price: 110, category: "sportswear", description: "Performance zip jacket for training and warm-up.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
  ],
  "lifestyle-apparel": [
    { name: "Premium Everyday Hoodie", price: 89, category: "lifestyle-apparel", description: "Relaxed-fit hoodie with soft brushed interior.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700" },
    { name: "Modern Relaxed Trousers", price: 95, category: "lifestyle-apparel", description: "Minimal tapered trousers for daily wear.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=700" },
    { name: "Structured Overshirt", price: 79, category: "lifestyle-apparel", description: "Layer-ready overshirt with clean utility details.", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=700" },
  ],
  "department-stores": [
    { name: "Designer Home Collection Set", price: 129, category: "department-stores", description: "Curated home accessories from premium in-store labels.", image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=700" },
    { name: "Signature Department Gift Box", price: 89, category: "department-stores", description: "Seasonal department store exclusive essentials bundle.", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=700" },
    { name: "Premium Household Starter Pack", price: 159, category: "department-stores", description: "Best-selling everyday products from top store brands.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=700" },
  ],
  "footwear": [
    { name: "Urban Runner X", price: 150, category: "footwear", description: "High-cushion sneakers for all-day comfort.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=700" },
    { name: "Classic Leather Court", price: 120, category: "footwear", description: "Low-top leather sneakers with timeless profile.", image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=700" },
    { name: "Elevated Street Boot", price: 180, category: "footwear", description: "Contemporary boots with durable sole construction.", image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8f1f?q=80&w=700" },
  ],
  "beauty-personal-care": [
    { name: "Hydration Glow Serum", price: 42, category: "beauty-personal-care", description: "Daily serum for radiant and hydrated skin.", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=700" },
    { name: "Luxury Fragrance Mist", price: 78, category: "beauty-personal-care", description: "Fresh floral mist with long-lasting dry-down.", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700" },
    { name: "Silk Matte Foundation", price: 38, category: "beauty-personal-care", description: "Buildable formula with natural matte finish.", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=700" },
  ],
  "electronics": [
    { name: "Pro Tablet 12", price: 899, category: "electronics", description: "High-performance tablet for work and creativity.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=700" },
    { name: "Noise Cancel Headphones", price: 299, category: "electronics", description: "Adaptive over-ear ANC headset with premium sound.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=700" },
    { name: "Smart Home Hub", price: 249, category: "electronics", description: "Connected home controller with voice automation.", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=700" },
  ],
  "luxury": [
    { name: "Monogram Leather Weekender", price: 2200, category: "luxury", description: "Premium crafted leather bag with signature monogram.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=700" },
    { name: "Chronograph Steel Watch", price: 3400, category: "luxury", description: "Swiss movement luxury watch in polished steel.", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=700" },
    { name: "Couture Silk Scarf", price: 520, category: "luxury", description: "Limited-run designer scarf in pure silk weave.", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=700" },
  ],
};

function buildCatalog(storeSlug: string, seeds: ProductSeed[]): Product[] {
  const items: Product[] = [];
  for (let i = 0; i < 100; i += 1) {
    const seed = seeds[i % seeds.length];
    const variant = variants[i % variants.length];
    const wave = Math.floor(i / seeds.length) + 1;
    items.push({
      id: `${storeSlug}-${i + 1}`,
      storeSlug,
      name: `${seed.name} - ${variant} ${wave}`,
      price: seed.price + (i % 5) * 4,
      category: seed.category,
      description: `${seed.description} Collection drop ${wave} in ${variant}.`,
      image: seed.image,
    });
  }
  return items;
}

export const STORE_PRODUCTS: Record<string, Product[]> = Object.fromEntries(
  Object.entries(BRAND_SEEDS).map(([slug, seeds]) => [slug, buildCatalog(slug, seeds)]),
);

export function getStoreProducts(storeSlug: string): Product[] {
  return STORE_PRODUCTS[storeSlug] || [];
}

export const CATEGORY_PRODUCTS: Record<string, Product[]> = Object.fromEntries(
  Object.entries(CATEGORY_SEEDS).map(([slug, seeds]) => [slug, buildCatalog(`category-${slug}`, seeds)]),
);

export function getCategoryProducts(categorySlug: string): Product[] {
  return CATEGORY_PRODUCTS[categorySlug] || [];
}

export function getAllStoreProducts(): Product[] {
  return Object.values(STORE_PRODUCTS).flat();
}

