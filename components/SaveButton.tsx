"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUser, toggleSavedListing, saveUser } from "@/lib/auth";

interface SaveButtonProps {
  listingId: string;
  className?: string;
}

export default function SaveButton({ listingId, className }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setIsSaved(user.savedListings.includes(listingId));
    }
  }, [listingId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const user = getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    toggleSavedListing(listingId);
    const updatedUser = getUser();
    if (updatedUser) {
      setIsSaved(updatedUser.savedListings.includes(listingId));
    }

    // Trigger animation
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative ${className ?? ""}`}
      aria-label={isSaved ? "Unsave listing" : "Save listing"}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          isSaved
            ? "fill-red-500 text-red-500"
            : "text-charcoal-light hover:text-red-500"
        } ${animate ? "scale-125" : "scale-100"}`}
      />
    </button>
  );
}
