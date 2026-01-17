# 🎨 Biocard.click

> Plataforma de bio link moderna e elegante com integração Supabase

[![GitHub](https://img.shields.io/badge/GitHub-biocard.click-blue?logo=github)](https://github.com/gabpvieira/biocard.click)
[![Supabase](https://img.shields.io/badge/Supabase-Integrated-green?logo=supabase)](https://supabase.com)
[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org)

## 📖 Sobre

Biocard.click é uma plataforma completa para criar páginas de bio link personalizadas. Perfeita para profissionais, criadores de conteúdo e empresas que desejam centralizar seus links em uma landing page elegante.

### ✨ Funcionalidades

- 🎨 **Design Moderno**: Interface limpa e responsiva com Tailwind CSS
- 🔐 **Autenticação Segura**: Sistema de login com Supabase Auth
- 📝 **Editor Visual**: Crie e edite páginas facilmente
- 🖼️ **Upload de Imagens**: Armazenamento seguro no Supabase Storage (até 10MB)
- 🔗 **Links Ilimitados**: Adicione quantos cards/links precisar
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance**: Construído com Vite para velocidade máxima
- 🎯 **SEO Friendly**: URLs amigáveis com slugs personalizados

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Build**: Vite
- **Routing**: React Router v6

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/gabpvieira/biocard.click.git
cd biocard.click
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

> 📝 Consulte `SUPABASE_SETUP.md` para instruções detalhadas

4. **Execute o projeto**
```bash
npm run dev
```

Acesse: http://localhost:5173

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **bio_pages**: Páginas de bio link
- **page_cards**: Cards/links das páginas
- **admins**: Administradores do sistema

### Storage

- **bio-images**: Bucket para imagens (10MB max)

### Segurança

- ✅ Row Level Security (RLS) habilitado
- ✅ Políticas de acesso configuradas
- ✅ Leitura pública, escrita apenas para admins

## 📚 Documentação

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Guia de configuração do Supabase
- [INTEGRACAO_COMPLETA.md](INTEGRACAO_COMPLETA.md) - Documentação técnica completa
- [CHECKLIST.md](CHECKLIST.md) - Checklist de configuração
- [supabase-setup.sql](supabase-setup.sql) - Script SQL de verificação

## 🔐 Primeiro Acesso

### Criar Administrador

1. Crie um usuário no Supabase Auth (Dashboard → Authentication → Users)
2. Execute no SQL Editor:

```sql
INSERT INTO admins (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'seu@email.com';
```

3. Acesse `/admin` e faça login

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Executa o linter
```

## 📁 Estrutura do Projeto

```
biocard.click/
├── src/
│   ├── components/     # Componentes UI (shadcn/ui)
│   ├── contexts/       # Contextos React (Auth)
│   ├── lib/           # Utilitários e configurações
│   │   ├── supabase.ts        # Cliente Supabase
│   │   ├── supabaseStorage.ts # Funções CRUD
│   │   └── ...
│   ├── pages/         # Páginas da aplicação
│   └── types/         # Tipos TypeScript
├── public/            # Assets estáticos
└── ...
```

## 🎨 Páginas

- `/` - Página inicial (em branco)
- `/:slug` - Página pública de bio link
- `/admin` - Login administrativo
- `/admin/dashboard` - Dashboard de gerenciamento
- `/admin/editor` - Editor de páginas
- `/admin/editor/:slug` - Editar página existente

## 🔒 Segurança

- Autenticação via Supabase Auth
- Row Level Security (RLS) em todas as tabelas
- Validação de dados no frontend e backend
- Upload de imagens com limite de tamanho e tipo
- Variáveis de ambiente não commitadas

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Gabriel Vieira**
- GitHub: [@gabpvieira](https://github.com/gabpvieira)

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Vite](https://vitejs.dev) - Build tool

---

⭐ Se este projeto foi útil, considere dar uma estrela!

**Status:** ✅ Em desenvolvimento ativo
