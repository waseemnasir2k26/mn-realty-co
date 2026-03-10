"use client";

import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-navy-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Ready to Find Your
            <br />
            <span className="text-gold">Minnesota Home?</span>
          </h2>

          <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
            Whether you&apos;re buying or selling, our team is here to help you
            every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button variant="primary" href="/buy">
              Browse Listings
            </Button>
            <Link
              href="/sell"
              className="border-2 border-white/30 text-white hover:bg-white/10 rounded-lg px-6 py-3 font-semibold transition"
            >
              Sell Your Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
