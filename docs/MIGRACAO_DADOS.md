# ✅ Migração de Dados - Página Mozeli Barbeiro

## 📊 Dados Migrados para o Supabase

### Página Criada:

**bio_pages:**
- **ID:** 6d130242-0fe9-4af8-a24d-06713da87fa1
- **Slug:** mozeli-barbeiro
- **Nome:** Mozeli Barbeiro
- **Descrição:** Barbeiro profissional especializado há mais de 5 anos. Transformando vidas através da autoestima e excelência no corte.
- **CTA:** Conheça meus cursos ou entre em contato!

### Cards Criados:

**page_cards:**

1. **ZapCorte** (posição 0)
   - Link: https://www.zapcorte.com.br?src=MozeliBarbeiro
   - ID: 5cc9231f-e5cd-419a-882e-f865b11f62cc

2. **Cursos Grátis** (posição 1)
   - Link: https://mozelibarbeiro-cursos.vercel.app/
   - ID: d1db8bdd-7fe6-4ed2-9509-b01a7c994cfc

3. **Curso Platinado** (posição 2)
   - Link: https://pay.cakto.com.br/3c2nivy_525940?src=bio-tiktok-insta
   - ID: b44fd82a-989c-4b03-a0ae-21eafcddc36d

4. **Instagram** (posição 3)
   - Link: https://www.instagram.com/mozeli_barbeiro/
   - ID: 604a212e-93f2-44c4-951c-b1018a69d9e5

---

## ⚠️ Observação Importante

### Imagens Placeholder

Os cards foram criados com URLs de imagens placeholder porque:

1. As imagens originais estavam em `src/assets/` (local)
2. Para funcionar em produção, as imagens precisam estar no Supabase Storage

### 📸 Próximo Passo: Upload das Imagens Reais

Você precisa fazer upload das imagens para o bucket `bio-images`:

**Imagens necessárias:**
1. `src/assets/profile.png` → Foto de perfil
2. `src/assets/card-zapcorte.png` → Card ZapCorte
3. `src/assets/capa-cursos-gratis.png` → Card Cursos
4. `src/assets/bio-platinado.png` → Card Platinado
5. `src/assets/seguir-instagram.png` → Card Instagram

**Como fazer upload:**

1. Acesse o Supabase Dashboard
2. Vá em Storage → bio-images
3. Clique em "Upload file"
4. Faça upload de cada imagem
5. Copie a URL pública de cada uma
6. Atualize a página no admin com as URLs reais

---

## 🔄 Como Atualizar as Imagens

### Via Admin Dashboard:

1. Acesse: `/admin`
2. Login com: eugabrieldpv@gmail.com
3. Clique em "Editar" na página mozeli-barbeiro
4. Faça upload das imagens reais
5. Salve

### Via SQL (se preferir):

```sql
-- Atualizar foto de perfil
UPDATE bio_pages
SET photo = 'URL_DA_FOTO_REAL'
WHERE slug = 'mozeli-barbeiro';

-- Atualizar imagem do card ZapCorte
UPDATE page_cards
SET image = 'URL_DA_IMAGEM_REAL'
WHERE id = '5cc9231f-e5cd-419a-882e-f865b11f62cc';

-- Repita para os outros cards...
```

---

## ✅ Status Atual

- ✅ Página criada no banco de dados
- ✅ 4 cards criados e vinculados
- ✅ Links configurados corretamente
- ✅ Ordem dos cards preservada
- ⚠️ Imagens precisam ser uploadadas

---

## 🧪 Testar

### Verificar no Supabase:

```sql
SELECT 
  p.slug,
  p.name,
  COUNT(c.id) as total_cards
FROM bio_pages p
LEFT JOIN page_cards c ON c.page_id = p.id
WHERE p.slug = 'mozeli-barbeiro'
GROUP BY p.slug, p.name;
```

**Resultado esperado:**
- slug: mozeli-barbeiro
- name: Mozeli Barbeiro
- total_cards: 4

### Acessar a Página:

**Desenvolvimento:**
```
http://localhost:5173/mozeli-barbeiro
```

**Produção (após deploy):**
```
https://seu-dominio.vercel.app/mozeli-barbeiro
```

---

## 📝 Notas

1. **localStorage vs Supabase:**
   - Antes: Dados no localStorage (apenas local)
   - Agora: Dados no Supabase (persistente e acessível)

2. **Imagens:**
   - Antes: Assets locais em `src/assets/`
   - Agora: Precisam estar no Supabase Storage

3. **Edição:**
   - Use o admin dashboard para editar
   - Ou faça queries SQL diretas

---

**Status:** ✅ Dados migrados com sucesso!  
**Próximo passo:** Upload das imagens reais no Supabase Storage
