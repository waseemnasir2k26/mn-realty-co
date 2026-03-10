"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SearchBar from "@/components/shared/SearchBar";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-navy-dark overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop"
        alt="Minnesota landscape"
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy-dark/85" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="block font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-tight">
            Minnesota.
          </span>
          <span className="block font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-gold leading-tight">
            Your Way Home.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mt-6 leading-relaxed"
        >
          The agent-friendly, local real estate company helping buyers &amp;
          sellers across greater Minnesota.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
