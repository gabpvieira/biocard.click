# 🛠️ Comandos Úteis - Metadados Dinâmicos

## 📋 Testes Locais

### Testar com script Node.js
```bash
# Testar um slug específico
npm run test:og joao-silva

# Ou diretamente
node test-local.js joao-silva
```

### Abrir interface de teste
```bash
# Windows
start test-og.html

# Mac/Linux
open test-og.html
```

## 🌐 Testes Remotos (Após Deploy)

### Testar API diretamente
```bash
# Teste básico
curl "https://biocard.click/api/og?slug=joao-silva"

# Ver apenas headers
curl -I "https://biocard.click/api/og?slug=joao-silva"

# Salvar resposta em arquivo
curl "https://biocard.click/api/og?slug=joao-silva" > response.html
```

### Simular diferentes bots
```bash
# WhatsApp
curl -A "WhatsApp/2.0" "https://biocard.click/joao-silva"

# Facebook
curl -A "facebookexternalhit/1.1" "https://biocard.click/joao-silva"

# Twitter
curl -A "Twitterbot/1.0" "https://biocard.click/joao-silva"

# LinkedIn
curl -A "LinkedInBot/1.0" "https://biocard.click/joao-silva"
```

### Verificar cache
```bash
# Ver headers de cache
curl -I "https://biocard.click/api/og?slug=joao-silva" | grep -i cache

# Windows PowerShell
curl.exe -I "https://biocard.click/api/og?slug=joao-silva" | Select-String -Pattern "cache"
```

## 🔍 Validação em Plataformas

### Facebook Sharing Debugger
```bash
# Abrir no navegador
start https://developers.facebook.com/tools/debug/?q=https://biocard.click/joao-silva
```

### Twitter Card Validator
```bash
# Abrir no navegador
start https://cards-dev.twitter.com/validator?url=https://biocard.click/joao-silva
```

### LinkedIn Post Inspector
```bash
# Abrir no navegador
start https://www.linkedin.com/post-inspector/inspect/https://biocard.click/joao-silva
```

## 📊 Monitoramento

### Ver logs do Vercel (CLI)
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Login
vercel login

# Ver logs em tempo real
vercel logs --follow

# Ver logs de uma função específica
vercel logs api/og.ts
```

### Verificar status do deploy
```bash
# Ver deployments
vercel ls

# Ver detalhes do último deploy
vercel inspect
```

## 🗄️ Supabase

### Testar conexão
```bash
# Criar arquivo test-supabase.js
node -e "
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const { data, error } = await supabase.from('pages').select('slug').limit(5);
console.log(data || error);
"
```

### Listar slugs disponíveis
```bash
# Via API do Supabase
curl "https://seu-projeto.supabase.co/rest/v1/pages?select=slug" \
  -H "apikey: sua-chave-anon" \
  -H "Authorization: Bearer sua-chave-anon"
```

## 🚀 Deploy

### Deploy manual
```bash
# Build local
npm run build

# Deploy para produção
vercel --prod

# Deploy para preview
vercel
```

### Verificar build
```bash
# Build e verificar erros
npm run build 2>&1 | tee build.log

# Ver tamanho dos arquivos
npm run build && ls -lh dist/
```

## 🧹 Limpeza

### Limpar cache local
```bash
# Limpar node_modules
rm -rf node_modules
npm install

# Limpar build
rm -rf dist
npm run build
```

### Limpar cache do Vercel
```bash
# Via CLI
vercel --force

# Ou no dashboard: Settings → Clear Cache
```

## 🔧 Debug

### Verificar variáveis de ambiente
```bash
# Local
cat .env

# Vercel (via CLI)
vercel env ls

# Vercel (via API)
vercel env pull .env.local
```

### Testar TypeScript
```bash
# Verificar erros de tipo
npx tsc --noEmit

# Verificar arquivo específico
npx tsc --noEmit api/og.ts
```

### Lint
```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint -- --fix
```

## 📱 Testes Mobile

### Testar no WhatsApp
1. Abra o WhatsApp Web: https://web.whatsapp.com
2. Envie a URL para você mesmo
3. Aguarde o preview carregar

### Testar no Telegram
```bash
# Enviar para o bot do Telegram
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -d "chat_id=<CHAT_ID>" \
  -d "text=https://biocard.click/joao-silva"
```

## 🎯 Comandos Rápidos

### Desenvolvimento
```bash
# Iniciar dev server
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

### Teste completo
```bash
# 1. Testar localmente
npm run test:og joao-silva

# 2. Build
npm run build

# 3. Deploy
vercel --prod

# 4. Testar API
curl "https://biocard.click/api/og?slug=joao-silva"

# 5. Validar no Facebook
start https://developers.facebook.com/tools/debug/
```

## 📝 Logs e Debug

### Ver logs detalhados
```bash
# Logs do Vercel com detalhes
vercel logs --follow --output=json

# Filtrar por erro
vercel logs | grep -i error

# Salvar logs em arquivo
vercel logs > logs.txt
```

### Debug da API
```bash
# Adicionar console.log na API e ver logs
vercel logs api/og.ts --follow
```

## 🔐 Segurança

### Verificar headers de segurança
```bash
curl -I "https://biocard.click" | grep -E "(X-Frame|X-Content|X-XSS)"
```

### Testar HTTPS
```bash
curl -I "https://biocard.click" | grep -i "strict-transport"
```

## 💾 Backup

### Backup do código
```bash
# Criar backup
git archive --format=zip --output=backup-$(date +%Y%m%d).zip HEAD

# Backup com node_modules
tar -czf backup-full-$(date +%Y%m%d).tar.gz .
```

### Backup do Supabase
```bash
# Via Supabase CLI
supabase db dump -f backup.sql
```

## 🎨 Otimização

### Analisar bundle
```bash
# Instalar analyzer
npm install --save-dev rollup-plugin-visualizer

# Adicionar ao vite.config.ts e buildar
npm run build

# Abrir stats.html gerado
```

### Comprimir imagens
```bash
# Usando ImageMagick
magick convert input.jpg -quality 85 -resize 1200x630 output.jpg

# Usando sharp (Node.js)
npx sharp-cli resize 1200 630 --input input.jpg --output output.jpg
```

---

**Dica**: Salve este arquivo para referência rápida durante desenvolvimento e manutenção!
