import Honey from '../assets/image-1.jpg'
import Haldi from '../assets/haldi.jpeg'
import Dhaniya from '../assets/dhaniya.jpeg'
import Gud from '../assets/gud.jpeg'

export type Product = {
  id: string | number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  image: string;
  images?: string[];
  description: string;
  shortDesc: string;
  benefits: string[];
  weight: string;
  amazonLink: string;
  rating: number;
  reviews: number;
  limited?: boolean;
  featured?: boolean;
};

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const products: Product[] = [
  {
    id: 3,
    name: "Pure Natural Honey",
    category: "honey",
    price: "₹699",
    originalPrice: "₹1799",
    badge: "Best Seller",
    image: Honey,
    images: [Honey, Haldi, Dhaniya], // Mock images
    shortDesc: "Raw, unprocessed honey from pristine Himalayan forests",
    description:
      "Our Pure Natural Honey is sourced directly from the Farm, where bees feed on flowers blooming at high altitudes. Completely raw and unprocessed, it retains all its natural enzymes, antioxidants, and healing properties. Cold-extracted without any heat treatment to preserve full nutritional value.",
    benefits: [
      "Boosts Immunity",
      "Rich in Antioxidants",
      "Natural Energy",
      "Aids Digestion",
    ],
    weight: "1Kg",
    amazonLink: "https://www.amazon.in",
    rating: 0,
    reviews: 0,
    limited: false,
    featured: true,
  },

  {
    id: 4,
    name: "Natural Jaggery Powder (Gud)",
    category: "jaggery",
    price: "₹149",
    originalPrice: "₹179",
    badge: "Natural",
    image: Gud,
    images: [Gud, Haldi, Honey], // Mock images
    shortDesc: "Chemical-free jaggery powder made from pure sugarcane juice",
    description:
      "Our Natural Jaggery Powder (Gud) is made using traditional methods without any chemicals or bleaching. Rich in iron and minerals, it helps improve digestion, boosts energy naturally, and is a healthier alternative to refined sugar.",
    benefits: ["Iron Rich", "Natural Sweetener", "Chemical Free", "Energy Boost"],
    weight: "1kg",
    amazonLink: "https://www.amazon.in",
    rating: 4.7,
    reviews: 120,
    limited: false,
    featured: true,
  },
  {
    id: 5,
    name: "Natural Coriander Powder (Dhaniya)",
    category: "spices",
    price: "₹99",
    originalPrice: "₹129",
    badge: "Fresh",
    image: Dhaniya,
    images: [Dhaniya, Haldi, Gud], // Mock images
    shortDesc: "Aromatic coriander powder made from premium quality seeds",
    description:
      "Our Natural Coriander Powder (Dhaniya) is made from carefully selected seeds and ground to preserve its natural aroma and flavor. It aids digestion, supports metabolism, and enhances the taste of every dish.",
    benefits: ["Aromatic", "Digestive Aid", "Rich Flavor", "Pure & Fresh"],
    weight: "200g",
    amazonLink: "https://www.amazon.in",
    rating: 4.5,
    reviews: 98,
    limited: false,
    featured: true,
  },
  {
    id: 6,
    name: "Natural Turmeric Powder (Haldi)",
    category: "spices",
    price: "₹129",
    originalPrice: "₹159",
    badge: "Bestseller",
    image: Haldi,
    images: [Haldi, Dhaniya, Honey], // Mock images
    shortDesc: "High curcumin turmeric powder for immunity and wellness",
    description:
      "Our Natural Turmeric Powder (Haldi) is sourced from trusted farms and processed to retain high curcumin content. Known for its anti-inflammatory and immunity-boosting properties, it is a staple for both cooking and health.",
    benefits: ["High Curcumin", "Immunity Boost", "Anti-inflammatory", "Pure & Natural"],
    weight: "200g",
    amazonLink: "https://www.amazon.in",
    rating: 4.8,
    reviews: 210,
    limited: false,
    featured: true,
  },
  {
    id: 1,
    name: "Pure Natural Honey",
    category: "honey",
    price: "₹449",
    originalPrice: "₹899",
    badge: "Best Seller",
    image: Honey,
    images: [Honey, Haldi, Dhaniya], // Mock images
    shortDesc: "Raw, unprocessed honey from pristine Himalayan forests",
    description:
      "Our Pure Natural Honey is sourced directly from the Farm, where bees feed on flowers blooming at high altitudes. Completely raw and unprocessed, it retains all its natural enzymes, antioxidants, and healing properties. Cold-extracted without any heat treatment to preserve full nutritional value.",
    benefits: [
      "Boosts Immunity",
      "Rich in Antioxidants",
      "Natural Energy",
      "Aids Digestion",
    ],
    weight: "500g",
    amazonLink: "https://www.amazon.in",
    rating: 0,
    reviews: 0,
    limited: false,
    featured: true,
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
    product: "Natural Jaggery Powder",
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
      "Really happy with the Ragi flour quality. My kids love the ragi dosas I make. Vedyara has earned a permanent spot in my kitchen.",
    product: "Finger Millet (Ragi)",
    date: "1 week ago",
  },
];

export const whyChooseUs = [
  {
    id: 1,
    icon: "🌿",
    title: "100% Natural",
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
  { id: 1, value: "1000+", label: "Happy Customers" },
  { id: 2, value: "100%", label: "Natural" },
  { id: 3, value: "5+", label: "Product Variants" },
  { id: 4, value: "4+", label: "Service Years" },
];
