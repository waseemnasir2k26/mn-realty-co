"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [insuranceMonthly, setInsuranceMonthly] = useState(150);

  const results = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * 0.28;
    const dti = ((monthlyDebts + maxMonthlyPayment) / monthlyIncome) * 100;

    // Iterative approach to find max purchase price
    // since property tax depends on the price itself
    let estimatedPrice = 300000;
    for (let i = 0; i < 20; i++) {
      const monthlyTax = (propertyTaxRate / 100) * estimatedPrice / 12;
      const availableForPI = maxMonthlyPayment - monthlyTax - insuranceMonthly;

      if (availableForPI <= 0) {
        estimatedPrice = downPayment;
        break;
      }

      // Calculate max loan from monthly PI payment
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;
      let maxLoan: number;

      if (monthlyRate === 0) {
        maxLoan = availableForPI * numPayments;
      } else {
        maxLoan =
          availableForPI *
          ((Math.pow(1 + monthlyRate, numPayments) - 1) /
            (monthlyRate * Math.pow(1 + monthlyRate, numPayments)));
      }

      estimatedPrice = maxLoan + downPayment;
    }

    const maxPurchasePrice = Math.round(estimatedPrice);
    const loanAmount = maxPurchasePrice - downPayment;

    // Calculate actual monthly breakdown
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    let monthlyPI: number;
    if (monthlyRate === 0) {
      monthlyPI = loanAmount / numPayments;
    } else {
      monthlyPI =
        loanAmount *
        ((monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1));
    }
    const monthlyTax = (propertyTaxRate / 100) * maxPurchasePrice / 12;
    const totalMonthly = monthlyPI + monthlyTax + insuranceMonthly;

    return {
      maxPurchasePrice,
      loanAmount,
      monthlyPI: Math.round(monthlyPI),
      monthlyTax: Math.round(monthlyTax),
      insuranceMonthly,
      totalMonthly: Math.round(totalMonthly),
      dti: Math.round(dti),
    };
  }, [
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    insuranceMonthly,
  ]);

  // Donut chart calculations
  const total = results.monthlyPI + results.monthlyTax + results.insuranceMonthly;
  const piPercent = total > 0 ? (results.monthlyPI / total) * 100 : 0;
  const taxPercent = total > 0 ? (results.monthlyTax / total) * 100 : 0;
  const insPercent = total > 0 ? (results.insuranceMonthly / total) * 100 : 0;

  // SVG donut offsets
  const circumference = 2 * Math.PI * 60; // radius=60
  const piArc = (piPercent / 100) * circumference;
  const taxArc = (taxPercent / 100) * circumference;
  const insArc = (insPercent / 100) * circumference;
  const piOffset = 0;
  const taxOffset = -(piArc);
  const insOffset = -(piArc + taxArc);

  function formatCurrency(val: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }

  function getDtiColor(dti: number) {
    if (dti < 28) return "text-forest";
    if (dti <= 36) return "text-yellow-600";
    return "text-red-500";
  }

  function getDtiBg(dti: number) {
    if (dti < 28) return "bg-forest/10";
    if (dti <= 36) return "bg-yellow-50";
    return "bg-red-50";
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-navy">
        How Much Home Can I Afford?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* LEFT - Inputs */}
        <div className="space-y-5">
          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Annual Household Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
                $
              </span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
              />
            </div>
          </div>

          {/* Monthly Debts */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Monthly Debt Payments
            </label>
            <p className="text-xs text-charcoal-light mb-1">
              Car loans, student loans, credit cards
            </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
                $
              </span>
              <input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Down Payment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
                $
              </span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
              />
            </div>
          </div>

          {/* Interest Rate with slider */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Interest Rate: {interestRate.toFixed(1)}%
            </label>
            <input
              type="range"
              min="2"
              max="12"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-charcoal-light mt-1">
              <span>2%</span>
              <span>12%</span>
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Loan Term
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition bg-white"
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          {/* Property Tax Rate */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Property Tax Rate (%)
            </label>
            <p className="text-xs text-charcoal-light mb-1">
              MN average: 1.1%
            </p>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
                %
              </span>
            </div>
          </div>

          {/* Monthly Insurance */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Monthly Insurance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
                $
              </span>
              <input
                type="number"
                value={insuranceMonthly}
                onChange={(e) => setInsuranceMonthly(Number(e.target.value))}
                className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
              />
            </div>
          </div>
        </div>

        {/* RIGHT - Results */}
        <div className="space-y-6">
          {/* Big number */}
          <div className="bg-cream/50 rounded-2xl p-6 text-center">
            <p className="text-sm text-charcoal-light">
              You can afford up to
            </p>
            <p className="text-4xl font-bold text-navy mt-1 font-heading">
              {formatCurrency(results.maxPurchasePrice)}
            </p>
          </div>

          {/* Donut Chart */}
          <div className="flex justify-center">
            <div className="relative w-44 h-44">
              <svg
                viewBox="0 0 140 140"
                className="w-full h-full -rotate-90"
              >
                {/* Principal & Interest arc */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#1B2A4A"
                  strokeWidth="16"
                  strokeDasharray={`${piArc} ${circumference - piArc}`}
                  strokeDashoffset={piOffset}
                  strokeLinecap="round"
                />
                {/* Property Tax arc */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#C8973E"
                  strokeWidth="16"
                  strokeDasharray={`${taxArc} ${circumference - taxArc}`}
                  strokeDashoffset={taxOffset}
                  strokeLinecap="round"
                />
                {/* Insurance arc */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="#2D6A4F"
                  strokeWidth="16"
                  strokeDasharray={`${insArc} ${circumference - insArc}`}
                  strokeDashoffset={insOffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-charcoal-light">Monthly</p>
                <p className="text-lg font-bold text-navy">
                  {formatCurrency(results.totalMonthly)}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-navy">
              Monthly Payment Breakdown
            </h3>
            <div className="text-2xl font-bold text-navy">
              {formatCurrency(results.totalMonthly)}
              <span className="text-sm font-normal text-charcoal-light ml-1">
                /month
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-navy inline-block" />
                  <span className="text-charcoal">Principal &amp; Interest</span>
                </div>
                <span className="font-medium text-charcoal">
                  {formatCurrency(results.monthlyPI)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold inline-block" />
                  <span className="text-charcoal">Property Tax</span>
                </div>
                <span className="font-medium text-charcoal">
                  {formatCurrency(results.monthlyTax)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-forest inline-block" />
                  <span className="text-charcoal">Insurance</span>
                </div>
                <span className="font-medium text-charcoal">
                  {formatCurrency(results.insuranceMonthly)}
                </span>
              </div>
            </div>
          </div>

          {/* DTI Ratio */}
          <div
            className={`rounded-xl p-4 ${getDtiBg(results.dti)}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal">
                Debt-to-Income Ratio
              </span>
              <span className={`text-lg font-bold ${getDtiColor(results.dti)}`}>
                {results.dti}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  results.dti < 28
                    ? "bg-forest"
                    : results.dti <= 36
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(results.dti, 50) * 2}%` }}
              />
            </div>
            <p className="text-xs text-charcoal-light mt-2">
              {results.dti < 28
                ? "Great! Your DTI is within the recommended range."
                : results.dti <= 36
                ? "Your DTI is moderate. Consider reducing debts."
                : "Your DTI is high. Lenders may require a lower ratio."}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/buy"
            className="block w-full text-center bg-gold hover:bg-gold/90 text-navy font-semibold py-3 px-6 rounded-xl transition"
          >
            Find Homes in Your Budget
          </Link>
        </div>
      </div>
    </div>
  );
}
