import { Metadata } from "next";
import SellHero from "@/components/sell/SellHero";
import SellerBenefits from "@/components/sell/SellerBenefits";
import SellerForm from "@/components/sell/SellerForm";
import PlatformsShowcase from "@/components/sell/PlatformsShowcase";

export const metadata: Metadata = {
  title: "Sell Your Home | MN Realty Co.",
  description:
    "Get top dollar for your Minnesota home with MN Realty Co. Enjoy 360 virtual tours, drone photography, free radon tests, and cutting-edge marketing tools.",
};

export default function SellPage() {
  return (
    <main>
      <SellHero />
      <SellerBenefits />
      <SellerForm />
      <PlatformsShowcase />
    </main>
  );
}
