"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
      <div className="flex items-center flex-1 gap-3 px-4 py-3">
        <Search className="w-5 h-5 text-charcoal-light shrink-0" />
        <input
          type="text"
          placeholder="Search by city, ZIP, or address..."
          className="w-full bg-transparent outline-none text-base placeholder:text-charcoal-light/60"
        />
      </div>
      <button
        type="button"
        className="bg-gold text-white font-semibold px-8 py-3 rounded-lg hover:bg-gold-dark transition-colors text-sm"
      >
        Search
      </button>
    </div>
  );
}
