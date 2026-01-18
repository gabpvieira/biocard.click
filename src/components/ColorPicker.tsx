import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
}

export const ColorPicker = ({ label, value, onChange, presets }: ColorPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const defaultPresets = presets || [
    '#a855f7', // Roxo (padrão)
    '#3b82f6', // Azul
    '#10b981', // Verde
    '#f59e0b', // Laranja
    '#ef4444', // Vermelho
    '#ec4899', // Rosa
    '#8b5cf6', // Violeta
    '#06b6d4', // Ciano
  ];

  return (
    <div className="space-y-2">
      <Label className="text-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#a855f7"
            className="bg-background/50 border-border/50 pr-12"
          />
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg border-2 border-border/50 cursor-pointer"
            style={{ backgroundColor: value }}
            onClick={() => setShowPicker(!showPicker)}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowPicker(!showPicker)}
          className="border-border/50"
        >
          <Palette className="w-4 h-4" />
        </Button>
      </div>

      {showPicker && (
        <div className="grid grid-cols-4 gap-2 p-3 bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl">
          {defaultPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                onChange(preset);
                setShowPicker(false);
              }}
              className="w-full h-10 rounded-lg border-2 border-border/50 hover:scale-110 transition-transform"
              style={{ backgroundColor: preset }}
              title={preset}
            />
          ))}
        </div>
      )}
    </div>
  );
};
