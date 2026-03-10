"use client";

import { motion } from "framer-motion";
import { Eye, BadgeDollarSign, Users, Truck } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const BENEFITS = [
  {
    icon: Eye,
    title: "See Listings First",
    description:
      "Properties on our site before Zillow & Realtor.com",
  },
  {
    icon: BadgeDollarSign,
    title: "VIP Home Financing",
    description: "Exclusive financing options for our clients",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "From search to close, we're with you every step",
  },
  {
    icon: Truck,
    title: "Free Moving Truck",
    description: "Complimentary rental for our clients",
  },
];

export default function BuyerBenefits() {
  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="The MN Realty Co Buyer Advantage" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-lg text-navy mt-4">
                  {benefit.title}
                </h3>
                <p className="text-charcoal-light mt-2">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Button href="/contact" variant="primary">
            Connect With an Agent
          </Button>
        </div>
      </div>
    </section>
  );
}
