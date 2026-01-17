export interface PageCard {
  id: string;
  image: string;
  link: string;
}

export interface BioPage {
  id?: string;
  slug: string;
  name: string;
  photo: string;
  description: string;
  ctaText: string;
  cards: PageCard[];
  createdAt: string;
  updatedAt: string;
}
