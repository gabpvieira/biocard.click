-- ============================================
-- HEADER LAYOUTS V2 - MIGRATION
-- ============================================
-- Atualização para suportar tags com ícones customizáveis

-- 1. Alterar coluna header_tags de TEXT[] para JSONB
ALTER TABLE bio_pages
ALTER COLUMN header_tags TYPE JSONB USING 
  CASE 
    WHEN header_tags IS NULL THEN '[]'::jsonb
    ELSE jsonb_agg(jsonb_build_object('text', tag, 'icon', 'sparkles'))
    FROM unnest(header_tags) AS tag
  END;

-- 2. Atualizar comentário
COMMENT ON COLUMN bio_pages.header_tags IS 'Tags de destaque com ícones: [{text: string, icon: string}]';

-- 3. Atualizar páginas existentes para garantir formato correto
UPDATE bio_pages
SET header_tags = '[]'::jsonb
WHERE header_tags IS NULL OR header_tags::text = 'null';

-- 4. Exemplo de como ficam as tags agora:
-- [
--   {"text": "Barbeiro Profissional", "icon": "scissors"},
--   {"text": "+De 1000 alunos", "icon": "users"},
--   {"text": "Cursos e Mentorias", "icon": "graduation-cap"}
-- ]
