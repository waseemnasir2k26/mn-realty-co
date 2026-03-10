import Link from "next/link";
import { COMPANY } from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Buy a Home", href: "/buy" },
  { label: "Sell Your Home", href: "/sell" },
  { label: "Our Agents", href: "/agents" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "ListingTracker\u2122",
  "OfferTracker\u00AE",
  "ClosingTracker\u00AE",
  "Home Valuation",
  "Buyer Resources",
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Service", href: "/terms" },
  { label: "EULA", href: "/eula" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-400">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">
              {COMPANY.shortName}
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              {COMPANY.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              {COMPANY.address}
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Us */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="text-sm">{COMPANY.address}</li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm transition-colors duration-200 hover:text-gold-light"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="text-sm transition-colors duration-200 hover:text-gold-light"
                >
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Copyright */}
            <p className="text-center text-xs">
              &copy; 2026 | Minnesota Realty Company, LLC | Proudly Serving
              Minnesota
            </p>

            {/* Legal Links */}
            <ul className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-200 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="ml-4 hidden text-white/20 sm:inline">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Equal Housing Opportunity */}
          <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
            Equal Housing Opportunity. All information deemed reliable but not
            guaranteed and should be independently verified. All properties are
            subject to prior sale, change, or withdrawal.
          </p>
        </div>
      </div>
    </footer>
  );
}
