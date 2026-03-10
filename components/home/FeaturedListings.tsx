"use client";

import { motion } from "framer-motion";
import { Home, Bed, Bath, Maximize } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

const LISTINGS = [
  {
    id: 1,
    price: "$349,900",
    address: "1234 River Bluff Dr, Hastings",
    beds: 3,
    baths: 2,
    sqft: "1,850",
    badge: "New Listing",
  },
  {
    id: 2,
    price: "$275,000",
    address: "567 Oak Street, Rochester",
    beds: 3,
    baths: 2,
    sqft: "1,620",
    badge: "New Listing",
  },
  {
    id: 3,
    price: "$425,000",
    address: "890 Summit Ave, Red Wing",
    beds: 4,
    baths: 3,
    sqft: "2,740",
    badge: "New Listing",
  },
  {
    id: 4,
    price: "$189,900",
    address: "321 Prairie Wind Ln, Randolph",
    beds: 2,
    baths: 1,
    sqft: "1,180",
    badge: "Price Reduced",
  },
  {
    id: 5,
    price: "$525,000",
    address: "456 Bluff View Rd, Prescott",
    beds: 5,
    baths: 4,
    sqft: "3,400",
    badge: null,
  },
  {
    id: 6,
    price: "$310,000",
    address: "789 Cottage Grove Blvd, Cottage Grove",
    beds: 3,
    baths: 2,
    sqft: "2,050",
    badge: null,
  },
];

export default function FeaturedListings() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Properties"
          subtitle="Explore the latest homes on the market across Minnesota"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {LISTINGS.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image Placeholder */}
              <div className="relative h-56 bg-gray-100 flex items-center justify-center">
                <Home className="w-10 h-10 text-gray-300" />

                {listing.badge && (
                  <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {listing.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xl font-bold text-navy">{listing.price}</p>
                <p className="text-sm text-charcoal-light mt-1">
                  {listing.address}
                </p>

                <div className="border-t border-gray-100 my-3" />

                <div className="flex items-center gap-4 text-sm text-charcoal-light">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-charcoal-light" />
                    {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-charcoal-light" />
                    {listing.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-4 h-4 text-charcoal-light" />
                    {listing.sqft} sqft
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" href="/buy">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
}
