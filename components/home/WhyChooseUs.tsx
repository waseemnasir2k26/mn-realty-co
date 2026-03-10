"use client";

import { motion } from "framer-motion";
import { Eye, BarChart3, Camera, MapPin } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const BENEFITS = [
  {
    icon: Eye,
    title: "First Access to Listings",
    description:
      "See new properties before they hit major sites like Zillow and Realtor.com.",
  },
  {
    icon: BarChart3,
    title: "Cutting-Edge Technology",
    description:
      "Track your listing, offers, and closing in real-time with our proprietary platforms.",
  },
  {
    icon: Camera,
    title: "Full-Service Marketing",
    description:
      "360\u00B0 virtual tours, HD drone photography, and free pre-sale radon testing.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Born and raised Minnesotans serving communities we know and love.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Families Choose Us"
          subtitle="Local expertise backed by cutting-edge technology"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
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
          <Button href="/why-us">Learn More About Us</Button>
        </div>
      </div>
    </section>
  );
}
