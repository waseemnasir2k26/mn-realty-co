import type { Metadata } from "next";
import { AGENTS } from "@/lib/constants";
import AgentCard from "@/components/shared/AgentCard";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Agents",
  description:
    "Meet our team of expert real estate agents serving greater Minnesota.",
};

export default function AgentsPage() {
  const featuredAgent = AGENTS.find((agent) => agent.featured);
  const otherAgents = AGENTS.filter((agent) => !agent.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="h-[40vh] bg-gradient-to-b from-navy-dark to-navy flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl text-white">
            Our Expert Agents
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            13 dedicated professionals serving communities across Minnesota
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Agent - Joseph Lawler */}
          {featuredAgent && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left - Avatar */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gold text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                    JL
                  </div>
                </div>

                {/* Right - Info */}
                <div>
                  <h2 className="font-heading text-3xl font-bold text-navy">
                    {featuredAgent.name}
                  </h2>
                  <p className="text-gold font-semibold text-lg mt-1">
                    {featuredAgent.title}
                  </p>
                  {featuredAgent.credentials && (
                    <p className="text-charcoal-light text-sm mt-1">
                      {featuredAgent.credentials}
                    </p>
                  )}

                  {featuredAgent.bio && (
                    <p className="text-charcoal-light mt-4 leading-relaxed">
                      {featuredAgent.bio}
                    </p>
                  )}

                  {/* Service Areas */}
                  {featuredAgent.serviceAreas && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-charcoal mb-2">
                        Service Areas:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {featuredAgent.serviceAreas.map((area) => (
                          <span
                            key={area}
                            className="bg-cream text-charcoal text-xs px-3 py-1 rounded-full border border-gold/30"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Links */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <a
                      href={`tel:${featuredAgent.phone}`}
                      className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      {featuredAgent.phone}
                    </a>
                    <a
                      href={`mailto:${featuredAgent.email}`}
                      className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors font-medium"
                    >
                      <Mail className="w-4 h-4" />
                      {featuredAgent.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gold Divider */}
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-16" />

          {/* Agent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {otherAgents.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
