import type { Metadata } from "next";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";

export const metadata: Metadata = {
  title: "Affordability Calculator | MN Realty Co",
};

export default function AffordabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
            How Much Home Can I Afford?
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Use our calculator to estimate your buying power and plan your next move with confidence
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AffordabilityCalculator />

          {/* Tips Section */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-navy text-center mb-8">
              Tips for Minnesota Homebuyers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy text-base">
                  Get Pre-Approved First
                </h3>
                <p className="text-sm text-charcoal-light mt-2">
                  A pre-approval letter shows sellers you are serious and gives you a clear budget. Most MN sellers expect this before accepting offers.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy text-base">
                  Budget for Closing Costs
                </h3>
                <p className="text-sm text-charcoal-light mt-2">
                  In Minnesota, closing costs typically range from 2-3% of the purchase price. Factor this into your savings plan alongside your down payment.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-forest"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-navy text-base">
                  Consider Total Homeownership Costs
                </h3>
                <p className="text-sm text-charcoal-light mt-2">
                  Beyond the mortgage, plan for property taxes, homeowner&apos;s insurance, maintenance, and utilities. MN winters mean higher heating costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
