"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import AgentCard from "@/components/shared/AgentCard";
import { AGENTS } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

export default function AgentSpotlight() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Meet Your Neighborhood Experts" />

        {/* Scrollable Container with Navigation */}
        <div className="relative mt-12">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-cream transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-navy" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center hover:bg-cream transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-navy" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="overflow-x-auto flex gap-6 snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {AGENTS.map((agent) => (
              <motion.div
                key={agent.slug}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="snap-start min-w-[300px]"
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Agents
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
