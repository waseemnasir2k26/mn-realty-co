import { Metadata } from "next";
import Link from "next/link";
import SellHero from "@/components/sell/SellHero";
import SellerBenefits from "@/components/sell/SellerBenefits";
import SellerForm from "@/components/sell/SellerForm";
import PlatformsShowcase from "@/components/sell/PlatformsShowcase";

export const metadata: Metadata = {
  title: "Sell Your Home",
};

export default function SellPage() {
  return (
    <main>
      <SellHero />
      <SellerBenefits />

      {/* Net Proceeds Calculator CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy">
            Know Your Numbers
          </h2>
          <p className="text-charcoal-light mt-2">
            Use our free calculator to estimate your net proceeds with
            Minnesota-specific taxes and fees.
          </p>
          <Link
            href="/sell/roi-calculator"
            className="mt-6 inline-flex bg-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-dark transition"
          >
            Open Net Proceeds Calculator
          </Link>
        </div>
      </section>

      <SellerForm />
      <PlatformsShowcase />
    </main>
  );
}
