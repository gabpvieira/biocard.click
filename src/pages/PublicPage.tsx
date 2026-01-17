import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage, initializeDefaultPage } from "@/lib/storage";
import { BioPage } from "@/types/page";
import { ChevronDown } from "lucide-react";

const PublicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<BioPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeDefaultPage();
    
    if (slug) {
      const pageData = storage.getPage(slug);
      if (pageData) {
        setPage(pageData);
      } else {
        navigate("/404");
      }
    }
    setIsLoading(false);
  }, [slug, navigate]);

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
        {/* Profile Section */}
        <section className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-6">
            <img
              src={page.photo}
              alt={page.name}
              className="w-32 h-32 rounded-full object-cover profile-glow mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            {page.name}
          </h1>

          <p className="text-muted-foreground text-sm px-4 leading-relaxed mb-6">
            {page.description}
          </p>

          {page.ctaText && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-foreground text-lg font-bold text-center">
                {page.ctaText.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < page.ctaText.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
              <ChevronDown
                className="text-accent animate-pulse"
                size={32}
                strokeWidth={3}
              />
            </div>
          )}
        </section>

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
