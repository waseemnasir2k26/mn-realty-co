"use client";

import { motion } from "framer-motion";
import { BarChart3, FileText, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { PLATFORMS } from "@/lib/constants";

const PLATFORM_ICONS = [BarChart3, FileText, CheckCircle];

export default function PlatformsShowcase() {
  return (
    <section className="py-20 md:py-28 bg-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Technology That Keeps You Informed"
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PLATFORMS.map((platform, index) => {
            const Icon = PLATFORM_ICONS[index];
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mt-4">
                  {platform.name}
                </h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">
                  {platform.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
