# ❓ FAQ - Metadados Dinâmicos

## Perguntas Frequentes sobre Implementação de Metadados

### 🎯 Geral

#### Por que os metadados dinâmicos são importantes?
Quando você compartilha um link em redes sociais (WhatsApp, Facebook, Instagram), essas plataformas leem os metadados da página para gerar um preview visual. Sem metadados dinâmicos, todos os links mostrariam o mesmo preview genérico do site, em vez de mostrar informações personalizadas de cada cliente.

#### Como funciona a detecção de bots?
O Vercel verifica o `user-agent` de cada requisição. Se detectar palavras-chave como "WhatsApp", "facebookexternalhit", "Twitterbot", etc., redireciona para a API que gera HTML com metadados. Usuários normais recebem a SPA React.

#### Isso afeta o SEO?
Sim, positivamente! Cada página agora tem título, descrição e URL canônica únicos, melhorando o SEO. Além disso, o hook `useMetaTags` atualiza os metadados no cliente para navegadores.

---

### 🔧 Implementação

#### Por que usar Serverless Function em vez de SSR completo?
SSR completo (como Next.js) seria mais robusto, mas requer migração completa do projeto. A solução com Serverless Function é:
- Mais simples de implementar
- Não requer mudanças no código React existente
- Suficiente para metadados de redes sociais
- Mantém a performance da SPA

#### Por que não usar apenas `useMetaTags` no React?
Bots de redes sociais não executam JavaScript. Eles apenas leem o HTML inicial. Por isso, precisamos gerar HTML com metadados no servidor.

#### Posso usar Edge Functions em vez de Serverless?
Sim, mas requer ajustes. Edge Functions são mais rápidas (executam mais perto do usuário), mas têm limitações. A implementação atual usa Serverless Functions por compatibilidade.

---

### 🧪 Testes

#### Como testar localmente antes do deploy?
```bash
npm run test:og seu-slug
```
Ou abra `test-og.html` no navegador.

#### Por que o preview não aparece no WhatsApp?
Possíveis causas:
1. **Cache**: WhatsApp cacheia previews por horas. Teste com outro número.
2. **Imagem inacessível**: Verifique se a URL da imagem é pública.
3. **Deploy não concluído**: Aguarde o deploy finalizar.
4. **Slug inválido**: Verifique se o slug existe no banco.

#### Como limpar o cache do Facebook?
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole a URL
3. Clique em "Scrape Again"

#### Como testar sem fazer deploy?
Use o script local:
```bash
npm run test:og seu-slug
```
Ele simula o comportamento da API sem precisar de deploy.

---

### 🐛 Problemas Comuns

#### Erro: "Missing Supabase credentials"
**Causa**: Variáveis de ambiente não configuradas no Vercel.

**Solução**:
1. Acesse Vercel Dashboard
2. Settings → Environment Variables
3. Adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
4. Redeploy

#### Erro: "Page not found"
**Causa**: Slug não existe no banco de dados.

**Solução**:
1. Verifique se o slug está correto
2. Acesse o Supabase e confirme que a página existe
3. Teste com outro slug conhecido

#### Preview mostra dados antigos
**Causa**: Cache da plataforma.

**Solução**:
1. **Facebook**: Use o Sharing Debugger e clique em "Scrape Again"
2. **WhatsApp**: Aguarde algumas horas ou teste com outro número
3. **LinkedIn**: Use o Post Inspector novamente
4. Verifique se o cache da API está configurado corretamente

#### Imagem não aparece no preview
**Causas possíveis**:
1. URL da imagem não é pública
2. Imagem muito pequena (mínimo 200x200px)
3. Formato não suportado
4. CORS bloqueando acesso

**Soluções**:
1. Teste a URL da imagem diretamente no navegador
2. Use imagens de pelo menos 1200x630px
3. Use formatos JPG ou PNG
4. Certifique-se que o Supabase Storage está público

#### API retorna 500
**Causas possíveis**:
1. Erro de conexão com Supabase
2. Variáveis de ambiente incorretas
3. Tabela ou campos não existem
4. Erro de sintaxe no código

**Soluções**:
1. Verifique os logs no Vercel Dashboard
2. Teste a conexão com Supabase
3. Confirme que a tabela `pages` tem os campos: name, description, photo, slug
4. Verifique se há erros de TypeScript

---

### ⚙️ Configuração

#### Preciso configurar algo no Supabase?
Não, desde que:
1. A tabela `pages` exista
2. Tenha os campos: name, description, photo, slug
3. As políticas RLS permitam leitura pública

#### Preciso configurar DNS?
Não, se você já usa o domínio no Vercel. A API funciona automaticamente em `/api/og`.

#### Como adicionar mais plataformas de detecção?
Edite `vercel.json` e adicione o user-agent na regex:
```json
"value": ".*(bot|crawler|NovoBot|OutroBot).*"
```

---

### 🚀 Performance

#### Qual o tempo de resposta da API?
Geralmente 200-500ms, dependendo da latência do Supabase.

#### Como melhorar a performance?
1. **Cache**: Já configurado (1 hora)
2. **CDN**: Use CDN para imagens (Cloudflare, Cloudinary)
3. **Edge Functions**: Migre para Edge se precisar de < 100ms
4. **Otimizar imagens**: Comprima e redimensione imagens

#### O cache pode causar problemas?
Sim, se você atualizar dados do cliente, o preview pode demorar até 1 hora para atualizar. Para forçar atualização:
1. Use o Sharing Debugger do Facebook
2. Ou aguarde o cache expirar

---

### 💰 Custos

#### Isso aumenta os custos do Vercel?
Minimamente. Serverless Functions têm 100k invocações grátis/mês. Com cache de 1 hora, o uso é baixo.

#### E os custos do Supabase?
Não aumenta. São apenas queries SELECT simples, já incluídas no plano gratuito.

---

### 🔐 Segurança

#### Os metadados expõem dados sensíveis?
Não, apenas dados já públicos (nome, descrição, foto). Não exponha dados privados nos metadados.

#### Preciso autenticar a API?
Não, a API precisa ser pública para que bots possam acessar. Use apenas dados públicos.

#### Como proteger contra abuso?
O Vercel tem rate limiting automático. Se necessário, adicione rate limiting customizado.

---

### 📱 Mobile

#### Funciona em apps mobile?
Sim! Quando você compartilha um link em apps mobile (WhatsApp, Instagram, etc.), eles usam os mesmos metadados.

#### Preciso fazer algo diferente para mobile?
Não, a implementação funciona automaticamente para desktop e mobile.

---

### 🎨 Personalização

#### Como personalizar a imagem do preview?
Atualmente usa a foto do cliente. Para gerar imagens personalizadas:
1. Use serviços como Cloudinary ou Imgix
2. Ou implemente geração de imagem dinâmica (mais complexo)

#### Posso mudar o formato do título?
Sim, edite `api/og.ts`:
```typescript
<title>${escapedName} - Meu Site</title>
```

#### Como adicionar mais metadados?
Edite `api/og.ts` e adicione as tags desejadas:
```html
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Biocard" />
```

---

### 🔄 Manutenção

#### Como atualizar os metadados de um cliente?
1. Atualize os dados no Supabase
2. Aguarde o cache expirar (1 hora)
3. Ou force atualização no Facebook Debugger

#### Como monitorar erros?
1. Vercel Dashboard → Functions → api/og.ts
2. Configure alertas no Vercel
3. Use ferramentas como Sentry (opcional)

#### Como fazer backup?
```bash
git archive --format=zip --output=backup.zip HEAD
```

---

### 🆘 Suporte

#### Onde ver os logs?
Vercel Dashboard → Functions → api/og.ts → Logs

#### Como reportar um bug?
1. Verifique os logs no Vercel
2. Teste a API diretamente
3. Documente o erro e os passos para reproduzir

#### Onde encontrar mais ajuda?
- Documentação: `METADADOS_DINAMICOS.md`
- Deploy: `DEPLOY_METADADOS.md`
- Comandos: `COMANDOS_UTEIS.md`
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs

---

### 🎓 Aprendizado

#### Quero entender melhor Open Graph
- Documentação oficial: https://ogp.me/
- Facebook Debugger: https://developers.facebook.com/tools/debug/

#### Quero aprender sobre Twitter Cards
- Documentação: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards

#### Quero entender Serverless Functions
- Vercel Docs: https://vercel.com/docs/functions/serverless-functions

---

**Não encontrou sua pergunta?** Consulte a documentação completa em `METADADOS_DINAMICOS.md` ou verifique os logs no Vercel Dashboard.
