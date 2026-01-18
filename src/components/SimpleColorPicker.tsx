import { ThemeColors } from '@/types/page';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Check, Palette } from 'lucide-react';
import { useState } from 'react';

interface SimpleColorPickerProps {
  value: ThemeColors;
  onChange: (colors: ThemeColors) => void;
  onSave: () => Promise<void>;
}

const COLOR_PRESETS = [
  { name: 'Roxo Premium', colors: { primary: '#a855f7', accent: '#c084fc', background: '#0a0a0a' } },
  { name: 'Azul Profissional', colors: { primary: '#3b82f6', accent: '#60a5fa', background: '#0a0a0a' } },
  { name: 'Verde Moderno', colors: { primary: '#10b981', accent: '#34d399', background: '#0a0a0a' } },
  { name: 'Rosa Criativo', colors: { primary: '#ec4899', accent: '#f472b6', background: '#0a0a0a' } },
  { name: 'Laranja Vibrante', colors: { primary: '#f97316', accent: '#fb923c', background: '#0a0a0a' } },
  { name: 'Vermelho Impacto', colors: { primary: '#ef4444', accent: '#f87171', background: '#0a0a0a' } },
];

export function SimpleColorPicker({ value, onChange, onSave }: SimpleColorPickerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      await onSave();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePresetClick = (preset: typeof COLOR_PRESETS[0]) => {
    onChange(preset.colors);
  };

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div>
        <Label className="text-foreground mb-3 block">Paletas Prontas</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="p-3 rounded-lg border border-border/50 hover:border-accent/50 transition-all text-left"
            >
              <div className="flex gap-1 mb-2">
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.colors.primary }}
                />
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.colors.accent }}
                />
              </div>
              <div className="text-xs font-medium">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Color Pickers */}
      <div className="space-y-3">
        <Label className="text-foreground block">Cores Personalizadas</Label>
        
        {/* Primary Color */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label className="text-sm text-muted-foreground mb-1 block">Cor Principal</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={value.primary}
                onChange={(e) => onChange({ ...value, primary: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-border/50"
              />
              <Input
                type="text"
                value={value.primary}
                onChange={(e) => onChange({ ...value, primary: e.target.value })}
                placeholder="#a855f7"
                className="flex-1 bg-background/50 border-border/50"
              />
            </div>
          </div>
        </div>

        {/* Accent Color */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label className="text-sm text-muted-foreground mb-1 block">Cor de Acento</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={value.accent}
                onChange={(e) => onChange({ ...value, accent: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-border/50"
              />
              <Input
                type="text"
                value={value.accent}
                onChange={(e) => onChange({ ...value, accent: e.target.value })}
                placeholder="#c084fc"
                className="flex-1 bg-background/50 border-border/50"
              />
            </div>
          </div>
        </div>

        {/* Background Color */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label className="text-sm text-muted-foreground mb-1 block">Cor de Fundo</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={value.background}
                onChange={(e) => onChange({ ...value, background: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border border-border/50"
              />
              <Input
                type="text"
                value={value.background}
                onChange={(e) => onChange({ ...value, background: e.target.value })}
                placeholder="#0a0a0a"
                className="flex-1 bg-background/50 border-border/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div 
        className="rounded-lg p-4 border border-border/30"
        style={{ backgroundColor: value.background }}
      >
        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
        <div 
          className="text-xl font-bold mb-2"
          style={{ color: value.primary }}
        >
          Texto Principal
        </div>
        <div 
          className="inline-block px-3 py-1 rounded-full text-sm"
          style={{ 
            backgroundColor: `${value.accent}33`,
            color: value.accent 
          }}
        >
          Destaque
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={isSaving || saved}
        className="w-full bg-accent hover:bg-accent/90"
      >
        {isSaving ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Salvando...
          </>
        ) : saved ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Salvo!
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Salvar Cores
          </>
        )}
      </Button>
    </div>
  );
}
