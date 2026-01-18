-- Adicionar coluna theme_colors na tabela bio_pages
-- Execute este script no SQL Editor do Supabase

ALTER TABLE bio_pages 
ADD COLUMN IF NOT EXISTS theme_colors JSONB DEFAULT '{"primary": "#a855f7", "accent": "#c084fc", "background": "#0a0a0a"}'::jsonb;

-- Atualizar páginas existentes com cores padrão (se ainda não tiverem)
UPDATE bio_pages 
SET theme_colors = '{"primary": "#a855f7", "accent": "#c084fc", "background": "#0a0a0a"}'::jsonb
WHERE theme_colors IS NULL;

-- Comentário da coluna
COMMENT ON COLUMN bio_pages.theme_colors IS 'Cores personalizadas do tema da página (primary, accent, background)';
