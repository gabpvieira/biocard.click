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

export interface ThemeColors {
  primary: string;      // Cor principal dos cards e destaques
  accent: string;       // Cor de acento (brilhos, hover)
  background: string;   // Cor de fundo da página
}

// Sistema Tipográfico
export type FontCategory = 'serif' | 'modern' | 'geometric' | 'corporate' | 'creative';
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type FontSize = 'sm' | 'md' | 'lg';

export interface FontConfig {
  family: string;       // Nome da fonte
  weight: FontWeight;
  size?: FontSize;
  letterSpacing?: number; // em pixels
}

export interface TypographyConfig {
  category: FontCategory;
  profileName: FontConfig;
  bio: FontConfig;
  tags: FontConfig;
  buttons: FontConfig;
  cta: FontConfig;
  footer: FontConfig;
}

export interface FontPreset {
  id: string;
  name: string;
  description: string;
  category: FontCategory;
  config: TypographyConfig;
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
  themeColors?: ThemeColors;
  typography?: TypographyConfig;
  createdAt: string;
  updatedAt: string;
}
