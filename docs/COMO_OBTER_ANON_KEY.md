# 🔑 Como Obter a ANON KEY do Supabase

## ❌ Erro Atual: "Invalid API key"

O arquivo `.env` está com uma chave placeholder. Você precisa substituir pela chave real.

---

## 📋 Passo a Passo:

### 1. Acesse o Dashboard do Supabase

Abra no navegador:
```
https://supabase.com/dashboard/project/eoxlbkdsilnaxqpmuqfb
```

### 2. Vá em Settings → API

No menu lateral esquerdo:
1. Clique em **⚙️ Settings** (ícone de engrenagem)
2. Clique em **API**

### 3. Copie a Anon Key

Na seção **Project API keys**, você verá:

- **Project URL**: `https://eoxlbkdsilnaxqpmuqfb.supabase.co` ✅
- **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ← **COPIE ESTA**
- **service_role**: (não use esta!)

**IMPORTANTE:** Copie a chave **anon public** (não a service_role!)

### 4. Cole no arquivo .env

Abra o arquivo `.env` na raiz do projeto e substitua:

**ANTES:**
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveGxia2RzaWxuYXhxcG11cWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTI0NTMsImV4cCI6MjA0NTI2ODQ1M30.placeholder
```

**DEPOIS:**
```env
VITE_SUPABASE_ANON_KEY=cole-a-chave-completa-aqui
```

### 5. Reinicie o Servidor

No terminal, pare o servidor (Ctrl+C) e inicie novamente:

```bash
npm run dev
```

### 6. Teste o Login

1. Acesse: http://localhost:5173/admin
2. Login:
   - Email: eugabrieldpv@gmail.com
   - Senha: @biogab123654

---

## 🎯 Exemplo de Chave Válida

A chave anon é um JWT (JSON Web Token) longo, parecido com:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE2MTYxNiwiZXhwIjoxOTMxNzM3NjE2fQ.exemplo_de_assinatura_jwt_aqui
```

**Características:**
- Começa com `eyJ`
- Tem 3 partes separadas por `.`
- É bem longa (200+ caracteres)
- NÃO termina com "placeholder"

---

## ⚠️ Segurança

- ✅ A chave **anon** é segura para usar no frontend
- ❌ NUNCA use a chave **service_role** no frontend
- ✅ O arquivo `.env` já está no `.gitignore`

---

## 🐛 Troubleshooting

### Ainda dá erro "Invalid API key"?

1. Verifique se copiou a chave completa (sem espaços)
2. Verifique se é a chave **anon** (não service_role)
3. Reinicie o servidor após alterar o .env
4. Limpe o cache do navegador (Ctrl+Shift+R)

### Não consegue acessar o dashboard?

- Faça login em: https://supabase.com
- Selecione o projeto: **biocard.click**
- Se não aparecer, verifique se está na organização correta

---

## 📞 Precisa de Ajuda?

Se ainda tiver problemas, me envie:
1. Print da tela de Settings → API do Supabase
2. As primeiras 20 letras da chave que você copiou
3. A mensagem de erro completa

---

**Próximo passo:** Obter a anon key e colar no .env
