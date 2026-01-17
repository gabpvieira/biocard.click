# Guia de Layouts de Header Premium

## Visão Geral

O sistema de headers foi redesenhado com 3 variações distintas, cada uma otimizada para diferentes perfis de usuário e objetivos de conversão.

---

## 1. CLEAN PREMIUM (Elegância Minimalista)

### Características Visuais
- **Capa**: Altura média (220px)
- **Avatar**: 120px, centralizado, borda fina roxa (2px)
- **Tipografia**: Sans-serif moderna (Inter/Geist), peso 600
- **Tags**: Pills pequenas com borda, sem background
- **Ações**: Ícones ghost (apenas outline)
- **Espaçamento**: Generoso, respira muito

### Quando Usar
✅ Perfis corporativos (consultores, coaches, executivos)
✅ Profissionais criativos que querem sofisticação sem exagero
✅ Portfólios minimalistas (designers, arquitetos, fotógrafos)
✅ Quando o conteúdo dos links é o protagonista

### Vantagem
Atemporal, nunca sai de moda. Funciona perfeitamente em qualquer nicho sem parecer "demais".

### Exemplo de Uso
```typescript
headerConfig: {
  layout: 'clean',
  coverType: 'solid',
  coverColor: '#1a1a1a',
  tags: ['Designer', 'Criativo', 'Portfólio'],
  showActions: true
}
```

---

## 2. BOLD STATEMENT (Impacto Visual Imediato)

### Características Visuais
- **Capa**: Hero grande (360px), imagem com overlay
- **Avatar**: 140px, borda grossa (4px) com glow
- **Tipografia**: Display bold (Clash Display), 36px, gradiente roxo
- **Tags**: Pills preenchidas com ícones, máx 4 tags
- **Ações**: Botões sólidos no canto superior direito
- **Elemento Extra**: Padrão geométrico sutil na capa

### Quando Usar
✅ Criadores de conteúdo (YouTubers, influencers, streamers)
✅ Empreendedores digitais que vendem cursos/produtos
✅ Artistas e músicos que precisam de presença forte
✅ Quando o objetivo é conversão rápida e captura de atenção

### Vantagem
Gera impacto imediato, diferenciação máxima. Perfeito para quem compete por atenção em redes sociais.

### Exemplo de Uso
```typescript
headerConfig: {
  layout: 'bold',
  coverType: 'image',
  coverImage: 'https://...',
  tags: ['Criador', 'Empreendedor', 'Tech', 'Inovação'],
  showActions: true
}
```

---

## 3. ULTRA-MINIMAL (Brutalismo Premium)

### Características Visuais
- **Capa**: Mínima (80px), apenas cor sólida
- **Avatar**: 100px, quadrado com border-radius pequeno (8px)
- **Tipografia**: Mono ou sans condensada, 24px, uppercase
- **Tags**: Texto inline separado por "/" ou "·"
- **Ações**: Ícones minúsculos (16px), sem labels
- **Layout**: Horizontal (desktop) / stack compacto (mobile)
- **Espaçamento**: Mínimo, densidade alta

### Quando Usar
✅ Desenvolvedores e tech professionals (GitHub vibe)
✅ Designers experimentais que querem estética brutalista
✅ Perfis de portfólio onde os projetos são o foco absoluto
✅ Quando o usuário quer máxima eficiência e zero distração

### Vantagem
Extremamente rápido de carregar, zero fluff. Transmite seriedade técnica e confiança. Diferenciação por subtração.

### Exemplo de Uso
```typescript
headerConfig: {
  layout: 'minimal',
  coverType: 'solid',
  coverColor: '#0a0a0a',
  tags: ['Dev', 'Open Source'],
  showActions: true
}
```

---

## Configuração no Admin

### Campos Disponíveis

1. **Estilo do Header** (`layout`)
   - `clean`: Elegância Minimalista
   - `bold`: Impacto Visual
   - `minimal`: Brutalismo Premium

2. **Tipo de Capa** (`coverType`)
   - `solid`: Cor sólida com gradiente sutil
   - `image`: Imagem personalizada com overlay
   - `pattern`: Padrão geométrico

3. **Cor da Capa** (`coverColor`)
   - Hex color (ex: #1a1a1a)
   - Usado quando coverType = 'solid'

4. **Imagem de Capa** (`coverImage`)
   - URL ou base64
   - Usado quando coverType = 'image'

5. **Tags de Destaque** (`tags`)
   - Array de strings
   - Máximo 5 tags
   - Exibição varia por layout

6. **Mostrar Ações** (`showActions`)
   - Boolean
   - Controla visibilidade dos botões de ação

---

## Migração de Dados

Execute o script SQL fornecido no Supabase:

```bash
# Arquivo: supabase-header-layouts.sql
```

Páginas existentes receberão automaticamente:
- `header_layout`: 'bold' (padrão recomendado)
- `header_cover_type`: 'solid'
- `header_cover_color`: '#1a1a1a'
- `header_tags`: ['Profissional']
- `header_show_actions`: true

---

## Recomendação Estratégica

Para maximizar a percepção de valor premium:

1. **Implementar as 3 variações como templates** no onboarding
2. **Definir "Bold Statement" como padrão** (maior apelo visual)
3. **Permitir customização híbrida** (ex: layout Clean com capa Bold)

Cada variação atende um perfil psicográfico diferente e maximiza a percepção de valor através da **escolha consciente** do usuário.

---

## Componentes Criados

- `src/components/headers/CleanHeader.tsx`
- `src/components/headers/BoldHeader.tsx`
- `src/components/headers/MinimalHeader.tsx`
- `src/components/headers/index.ts`

## Tipos Atualizados

- `src/types/page.ts` - Adicionado `HeaderConfig`, `HeaderLayout`, `CoverType`

## Storage Atualizado

- `src/lib/supabaseStorage.ts` - Suporte completo para headerConfig
- `src/lib/storage.ts` - Migração automática de dados antigos

## Páginas Atualizadas

- `src/pages/PublicPage.tsx` - Renderização dinâmica dos headers
- `src/pages/AdminEditor.tsx` - Interface de configuração completa
