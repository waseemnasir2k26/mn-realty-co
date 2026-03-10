"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/listings";

interface MortgageCalculatorProps {
  price: number;
}

export default function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const { monthlyPayment, downPayment, loanAmount } = useMemo(() => {
    const dp = price * downPaymentPercent / 100;
    const loan = price - dp;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return {
        monthlyPayment: loan / numberOfPayments,
        downPayment: dp,
        loanAmount: loan,
      };
    }

    const mp =
      loan *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return {
      monthlyPayment: mp,
      downPayment: dp,
      loanAmount: loan,
    };
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="font-heading text-lg font-bold text-navy mb-4">
        Mortgage Calculator
      </h3>

      <div className="space-y-4">
        {/* Home Price */}
        <div>
          <label className="block text-sm text-charcoal-light mb-1">
            Home Price
          </label>
          <p className="text-2xl font-bold text-navy">{formatPrice(price)}</p>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm text-charcoal-light mb-1">
            Down Payment
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={downPaymentPercent}
              onChange={(e) =>
                setDownPaymentPercent(
                  Math.max(0, Math.min(100, Number(e.target.value)))
                )
              }
              className="w-20 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
            <span className="text-sm text-charcoal-light">%</span>
          </div>
          <p className="text-xs text-charcoal-light mt-1">
            {formatCurrency(downPayment)}
          </p>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm text-charcoal-light mb-1">
            Interest Rate
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step={0.1}
              value={interestRate}
              onChange={(e) =>
                setInterestRate(Math.max(0, Number(e.target.value)))
              }
              className="w-20 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
            <span className="text-sm text-charcoal-light">%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm text-charcoal-light mb-1">
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          >
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>
      </div>

      {/* Result */}
      <div className="bg-cream rounded-xl p-4 mt-4">
        <p className="text-sm text-charcoal-light">
          Estimated Monthly Payment
        </p>
        <p className="text-3xl font-bold text-navy mt-1">
          {formatCurrency(monthlyPayment)}
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-charcoal-light">
            Principal &amp; Interest: {formatCurrency(monthlyPayment)}
          </p>
          <p className="text-xs text-charcoal-light">
            Down Payment: {formatCurrency(downPayment)} ({downPaymentPercent}%)
          </p>
        </div>
      </div>
    </div>
  );
}
