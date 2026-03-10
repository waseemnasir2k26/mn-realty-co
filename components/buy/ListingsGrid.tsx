"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Bed, Bath, Square } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/shared/Button";

type ListingTab = "Single Family" | "Multi Family";

const SINGLE_FAMILY_LISTINGS = [
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

const MULTI_FAMILY_LISTINGS = [
  {
    id: 7,
    price: "$475,000",
    address: "100 River Bend Ct, Hastings, MN 55033",
    beds: 6,
    baths: 4,
    sqft: "3,800",
    isNew: true,
  },
  {
    id: 8,
    price: "$525,000",
    address: "245 Oak Park Ave, Rochester, MN 55901",
    beds: 8,
    baths: 4,
    sqft: "4,200",
    isNew: false,
  },
  {
    id: 9,
    price: "$399,000",
    address: "310 Main St, Red Wing, MN 55066",
    beds: 4,
    baths: 3,
    sqft: "2,900",
    isNew: true,
  },
  {
    id: 10,
    price: "$450,000",
    address: "88 Dakota Hills Dr, Dakota County, MN 55024",
    beds: 6,
    baths: 4,
    sqft: "3,600",
    isNew: false,
  },
  {
    id: 11,
    price: "$365,000",
    address: "192 Birch Lane, Cottage Grove, MN 55016",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    isNew: true,
  },
  {
    id: 12,
    price: "$589,900",
    address: "501 Bluffside Way, Prescott, WI 54021",
    beds: 8,
    baths: 5,
    sqft: "5,000",
    isNew: false,
  },
];

export default function ListingsGrid() {
  const [activeTab, setActiveTab] = useState<ListingTab>("Single Family");

  const listings =
    activeTab === "Single Family"
      ? SINGLE_FAMILY_LISTINGS
      : MULTI_FAMILY_LISTINGS;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {(["Single Family", "Multi Family"] as ListingTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gold text-white"
                  : "bg-white text-charcoal border border-gray-300 hover:border-gold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {listings.map((listing) => (
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </section>
  );
}
