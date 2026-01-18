# 🎴 Biocard - Link na Bio Premium

> Plataforma premium para criação de páginas de links personalizadas com design sofisticado

## 🚀 Sobre o Projeto

Biocard é uma plataforma SaaS que permite criar páginas de links personalizadas (link in bio) com design premium, múltiplos layouts de header e metadados dinâmicos para compartilhamento em redes sociais.

## ✨ Principais Features

- ✅ **Múltiplos Layouts de Header**: Bold, Clean e Minimal
- ✅ **Metadados Dinâmicos**: Preview personalizado em todas as redes sociais
- ✅ **Editor Visual**: Interface intuitiva para personalização
- ✅ **Supabase Backend**: Banco de dados e storage integrados
- ✅ **Deploy Vercel**: Hospedagem otimizada e serverless functions
- ✅ **Responsive**: Design adaptável para todos os dispositivos

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage)
- **Deploy**: Vercel (Serverless Functions)
- **Roteamento**: React Router v6

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Supabase

# Iniciar desenvolvimento
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

Consulte [`docs/ENV_VARIABLES.md`](./docs/ENV_VARIABLES.md) para mais detalhes.

### Supabase Setup

Execute os scripts SQL na seguinte ordem:
1. `supabase-setup.sql` - Estrutura básica
2. `supabase-header-layouts-v2.sql` - Layouts de header

Consulte [`docs/SUPABASE_SETUP.md`](./docs/SUPABASE_SETUP.md) para instruções completas.

## 📚 Documentação

Toda a documentação está organizada na pasta [`/docs`](./docs/):

### 🎯 Início Rápido
- [`docs/README_METADADOS.md`](./docs/README_METADADOS.md) - Visão geral de metadados dinâmicos
- [`docs/SUPABASE_SETUP.md`](./docs/SUPABASE_SETUP.md) - Configuração do Supabase
- [`docs/TESTE_RAPIDO.md`](./docs/TESTE_RAPIDO.md) - Teste rápido do sistema

### 🔧 Implementação
- [`docs/METADADOS_DINAMICOS.md`](./docs/METADADOS_DINAMICOS.md) - Documentação técnica de metadados
- [`docs/IMPLEMENTACAO_HEADERS_COMPLETA.md`](./docs/IMPLEMENTACAO_HEADERS_COMPLETA.md) - Sistema de headers
- [`docs/INTEGRACAO_COMPLETA.md`](./docs/INTEGRACAO_COMPLETA.md) - Integração completa

### 🚀 Deploy
- [`docs/DEPLOY_METADADOS.md`](./docs/DEPLOY_METADADOS.md) - Deploy de metadados
- [`docs/VERCEL_DEPLOY.md`](./docs/VERCEL_DEPLOY.md) - Deploy no Vercel

### 📖 Guias
- [`docs/HEADER_LAYOUTS_GUIDE.md`](./docs/HEADER_LAYOUTS_GUIDE.md) - Guia de layouts
- [`docs/GUIA_VISUAL_VALIDACAO.md`](./docs/GUIA_VISUAL_VALIDACAO.md) - Validação visual
- [`docs/COMANDOS_UTEIS.md`](./docs/COMANDOS_UTEIS.md) - Comandos úteis

### ❓ Suporte
- [`docs/FAQ_METADADOS.md`](./docs/FAQ_METADADOS.md) - Perguntas frequentes
- [`docs/INDICE_METADADOS.md`](./docs/INDICE_METADADOS.md) - Índice completo

## 🧪 Testes

### Testar Metadados Localmente
```bash
npm run test:og seu-slug
```

### Interface de Teste
Abra `test-og.html` no navegador para testar metadados visualmente.

## 🏗️ Estrutura do Projeto

```
biocard.click/
├── api/                    # Serverless Functions (Vercel)
│   └── og.ts              # API de metadados dinâmicos
├── docs/                   # 📚 Documentação completa
├── public/                 # Assets estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── headers/      # Componentes de header
│   │   └── ui/           # Componentes UI (shadcn)
│   ├── contexts/         # Contextos React
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilitários
│   ├── pages/            # Páginas da aplicação
│   └── types/            # TypeScript types
├── test-og.html          # Interface de teste
├── test-local.js         # Script de teste local
└── vercel.json           # Configuração Vercel
```

## 🎨 Layouts Disponíveis

### Bold Header
Header impactante com capa grande e foto centralizada.

### Clean Header
Design minimalista e elegante com foco no conteúdo.

### Minimal Header
Layout compacto e discreto para máxima simplicidade.

Consulte [`docs/HEADER_LAYOUTS_GUIDE.md`](./docs/HEADER_LAYOUTS_GUIDE.md) para exemplos visuais.

## 🌐 Metadados Dinâmicos

Cada página de cliente gera metadados personalizados para redes sociais:
- ✅ WhatsApp
- ✅ Facebook
- ✅ Instagram
- ✅ LinkedIn
- ✅ Twitter/X
- ✅ Telegram
- ✅ Discord

Consulte [`docs/METADADOS_DINAMICOS.md`](./docs/METADADOS_DINAMICOS.md) para detalhes técnicos.

## 📊 Scripts Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código
npm run test:og      # Testar metadados localmente
```

## 🔐 Credenciais Admin

Consulte [`docs/CREDENCIAIS_ADMIN.md`](./docs/CREDENCIAIS_ADMIN.md) para informações de acesso ao painel administrativo.

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

Consulte [`docs/VERCEL_DEPLOY.md`](./docs/VERCEL_DEPLOY.md) para instruções detalhadas.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é proprietário e confidencial.

## 📞 Suporte

Para dúvidas e suporte:
- Consulte a documentação em [`/docs`](./docs/)
- Verifique o [`docs/FAQ_METADADOS.md`](./docs/FAQ_METADADOS.md)
- Use o [`docs/INDICE_METADADOS.md`](./docs/INDICE_METADADOS.md) para navegação

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2026  
**Status**: ✅ Em Produção
