// T&J Fashion — Navbar
// Design: Industrial Brutalism × Motorsport Livery
// Dark carbon bg, yellow accent, Bebas Neue brand name, Barlow Condensed nav links

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(0.08 0.005 285 / 96%)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
        }}
      >
        {/* Racing stripe top bar */}
        <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #E8FF00 0%, #E8FF00 65%, #FF2D00 65%, #FF2D00 100%)" }} />

        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 group">
                <div
                  className="w-9 h-9 flex items-center justify-center text-xs font-bold transition-all duration-200 group-hover:scale-105"
                  style={{
                    background: "#E8FF00",
                    color: "#0a0a0a",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                  }}
                >
                  T&J
                </div>
                <span
                  className="text-2xl md:text-3xl tracking-wider text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  T&amp;J Fashion
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="relative text-sm tracking-widest uppercase transition-colors duration-200"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600,
                      color: location === link.href ? "#E8FF00" : "oklch(0.75 0.008 285)",
                    }}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px]"
                        style={{ background: "#E8FF00" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toast.info("Cart coming soon — stay tuned!", { icon: "🛒" })}
                className="relative p-2 text-white/70 hover:text-[#E8FF00] transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                <span
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] flex items-center justify-center font-bold"
                  style={{ background: "#FF2D00", color: "#fff", borderRadius: "2px", fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  0
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-white/70 hover:text-[#E8FF00] transition-colors duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24"
            style={{ background: "oklch(0.08 0.005 285 / 98%)", backdropFilter: "blur(16px)" }}
          >
            {/* Racing stripe */}
            <div className="h-[3px] w-full mx-auto max-w-xs" style={{ background: "linear-gradient(90deg, #E8FF00 60%, #FF2D00 60%)" }} />

            <nav className="flex flex-col items-center gap-2 pt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link href={link.href}>
                    <span
                      className="block text-5xl tracking-widest py-3 transition-colors duration-150"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: location === link.href ? "#E8FF00" : "#ffffff",
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom flag icon */}
            <div className="mt-auto pb-16 flex justify-center opacity-20">
              <Flag size={32} color="#E8FF00" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
