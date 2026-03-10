"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold ${
          light ? "text-white" : "text-navy"
        } ${centered ? "text-center" : "text-left"}`}
      >
        {title}
      </h2>

      <div
        className={`w-16 h-1 bg-gold rounded-full mt-4 ${
          centered ? "mx-auto" : ""
        }`}
      />

      {subtitle && (
        <p
          className={`text-lg mt-4 max-w-2xl ${
            light ? "text-white/70" : "text-charcoal-light"
          } ${centered ? "text-center mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
