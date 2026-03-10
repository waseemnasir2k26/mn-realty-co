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
  photo?: string;
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8"
    >
      {/* Avatar with Initials */}
      <div className="flex justify-center mb-5">
        <div className="w-24 h-24 rounded-full bg-gold text-white flex items-center justify-center text-2xl font-bold">
          {getInitials(agent.name)}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-heading text-xl font-bold text-navy text-center">
        {agent.name}
      </h3>

      {/* Title & Credentials */}
      <p className="text-charcoal-light text-sm text-center mt-1">
        {agent.title}
        {agent.credentials && ` | ${agent.credentials}`}
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-gold mx-auto my-4 rounded-full" />

      {/* Area */}
      <div className="flex items-center justify-center gap-2 text-charcoal-light text-sm">
        <MapPin className="w-4 h-4 text-gold" />
        <span>{agent.area}</span>
      </div>

      {/* Contact Info */}
      <div className="mt-4 space-y-2">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-gold transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>{agent.phone}</span>
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 text-sm text-charcoal hover:text-gold transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>{agent.email}</span>
        </a>
      </div>
    </motion.div>
  );
}
