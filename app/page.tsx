import HeroSection from "@/components/home/HeroSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AgentSpotlight from "@/components/home/AgentSpotlight";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <WhyChooseUs />
      <AgentSpotlight />
      <Testimonials />
      <CTABanner />
    </>
  );
}
