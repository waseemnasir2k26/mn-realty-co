import { Metadata } from "next";
import BuyHero from "@/components/buy/BuyHero";
import ListingsGrid from "@/components/buy/ListingsGrid";
import BrowseByArea from "@/components/buy/BrowseByArea";
import BuyerBenefits from "@/components/buy/BuyerBenefits";

export const metadata: Metadata = {
  title: "Buy a Home | MN Realty Co.",
  description:
    "Search hundreds of listings across greater Minnesota. Find single family homes, multi-family properties, and more with MN Realty Co.",
};

export default function BuyPage() {
  return (
    <main>
      <BuyHero />
      <ListingsGrid />
      <BrowseByArea />
      <BuyerBenefits />
    </main>
  );
}
