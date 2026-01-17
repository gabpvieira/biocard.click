import { HeaderLayout } from "@/types/page";

interface HeaderLayoutPreviewProps {
  layout: HeaderLayout;
  isSelected: boolean;
  onClick: () => void;
}

export const HeaderLayoutPreview = ({
  layout,
  isSelected,
  onClick,
}: HeaderLayoutPreviewProps) => {
  const layouts = {
    clean: {
      title: "Clean Premium",
      subtitle: "Elegância Minimalista",
      description: "Perfeito para profissionais corporativos e portfólios sofisticados",
      preview: (
        <div className="w-full h-32 bg-zinc-900 rounded-lg overflow-hidden relative">
          {/* Cover */}
          <div className="h-16 bg-gradient-to-b from-purple-900/30 to-zinc-900" />
          {/* Avatar */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-purple-500/50 border border-purple-400" />
          {/* Content */}
          <div className="mt-8 px-4 space-y-1">
            <div className="h-2 bg-white/80 rounded w-20 mx-auto" />
            <div className="h-1.5 bg-zinc-500 rounded w-32 mx-auto" />
            <div className="flex gap-1 justify-center mt-2">
              <div className="h-3 w-12 border border-purple-500/50 rounded-full" />
              <div className="h-3 w-12 border border-purple-500/50 rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
    bold: {
      title: "Bold Statement",
      subtitle: "Impacto Visual",
      description: "Ideal para criadores de conteúdo e empreendedores digitais",
      preview: (
        <div className="w-full h-32 bg-zinc-900 rounded-lg overflow-hidden relative">
          {/* Hero Cover */}
          <div className="h-20 bg-gradient-to-br from-purple-600/40 to-purple-900/40 relative">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="border-r border-white/20" />
                ))}
              </div>
            </div>
          </div>
          {/* Avatar with glow */}
          <div className="absolute top-12 left-4 w-14 h-14 rounded-full bg-purple-500 border-2 border-purple-400 shadow-lg shadow-purple-500/50" />
          {/* Content */}
          <div className="mt-4 px-4 pl-20 space-y-1">
            <div className="h-2.5 bg-gradient-to-r from-purple-400 to-purple-600 rounded w-24" />
            <div className="h-1.5 bg-zinc-400 rounded w-32" />
            <div className="flex gap-1 mt-1">
              <div className="h-3 w-10 bg-purple-500/30 rounded-full" />
              <div className="h-3 w-10 bg-purple-500/30 rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
    minimal: {
      title: "Ultra-Minimal",
      subtitle: "Brutalismo Premium",
      description: "Para desenvolvedores e designers que valorizam eficiência",
      preview: (
        <div className="w-full h-32 bg-zinc-900 rounded-lg overflow-hidden">
          {/* Minimal cover */}
          <div className="h-6 bg-zinc-950" />
          {/* Horizontal layout */}
          <div className="flex items-center gap-3 p-3 border-b border-zinc-800">
            {/* Square avatar */}
            <div className="w-10 h-10 rounded bg-zinc-700" />
            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="h-2 bg-white/90 rounded w-20" />
              <div className="h-1 bg-zinc-600 rounded w-28" />
              <div className="text-[6px] text-purple-400 font-mono">DEV / TECH</div>
            </div>
            {/* Actions */}
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
            </div>
          </div>
        </div>
      ),
    },
  };

  const config = layouts[layout];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        isSelected
          ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
          : "border-border/50 hover:border-accent/50 bg-card/30"
      }`}
    >
      {/* Preview */}
      <div className="mb-3">{config.preview}</div>

      {/* Info */}
      <div>
        <div className="font-semibold text-foreground text-sm mb-0.5">
          {config.title}
        </div>
        <div className="text-xs text-accent mb-1">{config.subtitle}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">
          {config.description}
        </div>
      </div>
    </button>
  );
};
