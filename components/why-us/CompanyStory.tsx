"use client";

import { motion } from "framer-motion";
import { AGENTS } from "@/lib/constants";

export default function CompanyStory() {
  const joseph = AGENTS[0];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-navy rounded-2xl h-80 md:h-[28rem] flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JL</span>
                </div>
                <p className="text-white font-heading text-xl font-bold mt-4">
                  Joseph Lawler
                </p>
                <p className="text-white/60 text-sm mt-1">Broker/Owner</p>
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
