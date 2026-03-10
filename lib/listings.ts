export interface Listing {
  id: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  type: "single-family" | "multi-family";
  status: "active" | "pending" | "sold";
  badge?: string;
  image: string;
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: string;
  agent: string;
  daysOnMarket: number;
}

export const LISTING_IMAGES = {
  hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop",
  homes: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
  ],
  areas: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  ],
  companyStory:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  sellHero:
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&h=1080&fit=crop",
};

export const LISTINGS: Listing[] = [
  {
    id: "1",
    price: 349900,
    address: "1234 River Bluff Dr",
    city: "Hastings",
    state: "MN",
    zip: "55033",
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: "single-family",
    status: "active",
    badge: "New Listing",
    image: LISTING_IMAGES.homes[0],
    description:
      "Charming 3-bedroom home with stunning river bluff views. Updated kitchen with granite countertops, hardwood floors throughout the main level, and a spacious backyard perfect for entertaining.",
    features: [
      "River views",
      "Updated kitchen",
      "Hardwood floors",
      "2-car garage",
      "Central air",
      "Finished basement",
    ],
    yearBuilt: 2005,
    lotSize: "0.35 acres",
    agent: "Joseph Lawler",
    daysOnMarket: 3,
  },
  {
    id: "2",
    price: 275000,
    address: "567 Oak Street",
    city: "Rochester",
    state: "MN",
    zip: "55901",
    beds: 3,
    baths: 2,
    sqft: 1620,
    type: "single-family",
    status: "active",
    badge: "New Listing",
    image: LISTING_IMAGES.homes[1],
    description:
      "Well-maintained ranch-style home in a quiet Rochester neighborhood. Open floor plan, large master suite, and beautiful landscaped yard. Close to Mayo Clinic and downtown amenities.",
    features: [
      "Ranch style",
      "Open floor plan",
      "Master suite",
      "Landscaped yard",
      "Near Mayo Clinic",
      "New roof 2023",
    ],
    yearBuilt: 1998,
    lotSize: "0.28 acres",
    agent: "David Sawallisch",
    daysOnMarket: 7,
  },
  {
    id: "3",
    price: 425000,
    address: "890 Summit Ave",
    city: "Red Wing",
    state: "MN",
    zip: "55066",
    beds: 4,
    baths: 3,
    sqft: 2740,
    type: "single-family",
    status: "active",
    badge: "New Listing",
    image: LISTING_IMAGES.homes[2],
    description:
      "Stunning 4-bedroom colonial with panoramic views of the Mississippi River valley. Gourmet kitchen, formal dining room, home office, and expansive deck overlooking the bluffs.",
    features: [
      "Mississippi River views",
      "Gourmet kitchen",
      "Home office",
      "Deck",
      "3-car garage",
      "Wine cellar",
    ],
    yearBuilt: 2012,
    lotSize: "0.52 acres",
    agent: "Drew Bauer",
    daysOnMarket: 5,
  },
  {
    id: "4",
    price: 189900,
    address: "321 Prairie Wind Ln",
    city: "Randolph",
    state: "MN",
    zip: "55065",
    beds: 2,
    baths: 1,
    sqft: 1180,
    type: "single-family",
    status: "active",
    badge: "Price Reduced",
    image: LISTING_IMAGES.homes[3],
    description:
      "Cozy starter home with recent updates including new windows, furnace, and water heater. Peaceful country setting with room to grow. Perfect for first-time homebuyers.",
    features: [
      "New windows",
      "New furnace",
      "Country setting",
      "Updated bathroom",
      "Storage shed",
      "Large lot",
    ],
    yearBuilt: 1985,
    lotSize: "0.45 acres",
    agent: "Ashley Gergen",
    daysOnMarket: 21,
  },
  {
    id: "5",
    price: 525000,
    address: "456 Bluff View Rd",
    city: "Prescott",
    state: "WI",
    zip: "54021",
    beds: 5,
    baths: 4,
    sqft: 3400,
    type: "single-family",
    status: "active",
    image: LISTING_IMAGES.homes[4],
    description:
      "Executive 5-bedroom home with walkout basement and heated 3-car garage. Premium finishes throughout, including custom cabinetry, quartz counters, and designer lighting.",
    features: [
      "Walkout basement",
      "Heated garage",
      "Custom cabinetry",
      "Quartz counters",
      "Smart home",
      "In-floor heat",
    ],
    yearBuilt: 2019,
    lotSize: "0.61 acres",
    agent: "Joseph Lawler",
    daysOnMarket: 14,
  },
  {
    id: "6",
    price: 310000,
    address: "789 Cottage Grove Blvd",
    city: "Cottage Grove",
    state: "MN",
    zip: "55016",
    beds: 3,
    baths: 2,
    sqft: 2050,
    type: "single-family",
    status: "active",
    image: LISTING_IMAGES.homes[5],
    description:
      "Move-in ready split-level in desirable Cottage Grove neighborhood. Updated kitchen, new carpet, fresh paint throughout. Great schools and parks nearby.",
    features: [
      "Move-in ready",
      "Updated kitchen",
      "New carpet",
      "Great schools",
      "Parks nearby",
      "Fenced yard",
    ],
    yearBuilt: 2001,
    lotSize: "0.22 acres",
    agent: "Heather Hilgers",
    daysOnMarket: 10,
  },
  {
    id: "7",
    price: 399000,
    address: "1122 Dakota Hills Dr",
    city: "Hastings",
    state: "MN",
    zip: "55033",
    beds: 4,
    baths: 3,
    sqft: 2480,
    type: "single-family",
    status: "pending",
    badge: "Pending",
    image: LISTING_IMAGES.homes[6],
    description:
      "Beautiful two-story in Dakota Hills with open concept living, vaulted ceilings, and stunning sunset views. Large owner's suite with walk-in closet and ensuite bath.",
    features: [
      "Open concept",
      "Vaulted ceilings",
      "Sunset views",
      "Walk-in closet",
      "Ensuite bath",
      "Sprinkler system",
    ],
    yearBuilt: 2015,
    lotSize: "0.31 acres",
    agent: "Mike Slavik",
    daysOnMarket: 8,
  },
  {
    id: "8",
    price: 219900,
    address: "445 Vermillion St",
    city: "Hastings",
    state: "MN",
    zip: "55033",
    beds: 2,
    baths: 2,
    sqft: 1340,
    type: "single-family",
    status: "active",
    image: LISTING_IMAGES.homes[7],
    description:
      "Charming bungalow just blocks from downtown Hastings. Original character with modern updates. Covered front porch, detached garage, and mature trees throughout the lot.",
    features: [
      "Downtown location",
      "Character home",
      "Covered porch",
      "Mature trees",
      "Detached garage",
      "Updated electrical",
    ],
    yearBuilt: 1952,
    lotSize: "0.18 acres",
    agent: "Bryan Deane",
    daysOnMarket: 16,
  },
  {
    id: "9",
    price: 475000,
    address: "2200 Heritage Pkwy",
    city: "Rochester",
    state: "MN",
    zip: "55902",
    beds: 4,
    baths: 3,
    sqft: 3100,
    type: "single-family",
    status: "active",
    badge: "Open House",
    image: LISTING_IMAGES.homes[8],
    description:
      "Spacious 4-bedroom in Rochester's Heritage neighborhood. Chef's kitchen with island, main floor laundry, finished walkout basement with wet bar and family room.",
    features: [
      "Chef's kitchen",
      "Main floor laundry",
      "Wet bar",
      "Walkout basement",
      "Irrigation system",
      "Corner lot",
    ],
    yearBuilt: 2017,
    lotSize: "0.38 acres",
    agent: "Ethan Sawallisch",
    daysOnMarket: 4,
  },
  {
    id: "10",
    price: 359000,
    address: "331 Cannon Valley Dr",
    city: "Cannon Falls",
    state: "MN",
    zip: "55009",
    beds: 3,
    baths: 2,
    sqft: 2200,
    type: "single-family",
    status: "active",
    image: LISTING_IMAGES.homes[9],
    description:
      "Beautiful rambler nestled in the Cannon River valley. Screened porch, main-floor living, and a workshop in the oversized garage. Quiet, friendly neighborhood.",
    features: [
      "Screened porch",
      "Main-floor living",
      "Workshop",
      "Oversized garage",
      "Quiet neighborhood",
      "Energy efficient",
    ],
    yearBuilt: 2008,
    lotSize: "0.42 acres",
    agent: "Ashley Gergen",
    daysOnMarket: 12,
  },
  {
    id: "11",
    price: 385000,
    address: "88 River Bend Ct",
    city: "Hastings",
    state: "MN",
    zip: "55033",
    beds: 6,
    baths: 3,
    sqft: 2800,
    type: "multi-family",
    status: "active",
    badge: "New Listing",
    image: LISTING_IMAGES.homes[10],
    description:
      "Well-maintained duplex in prime Hastings location. Each unit features 3 bedrooms, updated kitchens, and separate utilities. Strong rental history with excellent cash flow.",
    features: [
      "Duplex",
      "Separate utilities",
      "Strong rental history",
      "Updated kitchens",
      "Off-street parking",
      "Storage units",
    ],
    yearBuilt: 1995,
    lotSize: "0.30 acres",
    agent: "Mark Christianson",
    daysOnMarket: 6,
  },
  {
    id: "12",
    price: 650000,
    address: "1500 Olmsted Way",
    city: "Rochester",
    state: "MN",
    zip: "55904",
    beds: 8,
    baths: 4,
    sqft: 4200,
    type: "multi-family",
    status: "active",
    image: LISTING_IMAGES.homes[11],
    description:
      "Four-unit investment property near downtown Rochester. Fully occupied with long-term tenants. New roof, updated HVAC, and professional property management in place.",
    features: [
      "4 units",
      "Fully occupied",
      "New roof",
      "Updated HVAC",
      "Professional management",
      "Near downtown",
    ],
    yearBuilt: 1988,
    lotSize: "0.55 acres",
    agent: "Ethan Sawallisch",
    daysOnMarket: 19,
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function filterListings(
  listings: Listing[],
  filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    search?: string;
  }
): Listing[] {
  return listings.filter((l) => {
    if (filters.type && l.type !== filters.type) return false;
    if (filters.city && l.city !== filters.city) return false;
    if (filters.minPrice && l.price < filters.minPrice) return false;
    if (filters.maxPrice && l.price > filters.maxPrice) return false;
    if (filters.beds && l.beds < filters.beds) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        l.address.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.zip.includes(q) ||
        l.description.toLowerCase().includes(q)
      );
    }
    return true;
  });
}
