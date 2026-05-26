import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const COLLECTIONS = [
  { slug: "jdm", name: "JDM Legends", color: "#E8FF00" },
  { slug: "f1", name: "F1 Racing", color: "#FF2D00" },
  { slug: "muscle", name: "American Muscle", color: "#E8FF00" },
  { slug: "china", name: "China Vehicles", color: "#FF2D00" },
  { slug: "ev", name: "EVs & Tesla", color: "#E8FF00" },
  { slug: "supercar", name: "Supercars", color: "#FF2D00" },
  { slug: "hypercar", name: "Hypercars", color: "#E8FF00" },
  { slug: "shitbox", name: "Shitboxes", color: "#FF2D00" },
];

export default function Collections() {
  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data: products = [], isLoading } = trpc.products.list.useQuery({
    collection: selectedCollection,
    sortBy,
  });

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      <section className="py-24">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#FF2D00" }}
            >
              — Browse
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              All Collections
            </h1>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 mb-4 text-sm font-bold tracking-widest uppercase transition-colors hover:text-[#E8FF00]"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.55 0.008 285)",
              }}
            >
              Filters & Sorting
              <ChevronDown size={16} style={{ transform: showFilters ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </button>

            {showFilters && (
              <div
                className="p-6 mb-8"
                style={{
                  background: "oklch(0.1 0.005 285)",
                  borderRadius: "2px",
                  border: "1px solid oklch(1 0 0 / 10%)",
                }}
              >
                {/* Collection Filter */}
                <div className="mb-8">
                  <p
                    className="text-sm font-bold tracking-widest uppercase mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#fff" }}
                  >
                    Collection
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedCollection(undefined)}
                      className="py-2 px-3 text-xs font-bold tracking-widest uppercase transition-all"
                      style={{
                        background: selectedCollection === undefined ? "#E8FF00" : "oklch(0.15 0.005 285)",
                        color: selectedCollection === undefined ? "#0A0A0A" : "#fff",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        borderRadius: "2px",
                        border: "1px solid" + (selectedCollection === undefined ? " #E8FF00" : " oklch(1 0 0 / 20%)"),
                      }}
                    >
                      All
                    </button>
                    {COLLECTIONS.map((col) => (
                      <button
                        key={col.slug}
                        onClick={() => setSelectedCollection(col.slug)}
                        className="py-2 px-3 text-xs font-bold tracking-widest uppercase transition-all"
                        style={{
                          background: selectedCollection === col.slug ? col.color : "oklch(0.15 0.005 285)",
                          color: selectedCollection === col.slug ? "#0A0A0A" : "#fff",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          borderRadius: "2px",
                          border: "1px solid" + (selectedCollection === col.slug ? ` ${col.color}` : " oklch(1 0 0 / 20%)"),
                        }}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <p
                    className="text-sm font-bold tracking-widest uppercase mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#fff" }}
                  >
                    Sort By
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "newest", label: "Newest" },
                      { value: "price-asc", label: "Price: Low to High" },
                      { value: "price-desc", label: "Price: High to Low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className="py-2 px-3 text-xs font-bold tracking-widest uppercase transition-all"
                        style={{
                          background: sortBy === option.value ? "#E8FF00" : "oklch(0.15 0.005 285)",
                          color: sortBy === option.value ? "#0A0A0A" : "#fff",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          borderRadius: "2px",
                          border: "1px solid" + (sortBy === option.value ? " #E8FF00" : " oklch(1 0 0 / 20%)"),
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div style={{ color: "#E8FF00", textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div style={{ color: "oklch(0.55 0.008 285)", textAlign: "center", padding: "40px 0", fontFamily: "'DM Sans', sans-serif" }}>
              No products found in this collection
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="group cursor-pointer">
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
                      <div
                        className="absolute inset-x-0 bottom-0 py-2 text-center text-xs font-bold tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-200"
                        style={{
                          background: "#E8FF00",
                          color: "#0A0A0A",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                        }}
                      >
                        View
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-[10px] tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "#FF2D00" }}
                      >
                        {product.collection}
                      </p>
                      <h4
                        className="text-sm mb-1 leading-tight line-clamp-2"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: "#fff" }}
                      >
                        {product.name}
                      </h4>
                      <p
                        className="text-base"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
                      >
                        ${parseFloat(product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
