import { FontCategory, FontPreset, TypographyConfig } from '@/types/page';

// Mapeamento de fontes por categoria
export const FONT_FAMILIES: Record<FontCategory, string[]> = {
  serif: ['Playfair Display', 'Merriweather', 'Lora'],
  modern: ['Clarkson', 'Nohemi', 'Inter'],
  geometric: ['Poppins', 'Montserrat', 'Outfit'],
  corporate: ['Inter', 'Roboto', 'Open Sans'],
  creative: ['Nohemi', 'Outfit', 'Space Grotesk'],
};

// Presets prontos para uso
export const TYPOGRAPHY_PRESETS: FontPreset[] = [
  {
    id: 'minimal-tech',
    name: 'Minimal Tech',
    description: 'Moderno e limpo com Clarkson',
    category: 'modern',
    config: {
      category: 'modern',
      profileName: { family: 'Clarkson', weight: 'bold', size: 'lg' },
      bio: { family: 'Clarkson', weight: 'regular', size: 'md' },
      tags: { family: 'Clarkson', weight: 'medium', size: 'sm' },
      buttons: { family: 'Clarkson', weight: 'semibold', size: 'md' },
      cta: { family: 'Clarkson', weight: 'medium', size: 'md' },
      footer: { family: 'Clarkson', weight: 'regular', size: 'sm' },
    },
  },
  {
    id: 'clean-geometric',
    name: 'Clean Geometric',
    description: 'Equilibrado e profissional com Poppins',
    category: 'geometric',
    config: {
      category: 'geometric',
      profileName: { family: 'Poppins', weight: 'bold', size: 'lg' },
      bio: { family: 'Poppins', weight: 'regular', size: 'md' },
      tags: { family: 'Poppins', weight: 'medium', size: 'sm' },
      buttons: { family: 'Poppins', weight: 'semibold', size: 'md' },
      cta: { family: 'Poppins', weight: 'medium', size: 'md' },
      footer: { family: 'Poppins', weight: 'regular', size: 'sm' },
    },
  },
  {
    id: 'editorial-premium',
    name: 'Editorial Premium',
    description: 'Sofisticado com Nohemi',
    category: 'modern',
    config: {
      category: 'modern',
      profileName: { family: 'Nohemi', weight: 'bold', size: 'lg' },
      bio: { family: 'Nohemi', weight: 'regular', size: 'md' },
      tags: { family: 'Nohemi', weight: 'medium', size: 'sm' },
      buttons: { family: 'Nohemi', weight: 'semibold', size: 'md' },
      cta: { family: 'Nohemi', weight: 'medium', size: 'md' },
      footer: { family: 'Nohemi', weight: 'regular', size: 'sm' },
    },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Profissional com Montserrat',
    category: 'corporate',
    config: {
      category: 'corporate',
      profileName: { family: 'Montserrat', weight: 'bold', size: 'lg' },
      bio: { family: 'Montserrat', weight: 'regular', size: 'md' },
      tags: { family: 'Montserrat', weight: 'medium', size: 'sm' },
      buttons: { family: 'Montserrat', weight: 'semibold', size: 'md' },
      cta: { family: 'Montserrat', weight: 'medium', size: 'md' },
      footer: { family: 'Montserrat', weight: 'regular', size: 'sm' },
    },
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    description: 'Elegante e editorial',
    category: 'serif',
    config: {
      category: 'serif',
      profileName: { family: 'Playfair Display', weight: 'bold', size: 'lg' },
      bio: { family: 'Lora', weight: 'regular', size: 'md' },
      tags: { family: 'Lora', weight: 'medium', size: 'sm' },
      buttons: { family: 'Lora', weight: 'semibold', size: 'md' },
      cta: { family: 'Lora', weight: 'medium', size: 'md' },
      footer: { family: 'Lora', weight: 'regular', size: 'sm' },
    },
  },
];

// Configuração padrão
export const DEFAULT_TYPOGRAPHY: TypographyConfig = TYPOGRAPHY_PRESETS[0].config;

// Converter peso para valor numérico CSS
export const FONT_WEIGHT_MAP = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Converter tamanho para classes Tailwind
export const FONT_SIZE_MAP = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// Gerar CSS inline para uma configuração de fonte
export function getFontStyle(config: { family: string; weight: string; size?: string; letterSpacing?: number }) {
  return {
    fontFamily: `'${config.family}', sans-serif`,
    fontWeight: FONT_WEIGHT_MAP[config.weight as keyof typeof FONT_WEIGHT_MAP] || 400,
    letterSpacing: config.letterSpacing ? `${config.letterSpacing}px` : undefined,
  };
}

// Obter todas as fontes únicas usadas em uma configuração
export function getUsedFonts(typography: TypographyConfig): string[] {
  const fonts = new Set<string>();
  fonts.add(typography.profileName.family);
  fonts.add(typography.bio.family);
  fonts.add(typography.tags.family);
  fonts.add(typography.buttons.family);
  fonts.add(typography.cta.family);
  fonts.add(typography.footer.family);
  return Array.from(fonts);
}

// Gerar URL do Google Fonts para as fontes usadas
export function getGoogleFontsUrl(fonts: string[]): string {
  const fontParams = fonts
    .map(font => {
      // Fontes que precisam de pesos específicos
      const weights = '400,500,600,700';
      return `family=${font.replace(/ /g, '+')}:wght@${weights}`;
    })
    .join('&');
  
  return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
}
