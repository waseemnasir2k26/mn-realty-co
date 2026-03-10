"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const TESTIMONIALS = [
  {
    id: 1,
    text: "We were first-time buyers and honestly had no idea where to start. Our agent walked us through every single step \u2014 from pre-approval to closing. We found our dream home in Hastings within three weeks and couldn\u2019t be happier.",
    name: "Sarah & Michael Thompson",
    location: "Hastings, MN",
  },
  {
    id: 2,
    text: "Selling our family home of 20 years was emotional, but the team made it seamless. The drone photography and virtual tour brought in so many showings that we had multiple offers within the first weekend. We sold above asking price!",
    name: "Linda Peterson",
    location: "Rochester, MN",
  },
  {
    id: 3,
    text: "The OfferTracker tool was a game-changer for us. We could see every offer in real time and make informed decisions without the stress. Our agent\u2019s knowledge of the Dakota County market was unmatched. Highly recommend!",
    name: "James & Priya Nguyen",
    location: "Cottage Grove, MN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="What Our Clients Say" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-gold mb-4" />

              {/* Testimonial Text */}
              <p className="italic text-charcoal leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="mt-4">
                <p className="font-semibold text-navy">{testimonial.name}</p>
                <p className="text-charcoal-light text-sm">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
