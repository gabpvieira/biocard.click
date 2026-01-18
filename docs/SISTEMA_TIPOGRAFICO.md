# Sistema Tipográfico Avançado - Biocard.click

## Objetivo

Implementar um sistema tipográfico premium e altamente personalizável que permite aos usuários criar identidades visuais únicas através da escolha e configuração de fontes por seção da página.

## O que é

Um sistema completo de gerenciamento de tipografia que oferece:
- 5 categorias tipográficas distintas
- Fontes premium (Clarkson, Nohemi, Poppins, Montserrat)
- Configuração independente por seção
- Presets prontos para uso rápido
- Performance otimizada com carregamento dinâmico

## Categorias Tipográficas

### 1. Serif (Editorial / Autoridade)
**Uso ideal:** Criadores de conteúdo, escritores, marcas pessoais premium

**Fontes disponíveis:**
- Playfair Display
- Merriweather
- Lora

**Sensação:** Elegante, confiável, sofisticada

### 2. Modern (Premium Sans-serif)
**Uso ideal:** SaaS, tecnologia, perfis profissionais modernos

**Fontes disponíveis:**
- **Clarkson** (fonte premium obrigatória)
- **Nohemi**
- Inter

**Sensação:** Moderna, editorial, alto padrão

### 3. Geometric (Design Moderno)
**Uso ideal:** Design limpo, organização visual, minimalismo

**Fontes disponíveis:**
- **Poppins**
- **Montserrat**
- Outfit

**Sensação:** Limpa, geométrica, equilibrada

### 4. Corporate (Profissional)
**Uso ideal:** Empresas, perfis institucionais, consultoria

**Fontes disponíveis:**
- Inter
- Roboto
- Open Sans

**Sensação:** Profissional, confiável, atemporal

### 5. Creative (Estilizada)
**Uso ideal:** Designers, artistas, criadores de conteúdo

**Fontes disponíveis:**
- Nohemi
- Outfit
- Space Grotesk

**Sensação:** Personalidade forte, diferenciada, criativa

## Configuração por Seção

O sistema permite configurar fontes individualmente para cada seção:

### Seções Configuráveis

1. **Nome do Perfil** (`profileName`)
   - Elemento mais destacado
   - Geralmente bold ou semibold
   - Tamanho large

2. **Bio / Descrição** (`bio`)
   - Texto principal descritivo
   - Peso regular ou medium
   - Tamanho medium

3. **Tags de Destaque** (`tags`)
   - Pills de informação
   - Peso medium
   - Tamanho small

4. **Botões / Links** (`buttons`)
   - Cards clicáveis
   - Peso semibold
   - Tamanho medium

5. **CTA (Call to Action)** (`cta`)
   - Texto de chamada
   - Peso medium ou semibold
   - Tamanho medium

6. **Rodapé** (`footer`)
   - Informações secundárias
   - Peso regular
   - Tamanho small

### Propriedades Configuráveis

Para cada seção, você pode ajustar:

- **Família da Fonte** (`family`): Nome da fonte
- **Peso** (`weight`): regular, medium, semibold, bold
- **Tamanho** (`size`): sm, md, lg
- **Espaçamento** (`letterSpacing`): Opcional, em pixels

## Presets Prontos

### 1. Minimal Tech
**Categoria:** Modern  
**Fonte principal:** Clarkson  
**Ideal para:** Startups, tech, SaaS

```typescript
{
  category: 'modern',
  profileName: { family: 'Clarkson', weight: 'bold', size: 'lg' },
  bio: { family: 'Clarkson', weight: 'regular', size: 'md' },
  tags: { family: 'Clarkson', weight: 'medium', size: 'sm' },
  buttons: { family: 'Clarkson', weight: 'semibold', size: 'md' },
  cta: { family: 'Clarkson', weight: 'medium', size: 'md' },
  footer: { family: 'Clarkson', weight: 'regular', size: 'sm' }
}
```

### 2. Clean Geometric
**Categoria:** Geometric  
**Fonte principal:** Poppins  
**Ideal para:** Design limpo, minimalismo

### 3. Editorial Premium
**Categoria:** Modern  
**Fonte principal:** Nohemi  
**Ideal para:** Conteúdo editorial, criadores

### 4. Corporate
**Categoria:** Corporate  
**Fonte principal:** Montserrat  
**Ideal para:** Empresas, consultoria

### 5. Elegant Serif
**Categoria:** Serif  
**Fonte principal:** Playfair Display  
**Ideal para:** Escritores, marcas premium

## Implementação Técnica

### Estrutura de Dados

```typescript
interface TypographyConfig {
  category: FontCategory;
  profileName: FontConfig;
  bio: FontConfig;
  tags: FontConfig;
  buttons: FontConfig;
  cta: FontConfig;
  footer: FontConfig;
}

interface FontConfig {
  family: string;
  weight: FontWeight;
  size?: FontSize;
  letterSpacing?: number;
}
```

### Arquivos Criados

1. **`src/types/page.ts`** - Tipos TypeScript
2. **`src/lib/typography.ts`** - Lógica e utilitários
3. **`src/components/TypographyPicker.tsx`** - Interface de seleção
4. **`src/components/TypographyProvider.tsx`** - Carregamento de fontes
5. **`supabase-typography.sql`** - Migração do banco

### Carregamento de Fontes

O sistema carrega fontes dinamicamente via Google Fonts:

```typescript
// Detecta fontes usadas
const fonts = getUsedFonts(typography);

// Gera URL otimizada
const fontUrl = getGoogleFontsUrl(fonts);

// Carrega apenas as fontes necessárias
<link rel="stylesheet" href={fontUrl} />
```

### Aplicação de Estilos

```typescript
// Gera CSS inline para cada seção
const style = getFontStyle(typography.profileName);

// Aplica no componente
<h1 style={style}>{name}</h1>
```

## Como Usar no Admin

### 1. Acesse o Editor
- Entre no painel admin
- Crie ou edite uma página

### 2. Seção de Tipografia
- Localize a seção "Tipografia"
- Escolha um preset pronto ou personalize

### 3. Presets Rápidos
- Clique em um dos presets disponíveis
- A configuração é aplicada instantaneamente

### 4. Configuração Avançada
- Clique em "Mostrar Configurações Avançadas"
- Ajuste fonte, peso e tamanho por seção
- Use "Resetar para Padrão" se necessário

### 5. Preview e Salvar
- Use o botão "Preview" para visualizar
- Clique em "Salvar" para aplicar

## Exemplos Práticos

### Exemplo 1: Perfil Tech Moderno
```typescript
typography: {
  category: 'modern',
  profileName: { family: 'Clarkson', weight: 'bold', size: 'lg' },
  bio: { family: 'Inter', weight: 'regular', size: 'md' },
  tags: { family: 'Inter', weight: 'medium', size: 'sm' },
  buttons: { family: 'Clarkson', weight: 'semibold', size: 'md' },
  cta: { family: 'Clarkson', weight: 'medium', size: 'md' },
  footer: { family: 'Inter', weight: 'regular', size: 'sm' }
}
```

### Exemplo 2: Perfil Editorial
```typescript
typography: {
  category: 'serif',
  profileName: { family: 'Playfair Display', weight: 'bold', size: 'lg' },
  bio: { family: 'Lora', weight: 'regular', size: 'md' },
  tags: { family: 'Lora', weight: 'medium', size: 'sm' },
  buttons: { family: 'Lora', weight: 'semibold', size: 'md' },
  cta: { family: 'Playfair Display', weight: 'medium', size: 'md' },
  footer: { family: 'Lora', weight: 'regular', size: 'sm' }
}
```

### Exemplo 3: Perfil Corporativo
```typescript
typography: {
  category: 'corporate',
  profileName: { family: 'Montserrat', weight: 'bold', size: 'lg' },
  bio: { family: 'Roboto', weight: 'regular', size: 'md' },
  tags: { family: 'Roboto', weight: 'medium', size: 'sm' },
  buttons: { family: 'Montserrat', weight: 'semibold', size: 'md' },
  cta: { family: 'Montserrat', weight: 'medium', size: 'md' },
  footer: { family: 'Roboto', weight: 'regular', size: 'sm' }
}
```

## Performance

### Otimizações Implementadas

1. **Carregamento Dinâmico**
   - Apenas fontes usadas são carregadas
   - Evita sobrecarga desnecessária

2. **Font Display Swap**
   - Texto visível imediatamente
   - Fonte carrega em background

3. **Deduplicação**
   - Fontes repetidas são carregadas uma vez
   - Sistema detecta fontes já carregadas

4. **Fallback Seguro**
   - Sistema usa sans-serif como fallback
   - Garante legibilidade sempre

## Migração do Banco de Dados

Execute o script SQL para adicionar suporte:

```bash
# Via Supabase Dashboard
1. Acesse SQL Editor
2. Cole o conteúdo de supabase-typography.sql
3. Execute a migração

# Via CLI
supabase db push
```

## Compatibilidade

- ✅ Todos os navegadores modernos
- ✅ Mobile-first e responsivo
- ✅ Dark mode compatível
- ✅ Acessibilidade mantida
- ✅ Performance otimizada

## Troubleshooting

### Fonte não aparece
- Verifique se a fonte está na lista de disponíveis
- Confirme que o Google Fonts está acessível
- Limpe o cache do navegador

### Texto muito grande/pequeno
- Ajuste o tamanho (sm/md/lg) na configuração
- Use configurações avançadas para controle fino

### Performance lenta
- Reduza o número de fontes diferentes
- Use presets que compartilham fontes

## Roadmap Futuro

- [ ] Upload de fontes customizadas
- [ ] Mais presets temáticos
- [ ] Preview em tempo real no editor
- [ ] Sugestões baseadas em IA
- [ ] Biblioteca de combinações populares

## Links Relacionados

- [Documentação de Headers](./HEADER_LAYOUTS_GUIDE.md)
- [Personalização de Cores](./PERSONALIZACAO_CORES.md)
- [Guia de Implementação Completa](./README_IMPLEMENTACAO_COMPLETA.md)

---

**Criado em:** 18 de Janeiro de 2026  
**Última atualização:** 18 de Janeiro de 2026  
**Versão:** 1.0.0  
**Autor:** Sistema Biocard.click
