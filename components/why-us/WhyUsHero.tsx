"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyUsHero() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-32 md:py-40">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&h=1080&fit=crop"
        alt="Minnesota home"
        fill
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy-dark/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          <span className="text-white">Agent-Friendly. Client-Focused.</span>
          <br />
          <span className="text-gold">Minnesota Proud.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/60 mt-4"
        >
          A real estate company built on service, technology, and trust.
        </motion.p>
      </div>
    </section>
  );
}
