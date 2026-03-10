"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you for reaching out! We'll get back to you as soon as possible."
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="font-heading text-2xl font-bold text-navy mb-6">
        Send Us a Message
      </h2>

      {/* Name Fields - 2 Column */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-charcoal mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-charcoal mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-charcoal mb-1"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-charcoal mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="rounded-lg border border-gray-300 p-3 w-full focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all resize-none"
          placeholder="How can we help you?"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-gold text-white rounded-full px-8 py-3 font-semibold uppercase tracking-wider w-full hover:bg-gold-dark transition-colors cursor-pointer"
      >
        Send Message
      </button>
    </motion.form>
  );
}
