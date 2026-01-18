# 🧪 Teste Rápido dos Headers

## ⚡ Passo a Passo para Testar

### 1. Aplicar Migration no Supabase (2 minutos)

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Menu lateral → **SQL Editor**
4. Clique em **New Query**
5. Copie todo o conteúdo de `supabase-header-layouts.sql`
6. Cole no editor
7. Clique em **Run** (ou F5)
8. ✅ Deve aparecer: "Success. No rows returned"

### 2. Verificar Migration (30 segundos)

Execute este SQL para confirmar:

```sql
SELECT column_name 
FROM information_schema.columns
WHERE table_name = 'bio_pages'
AND column_name LIKE 'header_%';
```

✅ Deve retornar 6 linhas:
- header_layout
- header_cover_type
- header_cover_image
- header_cover_color
- header_tags
- header_show_actions

### 3. Testar no Admin (3 minutos)

1. Inicie o projeto: `npm run dev`
2. Acesse: `http://localhost:5173/admin`
3. Faça login
4. Clique em **Nova Página** ou edite uma existente
5. Role até **"Configuração do Header"**
6. ✅ Você deve ver:
   - 3 cards com preview visual (Clean, Bold, Minimal)
   - Seletor de tipo de capa
   - Color picker
   - Campo de tags
   - Toggle de ações

### 4. Testar Layout CLEAN (1 minuto)

1. Selecione **Clean Premium**
2. Tipo de capa: **Solid**
3. Cor: `#1a1a1a` (padrão)
4. Tags: Digite "Designer" e pressione Enter
5. Tags: Digite "Criativo" e pressione Enter
6. Clique em **Salvar**
7. Acesse `/:slug` da página
8. ✅ Deve ver:
   - Capa média com gradiente
   - Avatar centralizado com borda fina roxa
   - Tags com borda, sem background
   - Ícones ghost (outline)

### 5. Testar Layout BOLD (1 minuto)

1. Edite a mesma página
2. Selecione **Bold Statement**
3. Tipo de capa: **Image**
4. Upload uma imagem de capa
5. Tags: "Criador", "Tech", "Empreendedor"
6. Clique em **Salvar**
7. Acesse `/:slug`
8. ✅ Deve ver:
   - Hero grande (360px)
   - Imagem de capa com overlay
   - Avatar com glow roxo
   - Nome com gradiente
   - Tags preenchidas com ícones
   - Botões no canto superior direito

### 6. Testar Layout MINIMAL (1 minuto)

1. Edite a mesma página
2. Selecione **Ultra-Minimal**
3. Tipo de capa: **Solid**
4. Cor: `#0a0a0a`
5. Tags: "Dev", "Tech"
6. Clique em **Salvar**
7. Acesse `/:slug`
8. ✅ Deve ver:
   - Capa mínima (80px)
   - Avatar quadrado pequeno
   - Layout horizontal (desktop)
   - Tags inline com "/"
   - Ícones minúsculos

### 7. Testar Responsividade (1 minuto)

1. Abra DevTools (F12)
2. Ative modo responsivo (Ctrl+Shift+M)
3. Teste em:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
4. ✅ Todos os layouts devem se adaptar perfeitamente

### 8. Testar Ações Rápidas (30 segundos)

1. Na página pública, clique em:
   - 🔗 Copiar link → Deve copiar URL
   - 📤 Compartilhar → Deve abrir share nativo (mobile) ou copiar
   - ✉️ Contato → Deve abrir email
2. ✅ Todas as ações devem funcionar

### 9. Testar Toggle de Ações (30 segundos)

1. No admin, desative **"Mostrar Ações Rápidas"**
2. Salve
3. Acesse `/:slug`
4. ✅ Os botões de ação não devem aparecer

### 10. Testar Migração de Dados Antigos (1 minuto)

1. Se você tem páginas antigas (sem headerConfig):
2. Acesse `/:slug` de uma página antiga
3. ✅ Deve renderizar com layout Bold (padrão)
4. ✅ Não deve dar erro no console

---

## 🎯 Checklist de Teste

- [ ] Migration aplicada no Supabase
- [ ] 6 colunas criadas verificadas
- [ ] Seção "Configuração do Header" aparece no admin
- [ ] Preview visual dos 3 layouts funciona
- [ ] Layout Clean renderiza corretamente
- [ ] Layout Bold renderiza corretamente
- [ ] Layout Minimal renderiza corretamente
- [ ] Upload de imagem de capa funciona
- [ ] Color picker funciona
- [ ] Sistema de tags funciona (Enter para adicionar)
- [ ] Limite de 5 tags é respeitado
- [ ] Toggle de ações funciona
- [ ] Botão copiar link funciona
- [ ] Botão compartilhar funciona
- [ ] Botão contato funciona
- [ ] Responsividade mobile funciona
- [ ] Páginas antigas não quebram

---

## 🐛 Problemas Comuns

### "headerConfig is undefined"
**Causa**: Migration não aplicada ou código não atualizado
**Solução**: 
1. Verifique se a migration foi executada
2. Limpe cache do navegador (Ctrl+Shift+R)
3. Reinicie o servidor de dev

### Layout não muda
**Causa**: Cache do navegador
**Solução**: 
1. Abra modo anônimo
2. Ou limpe cache (Ctrl+Shift+Delete)

### Imagem de capa não aparece
**Causa**: Bucket não público ou URL inválida
**Solução**:
1. Supabase → Storage → bio-images
2. Clique nos 3 pontos → Make public
3. Ou use base64 (upload direto)

### Tags não aparecem
**Causa**: Array vazio
**Solução**: 
1. Digite uma tag no campo
2. Pressione Enter (não clique fora)
3. Verifique se apareceu a pill

### Erro ao salvar
**Causa**: Validação ou conexão com Supabase
**Solução**:
1. Verifique console do navegador
2. Verifique .env (VITE_SUPABASE_URL e ANON_KEY)
3. Verifique se está autenticado

---

## ✅ Teste Completo em 10 Minutos

Se todos os itens do checklist passarem, a implementação está 100% funcional! 🎉

---

## 📸 Screenshots Esperados

### Admin - Configuração
```
┌─────────────────────────────────────┐
│ 🎨 Configuração do Header          │
├─────────────────────────────────────┤
│                                     │
│ [Clean]  [Bold]  [Minimal]         │
│  Preview Preview Preview            │
│                                     │
│ Tipo de Capa: ○ Solid ○ Image     │
│                                     │
│ Cor: [#1a1a1a] [Color Picker]     │
│                                     │
│ Tags: [Digite e pressione Enter]   │
│ [Designer] [Criativo]              │
│                                     │
│ Mostrar Ações: [Toggle ON]        │
└─────────────────────────────────────┘
```

### Página Pública - Bold
```
┌─────────────────────────────────────┐
│                                     │
│        [HERO IMAGE 360px]          │
│                              🔗 📤  │
│                                     │
└─────────────────────────────────────┘
  ┌─────┐
  │ 140 │ Mozeli Barbeiro (gradiente)
  │ px  │ 
  └─────┘ Barbeiro profissional...
  
  [✨ Criador] [✨ Tech] [✨ Expert]
  
  Conheça meus cursos!
```

---

**Tempo total de teste**: ~10 minutos
**Resultado esperado**: ✅ Tudo funcionando perfeitamente!
