# 👁️ Guia Visual de Validação - Metadados Dinâmicos

## 🎯 Como Validar se Está Funcionando

Este guia mostra visualmente o que você deve ver em cada etapa de validação.

---

## 1️⃣ Validação da API

### ✅ O que você DEVE ver

Ao acessar: `https://biocard.click/api/og?slug=joao-silva`

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    
    <!-- ✅ Título personalizado -->
    <title>João Silva | Biocard</title>
    
    <!-- ✅ Open Graph tags -->
    <meta property="og:title" content="João Silva" />
    <meta property="og:description" content="Desenvolvedor Full Stack" />
    <meta property="og:image" content="https://foto-do-joao.jpg" />
    
    <!-- ✅ Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="João Silva" />
    ...
  </head>
  <body>
    <!-- Conteúdo HTML -->
  </body>
</html>
```

### ❌ O que você NÃO deve ver

```html
<!-- ❌ Título genérico -->
<title>Biocard - Link na Bio Premium</title>

<!-- ❌ Sem metadados Open Graph -->
<!-- ❌ Erro 404 ou 500 -->
<!-- ❌ JSON em vez de HTML -->
```

---

## 2️⃣ Facebook Sharing Debugger

### Como Acessar
1. Vá para: https://developers.facebook.com/tools/debug/
2. Cole: `https://biocard.click/joao-silva`
3. Clique em "Debug"

### ✅ O que você DEVE ver

```
┌─────────────────────────────────────────────┐
│ Link Preview                                │
├─────────────────────────────────────────────┤
│                                             │
│  [Foto do João Silva - 1200x630]           │
│                                             │
│  João Silva                                 │
│  Desenvolvedor Full Stack                   │
│  Confira meus projetos e links              │
│                                             │
│  BIOCARD.CLICK                              │
│                                             │
└─────────────────────────────────────────────┘

Response Code: 200
og:title: João Silva ✅
og:description: Desenvolvedor Full Stack ✅
og:image: https://foto-do-joao.jpg ✅
og:url: https://biocard.click/joao-silva ✅
```

### ❌ O que você NÃO deve ver

```
❌ Response Code: 404 ou 500
❌ og:title: Biocard - Link na Bio Premium
❌ Imagem quebrada ou genérica
❌ Descrição genérica
❌ Warnings sobre metadados faltando
```

### 🔧 Se algo estiver errado

```
1. Clique em "Scrape Again" para limpar cache
2. Verifique se a API retorna HTML correto
3. Confirme que as variáveis de ambiente estão configuradas
4. Teste com outro slug
```

---

## 3️⃣ Twitter Card Validator

### Como Acessar
1. Vá para: https://cards-dev.twitter.com/validator
2. Cole: `https://biocard.click/joao-silva`
3. Clique em "Preview card"

### ✅ O que você DEVE ver

```
┌────────────────────────────────────┐
│ Card Preview                       │
├────────────────────────────────────┤
│                                    │
│  [Foto do João Silva]              │
│                                    │
│  João Silva                        │
│  Desenvolvedor Full Stack          │
│                                    │
│  🔗 biocard.click                  │
│                                    │
└────────────────────────────────────┘

Card type: summary_large_image ✅
Title: João Silva ✅
Description: Desenvolvedor Full Stack ✅
Image: https://foto-do-joao.jpg ✅
```

### ❌ O que você NÃO deve ver

```
❌ Card type: summary (sem imagem grande)
❌ Title: Biocard - Link na Bio Premium
❌ "Unable to render Card preview"
❌ Imagem não carrega
```

---

## 4️⃣ LinkedIn Post Inspector

### Como Acessar
1. Vá para: https://www.linkedin.com/post-inspector/
2. Cole: `https://biocard.click/joao-silva`
3. Clique em "Inspect"

### ✅ O que você DEVE ver

```
┌──────────────────────────────────────┐
│ Post Preview                         │
├──────────────────────────────────────┤
│                                      │
│  [Foto do João Silva - grande]       │
│                                      │
│  João Silva                          │
│  Desenvolvedor Full Stack            │
│  Confira meus projetos e links       │
│                                      │
│  biocard.click                       │
│                                      │
└──────────────────────────────────────┘

Status: Success ✅
Title: João Silva ✅
Description: Desenvolvedor Full Stack ✅
Image URL: https://foto-do-joao.jpg ✅
```

### ❌ O que você NÃO deve ver

```
❌ Status: Error
❌ Title: Biocard - Link na Bio Premium
❌ "No preview available"
❌ Imagem genérica
```

---

## 5️⃣ WhatsApp

### Como Testar
1. Abra o WhatsApp (mobile ou web)
2. Envie a URL para você mesmo: `https://biocard.click/joao-silva`
3. Aguarde 5-10 segundos

### ✅ O que você DEVE ver

```
┌──────────────────────────────┐
│ [Foto do João Silva]         │
│                              │
│ João Silva                   │
│ Desenvolvedor Full Stack     │
│                              │
│ biocard.click                │
└──────────────────────────────┘
```

### ❌ O que você NÃO deve ver

```
❌ Apenas o link sem preview
❌ Logo genérico do Biocard
❌ "Biocard - Link na Bio Premium"
❌ Imagem quebrada
```

### 💡 Dicas WhatsApp

- **Cache**: WhatsApp cacheia previews por horas
- **Solução**: Teste com outro número ou aguarde
- **Alternativa**: Adicione `?v=2` no final da URL para forçar novo preview

---

## 6️⃣ Navegador Normal

### Como Testar
1. Abra o navegador (Chrome, Firefox, Safari)
2. Acesse: `https://biocard.click/joao-silva`
3. Abra DevTools (F12)
4. Vá para a aba "Elements" ou "Inspector"
5. Procure por `<head>`

### ✅ O que você DEVE ver

```html
<head>
  <!-- ✅ Metadados dinâmicos inseridos pelo React -->
  <title>João Silva | Biocard</title>
  <meta property="og:title" content="João Silva">
  <meta property="og:description" content="Desenvolvedor Full Stack">
  <meta property="og:image" content="https://foto-do-joao.jpg">
  
  <!-- ✅ Página carrega normalmente -->
  <!-- ✅ Sem redirecionamentos -->
  <!-- ✅ SPA funciona corretamente -->
</head>
```

### ❌ O que você NÃO deve ver

```
❌ Página em branco
❌ Erro 404
❌ Redirecionamento para /api/og
❌ Metadados genéricos
```

---

## 7️⃣ Teste com cURL

### Como Testar

```bash
# Simular bot do WhatsApp
curl -A "WhatsApp/2.0" https://biocard.click/joao-silva
```

### ✅ O que você DEVE ver

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <title>João Silva | Biocard</title>
    <meta property="og:title" content="João Silva" />
    <meta property="og:description" content="Desenvolvedor Full Stack" />
    ...
  </head>
  ...
</html>
```

### ❌ O que você NÃO deve ver

```html
<!-- ❌ HTML da SPA sem metadados -->
<!doctype html>
<html lang="pt-BR">
  <head>
    <title>Biocard - Link na Bio Premium</title>
    <!-- Sem metadados personalizados -->
  </head>
  ...
</html>
```

---

## 8️⃣ Teste Local (Antes do Deploy)

### Como Testar

```bash
npm run test:og joao-silva
```

### ✅ O que você DEVE ver

```
🧪 Testando metadados dinâmicos...

📝 Slug: joao-silva

✅ Variáveis de ambiente encontradas

🔌 Conectando ao Supabase...
✅ Página encontrada!

📊 Dados da Página:
──────────────────────────────────────────────────
Nome: João Silva
Descrição: Desenvolvedor Full Stack
Foto: https://foto-do-joao.jpg
Slug: joao-silva
──────────────────────────────────────────────────

🏷️  Metadados que serão gerados:
──────────────────────────────────────────────────
Title: João Silva | Biocard
Description: Desenvolvedor Full Stack
URL: https://biocard.click/joao-silva
Image: https://foto-do-joao.jpg
──────────────────────────────────────────────────

✅ Validações:
──────────────────────────────────────────────────
✅ Nome preenchido
✅ Descrição preenchida
✅ Foto preenchida
✅ Slug válido
──────────────────────────────────────────────────
```

### ❌ O que você NÃO deve ver

```
❌ Erro: Variáveis de ambiente não configuradas
❌ Erro ao buscar página
❌ Página não encontrada
❌ Campos vazios
⚠️  Validações falhando
```

---

## 9️⃣ Interface de Teste (test-og.html)

### Como Usar
1. Abra `test-og.html` no navegador
2. Digite um slug
3. Clique em "Testar API"

### ✅ O que você DEVE ver

```
┌─────────────────────────────────────┐
│ ✅ Sucesso!                         │
│                                     │
│ Title: João Silva | Biocard         │
│ OG Title: João Silva                │
│ OG Description: Dev Full Stack      │
│ OG Image: https://foto-do-joao.jpg  │
│ Status: 200 OK                      │
└─────────────────────────────────────┘
```

### ❌ O que você NÃO deve ver

```
┌─────────────────────────────────────┐
│ ❌ Erro                             │
│                                     │
│ 404 Not Found                       │
│ ou                                  │
│ 500 Internal Server Error           │
└─────────────────────────────────────┘
```

---

## 🎯 Checklist Visual Rápido

Use este checklist para validação rápida:

```
[ ] API retorna HTML com metadados (/api/og?slug=teste)
[ ] Facebook Debugger mostra preview correto
[ ] Twitter Validator mostra card correto
[ ] LinkedIn Inspector mostra preview correto
[ ] WhatsApp mostra preview ao compartilhar
[ ] Navegador carrega SPA normalmente
[ ] cURL com user-agent de bot retorna metadados
[ ] Teste local passa todas as validações
[ ] Interface de teste mostra sucesso
[ ] Imagens carregam em todas as plataformas
```

---

## 🔍 Comparação Visual: Certo vs Errado

### Facebook Preview

#### ✅ CERTO
```
┌─────────────────────────────────────┐
│ [Foto do Cliente]                   │
│ Nome do Cliente                     │
│ Descrição personalizada             │
│ biocard.click                       │
└─────────────────────────────────────┘
```

#### ❌ ERRADO
```
┌─────────────────────────────────────┐
│ [Logo Biocard]                      │
│ Biocard - Link na Bio Premium       │
│ Crie sua página de links...         │
│ biocard.click                       │
└─────────────────────────────────────┘
```

---

## 💡 Dicas de Validação

### 1. Sempre teste em múltiplas plataformas
- Facebook
- Twitter
- LinkedIn
- WhatsApp

### 2. Limpe o cache quando necessário
- Facebook: "Scrape Again"
- Twitter: Recarregue a página
- LinkedIn: Teste novamente
- WhatsApp: Use outro número

### 3. Verifique os logs
```bash
vercel logs api/og.ts --follow
```

### 4. Teste com diferentes slugs
- Slug com foto
- Slug sem foto (deve usar fallback)
- Slug com caracteres especiais
- Slug inexistente (deve retornar 404)

---

## 🎉 Validação Completa

Se você vê ✅ em todos os itens acima:

```
┌─────────────────────────────────────┐
│                                     │
│   🎉 PARABÉNS!                      │
│                                     │
│   Metadados dinâmicos funcionando   │
│   perfeitamente em todas as         │
│   plataformas!                      │
│                                     │
│   ✅ Pronto para produção           │
│                                     │
└─────────────────────────────────────┘
```

---

**Próximo Passo**: Monitorar por 24h e coletar feedback de clientes reais! 🚀
