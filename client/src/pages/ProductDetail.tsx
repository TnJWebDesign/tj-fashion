import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const { data: product, isLoading } = trpc.products.bySlug.useQuery(
    { slug: params?.slug || "" },
    { enabled: !!params?.slug }
  );

  const addToCartMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      toast.success("Added to cart! 🛒");
      setSelectedSize("");
      setQuantity(1);
      setIsAdding(false);
    },
    onError: () => {
      toast.error("Failed to add to cart");
      setIsAdding(false);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="container py-20 text-center" style={{ color: "#E8FF00" }}>
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="container py-20 text-center" style={{ color: "#E8FF00" }}>
          Product not found
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    setIsAdding(true);
    await addToCartMutation.mutateAsync({
      productId: product.id,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      <div className="container py-12">
        <button
          onClick={() => setLocation("/collections")}
          className="flex items-center gap-2 mb-8 text-sm tracking-widest uppercase transition-colors hover:text-[#E8FF00]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            color: "oklch(0.55 0.008 285)",
          }}
        >
          <ChevronLeft size={16} /> Back to Collections
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div
              className="relative overflow-hidden mb-4"
              style={{ borderRadius: "2px", aspectRatio: "1" }}
            >
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-widest"
                  style={{
                    background: product.tag === "NEW" ? "#E8FF00" : "#FF2D00",
                    color: product.tag === "NEW" ? "#0A0A0A" : "#fff",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    borderRadius: "2px",
                  }}
                >
                  {product.tag}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 mb-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className="relative overflow-hidden transition-all"
                    style={{
                      borderRadius: "2px",
                      width: "80px",
                      height: "80px",
                      border: idx === currentImageIndex ? "2px solid #E8FF00" : "1px solid oklch(1 0 0 / 20%)",
                    }}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Image Navigation */}
            {images.length > 1 && (
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentImageIndex((idx) => (idx === 0 ? images.length - 1 : idx - 1))
                  }
                  className="p-2 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  <ChevronLeft size={20} color="#E8FF00" />
                </button>
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {currentImageIndex + 1} / {images.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentImageIndex((idx) => (idx === images.length - 1 ? 0 : idx + 1))
                  }
                  className="p-2 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  <ChevronRight size={20} color="#E8FF00" />
                </button>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#FF2D00" }}
            >
              — {product.collection}
            </p>

            <h1
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              {product.name}
            </h1>

            <p
              className="text-3xl mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
            >
              ${parseFloat(product.price).toFixed(2)}
            </p>

            {product.description && (
              <p
                className="mb-8 leading-relaxed"
                style={{ color: "oklch(0.75 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <p
                className="text-sm tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff" }}
              >
                Size
              </p>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="py-3 text-sm font-bold tracking-widest uppercase transition-all duration-150"
                    style={{
                      background: selectedSize === size ? "#E8FF00" : "oklch(0.1 0.005 285)",
                      color: selectedSize === size ? "#0A0A0A" : "#fff",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      borderRadius: "2px",
                      border: "1px solid" + (selectedSize === size ? " #E8FF00" : " oklch(1 0 0 / 20%)"),
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p
                className="text-sm tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#fff" }}
              >
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: "2px", border: "1px solid oklch(1 0 0 / 20%)" }}
                >
                  −
                </button>
                <span className="text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-white/10 transition-colors"
                  style={{ borderRadius: "2px", border: "1px solid oklch(1 0 0 / 20%)" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97]"
              style={{
                background: "#E8FF00",
                color: "#0A0A0A",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.15em",
                borderRadius: "2px",
              }}
            >
              <ShoppingCart size={16} className="mr-2" />
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>

            {/* Stock Info */}
            <p
              className="text-xs mt-4 text-center"
              style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
