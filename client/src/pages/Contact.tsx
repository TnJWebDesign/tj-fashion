// T&J Fashion — Contact Page
// Design: Industrial Brutalism × Motorsport Livery

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MessageSquare, Clock, Send, Instagram, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const topics = [
  "Order Inquiry",
  "Product Question",
  "Wholesale / Bulk Order",
  "Collaboration / Partnership",
  "Press / Media",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success("Message sent! We'll get back to you within 24 hours. 🏁");
    setForm({ name: "", email: "", topic: "", message: "" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, #fff 40px, #fff 41px)" }}
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
              — Get in Touch
            </p>
            <h1
              className="text-[clamp(3.5rem,10vw,8rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              Contact Us
            </h1>
            <div className="stripe-divider w-24 mb-6" />
            <p
              className="text-lg max-w-xl"
              style={{ color: "oklch(0.6 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Questions, collaborations, or just want to talk cars? We're here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info sidebar */}
            <FadeUp className="lg:col-span-1">
              <div className="space-y-6">
                {/* Info cards */}
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "hello@tjfashion.com",
                    sub: "We reply within 24 hours",
                  },
                  {
                    icon: MessageSquare,
                    title: "Social DMs",
                    value: "@tjfashion",
                    sub: "Instagram, Twitter, YouTube",
                  },
                  {
                    icon: Clock,
                    title: "Response Time",
                    value: "Within 24 hours",
                    sub: "Mon–Fri, 9am–6pm",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-5"
                    style={{
                      background: "oklch(0.12 0.005 285)",
                      border: "1px solid oklch(1 0 0 / 8%)",
                      borderRadius: "2px",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{ background: "oklch(0.94 0.22 103 / 12%)", borderRadius: "2px" }}
                      >
                        <item.icon size={16} color="#E8FF00" />
                      </div>
                      <div>
                        <p
                          className="text-xs tracking-widest uppercase mb-1"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.45 0.008 285)" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-sm font-medium text-white mb-0.5"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.value}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.5 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social links */}
                <div
                  className="p-5"
                  style={{
                    background: "oklch(0.12 0.005 285)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#E8FF00" }}
                  >
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {[Instagram, Twitter, Youtube].map((Icon, i) => (
                      <button
                        key={i}
                        onClick={() => toast.info("Social page coming soon!")}
                        className="w-10 h-10 flex items-center justify-center transition-all duration-150 hover:scale-110 hover:border-[#E8FF00]"
                        style={{
                          background: "oklch(0.16 0.005 285)",
                          border: "1px solid oklch(1 0 0 / 10%)",
                          color: "oklch(0.6 0.008 285)",
                          borderRadius: "2px",
                        }}
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Contact form */}
            <FadeUp delay={0.1} className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="p-8"
                style={{
                  background: "oklch(0.12 0.005 285)",
                  border: "1px solid oklch(1 0 0 / 8%)",
                  borderRadius: "2px",
                }}
              >
                <h2
                  className="text-3xl text-white mb-8"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  Send a Message
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 text-sm outline-none transition-colors duration-150"
                      style={{
                        background: "oklch(0.08 0.005 285)",
                        border: "1px solid oklch(1 0 0 / 12%)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        borderRadius: "2px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#E8FF00")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 text-sm outline-none transition-colors duration-150"
                      style={{
                        background: "oklch(0.08 0.005 285)",
                        border: "1px solid oklch(1 0 0 / 12%)",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        borderRadius: "2px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#E8FF00")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
                  >
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none transition-colors duration-150"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: form.topic ? "#fff" : "oklch(0.45 0.008 285)",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                    }}
                  >
                    <option value="">Select a topic</option>
                    {topics.map((t) => (
                      <option key={t} value={t} style={{ background: "#0A0A0A" }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-8">
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.5 0.008 285)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="w-full px-4 py-3 text-sm outline-none transition-colors duration-150 resize-none"
                    style={{
                      background: "oklch(0.08 0.005 285)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      borderRadius: "2px",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#E8FF00")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:brightness-110 disabled:opacity-60"
                  style={{
                    background: "#E8FF00",
                    color: "#0A0A0A",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    borderRadius: "2px",
                  }}
                >
                  {sending ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
