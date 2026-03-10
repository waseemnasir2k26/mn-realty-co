import type { Metadata } from "next";
import { AGENTS } from "@/lib/constants";
import AgentCard from "@/components/shared/AgentCard";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Agents",
};

export default function AgentsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-dark py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our Expert Agents
          </h1>
          <p className="text-lg text-white/60 mt-4">
            13 dedicated professionals serving communities across Minnesota
          </p>
        </div>
      </section>

      {/* Featured Agent */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Left - Avatar Card */}
            <div className="md:col-span-2">
              <div className="bg-navy rounded-2xl p-8 flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full bg-gold flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JL</span>
                </div>
                <p className="text-white font-heading text-xl font-bold mt-4">
                  {AGENTS[0].name}
                </p>
                <p className="text-white/60 text-sm">{AGENTS[0].title}</p>
                {AGENTS[0].credentials && (
                  <p className="text-gold text-xs mt-1">
                    {AGENTS[0].credentials}
                  </p>
                )}
              </div>
            </div>

            {/* Right - Info */}
            <div className="md:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-navy">
                Meet Our Broker
              </h2>
              <p className="text-charcoal-light mt-3 leading-relaxed text-sm">
                {AGENTS[0].bio
                  ? AGENTS[0].bio.substring(0, 250) + "..."
                  : ""}
              </p>

              {AGENTS[0].serviceAreas && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {AGENTS[0].serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-cream text-xs px-3 py-1 rounded-full text-charcoal-light"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-4">
                <a
                  href={`tel:${AGENTS[0].phone.replace(/[^\d+]/g, "")}`}
                  className="text-sm text-navy hover:text-gold flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {AGENTS[0].phone}
                </a>
                <a
                  href={`mailto:${AGENTS[0].email}`}
                  className="text-sm text-navy hover:text-gold flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {AGENTS[0].email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-gray-100" />
      </div>

      {/* All Agents Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-navy text-center mb-10">
            The Full Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
