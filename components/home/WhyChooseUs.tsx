"use client";

import { motion } from "framer-motion";
import { Eye, Monitor, Camera, MapPin, Trees } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { slideInLeft, slideInRight } from "@/lib/animations";

const BENEFITS = [
  {
    icon: Eye,
    title: "First Access to Listings",
    description:
      "Our buyers get notified about new listings before they hit the open market, giving you a head start in a competitive market.",
  },
  {
    icon: Monitor,
    title: "Cutting-Edge Technology",
    description:
      "Track every step with our proprietary ListingTracker\u2122, OfferTracker\u00AE, and ClosingTracker\u00AE platforms \u2014 real-time updates at your fingertips.",
  },
  {
    icon: Camera,
    title: "Full-Service Support",
    description:
      "From 360\u00B0 virtual tours and professional drone photography to complimentary radon tests, we handle every detail so you don\u2019t have to.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "With 13+ years serving communities from Hastings to Rochester, our agents know every neighborhood, school district, and market trend.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading
              title="Why Minnesota Families Choose Us"
              centered={false}
            />

            <div className="mt-10 space-y-8">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-navy">
                        {benefit.title}
                      </h3>
                      <p className="text-charcoal-light mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <Button href="/why-us" variant="outline">
                Learn More About Us
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Image Placeholder */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-forest to-forest-dark h-96 flex flex-col items-center justify-center">
              <Trees className="w-20 h-20 text-white/30" />
              <p className="text-white/60 font-heading text-2xl mt-4">
                Minnesota Living
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
