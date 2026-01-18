import { TypographyConfig, FontCategory } from '@/types/page';
import { TYPOGRAPHY_PRESETS } from '@/lib/typography';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, Check } from 'lucide-react';
import { useState } from 'react';

interface SimpleFontPickerProps {
  value: TypographyConfig;
  onChange: (config: TypographyConfig) => void;
  onSave: () => Promise<void>;
}

export function SimpleFontPicker({ value, onChange, onSave }: SimpleFontPickerProps) {
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

  const handlePresetSelect = (presetId: string) => {
    const preset = TYPOGRAPHY_PRESETS.find(p => p.id === presetId);
    if (preset) {
      onChange(preset.config);
    }
  };

  const currentPreset = TYPOGRAPHY_PRESETS.find(
    p => JSON.stringify(p.config) === JSON.stringify(value)
  );

  return (
    <div className="space-y-4">
      {/* Preset Selector */}
      <div>
        <Label className="text-foreground mb-2 block">Estilo de Fonte</Label>
        <Select 
          value={currentPreset?.id || 'custom'} 
          onValueChange={handlePresetSelect}
        >
          <SelectTrigger className="bg-background/50 border-border/50">
            <SelectValue placeholder="Escolha um estilo" />
          </SelectTrigger>
          <SelectContent>
            {TYPOGRAPHY_PRESETS.map(preset => (
              <SelectItem key={preset.id} value={preset.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{preset.name}</span>
                  <span className="text-xs text-muted-foreground">{preset.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-2">
          Escolha um estilo de fonte que combine com sua marca
        </p>
      </div>

      {/* Preview */}
      <div className="bg-background/30 border border-border/30 rounded-lg p-4 space-y-2">
        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
        <div 
          className="text-2xl font-bold"
          style={{ fontFamily: `'${value.profileName.family}', sans-serif` }}
        >
          Seu Nome
        </div>
        <div 
          className="text-base"
          style={{ fontFamily: `'${value.bio.family}', sans-serif` }}
        >
          Sua descrição profissional aparece aqui
        </div>
        <div className="flex gap-2">
          <span 
            className="text-xs px-2 py-1 bg-accent/20 rounded-full"
            style={{ fontFamily: `'${value.tags.family}', sans-serif` }}
          >
            Tag exemplo
          </span>
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
            Salvar Tipografia
          </>
        )}
      </Button>
    </div>
  );
}
