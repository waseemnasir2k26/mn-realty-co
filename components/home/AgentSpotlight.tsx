"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import AgentCard from "@/components/shared/AgentCard";
import { AGENTS } from "@/lib/constants";

export default function AgentSpotlight() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meet Our Agents"
          subtitle="13 dedicated professionals serving communities across Minnesota"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
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
  );
}
