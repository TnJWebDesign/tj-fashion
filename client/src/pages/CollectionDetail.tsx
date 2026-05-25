// T&J Fashion — Collection Detail Page
// Design: Industrial Brutalism × Motorsport Livery

import { useRef } from "react";
import { Link, useParams } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collections, featuredProducts } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Mock products for each collection
const PRODUCT_TYPES = ["Hoodie", "T-Shirt", "Jacket", "Sweatshirt", "Cap", "Tote Bag"];
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
];
const TAGS = ["NEW", "BESTSELLER", "LIMITED", undefined, undefined, undefined];

function generateProducts(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${slug}-${i}`,
    name: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} ${PRODUCT_TYPES[i % PRODUCT_TYPES.length]}`,
    price: [39, 45, 55, 75, 89, 99, 125, 149][i % 8],
    type: PRODUCT_TYPES[i % PRODUCT_TYPES.length],
    tag: TAGS[i % TAGS.length],
    image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
  }));
}

export default function CollectionDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="text-center">
          <h1 className="text-6xl text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Collection Not Found
          </h1>
          <Link href="/collections">
            <button
              className="px-6 py-3 text-sm font-bold tracking-widest uppercase"
              style={{ background: "#E8FF00", color: "#0A0A0A", fontFamily: "'Barlow Condensed', sans-serif", borderRadius: "2px" }}
            >
              Back to Collections
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const products = generateProducts(slug, collection.items);
  const otherCollections = collections.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-20 overflow-hidden" style={{ height: "500px" }}>
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, oklch(0.06 0.005 285 / 95%) 0%, oklch(0.06 0.005 285 / 60%) 60%, oklch(0.06 0.005 285 / 30%) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
        />

        <div className="container relative z-10 h-full flex flex-col justify-end pb-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-4"
          >
            <Link href="/collections">
              <span
                className="flex items-center gap-1 text-xs tracking-widest uppercase hover:text-[#E8FF00] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.5 0.008 285)" }}
              >
                <ArrowLeft size={12} /> Collections
              </span>
            </Link>
            <span style={{ color: "oklch(0.35 0.008 285)" }}>/</span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.5 0.008 285)" }}
            >
              {collection.name}
            </span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex mb-3"
          >
            <span
              className="px-3 py-1 text-xs font-bold tracking-widest"
              style={{
                background: collection.accentColor,
                color: collection.textColor,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                borderRadius: "2px",
              }}
            >
              {collection.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] leading-none text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
          >
            {collection.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base max-w-xl"
            style={{ color: "oklch(0.65 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {collection.description}
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container">
          {/* Sort/filter bar */}
          <FadeUp>
            <div
              className="flex items-center justify-between mb-10 pb-5"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.45 0.008 285)" }}
              >
                {collection.items} Products
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.45 0.008 285)" }}
                >
                  Sort:
                </span>
                <select
                  className="text-xs bg-transparent border-none outline-none tracking-widest uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "#E8FF00" }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </FadeUp>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.05}>
                <DetailProductCard product={product} accentColor={collection.accentColor} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="py-20" style={{ background: "oklch(0.1 0.005 285)" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-10">
              <h2
                className="text-4xl text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
              >
                More Collections
              </h2>
              <Link href="/collections">
                <span
                  className="flex items-center gap-1 text-xs tracking-widest uppercase hover:text-[#E8FF00] transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
                >
                  View All <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherCollections.map((col, i) => (
              <FadeUp key={col.slug} delay={i * 0.1}>
                <Link href={`/collections/${col.slug}`}>
                  <div
                    className="relative overflow-hidden group cursor-pointer"
                    style={{ borderRadius: "2px", height: "240px" }}
                  >
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, oklch(0.06 0.005 285 / 90%) 0%, transparent 60%)" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3
                        className="text-2xl text-white"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
                      >
                        {col.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function DetailProductCard({ product, accentColor }: { product: ReturnType<typeof generateProducts>[0]; accentColor: string }) {
  return (
    <div
      className="group cursor-pointer"
      onClick={() => toast.info("Product page coming soon!", { icon: "👕" })}
    >
      <div
        className="relative overflow-hidden mb-3"
        style={{ borderRadius: "2px", aspectRatio: "3/4" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.tag && (
          <div
            className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-widest"
            style={{
              background: product.tag === "NEW" ? "#E8FF00" : product.tag === "LIMITED" ? "#FF2D00" : "oklch(0.35 0.008 285)",
              color: product.tag === "NEW" ? "#0A0A0A" : "#fff",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.1em",
              borderRadius: "2px",
            }}
          >
            {product.tag}
          </div>
        )}
        {/* Add to cart overlay */}
        <div
          className="absolute inset-x-0 bottom-0 py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-200"
          style={{
            background: accentColor,
            color: accentColor === "#E8FF00" ? "#0A0A0A" : "#fff",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          <ShoppingBag size={12} /> Add to Cart
        </div>
      </div>
      <div>
        <p
          className="text-[10px] tracking-widest uppercase mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "#FF2D00" }}
        >
          {product.type}
        </p>
        <h4
          className="text-sm mb-1 leading-tight"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#fff" }}
        >
          {product.name}
        </h4>
        <div className="flex items-center justify-between">
          <p
            className="text-base"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
          >
            ${product.price}
          </p>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={9} fill="#E8FF00" color="#E8FF00" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
