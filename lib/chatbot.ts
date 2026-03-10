export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

interface KnowledgeEntry {
  patterns?: string[];
  response: string;
  quickReplies?: string[];
}

const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
  greeting: {
    patterns: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "start",
      "help",
    ],
    response:
      "Welcome to MN Realty Co! \u{1F44B} I'm your virtual assistant. How can I help you today?",
    quickReplies: [
      "I want to buy a home",
      "I want to sell my home",
      "Talk to an agent",
      "View listings",
    ],
  },
  buying: {
    patterns: [
      "buy",
      "buying",
      "purchase",
      "looking for",
      "find a home",
      "search",
      "listings",
      "view listings",
    ],
    response:
      "Great! We have beautiful properties across Minnesota \u2014 from Hastings to Rochester and everywhere in between. Our agents have first access to listings before they hit Zillow or Realtor.com. What area are you interested in?",
    quickReplies: [
      "Hastings area",
      "Rochester area",
      "Dakota County",
      "Show me all listings",
    ],
  },
  selling: {
    patterns: [
      "sell",
      "selling",
      "list my home",
      "home value",
      "valuation",
      "what is my home worth",
    ],
    response:
      "We'd love to help you sell! MN Realty Co sellers get premium marketing including:\n\n\u2022 360\u00B0 Virtual Tours\n\u2022 HD Drone Photography\n\u2022 Free Pre-Sale Radon Test\n\u2022 Free Moving Truck Rental\n\nWould you like a free home valuation?",
    quickReplies: [
      "Get free valuation",
      "Learn about seller benefits",
      "Talk to an agent",
    ],
  },
  agents: {
    patterns: [
      "agent",
      "realtor",
      "talk to someone",
      "contact",
      "call",
      "phone",
      "talk to an agent",
    ],
    response:
      "We have 13 expert agents serving communities across Minnesota! Our broker, Joseph Lawler, is an Army Ranger veteran who's been helping Minnesota families since 2007.\n\nYou can reach us at:\n\u{1F4DE} (507) 218-7717\n\u{1F4E7} Info@MnRealtyCo.com\n\u{1F4CD} 19500 Goodwin Ave, Hastings, MN 55033",
    quickReplies: ["View all agents", "Call now", "Send a message"],
  },
  areas: {
    patterns: [
      "hastings",
      "rochester",
      "dakota",
      "prescott",
      "red wing",
      "cottage grove",
      "cannon falls",
      "area",
      "location",
      "where",
    ],
    response:
      "We serve communities across greater Minnesota including:\n\n\u2022 Hastings & Southern Dakota County\n\u2022 Rochester & Olmsted County\n\u2022 Twin Cities Metro\n\u2022 Red Wing & Cannon Falls\n\u2022 Prescott, WI\n\u2022 Cottage Grove & Washington County\n\nWhich area interests you most?",
    quickReplies: ["Browse by area", "View listings", "Talk to a local agent"],
  },
  technology: {
    patterns: [
      "technology",
      "listingtracker",
      "offertracker",
      "closingtracker",
      "platform",
      "track",
    ],
    response:
      "We use proprietary technology to keep you informed every step of the way:\n\n\u{1F4CA} ListingTracker\u2122 \u2014 Track your listing's performance in real-time\n\u{1F4CB} OfferTracker\u00AE \u2014 Monitor and compare offers as they come in\n\u2705 ClosingTracker\u00AE \u2014 Stay updated on every milestone to closing day",
    quickReplies: ["Learn more about selling", "Talk to an agent"],
  },
  pricing: {
    patterns: [
      "price",
      "cost",
      "mortgage",
      "afford",
      "payment",
      "calculator",
      "how much",
    ],
    response:
      "Our listings range from $189,900 to $650,000 across Minnesota. We also offer exclusive VIP home financing options for our clients!\n\nWould you like to:\n\u2022 Use our mortgage calculator\n\u2022 Get a free home valuation\n\u2022 Browse listings by price",
    quickReplies: [
      "Mortgage calculator",
      "Browse listings",
      "Get home valuation",
    ],
  },
  valuation: {
    patterns: [
      "valuation",
      "free valuation",
      "what is my home worth",
      "home value",
      "get free valuation",
    ],
    response:
      "I'd be happy to connect you with a free home valuation! Our agents will provide a complimentary walk-through consultation and market analysis.\n\nTo get started, visit our Sell page and fill out the quick form, or call us directly at (507) 218-7717.",
    quickReplies: ["Go to sell page", "Call now", "Ask another question"],
  },
  fallback: {
    response:
      "I'm not sure I understood that. I can help you with:\n\n\u2022 Buying a home in Minnesota\n\u2022 Selling your home\n\u2022 Connecting with an agent\n\u2022 Our technology platforms\n\u2022 Pricing and mortgage info\n\nWhat would you like to know?",
    quickReplies: [
      "I want to buy",
      "I want to sell",
      "Talk to an agent",
      "View listings",
    ],
  },
};

export function generateResponse(userMessage: string): {
  content: string;
  quickReplies?: string[];
} {
  const message = userMessage.toLowerCase().trim();

  for (const [, data] of Object.entries(KNOWLEDGE_BASE)) {
    if ("patterns" in data && data.patterns) {
      for (const pattern of data.patterns) {
        if (message.includes(pattern)) {
          return { content: data.response, quickReplies: data.quickReplies };
        }
      }
    }
  }

  return {
    content: KNOWLEDGE_BASE.fallback.response,
    quickReplies: KNOWLEDGE_BASE.fallback.quickReplies,
  };
}

export function getInitialMessage(): ChatMessage {
  return {
    id: "initial",
    role: "assistant",
    content: KNOWLEDGE_BASE.greeting.response,
    timestamp: new Date(),
    quickReplies: KNOWLEDGE_BASE.greeting.quickReplies,
  };
}
