"use client";

import { motion } from "framer-motion";
import { Heart, Monitor, Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const DIFFERENTIATORS = [
  {
    icon: Heart,
    title: "Agent-Friendly Culture",
    description:
      "We invest in our agents so they invest in you. Our culture prioritizes support, training, and growth for every team member.",
  },
  {
    icon: Monitor,
    title: "Proprietary Technology",
    description:
      "ListingTracker\u2122, OfferTracker\u00AE, and ClosingTracker\u00AE give our clients real-time visibility into every step of the process.",
  },
  {
    icon: Star,
    title: "Full-Service Benefits",
    description:
      "From 360\u00B0 virtual tours and drone photography to free radon tests and moving trucks \u2014 we go above and beyond.",
  },
];

export default function Differentiators() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Makes Us Different" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-light mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
