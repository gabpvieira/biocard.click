# Organização de Documentação

## Regra: Arquivos Markdown na Pasta /docs

### Objetivo
Manter toda a documentação do projeto organizada em uma estrutura centralizada.

### Regras Obrigatórias

1. **Todos os arquivos .md devem ser criados na pasta `/docs`**
   - Exceção: `README.md` na raiz do projeto (arquivo principal)
   - Exceção: Arquivos .md em `.kiro/` (configurações do Kiro)

2. **Estrutura da pasta /docs**
   ```
   docs/
   ├── metadados/          # Documentação de metadados dinâmicos
   ├── headers/            # Documentação de headers/layouts
   ├── supabase/           # Documentação do Supabase
   ├── deploy/             # Guias de deploy
   └── guides/             # Guias gerais
   ```

3. **Nomenclatura de arquivos**
   - Use UPPER_CASE com underscores para documentos principais
   - Use kebab-case para guias e tutoriais
   - Seja descritivo: `METADADOS_DINAMICOS.md` não `meta.md`

4. **Quando criar documentação**
   - Sempre que implementar uma nova feature
   - Sempre que fazer mudanças significativas
   - Sempre que criar APIs ou integrações
   - Sempre que houver processos que precisam ser documentados

5. **Conteúdo obrigatório em cada documento**
   - Título claro no topo
   - Seção "Objetivo" ou "O que é"
   - Exemplos práticos quando aplicável
   - Links para documentos relacionados
   - Data de criação/atualização no final

### Exemplos

#### ✅ CORRETO
```bash
# Criar documentação de nova feature
docs/nova-feature/IMPLEMENTACAO.md
docs/nova-feature/GUIA_USO.md
docs/nova-feature/FAQ.md
```

#### ❌ INCORRETO
```bash
# NÃO criar na raiz
NOVA_FEATURE.md
implementacao.md
```

### Organização Atual

```
docs/
├── METADADOS_DINAMICOS.md
├── README_METADADOS.md
├── DEPLOY_METADADOS.md
├── FAQ_METADADOS.md
├── GUIA_VISUAL_VALIDACAO.md
├── COMANDOS_UTEIS.md
├── EXEMPLOS_PRATICOS.md
├── ANTES_DEPOIS.md
├── CHECKLIST_IMPLEMENTACAO.md
├── INDICE_METADADOS.md
├── APRESENTACAO_EXECUTIVA.md
├── SUMARIO_EXECUTIVO.md
├── README_IMPLEMENTACAO_COMPLETA.md
├── ARQUIVOS_CRIADOS.md
├── SUPABASE_SETUP.md
├── INTEGRACAO_COMPLETA.md
├── ENV_VARIABLES.md
├── CREDENCIAIS_ADMIN.md
├── MIGRACAO_DADOS.md
├── HEADER_LAYOUTS_GUIDE.md
├── IMPLEMENTACAO_HEADERS_COMPLETA.md
├── EXEMPLOS_VISUAIS_HEADERS.md
├── APLICAR_HEADER_LAYOUTS.md
├── COMPARACAO_LAYOUTS.md
├── MELHORIAS_BOLD_HEADER.md
├── CORRECAO_HEADER_CONFIG.md
├── CORRECAO_METATAGS.md
├── CORRECAO_404_PRODUCAO.md
├── COMO_OBTER_ANON_KEY.md
├── VERCEL_DEPLOY.md
├── TESTE_RAPIDO.md
├── CHECKLIST.md
├── RESUMO_EXECUCAO.md
└── RESUMO_FINAL.md
```

### Manutenção

- Revisar documentação a cada 3 meses
- Atualizar links quebrados
- Remover documentos obsoletos
- Consolidar documentos duplicados

### Ferramentas

- Use `test-og.html` e `test-local.js` na raiz (ferramentas executáveis)
- Mantenha apenas código executável fora de /docs
- Scripts SQL podem ficar na raiz ou em /docs/supabase/

---

**Criado em**: Janeiro 2026  
**Última atualização**: Janeiro 2026  
**Versão**: 1.0.0
