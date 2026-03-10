"use client";

import { motion } from "framer-motion";
import { Heart, Monitor, Star } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
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
      "ListingTracker\u2122, OfferTracker\u00AE, and ClosingTracker\u00AE give our clients real-time visibility into every step.",
  },
  {
    icon: Star,
    title: "Full-Service Benefits",
    description:
      "From 360\u00B0 virtual tours to drone photography, free radon tests, and moving trucks \u2014 we go above and beyond.",
  },
];

export default function Differentiators() {
  return (
    <section className="py-20 bg-cream px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="What Makes Us Different" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-lg text-navy mt-4">
                  {item.title}
                </h3>
                <p className="text-charcoal-light mt-2">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
