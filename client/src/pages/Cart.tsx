import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Cart() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { data: cartItems = [], refetch } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const removeFromCartMutation = trpc.cart.remove.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Item removed from cart");
    },
  });

  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="container py-20 text-center">
          <p style={{ color: "#E8FF00", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem" }}>
            Please log in to view your cart
          </p>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price ? parseFloat(item.product.price) : 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A" }}>
      <Navbar />

      <div className="flex-1 container py-12">
        <button
          onClick={() => setLocation("/collections")}
          className="flex items-center gap-2 mb-8 text-sm tracking-widest uppercase transition-colors hover:text-[#E8FF00]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            color: "oklch(0.55 0.008 285)",
          }}
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>

        <h1
          className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
        >
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p
              style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem" }}
            >
              Your cart is empty
            </p>
            <Button
              onClick={() => setLocation("/collections")}
              className="mt-6"
              style={{
                background: "#E8FF00",
                color: "#0A0A0A",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
              }}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4"
                    style={{
                      background: "oklch(0.1 0.005 285)",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 10%)",
                    }}
                  >
                    {/* Product Image */}
                    <div style={{ width: "120px", height: "120px", borderRadius: "2px", overflow: "hidden" }}>
                      <img
                        src={item.product?.image || ""}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3
                        className="text-lg mb-1"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", letterSpacing: "0.02em" }}
                      >
                        {item.product?.name}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Size: <span style={{ color: "#E8FF00", fontWeight: 600 }}>{item.size}</span>
                      </p>
                      <p
                        className="text-lg"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
                      >
                        ${parseFloat(item.product?.price || "0").toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCartMutation.mutate({ cartItemId: item.id })}
                        className="p-2 hover:bg-red-500/20 transition-colors"
                        style={{ borderRadius: "2px" }}
                      >
                        <Trash2 size={18} color="#FF2D00" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantityMutation.mutate({
                              cartItemId: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                          className="px-2 py-1 hover:bg-white/10 transition-colors"
                          style={{ borderRadius: "2px", border: "1px solid oklch(1 0 0 / 20%)" }}
                        >
                          −
                        </button>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", minWidth: "30px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantityMutation.mutate({
                              cartItemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="px-2 py-1 hover:bg-white/10 transition-colors"
                          style={{ borderRadius: "2px", border: "1px solid oklch(1 0 0 / 20%)" }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div
              className="p-6 h-fit"
              style={{
                background: "oklch(0.1 0.005 285)",
                borderRadius: "2px",
                border: "1px solid oklch(1 0 0 / 10%)",
              }}
            >
              <h2
                className="text-xl mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", letterSpacing: "0.02em" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid oklch(1 0 0 / 20%)" }}>
                <div className="flex justify-between" style={{ color: "oklch(0.55 0.008 285)" }}>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "oklch(0.55 0.008 285)" }}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem" }}>
                <span>Total</span>
                <span style={{ color: "#E8FF00" }}>${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={() => {
                  setIsCheckingOut(true);
                  setLocation("/checkout");
                }}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full py-3 text-sm font-bold tracking-widest uppercase"
                style={{
                  background: "#E8FF00",
                  color: "#0A0A0A",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                {isCheckingOut ? "Redirecting..." : "Proceed to Checkout"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
