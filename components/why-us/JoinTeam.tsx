"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JoinTeam() {
  return (
    <section className="py-20 md:py-28 bg-navy-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Looking for a New Brokerage?
          </h2>
          <p className="text-white/60 text-lg mt-4 leading-relaxed">
            MN Realty Co is agent-friendly by design. We provide the technology,
            support, and culture for you to thrive.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white hover:bg-white/10 rounded-lg px-6 py-3 font-semibold transition"
            >
              Contact Us About Joining
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
