# Como Aplicar os Novos Layouts de Header

## Passo 1: Executar Migration no Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor** (menu lateral esquerdo)
3. Clique em **New Query**
4. Copie e cole o conteúdo do arquivo `supabase-header-layouts.sql`
5. Clique em **Run** para executar

### O que a migration faz:
- ✅ Adiciona 6 novas colunas na tabela `bio_pages`
- ✅ Define valores padrão para páginas existentes
- ✅ Adiciona constraints de validação
- ✅ Adiciona comentários de documentação

---

## Passo 2: Verificar a Migration

Execute este SQL para confirmar que as colunas foram criadas:

```sql
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'bio_pages'
AND column_name LIKE 'header_%';
```

Você deve ver 6 colunas:
- `header_layout`
- `header_cover_type`
- `header_cover_image`
- `header_cover_color`
- `header_tags`
- `header_show_actions`

---

## Passo 3: Testar no Admin

1. Acesse `/admin` e faça login
2. Crie uma nova página ou edite uma existente
3. Você verá a nova seção **"Configuração do Header"** com:
   - Seletor de estilo (Clean, Bold, Minimal)
   - Tipo de capa (Solid, Image, Pattern)
   - Cor da capa (color picker)
   - Upload de imagem de capa
   - Tags de destaque
   - Toggle de ações rápidas

---

## Passo 4: Visualizar na Página Pública

1. Salve a página no admin
2. Acesse `/:slug` para ver o resultado
3. O header será renderizado de acordo com o layout escolhido

---

## Estrutura de Dados

### Exemplo de `headerConfig` no banco:

```json
{
  "header_layout": "bold",
  "header_cover_type": "image",
  "header_cover_image": "https://...",
  "header_cover_color": "#1a1a1a",
  "header_tags": ["Criador", "Tech", "Empreendedor"],
  "header_show_actions": true
}
```

---

## Troubleshooting

### Erro: "column does not exist"
**Solução**: Execute novamente o script `supabase-header-layouts.sql`

### Páginas antigas não aparecem
**Solução**: O código tem migração automática. Páginas antigas receberão valores padrão automaticamente.

### Imagem de capa não aparece
**Solução**: Verifique se o bucket `bio-images` está configurado como público no Supabase Storage.

---

## Próximos Passos

1. ✅ Migration aplicada
2. ✅ Código atualizado
3. 🔄 Testar criação de páginas
4. 🔄 Testar edição de páginas existentes
5. 🔄 Testar os 3 layouts diferentes
6. 🔄 Testar responsividade mobile

---

## Rollback (se necessário)

Se precisar reverter as mudanças:

```sql
ALTER TABLE bio_pages
DROP COLUMN IF EXISTS header_layout,
DROP COLUMN IF EXISTS header_cover_type,
DROP COLUMN IF EXISTS header_cover_image,
DROP COLUMN IF EXISTS header_cover_color,
DROP COLUMN IF EXISTS header_tags,
DROP COLUMN IF EXISTS header_show_actions;
```

⚠️ **ATENÇÃO**: Isso apagará todas as configurações de header salvas!
