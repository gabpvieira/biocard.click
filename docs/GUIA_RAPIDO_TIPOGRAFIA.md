# Guia Rápido - Sistema Tipográfico

## Início Rápido (3 minutos)

### 1. Acesse o Editor
```
/admin/dashboard → Editar Página
```

### 2. Localize a Seção "Tipografia"
Role até encontrar o card com ícone de "Type" (Aa)

### 3. Escolha um Preset
Clique em um dos 5 presets disponíveis:

- **Minimal Tech** → Moderno com Clarkson
- **Clean Geometric** → Limpo com Poppins
- **Editorial Premium** → Sofisticado com Nohemi
- **Corporate** → Profissional com Montserrat
- **Elegant Serif** → Elegante com Playfair Display

### 4. Salve
Clique em "Salvar" no topo da página

## Personalização Avançada

### Abrir Configurações Avançadas
Clique em "Mostrar Configurações Avançadas"

### Ajustar por Seção
Para cada seção (Nome, Bio, Tags, etc):

1. **Família da Fonte** → Escolha entre as fontes da categoria
2. **Peso** → Regular, Medium, Semibold, Bold
3. **Tamanho** → Small, Medium, Large

### Resetar
Use "Resetar para Padrão" para voltar ao preset inicial

## Categorias e Quando Usar

| Categoria | Ideal Para | Sensação |
|-----------|-----------|----------|
| **Serif** | Escritores, blogs, marcas premium | Elegante, confiável |
| **Modern** | Tech, SaaS, startups | Moderna, editorial |
| **Geometric** | Design, minimalismo | Limpa, equilibrada |
| **Corporate** | Empresas, consultoria | Profissional, atemporal |
| **Creative** | Artistas, designers | Personalidade forte |

## Fontes Disponíveis

### Premium (Obrigatórias)
- ✨ **Clarkson** - Sans-serif moderna premium
- ✨ **Nohemi** - Editorial sofisticada
- ✨ **Poppins** - Geométrica popular
- ✨ **Montserrat** - Corporativa versátil

### Complementares
- Playfair Display (Serif)
- Lora (Serif)
- Inter (Sans-serif)
- Roboto (Sans-serif)
- Outfit (Geométrica)
- Space Grotesk (Creative)

## Exemplos de Combinações

### Tech Startup
```
Nome: Clarkson Bold
Bio: Inter Regular
Tags: Inter Medium
```

### Criador de Conteúdo
```
Nome: Nohemi Bold
Bio: Nohemi Regular
Tags: Nohemi Medium
```

### Empresa Corporativa
```
Nome: Montserrat Bold
Bio: Roboto Regular
Tags: Roboto Medium
```

### Blog Editorial
```
Nome: Playfair Display Bold
Bio: Lora Regular
Tags: Lora Medium
```

## Dicas de Performance

✅ **Faça:**
- Use presets prontos quando possível
- Mantenha 2-3 fontes diferentes no máximo
- Teste em mobile antes de publicar

❌ **Evite:**
- Misturar muitas fontes diferentes
- Usar apenas fontes pesadas (bold em tudo)
- Ignorar a legibilidade em telas pequenas

## Troubleshooting Rápido

**Fonte não aparece?**
→ Limpe o cache do navegador (Ctrl+Shift+R)

**Texto muito grande?**
→ Ajuste o tamanho para "Small" ou "Medium"

**Quer voltar ao padrão?**
→ Use "Resetar para Padrão" nas configurações avançadas

## Migração do Banco

Se você já tem páginas criadas, execute:

```sql
-- No Supabase SQL Editor
-- Cole e execute o conteúdo de supabase-typography.sql
```

Isso adiciona o campo `typography` às páginas existentes.

## Próximos Passos

1. ✅ Escolha um preset
2. ✅ Salve e visualize
3. ✅ Ajuste se necessário
4. ✅ Publique sua página

## Suporte

Dúvidas? Consulte:
- [Documentação Completa](./SISTEMA_TIPOGRAFICO.md)
- [Guia de Headers](./HEADER_LAYOUTS_GUIDE.md)
- [Personalização de Cores](./PERSONALIZACAO_CORES.md)

---

**Criado em:** 18 de Janeiro de 2026  
**Versão:** 1.0.0
