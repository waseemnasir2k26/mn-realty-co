"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/lib/constants";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close dropdown on click outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Close dropdown on route change */
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-heading text-xl font-bold transition-colors duration-300 ${
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
                  className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-gold"
                      : scrolled
                        ? "text-charcoal hover:text-gold"
                        : "text-white hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Phone + Auth (Desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-charcoal hover:text-gold"
                  : "text-white hover:text-gold"
              }`}
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center hover:bg-gold-dark transition-colors"
                  aria-label="Account menu"
                >
                  {user.firstName.charAt(0).toUpperCase()}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-cream transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-cream transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-charcoal hover:text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors lg:hidden ${
              scrolled
                ? "text-charcoal hover:text-navy"
                : "text-white hover:text-white/80"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-gold"
                      : "text-navy hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Phone in mobile menu */}
              <div className="mt-2 border-t border-gray-100 pt-4 px-4">
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 py-3 text-base font-medium text-navy hover:text-gold transition-colors"
                >
                  <Phone className="h-5 w-5 text-gold" />
                  {COMPANY.phone}
                </a>
              </div>

              {/* Auth in mobile menu */}
              <div className="border-t border-gray-100 pt-2 px-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 py-3 text-base font-medium text-navy hover:text-gold transition-colors"
                    >
                      <LayoutDashboard className="h-5 w-5 text-gold" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center gap-3 py-3 text-base font-medium text-navy hover:text-gold transition-colors w-full text-left"
                    >
                      <LogOut className="h-5 w-5 text-gold" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 py-3 text-base font-medium text-navy hover:text-gold transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
