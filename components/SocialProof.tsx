"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, X } from "lucide-react";

const NOTIFICATIONS = [
  {
    title: "Home Sold in Hastings!",
    detail: "3 bed, 2 bath — $349,900",
    time: "2 hours ago",
  },
  {
    title: "New Listing in Rochester!",
    detail: "4 bed, 3 bath — $425,000",
    time: "Just now",
  },
  {
    title: "Home Sold in Dakota County!",
    detail: "4 bed, 3 bath — $399,000",
    time: "4 hours ago",
  },
  {
    title: "Price Reduced in Red Wing!",
    detail: "3 bed, 2 bath — now $275,000",
    time: "1 hour ago",
  },
  {
    title: "Open House in Cottage Grove!",
    detail: "3 bed, 2 bath — $310,000",
    time: "Today at 2pm",
  },
  {
    title: "Home Sold in Prescott!",
    detail: "5 bed, 4 bath — $525,000",
    time: "Yesterday",
  },
  {
    title: "New Listing in Cannon Falls!",
    detail: "3 bed, 2 bath — $359,000",
    time: "30 minutes ago",
  },
  {
    title: "Home Under Contract!",
    detail: "Hastings — 4 bed, 3 bath",
    time: "3 hours ago",
  },
];

export default function SocialProof() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    setIsVisible(true);

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      showNext();
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [dismissed, showNext]);

  useEffect(() => {
    if (dismissed) return;

    // After each hide, schedule next notification
    if (!isVisible && currentIndex >= 0) {
      const gap = 15000 + Math.random() * 5000; // 15-20 seconds
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        showNext();
      }, gap);

      return () => clearTimeout(nextTimer);
    }
  }, [isVisible, dismissed, currentIndex, showNext]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  const notification = NOTIFICATIONS[currentIndex];

  return (
    <div className="hidden sm:block fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isVisible && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-4 max-w-xs flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-forest" />
            </div>

            <div className="flex-1 pr-4">
              <p className="text-sm font-semibold text-navy">
                {notification.title}
              </p>
              <p className="text-xs text-charcoal-light mt-0.5">
                {notification.detail}
              </p>
              <p className="text-xs text-charcoal-light/60 mt-1">
                {notification.time}
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 text-charcoal-light hover:text-navy" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
