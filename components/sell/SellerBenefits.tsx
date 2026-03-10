"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Plane,
  Shield,
  ClipboardCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";
import { SELLER_BENEFITS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Plane,
  Shield,
  ClipboardCheck,
  Truck,
  Wrench,
};

const GRADIENT_PAIRS = [
  "from-gold to-gold-dark",
  "from-navy to-navy-dark",
  "from-forest to-forest-dark",
  "from-navy-dark to-forest",
  "from-gold-dark to-navy",
  "from-forest-dark to-navy-dark",
];

export default function SellerBenefits() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="The MN Realty Co Seller Advantage" />

        <div className="mt-16 space-y-20">
          {SELLER_BENEFITS.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.icon];
            const isEven = index % 2 === 0;

            return (
              <div
                key={benefit.title}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Image Side */}
                <motion.div
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`${isEven ? "md:order-1" : "md:order-2"}`}
                >
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${GRADIENT_PAIRS[index % GRADIENT_PAIRS.length]} h-72 flex items-center justify-center`}
                  >
                    {Icon && (
                      <Icon className="w-16 h-16 text-white/50" />
                    )}
                  </div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                  variants={isEven ? slideInRight : slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`${isEven ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                    {Icon && (
                      <Icon className="w-6 h-6 text-gold" />
                    )}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-navy">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-light text-lg mt-3">
                    {benefit.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <p className="text-center italic text-gold mt-16 text-lg">
          Ask about our local move discount and exclusive VIP home financing
          options!
        </p>
      </div>
    </section>
  );
}
