"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import StatCounter from "@/components/shared/StatCounter";
import { TRUST_STATS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white"
          >
            Minnesota.
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-gold"
          >
            Your Way Home.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-6"
          >
            The agent-friendly, local real estate company helping buyers &amp;
            sellers across greater Minnesota.
          </motion.p>

          {/* SearchBar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <SearchBar />
          </motion.div>

          {/* Trust Metrics */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex justify-center gap-8 md:gap-16 mt-12"
          >
            {TRUST_STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  light={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bouncing Chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
