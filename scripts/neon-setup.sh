#!/bin/bash

echo "🔧 Configurando projeto para Neon Database..."

# Instalar dependências necessárias
echo "📦 Instalando dependências..."
npm install @prisma/adapter-neon

# Atualizar Prisma para Neon
echo "🗄️ Atualizando schema para Neon..."

# Criar arquivo de configuração Neon
cat > prisma/schema.prisma << 'EOF'
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Para Neon
}

model Admin {
  id       Int    @id @default(autoincrement())
  email    String @unique
  password String
  createdAt DateTime @default(now())
}

model Anuncio {
  id        Int      @id @default(autoincrement())
  nome      String
  descricao String
  bairro    String?
  tags      String?
  ativo     Boolean  @default(true)
  destaque  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  midias AnuncioMidia[]
  
  @@map("anuncios")
}

model AnuncioMidia {
  id        Int      @id @default(autoincrement())
  anuncioId Int
  tipo      String   // 'imagem' ou 'video'
  url       String
  createdAt DateTime @default(now())
  
  anuncio Anuncio @relation(fields: [anuncioId], references: [id], onDelete: Cascade)
  
  @@map("anuncio_midias")
}
EOF

echo "✅ Schema atualizado para Neon PostgreSQL!"

# Criar arquivo de ambiente de exemplo
cat > .env.example << 'EOF'
# Neon Database Configuration
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10"
DIRECT_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&connect_timeout=10"

# Security
JWT_SECRET="seu-secret-key-muito-seguro-aqui-123456"

# Site URL
NEXT_PUBLIC_SITE_URL="https://seu-projeto.vercel.app"
EOF

echo "📝 Arquivo .env.example criado!"

# Atualizar package.json
npm pkg set scripts.vercel-build="prisma generate && prisma db push"
npm pkg set scripts.neon-setup="chmod +x scripts/neon-setup.sh && ./scripts/neon-setup.sh"

echo "🎉 Configuração Neon concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Crie sua conta Neon: https://neon.tech"
echo "2. Copie as connection strings"
echo "3. Configure no Vercel: Settings → Environment Variables"
echo "4. Faça deploy: git push origin main"
echo ""
echo "📖 Verifique DEPLOY.md para instruções detalhadas!"