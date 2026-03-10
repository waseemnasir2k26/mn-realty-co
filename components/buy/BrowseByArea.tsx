"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/shared/SectionHeading";

const AREA_IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
];

const AREAS = [
  { name: "Hastings", listings: 18 },
  { name: "Rochester", listings: 24 },
  { name: "Twin Cities Metro", listings: 22 },
  { name: "Dakota County", listings: 15 },
  { name: "Prescott", listings: 9 },
  { name: "Red Wing", listings: 12 },
  { name: "Cottage Grove", listings: 7 },
  { name: "Cannon Falls", listings: 5 },
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
              className="relative group rounded-2xl overflow-hidden h-40 md:h-48 cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={AREA_IMAGES[index]}
                alt={area.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-navy-dark/60 group-hover:bg-navy-dark/40 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
                <h3 className="text-white font-heading text-lg md:text-xl font-bold">
                  {area.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">
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
