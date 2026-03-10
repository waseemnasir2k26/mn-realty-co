"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Bed, Bath, Square, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const SAMPLE_LISTINGS = [
  {
    id: 1,
    price: "$349,900",
    address: "1234 Maple Ridge Dr, Hastings, MN 55033",
    beds: 4,
    baths: 3,
    sqft: "2,450",
    isNew: true,
  },
  {
    id: 2,
    price: "$275,000",
    address: "567 Lakeview Ct, Rochester, MN 55901",
    beds: 3,
    baths: 2,
    sqft: "1,800",
    isNew: true,
  },
  {
    id: 3,
    price: "$425,000",
    address: "890 Summit Ave, Red Wing, MN 55066",
    beds: 5,
    baths: 3,
    sqft: "3,100",
    isNew: false,
  },
  {
    id: 4,
    price: "$215,000",
    address: "321 Prairie Wind Ln, Randolph, MN 55065",
    beds: 3,
    baths: 2,
    sqft: "1,500",
    isNew: true,
  },
  {
    id: 5,
    price: "$389,900",
    address: "456 Bluff View Rd, Prescott, WI 54021",
    beds: 4,
    baths: 3,
    sqft: "2,700",
    isNew: false,
  },
  {
    id: 6,
    price: "$299,500",
    address: "789 Cottage Grove Blvd, Cottage Grove, MN 55016",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    isNew: true,
  },
];

export default function FeaturedListings() {
  return (
    <section className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="New on the Market" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {SAMPLE_LISTINGS.map((listing) => (
            <motion.div
              key={listing.id}
              variants={fadeInUp}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-navy-light to-navy flex items-center justify-center overflow-hidden">
                <Home className="w-12 h-12 text-white/40 group-hover:scale-110 transition-transform duration-500" />

                {listing.isNew && (
                  <span className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5">
                <p className="text-2xl font-bold text-navy">{listing.price}</p>
                <p className="text-charcoal-light text-sm mt-1">
                  {listing.address}
                </p>

                <div className="flex items-center gap-4 mt-4 text-charcoal-light text-sm">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {listing.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    {listing.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    {listing.sqft} sqft
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/buy"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Listings
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
