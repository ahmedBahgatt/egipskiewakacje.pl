import type {
  BlogPost,
  Destination,
  FaqItem,
  LegalPage,
  Review,
  SiteSettings,
  Tour,
} from "@/content/types";

/** The single content interface the whole frontend reads through. */
export interface ContentApi {
  getSiteSettings(): Promise<SiteSettings>;
  getSiteFaqs(): Promise<FaqItem[]>;
  getReviews(): Promise<Review[]>;
  getDestinations(): Promise<Destination[]>;
  getDestination(slug: string): Promise<Destination | undefined>;
  getTours(): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  getTour(slug: string): Promise<Tour | undefined>;
  getToursByDestination(slug: string): Promise<Tour[]>;
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | undefined>;
  getLegalPages(): Promise<LegalPage[]>;
  getLegalPage(slug: string): Promise<LegalPage | undefined>;
}
