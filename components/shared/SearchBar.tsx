"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { clsx } from "clsx";

type SearchTab = "Buy" | "Rent";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState<SearchTab>("Buy");

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={clsx(
          "bg-white rounded-full shadow-xl p-2",
          "flex flex-col sm:flex-row items-center gap-2"
        )}
      >
        {/* Search Icon */}
        <div className="hidden sm:flex items-center pl-4">
          <Search className="w-5 h-5 text-charcoal-light" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter City, ZIP, or Address..."
          className={clsx(
            "flex-1 w-full sm:w-auto px-4 py-3 text-charcoal",
            "bg-transparent outline-none placeholder:text-charcoal-light",
            "text-sm sm:text-base"
          )}
        />

        {/* Buy / Rent Toggle */}
        <div className="flex items-center bg-cream rounded-full p-1">
          {(["Buy", "Rent"] as SearchTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200",
                activeTab === tab
                  ? "bg-navy text-white"
                  : "text-charcoal hover:text-navy"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Button */}
        <button
          className={clsx(
            "bg-gold text-white rounded-full px-8 py-3 font-semibold",
            "hover:bg-gold-dark transition-all duration-300",
            "text-sm uppercase tracking-wider",
            "w-full sm:w-auto"
          )}
        >
          Search
        </button>
      </div>
    </div>
  );
}
