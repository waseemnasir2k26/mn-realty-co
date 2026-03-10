"use client";

import { motion } from "framer-motion";
import { Eye, BadgeDollarSign, Users, Truck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const BENEFITS = [
  {
    icon: Eye,
    title: "See Listings First",
    description: "Properties on our site before Zillow & Realtor.com",
  },
  {
    icon: BadgeDollarSign,
    title: "VIP Financing",
    description: "Exclusive financing options for our clients",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "From search to close, we\u2019re with you every step",
  },
  {
    icon: Truck,
    title: "Free Moving Truck",
    description: "Complimentary rental when you buy with us",
  },
];

export default function BuyerBenefits() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="The MN Realty Co Buyer Advantage" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream rounded-2xl p-6 md:p-8 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-base font-semibold text-navy mt-4">
                  {benefit.title}
                </h3>
                <p className="text-sm text-charcoal-light mt-2 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Button href="/contact">Connect With an Agent</Button>
        </div>
      </div>
    </section>
  );
}
