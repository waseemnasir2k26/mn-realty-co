import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Agents", href: "/agents" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "ListingTracker\u2122", href: "" },
  { label: "OfferTracker\u00AE", href: "" },
  { label: "ClosingTracker\u00AE", href: "" },
  { label: "Home Valuation", href: "" },
  { label: "Buyer Resources", href: "" },
  { label: "Net Proceeds Calculator", href: "/sell/roi-calculator" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Company */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {COMPANY.shortName}
            </h3>
            <p className="text-sm mt-2">{COMPANY.tagline}</p>
            <p className="text-sm mt-4">{COMPANY.address}</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label} className="text-sm">
                  {service.href ? (
                    <Link
                      href={service.href}
                      className="hover:text-gold transition-colors"
                    >
                      {service.label}
                    </Link>
                  ) : (
                    service.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 text-sm hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              &copy; 2026 | Minnesota Realty Company, LLC | Proudly Serving
              Minnesota
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link
                href="/privacy"
                className="hover:text-white/80 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>&middot;</span>
              <Link
                href="/terms"
                className="hover:text-white/80 transition-colors"
              >
                Terms of Service
              </Link>
              <span>&middot;</span>
              <Link
                href="/eula"
                className="hover:text-white/80 transition-colors"
              >
                EULA
              </Link>
            </div>
          </div>
          <p className="text-[11px] text-white/30 text-center mt-6">
            Equal Housing Opportunity. All information deemed reliable but not
            guaranteed. Minnesota Realty Company, LLC fully supports the
            principles of the Fair Housing Act and the Equal Opportunity Act.
          </p>
        </div>
      </div>
    </footer>
  );
}
