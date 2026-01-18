import { useEffect } from 'react';
import { TypographyConfig } from '@/types/page';
import { getUsedFonts, getGoogleFontsUrl } from '@/lib/typography';

interface TypographyProviderProps {
  typography: TypographyConfig;
  children: React.ReactNode;
}

export function TypographyProvider({ typography, children }: TypographyProviderProps) {
  useEffect(() => {
    // Carregar fontes do Google Fonts
    const fonts = getUsedFonts(typography);
    const fontUrl = getGoogleFontsUrl(fonts);
    
    // Verificar se já existe um link para essas fontes
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) return;

    // Criar e adicionar o link das fontes
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);

    return () => {
      // Limpar ao desmontar (opcional)
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [typography]);

  return <>{children}</>;
}
