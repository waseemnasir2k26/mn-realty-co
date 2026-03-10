"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { LISTINGS, formatPrice, filterListings } from "@/lib/listings";

type ListingTab = "Single Family" | "Multi Family";

export default function ListingsGrid() {
  const [activeTab, setActiveTab] = useState<ListingTab>("Single Family");

  const typeFilter =
    activeTab === "Single Family" ? "single-family" : "multi-family";
  const listings = filterListings(LISTINGS, { type: typeFilter });

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
            >
              <Link
                href={`/buy/${listing.id}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {listing.badge && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-md z-10">
                      {listing.badge}
                    </span>
                  )}

                  <SaveButton
                    listingId={listing.id}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition z-10"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xl font-bold text-navy">
                    {formatPrice(listing.price)}
                  </p>
                  <p className="text-sm text-charcoal-light mt-1">
                    {listing.address}, {listing.city}, {listing.state}{" "}
                    {listing.zip}
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
                      {listing.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </Link>
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
