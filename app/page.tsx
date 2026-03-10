import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AgentSpotlight from "@/components/home/AgentSpotlight";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import TrustBar from "@/components/home/TrustBar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FeaturedListings />
      <WhyChooseUs />
      <AgentSpotlight />
      <Testimonials />
      <CTABanner />
    </>
  );
}
