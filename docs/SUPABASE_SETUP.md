# Configuração do Supabase

## 1. Obter as credenciais do Supabase

1. Acesse o dashboard do Supabase: https://supabase.com/dashboard
2. Selecione o projeto: `biocard.click` (ID: eoxlbkdsilnaxqpmuqfb)
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL**: `https://eoxlbkdsilnaxqpmuqfb.supabase.co`
   - **anon/public key**: A chave pública (anon key)

## 2. Configurar variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto e adicione:

```env
VITE_SUPABASE_URL=https://eoxlbkdsilnaxqpmuqfb.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

## 3. Criar primeiro usuário administrador

Execute no SQL Editor do Supabase:

```sql
-- Primeiro, crie um usuário no Supabase Auth
-- Vá em Authentication → Users → Add User
-- Email: seu@email.com
-- Password: sua-senha-segura

-- Depois, adicione o usuário como admin (substitua o email)
INSERT INTO admins (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'seu@email.com';
```

## 4. Estrutura do banco de dados

### Tabelas criadas:

- **bio_pages**: Páginas de bio link
- **page_cards**: Cards/links das páginas
- **admins**: Administradores do sistema

### Bucket de storage:

- **bio-images**: Armazenamento de imagens (limite 10MB por arquivo)

### Políticas de segurança (RLS):

- ✅ Leitura pública para páginas e imagens
- ✅ Apenas admins podem criar/editar/deletar

## 5. Testar a integração

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse `/admin` e faça login com as credenciais criadas

3. Crie uma página de teste

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe e está configurado corretamente
- Reinicie o servidor de desenvolvimento

### Erro: "User is not an admin"
- Verifique se o usuário foi adicionado na tabela `admins`
- Execute a query SQL acima para adicionar o usuário

### Erro de permissão ao criar página
- Verifique se está logado como admin
- Verifique as políticas RLS no Supabase Dashboard
