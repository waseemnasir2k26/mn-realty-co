"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SearchBar from "@/components/shared/SearchBar";

export default function BuyHero() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-32 md:py-40">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&h=1080&fit=crop"
        alt="Beautiful suburban home"
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
          Find Your Minnesota Home
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-white/60 mt-4"
        >
          Search hundreds of listings across greater Minnesota
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
