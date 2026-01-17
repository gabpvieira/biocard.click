import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabaseStorage } from "@/lib/supabaseStorage";
import { BioPage } from "@/types/page";
import { CleanHeader, BoldHeader, MinimalHeader } from "@/components/headers";
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/15 rounded-full blur-[100px] translate-x-1/3"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[130px] translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-56 h-56 bg-primary/15 rounded-full blur-[90px] translate-x-1/4"></div>

      <main className="w-full max-w-md mx-auto relative z-10">
        {/* Header dinâmico baseado no layout escolhido */}
        {page.headerConfig?.layout === 'clean' && (
          <CleanHeader
            name={page.name}
            photo={page.photo}
            description={page.description}
            ctaText={page.ctaText}
            config={page.headerConfig}
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
          />
        )}
        {page.headerConfig?.layout === 'minimal' && (
          <MinimalHeader
            name={page.name}
            photo={page.photo}
            description={page.description}
            ctaText={page.ctaText}
            config={page.headerConfig}
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
        <footer className="text-center mt-8 text-muted-foreground text-xs">
          © {new Date().getFullYear()} {page.name} - Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
};

export default PublicPage;
