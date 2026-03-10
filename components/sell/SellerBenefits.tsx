"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Video,
  Shield,
  ClipboardCheck,
  Truck,
  Wrench,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { SELLER_BENEFITS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Plane: Video,
  Video,
  Shield,
  ClipboardCheck,
  Truck,
  Wrench,
};

export default function SellerBenefits() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The MN Realty Co Seller Advantage"
          subtitle="Everything you need to sell your home for top dollar"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SELLER_BENEFITS.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream rounded-2xl p-6 md:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  {Icon && <Icon className="w-6 h-6 text-gold" />}
                </div>
                <h3 className="text-lg font-semibold text-navy mt-4">
                  {benefit.title}
                </h3>
                <p className="text-sm text-charcoal-light mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-charcoal-light italic mt-8 text-sm">
          Ask about our local move discount and exclusive VIP home financing
          options!
        </p>
      </div>
    </section>
  );
}
