export interface DiningVariety {
  slug: string;
  name: string;
  cuisine: string;
  price: number;
  prepTime: string;
  image: string;
  description: string;
}

export const DINING_VARIETIES: DiningVariety[] = [
  { slug: "tandoori-platter", name: "Royal Tandoori Platter", cuisine: "North Indian", price: 24, prepTime: "25 mins", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=900", description: "Smoked paneer, chicken tikka, seekh kebab, and mint chutney." },
  { slug: "ramen-bowl", name: "Tokyo Tonkotsu Ramen", cuisine: "Japanese", price: 19, prepTime: "20 mins", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=900", description: "Creamy pork broth ramen with soft egg, bamboo shoot, and nori." },
  { slug: "margherita", name: "Woodfired Margherita", cuisine: "Italian", price: 17, prepTime: "18 mins", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=900", description: "Hand-stretched pizza with buffalo mozzarella and basil oil." },
  { slug: "sushi-combo", name: "Chef's Sushi Combo", cuisine: "Japanese", price: 28, prepTime: "22 mins", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=900", description: "Assorted nigiri, dragon roll, spicy tuna roll, and wasabi soy." },
  { slug: "burger-smash", name: "Double Smash Burger", cuisine: "American", price: 16, prepTime: "15 mins", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900", description: "Two patties, cheddar, caramelized onion, and house aioli." },
  { slug: "falafel-wrap", name: "Mediterranean Falafel Wrap", cuisine: "Mediterranean", price: 14, prepTime: "12 mins", image: "https://images.unsplash.com/photo-1623428454614-abaf00244e52?q=80&w=900", description: "Crispy falafel with hummus, pickles, and tahini drizzle." },
  { slug: "bibimbap", name: "Seoul Bibimbap Bowl", cuisine: "Korean", price: 18, prepTime: "18 mins", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=900", description: "Rice bowl with vegetables, gochujang, egg, and grilled beef." },
  { slug: "butter-chicken", name: "Signature Butter Chicken", cuisine: "Indian", price: 21, prepTime: "20 mins", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=900", description: "Tender chicken in creamy tomato gravy with naan." },
  { slug: "poke-bowl", name: "Ahi Tuna Poke Bowl", cuisine: "Hawaiian", price: 20, prepTime: "14 mins", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900", description: "Fresh tuna with avocado, cucumber, edamame, and sesame rice." },
  { slug: "thai-curry", name: "Thai Green Curry", cuisine: "Thai", price: 19, prepTime: "16 mins", image: "https://images.unsplash.com/photo-1604908176997-4315f871f4ad?q=80&w=900", description: "Coconut curry with basil, seasonal vegetables, and jasmine rice." },
  { slug: "truffle-pasta", name: "Black Truffle Fettuccine", cuisine: "Italian", price: 26, prepTime: "19 mins", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=900", description: "Silky cream sauce, parmesan flakes, and shaved black truffle." },
  { slug: "fish-taco", name: "Baja Fish Tacos", cuisine: "Mexican", price: 15, prepTime: "13 mins", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=900", description: "Beer-battered fish with cabbage slaw and chipotle crema." },
  { slug: "dimsum-basket", name: "Dragon Dim Sum Basket", cuisine: "Chinese", price: 18, prepTime: "14 mins", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=900", description: "Steamed dumplings assortment with chili garlic dip." },
  { slug: "steak-bowl", name: "Teriyaki Steak Rice Bowl", cuisine: "Asian Fusion", price: 23, prepTime: "18 mins", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=900", description: "Grilled steak strips, teriyaki glaze, and sesame veggies." },
  { slug: "vegan-power", name: "Vegan Power Plate", cuisine: "Vegan", price: 16, prepTime: "11 mins", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=900", description: "Quinoa, roasted chickpeas, kale, beet hummus, and seeds." },
  { slug: "churros", name: "Cinnamon Churro Stack", cuisine: "Dessert", price: 11, prepTime: "9 mins", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=900", description: "Warm churros with dark chocolate and caramel dip." },
  { slug: "cheesecake", name: "Berry Cheesecake Slice", cuisine: "Dessert", price: 10, prepTime: "7 mins", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=900", description: "New York-style cheesecake with seasonal berry compote." },
  { slug: "cold-brew", name: "Vanilla Cold Brew", cuisine: "Cafe", price: 7, prepTime: "5 mins", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900", description: "Single-origin cold brew with vanilla cream float." },
  { slug: "fries-loaded", name: "Loaded Truffle Fries", cuisine: "Snacks", price: 12, prepTime: "10 mins", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=900", description: "Crispy fries with truffle oil, parmesan, and herbs." },
  { slug: "shack-burger", name: "ShackBurger®", cuisine: "American", price: 12, prepTime: "10 mins", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=900", description: "Angus beef cheeseburger with lettuce, tomato, and secret ShackSauce." },
  { slug: "smoke-shack", name: "SmokeShack™", cuisine: "American", price: 14, prepTime: "12 mins", image: "https://images.unsplash.com/photo-1534790561517-4158dc321927?q=80&w=900", description: "Cheeseburger topped with applewood smoked bacon and chopped cherry peppers." },
  { slug: "shroom-burger", name: "Shroom Burger", cuisine: "Vegetarian", price: 13, prepTime: "15 mins", image: "https://images.unsplash.com/photo-1594970544699-2821815f9498?q=80&w=900", description: "Crisp-fried portobello mushroom filled with melted muenster and cheddar cheeses." },
  { slug: "prime-rib", name: "Prime Bone-In Ribeye", cuisine: "American Grill", price: 42, prepTime: "30 mins", image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=900", description: "Aged 28 days, char-grilled with garlic butter and sea salt." },
  { slug: "lobster-tail", name: "Atlantic Lobster Tail", cuisine: "Seafood", price: 38, prepTime: "25 mins", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=900", description: "Twin cold water tails with drawn butter and grilled lemon." },
  { slug: "truffle-mac", name: "Truffle Mac & Cheese", cuisine: "Sides", price: 15, prepTime: "12 mins", image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?q=80&w=900", description: "Elbow pasta in white cheddar sauce with shaved summer truffles." },
];

export function getDiningBySlug(slug: string) {
  return DINING_VARIETIES.find((item) => item.slug === slug);
}

