// T&J Fashion — Shared Data
// Design: Industrial Brutalism × Motorsport Livery

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  textColor: string;
  image: string;
  badge: string;
  items: number;
  featured?: boolean;
}

export interface Product {
  id: string;
  collection: string;
  name: string;
  price: number;
  type: string;
  tag?: string;
  image: string;
}

export const collections: Collection[] = [
  {
    slug: "jdm",
    name: "JDM",
    tagline: "Japanese Domestic Market",
    description: "Inspired by the underground street racing culture of Japan. Sakura meets turbo — wearable art for those who know what VTEC, RB26, and 2JZ mean.",
    accentColor: "#FF2D00",
    textColor: "#ffffff",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663693774532/gFLJ3dUxrE83puRucwLazn/collection-jdm-bLNGhwJEFUtbYfs94fuyZL.webp",
    badge: "日本車",
    items: 18,
    featured: true,
  },
  {
    slug: "f1",
    name: "Formula 1",
    tagline: "The Pinnacle of Motorsport",
    description: "Pit lane precision meets street style. Race-inspired graphics, carbon fiber aesthetics, and sponsor-patch detailing for the fastest sport on earth.",
    accentColor: "#E8FF00",
    textColor: "#0a0a0a",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663693774532/gFLJ3dUxrE83puRucwLazn/collection-f1-W3RDuZxaEMJAj7iC6We2y2.webp",
    badge: "F1",
    items: 14,
    featured: true,
  },
  {
    slug: "american-muscle",
    name: "American Muscle",
    tagline: "Born in the USA",
    description: "V8 thunder, chrome bumpers, and wide-open highways. Clothing that roars as loud as a 426 Hemi at full throttle.",
    accentColor: "#FF2D00",
    textColor: "#ffffff",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663693774532/gFLJ3dUxrE83puRucwLazn/collection-muscle-W3RRkNNWJMTUWMLosu8h5o.webp",
    badge: "USA",
    items: 16,
    featured: true,
  },
  {
    slug: "supercars",
    name: "Supercars & Hypercars",
    tagline: "Beyond Limits",
    description: "For those who dream in Lamborghini yellow and Ferrari red. Angular, aggressive, and unapologetically fast — just like the machines that inspire them.",
    accentColor: "#E8FF00",
    textColor: "#0a0a0a",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663693774532/gFLJ3dUxrE83puRucwLazn/collection-supercar-he655dAH8xWgtmhDSaCmqj.webp",
    badge: "HYPER",
    items: 12,
    featured: true,
  },
  {
    slug: "ev-tesla",
    name: "EV & Tesla",
    tagline: "Electric Revolution",
    description: "The future is silent, fast, and sustainable. Clean lines, minimalist graphics, and tech-forward design for the new generation of car culture.",
    accentColor: "#00C2FF",
    textColor: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    badge: "⚡ EV",
    items: 10,
  },
  {
    slug: "china-vehicles",
    name: "China Vehicles",
    tagline: "Rising Dragon",
    description: "BYD, NIO, Li Auto — China's automotive revolution is here. Bold, futuristic designs celebrating the new wave of Chinese engineering excellence.",
    accentColor: "#FF2D00",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: "中国",
    items: 8,
  },
  {
    slug: "shitboxes",
    name: "Shitboxes",
    tagline: "Every Car Has a Soul",
    description: "The beaters, the clunkers, the rust buckets — the cars we actually drove. A love letter to the 200k-mile Honda Civics and duct-taped bumpers that started it all.",
    accentColor: "#8B7355",
    textColor: "#ffffff",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    badge: "BEATER",
    items: 11,
  },
  {
    slug: "muscle-cars",
    name: "Muscle Cars",
    tagline: "Raw Power, Pure Style",
    description: "Not just American — the global muscle car movement. From Pontiac GTO to Ford Falcon, celebrating brute force and straight-line dominance.",
    accentColor: "#FF8C00",
    textColor: "#0a0a0a",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    badge: "MUSCLE",
    items: 13,
  },
];

export const featuredProducts: Product[] = [
  {
    id: "p1",
    collection: "jdm",
    name: "Skyline GT-R Oversized Hoodie",
    price: 89,
    type: "Hoodie",
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    id: "p2",
    collection: "f1",
    name: "Pit Lane Racing Jacket",
    price: 149,
    type: "Jacket",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: "p3",
    collection: "american-muscle",
    name: "Challenger R/T Graphic Tee",
    price: 45,
    type: "T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: "p4",
    collection: "supercars",
    name: "Lamborghini Angles Tee",
    price: 55,
    type: "T-Shirt",
    tag: "LIMITED",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  },
  {
    id: "p5",
    collection: "jdm",
    name: "Touge Nights Track Jacket",
    price: 125,
    type: "Jacket",
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
  },
  {
    id: "p6",
    collection: "ev-tesla",
    name: "Silent Speed Crewneck",
    price: 75,
    type: "Sweatshirt",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
];

export const stats = [
  { value: "8+", label: "Collections" },
  { value: "100+", label: "Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "30+", label: "Countries Shipped" },
];
