export type HeroContent = {
  name: string;
  title: string;
  subtitle: string;
  avatarUrl: string;
  calendlyUrl?: string;
  contactCta: string;
  callToAction: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  metrics?: string[];
  tags?: string[];
  imageUrl?: string;
  caseStudyUrl?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  avatar?: string;
  rating?: number;
};

export type Tool = {
  id: string;
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
};

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags?: string[];
  coverImage?: string;
};

export type PortfolioData = {
  about: {
    title: string;
    body: string;
  };
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  tools: Tool[];
  pricing: {
    enabled: boolean;
    plans: PricingPlan[];
  };
  blog: {
    enabled: boolean;
    posts: BlogPost[];
  };
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
};
