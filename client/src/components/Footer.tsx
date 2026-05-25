// T&J Fashion — Footer
// Design: Industrial Brutalism × Motorsport Livery

import { Link } from "wouter";
import { Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const collections = [
  { href: "/collections/jdm", label: "JDM" },
  { href: "/collections/f1", label: "Formula 1" },
  { href: "/collections/american-muscle", label: "American Muscle" },
  { href: "/collections/supercars", label: "Supercars & Hypercars" },
  { href: "/collections/ev-tesla", label: "EV & Tesla" },
  { href: "/collections/china-vehicles", label: "China Vehicles" },
  { href: "/collections/shitboxes", label: "Shitboxes" },
  { href: "/collections/muscle-cars", label: "Muscle Cars" },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter / X" },
  { icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.06 0.005 285)", borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
      {/* Racing stripe */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #E8FF00 0%, #E8FF00 65%, #FF2D00 65%, #FF2D00 100%)" }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: "#E8FF00",
                    color: "#0a0a0a",
                    fontFamily: "'Bebas Neue', sans-serif",
                    clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                  }}
                >
                  T&J
                </div>
                <span
                  className="text-2xl text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  T&amp;J Fashion
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}>
              Car culture clothing for the passionate. From JDM legends to hypercar dreams — wear what you love.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => toast.info(`${label} coming soon!`)}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "oklch(0.15 0.005 285)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.65 0.008 285)",
                    borderRadius: "2px",
                  }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-lg mb-5 tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00" }}
            >
              Collections
            </h4>
            <ul className="space-y-2">
              {collections.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>
                    <span
                      className="text-sm transition-colors duration-150 hover:text-[#E8FF00]"
                      style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                    >
                      {c.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="text-lg mb-5 tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00" }}
            >
              Info
            </h4>
            <ul className="space-y-2">
              {["About Us", "Size Guide", "Shipping Policy", "Returns & Exchanges", "FAQ", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => toast.info("Page coming soon!")}
                    className="text-sm transition-colors duration-150 hover:text-[#E8FF00] text-left"
                    style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-lg mb-5 tracking-widest"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00" }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "#FF2D00" }} />
                <span className="text-sm" style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}>
                  hello@tjfashion.com
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#FF2D00" }} />
                <span className="text-sm" style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif" }}>
                  Worldwide Shipping<br />Est. 2024
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs mb-3 tracking-widest uppercase" style={{ color: "oklch(0.45 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>
                Newsletter
              </p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm outline-none"
                  style={{
                    background: "oklch(0.12 0.005 285)",
                    border: "1px solid oklch(1 0 0 / 12%)",
                    borderRight: "none",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: "2px 0 0 2px",
                  }}
                />
                <button
                  onClick={() => toast.success("Subscribed! Welcome to the grid.")}
                  className="px-4 py-2 text-xs font-bold tracking-widest transition-all duration-150 active:scale-95"
                  style={{
                    background: "#E8FF00",
                    color: "#0a0a0a",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    borderRadius: "0 2px 2px 0",
                  }}
                >
                  JOIN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.38 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
            © 2024 T&amp;J Fashion. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.38 0.008 285)", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
            BUILT FOR CAR CULTURE — WORN BY ENTHUSIASTS
          </p>
        </div>
      </div>
    </footer>
  );
}
