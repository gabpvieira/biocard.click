// Script de diagnóstico para verificar configuração do Supabase
// Execute no console do navegador: import('./lib/diagnostico')

export const diagnosticoSupabase = () => {
  console.log('🔍 DIAGNÓSTICO SUPABASE\n');
  
  // 1. Verificar variáveis de ambiente
  console.log('1️⃣ Variáveis de Ambiente:');
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('   URL:', url || '❌ NÃO CONFIGURADA');
  console.log('   Key:', key ? `✅ Configurada (${key.substring(0, 20)}...)` : '❌ NÃO CONFIGURADA');
  
  if (key && key.includes('placeholder')) {
    console.error('   ⚠️ ERRO: A chave contém "placeholder" - substitua pela chave real!');
  }
  
  // 2. Verificar formato da chave
  console.log('\n2️⃣ Validação da Chave:');
  if (key) {
    const parts = key.split('.');
    if (parts.length === 3) {
      console.log('   ✅ Formato JWT válido (3 partes)');
      console.log('   Header:', parts[0].substring(0, 20) + '...');
      console.log('   Payload:', parts[1].substring(0, 20) + '...');
      console.log('   Signature:', parts[2].substring(0, 20) + '...');
      
      if (parts[2] === 'placeholder') {
        console.error('   ❌ ERRO: Assinatura é "placeholder" - chave inválida!');
      }
    } else {
      console.error('   ❌ Formato inválido (deveria ter 3 partes separadas por ".")');
    }
  }
  
  // 3. Verificar conexão
  console.log('\n3️⃣ Teste de Conexão:');
  if (url && key) {
    console.log('   Tentando conectar ao Supabase...');
    
    fetch(`${url}/rest/v1/`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('   ✅ Conexão bem-sucedida!');
        } else {
          console.error('   ❌ Erro na conexão:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('   ❌ Erro de rede:', error.message);
      });
  } else {
    console.error('   ❌ Não é possível testar - variáveis não configuradas');
  }
  
  // 4. Instruções
  console.log('\n📋 PRÓXIMOS PASSOS:');
  console.log('   1. Acesse: https://supabase.com/dashboard/project/eoxlbkdsilnaxqpmuqfb');
  console.log('   2. Vá em Settings → API');
  console.log('   3. Copie a chave "anon public"');
  console.log('   4. Cole no arquivo .env');
  console.log('   5. Reinicie o servidor (npm run dev)');
  console.log('\n   Consulte: COMO_OBTER_ANON_KEY.md');
};

// Auto-executar se importado
if (typeof window !== 'undefined') {
  diagnosticoSupabase();
}
