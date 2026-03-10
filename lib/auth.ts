export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "buyer" | "seller" | "agent";
  createdAt: string;
  savedListings: string[];
  bids: Bid[];
  submissions: UserListing[];
}

export interface Bid {
  id: string;
  listingId: string;
  amount: number;
  message: string;
  status: "pending" | "accepted" | "rejected" | "outbid";
  createdAt: string;
}

export interface UserListing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: "single-family" | "multi-family";
  description: string;
  status: "pending-review" | "active" | "sold";
  createdAt: string;
  image?: string;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("mn-realty-user");
  return data ? JSON.parse(data) : null;
}

export function saveUser(user: User): void {
  localStorage.setItem("mn-realty-user", JSON.stringify(user));
}

export function logout(): void {
  localStorage.removeItem("mn-realty-user");
}

export function registerUser(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: "buyer" | "seller" | "agent";
}): User {
  const user: User = {
    id: crypto.randomUUID(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: data.role,
    createdAt: new Date().toISOString(),
    savedListings: [],
    bids: [],
    submissions: [],
  };
  saveUser(user);
  return user;
}

export function loginUser(email: string): User | null {
  // In a real app this would validate against a backend
  // For demo, check if user exists in localStorage
  const existing = getUser();
  if (existing && existing.email === email) return existing;
  return null;
}

export function addBid(
  listingId: string,
  amount: number,
  message: string
): Bid {
  const user = getUser();
  if (!user) throw new Error("Not authenticated");
  const bid: Bid = {
    id: crypto.randomUUID(),
    listingId,
    amount,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  user.bids.push(bid);
  saveUser(user);
  return bid;
}

export function addSubmission(
  listing: Omit<UserListing, "id" | "status" | "createdAt">
): UserListing {
  const user = getUser();
  if (!user) throw new Error("Not authenticated");
  const submission: UserListing = {
    ...listing,
    id: crypto.randomUUID(),
    status: "pending-review",
    createdAt: new Date().toISOString(),
  };
  user.submissions.push(submission);
  saveUser(user);
  return submission;
}

export function toggleSavedListing(listingId: string): void {
  const user = getUser();
  if (!user) return;
  const index = user.savedListings.indexOf(listingId);
  if (index > -1) {
    user.savedListings.splice(index, 1);
  } else {
    user.savedListings.push(listingId);
  }
  saveUser(user);
}
