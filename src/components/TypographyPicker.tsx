import { useState } from 'react';
import { TypographyConfig, FontCategory, FontWeight, FontSize } from '@/types/page';
import { TYPOGRAPHY_PRESETS, FONT_FAMILIES, getFontStyle } from '@/lib/typography';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Type, RotateCcw } from 'lucide-react';

interface TypographyPickerProps {
  value: TypographyConfig;
  onChange: (config: TypographyConfig) => void;
}

export function TypographyPicker({ value, onChange }: TypographyPickerProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetSelect = (presetId: string) => {
    const preset = TYPOGRAPHY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange(preset.config);
    }
  };

  const handleCategoryChange = (category: FontCategory) => {
    const primaryFont = FONT_FAMILIES[category][0];
    onChange({
      ...value,
      category,
      profileName: { ...value.profileName, family: primaryFont },
      bio: { ...value.bio, family: primaryFont },
      tags: { ...value.tags, family: primaryFont },
      buttons: { ...value.buttons, family: primaryFont },
      cta: { ...value.cta, family: primaryFont },
      footer: { ...value.footer, family: primaryFont },
    });
  };

  const updateSection = (
    section: keyof Omit<TypographyConfig, 'category'>,
    updates: Partial<{ family: string; weight: FontWeight; size: FontSize }>
  ) => {
    onChange({
      ...value,
      [section]: { ...value[section], ...updates },
    });
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <Label className="text-foreground mb-3 block">Presets Prontos</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TYPOGRAPHY_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset.id)}
              className="p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-all text-left"
            >
              <div className="font-semibold text-sm mb-1" style={getFontStyle(preset.config.profileName)}>
                {preset.name}
              </div>
              <div className="text-xs text-muted-foreground">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Categoria */}
      <div>
        <Label className="text-foreground mb-2 block">Categoria Tipográfica</Label>
        <Select value={value.category} onValueChange={(v) => handleCategoryChange(v as FontCategory)}>
          <SelectTrigger className="bg-background/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="serif">Serif (Editorial / Autoridade)</SelectItem>
            <SelectItem value="modern">Modern (Premium Sans-serif)</SelectItem>
            <SelectItem value="geometric">Geometric (Design Moderno)</SelectItem>
            <SelectItem value="corporate">Corporate (Profissional)</SelectItem>
            <SelectItem value="creative">Creative (Estilizada)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Toggle Advanced */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full border-border/50"
      >
        <Type className="w-4 h-4 mr-2" />
        {showAdvanced ? 'Ocultar' : 'Mostrar'} Configurações Avançadas
      </Button>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="space-y-4 p-4 bg-background/30 rounded-lg border border-border/30">
          {/* Profile Name */}
          <SectionConfig
            label="Nome do Perfil"
            category={value.category}
            config={value.profileName}
            onChange={(updates) => updateSection('profileName', updates)}
          />

          {/* Bio */}
          <SectionConfig
            label="Bio / Descrição"
            category={value.category}
            config={value.bio}
            onChange={(updates) => updateSection('bio', updates)}
          />

          {/* Tags */}
          <SectionConfig
            label="Tags"
            category={value.category}
            config={value.tags}
            onChange={(updates) => updateSection('tags', updates)}
          />

          {/* Buttons */}
          <SectionConfig
            label="Botões / Links"
            category={value.category}
            config={value.buttons}
            onChange={(updates) => updateSection('buttons', updates)}
          />

          {/* CTA */}
          <SectionConfig
            label="CTA"
            category={value.category}
            config={value.cta}
            onChange={(updates) => updateSection('cta', updates)}
          />

          {/* Footer */}
          <SectionConfig
            label="Rodapé"
            category={value.category}
            config={value.footer}
            onChange={(updates) => updateSection('footer', updates)}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlePresetSelect(TYPOGRAPHY_PRESETS[0].id)}
            className="w-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar para Padrão
          </Button>
        </div>
      )}
    </div>
  );
}

interface SectionConfigProps {
  label: string;
  category: FontCategory;
  config: { family: string; weight: FontWeight; size?: FontSize };
  onChange: (updates: Partial<{ family: string; weight: FontWeight; size: FontSize }>) => void;
}

function SectionConfig({ label, category, config, onChange }: SectionConfigProps) {
  const availableFonts = FONT_FAMILIES[category];

  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        {/* Font Family */}
        <Select value={config.family} onValueChange={(v) => onChange({ family: v })}>
          <SelectTrigger className="bg-background/50 border-border/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableFonts.map(font => (
              <SelectItem key={font} value={font}>{font}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Weight */}
        <Select value={config.weight} onValueChange={(v) => onChange({ weight: v as FontWeight })}>
          <SelectTrigger className="bg-background/50 border-border/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="semibold">Semibold</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
          </SelectContent>
        </Select>

        {/* Size */}
        <Select value={config.size || 'md'} onValueChange={(v) => onChange({ size: v as FontSize })}>
          <SelectTrigger className="bg-background/50 border-border/50 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
