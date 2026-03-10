import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { MapPin, Mail, Phone, Clock, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Minnesota Realty Company.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="h-[40vh] bg-gradient-to-b from-navy-dark to-navy flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl text-white">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-8">
              {/* Office Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="font-heading text-2xl font-bold text-navy mb-6">
                  Our Office
                </h2>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Address</p>
                      <p className="text-charcoal-light">
                        {COMPANY.address}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="text-charcoal-light hover:text-gold transition-colors"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <a
                        href={`tel:${COMPANY.phone}`}
                        className="text-charcoal-light hover:text-gold transition-colors"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">
                        Office Hours
                      </p>
                      <p className="text-charcoal-light">
                        Mon-Fri: 9am-6pm, Sat: 10am-4pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Us Card */}
              <div className="bg-navy rounded-2xl shadow-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Prefer to Text?
                </h3>
                <p className="text-gray-300 mb-4">
                  Send us a message!
                </p>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-gold text-2xl font-bold hover:text-gold-light transition-colors"
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
