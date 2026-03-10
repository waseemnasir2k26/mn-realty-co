"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Company Name */}
          <Link
            href="/"
            className={`font-heading text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            {COMPANY.shortName}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                    scrolled
                      ? isActive(link.href)
                        ? "text-gold"
                        : "text-navy hover:text-gold"
                      : isActive(link.href)
                        ? "text-gold-light"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active / hover underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone Number (Desktop) */}
          <a
            href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors duration-300 lg:flex ${
              scrolled
                ? "text-navy hover:text-gold"
                : "text-white hover:text-gold-light"
            }`}
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors duration-300 lg:hidden ${
              scrolled
                ? "text-navy hover:bg-cream"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-white shadow-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-cream text-gold-dark"
                          : "text-navy hover:bg-cream hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Phone in mobile menu */}
              <div className="mt-4 border-t border-cream-dark pt-4">
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold text-navy hover:bg-cream"
                >
                  <Phone className="h-5 w-5 text-gold" />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
