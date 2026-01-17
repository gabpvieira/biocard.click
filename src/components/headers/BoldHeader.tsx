import { HeaderConfig } from "@/types/page";
import { Copy, Share2, Mail, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
    <header className="relative mb-12">
      {/* Hero Cover - altura grande */}
      <div 
        className="h-[360px] w-full relative overflow-hidden"
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
          <div className="absolute top-4 right-4 flex gap-2">
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

        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative -mt-20 px-6">
        <div className="flex flex-col items-center md:items-start md:flex-row md:gap-6">
          {/* Avatar - grande com borda grossa e glow */}
          <div className="relative mb-4 md:mb-0 shrink-0">
            <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
            <img
              src={photo}
              alt={name}
              className="relative w-[140px] h-[140px] rounded-full object-cover border-4 border-purple-500 shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left md:pt-8">
            {/* Name - tipografia display bold */}
            <h1 className="text-[36px] font-bold text-white mb-3 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            {/* Description - texto maior */}
            <p className="text-zinc-300 text-[18px] leading-relaxed mb-4 max-w-2xl">
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

            {/* Tags - pills preenchidas com ícones */}
            {config.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {config.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm text-purple-200 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 flex items-center gap-2"
                  >
                    <Sparkles className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Text */}
            {ctaText && (
              <p className="text-white text-[20px] font-semibold mt-6">
                {ctaText}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
