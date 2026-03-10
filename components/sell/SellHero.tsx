"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SellHero() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-32 md:py-40">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&h=1080&fit=crop"
        alt="Beautiful home interior"
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
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        >
          Get Top Dollar for Your Minnesota Home
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/60 mt-4"
        >
          Our sellers get premium results with cutting-edge marketing tools
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/sell#seller-form"
            className="bg-gold text-white font-semibold px-8 py-4 rounded-lg hover:bg-gold-dark transition text-base"
          >
            Get Your Free Home Valuation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
