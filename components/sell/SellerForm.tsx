"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

interface FormData {
  address: string;
  propertyType: string;
  yearBuilt: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  timeline: string;
  buyingAnother: string;
  metWithLender: string;
}

const INITIAL_FORM_DATA: FormData = {
  address: "",
  propertyType: "",
  yearBuilt: "",
  bedrooms: "",
  bathrooms: "",
  sqft: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "",
  timeline: "",
  buyingAnother: "",
  metWithLender: "",
};

const inputClasses =
  "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition";

const labelClasses = "block text-sm font-medium text-navy mb-1.5";

const steps = [
  { number: 1, label: "Property Info" },
  { number: 2, label: "Your Details" },
  { number: 3, label: "Review" },
];

export default function SellerForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <section id="seller-form" className="py-20 md:py-28 bg-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Get Started in 3 Steps" />

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-forest text-white"
                      : currentStep === step.number
                        ? "bg-gold text-white"
                        : "bg-gray-200 text-charcoal-light"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs text-charcoal-light mt-1.5">
                  {step.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className={`w-12 sm:w-20 h-px mx-2 -mt-4 ${
                    currentStep > step.number ? "bg-forest" : "bg-gray-200"
                  }`}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {/* Step 1: Property Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <label className={labelClasses}>Property Address</label>
                  <input
                    type="text"
                    placeholder="Enter your property address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={`${inputClasses} !text-base`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        updateField("propertyType", e.target.value)
                      }
                      className={inputClasses}
                    >
                      <option value="">Select type</option>
                      <option value="Single Family">Single Family</option>
                      <option value="Multi Family">Multi Family</option>
                      <option value="Condo">Condo</option>
                      <option value="Townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Year Built</label>
                    <input
                      type="text"
                      placeholder="e.g. 1995"
                      value={formData.yearBuilt}
                      onChange={(e) =>
                        updateField("yearBuilt", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={labelClasses}>Bedrooms</label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) =>
                        updateField("bedrooms", e.target.value)
                      }
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      {["1", "2", "3", "4", "5", "6+"].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Bathrooms</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) =>
                        updateField("bathrooms", e.target.value)
                      }
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      {["1", "2", "3", "4", "5+"].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Approx Sq/ft</label>
                    <input
                      type="text"
                      placeholder="e.g. 2,000"
                      value={formData.sqft}
                      onChange={(e) => updateField("sqft", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Your Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>First Name *</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateField("firstName", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name *</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateField("lastName", e.target.value)
                      }
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.contactMethod}
                    onChange={(e) =>
                      updateField("contactMethod", e.target.value)
                    }
                    className={inputClasses}
                  >
                    <option value="">Select preference</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="Text">Text</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>
                    How soon are you looking to sell?
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="Just curious">Just curious</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>
                      Buying another home?
                    </label>
                    <select
                      value={formData.buyingAnother}
                      onChange={(e) =>
                        updateField("buyingAnother", e.target.value)
                      }
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Met with a lender?
                    </label>
                    <select
                      value={formData.metWithLender}
                      onChange={(e) =>
                        updateField("metWithLender", e.target.value)
                      }
                      className={inputClasses}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not yet">Not yet</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="bg-cream rounded-xl p-5">
                  <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-3">
                    Property Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-charcoal-light">Address:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.address || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Type:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.propertyType || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Year Built:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.yearBuilt || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Bedrooms:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.bedrooms || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Bathrooms:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.bathrooms || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Sq/ft:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.sqft || "\u2014"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-cream rounded-xl p-5">
                  <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-3">
                    Your Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-charcoal-light">Name:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.firstName || formData.lastName
                          ? `${formData.firstName} ${formData.lastName}`.trim()
                          : "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Email:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.email || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Phone:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.phone || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Contact via:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.contactMethod || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">Timeline:</span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.timeline || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">
                        Buying another:
                      </span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.buyingAnother || "\u2014"}
                      </span>
                    </div>
                    <div>
                      <span className="text-charcoal-light">
                        Met with lender:
                      </span>{" "}
                      <span className="text-charcoal font-medium">
                        {formData.metWithLender || "\u2014"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="text-charcoal-light hover:text-navy font-medium text-sm transition"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="bg-gold text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gold-dark transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gold text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-gold-dark transition"
              >
                Schedule Consultation
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
