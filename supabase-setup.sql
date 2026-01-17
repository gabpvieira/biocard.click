-- ============================================
-- BIOCARD.CLICK - SUPABASE DATABASE SETUP
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para verificar se tudo está configurado corretamente

-- 1. Verificar tabelas existentes
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_name IN ('bio_pages', 'page_cards', 'admins')
ORDER BY table_name;

-- 2. Verificar bucket de storage
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'bio-images';

-- 3. Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('bio_pages', 'page_cards', 'admins')
ORDER BY tablename, policyname;

-- 4. Verificar políticas de storage
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects'
ORDER BY policyname;

-- 5. Listar administradores
SELECT a.id, a.email, a.created_at, u.email as auth_email
FROM admins a
LEFT JOIN auth.users u ON u.id = a.id;

-- ============================================
-- CRIAR PRIMEIRO ADMINISTRADOR
-- ============================================
-- IMPORTANTE: Primeiro crie o usuário no Supabase Auth:
-- 1. Vá em Authentication → Users → Add User
-- 2. Adicione email e senha
-- 3. Depois execute o comando abaixo substituindo o email

-- Adicionar usuário como admin (SUBSTITUA O EMAIL)
-- INSERT INTO admins (id, email)
-- SELECT id, email
-- FROM auth.users
-- WHERE email = 'seu@email.com';

-- ============================================
-- DADOS DE TESTE (OPCIONAL)
-- ============================================
-- Descomente para criar uma página de teste

-- INSERT INTO bio_pages (slug, name, photo, description, cta_text)
-- VALUES (
--   'teste',
--   'Página de Teste',
--   'https://via.placeholder.com/150',
--   'Esta é uma página de teste criada automaticamente',
--   'Confira meus links!'
-- )
-- RETURNING id;

-- Depois de criar a página, copie o ID retornado e use abaixo
-- INSERT INTO page_cards (page_id, image, link, position)
-- VALUES 
--   ('COLE-O-ID-AQUI', 'https://via.placeholder.com/400x200', 'https://example.com/link1', 0),
--   ('COLE-O-ID-AQUI', 'https://via.placeholder.com/400x200', 'https://example.com/link2', 1);
