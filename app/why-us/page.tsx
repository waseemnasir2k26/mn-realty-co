import { Metadata } from "next";
import WhyUsHero from "@/components/why-us/WhyUsHero";
import CompanyStory from "@/components/why-us/CompanyStory";
import Differentiators from "@/components/why-us/Differentiators";
import JoinTeam from "@/components/why-us/JoinTeam";
import SectionHeading from "@/components/shared/SectionHeading";
import AgentCard from "@/components/shared/AgentCard";
import Button from "@/components/shared/Button";
import { AGENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Why MN Realty Co",
};

export default function WhyUsPage() {
  return (
    <main>
      <WhyUsHero />
      <CompanyStory />
      <Differentiators />

      {/* Agents Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Meet Our Expert Agents" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {AGENTS.slice(0, 8).map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" href="/agents">
              View All Agents
            </Button>
          </div>
        </div>
      </section>

      <JoinTeam />
    </main>
  );
}
