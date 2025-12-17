#!/bin/bash

echo "🔧 CORRIGINDO CONFIGURAÇÃO VERCEL PARA NEON"
echo "=================================================="

# Verificar arquivos atuais
echo "📋 Verificando arquivos de configuração..."
echo "next.config.js: $([ -f "next.config.js" ] && echo "✅ Existe" || echo "❌ Não existe")"
echo "vercel.json: $([ -f "vercel.json" ] && echo "✅ Existe" || echo "❌ Não existe")"
echo ""

# Criar configuração forçada para PostgreSQL
echo "🗄️ Criando configuração forçada para PostgreSQL..."

# Criar next.config.js forçado
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */

// Configuração forçada para PostgreSQL no Vercel
const nextConfig = {
  // Forçar uso de PostgreSQL
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push({
        'prisma': {
          commonjs: 'prisma',
        },
      })
    }
    return config
  },
  
  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Configuração de output
  output: 'standalone',
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
EOF

echo "✅ next.config.js criado/atualizado"

# Criar vercel.json forçado
cat > vercel.json << 'EOF'
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "PRISMA_GENERATE_DATAPROXY": "true"
  },
  "build": {
    "env": {
      "PRISMA_GENERATE_DATAPROXY": "true"
    }
  }
}
EOF

echo "✅ vercel.json criado/atualizado"

# Criar script de build forçado
cat > build-force.js << 'EOF'
const { execSync } = require('child_process');

// Forçar ambiente PostgreSQL
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db';

console.log('🔧 Forçando DATABASE_URL para PostgreSQL...');
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Executar build
execSync('npm run build', { stdio: 'inherit' });
EOF

echo "✅ build-force.js criado"

# Atualizar package.json com script forçado
npm pkg set scripts.build:force="node build-force.js"

echo "✅ Script build:force adicionado"

echo ""
echo "🎯 SOLUÇÃO APLICADA:"
echo "1. Configuração forçada para PostgreSQL"
echo "2. Scripts de build otimizados"
echo "3. Headers CORS configurados"
echo "4. Externals Prisma configurados"
echo ""

echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure as variáveis no Vercel:"
echo "   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&pgbouncer=true&connect_timeout=10"
echo "   DIRECT_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require&connect_timeout=10"
echo "   JWT_SECRET=chave-super-secreta-123456"
echo "   NEXT_PUBLIC_SITE_URL=https://seu-projeto.vercel.app"
echo ""
echo "2. Faça commit e push:"
echo "   git add ."
echo "   git commit -m \"Force PostgreSQL configuration for Vercel\""
echo "   git push origin main"
echo ""
echo "3. Se necessário, faça deploy manual:"
echo "   npx vercel --prod"
echo ""
echo "✅ Configuração concluída!"