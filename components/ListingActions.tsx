"use client";

import { useState } from "react";
import { DollarSign, Calendar, Heart } from "lucide-react";
import Link from "next/link";
import BidModal from "@/components/BidModal";
import SaveButton from "@/components/SaveButton";

interface ListingActionsProps {
  listingId: string;
  listingPrice: number;
  listingAddress: string;
}

export default function ListingActions({
  listingId,
  listingPrice,
  listingAddress,
}: ListingActionsProps) {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Place a Bid */}
      <button
        onClick={() => setIsBidModalOpen(true)}
        className="w-full bg-forest text-white py-3 rounded-lg font-semibold text-sm hover:bg-forest-dark transition flex items-center justify-center gap-2"
      >
        <DollarSign className="w-4 h-4" />
        Place a Bid
      </button>

      {/* Schedule a Viewing */}
      <Link
        href="/contact"
        className="w-full border border-gray-200 text-navy py-3 rounded-lg font-semibold text-sm hover:border-gold hover:text-gold transition flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Schedule a Viewing
      </Link>

      {/* Save Listing */}
      <div className="flex items-center justify-center gap-2 py-2">
        <SaveButton listingId={listingId} />
        <span className="text-sm text-charcoal-light">Save Listing</span>
      </div>

      {/* Bid Modal */}
      <BidModal
        listingId={listingId}
        listingPrice={listingPrice}
        listingAddress={listingAddress}
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
      />
    </div>
  );
}
