/**
 * Script de teste local para validar metadados dinâmicos
 * 
 * Como usar:
 * 1. Certifique-se que o arquivo .env está configurado
 * 2. Execute: node test-local.js seu-slug
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: join(__dirname, '.env') });

const slug = process.argv[2];

if (!slug) {
  console.error('❌ Erro: Forneça um slug como argumento');
  console.log('Uso: node test-local.js seu-slug');
  process.exit(1);
}

async function testMetadata() {
  console.log('🧪 Testando metadados dinâmicos...\n');
  console.log(`📝 Slug: ${slug}\n`);

  // Verificar variáveis de ambiente
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Erro: Variáveis de ambiente não configuradas');
    console.log('Certifique-se que .env contém:');
    console.log('  VITE_SUPABASE_URL=...');
    console.log('  VITE_SUPABASE_ANON_KEY=...');
    process.exit(1);
  }

  console.log('✅ Variáveis de ambiente encontradas\n');

  // Conectar ao Supabase
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('🔌 Conectando ao Supabase...');

  try {
    // Buscar dados da página
    const { data: pageData, error } = await supabase
      .from('pages')
      .select('name, description, photo, slug')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('❌ Erro ao buscar página:', error.message);
      process.exit(1);
    }

    if (!pageData) {
      console.error('❌ Página não encontrada');
      process.exit(1);
    }

    console.log('✅ Página encontrada!\n');

    // Exibir dados
    console.log('📊 Dados da Página:');
    console.log('─'.repeat(50));
    console.log(`Nome: ${pageData.name}`);
    console.log(`Descrição: ${pageData.description || '(vazio)'}`);
    console.log(`Foto: ${pageData.photo || '(vazio)'}`);
    console.log(`Slug: ${pageData.slug}`);
    console.log('─'.repeat(50));
    console.log('');

    // Simular metadados
    const siteUrl = 'https://biocard.click';
    const pageUrl = `${siteUrl}/${pageData.slug}`;
    const imageUrl = pageData.photo || `${siteUrl}/iconfavoricon.png`;

    console.log('🏷️  Metadados que serão gerados:');
    console.log('─'.repeat(50));
    console.log(`Title: ${pageData.name} | Biocard`);
    console.log(`Description: ${pageData.description || 'Confira meus links e conteúdos'}`);
    console.log(`URL: ${pageUrl}`);
    console.log(`Image: ${imageUrl}`);
    console.log('─'.repeat(50));
    console.log('');

    // Validações
    console.log('✅ Validações:');
    console.log('─'.repeat(50));
    
    const validations = [
      { name: 'Nome preenchido', pass: !!pageData.name },
      { name: 'Descrição preenchida', pass: !!pageData.description },
      { name: 'Foto preenchida', pass: !!pageData.photo },
      { name: 'Slug válido', pass: /^[a-z0-9-]+$/.test(pageData.slug) },
    ];

    validations.forEach(v => {
      console.log(`${v.pass ? '✅' : '⚠️ '} ${v.name}`);
    });
    
    console.log('─'.repeat(50));
    console.log('');

    // Testar URL da imagem
    if (pageData.photo) {
      console.log('🖼️  Testando URL da imagem...');
      try {
        const response = await fetch(pageData.photo, { method: 'HEAD' });
        if (response.ok) {
          console.log('✅ Imagem acessível');
          console.log(`   Status: ${response.status}`);
          console.log(`   Content-Type: ${response.headers.get('content-type')}`);
        } else {
          console.log('⚠️  Imagem não acessível');
          console.log(`   Status: ${response.status}`);
        }
      } catch (error) {
        console.log('❌ Erro ao acessar imagem:', error.message);
      }
      console.log('');
    }

    // Próximos passos
    console.log('🚀 Próximos Passos:');
    console.log('─'.repeat(50));
    console.log('1. Faça o deploy no Vercel');
    console.log('2. Teste a API: https://biocard.click/api/og?slug=' + slug);
    console.log('3. Valide no Facebook Debugger:');
    console.log('   https://developers.facebook.com/tools/debug/');
    console.log('4. Teste no WhatsApp compartilhando o link');
    console.log('─'.repeat(50));

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

testMetadata();
