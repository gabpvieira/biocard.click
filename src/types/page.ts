export interface PageCard {
  id: string;
  image: string;
  link: string;
}

export type HeaderLayout = 'clean' | 'bold' | 'minimal';
export type CoverType = 'image' | 'solid' | 'pattern';

export interface TagWithIcon {
  text: string;
  icon: string;
}

export interface HeaderConfig {
  layout: HeaderLayout;
  coverType: CoverType;
  coverImage?: string;
  coverColor: string;
  tags: TagWithIcon[];
  showActions: boolean;
}

export interface BioPage {
  id?: string;
  slug: string;
  name: string;
  photo: string;
  description: string;
  ctaText: string;
  cards: PageCard[];
  headerConfig: HeaderConfig;
  createdAt: string;
  updatedAt: string;
}
