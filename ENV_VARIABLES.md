# 🔐 Variáveis de Ambiente - Biocard.click

## 📋 Lista Completa

### Para Desenvolvimento Local (.env)

```env
VITE_SUPABASE_URL=https://eoxlbkdsilnaxqpmuqfb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveGxia2RzaWxuYXhxcG11cWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMjcyNTMsImV4cCI6MjA3NjgwMzI1M30.NmTTGiGn1uMAdEtwnOJ6KGgS7ZR_abZX2etOKCOrWRE
```

### Para Vercel (Environment Variables)

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `VITE_SUPABASE_URL` | `https://eoxlbkdsilnaxqpmuqfb.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `[sua-chave-anon]` | Production, Preview, Development |

---

## 🎯 Como Obter os Valores

### 1. VITE_SUPABASE_URL

**Valor fixo:**
```
https://eoxlbkdsilnaxqpmuqfb.supabase.co
```

**Onde encontrar:**
- Supabase Dashboard → Settings → API → Project URL

---

### 2. VITE_SUPABASE_ANON_KEY

**Onde encontrar:**

1. Acesse: https://supabase.com/dashboard/project/eoxlbkdsilnaxqpmuqfb
2. Vá em: **Settings → API**
3. Copie: **anon public** (NÃO a service_role!)

**Formato esperado:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveGxia2RzaWxuYXhxcG11cWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTI0NTMsImV4cCI6MjA0NTI2ODQ1M30.[assinatura-jwt]
```

**Características:**
- ✅ Começa com `eyJ`
- ✅ Tem 3 partes separadas por `.`
- ✅ É longa (200+ caracteres)
- ❌ NÃO termina com "placeholder"

---

## 🚀 Configuração Rápida

### Desenvolvimento Local

1. Copie o arquivo `.env.example`:
```bash
cp .env.example .env
```

2. Edite o `.env` e adicione suas chaves

3. Reinicie o servidor:
```bash
npm run dev
```

### Vercel

**Via Dashboard:**
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em: **Settings → Environment Variables**
4. Adicione cada variável
5. Redeploy o projeto

**Via CLI:**
```bash
vercel env add VITE_SUPABASE_URL
# Cole: https://eoxlbkdsilnaxqpmuqfb.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Cole sua anon key

vercel --prod
```

---

## ✅ Validação

### Verificar se está configurado corretamente:

**No navegador (Console):**
```javascript
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurada' : 'Não configurada');
```

**Resultado esperado:**
```
URL: https://eoxlbkdsilnaxqpmuqfb.supabase.co
Key: Configurada
```

---

## 🐛 Problemas Comuns

### ❌ "Invalid API key"

**Causa:** Anon key incorreta

**Solução:**
1. Verifique se copiou a chave **anon** (não service_role)
2. Confirme que não há espaços extras
3. Verifique se a chave tem 3 partes separadas por `.`

### ❌ "Missing Supabase environment variables"

**Causa:** Variáveis não configuradas

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Confirme que as variáveis começam com `VITE_`
3. Reinicie o servidor após criar o `.env`

### ❌ Variáveis não carregam no Vercel

**Causa:** Não configuradas ou não redeployado

**Solução:**
1. Verifique em Settings → Environment Variables
2. Confirme que estão marcadas para Production
3. Faça um redeploy manual

---

## 🔒 Segurança

### ✅ Seguro para usar:

- ✅ `VITE_SUPABASE_URL` - URL pública
- ✅ `VITE_SUPABASE_ANON_KEY` - Chave pública (protegida por RLS)

### ❌ NUNCA use no frontend:

- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Acesso total ao banco
- ❌ Senhas ou tokens privados
- ❌ Chaves de API de terceiros

### 📝 Boas Práticas:

1. ✅ Adicione `.env` no `.gitignore` (já está)
2. ✅ Use `.env.example` como template
3. ✅ Documente as variáveis necessárias
4. ✅ Use RLS para proteger os dados
5. ❌ Nunca commite o `.env` real

---

## 📊 Ambientes

### Development (Local)

```env
# .env
VITE_SUPABASE_URL=https://eoxlbkdsilnaxqpmuqfb.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

### Preview (Vercel)

Mesmas variáveis, configuradas no Vercel Dashboard

### Production (Vercel)

Mesmas variáveis, configuradas no Vercel Dashboard

---

## 📞 Precisa de Ajuda?

### Recursos:

- [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) - Guia completo de deploy
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Configuração do Supabase
- [COMO_OBTER_ANON_KEY.md](COMO_OBTER_ANON_KEY.md) - Como obter a chave

### Checklist:

- [ ] Arquivo `.env` criado localmente
- [ ] Variáveis configuradas no Vercel
- [ ] Anon key copiada corretamente
- [ ] Servidor reiniciado após configurar
- [ ] Projeto redeployado no Vercel

---

**Próximo passo:** Configure as variáveis e teste o projeto! 🚀
