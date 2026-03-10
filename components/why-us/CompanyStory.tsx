"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";
import { AGENTS } from "@/lib/constants";

export default function CompanyStory() {
  const joseph = AGENTS[0];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Our Story" />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Photo Placeholder */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-gold to-gold-dark h-96 flex flex-col items-center justify-center">
              <User className="w-20 h-20 text-white/60" />
              <p className="text-white font-heading text-xl font-bold mt-4">
                Joseph Lawler
              </p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="border-l-4 border-gold pl-6">
              <p className="text-charcoal-light text-lg leading-relaxed">
                {joseph.bio}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <p className="text-charcoal">
                  <strong className="text-navy">Army Ranger Veteran</strong> --
                  4 deployments to Iraq and Afghanistan (2008-2012)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <p className="text-charcoal">
                  <strong className="text-navy">Rochester Native</strong> --
                  Rochester Mayo High School, Class of 2002
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <p className="text-charcoal">
                  <strong className="text-navy">Education</strong> -- Arizona
                  State University & American Military University -- Business
                  Administration & Web Publishing
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <p className="text-charcoal">
                  <strong className="text-navy">Family Man</strong> -- Lives in
                  Hastings, MN with wife Sara and three children: Max, Reese,
                  and Lainey
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <p className="text-charcoal">
                  <strong className="text-navy">Licensed Since 2007</strong>
                </p>
              </div>
            </div>

            {joseph.serviceAreas && (
              <div className="mt-8">
                <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-3">
                  Service Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {joseph.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-cream text-charcoal text-sm px-3 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
