"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";

const AREAS = [
  { name: "Hastings", listings: 18, gradient: "from-navy to-navy-dark" },
  { name: "Rochester", listings: 24, gradient: "from-forest to-forest-dark" },
  {
    name: "Twin Cities Metro",
    listings: 22,
    gradient: "from-navy-dark to-forest",
  },
  {
    name: "Dakota County",
    listings: 15,
    gradient: "from-forest-dark to-navy",
  },
  { name: "Prescott", listings: 9, gradient: "from-gold-dark to-navy-dark" },
  { name: "Red Wing", listings: 12, gradient: "from-navy to-forest-dark" },
  {
    name: "Cottage Grove",
    listings: 7,
    gradient: "from-forest to-navy-dark",
  },
  {
    name: "Randolph & Cannon Falls",
    listings: 5,
    gradient: "from-navy-dark to-gold-dark",
  },
];

export default function BrowseByArea() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Explore by Community" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {AREAS.map((area) => (
            <motion.div
              key={area.name}
              variants={fadeInUp}
              className="group relative h-48 rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.gradient} group-hover:scale-110 transition-transform duration-500`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center">
                <h3 className="text-white font-heading text-xl font-bold">
                  {area.name}
                </h3>
                <p className="text-white/80 text-sm mt-2">
                  {area.listings} Listings
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
