"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function parseCurrency(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, "")) || 0;
}

function formatInput(value: number): string {
  return value.toLocaleString("en-US");
}

export default function ROICalculator() {
  const [salePrice, setSalePrice] = useState(350000);
  const [mortgageBalance, setMortgageBalance] = useState(200000);
  const [agentCommission, setAgentCommission] = useState(6);
  const [titleInsurance, setTitleInsurance] = useState(1500);
  const [closingCosts, setClosingCosts] = useState(2);
  const [repairsAndStaging, setRepairsAndStaging] = useState(5000);
  const [homeWarranty, setHomeWarranty] = useState(500);
  const [proRatedTaxes, setProRatedTaxes] = useState(2500);
  const [miscFees, setMiscFees] = useState(500);

  const buyerAgentCommission = agentCommission / 2;
  const sellerAgentCommission = agentCommission / 2;

  const calc = useMemo(() => {
    const totalCommission = salePrice * agentCommission / 100;
    const deedTax = Math.ceil(salePrice / 500) * 1.65;
    const mnConservationFee = 5;
    const closingCostAmount = salePrice * closingCosts / 100;
    const totalCosts =
      totalCommission +
      deedTax +
      mnConservationFee +
      titleInsurance +
      closingCostAmount +
      repairsAndStaging +
      homeWarranty +
      proRatedTaxes +
      miscFees;
    const netProceeds = salePrice - mortgageBalance - totalCosts;
    const roi = mortgageBalance > 0 ? (netProceeds / mortgageBalance) * 100 : 0;

    return {
      totalCommission,
      deedTax,
      mnConservationFee,
      closingCostAmount,
      totalCosts,
      netProceeds,
      roi,
    };
  }, [
    salePrice,
    mortgageBalance,
    agentCommission,
    titleInsurance,
    closingCosts,
    repairsAndStaging,
    homeWarranty,
    proRatedTaxes,
    miscFees,
  ]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy mb-2">
        Seller Net Proceeds Calculator
      </h2>
      <p className="text-sm text-charcoal-light mb-6">
        Estimate your take-home profit with Minnesota-specific fees and taxes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT - Inputs */}
        <div className="space-y-6">
          {/* Sale Details */}
          <div>
            <p className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Sale Details
            </p>
            <div className="space-y-4">
              <CurrencyInput
                label="Sale Price"
                value={salePrice}
                onChange={setSalePrice}
                large
              />
              <CurrencyInput
                label="Mortgage Balance"
                value={mortgageBalance}
                onChange={setMortgageBalance}
              />
            </div>
          </div>

          {/* Commission */}
          <div>
            <p className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Commission
            </p>
            <div>
              <label className="text-sm font-medium text-navy mb-1 flex items-center justify-between">
                <span>Total Commission</span>
                <span className="text-charcoal-light">{agentCommission}%</span>
              </label>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={agentCommission}
                onChange={(e) => setAgentCommission(Number(e.target.value))}
                className="w-full accent-gold h-2 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-charcoal-light mt-1">
                Seller Agent: {sellerAgentCommission}% | Buyer Agent:{" "}
                {buyerAgentCommission}%
              </p>
            </div>
          </div>

          {/* Costs & Fees */}
          <div>
            <p className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Costs &amp; Fees
            </p>
            <div className="space-y-4">
              {/* MN Deed Tax - read only */}
              <div>
                <label className="text-sm font-medium text-navy mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    MN Deed Tax
                    <span
                      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-[10px] text-charcoal-light cursor-help"
                      title="Minnesota state deed tax: $1.65 per $500 of sale price"
                    >
                      i
                    </span>
                  </span>
                  <span className="text-xs text-charcoal-light">
                    {fmt.format(calc.deedTax)}
                  </span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={fmt.format(calc.deedTax)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none bg-gray-50 text-charcoal-light cursor-not-allowed"
                />
              </div>

              <CurrencyInput
                label="Title Insurance"
                value={titleInsurance}
                onChange={setTitleInsurance}
              />

              {/* Closing Costs - percent */}
              <div>
                <label className="text-sm font-medium text-navy mb-1 flex items-center justify-between">
                  <span>Closing Costs</span>
                  <span className="text-xs text-charcoal-light">
                    {fmt.format(calc.closingCostAmount)}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={10}
                    step={0.5}
                    value={closingCosts}
                    onChange={(e) =>
                      setClosingCosts(Number(e.target.value) || 0)
                    }
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-charcoal-light">
                    %
                  </span>
                </div>
              </div>

              <CurrencyInput
                label="Repairs & Staging"
                value={repairsAndStaging}
                onChange={setRepairsAndStaging}
              />
              <CurrencyInput
                label="Home Warranty"
                value={homeWarranty}
                onChange={setHomeWarranty}
              />
              <CurrencyInput
                label="Pro-Rated Property Taxes"
                value={proRatedTaxes}
                onChange={setProRatedTaxes}
              />
              <CurrencyInput
                label="Miscellaneous Fees"
                value={miscFees}
                onChange={setMiscFees}
              />
            </div>
          </div>
        </div>

        {/* RIGHT - Results */}
        <div>
          <div className="sticky top-28 bg-cream rounded-2xl p-6">
            <p className="text-sm uppercase tracking-wider text-charcoal-light">
              Your Estimated Net Proceeds
            </p>
            <p
              className={`text-4xl font-bold mt-2 ${
                calc.netProceeds >= 0 ? "text-forest" : "text-red-600"
              }`}
            >
              {fmt.format(calc.netProceeds)}
            </p>

            <hr className="my-4 border-gray-200" />

            <div className="space-y-2">
              <ResultLine
                label="Sale Price"
                value={fmt.format(salePrice)}
                positive
              />
              <ResultLine
                label="Mortgage Payoff"
                value={fmt.format(mortgageBalance)}
              />
              <ResultLine
                label={`Agent Commission (${agentCommission}%)`}
                value={fmt.format(calc.totalCommission)}
              />
              <ResultLine
                label="MN Deed Tax"
                value={fmt.format(calc.deedTax)}
              />
              <ResultLine
                label="MN Conservation Fee"
                value={fmt.format(calc.mnConservationFee)}
              />
              <ResultLine
                label="Title Insurance"
                value={fmt.format(titleInsurance)}
              />
              <ResultLine
                label={`Closing Costs (${closingCosts}%)`}
                value={fmt.format(calc.closingCostAmount)}
              />
              <ResultLine
                label="Repairs & Staging"
                value={fmt.format(repairsAndStaging)}
              />
              <ResultLine
                label="Home Warranty"
                value={fmt.format(homeWarranty)}
              />
              <ResultLine
                label="Pro-Rated Taxes"
                value={fmt.format(proRatedTaxes)}
              />
              <ResultLine
                label="Misc Fees"
                value={fmt.format(miscFees)}
              />

              <hr className="my-3 border-gray-300" />

              <div className="flex items-center justify-between font-bold text-base">
                <span className="text-navy">NET PROCEEDS</span>
                <span
                  className={
                    calc.netProceeds >= 0 ? "text-forest" : "text-red-600"
                  }
                >
                  {calc.netProceeds >= 0 ? "+ " : "- "}
                  {fmt.format(Math.abs(calc.netProceeds))}
                </span>
              </div>
            </div>

            <p className="text-sm text-charcoal-light mt-4">
              Return on equity: {calc.roi.toFixed(1)}%
            </p>

            <Link
              href="/contact"
              className="mt-6 bg-gold text-white w-full py-3 rounded-lg font-semibold text-center text-sm hover:bg-gold-dark transition block"
            >
              Get a Precise Estimate From Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Subcomponents ── */

function CurrencyInput({
  label,
  value,
  onChange,
  large,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  large?: boolean;
}) {
  const [display, setDisplay] = useState(formatInput(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setDisplay(raw);
  };

  const handleBlur = () => {
    const parsed = parseCurrency(display);
    onChange(parsed);
    setDisplay(formatInput(parsed));
  };

  /* Sync when value changes externally */
  const handleFocus = () => {
    setDisplay(value.toString());
  };

  return (
    <div>
      <label className="text-sm font-medium text-navy mb-1 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs text-charcoal-light">{fmt.format(value)}</span>
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-charcoal-light">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full rounded-lg border border-gray-200 pl-8 pr-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 ${
            large ? "text-base font-semibold" : ""
          }`}
        />
      </div>
    </div>
  );
}

function ResultLine({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-charcoal">{label}</span>
      <span className={positive ? "text-forest" : "text-red-600"}>
        {positive ? "+ " : "- "}
        {value}
      </span>
    </div>
  );
}
