"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { addBid, getUser } from "@/lib/auth";
import { useAuth } from "@/components/AuthProvider";

interface BidModalProps {
  listingId: string;
  listingPrice: number;
  listingAddress: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function BidModal({
  listingId,
  listingPrice,
  listingAddress,
  isOpen,
  onClose,
}: BidModalProps) {
  const { setUser } = useAuth();
  const [bidAmount, setBidAmount] = useState(listingPrice);
  const [message, setMessage] = useState("");
  const [hasPreApproval, setHasPreApproval] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const formattedListingPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(listingPrice);

  const formattedBidAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(bidAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      setNotLoggedIn(true);
      return;
    }
    addBid(listingId, bidAmount, message);
    // Sync updated user (with new bid) to React context
    const updatedUser = getUser();
    if (updatedUser) setUser(updatedUser);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setNotLoggedIn(false);
    setBidAmount(listingPrice);
    setMessage("");
    setHasPreApproval(false);
    setAgreedToTerms(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-charcoal-light hover:text-navy transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Not Logged In State */}
            {notLoggedIn && (
              <div className="text-center py-6">
                <AlertTriangle className="w-12 h-12 text-gold mx-auto" />
                <h2 className="font-heading text-xl font-bold text-navy mt-4">
                  Sign In Required
                </h2>
                <p className="text-sm text-charcoal-light mt-2">
                  Please sign in to place a bid on this property.
                </p>
                <Link
                  href="/login"
                  className="inline-block mt-4 bg-gold text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-dark transition"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Success State */}
            {submitted && !notLoggedIn && (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-forest mx-auto" />
                <h2 className="font-heading text-xl font-bold text-navy mt-4">
                  Bid Submitted!
                </h2>
                <p className="text-sm text-charcoal-light mt-2">
                  Your bid of {formattedBidAmount} has been submitted. The
                  seller&apos;s agent will review your offer.
                </p>
                <Link
                  href="/dashboard"
                  className="inline-block mt-4 bg-gold text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-dark transition"
                >
                  View My Bids
                </Link>
              </div>
            )}

            {/* Form State */}
            {!submitted && !notLoggedIn && (
              <>
                <h2 className="font-heading text-xl font-bold text-navy">
                  Place Your Bid
                </h2>
                <p className="text-sm text-charcoal-light mt-1">
                  Bidding on: {listingAddress}
                </p>
                <p className="text-sm text-charcoal-light">
                  Asking price: {formattedListingPrice}
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* Bid Amount */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Your bid
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-lg font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        min={0}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg text-lg font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition"
                      />
                    </div>
                    {bidAmount < listingPrice && bidAmount > 0 && (
                      <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Your bid is below asking price
                      </p>
                    )}
                    {bidAmount >= listingPrice && bidAmount > 0 && (
                      <p className="text-xs text-forest mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Competitive bid
                      </p>
                    )}
                  </div>

                  {/* Message to Seller */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      Message to Seller
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Optional: Add a message to the seller..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition resize-none"
                    />
                  </div>

                  {/* Pre-approval Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPreApproval}
                      onChange={(e) => setHasPreApproval(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <span className="text-sm text-charcoal">
                      I have mortgage pre-approval
                    </span>
                  </label>

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <span className="text-sm text-charcoal">
                      I agree to the MN Realty Co terms of service
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!agreedToTerms || bidAmount <= 0}
                    className="bg-gold text-white w-full py-3 rounded-lg font-semibold text-sm hover:bg-gold-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Bid
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
