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

interface StoredUser extends User {
  password: string;
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

const SESSION_KEY = "mn-realty-session";
const USERS_KEY = "mn-realty-users";

/* ── Helpers ── */

function getAllUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAllUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, userId);
}

function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function toPublicUser(stored: StoredUser): User {
  const { password: _pw, ...user } = stored;
  return user;
}

/* ── Public API ── */

export function getUser(): User | null {
  const sessionId = getSessionId();
  if (!sessionId) return null;
  const users = getAllUsers();
  const found = users.find((u) => u.id === sessionId);
  return found ? toPublicUser(found) : null;
}

export function saveUser(user: User): void {
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx > -1) {
    const stored = users[idx];
    users[idx] = { ...user, password: stored.password };
    saveAllUsers(users);
  }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function registerUser(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: "buyer" | "seller" | "agent";
}): User | { error: string } {
  const users = getAllUsers();

  // Check for duplicate email
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { error: "An account with this email already exists. Please sign in." };
  }

  const stored: StoredUser = {
    id: crypto.randomUUID(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: data.role,
    password: data.password,
    createdAt: new Date().toISOString(),
    savedListings: [],
    bids: [],
    submissions: [],
  };

  users.push(stored);
  saveAllUsers(users);
  setSession(stored.id);
  return toPublicUser(stored);
}

export function loginUser(
  email: string,
  password: string
): User | { error: string } {
  const users = getAllUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!found) {
    return { error: "No account found with that email. Please register first." };
  }

  if (found.password !== password) {
    return { error: "Incorrect password. Please try again." };
  }

  setSession(found.id);
  return toPublicUser(found);
}

export function addBid(
  listingId: string,
  amount: number,
  message: string
): Bid {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Not authenticated");
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === sessionId);
  if (idx === -1) throw new Error("Not authenticated");

  const bid: Bid = {
    id: crypto.randomUUID(),
    listingId,
    amount,
    message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  users[idx].bids.push(bid);
  saveAllUsers(users);
  return bid;
}

export function addSubmission(
  listing: Omit<UserListing, "id" | "status" | "createdAt">
): UserListing {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Not authenticated");
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === sessionId);
  if (idx === -1) throw new Error("Not authenticated");

  const submission: UserListing = {
    ...listing,
    id: crypto.randomUUID(),
    status: "pending-review",
    createdAt: new Date().toISOString(),
  };
  users[idx].submissions.push(submission);
  saveAllUsers(users);
  return submission;
}

export function toggleSavedListing(listingId: string): boolean {
  const sessionId = getSessionId();
  if (!sessionId) return false;
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.id === sessionId);
  if (idx === -1) return false;

  const savedIdx = users[idx].savedListings.indexOf(listingId);
  if (savedIdx > -1) {
    users[idx].savedListings.splice(savedIdx, 1);
  } else {
    users[idx].savedListings.push(listingId);
  }
  saveAllUsers(users);
  return users[idx].savedListings.includes(listingId);
}
