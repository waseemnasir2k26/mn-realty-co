"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import Link from "next/link";

export default function JoinTeam() {
  return (
    <section className="py-20 px-4 bg-forest">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-heading text-3xl md:text-4xl text-white font-bold">
          Are You a Licensed Agent Looking for a New Home?
        </h2>
        <p className="text-white/80 mt-4 text-lg">
          MN Realty Co is agent-friendly by design. We provide the technology,
          support, and culture for you to thrive.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full uppercase tracking-wider font-semibold px-8 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-forest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contact Us About Joining
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
