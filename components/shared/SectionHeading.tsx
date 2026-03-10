"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(centered && "text-center")}
    >
      <h2
        className={clsx(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>

      <div
        className={clsx(
          "w-20 h-1 bg-gold rounded-full mt-4",
          centered && "mx-auto"
        )}
      />

      {subtitle && (
        <p
          className={clsx(
            "text-lg mt-4",
            light ? "text-cream-dark" : "text-charcoal-light"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
