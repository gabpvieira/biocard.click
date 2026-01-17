import { useState } from "react";
import {
  Sparkles, Star, Heart, Zap, Crown, Award, Trophy, Target,
  Rocket, Flame, Coffee, Music, Camera, Palette, Code, Briefcase,
  GraduationCap, Users, TrendingUp, CheckCircle, Shield, Gem,
  Scissors, Wrench, Hammer, Paintbrush, Laptop, Smartphone,
} from "lucide-react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const ICON_OPTIONS = [
  { name: 'sparkles', icon: Sparkles, label: 'Sparkles' },
  { name: 'star', icon: Star, label: 'Estrela' },
  { name: 'heart', icon: Heart, label: 'Coração' },
  { name: 'zap', icon: Zap, label: 'Raio' },
  { name: 'crown', icon: Crown, label: 'Coroa' },
  { name: 'award', icon: Award, label: 'Prêmio' },
  { name: 'trophy', icon: Trophy, label: 'Troféu' },
  { name: 'target', icon: Target, label: 'Alvo' },
  { name: 'rocket', icon: Rocket, label: 'Foguete' },
  { name: 'flame', icon: Flame, label: 'Fogo' },
  { name: 'coffee', icon: Coffee, label: 'Café' },
  { name: 'music', icon: Music, label: 'Música' },
  { name: 'camera', icon: Camera, label: 'Câmera' },
  { name: 'palette', icon: Palette, label: 'Paleta' },
  { name: 'code', icon: Code, label: 'Código' },
  { name: 'briefcase', icon: Briefcase, label: 'Maleta' },
  { name: 'graduation-cap', icon: GraduationCap, label: 'Formatura' },
  { name: 'users', icon: Users, label: 'Pessoas' },
  { name: 'trending-up', icon: TrendingUp, label: 'Crescimento' },
  { name: 'check-circle', icon: CheckCircle, label: 'Check' },
  { name: 'shield', icon: Shield, label: 'Escudo' },
  { name: 'gem', icon: Gem, label: 'Diamante' },
  { name: 'scissors', icon: Scissors, label: 'Tesoura' },
  { name: 'wrench', icon: Wrench, label: 'Chave' },
  { name: 'hammer', icon: Hammer, label: 'Martelo' },
  { name: 'paintbrush', icon: Paintbrush, label: 'Pincel' },
  { name: 'laptop', icon: Laptop, label: 'Laptop' },
  { name: 'smartphone', icon: Smartphone, label: 'Celular' },
];

interface IconPickerProps {
  selectedIcon: string;
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

export const IconPicker = ({ selectedIcon, onSelect, onClose }: IconPickerProps) => {
  const [search, setSearch] = useState("");

  const filteredIcons = ICON_OPTIONS.filter(icon =>
    icon.label.toLowerCase().includes(search.toLowerCase()) ||
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Escolher Ícone</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <input
            type="text"
            placeholder="Buscar ícone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Icons Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {filteredIcons.map((iconOption) => {
              const Icon = iconOption.icon;
              const isSelected = selectedIcon === iconOption.name;
              
              return (
                <button
                  key={iconOption.name}
                  onClick={() => {
                    onSelect(iconOption.name);
                    onClose();
                  }}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                  title={iconOption.label}
                >
                  <Icon className="w-6 h-6 text-foreground" />
                  <span className="text-xs text-muted-foreground truncate w-full text-center">
                    {iconOption.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum ícone encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper para obter o componente do ícone pelo nome
export const getIconComponent = (iconName: string) => {
  const iconOption = ICON_OPTIONS.find(opt => opt.name === iconName);
  return iconOption?.icon || Sparkles;
};
