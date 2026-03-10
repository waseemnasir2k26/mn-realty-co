"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/shared/SectionHeading";
import { CheckCircle } from "lucide-react";

interface FormData {
  // Step 1
  address: string;
  propertyType: string;
  yearBuilt: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  // Step 2
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
  "rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all duration-200";

const labelClasses = "block text-sm font-semibold text-navy mb-1";

export default function SellerForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { number: 1, label: "Property Info" },
    { number: 2, label: "Your Details" },
    { number: 3, label: "Confirm" },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <section id="seller-form" className="bg-cream py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Get Started in 3 Simple Steps" />

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mt-12 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-forest text-white"
                      : currentStep === step.number
                        ? "bg-gold text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs text-charcoal-light mt-2 whitespace-nowrap">
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 transition-all duration-300 ${
                    currentStep > step.number ? "bg-forest" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                className="space-y-5"
              >
                <div>
                  <label className={labelClasses}>Property Address</label>
                  <input
                    type="text"
                    placeholder="Enter your property address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={`${inputClasses} text-lg`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Type of Property</label>
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

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
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
                    onChange={(e) =>
                      updateField("timeline", e.target.value)
                    }
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

            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              >
                <h3 className="font-heading text-xl font-bold text-navy mb-6">
                  Review Your Information
                </h3>

                <div className="space-y-6">
                  {/* Property Info Summary */}
                  <div className="bg-cream rounded-xl p-6">
                    <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-3">
                      Property Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-charcoal-light">Address:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.address || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Type:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.propertyType || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Year Built:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.yearBuilt || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Bedrooms:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.bedrooms || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Bathrooms:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.bathrooms || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Sq/ft:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.sqft || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Summary */}
                  <div className="bg-cream rounded-xl p-6">
                    <h4 className="font-semibold text-navy text-sm uppercase tracking-wider mb-3">
                      Your Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-charcoal-light">Name:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Email:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.email || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Phone:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.phone || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Contact via:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.contactMethod || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">Timeline:</span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.timeline || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">
                          Buying another:
                        </span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.buyingAnother || "Not provided"}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-light">
                          Met with lender:
                        </span>{" "}
                        <span className="text-charcoal font-medium">
                          {formData.metWithLender || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 rounded-full border border-gray-300 text-charcoal font-semibold text-sm hover:border-navy hover:text-navy transition-all duration-300"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-dark transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-full bg-gold text-white font-semibold text-sm hover:bg-gold-dark transition-all duration-300"
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
