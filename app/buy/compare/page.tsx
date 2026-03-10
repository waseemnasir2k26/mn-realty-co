"use client";

import PropertyComparison from "@/components/PropertyComparison";

export default function ComparePage() {
  return (
    <>
      <head>
        <title>Compare Properties | MN Realty Co</title>
      </head>

      {/* Hero */}
      <section className="bg-navy-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Compare Properties
          </h1>
          <p className="text-white/60 mt-3">
            Select properties side by side to find your perfect match
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyComparison />
        </div>
      </main>
    </>
  );
}
