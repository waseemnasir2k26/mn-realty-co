"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Minnesota Housing Market Shows Strong Growth in Early 2026",
    excerpt:
      "Home sales across the Twin Cities metro area increased by 8% in the first quarter, with median prices reaching new highs in several suburban markets.",
    source: "Minneapolis Star Tribune",
    date: "March 8, 2026",
    category: "Market Update",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Dakota County Named One of Best Places to Live in Minnesota",
    excerpt:
      "Dakota County communities including Hastings and Lakeville rank among the top places for families, citing excellent schools, low crime rates, and growing amenities.",
    source: "Minnesota Monthly",
    date: "March 5, 2026",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Rochester Real Estate Boosted by Mayo Clinic Expansion",
    excerpt:
      "The ongoing expansion of Mayo Clinic's campus is driving demand for housing in Rochester and surrounding communities, with new listings selling faster than average.",
    source: "Rochester Post-Bulletin",
    date: "March 3, 2026",
    category: "Market Update",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "First-Time Homebuyer Programs Available in Minnesota for 2026",
    excerpt:
      "Minnesota Housing Finance Agency announces expanded programs offering down payment assistance and competitive rates for first-time buyers across the state.",
    source: "MN Housing",
    date: "February 28, 2026",
    category: "Finance",
    image:
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=300&fit=crop",
  },
];

export default function NewsFeed() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Minnesota Real Estate News"
          subtitle="Stay informed with the latest market updates"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block bg-gold/10 text-gold text-xs font-semibold px-2.5 py-1 rounded-md mb-2 self-start">
                    {item.category}
                  </span>

                  <h3
                    className="text-base font-semibold text-navy leading-snug"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-sm text-charcoal-light mt-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-xs text-charcoal-light">
                      {item.source}
                    </span>
                    <span className="text-xs text-charcoal-light">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
