"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const AREAS = [
  { name: "Hastings", listings: 18, bg: "bg-navy" },
  { name: "Rochester", listings: 24, bg: "bg-navy" },
  { name: "Twin Cities Metro", listings: 22, bg: "bg-navy-light" },
  { name: "Dakota County", listings: 15, bg: "bg-navy-light" },
  { name: "Prescott", listings: 9, bg: "bg-forest-dark" },
  { name: "Red Wing", listings: 12, bg: "bg-forest-dark" },
  { name: "Cottage Grove", listings: 7, bg: "bg-navy-dark" },
  { name: "Cannon Falls", listings: 5, bg: "bg-navy-dark" },
];

export default function BrowseByArea() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Explore by Community" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
          {AREAS.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative group rounded-2xl overflow-hidden h-40 md:h-48 cursor-pointer ${area.bg}`}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h3 className="text-white font-heading text-lg md:text-xl font-bold">
                  {area.name}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {area.listings} Listings
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
