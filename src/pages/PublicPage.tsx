import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabaseStorage } from "@/lib/supabaseStorage";
import { BioPage } from "@/types/page";
import { CleanHeader, BoldHeader, MinimalHeader } from "@/components/headers";
import { TypographyProvider } from "@/components/TypographyProvider";
import { DEFAULT_TYPOGRAPHY, getFontStyle } from "@/lib/typography";
import { ChevronDown } from "lucide-react";
import { useMetaTags } from "@/hooks/useMetaTags";

const PublicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<BioPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      if (slug) {
        const pageData = await supabaseStorage.getPage(slug);
        if (pageData) {
          setPage(pageData);
        } else {
          navigate("/404");
        }
      }
      setIsLoading(false);
    };
    
    loadPage();
  }, [slug, navigate]);

  // Update meta tags dynamically based on page data
  useMetaTags({
    title: page ? `${page.name} | Biocard` : 'Biocard - Link na Bio Premium',
    description: page?.description || 'Crie sua página de links premium com design sofisticado e personalizável.',
    image: page?.photo,
    url: page ? `${window.location.origin}/${page.slug}` : undefined,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return null;
  }

  // Cores padrão (roxo)
  const defaultColors = {
    primary: '#a855f7',
    accent: '#c084fc',
    background: '#0a0a0a'
  };

  const colors = page.themeColors || defaultColors;
  const typography = page.typography || DEFAULT_TYPOGRAPHY;

  return (
    <TypographyProvider typography={typography}>
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
      {/* Decorative background glows com cores personalizadas */}
      <div 
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: `${colors.accent}33` }}
      ></div>
      <div 
        className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-[100px] translate-x-1/3"
        style={{ backgroundColor: `${colors.accent}26` }}
      ></div>
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-[130px] translate-y-1/2"
        style={{ backgroundColor: `${colors.accent}1a` }}
      ></div>
      <div 
        className="absolute bottom-1/3 right-0 w-56 h-56 rounded-full blur-[90px] translate-x-1/4"
        style={{ backgroundColor: `${colors.primary}26` }}
      ></div>

      <main className="w-full max-w-md mx-auto relative z-10">
        {/* Header dinâmico baseado no layout escolhido */}
        {page.headerConfig?.layout === 'clean' && (
          <CleanHeader
            name={page.name}
            photo={page.photo}
            description={page.description}
            ctaText={page.ctaText}
            config={page.headerConfig}
            typography={typography}
          />
        )}
        {(!page.headerConfig || page.headerConfig.layout === 'bold') && (
          <BoldHeader
            name={page.name}
            photo={page.photo}
            description={page.description}
            ctaText={page.ctaText}
            config={page.headerConfig || {
              layout: 'bold',
              coverType: 'solid',
              coverColor: '#1a1a1a',
              tags: [],
              showActions: true,
            }}
            typography={typography}
          />
        )}
        {page.headerConfig?.layout === 'minimal' && (
          <MinimalHeader
            name={page.name}
            photo={page.photo}
            description={page.description}
            ctaText={page.ctaText}
            config={page.headerConfig}
            typography={typography}
          />
        )}

        {/* Links Section */}
        <section
          className="space-y-4 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {page.cards.map((card, index) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`block link-card rounded-2xl overflow-hidden card-enter-${Math.min(index + 1, 4)}`}
              aria-label={`Link ${index + 1}`}
            >
              <img src={card.image} alt="" className="w-full h-auto" />
            </a>
          ))}
        </section>

        {/* Footer */}
        <footer 
          className="text-center mt-8 text-muted-foreground text-xs"
          style={getFontStyle(typography.footer)}
        >
          © {new Date().getFullYear()} {page.name} - Todos os direitos reservados
        </footer>
      </main>
    </div>
    </TypographyProvider>
  );
};

export default PublicPage;
