export interface Agent {
  name: string;
  title: string;
  credentials: string;
  area: string;
  phone: string;
  email: string;
  photo: string;
  slug: string;
  featured: boolean;
  bio?: string;
  serviceAreas?: string[];
  licensedSince?: number;
}

export interface SellerBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface Platform {
  name: string;
  description: string;
}

export interface TrustStat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}
