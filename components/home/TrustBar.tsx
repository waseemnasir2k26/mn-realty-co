"use client";

import StatCounter from "@/components/shared/StatCounter";
import { TRUST_STATS } from "@/lib/constants";

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 bg-cream border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
