# 🎨 Personalização de Cores do Tema

## Objetivo

Permitir que cada cliente personalize as cores da sua página de links, incluindo cores principais, de acento e de fundo, substituindo a paleta roxa padrão.

## O que foi implementado

### 1. Sistema de Cores Personalizadas

Cada página agora pode ter suas próprias cores definidas em três categorias:

- **Cor Principal** (`primary`): Cor principal dos destaques e elementos importantes
- **Cor de Acento** (`accent`): Cor dos brilhos de fundo e efeitos secundários
- **Cor de Fundo** (`background`): Cor de fundo da página

### 2. Componente ColorPicker

Criado componente `ColorPicker` que permite:
- Seleção de cor via input de texto (hex)
- Preview visual da cor selecionada
- Paleta de cores pré-definidas para seleção rápida
- Interface intuitiva e responsiva

### 3. Hover Simplificado

Removido o efeito de brilho/shimmer ao passar o mouse sobre os cards, mantendo apenas:
- ✅ Efeito de zoom suave (scale)
- ❌ Brilho roxo removido
- ❌ Efeito shimmer removido

## Como usar

### No Admin Editor

1. Acesse o editor da página (`/admin/editor/:slug`)
2. Role até a seção **"Cores do Tema"**
3. Personalize as três cores:
   - **Cor Principal**: Cor dos destaques principais
   - **Cor de Acento**: Cor dos brilhos de fundo
   - **Cor de Fundo**: Cor de fundo da página
4. Use os presets ou digite um código hex personalizado
5. Salve as alterações

### Cores Padrão

Se nenhuma cor for definida, o sistema usa:

```json
{
  "primary": "#a855f7",   // Roxo
  "accent": "#c084fc",    // Roxo claro
  "background": "#0a0a0a" // Preto
}
```

### Presets Disponíveis

#### Cores Principais e de Acento
- 🟣 Roxo: `#a855f7` (padrão)
- 🔵 Azul: `#3b82f6`
- 🟢 Verde: `#10b981`
- 🟠 Laranja: `#f59e0b`
- 🔴 Vermelho: `#ef4444`
- 🌸 Rosa: `#ec4899`
- 🟣 Violeta: `#8b5cf6`
- 🔷 Ciano: `#06b6d4`

#### Cores de Fundo
- ⬛ Preto: `#0a0a0a` (padrão)
- ⬛ Preto escuro: `#000000`
- ⬛ Cinza escuro: `#1a1a1a`
- ⬛ Cinza: `#1e1e1e`
- 🌙 Azul escuro: `#0f172a`
- 🌙 Azul slate: `#1e293b`
- 🌙 Cinza azulado: `#111827`
- 🌙 Cinza neutro: `#1f2937`

## Estrutura de Dados

### TypeScript Interface

```typescript
interface ThemeColors {
  primary: string;      // Cor principal (hex)
  accent: string;       // Cor de acento (hex)
  background: string;   // Cor de fundo (hex)
}

interface BioPage {
  // ... outros campos
  themeColors?: ThemeColors;
}
```

### Supabase Schema

```sql
ALTER TABLE pages 
ADD COLUMN theme_colors JSONB DEFAULT '{"primary": "#a855f7", "accent": "#c084fc", "background": "#0a0a0a"}'::jsonb;
```

## Implementação Técnica

### 1. Componente ColorPicker

Localização: `src/components/ColorPicker.tsx`

```tsx
<ColorPicker
  label="Cor Principal"
  value={color}
  onChange={(newColor) => handleColorChange(newColor)}
  presets={['#a855f7', '#3b82f6', '#10b981']}
/>
```

### 2. Aplicação das Cores

As cores são aplicadas dinamicamente na `PublicPage`:

```tsx
const colors = page.themeColors || defaultColors;

<div style={{ backgroundColor: colors.background }}>
  <div style={{ backgroundColor: `${colors.accent}33` }} />
</div>
```

### 3. CSS Atualizado

Removido efeitos de hover:

```css
.link-card {
  @apply relative overflow-hidden transition-transform duration-300 
         hover:scale-[1.02] active:scale-[0.98];
}
```

**Antes** (com brilho):
```css
.link-card {
  @apply hover:shadow-[0_10px_40px_-10px_hsl(291_100%_59%_/_0.5)];
}

.link-card::before {
  background: linear-gradient(135deg, hsl(291 100% 59% / 0.15), transparent);
}
```

**Depois** (apenas zoom):
```css
.link-card {
  @apply hover:scale-[1.02];
}
```

## Migração de Dados

Para adicionar o campo em páginas existentes:

```bash
# Execute no SQL Editor do Supabase
psql -f supabase-theme-colors.sql
```

Ou manualmente:

```sql
UPDATE pages 
SET theme_colors = '{"primary": "#a855f7", "accent": "#c084fc", "background": "#0a0a0a"}'::jsonb
WHERE theme_colors IS NULL;
```

## Exemplos de Uso

### Exemplo 1: Tema Azul

```json
{
  "primary": "#3b82f6",
  "accent": "#60a5fa",
  "background": "#0f172a"
}
```

### Exemplo 2: Tema Verde

```json
{
  "primary": "#10b981",
  "accent": "#34d399",
  "background": "#064e3b"
}
```

### Exemplo 3: Tema Rosa

```json
{
  "primary": "#ec4899",
  "accent": "#f472b6",
  "background": "#1a1a1a"
}
```

## Testes

### Teste Manual

1. Crie/edite uma página no admin
2. Altere as cores do tema
3. Salve e visualize a página pública
4. Verifique se:
   - Cores de fundo estão corretas
   - Brilhos de fundo usam a cor de acento
   - Hover nos cards mostra apenas zoom (sem brilho)

### Teste de Fallback

1. Crie uma página sem definir cores
2. Verifique se as cores padrão (roxo) são aplicadas
3. Edite e adicione cores personalizadas
4. Verifique se as novas cores são aplicadas

## Troubleshooting

### Cores não aparecem

**Problema**: Cores personalizadas não são aplicadas na página pública.

**Solução**:
1. Verifique se o campo `theme_colors` existe no Supabase
2. Execute o script `supabase-theme-colors.sql`
3. Limpe o cache do navegador
4. Verifique se as cores foram salvas corretamente

### Cores inválidas

**Problema**: Cores com formato inválido causam erros.

**Solução**:
- Use sempre formato hex: `#RRGGBB`
- Exemplos válidos: `#a855f7`, `#3b82f6`
- Exemplos inválidos: `purple`, `rgb(168, 85, 247)`

## Melhorias Futuras

- [ ] Adicionar mais presets de cores
- [ ] Permitir gradientes personalizados
- [ ] Preview em tempo real no editor
- [ ] Temas pré-definidos (Dark, Light, Neon, etc.)
- [ ] Exportar/importar paletas de cores
- [ ] Sugestões de combinações harmônicas

## Links Relacionados

- [Componente ColorPicker](../src/components/ColorPicker.tsx)
- [PublicPage](../src/pages/PublicPage.tsx)
- [AdminEditor](../src/pages/AdminEditor.tsx)
- [Types](../src/types/page.ts)

---

**Criado em**: Janeiro 2026  
**Última atualização**: Janeiro 2026  
**Versão**: 1.0.0
