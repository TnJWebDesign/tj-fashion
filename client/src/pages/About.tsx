// T&J Fashion — About Page
// Design: Industrial Brutalism × Motorsport Livery

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Globe, Heart, Award } from "lucide-react";
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

const values = [
  {
    icon: Heart,
    title: "Passion First",
    text: "We're car people who make clothes. Every design starts with a genuine love for the machines that inspire them.",
  },
  {
    icon: Award,
    title: "Quality Always",
    text: "Premium fabrics, precise printing, and stitching that lasts. Your gear should be as reliable as a well-maintained engine.",
  },
  {
    icon: Globe,
    title: "Global Culture",
    text: "Car culture has no borders. From Tokyo drift spots to Nürburgring laps — we celebrate it all.",
  },
  {
    icon: Zap,
    title: "Always Evolving",
    text: "New drops every season. We follow the culture, not the calendar. Stay tuned.",
  },
];

const timeline = [
  { year: "2022", event: "T&J Fashion founded in a garage with a single JDM hoodie design." },
  { year: "2023", event: "Launched 4 collections. First 1,000 orders shipped worldwide." },
  { year: "2024", event: "Expanded to 8 collections. Partnered with car meets across 15 countries." },
  { year: "2025", event: "50,000+ customers. Still run by two people who love cars more than sleep." },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 40px, #fff 40px, #fff 41px)" }}
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
              — Our Story
            </p>
            <h1
              className="text-[clamp(3.5rem,10vw,8rem)] leading-none text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              About T&amp;J
            </h1>
            <div className="stripe-divider w-24 mb-6" />
          </motion.div>
        </div>
      </section>

      {/* Origin story */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <h2
                  className="text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-white mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
                >
                  STARTED IN A
                  <br />
                  <span style={{ color: "#E8FF00" }}>GARAGE</span>
                </h2>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "oklch(0.65 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  T&amp;J Fashion was born from a simple frustration: why was car-themed clothing either cheap and tacky, or expensive and boring? Two friends — T and J — decided to fix that.
                </p>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "oklch(0.65 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  We started with a single JDM hoodie design, a heat press, and a lot of late nights. The response was immediate. Car people wanted clothing that actually understood their culture — not just slapped a car logo on a generic tee.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "oklch(0.65 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  Today we have 8 collections covering everything from JDM legends to beater culture, from F1 pit lanes to hypercar dreams. The garage is bigger now, but the passion is exactly the same.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                  alt="Car culture"
                  className="w-full object-cover"
                  style={{ borderRadius: "2px", height: "500px" }}
                />
                {/* Overlay badge */}
                <div
                  className="absolute -bottom-4 -left-4 px-6 py-4"
                  style={{
                    background: "#E8FF00",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    className="text-4xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0A0A0A", letterSpacing: "0.03em" }}
                  >
                    Est. 2022
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.25 0.005 285)" }}
                  >
                    Car Culture Clothing
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: "oklch(0.1 0.005 285)" }}>
        <div className="container">
          <FadeUp>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#E8FF00" }}
            >
              — What We Stand For
            </p>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-12"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              Our Values
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div
                  className="p-6 h-full"
                  style={{
                    background: "oklch(0.12 0.005 285)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                    borderRadius: "2px",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ background: "oklch(0.94 0.22 103 / 12%)", borderRadius: "2px" }}
                  >
                    <v.icon size={18} color="#E8FF00" />
                  </div>
                  <h3
                    className="text-xl text-white mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.55 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {v.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container">
          <FadeUp>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "#FF2D00" }}
            >
              — The Journey
            </p>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-16"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
            >
              Milestones
            </h2>
          </FadeUp>
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px]"
              style={{ background: "oklch(1 0 0 / 8%)", transform: "translateX(-50%)" }}
            />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.1}>
                  <div className={`flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-8 md:pl-0`}>
                      <div
                        className="text-5xl mb-2"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#E8FF00", letterSpacing: "0.05em" }}
                      >
                        {item.year}
                      </div>
                      <p
                        className="text-base"
                        style={{ color: "oklch(0.65 0.008 285)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                      >
                        {item.event}
                      </p>
                    </div>
                    {/* Dot */}
                    <div
                      className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-3"
                      style={{ background: "#E8FF00", borderRadius: "2px", transform: "translateX(-50%) rotate(45deg)" }}
                    />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#E8FF00" }}>
        <div className="container text-center">
          <FadeUp>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] leading-none mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#0A0A0A", letterSpacing: "0.02em" }}
            >
              Ready to Wear the Drive?
            </h2>
            <p
              className="text-base mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.25 0.005 285)" }}
            >
              Browse our 8 collections and find your car culture.
            </p>
            <Link href="/collections">
              <button
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97] hover:brightness-110"
                style={{
                  background: "#0A0A0A",
                  color: "#E8FF00",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  borderRadius: "2px",
                }}
              >
                Shop Now <ArrowRight size={14} />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
