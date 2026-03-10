"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import SearchBar from "@/components/shared/SearchBar";

export default function BuyHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-navy-dark to-navy px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-4xl md:text-6xl text-white font-bold">
          Find Your Minnesota Home
        </h1>
        <p className="text-gray-300 text-lg mt-4">
          Search hundreds of listings across greater Minnesota
        </p>
        <div className="max-w-3xl mx-auto mt-8">
          <SearchBar />
        </div>
      </motion.div>
    </section>
  );
}
