"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Bed, Bath, Maximize2 } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

type ListingTab = "Single Family" | "Multi Family";

interface Listing {
  id: number;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
}

const SINGLE_FAMILY_LISTINGS: Listing[] = [
  {
    id: 1,
    price: "$189,900",
    address: "412 Prairie Wind Ln, Randolph, MN 55065",
    beds: 2,
    baths: 1,
    sqft: "1,100",
  },
  {
    id: 2,
    price: "$275,000",
    address: "567 Lakeview Ct, Rochester, MN 55901",
    beds: 3,
    baths: 2,
    sqft: "1,800",
  },
  {
    id: 3,
    price: "$349,900",
    address: "1234 Maple Ridge Dr, Hastings, MN 55033",
    beds: 4,
    baths: 3,
    sqft: "2,450",
  },
  {
    id: 4,
    price: "$389,000",
    address: "789 Cottage Grove Blvd, Cottage Grove, MN 55016",
    beds: 3,
    baths: 2,
    sqft: "2,100",
  },
  {
    id: 5,
    price: "$425,000",
    address: "890 Summit Ave, Red Wing, MN 55066",
    beds: 5,
    baths: 3,
    sqft: "3,100",
  },
  {
    id: 6,
    price: "$525,000",
    address: "456 Bluff View Rd, Prescott, WI 54021",
    beds: 5,
    baths: 4,
    sqft: "3,400",
  },
];

const MULTI_FAMILY_LISTINGS: Listing[] = [
  {
    id: 7,
    price: "$275,000",
    address: "310 Main St, Red Wing, MN 55066",
    beds: 4,
    baths: 3,
    sqft: "2,900",
  },
  {
    id: 8,
    price: "$365,000",
    address: "192 Birch Lane, Cottage Grove, MN 55016",
    beds: 4,
    baths: 3,
    sqft: "2,800",
  },
  {
    id: 9,
    price: "$450,000",
    address: "88 Dakota Hills Dr, Dakota County, MN 55024",
    beds: 6,
    baths: 4,
    sqft: "3,600",
  },
  {
    id: 10,
    price: "$475,000",
    address: "100 River Bend Ct, Hastings, MN 55033",
    beds: 6,
    baths: 4,
    sqft: "3,800",
  },
  {
    id: 11,
    price: "$525,000",
    address: "245 Oak Park Ave, Rochester, MN 55901",
    beds: 8,
    baths: 4,
    sqft: "4,200",
  },
  {
    id: 12,
    price: "$650,000",
    address: "501 Bluffside Way, Prescott, WI 54021",
    beds: 8,
    baths: 5,
    sqft: "5,000",
  },
];

export default function ListingsGrid() {
  const [activeTab, setActiveTab] = useState<ListingTab>("Single Family");

  const listings =
    activeTab === "Single Family"
      ? SINGLE_FAMILY_LISTINGS
      : MULTI_FAMILY_LISTINGS;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Available Properties" />

        {/* Tab Row */}
        <div className="flex items-center gap-2 mb-8 justify-center mt-10">
          {(["Single Family", "Multi Family"] as ListingTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-charcoal hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="h-52 bg-gray-100 flex items-center justify-center">
                <Home className="w-10 h-10 text-gray-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xl font-bold text-navy">{listing.price}</p>
                <p className="text-sm text-charcoal-light mt-1">
                  {listing.address}
                </p>

                <div className="border-t border-gray-100 my-3" />

                <div className="flex gap-4 text-sm text-charcoal-light">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {listing.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    {listing.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-4 h-4" />
                    {listing.sqft} sqft
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-10">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </section>
  );
}
