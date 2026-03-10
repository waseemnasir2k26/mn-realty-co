"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Gavel,
  Home,
  Heart,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import {
  type User,
  type Bid,
  type UserListing,
  addSubmission as addSubmissionFn,
  getUser as getLatestUser,
} from "@/lib/auth";
import { LISTINGS, formatPrice } from "@/lib/listings";

type Tab = "overview" | "bids" | "listings" | "submit" | "saved";

const TABS: { key: Tab; label: string; icon: typeof BarChart3 }[] = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "bids", label: "My Bids", icon: Gavel },
  { key: "listings", label: "My Listings", icon: Home },
  { key: "submit", label: "Submit Listing", icon: PlusCircle },
  { key: "saved", label: "Saved", icon: Heart },
];

function StatusBadge({
  status,
}: {
  status: Bid["status"] | UserListing["status"];
}) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
    accepted: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Accepted",
    },
    rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    outbid: { bg: "bg-orange-100", text: "text-orange-800", label: "Outbid" },
    "pending-review": {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Pending Review",
    },
    active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
    sold: { bg: "bg-gray-100", text: "text-gray-600", label: "Sold" },
  };
  const c = config[status] || config.pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Overview Tab ───────────────────────────────────────────────── */
function OverviewTab({ user }: { user: User }) {
  const stats = [
    {
      label: "Total Bids",
      value: user.bids.length,
      icon: Gavel,
      color: "text-gold",
    },
    {
      label: "Active Listings",
      value: user.submissions.filter((s) => s.status === "active").length,
      icon: Home,
      color: "text-forest",
    },
    {
      label: "Saved Properties",
      value: user.savedListings.length,
      icon: Heart,
      color: "text-red-500",
    },
    {
      label: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      icon: Clock,
      color: "text-navy",
    },
  ];

  // Combine bids and submissions into a recent activity list
  const activities: { text: string; date: string; type: string }[] = [];
  user.bids.forEach((b) => {
    const listing = LISTINGS.find((l) => l.id === b.listingId);
    activities.push({
      text: `Placed a ${formatPrice(b.amount)} bid on ${listing?.address || "a listing"}`,
      date: b.createdAt,
      type: "bid",
    });
  });
  user.submissions.forEach((s) => {
    activities.push({
      text: `Submitted listing at ${s.address}, ${s.city}`,
      date: s.createdAt,
      type: "listing",
    });
  });
  activities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cream">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-charcoal-light font-medium uppercase tracking-wide">
                    {s.label}
                  </p>
                  <p className="text-xl font-bold text-navy">{s.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-heading text-lg font-bold text-navy mb-4">
          Recent Activity
        </h3>
        {activities.length === 0 ? (
          <p className="text-sm text-charcoal-light">
            No activity yet. Start browsing listings or submit your own!
          </p>
        ) : (
          <div className="space-y-3">
            {activities.slice(0, 8).map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0"
              >
                <div
                  className={`mt-0.5 p-1.5 rounded-full ${a.type === "bid" ? "bg-gold/10" : "bg-forest/10"}`}
                >
                  {a.type === "bid" ? (
                    <Gavel className="h-3.5 w-3.5 text-gold" />
                  ) : (
                    <Home className="h-3.5 w-3.5 text-forest" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-charcoal">{a.text}</p>
                  <p className="text-xs text-charcoal-light mt-0.5">
                    {formatDate(a.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── My Bids Tab ────────────────────────────────────────────────── */
function BidsTab({ user }: { user: User }) {
  if (user.bids.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 shadow-sm text-center">
        <Gavel className="h-12 w-12 text-charcoal-light/30 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-bold text-navy mb-2">
          No Bids Yet
        </h3>
        <p className="text-sm text-charcoal-light mb-6">
          You haven&apos;t placed any bids yet. Browse listings to get started.
        </p>
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors"
        >
          Browse Listings <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {user.bids.map((bid) => {
        const listing = LISTINGS.find((l) => l.id === bid.listingId);
        return (
          <div
            key={bid.id}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-navy text-sm">
                {listing?.address || "Unknown Listing"},{" "}
                {listing?.city || ""}
              </p>
              <p className="text-xs text-charcoal-light mt-0.5">
                Bid placed {formatDate(bid.createdAt)}
              </p>
              {bid.message && (
                <p className="text-xs text-charcoal-light mt-1 italic">
                  &ldquo;{bid.message}&rdquo;
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-bold text-navy">
                {formatPrice(bid.amount)}
              </p>
              <StatusBadge status={bid.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── My Listings Tab ────────────────────────────────────────────── */
function ListingsTab({ user }: { user: User }) {
  if (user.submissions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 shadow-sm text-center">
        <Home className="h-12 w-12 text-charcoal-light/30 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-bold text-navy mb-2">
          No Listings Yet
        </h3>
        <p className="text-sm text-charcoal-light">
          You haven&apos;t submitted any listings. Use the &ldquo;Submit
          Listing&rdquo; tab to add your property.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {user.submissions.map((listing) => (
        <div
          key={listing.id}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
        >
          {listing.image && (
            <div className="relative h-40 bg-cream">
              <Image
                src={listing.image}
                alt={listing.address}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-semibold text-navy text-sm">
                {listing.address}
              </p>
              <StatusBadge status={listing.status} />
            </div>
            <p className="text-xs text-charcoal-light">
              {listing.city}, {listing.state} {listing.zip}
            </p>
            <p className="text-lg font-bold text-gold mt-2">
              {formatPrice(listing.price)}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-charcoal-light">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" /> {listing.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" /> {listing.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />{" "}
                {listing.sqft.toLocaleString()} sqft
              </span>
            </div>
            <p className="text-xs text-charcoal-light mt-2">
              Submitted {formatDate(listing.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Submit Listing Tab ─────────────────────────────────────────── */
function SubmitListingTab({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "MN",
    zip: "",
    price: "",
    beds: "3",
    baths: "2",
    sqft: "",
    type: "single-family" as "single-family" | "multi-family",
    description: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.address ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.price ||
      !form.sqft ||
      !form.description
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      addSubmissionFn({
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        price: Number(form.price),
        beds: Number(form.beds),
        baths: Number(form.baths),
        sqft: Number(form.sqft),
        type: form.type,
        description: form.description,
        image: form.image || undefined,
      });

      // Sync updated user from localStorage to React context
      const updated = getLatestUser();
      if (updated) setUser(updated);

      setSuccess(true);
      setForm({
        address: "",
        city: "",
        state: "MN",
        zip: "",
        price: "",
        beds: "3",
        baths: "2",
        sqft: "",
        type: "single-family",
        description: "",
        image: "",
      });

      setTimeout(() => {
        setSuccess(false);
        onSuccess();
      }, 2000);
    } catch {
      setError("Failed to submit listing. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm max-w-2xl">
      <h3 className="font-heading text-lg font-bold text-navy mb-1">
        Submit a New Listing
      </h3>
      <p className="text-sm text-charcoal-light mb-6">
        Fill out the details below. Your listing will be reviewed before going
        live.
      </p>

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Listing submitted successfully! It will be reviewed shortly.
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Address *
          </label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main Street"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              City *
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Hastings"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              State *
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="MN"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              ZIP *
            </label>
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="55033"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Asking Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-light text-sm">
              $
            </span>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="350000"
              className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Beds, Baths, Sqft */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Beds
            </label>
            <select
              name="beds"
              value={form.beds}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors bg-white"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Baths
            </label>
            <select
              name="baths"
              value={form.baths}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors bg-white"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Sqft *
            </label>
            <input
              name="sqft"
              type="number"
              value={form.sqft}
              onChange={handleChange}
              placeholder="1800"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Property Type
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "single-family" })}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                form.type === "single-family"
                  ? "border-gold bg-gold/5 text-gold"
                  : "border-gray-200 text-charcoal hover:border-gray-300"
              }`}
            >
              Single Family
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "multi-family" })}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                form.type === "multi-family"
                  ? "border-gold bg-gold/5 text-gold"
                  : "border-gray-200 text-charcoal hover:border-gray-300"
              }`}
            >
              Multi Family
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your property..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Image URL{" "}
            <span className="text-charcoal-light font-normal">(optional)</span>
          </label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-gold text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors duration-200"
        >
          Submit Listing for Review
        </button>
      </form>
    </div>
  );
}

/* ─── Saved Tab ──────────────────────────────────────────────────── */
function SavedTab({ user }: { user: User }) {
  const saved = LISTINGS.filter((l) => user.savedListings.includes(l.id));

  if (saved.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 shadow-sm text-center">
        <Heart className="h-12 w-12 text-charcoal-light/30 mx-auto mb-4" />
        <h3 className="font-heading text-lg font-bold text-navy mb-2">
          No Saved Properties
        </h3>
        <p className="text-sm text-charcoal-light mb-6">
          Save listings you love to keep track of them here.
        </p>
        <Link
          href="/buy"
          className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors"
        >
          Browse Listings <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {saved.map((listing) => (
        <Link
          key={listing.id}
          href={`/buy/${listing.id}`}
          className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
        >
          <div className="relative h-44 bg-cream">
            <Image
              src={listing.image}
              alt={listing.address}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {listing.badge && (
              <span className="absolute top-3 left-3 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {listing.badge}
              </span>
            )}
          </div>
          <div className="p-4">
            <p className="text-lg font-bold text-gold">
              {formatPrice(listing.price)}
            </p>
            <p className="font-semibold text-navy text-sm mt-1">
              {listing.address}
            </p>
            <p className="text-xs text-charcoal-light">
              {listing.city}, {listing.state} {listing.zip}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-charcoal-light">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" /> {listing.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" /> {listing.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />{" "}
                {listing.sqft.toLocaleString()} sqft
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ─── Dashboard Page ─────────────────────────────────────────────── */
export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    document.title = "Dashboard | MN Realty Co.";
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse text-charcoal-light">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-navy-dark pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-white">
                Welcome back, {user.firstName}!
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full capitalize">
                  {user.role}
                </span>
                <span className="text-sm text-white/60">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="py-12 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-navy text-white shadow-sm"
                      : "bg-white text-charcoal border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === "overview" && <OverviewTab user={user} />}
          {activeTab === "bids" && <BidsTab user={user} />}
          {activeTab === "listings" && <ListingsTab user={user} />}
          {activeTab === "submit" && (
            <SubmitListingTab
              onSuccess={() => setActiveTab("listings")}
            />
          )}
          {activeTab === "saved" && <SavedTab user={user} />}
        </div>
      </div>
    </>
  );
}
