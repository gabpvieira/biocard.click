# 🚀 Deploy de Metadados Dinâmicos

## Passo a Passo para Deploy no Vercel

### 1. Commit e Push das Alterações

```bash
git add .
git commit -m "feat: implementar metadados dinâmicos por slug"
git push origin main
```

### 2. Configurar Variáveis de Ambiente no Vercel

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL = sua_url_do_supabase
VITE_SUPABASE_ANON_KEY = sua_chave_anonima
```

5. Clique em **Save**

### 3. Fazer Deploy

O deploy acontece automaticamente quando você faz push para o repositório.

Ou manualmente:
```bash
npm run build
vercel --prod
```

### 4. Verificar Deploy

1. Aguarde o deploy finalizar (1-2 minutos)
2. Acesse a URL do seu projeto
3. Teste a API: `https://seu-dominio.vercel.app/api/og?slug=teste`

## 🧪 Testes Pós-Deploy

### Teste 1: API Direta
```bash
curl "https://biocard.click/api/og?slug=seu-slug"
```

Deve retornar HTML com metadados.

### Teste 2: Simulação de Bot
```bash
curl -A "WhatsApp/2.0" "https://biocard.click/seu-slug"
```

Deve retornar HTML com metadados (não o index.html padrão).

### Teste 3: Navegador Normal
Acesse `https://biocard.click/seu-slug` no navegador.
Deve carregar a SPA React normalmente.

### Teste 4: Facebook Debugger
1. Acesse: https://developers.facebook.com/tools/debug/
2. Cole: `https://biocard.click/seu-slug`
3. Clique em "Debug"
4. Verifique se aparece:
   - Nome do cliente
   - Descrição personalizada
   - Foto do cliente

### Teste 5: WhatsApp Real
1. Abra o WhatsApp
2. Envie a URL para você mesmo
3. Aguarde o preview carregar
4. Verifique se mostra dados personalizados

## 📊 Monitoramento

### Ver Logs da API
1. Acesse Vercel Dashboard
2. Vá em **Functions**
3. Clique em `api/og.ts`
4. Veja os logs de execução

### Métricas Importantes
- **Invocations**: Quantas vezes a API foi chamada
- **Duration**: Tempo médio de resposta
- **Errors**: Taxa de erro
- **Cache Hit Rate**: Eficiência do cache

## 🐛 Troubleshooting

### Erro: "Missing Supabase credentials"
**Solução**: Verifique se as variáveis de ambiente estão configuradas no Vercel.

### Erro: "Page not found"
**Solução**: Verifique se o slug existe no banco de dados Supabase.

### Preview não aparece no WhatsApp
**Soluções**:
1. Aguarde 5-10 minutos (cache do WhatsApp)
2. Teste com outro número
3. Verifique se a imagem é pública e acessível

### API retorna 500
**Soluções**:
1. Verifique os logs no Vercel
2. Teste a conexão com Supabase
3. Verifique se a tabela `pages` existe
4. Confirme que o slug tem os campos: name, description, photo

### Metadados genéricos aparecem
**Soluções**:
1. Limpe o cache da plataforma (Facebook Debugger → "Scrape Again")
2. Aguarde o cache expirar (1 hora)
3. Verifique se o deploy foi concluído
4. Teste a API diretamente

## ✅ Checklist Final

- [ ] Código commitado e pushed
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Deploy concluído com sucesso
- [ ] API `/api/og` responde corretamente
- [ ] Teste com Facebook Debugger passou
- [ ] Teste com WhatsApp passou
- [ ] Navegador normal carrega SPA corretamente
- [ ] Logs não mostram erros
- [ ] Cache está funcionando

## 🎯 Próximos Passos

1. **Monitorar por 24h**: Verifique se não há erros nos logs
2. **Testar com clientes reais**: Peça para clientes compartilharem seus links
3. **Coletar feedback**: Veja se os previews estão aparecendo corretamente
4. **Otimizar imagens**: Considere comprimir imagens para carregamento mais rápido
5. **Adicionar analytics**: Rastreie quantos compartilhamentos cada cliente tem

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste a API diretamente com cURL
3. Valide os dados no Supabase
4. Consulte a documentação: `METADADOS_DINAMICOS.md`
