import { Metadata } from "next";
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
      <SellerForm />
      <PlatformsShowcase />
    </main>
  );
}
