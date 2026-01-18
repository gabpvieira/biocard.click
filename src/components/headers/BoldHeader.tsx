import { HeaderConfig, TypographyConfig, ThemeColors } from "@/types/page";
import { Copy, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getIconComponent } from "@/components/IconPicker";
import { getFontStyle } from "@/lib/typography";

interface BoldHeaderProps {
  name: string;
  photo: string;
  description: string;
  ctaText?: string;
  config: HeaderConfig;
  typography?: TypographyConfig;
  colors?: ThemeColors;
}

export const BoldHeader = ({
  name,
  photo,
  description,
  ctaText,
  config,
  typography,
  colors = { primary: '#a855f7', accent: '#c084fc', background: '#0a0a0a' },
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
    <header className="relative mb-12 -mx-4 -mt-4 md:mx-0 md:mt-0 md:rounded-2xl overflow-hidden">
      {/* Hero Banner - Full Bleed, Edge-to-Edge */}
      <div 
        className="relative h-[65vh] min-h-[500px] w-screen md:w-full -ml-4 md:ml-0"
        style={{
          backgroundColor: config.coverType === 'solid' ? config.coverColor : undefined,
          backgroundImage: config.coverType === 'image' && config.coverImage 
            ? `url(${config.coverImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay Gradiente para Legibilidade */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(0,0,0,0.3) 0%, 
              rgba(0,0,0,0.5) 50%, 
              rgba(0,0,0,0.8) 100%)`
          }}
        />

        {/* Padrão geométrico sutil (apenas para solid) */}
        {config.coverType !== 'image' && (
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Glow de cor no topo */}
        <div 
          className="absolute top-0 left-0 right-0 h-64 opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at top, ${colors.primary}, transparent 70%)`
          }}
        />

        {/* Actions no canto superior direito */}
        {config.showActions && (
          <div className="absolute top-6 right-6 flex gap-2 z-20">
            <button
              onClick={handleCopyLink}
              className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-all shadow-lg"
              aria-label="Copiar link"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-black/50 backdrop-blur-md rounded-xl text-white hover:bg-black/70 transition-all shadow-lg"
              aria-label="Compartilhar"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content Container - Posicionado no centro/bottom do banner */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            {/* Avatar - Flutuando com glow forte */}
            <div className="relative mb-6 shrink-0">
              {/* Glow duplo para mais impacto */}
              <div 
                className="absolute inset-0 blur-2xl rounded-full animate-pulse"
                style={{ backgroundColor: `${colors.primary}80` }}
              />
              <div 
                className="absolute inset-0 blur-xl rounded-full"
                style={{ backgroundColor: `${colors.primary}60` }}
              />
              <img
                src={photo}
                alt={name}
                className="relative w-[160px] h-[160px] rounded-full object-cover border-4 shadow-2xl"
                style={{ 
                  borderColor: colors.primary,
                  boxShadow: `0 20px 60px ${colors.primary}40`
                }}
              />
            </div>

            {/* Name - Display grande e impactante */}
            <h1 
              className="text-[42px] md:text-[52px] font-black text-white mb-4 leading-none tracking-tight"
              style={{
                ...typography ? getFontStyle(typography.profileName) : {},
                textShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {name}
              </span>
            </h1>

            {/* Description - Texto grande e legível */}
            <p 
              className="text-white/90 text-[19px] md:text-[21px] leading-relaxed mb-6 max-w-xl font-medium"
              style={{
                ...typography ? getFontStyle(typography.bio) : {},
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {description.split(' ').map((word, i) => {
                const keywords = ['profissional', 'especializado', 'expert', 'criador', 'empreendedor'];
                const isKeyword = keywords.some(k => word.toLowerCase().includes(k));
                return isKeyword ? (
                  <span 
                    key={i} 
                    className="font-bold"
                    style={{ color: colors.accent }}
                  >
                    {word}{' '}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                );
              })}
            </p>

            {/* Tags - Pills com backdrop blur */}
            {config.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {config.tags.slice(0, 4).map((tag, i) => {
                  const IconComponent = getIconComponent(tag.icon);
                  return (
                    <span
                      key={i}
                      className="px-6 py-3 text-sm font-semibold backdrop-blur-md rounded-full border-2 flex items-center gap-2 transition-all hover:scale-105"
                      style={{
                        color: 'white',
                        backgroundColor: `${colors.primary}40`,
                        borderColor: `${colors.primary}80`,
                        boxShadow: `0 4px 20px ${colors.primary}30`
                      }}
                    >
                      <IconComponent className="w-4 h-4" />
                      {tag.text}
                    </span>
                  );
                })}
              </div>
            )}

            {/* CTA Text - Destaque final */}
            {ctaText && (
              <p 
                className="text-white text-[22px] font-bold px-6 py-3 rounded-full backdrop-blur-md"
                style={{
                  ...typography ? getFontStyle(typography.cta) : {},
                  backgroundColor: `${colors.primary}30`,
                  border: `2px solid ${colors.primary}60`,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                {ctaText}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
