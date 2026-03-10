"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function WhyUsHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-navy-dark to-navy px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-4xl md:text-6xl text-white font-bold">
          Agent-Friendly. Client-Focused. Minnesota Proud.
        </h1>
        <p className="text-gray-300 text-lg mt-4">
          A real estate company built on service, technology, and trust.
        </p>
      </motion.div>
    </section>
  );
}
