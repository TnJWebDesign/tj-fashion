// T&J Fashion — Collections Page
// Design: Industrial Brutalism × Motorsport Livery

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { collections } from "@/lib/data";

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

export default function Collections() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        {/* Diagonal grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#FF2D00" }}
            >
              — T&amp;J Fashion
            </p>
            <h1
              className="text-[clamp(3.5rem,10vw,8rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              All Collections
            </h1>
            <div className="stripe-divider w-24 mb-6" />
            <p
              className="text-lg max-w-xl"
              style={{ color: "oklch(0.6 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Eight worlds of car culture. One brand. Find your tribe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections grid */}
      <section className="pb-32">
        <div className="container">
          {/* Filter bar */}
          <FadeUp>
            <div
              className="flex items-center gap-3 mb-10 pb-6"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 8%)" }}
            >
              <Filter size={14} style={{ color: "oklch(0.45 0.008 285)" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.45 0.008 285)" }}
              >
                {collections.length} Collections
              </span>
            </div>
          </FadeUp>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <FadeUp key={col.slug} delay={i * 0.07}>
                <CollectionFullCard collection={col} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CollectionFullCard({ collection: col }: { collection: (typeof collections)[0] }) {
  return (
    <Link href={`/collections/${col.slug}`}>
      <div
        className="group relative overflow-hidden cursor-pointer"
        style={{ borderRadius: "2px", border: "1px solid oklch(1 0 0 / 8%)" }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "360px" }}>
          <img
            src={col.image}
            alt={col.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, oklch(0.06 0.005 285 / 95%) 0%, oklch(0.06 0.005 285 / 20%) 60%, transparent 100%)" }}
          />
          {/* Badge */}
          <div
            className="absolute top-4 left-4 px-2.5 py-1 text-xs font-bold tracking-widest"
            style={{
              background: col.accentColor,
              color: col.textColor,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              borderRadius: "2px",
            }}
          >
            {col.badge}
          </div>
          {/* Items count */}
          <div
            className="absolute top-4 right-4 px-2 py-1 text-xs"
            style={{
              background: "oklch(0.08 0.005 285 / 80%)",
              color: "oklch(0.6 0.008 285)",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              border: "1px solid oklch(1 0 0 / 10%)",
              borderRadius: "2px",
            }}
          >
            {col.items} items
          </div>
        </div>

        {/* Info */}
        <div
          className="p-5"
          style={{ background: "oklch(0.1 0.005 285)" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-1 opacity-60"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "#fff" }}
          >
            {col.tagline}
          </p>
          <h3
            className="text-3xl text-white mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
          >
            {col.name}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            {col.description}
          </p>
          <div
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-bold transition-colors duration-150 group-hover:text-[#E8FF00]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
          >
            Shop Now <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-[2px] w-0 group-hover:w-full transition-all duration-300"
          style={{ background: col.accentColor }}
        />
      </div>
    </Link>
  );
}
