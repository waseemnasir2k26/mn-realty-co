"use client";

import { motion } from "framer-motion";

export default function WhyUsHero() {
  return (
    <section className="bg-navy-dark py-32 md:py-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
