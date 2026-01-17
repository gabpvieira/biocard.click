-- ============================================
-- HEADER LAYOUTS - MIGRATION
-- ============================================
-- Execute este script no SQL Editor do Supabase

-- 1. Adicionar colunas de configuração de header na tabela bio_pages
ALTER TABLE bio_pages
ADD COLUMN IF NOT EXISTS header_layout VARCHAR(20) DEFAULT 'bold' CHECK (header_layout IN ('clean', 'bold', 'minimal')),
ADD COLUMN IF NOT EXISTS header_cover_type VARCHAR(20) DEFAULT 'solid' CHECK (header_cover_type IN ('image', 'solid', 'pattern')),
ADD COLUMN IF NOT EXISTS header_cover_image TEXT,
ADD COLUMN IF NOT EXISTS header_cover_color VARCHAR(7) DEFAULT '#1a1a1a',
ADD COLUMN IF NOT EXISTS header_tags TEXT[], -- Array de tags
ADD COLUMN IF NOT EXISTS header_show_actions BOOLEAN DEFAULT true;

-- 2. Comentários para documentação
COMMENT ON COLUMN bio_pages.header_layout IS 'Layout do header: clean (elegante), bold (impacto), minimal (brutalista)';
COMMENT ON COLUMN bio_pages.header_cover_type IS 'Tipo de capa: image, solid, pattern';
COMMENT ON COLUMN bio_pages.header_cover_image IS 'URL da imagem de capa (quando cover_type = image)';
COMMENT ON COLUMN bio_pages.header_cover_color IS 'Cor da capa em hex (quando cover_type = solid)';
COMMENT ON COLUMN bio_pages.header_tags IS 'Tags de destaque do perfil';
COMMENT ON COLUMN bio_pages.header_show_actions IS 'Mostrar botões de ação rápida';

-- 3. Atualizar páginas existentes com valores padrão
UPDATE bio_pages
SET 
  header_layout = 'bold',
  header_cover_type = 'solid',
  header_cover_color = '#1a1a1a',
  header_tags = ARRAY['Profissional'],
  header_show_actions = true
WHERE header_layout IS NULL;
