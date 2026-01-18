# Implementação de Metadados Dinâmicos

## 📋 Resumo da Implementação

Sistema de metadados dinâmicos implementado para que cada página de cliente (`/{slug}`) exiba suas próprias informações ao ser compartilhada em redes sociais e plataformas de mensagem.

## 🎯 Problema Resolvido

Antes: Links compartilhados exibiam metadados genéricos do biocard.click
Agora: Cada link exibe nome, descrição e imagem personalizados do cliente

## 🔧 Arquitetura da Solução

### 1. API Serverless (`api/og.ts`)
- Função serverless Vercel que gera HTML com metadados dinâmicos
- Busca dados do cliente no Supabase baseado no slug
- Retorna HTML completo com todas as meta tags necessárias
- Cache configurado: 1 hora (s-maxage) + revalidação em background

### 2. Roteamento Inteligente (`vercel.json`)
- Detecta user-agents de bots/crawlers
- Redireciona bots para `/api/og?slug={slug}` (HTML com metadados)
- Usuários normais recebem a SPA React normal
- Lista de bots detectados:
  - WhatsApp
  - Facebook (facebookexternalhit)
  - Twitter/X (Twitterbot)
  - LinkedIn (LinkedInBot)
  - Telegram (TelegramBot)
  - Discord (Discordbot)
  - Slack (Slackbot)
  - Pinterest
  - E outros crawlers genéricos

### 3. Metadados Implementados

Para cada página de cliente, são gerados:

#### Open Graph (Facebook, WhatsApp, LinkedIn)
```html
<meta property="og:type" content="profile" />
<meta property="og:url" content="https://biocard.click/{slug}" />
<meta property="og:title" content="{Nome do Cliente}" />
<meta property="og:description" content="{Descrição do Cliente}" />
<meta property="og:image" content="{Foto do Cliente}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Biocard" />
```

#### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{Nome do Cliente}" />
<meta name="twitter:description" content="{Descrição do Cliente}" />
<meta name="twitter:image" content="{Foto do Cliente}" />
```

#### SEO Básico
```html
<title>{Nome do Cliente} | Biocard</title>
<meta name="description" content="{Descrição do Cliente}" />
<link rel="canonical" href="https://biocard.click/{slug}" />
```

## 🚀 Como Funciona

### Fluxo para Bots/Crawlers:
1. Bot acessa `https://biocard.click/{slug}`
2. Vercel detecta user-agent do bot
3. Requisição é redirecionada para `/api/og?slug={slug}`
4. API busca dados do cliente no Supabase
5. HTML com metadados é gerado e retornado
6. Bot lê os metadados e gera preview

### Fluxo para Usuários Normais:
1. Usuário acessa `https://biocard.click/{slug}`
2. Vercel serve o `index.html` da SPA
3. React Router carrega a página do cliente
4. Hook `useMetaTags` atualiza metadados no cliente (SEO)

## 📦 Instalação

```bash
npm install @vercel/node --save-dev
```

## 🧪 Como Testar

### 1. Teste Local (Simulação)
```bash
# Testar a API diretamente
curl "http://localhost:8080/api/og?slug=seu-slug"
```

### 2. Teste com Ferramentas Online

#### Facebook Sharing Debugger
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL: `https://biocard.click/{seu-slug}`
3. Clique em "Debug"
4. Verifique se os metadados aparecem corretamente

#### Twitter Card Validator
1. Acesse: https://cards-dev.twitter.com/validator
2. Cole a URL: `https://biocard.click/{seu-slug}`
3. Clique em "Preview card"

#### LinkedIn Post Inspector
1. Acesse: https://www.linkedin.com/post-inspector/
2. Cole a URL: `https://biocard.click/{seu-slug}`
3. Clique em "Inspect"

#### WhatsApp (Teste Real)
1. Envie a URL para você mesmo no WhatsApp
2. Aguarde o preview carregar
3. Verifique nome, descrição e imagem

### 3. Teste com cURL (Simular Bot)
```bash
# Simular WhatsApp
curl -A "WhatsApp/2.0" https://biocard.click/{seu-slug}

# Simular Facebook
curl -A "facebookexternalhit/1.1" https://biocard.click/{seu-slug}

# Verificar se retorna HTML com metadados
```

### 4. Limpar Cache de Previews

Se você atualizou os dados e o preview não mudou:

**Facebook:**
1. Acesse o Sharing Debugger
2. Cole a URL
3. Clique em "Scrape Again"

**LinkedIn:**
1. Acesse o Post Inspector
2. Cole a URL
3. Clique em "Inspect" novamente

**WhatsApp:**
- Não há como forçar atualização
- Cache expira automaticamente após algumas horas

## ⚙️ Configuração de Variáveis de Ambiente

As seguintes variáveis devem estar configuradas no Vercel:

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 🔍 Troubleshooting

### Preview não aparece
- Verifique se o slug existe no banco de dados
- Teste a API diretamente: `/api/og?slug={slug}`
- Limpe o cache da plataforma

### Imagem não carrega
- Verifique se a URL da imagem é pública
- Teste a URL da imagem diretamente no navegador
- Certifique-se que a imagem tem pelo menos 200x200px

### Metadados genéricos aparecem
- Limpe o cache da plataforma
- Aguarde alguns minutos (cache pode levar tempo para expirar)
- Verifique se o deploy foi concluído com sucesso

### API retorna erro 500
- Verifique os logs no Vercel Dashboard
- Confirme que as variáveis de ambiente estão configuradas
- Teste a conexão com o Supabase

## 📊 Monitoramento

### Logs da API
Acesse o Vercel Dashboard:
1. Vá para seu projeto
2. Clique em "Functions"
3. Selecione `api/og.ts`
4. Veja os logs de execução

### Métricas
- Tempo de resposta da API
- Taxa de cache hit
- Erros de execução

## ✅ Checklist de Validação

- [ ] API `/api/og` retorna HTML com metadados
- [ ] Facebook Sharing Debugger mostra preview correto
- [ ] Twitter Card Validator mostra preview correto
- [ ] LinkedIn Post Inspector mostra preview correto
- [ ] WhatsApp mostra preview ao compartilhar link
- [ ] Imagens carregam corretamente
- [ ] Descrições aparecem sem caracteres especiais quebrados
- [ ] URLs canônicas estão corretas
- [ ] Cache está funcionando (verificar headers)
- [ ] Fallback funciona quando slug não existe

## 🎨 Melhorias Futuras

1. **Imagem OG Personalizada**: Gerar imagem dinâmica com nome e foto do cliente
2. **A/B Testing**: Testar diferentes formatos de preview
3. **Analytics**: Rastrear compartilhamentos por plataforma
4. **Prerender**: Considerar prerender completo para SEO
5. **CDN**: Otimizar entrega de imagens

## 📚 Referências

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
