"use client";

import { useState, useMemo } from "react";
import { LISTINGS, formatPrice } from "@/lib/listings";
import Image from "next/image";

export default function PropertyComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedListings = useMemo(
    () => LISTINGS.filter((l) => selectedIds.includes(l.id)),
    [selectedIds]
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  // Determine best values for highlighting
  const bestValues = useMemo(() => {
    if (selectedListings.length < 2) return null;
    const prices = selectedListings.map((l) => l.price);
    const sqfts = selectedListings.map((l) => l.sqft);
    const ppsf = selectedListings.map((l) => Math.round(l.price / l.sqft));
    const dom = selectedListings.map((l) => l.daysOnMarket);
    return {
      lowestPrice: Math.min(...prices),
      largestSqft: Math.max(...sqfts),
      lowestPpsf: Math.min(...ppsf),
      lowestDom: Math.min(...dom),
    };
  }, [selectedListings]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="font-heading text-xl font-bold text-navy">
        Compare Properties
      </h2>

      {selectedIds.length < 2 ? (
        <>
          <p className="text-sm text-charcoal-light mt-2">
            Select 2-3 properties to compare
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {LISTINGS.map((listing) => {
              const isSelected = selectedIds.includes(listing.id);
              return (
                <button
                  key={listing.id}
                  onClick={() => toggleSelect(listing.id)}
                  className={`border rounded-xl p-3 cursor-pointer transition text-left relative ${
                    isSelected
                      ? "border-gold bg-gold/5"
                      : "border-gray-200 hover:border-gold"
                  }`}
                >
                  {/* Checkbox indicator */}
                  <div
                    className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                      isSelected
                        ? "border-gold bg-gold"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="h-20 rounded-lg overflow-hidden relative">
                    <Image
                      src={listing.image}
                      alt={listing.address}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <p className="text-sm font-semibold text-navy mt-2">
                    {formatPrice(listing.price)}
                  </p>
                  <p className="text-xs text-charcoal-light truncate">
                    {listing.address}
                  </p>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-charcoal-light">
              Comparing {selectedListings.length} properties
            </p>
            <button
              onClick={() => setSelectedIds([])}
              className="text-sm text-gold font-medium hover:text-gold/80 transition"
            >
              Clear All
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              {/* Header row with images */}
              <thead>
                <tr>
                  <th className="text-left w-36 pr-4"></th>
                  {selectedListings.map((listing) => (
                    <th key={listing.id} className="p-2 text-center">
                      <div className="h-32 rounded-xl overflow-hidden relative mx-auto max-w-[200px]">
                        <Image
                          src={listing.image}
                          alt={listing.address}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <p className="text-base font-bold text-navy mt-2">
                        {formatPrice(listing.price)}
                      </p>
                      <button
                        onClick={() => toggleSelect(listing.id)}
                        className="text-xs text-red-400 hover:text-red-600 mt-1 transition"
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    label: "Address",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      `${l.address}, ${l.city}`,
                  },
                  {
                    label: "Price",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      formatPrice(l.price),
                    highlight: (l: (typeof selectedListings)[0]) =>
                      bestValues && l.price === bestValues.lowestPrice,
                  },
                  {
                    label: "Beds",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      String(l.beds),
                  },
                  {
                    label: "Baths",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      String(l.baths),
                  },
                  {
                    label: "Sq Ft",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      l.sqft.toLocaleString(),
                    highlight: (l: (typeof selectedListings)[0]) =>
                      bestValues && l.sqft === bestValues.largestSqft,
                  },
                  {
                    label: "Price / Sq Ft",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      `$${Math.round(l.price / l.sqft)}`,
                    highlight: (l: (typeof selectedListings)[0]) =>
                      bestValues &&
                      Math.round(l.price / l.sqft) === bestValues.lowestPpsf,
                  },
                  {
                    label: "Year Built",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      String(l.yearBuilt),
                  },
                  {
                    label: "Lot Size",
                    getValue: (l: (typeof selectedListings)[0]) => l.lotSize,
                  },
                  {
                    label: "Days on Market",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      String(l.daysOnMarket),
                    highlight: (l: (typeof selectedListings)[0]) =>
                      bestValues &&
                      l.daysOnMarket === bestValues.lowestDom,
                  },
                  {
                    label: "Status",
                    getValue: (l: (typeof selectedListings)[0]) =>
                      l.status.charAt(0).toUpperCase() + l.status.slice(1),
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-cream/50" : ""}
                  >
                    <td className="py-3 pr-4 text-sm font-medium text-charcoal">
                      {row.label}
                    </td>
                    {selectedListings.map((listing) => (
                      <td
                        key={listing.id}
                        className={`py-3 px-2 text-sm text-center ${
                          row.highlight && row.highlight(listing)
                            ? "text-forest font-semibold"
                            : "text-charcoal"
                        }`}
                      >
                        {row.getValue(listing)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
