// T&J Fashion — 404 Page
// Design: Industrial Brutalism × Motorsport Livery

import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0A0A" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="text-[clamp(6rem,20vw,16rem)] leading-none mb-0"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.02em", opacity: 0.15 }}
            >
              404
            </div>
            <div className="stripe-divider w-16 mx-auto mb-6" />
            <h1
              className="text-[clamp(2rem,6vw,4rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              Off the Track
            </h1>
            <p
              className="text-base mb-8 max-w-sm mx-auto"
              style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Looks like you've taken a wrong turn. This page doesn't exist — but our collections do.
            </p>
            <Link href="/">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:brightness-110"
                style={{
                  background: "#E8FF00",
                  color: "#0A0A0A",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                <ArrowLeft size={14} />
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
