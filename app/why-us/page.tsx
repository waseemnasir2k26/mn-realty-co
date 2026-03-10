import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhyUsHero from "@/components/why-us/WhyUsHero";
import CompanyStory from "@/components/why-us/CompanyStory";
import Differentiators from "@/components/why-us/Differentiators";
import JoinTeam from "@/components/why-us/JoinTeam";
import SectionHeading from "@/components/shared/SectionHeading";
import AgentCard from "@/components/shared/AgentCard";
import { AGENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Why MN Realty Co | MN Realty Co.",
  description:
    "Discover why MN Realty Co is the agent-friendly, client-focused real estate company trusted across greater Minnesota.",
};

export default function WhyUsPage() {
  return (
    <main>
      <WhyUsHero />
      <CompanyStory />
      <Differentiators />

      {/* Agents Grid Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Meet Our Expert Agents" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Agents
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <JoinTeam />
    </main>
  );
}
