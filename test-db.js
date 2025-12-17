import { db } from './src/lib/db'

async function testConnection() {
  try {
    console.log('🔗 Testando conexão com o banco de dados...')
    
    // Testar conexão básica
    await db.$connect()
    console.log('✅ Conexão estabelecida com sucesso!')
    
    // Testar query simples
    const result = await db.$queryRaw`SELECT 1 as test`
    console.log('✅ Query executada com sucesso:', result)
    
    // Verificar se tabelas existem
    const adminCount = await db.admin.count()
    const anuncioCount = await db.anuncio.count()
    
    console.log(`📊 Status do banco:`)
    console.log(`   Admins: ${adminCount}`)
    console.log(`   Anúncios: ${anuncioCount}`)
    
    if (anuncioCount === 0) {
      console.log('🌱 Banco vazio, execute npm run db:seed para popular')
    } else {
      console.log('✅ Banco já possui dados!')
    }
    
    await db.$disconnect()
    console.log('🎉 Teste concluído com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error)
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Dica: Verifique se o host do Neon está correto')
    } else if (error.message.includes('password authentication failed')) {
      console.log('💡 Dica: Verifique usuário e senha do Neon')
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.log('💡 Dica: Verifique se o nome do database está correto')
    } else if (error.message.includes('SSL')) {
      console.log('💡 Dica: Verifique se sslmode=require está na URL')
    }
    
    process.exit(1)
  }
}

testConnection()