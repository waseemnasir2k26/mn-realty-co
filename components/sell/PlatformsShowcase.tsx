"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, CheckCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";
import { PLATFORMS } from "@/lib/constants";

const PLATFORM_ICONS = [Activity, BarChart3, CheckCircle];

export default function PlatformsShowcase() {
  return (
    <section className="py-20 px-4 bg-navy">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Technology That Keeps You Informed"
          light={true}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {PLATFORMS.map((platform, index) => {
            const Icon = PLATFORM_ICONS[index];
            return (
              <motion.div
                key={platform.name}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur rounded-xl p-8 text-center hover:bg-white/15 transition-colors duration-300"
              >
                <Icon className="w-10 h-10 text-gold mx-auto" />
                <h3 className="text-white font-heading text-xl font-bold mt-4">
                  {platform.name}
                </h3>
                <p className="text-gray-300 mt-2">{platform.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
