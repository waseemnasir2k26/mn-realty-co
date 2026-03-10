"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Button from "@/components/shared/Button";

export default function SellHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-navy-dark to-navy px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-4xl md:text-6xl text-white font-bold">
          Get Top Dollar for Your Minnesota Home
        </h1>
        <p className="text-gray-300 text-lg mt-4">
          Our sellers get premium results with cutting-edge marketing tools
        </p>
        <div className="mt-8">
          <Button href="#seller-form" variant="primary" size="lg">
            Get Your Free Home Valuation
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
