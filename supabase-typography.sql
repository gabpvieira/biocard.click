-- Migration: Add Typography Configuration to Pages
-- Description: Adds typography field to store font configurations per section
-- Date: 2026-01-18

-- Add typography column to pages table
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS typography JSONB DEFAULT NULL;

-- Add comment to explain the structure
COMMENT ON COLUMN pages.typography IS 'Typography configuration with font families, weights, and sizes for each section (profileName, bio, tags, buttons, cta, footer)';

-- Example typography structure:
-- {
--   "category": "modern",
--   "profileName": { "family": "Clarkson", "weight": "bold", "size": "lg" },
--   "bio": { "family": "Clarkson", "weight": "regular", "size": "md" },
--   "tags": { "family": "Clarkson", "weight": "medium", "size": "sm" },
--   "buttons": { "family": "Clarkson", "weight": "semibold", "size": "md" },
--   "cta": { "family": "Clarkson", "weight": "medium", "size": "md" },
--   "footer": { "family": "Clarkson", "weight": "regular", "size": "sm" }
-- }

-- Update existing pages with default typography (optional)
UPDATE pages 
SET typography = jsonb_build_object(
  'category', 'modern',
  'profileName', jsonb_build_object('family', 'Clarkson', 'weight', 'bold', 'size', 'lg'),
  'bio', jsonb_build_object('family', 'Clarkson', 'weight', 'regular', 'size', 'md'),
  'tags', jsonb_build_object('family', 'Clarkson', 'weight', 'medium', 'size', 'sm'),
  'buttons', jsonb_build_object('family', 'Clarkson', 'weight', 'semibold', 'size', 'md'),
  'cta', jsonb_build_object('family', 'Clarkson', 'weight', 'medium', 'size', 'md'),
  'footer', jsonb_build_object('family', 'Clarkson', 'weight', 'regular', 'size', 'sm')
)
WHERE typography IS NULL;
