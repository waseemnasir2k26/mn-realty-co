import type { Metadata } from "next";
import { LISTINGS, formatPrice } from "@/lib/listings";
import { AGENTS } from "@/lib/constants";
import Image from "next/image";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import MortgageCalculator from "@/components/MortgageCalculator";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.address}, ${listing.city} — ${formatPrice(listing.price)}`,
  };
}

export function generateStaticParams() {
  return LISTINGS.map((listing) => ({ id: listing.id }));
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-navy">
          Listing Not Found
        </h1>
        <p className="text-charcoal-light mt-3">
          The property you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 mt-6 text-sm text-gold hover:text-gold-dark font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </Link>
      </div>
    );
  }

  const agent = AGENTS.find((a) => a.name === listing.agent);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const statusLabel =
    listing.status === "active"
      ? "Active"
      : listing.status === "pending"
        ? "Pending"
        : "Sold";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/buy"
        className="inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-navy transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 md:h-[28rem] rounded-2xl overflow-hidden mt-6">
        <Image
          src={listing.image}
          alt={listing.address}
          fill
          className="object-cover"
          priority
        />
        {listing.badge && (
          <span className="absolute top-4 left-4 bg-gold text-white text-sm font-semibold px-4 py-1.5 rounded-lg z-10">
            {listing.badge}
          </span>
        )}
        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy text-sm font-medium px-4 py-1.5 rounded-lg z-10">
          {statusLabel}
        </span>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Price */}
          <h1 className="text-3xl md:text-4xl font-bold text-navy">
            {formatPrice(listing.price)}
          </h1>

          {/* Address */}
          <p className="text-lg text-charcoal-light mt-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 shrink-0" />
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-charcoal">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-charcoal-light" />
              {listing.beds} beds
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-charcoal-light" />
              {listing.baths} baths
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-charcoal-light" />
              {listing.sqft.toLocaleString()} sqft
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-charcoal-light" />
              Built {listing.yearBuilt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-charcoal-light" />
              {listing.daysOnMarket} days on market
            </span>
          </div>

          <div className="border-t border-gray-100 my-6" />

          {/* Description */}
          <h2 className="font-heading text-xl font-bold text-navy">
            About This Property
          </h2>
          <p className="text-charcoal-light leading-relaxed mt-3">
            {listing.description}
          </p>

          {/* Features */}
          <h2 className="font-heading text-xl font-bold text-navy mt-8">
            Features
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {listing.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-forest shrink-0" />
                <span className="text-sm text-charcoal">{feature}</span>
              </div>
            ))}
          </div>

          {/* Property Details */}
          <h2 className="font-heading text-xl font-bold text-navy mt-8">
            Property Details
          </h2>
          <div className="grid grid-cols-2 gap-y-3 mt-3">
            <span className="text-sm text-charcoal-light">Property Type</span>
            <span className="text-sm font-medium text-navy capitalize">
              {listing.type.replace("-", " ")}
            </span>

            <span className="text-sm text-charcoal-light">Year Built</span>
            <span className="text-sm font-medium text-navy">
              {listing.yearBuilt}
            </span>

            <span className="text-sm text-charcoal-light">Lot Size</span>
            <span className="text-sm font-medium text-navy">
              {listing.lotSize}
            </span>

            <span className="text-sm text-charcoal-light">Status</span>
            <span className="text-sm font-medium text-navy">{statusLabel}</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          {/* Agent Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
            <h3 className="text-sm uppercase tracking-wider text-charcoal-light mb-4">
              Listed By
            </h3>

            {agent && (
              <>
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto">
                  <span className="text-white text-xl font-bold">
                    {getInitials(agent.name)}
                  </span>
                </div>

                {/* Agent Info */}
                <p className="text-lg font-semibold text-navy text-center mt-3">
                  {agent.name}
                </p>
                <p className="text-sm text-charcoal-light text-center">
                  {agent.title}
                </p>
                {agent.area && (
                  <p className="text-xs text-charcoal-light text-center mt-1">
                    {agent.area}
                  </p>
                )}

                {/* Contact Buttons */}
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-gold text-white py-2.5 rounded-lg font-medium text-sm hover:bg-gold-dark transition"
                  >
                    <Phone className="w-4 h-4" />
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 text-navy py-2.5 rounded-lg font-medium text-sm hover:border-gold hover:text-gold transition"
                  >
                    <Mail className="w-4 h-4" />
                    Email Agent
                  </a>
                </div>
              </>
            )}

            {!agent && (
              <p className="text-sm text-charcoal-light text-center">
                {listing.agent}
              </p>
            )}
          </div>

          {/* Mortgage Calculator */}
          <div className="mt-6">
            <MortgageCalculator price={listing.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
