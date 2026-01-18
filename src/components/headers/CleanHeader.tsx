import { HeaderConfig, TypographyConfig, ThemeColors } from "@/types/page";
import { Copy, Share2, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getIconComponent } from "@/components/IconPicker";
import { getFontStyle } from "@/lib/typography";

interface CleanHeaderProps {
  name: string;
  photo: string;
  description: string;
  ctaText?: string;
  config: HeaderConfig;
  typography?: TypographyConfig;
  colors?: ThemeColors;
}

export const CleanHeader = ({
  name,
  photo,
  description,
  ctaText,
  config,
  typography,
  colors = { primary: '#a855f7', accent: '#c084fc', background: '#0a0a0a' },
}: CleanHeaderProps) => {
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
      {/* Cover - altura média */}
      <div 
        className="h-[220px] w-full relative overflow-hidden"
        style={{
          backgroundColor: config.coverType === 'solid' ? config.coverColor : undefined,
          backgroundImage: config.coverType === 'image' && config.coverImage 
            ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${config.coverImage})`
            : config.coverType === 'solid' 
            ? `linear-gradient(to bottom, ${config.coverColor}, #0a0a0a)`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {config.coverType === 'pattern' && (
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative -mt-16 px-6">
        {/* Avatar - sobrepõe 40% da capa */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={photo}
              alt={name}
              className="w-[120px] h-[120px] rounded-full object-cover border-2 shadow-xl"
              style={{ borderColor: `${colors.primary}80` }}
            />
          </div>

          {/* Name */}
          <h1 
            className="text-[28px] font-semibold text-white mb-2 text-center tracking-tight"
            style={typography ? getFontStyle(typography.profileName) : undefined}
          >
            {name}
          </h1>

          {/* Description */}
          <p 
            className="text-zinc-400 text-[16px] leading-relaxed text-center max-w-md mb-4 px-4"
            style={typography ? getFontStyle(typography.bio) : undefined}
          >
            {description}
          </p>

          {/* Tags - pills pequenas */}
          {config.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {config.tags.slice(0, 3).map((tag, i) => {
                const IconComponent = getIconComponent(tag.icon);
                return (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs border rounded-full flex items-center gap-1.5"
                    style={{
                      color: colors.accent,
                      borderColor: `${colors.primary}4D`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.primary}1A`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <IconComponent className="w-3 h-3" />
                    {tag.text}
                  </span>
                );
              })}
            </div>
          )}

          {/* Actions - ícones ghost */}
          {config.showActions && (
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleCopyLink}
                className="p-2 text-zinc-400 transition-colors"
                style={{ 
                  color: 'rgb(161, 161, 170)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(161, 161, 170)';
                }}
                aria-label="Copiar link"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-zinc-400 transition-colors"
                style={{ 
                  color: 'rgb(161, 161, 170)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(161, 161, 170)';
                }}
                aria-label="Compartilhar"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <a
                href={`mailto:contato@${name.toLowerCase().replace(/\s+/g, '')}.com`}
                className="p-2 text-zinc-400 transition-colors"
                style={{ 
                  color: 'rgb(161, 161, 170)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgb(161, 161, 170)';
                }}
                aria-label="Contato"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          )}

          {/* CTA Text */}
          {ctaText && (
            <p 
              className="text-white text-[18px] font-medium text-center mb-2"
              style={typography ? getFontStyle(typography.cta) : undefined}
            >
              {ctaText}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
