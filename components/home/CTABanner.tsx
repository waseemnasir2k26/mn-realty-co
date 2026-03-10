"use client";

import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import { fadeInUp } from "@/lib/animations";

export default function CTABanner() {
  return (
    <section className="bg-navy py-16 px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Left - Buy CTA */}
          <div className="text-center md:text-left md:pr-12">
            <h3 className="font-heading text-3xl text-white font-bold">
              Ready to Buy?
            </h3>
            <p className="text-gray-300 mt-3">
              Browse new listings before anyone else
            </p>
            <div className="mt-6">
              <Button href="/buy" variant="primary">
                Browse Listings
              </Button>
            </div>
          </div>

          {/* Vertical Gold Divider (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold" />

          {/* Right - Sell CTA */}
          <div className="text-center md:text-left md:pl-12">
            <h3 className="font-heading text-3xl text-white font-bold">
              Ready to Sell?
            </h3>
            <p className="text-gray-300 mt-3">
              Get a free home consultation today
            </p>
            <div className="mt-6">
              <Button
                href="/sell"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
