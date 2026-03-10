import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { MapPin, Mail, Phone, Clock, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-dark py-32 md:py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Get In Touch
          </h1>
          <p className="text-lg text-white/60 mt-4">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column - Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Right Column - Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Office Card */}
              <div className="bg-cream rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-navy mb-4">
                  Our Office
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <p className="text-sm text-charcoal-light">
                      {COMPANY.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm text-charcoal-light hover:text-gold transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <a
                      href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                      className="text-sm text-charcoal-light hover:text-gold transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <p className="text-sm text-charcoal-light">
                      Mon&ndash;Fri: 9am&ndash;6pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Us Card */}
              <div className="bg-navy rounded-2xl p-6 text-center">
                <MessageSquare className="w-8 h-8 text-gold mx-auto" />
                <p className="text-white font-semibold mt-3">
                  Prefer to Text?
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Send us a message anytime
                </p>
                <a
                  href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
                  className="text-gold text-xl font-bold mt-2 block hover:text-gold-light transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
