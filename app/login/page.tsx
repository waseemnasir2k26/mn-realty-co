"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Sign In | MN Realty Co.";
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    const found = loginUser(email);
    if (found) {
      setUser(found);
      router.push("/dashboard");
    } else {
      setError("No account found with that email. Please register first.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-20 px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-md shadow-sm">
        {/* Logo */}
        <p className="font-heading text-2xl font-bold text-navy text-center">
          MN Realty Co.
        </p>

        {/* Heading */}
        <h1 className="font-heading text-xl font-bold text-navy text-center mt-2">
          Welcome Back
        </h1>
        <p className="text-sm text-charcoal-light text-center mt-1">
          Sign in to access your dashboard
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-light" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-light" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold/30"
            />
            <label
              htmlFor="remember"
              className="text-sm text-charcoal-light"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold text-white py-3 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-charcoal-light text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-gold font-medium hover:text-gold-dark transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
