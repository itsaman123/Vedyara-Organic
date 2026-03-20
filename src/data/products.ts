export interface Product {
  id: number;
  name: string;
  category: "honey" | "millets" | "jaggery" | "pulses" | "grains";
  price: string;
  originalPrice?: string;
  badge?: "Best Seller" | "Trending" | "New" | "Limited";
  image: string;
  description: string;
  shortDesc: string;
  benefits: string[];
  weight: string;
  amazonLink: string;
  rating: number;
  reviews: number;
  limited?: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Himalayan Wild Honey",
    category: "honey",
    price: "₹399",
    originalPrice: "₹499",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    shortDesc: "Raw, unprocessed honey from pristine Himalayan forests",
    description:
      "Our Himalayan Wild Honey is sourced directly from the untouched forests of the Himalayas, where bees feed on wildflowers blooming at high altitudes. Completely raw and unprocessed, it retains all its natural enzymes, antioxidants, and healing properties. Cold-extracted without any heat treatment to preserve full nutritional value.",
    benefits: [
      "Boosts Immunity",
      "Rich in Antioxidants",
      "Natural Energy",
      "Aids Digestion",
    ],
    weight: "500g",
    amazonLink: "https://www.amazon.in",
    rating: 4.8,
    reviews: 234,
    limited: false,
    featured: true,
  },
  {
    id: 2,
    name: "Organic Jaggery Powder",
    category: "jaggery",
    price: "₹199",
    originalPrice: "₹249",
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80",
    shortDesc: "Traditional sugarcane jaggery, stone-ground to fine powder",
    description:
      "Made from organically grown sugarcane using the ancient Kolhu (cold press) method, our jaggery powder is chemical-free, unrefined, and packed with natural minerals. Unlike refined sugar, it retains its natural molasses content, giving it a rich, complex flavour with genuine nutritional benefits.",
    benefits: [
      "Iron Rich",
      "Detoxifies Liver",
      "Boosts Hemoglobin",
      "Healthier Sugar Alt.",
    ],
    weight: "500g",
    amazonLink: "https://www.amazon.in",
    rating: 4.7,
    reviews: 189,
    limited: false,
    featured: true,
  },
  {
    id: 3,
    name: "Foxtail Millet (Kangni)",
    category: "millets",
    price: "₹149",
    originalPrice: "₹199",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    shortDesc: "Gluten-free ancient grain rich in protein and dietary fiber",
    description:
      "Foxtail Millet, known as Kangni in Hindi, is one of India's oldest cultivated grains. Naturally gluten-free with a remarkably low glycemic index, it's the perfect grain alternative for diabetics and health-conscious individuals. Our millet is minimally processed to retain maximum nutrition.",
    benefits: [
      "Gluten Free",
      "Low Glycemic",
      "High Protein",
      "Heart Healthy",
    ],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.6,
    reviews: 156,
    limited: false,
    featured: true,
  },
  {
    id: 4,
    name: "Pearl Millet (Bajra)",
    category: "millets",
    price: "₹129",
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    shortDesc: "Nutrient-dense winter grain for strength and immunity",
    description:
      "Pearl Millet or Bajra has been a cornerstone of rural Indian nutrition for centuries. Rich in iron, zinc, and B-vitamins, it keeps the body warm in winter, boosts hemoglobin levels, and provides sustained energy throughout the day. Ideal for rotis, porridge, and khichdi.",
    benefits: ["Iron Rich", "Bone Strength", "High Fiber", "Winter Warmth"],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.5,
    reviews: 112,
    limited: true,
    featured: false,
  },
  {
    id: 5,
    name: "Organic Red Lentils (Masoor)",
    category: "pulses",
    price: "₹179",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
    shortDesc: "Farm-fresh red lentils, high in plant-based protein",
    description:
      "Our Organic Red Lentils are sourced from certified organic farms in Rajasthan. Carefully hand-cleaned, sorted, and packed without any artificial preservatives or additives. Rich in folate, iron, and dietary fiber, they cook quickly and are gentle on the digestive system.",
    benefits: [
      "High Protein",
      "Folate Rich",
      "Easy Digestion",
      "Low Fat",
    ],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.7,
    reviews: 201,
    limited: false,
    featured: false,
  },
  {
    id: 6,
    name: "Organic Brown Rice",
    category: "grains",
    price: "₹219",
    originalPrice: "₹269",
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff86e0c9da41?w=600&q=80",
    shortDesc: "Whole grain brown rice with bran intact for maximum nutrition",
    description:
      "Unlike polished white rice, our Organic Brown Rice retains its natural bran layer, making it a powerhouse of nutrients. Packed with magnesium, phosphorus, and B vitamins, it supports healthy metabolism, provides sustained energy, and keeps you feeling full longer.",
    benefits: ["Whole Grain", "Magnesium Rich", "Low GI", "Fiber Dense"],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.6,
    reviews: 145,
    limited: false,
    featured: false,
  },
  {
    id: 7,
    name: "Black Gram (Urad Dal)",
    category: "pulses",
    price: "₹189",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    shortDesc: "Premium whole black gram for traditional Ayurvedic recipes",
    description:
      "Our Urad Dal (Black Gram) is sourced from organic farms in Madhya Pradesh. Revered in Ayurveda for its strengthening properties, it's known for its rich, creamy texture and exceptional protein content. Perfect for dal makhani, idli-dosa batter, and traditional vadas.",
    benefits: [
      "Protein Packed",
      "Bone Health",
      "Energy Boost",
      "Ayurvedic",
    ],
    weight: "500g",
    amazonLink: "https://www.amazon.in",
    rating: 4.5,
    reviews: 98,
    limited: false,
    featured: false,
  },
  {
    id: 8,
    name: "Finger Millet (Ragi)",
    category: "millets",
    price: "₹139",
    originalPrice: "₹179",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&q=80",
    shortDesc: "Calcium-rich ancient grain ideal for growing children",
    description:
      "Finger Millet, known as Ragi, is a nutritional treasure from South India revered for its exceptionally high calcium content — more than any other cereal grain. Highly recommended for children, elderly, and pregnant women. Ideal for making rotis, porridge, dosas, and healthy cookies.",
    benefits: [
      "Calcium King",
      "Bone Density",
      "Gluten Free",
      "Natural Cooling",
    ],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.8,
    reviews: 167,
    limited: false,
    featured: false,
  },
];

export const featuredProducts: Product[] = products.filter(
  (p) => p.featured === true
);

export const categories: Category[] = [
  { id: "all", label: "All Products", emoji: "🌿" },
  { id: "honey", label: "Honey", emoji: "🍯" },
  { id: "millets", label: "Millets", emoji: "🌾" },
  { id: "jaggery", label: "Jaggery", emoji: "🟫" },
  { id: "pulses", label: "Pulses", emoji: "🫘" },
  { id: "grains", label: "Grains", emoji: "🌾" },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "PS",
    rating: 5,
    review:
      "The Himalayan Honey is absolutely pure and delicious. You can taste the difference from store-bought honey immediately. My whole family loves it!",
    product: "Himalayan Wild Honey",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    avatar: "RV",
    rating: 5,
    review:
      "Switched to Vedyara's Jaggery Powder instead of sugar. Amazing taste in chai, and I feel genuinely healthier. Will keep ordering!",
    product: "Organic Jaggery Powder",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Ahmedabad",
    avatar: "AP",
    rating: 5,
    review:
      "The millet range is incredible. Foxtail millet has become our family's staple grain. Packaging is premium and the quality is consistently excellent.",
    product: "Foxtail Millet",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Deepak Nair",
    location: "Bangalore",
    avatar: "DN",
    rating: 4,
    review:
      "Really happy with the Ragi flour quality. My kids love the ragi dosas I make. Vedyara Organic has earned a permanent spot in my kitchen.",
    product: "Finger Millet (Ragi)",
    date: "1 week ago",
  },
];

export const whyChooseUs = [
  {
    id: 1,
    icon: "🌿",
    title: "100% Organic",
    description:
      "Certified organic produce grown without synthetic pesticides or fertilizers. Pure from seed to shelf.",
  },
  {
    id: 2,
    icon: "🚫",
    title: "No Chemicals",
    description:
      "Zero artificial preservatives, colours, or additives. What you see is exactly what nature intended.",
  },
  {
    id: 3,
    icon: "🌾",
    title: "Farm Sourced",
    description:
      "Direct partnerships with small-scale organic farmers across India. Fresh, traceable, transparent.",
  },
  {
    id: 4,
    icon: "🔬",
    title: "Lab Tested",
    description:
      "Every batch tested for purity, quality and safety in certified laboratories before reaching you.",
  },
];

export const stats = [
  { id: 1, value: "10,000+", label: "Happy Customers" },
  { id: 2, value: "100%", label: "Organic Certified" },
  { id: 3, value: "50+", label: "Product Variants" },
  { id: 4, value: "5★", label: "Avg. Amazon Rating" },
];
