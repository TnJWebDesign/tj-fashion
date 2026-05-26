import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const { data: cartItems = [] } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const createCheckoutMutation = trpc.checkout.create.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
    onError: (error) => {
      toast.error("Failed to create checkout session");
      setIsProcessing(false);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="container py-20 text-center">
          <p style={{ color: "#E8FF00", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem" }}>
            Please log in to checkout
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
        <Navbar />
        <div className="container py-20 text-center">
          <p style={{ color: "#E8FF00", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem" }}>
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
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price ? parseFloat(item.product.price) : 0;
    return sum + price * item.quantity;
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error("Please fill in all shipping details");
      return;
    }

    setIsProcessing(true);
    await createCheckoutMutation.mutateAsync({
      shippingDetails: formData,
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A" }}>
      <Navbar />

      <div className="flex-1 container py-12">
        <button
          onClick={() => setLocation("/cart")}
          className="flex items-center gap-2 mb-8 text-sm tracking-widest uppercase transition-colors hover:text-[#E8FF00]"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            color: "oklch(0.55 0.008 285)",
          }}
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <h1
          className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Details */}
              <div
                className="p-6 mb-8"
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
                  Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-3 text-sm outline-none mb-4"
                  style={{
                    background: "oklch(0.08 0.005 285)",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: "2px",
                    border: "1px solid oklch(1 0 0 / 20%)",
                    opacity: 0.6,
                  }}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-sm outline-none mb-4"
                  style={{
                    background: "oklch(0.08 0.005 285)",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: "2px",
                    border: "1px solid oklch(1 0 0 / 20%)",
                  }}
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 text-sm outline-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                      border: "1px solid oklch(1 0 0 / 20%)",
                    }}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 text-sm font-bold tracking-widest uppercase"
                style={{
                  background: "#E8FF00",
                  color: "#0A0A0A",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader size={16} className="mr-2 animate-spin inline" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </form>
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
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm" style={{ color: "oklch(0.55 0.008 285)" }}>
                  <span>
                    {item.product?.name} ({item.size}) x {item.quantity}
                  </span>
                  <span>${(parseFloat(item.product?.price || "0") * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid oklch(1 0 0 / 20%)" }}>
              <div className="flex justify-between" style={{ color: "oklch(0.55 0.008 285)" }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ color: "oklch(0.55 0.008 285)" }}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between" style={{ color: "oklch(0.55 0.008 285)" }}>
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem" }}>
              <span>Total</span>
              <span style={{ color: "#E8FF00" }}>${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
