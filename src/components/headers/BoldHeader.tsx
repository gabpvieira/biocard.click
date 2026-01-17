import { HeaderConfig } from "@/types/page";
import { Copy, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getIconComponent } from "@/components/IconPicker";

interface BoldHeaderProps {
  name: string;
  photo: string;
  description: string;
  ctaText?: string;
  config: HeaderConfig;
}

export const BoldHeader = ({
  name,
  photo,
  description,
  ctaText,
  config,
}: BoldHeaderProps) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copiado!", description: "URL copiada para a área de transferência" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: name, url: window.location.href });
    } else {
      handleCopyLink();
    }
  };

  return (
    <header className="relative mb-8 -mx-4 md:-mx-0">
      {/* Hero Cover - full width, preenchendo todas as bordas */}
      <div 
        className="h-[400px] w-screen md:w-full relative overflow-hidden"
        style={{
          backgroundColor: config.coverType === 'solid' ? config.coverColor : undefined,
          backgroundImage: config.coverType === 'image' && config.coverImage 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${config.coverImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Padrão geométrico sutil */}
        {config.coverType !== 'image' && (
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Actions no canto superior direito */}
        {config.showActions && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={handleCopyLink}
              className="p-2.5 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-all"
              aria-label="Copiar link"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-all"
              aria-label="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Curvatura na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,64 C240,100 480,120 720,120 C960,120 1200,100 1440,64 L1440,120 L0,120 Z"
              fill="#0a0a0a"
            />
          </svg>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative -mt-16 px-6">
        <div className="flex flex-col items-center">
          {/* Avatar - grande com borda grossa e glow, sobrepondo a curvatura */}
          <div className="relative mb-4 shrink-0 z-10">
            <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
            <img
              src={photo}
              alt={name}
              className="relative w-[140px] h-[140px] rounded-full object-cover border-4 border-purple-500 shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center">
            {/* Name - tipografia display bold */}
            <h1 className="text-[36px] font-bold text-white mb-3 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            {/* Description - texto maior */}
            <p className="text-zinc-300 text-[18px] leading-relaxed mb-6 max-w-2xl mx-auto">
              {description.split(' ').map((word, i) => {
                // Destaca palavras-chave comuns
                const keywords = ['profissional', 'especializado', 'expert', 'criador', 'empreendedor'];
                const isKeyword = keywords.some(k => word.toLowerCase().includes(k));
                return isKeyword ? (
                  <span key={i} className="text-purple-400 font-medium">{word} </span>
                ) : (
                  <span key={i}>{word} </span>
                );
              })}
            </p>

            {/* Tags - pills preenchidas com ícones customizáveis */}
            {config.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {config.tags.slice(0, 4).map((tag, i) => {
                  const IconComponent = getIconComponent(tag.icon);
                  return (
                    <span
                      key={i}
                      className="px-5 py-2.5 text-sm text-purple-200 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 flex items-center gap-2 hover:bg-purple-500/30 transition-colors"
                    >
                      <IconComponent className="w-4 h-4" />
                      {tag.text}
                    </span>
                  );
                })}
              </div>
            )}

            {/* CTA Text */}
            {ctaText && (
              <p className="text-white text-[20px] font-semibold">
                {ctaText}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
