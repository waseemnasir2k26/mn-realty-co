"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AGENTS } from "@/lib/constants";

export default function CompanyStory() {
  const joseph = AGENTS[0];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl h-80 md:h-[28rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="MN Realty Co office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy-dark/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <div className="w-24 h-24 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JL</span>
                </div>
                <p className="text-white font-heading text-xl font-bold mt-4">
                  Joseph Lawler
                </p>
                <p className="text-white/70 text-sm mt-1">Broker/Owner</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
              Our Story
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full mt-4" />
            <p className="text-charcoal-light leading-relaxed mt-6">
              {joseph.bio}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-cream rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-navy">2007</p>
                <p className="text-xs text-charcoal-light">Licensed Since</p>
              </div>
              <div className="bg-cream rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-navy">4</p>
                <p className="text-xs text-charcoal-light">Deployments</p>
              </div>
            </div>

            {joseph.serviceAreas && (
              <div className="mt-6 flex flex-wrap gap-2">
                {joseph.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-cream text-charcoal-light text-xs px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
