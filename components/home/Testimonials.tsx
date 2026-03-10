"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const TESTIMONIALS = [
  {
    id: 1,
    text: "Working with MN Realty Co made our first home purchase incredibly smooth. Joseph and his team were always available and truly understood what we were looking for in the Hastings area.",
    name: "Sarah & Mike T.",
    location: "Hastings",
  },
  {
    id: 2,
    text: "We sold our home in just 12 days thanks to the amazing marketing \u2014 the drone photography and virtual tour really set our listing apart from everything else on the market.",
    name: "Jennifer R.",
    location: "Rochester",
  },
  {
    id: 3,
    text: "As first-time buyers, we had a lot of questions. Our agent walked us through every step and helped us find the perfect home in Dakota County within our budget.",
    name: "David & Amanda K.",
    location: "Dakota County",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="What Our Clients Say" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-navy">
                  {testimonial.name}
                </p>
                <p className="text-xs text-charcoal-light mt-0.5">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
