import { Metadata } from "next";
import Link from "next/link";
import ROICalculator from "@/components/ROICalculator";

export const metadata: Metadata = {
  title: "Seller Net Proceeds Calculator",
};

export default function ROICalculatorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Know Your Numbers Before You Sell
          </h1>
          <p className="text-white/60 mt-3">
            Calculate your estimated net proceeds with Minnesota-specific taxes
            and fees.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ROICalculator />
        </div>
      </section>

      {/* Trust Note */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-charcoal-light">
            This calculator provides estimates only. Contact our team for a
            detailed Comparative Market Analysis (CMA) tailored to your
            property.
          </p>
          <Link
            href="/contact"
            className="text-gold font-semibold hover:text-gold-dark inline-block mt-2"
          >
            Request a Free CMA
          </Link>
        </div>
      </section>
    </main>
  );
}
