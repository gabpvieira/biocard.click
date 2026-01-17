# 🔐 CREDENCIAIS DO ADMINISTRADOR

## ✅ Usuário Admin Criado com Sucesso!

### Dados de Login:

**Email:** eugabrieldpv@gmail.com  
**Senha:** @biogab123654

**User ID:** 4ac9d3c7-d78c-47be-9e7e-83712efe329c  
**Status:** ✅ Confirmado e ativo  
**Permissão:** ✅ Administrador

---

## 🚀 Como usar:

1. Certifique-se de que o arquivo `.env` está configurado com a anon key do Supabase
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse: http://localhost:5173/admin
4. Faça login com as credenciais acima

---

## ⚠️ IMPORTANTE:

### Configurar a ANON KEY no .env

O arquivo `.env` precisa da chave anon real do Supabase.

**Para obter a chave:**

1. Acesse: https://supabase.com/dashboard/project/eoxlbkdsilnaxqpmuqfb
2. Vá em: **Settings → API**
3. Copie a chave **anon/public**
4. Cole no arquivo `.env`:

```env
VITE_SUPABASE_URL=https://eoxlbkdsilnaxqpmuqfb.supabase.co
VITE_SUPABASE_ANON_KEY=cole-a-chave-aqui
```

5. Reinicie o servidor: `npm run dev`

---

## ✅ Verificação

Execute no SQL Editor do Supabase para confirmar:

```sql
SELECT 
  u.email,
  u.email_confirmed_at,
  CASE WHEN a.id IS NOT NULL THEN 'YES' ELSE 'NO' END as is_admin
FROM auth.users u
LEFT JOIN admins a ON a.id = u.id
WHERE u.email = 'eugabrieldpv@gmail.com';
```

**Resultado esperado:**
- email: eugabrieldpv@gmail.com
- email_confirmed_at: (data/hora)
- is_admin: YES

---

## 🔒 Segurança

- ✅ Senha criptografada com bcrypt
- ✅ Email confirmado automaticamente
- ✅ Usuário vinculado à tabela admins
- ✅ Políticas RLS aplicadas

**IMPORTANTE:** Não compartilhe este arquivo! Ele contém credenciais sensíveis.

---

## 📝 Próximos passos:

1. ☐ Configurar ANON KEY no .env
2. ☐ Testar login em /admin
3. ☐ Criar primeira página de bio link
4. ☐ Deletar este arquivo após anotar as credenciais

---

**Data de criação:** 17/01/2026  
**Status:** ✅ PRONTO PARA USO
