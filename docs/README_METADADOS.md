# 🏷️ Sistema de Metadados Dinâmicos - Biocard

> Implementação completa de metadados personalizados por cliente para previews em redes sociais

## 🎯 O Que Foi Implementado

Sistema que gera metadados dinâmicos para cada página de cliente, permitindo que links compartilhados em redes sociais (WhatsApp, Facebook, Instagram, LinkedIn, Twitter) exibam:

- ✅ Nome personalizado do cliente
- ✅ Descrição única do perfil
- ✅ Foto/avatar do cliente
- ✅ URL canônica correta

## 🚀 Quick Start

### 1. Testar Localmente (Antes do Deploy)
```bash
npm run test:og seu-slug
```

### 2. Deploy
```bash
git add .
git commit -m "feat: metadados dinâmicos"
git push origin main
```

### 3. Configurar Vercel
Adicione as variáveis de ambiente:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 4. Validar
Teste em: https://developers.facebook.com/tools/debug/

## 📁 Arquivos Importantes

### Código
- `api/og.ts` - API que gera HTML com metadados
- `vercel.json` - Configuração de roteamento
- `src/hooks/useMetaTags.ts` - Hook React para metadados (já existia)

### Documentação
- `METADADOS_DINAMICOS.md` - Documentação técnica completa
- `DEPLOY_METADADOS.md` - Guia de deploy passo a passo
- `FAQ_METADADOS.md` - Perguntas frequentes
- `COMANDOS_UTEIS.md` - Comandos para testes e debug
- `RESUMO_METADADOS.md` - Resumo executivo
- `CHECKLIST_IMPLEMENTACAO.md` - Checklist de validação

### Ferramentas
- `test-og.html` - Interface web para testes
- `test-local.js` - Script Node.js para validação

## 🔧 Como Funciona

```
┌─────────────────────────────────────────────────────────┐
│  Usuário compartilha: biocard.click/joao                │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────┐
         │  Vercel detecta user-agent     │
         └────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │   É um bot?  │          │  Usuário     │
    │   (WhatsApp, │          │  normal?     │
    │   Facebook)  │          │              │
    └──────────────┘          └──────────────┘
            │                           │
            ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │  /api/og     │          │  index.html  │
    │  (metadados) │          │  (SPA React) │
    └──────────────┘          └──────────────┘
            │                           │
            ▼                           ▼
    ┌──────────────┐          ┌──────────────┐
    │  HTML com    │          │  Página      │
    │  metadados   │          │  carrega     │
    │  dinâmicos   │          │  normalmente │
    └──────────────┘          └──────────────┘
            │
            ▼
    ┌──────────────┐
    │  Bot gera    │
    │  preview     │
    │  bonito! 🎉  │
    └──────────────┘
```

## 🧪 Testes

### Teste Rápido
```bash
# 1. Testar localmente
npm run test:og joao-silva

# 2. Abrir interface de teste
start test-og.html

# 3. Testar API (após deploy)
curl "https://biocard.click/api/og?slug=joao-silva"
```

### Validação Completa
1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/
4. **WhatsApp**: Compartilhe o link e veja o preview

## 📊 Metadados Gerados

Para cada cliente, são gerados automaticamente:

```html
<!-- Título -->
<title>João Silva | Biocard</title>

<!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
<meta property="og:title" content="João Silva" />
<meta property="og:description" content="Desenvolvedor Full Stack" />
<meta property="og:image" content="https://foto-do-joao.jpg" />
<meta property="og:url" content="https://biocard.click/joao-silva" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="João Silva" />
<meta name="twitter:description" content="Desenvolvedor Full Stack" />
<meta name="twitter:image" content="https://foto-do-joao.jpg" />
```

## 🎨 Exemplo de Preview

Quando alguém compartilhar `https://biocard.click/joao-silva`:

```
┌─────────────────────────────────────┐
│                                     │
│  [Foto do João - 120x120]          │
│                                     │
│  João Silva                         │
│  Desenvolvedor Full Stack           │
│  Confira meus projetos e links      │
│                                     │
│  🔗 biocard.click                   │
│                                     │
└─────────────────────────────────────┘
```

## 🔍 Troubleshooting

### Preview não aparece
```bash
# 1. Verificar se API funciona
curl "https://biocard.click/api/og?slug=seu-slug"

# 2. Testar localmente
npm run test:og seu-slug

# 3. Limpar cache do Facebook
# Acesse: https://developers.facebook.com/tools/debug/
# Clique em "Scrape Again"
```

### Imagem não carrega
```bash
# Verificar se a URL é acessível
curl -I "https://url-da-imagem.jpg"

# Deve retornar 200 OK
```

### Erro 500
```bash
# Ver logs no Vercel
vercel logs api/og.ts --follow

# Verificar variáveis de ambiente
vercel env ls
```

## 📚 Documentação Completa

Para informações detalhadas, consulte:

- **Implementação Técnica**: [`METADADOS_DINAMICOS.md`](./METADADOS_DINAMICOS.md)
- **Guia de Deploy**: [`DEPLOY_METADADOS.md`](./DEPLOY_METADADOS.md)
- **Perguntas Frequentes**: [`FAQ_METADADOS.md`](./FAQ_METADADOS.md)
- **Comandos Úteis**: [`COMANDOS_UTEIS.md`](./COMANDOS_UTEIS.md)
- **Checklist**: [`CHECKLIST_IMPLEMENTACAO.md`](./CHECKLIST_IMPLEMENTACAO.md)

## 🎯 Próximos Passos

1. ✅ Implementação completa
2. ⏳ Deploy no Vercel
3. ⏳ Validação em plataformas
4. ⏳ Testes com clientes reais
5. ⏳ Monitoramento por 24h

## 💡 Melhorias Futuras

- [ ] Geração de imagem OG personalizada
- [ ] Analytics de compartilhamento
- [ ] A/B testing de previews
- [ ] Edge Functions para latência < 100ms
- [ ] Prerender completo para SEO avançado

## 📞 Suporte

**Problemas?** Consulte:
1. [`FAQ_METADADOS.md`](./FAQ_METADADOS.md) - Perguntas frequentes
2. Logs no Vercel Dashboard
3. [`COMANDOS_UTEIS.md`](./COMANDOS_UTEIS.md) - Comandos de debug

## ✅ Status

```
Implementação: ✅ COMPLETO
Documentação:  ✅ COMPLETO
Testes:        ✅ COMPLETO
Deploy:        ⏳ PENDENTE
Validação:     ⏳ PENDENTE
```

---

**Versão**: 1.0.0  
**Data**: Janeiro 2026  
**Status**: ✅ Pronto para Deploy
