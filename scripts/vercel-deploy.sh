#!/bin/bash

echo "🚀 Iniciando deploy no Vercel..."

# Gerar Prisma Client
echo "📦 Gerando Prisma Client..."
npm run db:generate

# Fazer push do schema (para PostgreSQL)
echo "🗄️ Aplicando schema no PostgreSQL..."
npm run db:push

# Popular banco se estiver vazio
echo "🌱 Verificando necessidade de seed..."
npx tsx -e "
import { db } from './src/lib/db';
async function checkAndSeed() {
  try {
    const count = await db.anuncio.count();
    if (count === 0) {
      console.log('📝 Banco vazio, executando seed...');
      await import('./seed.ts');
    } else {
      console.log(\`✅ Banco já possui \${count} anúncios\`);
    }
  } catch (error) {
    console.error('❌ Erro ao verificar banco:', error);
  }
  await db.\$disconnect();
}
checkAndSeed();
"

echo "✅ Deploy configurado com sucesso!"