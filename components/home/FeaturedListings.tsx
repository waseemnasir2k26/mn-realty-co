"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import { LISTINGS, formatPrice } from "@/lib/listings";

const featuredListings = LISTINGS.filter((l) => l.status === "active").slice(0, 6);

export default function FeaturedListings() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Properties"
          subtitle="Explore the latest homes on the market across Minnesota"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {featuredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/buy/${listing.id}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
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
                    {listing.address}, {listing.city}
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
                      {listing.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </Link>
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
