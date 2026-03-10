"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

interface Agent {
  name: string;
  title: string;
  credentials?: string;
  area: string;
  phone: string;
  email: string;
  slug: string;
}

interface AgentCardProps {
  agent: Agent;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mx-auto">
        <span className="text-white text-xl font-bold">
          {getInitials(agent.name)}
        </span>
      </div>

      {/* Name & Title */}
      <h3 className="font-heading text-lg font-bold text-navy text-center mt-4">
        {agent.name}
      </h3>
      <p className="text-sm text-charcoal-light text-center">{agent.title}</p>
      {agent.credentials && (
        <p className="text-xs text-gold text-center mt-1">
          {agent.credentials}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-gray-100 my-4" />

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-charcoal-light">
          <MapPin className="w-4 h-4 text-gold shrink-0" />
          <span>{agent.area}</span>
        </div>

        <a
          href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
          className="flex items-center gap-2 text-sm text-charcoal-light hover:text-gold transition-colors"
        >
          <Phone className="w-4 h-4 text-gold shrink-0" />
          <span>{agent.phone}</span>
        </a>

        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 text-sm text-charcoal-light hover:text-gold transition-colors"
        >
          <Mail className="w-4 h-4 text-gold shrink-0" />
          <span className="truncate">{agent.email}</span>
        </a>
      </div>
    </motion.div>
  );
}
