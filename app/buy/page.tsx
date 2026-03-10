import { Metadata } from "next";
import BuyHero from "@/components/buy/BuyHero";
import ListingsGrid from "@/components/buy/ListingsGrid";
import BrowseByArea from "@/components/buy/BrowseByArea";
import BuyerBenefits from "@/components/buy/BuyerBenefits";

export const metadata: Metadata = {
  title: "Buy a Home",
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
