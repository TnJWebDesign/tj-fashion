// T&J Fashion — Home Page
// Design: Industrial Brutalism × Motorsport Livery
// Sections: Hero, Collections Grid, Featured Products, Stats, CTA

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Zap, Flag, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collections, featuredProducts, stats } from "@/lib/data";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663693774532/gFLJ3dUxrE83puRucwLazn/hero-main-S3rAeuWgdPGaGwKZfZrXX9.webp";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const collectionsRef = useRef<HTMLElement>(null);

  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const featuredCollections = collections.filter((c) => c.featured);
  const otherCollections = collections.filter((c) => !c.featured);

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="T&J Fashion hero"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, oklch(0.06 0.005 285 / 92%) 0%, oklch(0.06 0.005 285 / 70%) 50%, oklch(0.06 0.005 285 / 20%) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
          />
        </div>

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 w-[3px] h-full opacity-40"
          style={{ background: "linear-gradient(to bottom, #E8FF00, transparent)" }}
        />

        <div className="container relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5"
              style={{
                background: "oklch(0.94 0.22 103 / 12%)",
                border: "1px solid #E8FF00",
                borderRadius: "2px",
              }}
            >
              <Flag size={12} color="#E8FF00" />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#E8FF00" }}
              >
                Car Culture Clothing
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-[clamp(4rem,12vw,9rem)] leading-[0.9] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              WEAR THE
              <br />
              <span style={{ color: "#E8FF00" }}>DRIVE</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              style={{ color: "oklch(0.75 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Premium streetwear for car enthusiasts. From JDM legends to hypercar dreams — 8 collections, one obsession.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/collections">
                <button
                  className="flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:brightness-110"
                  style={{
                    background: "#E8FF00",
                    color: "#0A0A0A",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    borderRadius: "2px",
                  }}
                >
                  Shop Collections
                  <ArrowRight size={16} />
                </button>
              </Link>
              <button
                onClick={scrollToCollections}
                className="flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:border-[#E8FF00] hover:text-[#E8FF00]"
                style={{
                  background: "transparent",
                  color: "oklch(0.75 0.008 285)",
                  border: "1px solid oklch(1 0 0 / 25%)",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                Explore
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={scrollToCollections}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-[#E8FF00] transition-colors duration-200"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section style={{ background: "#E8FF00" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.08}>
                <div className="py-5 px-4 text-center">
                  <div
                    className="text-3xl md:text-4xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0A0A0A", letterSpacing: "0.03em" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.2 0.005 285)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ─────────────────────────────── */}
      <section ref={collectionsRef} className="py-24">
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#FF2D00" }}
                >
                  — Shop by Category
                </p>
                <h2
                  className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                >
                  Collections
                </h2>
              </div>
              <Link href="/collections">
                <span
                  className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-150 hover:text-[#E8FF00]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.55 0.008 285)" }}
                >
                  View All <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </FadeUp>

          {/* Featured 4 — asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {featuredCollections.map((col, i) => (
              <FadeUp key={col.slug} delay={i * 0.1} className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}>
                <CollectionCard collection={col} large={i === 0} />
              </FadeUp>
            ))}
          </div>

          {/* Other 4 — horizontal strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherCollections.map((col, i) => (
              <FadeUp key={col.slug} delay={i * 0.08}>
                <CollectionCardSmall collection={col} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-24" style={{ background: "oklch(0.1 0.005 285)" }}>
        <div className="container">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#E8FF00" }}
                >
                  — Top Picks
                </p>
                <h2
                  className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                >
                  Featured Gear
                </h2>
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND MANIFESTO ──────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, oklch(1 0 0 / 5%) 40px, oklch(1 0 0 / 5%) 41px)",
          }}
        />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <FadeUp>
            <div className="stripe-divider w-16 mx-auto mb-8" />
            <h2
              className="text-[clamp(3rem,8vw,7rem)] leading-none text-white mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              BUILT FOR THE
              <br />
              <span style={{ color: "#E8FF00" }}>PASSIONATE</span>
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 mx-auto max-w-2xl"
              style={{ color: "oklch(0.6 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Whether you're chasing touge runs at midnight, watching the lights go out at Monza, or just proud of your 300k-mile beater — T&amp;J Fashion is for you. Car culture isn't a hobby. It's a way of life.
            </p>
            <Link href="/about">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:bg-[#E8FF00] hover:text-[#0A0A0A]"
                style={{
                  background: "transparent",
                  color: "#E8FF00",
                  border: "1px solid #E8FF00",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                Our Story <ArrowRight size={14} />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────── */}
      <section className="py-20" style={{ background: "#E8FF00" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3
                className="text-[clamp(2rem,5vw,4rem)] leading-none mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0A0A0A", letterSpacing: "0.02em" }}
              >
                JOIN THE GRID
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.25 0.005 285)" }}
              >
                New drops, exclusive offers, and car culture content.
              </p>
            </div>
            <div className="flex gap-0 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 text-sm outline-none"
                style={{
                  background: "oklch(0.08 0.005 285)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: "2px 0 0 2px",
                  border: "none",
                }}
              />
              <button
                onClick={() => toast.success("You're on the grid! 🏁")}
                className="px-6 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:brightness-110"
                style={{
                  background: "#FF2D00",
                  color: "#fff",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "0 2px 2px 0",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────

function CollectionCard({ collection: col, large }: { collection: (typeof collections)[0]; large?: boolean }) {
  return (
    <Link href={`/collections/${col.slug}`}>
      <div
        className="relative overflow-hidden group cursor-pointer"
        style={{ borderRadius: "2px", height: large ? "420px" : "320px" }}
      >
        <img
          src={col.image}
          alt={col.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, oklch(0.06 0.005 285 / 95%) 0%, oklch(0.06 0.005 285 / 40%) 50%, transparent 100%)",
          }}
        />
        {/* Badge */}
        <div
          className="absolute top-4 left-4 px-2 py-1 text-xs font-bold tracking-widest"
          style={{
            background: col.accentColor,
            color: col.textColor,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.1em",
            borderRadius: "2px",
          }}
        >
          {col.badge}
        </div>
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p
            className="text-xs tracking-widest uppercase mb-1 opacity-70"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "#fff" }}
          >
            {col.tagline}
          </p>
          <h3
            className="text-3xl md:text-4xl text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            {col.name}
          </h3>
          <div className="flex items-center justify-between">
            <span
              className="text-xs tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.6 0.008 285)" }}
            >
              {col.items} items
            </span>
            <span
              className="flex items-center gap-1 text-xs tracking-widest uppercase transition-all duration-200 group-hover:gap-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#E8FF00" }}
            >
              Shop <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CollectionCardSmall({ collection: col }: { collection: (typeof collections)[0] }) {
  return (
    <Link href={`/collections/${col.slug}`}>
      <div
        className="relative overflow-hidden group cursor-pointer"
        style={{ borderRadius: "2px", height: "200px" }}
      >
        <img
          src={col.image}
          alt={col.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, oklch(0.06 0.005 285 / 90%) 0%, oklch(0.06 0.005 285 / 30%) 100%)" }}
        />
        <div
          className="absolute top-3 left-3 px-1.5 py-0.5 text-[10px] font-bold tracking-widest"
          style={{
            background: col.accentColor,
            color: col.textColor,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            borderRadius: "2px",
          }}
        >
          {col.badge}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3
            className="text-xl text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            {col.name}
          </h3>
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.55 0.008 285)" }}
          >
            {col.items} items
          </p>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
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
            className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold tracking-widest"
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
        {/* Quick add overlay */}
        <div
          className="absolute inset-x-0 bottom-0 py-3 text-center text-xs font-bold tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-200"
          style={{
            background: "#E8FF00",
            color: "#0A0A0A",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          Quick Add
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
        <p
          className="text-base"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
        >
          ${product.price}
        </p>
      </div>
    </div>
  );
}
