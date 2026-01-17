# 🚀 Deploy no Vercel - Biocard.click

## 📋 Variáveis de Ambiente Necessárias

Para o projeto funcionar no Vercel, você precisa configurar as seguintes variáveis de ambiente:

### 🔑 Variáveis Obrigatórias

| Nome da Variável | Valor | Onde Obter |
|-----------------|-------|------------|
| `VITE_SUPABASE_URL` | `https://eoxlbkdsilnaxqpmuqfb.supabase.co` | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase Dashboard → Settings → API → anon/public key |

---

## 🎯 Como Configurar no Vercel

### Método 1: Via Dashboard (Recomendado)

1. **Acesse seu projeto no Vercel**
   - https://vercel.com/dashboard

2. **Vá em Settings → Environment Variables**

3. **Adicione cada variável:**

   **Variável 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://eoxlbkdsilnaxqpmuqfb.supabase.co`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Clique em **Save**

   **Variável 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `[cole sua anon key aqui]`
   - Environment: ✅ Production, ✅ Preview, ✅ Development
   - Clique em **Save**

4. **Redeploy o projeto**
   - Vá em Deployments
   - Clique nos 3 pontos do último deploy
   - Clique em **Redeploy**

### Método 2: Via CLI

```bash
# Instale a CLI do Vercel (se ainda não tiver)
npm i -g vercel

# Faça login
vercel login

# Configure as variáveis
vercel env add VITE_SUPABASE_URL
# Cole: https://eoxlbkdsilnaxqpmuqfb.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Cole sua anon key

# Deploy
vercel --prod
```

---

## 📝 Como Obter a ANON KEY

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/eoxlbkdsilnaxqpmuqfb
   ```

2. **Navegue até Settings → API**
   - No menu lateral: ⚙️ Settings
   - Clique em: API

3. **Copie a chave correta**
   
   ⚠️ **IMPORTANTE**: Copie a chave **anon public**, NÃO a service_role!
   
   ```
   Project API keys
   ├── anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ← ESTA AQUI
   └── service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ← NÃO USE
   ```

4. **Cole no Vercel**
   - A chave é longa (200+ caracteres)
   - Começa com `eyJ`
   - Tem 3 partes separadas por `.`

---

## 🔧 Configuração Adicional do Vercel

### vercel.json (Opcional)

Crie um arquivo `vercel.json` na raiz do projeto para configurações avançadas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Build Settings no Dashboard

Se não usar `vercel.json`, configure no dashboard:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## ✅ Checklist de Deploy

Antes de fazer o deploy, verifique:

- [ ] Código commitado e pushed para o GitHub
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Anon key copiada corretamente (sem espaços)
- [ ] Usuário admin criado no Supabase
- [ ] Tabelas e políticas RLS configuradas
- [ ] Bucket de storage criado

---

## 🧪 Testar Após Deploy

1. **Acesse a URL do Vercel**
   - Ex: `https://biocard-click.vercel.app`

2. **Teste a página pública**
   - Acesse: `https://seu-dominio.vercel.app/mozeli-barbeiro`
   - Deve carregar sem erros

3. **Teste o login admin**
   - Acesse: `https://seu-dominio.vercel.app/admin`
   - Login: eugabrieldpv@gmail.com
   - Senha: @biogab123654

4. **Teste criar uma página**
   - Crie uma nova página no dashboard
   - Verifique se salva corretamente

---

## 🐛 Troubleshooting

### Erro: "Invalid API key"

**Causa**: Anon key incorreta ou não configurada

**Solução**:
1. Verifique se a variável `VITE_SUPABASE_ANON_KEY` está configurada
2. Confirme que copiou a chave **anon** (não service_role)
3. Verifique se não há espaços extras
4. Redeploy após corrigir

### Erro: "Failed to fetch"

**Causa**: URL do Supabase incorreta

**Solução**:
1. Verifique se `VITE_SUPABASE_URL` está correta
2. Deve ser: `https://eoxlbkdsilnaxqpmuqfb.supabase.co`
3. Sem barra no final

### Erro: "User is not an admin"

**Causa**: Usuário não está na tabela `admins`

**Solução**:
1. Execute no SQL Editor do Supabase:
```sql
INSERT INTO admins (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'eugabrieldpv@gmail.com';
```

### Build falha no Vercel

**Causa**: Dependências ou configuração incorreta

**Solução**:
1. Verifique se `package.json` está correto
2. Teste o build localmente: `npm run build`
3. Verifique os logs de build no Vercel

---

## 🔒 Segurança

### ✅ Boas Práticas:

- ✅ Use apenas a chave **anon** no frontend
- ✅ Nunca exponha a chave **service_role**
- ✅ Mantenha as variáveis de ambiente privadas
- ✅ Use RLS para proteger os dados
- ✅ Habilite HTTPS (Vercel faz automaticamente)

### ❌ Não Faça:

- ❌ Não commite o arquivo `.env` no Git
- ❌ Não use a service_role key no frontend
- ❌ Não desabilite o RLS nas tabelas
- ❌ Não compartilhe suas credenciais

---

## 📊 Monitoramento

### Logs do Vercel

Acesse os logs em tempo real:
```
https://vercel.com/[seu-usuario]/biocard-click/logs
```

### Analytics

Habilite o Vercel Analytics para monitorar:
- Pageviews
- Performance
- Erros

---

## 🎉 Deploy Automático

Configure deploy automático:

1. **Conecte o GitHub ao Vercel**
   - Vercel detecta automaticamente pushes

2. **Branches**
   - `main` → Production
   - Outras branches → Preview

3. **Pull Requests**
   - Cada PR gera um preview deploy

---

## 📞 Suporte

### Recursos Úteis:

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Vite + Vercel](https://vitejs.dev/guide/static-deploy.html#vercel)

### Precisa de Ajuda?

1. Verifique os logs de build no Vercel
2. Teste localmente primeiro: `npm run build && npm run preview`
3. Consulte a documentação do projeto

---

## 📋 Resumo Rápido

**Variáveis necessárias:**
```env
VITE_SUPABASE_URL=https://eoxlbkdsilnaxqpmuqfb.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**Onde configurar:**
- Vercel Dashboard → Settings → Environment Variables

**Onde obter:**
- Supabase Dashboard → Settings → API

**Próximo passo:**
- Configure as variáveis e faça o deploy! 🚀

---

**Status:** ✅ Pronto para deploy no Vercel
