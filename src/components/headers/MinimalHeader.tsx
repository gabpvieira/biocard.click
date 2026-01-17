import { HeaderConfig } from "@/types/page";
import { Copy, Share2, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getIconComponent } from "@/components/IconPicker";

interface MinimalHeaderProps {
  name: string;
  photo: string;
  description: string;
  ctaText?: string;
  config: HeaderConfig;
}

export const MinimalHeader = ({
  name,
  photo,
  description,
  ctaText,
  config,
}: MinimalHeaderProps) => {
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
    <header className="relative mb-8 px-4">
      {/* Minimal cover - apenas cor sólida, altura mínima */}
      <div 
        className="h-[80px] w-full mb-4"
        style={{ backgroundColor: config.coverColor || '#0a0a0a' }}
      />

      {/* Content - layout horizontal compacto (desktop) / stack (mobile) */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-zinc-800">
        {/* Avatar - quadrado pequeno, alinhado à esquerda */}
        <img
          src={photo}
          alt={name}
          className="w-[100px] h-[100px] rounded-lg object-cover shrink-0"
        />

        {/* Text Content - densidade alta */}
        <div className="flex-1 min-w-0">
          {/* Name - tipografia mono/condensada */}
          <h1 className="text-[24px] font-semibold text-white mb-1 tracking-tight uppercase">
            {name}
          </h1>

          {/* Description - 1 linha única */}
          <p className="text-zinc-500 text-[14px] truncate mb-2">
            {description}
          </p>

          {/* Tags - inline com separadores */}
          {config.tags.length > 0 && (
            <div className="text-purple-400 text-xs font-mono flex items-center gap-2">
              {config.tags.map((tag, i) => {
                const IconComponent = getIconComponent(tag.icon);
                return (
                  <span key={i} className="flex items-center gap-1">
                    <IconComponent className="w-3 h-3" />
                    {tag.text}
                    {i < config.tags.length - 1 && <span className="text-zinc-600 mx-1">/</span>}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions - ícones minúsculos à direita */}
        {config.showActions && (
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              className="text-zinc-500 hover:text-purple-400 transition-colors"
              aria-label="Copiar link"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="text-zinc-500 hover:text-purple-400 transition-colors"
              aria-label="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href={`mailto:contato@${name.toLowerCase().replace(/\s+/g, '')}.com`}
              className="text-zinc-500 hover:text-purple-400 transition-colors"
              aria-label="Contato"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* CTA Text - minimalista */}
      {ctaText && (
        <p className="text-zinc-400 text-sm mt-4 font-mono">
          → {ctaText}
        </p>
      )}
    </header>
  );
};
