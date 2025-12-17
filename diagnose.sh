#!/bin/bash

echo "🔍 DIAGNÓSTICO - PROBLEMA VERCEL ROUTES MANIFEST"
echo "=================================================="

echo "📁 Verificando estrutura do projeto..."
echo "Diretório atual: $(pwd)"
echo ""

echo "📦 Verificando versão Next.js..."
npx next --version
echo ""

echo "📋 Verificando arquivos de configuração..."
echo "next.config.js existe: $([ -f "next.config.js" ] && echo "✅" || echo "❌")"
echo "vercel.json existe: $([ -f "vercel.json" ] && echo "✅" || echo "❌")"
echo "package.json existe: $([ -f "package.json" ] && echo "✅" || echo "❌")"
echo ""

echo "🗂️ Verificando estrutura de pastas..."
echo "src/app/ existe: $([ -d "src/app" ] && echo "✅" || echo "❌")"
echo "src/app/api/ existe: $([ -d "src/app/api" ] && echo "✅" || echo "❌")"
echo "src/app/page.tsx existe: $([ -f "src/app/page.tsx" ] && echo "✅" || echo "❌")"
echo ""

echo "🔧 Verificando configuração Next.js..."
if [ -f "next.config.js" ]; then
    echo "Conteúdo de next.config.js:"
    head -20 next.config.js
    echo ""
fi

echo "📝 Verificando vercel.json..."
if [ -f "vercel.json" ]; then
    echo "Conteúdo de vercel.json:"
    cat vercel.json
    echo ""
fi

echo "📦 Verificando scripts do package.json..."
if [ -f "package.json" ]; then
    echo "Scripts relevantes:"
    grep -E "(vercel-build|build|start)" package.json || echo "❌ Scripts não encontrados"
    echo ""
fi

echo "🧪 Testando build local..."
echo "Executando: npm run build..."
npm run build 2>&1 | head -50

echo ""
echo "💡 SOLUÇÕES POSSÍVEIS:"
echo "1. Se o erro persistir, remova next.config.js e use apenas vercel.json"
echo "2. Verifique se não há conflito de configuração"
echo "3. Tente fazer deploy com configuração mínima"
echo "4. Verifique se a versão do Next.js é compatível com Vercel"
echo ""
echo "📚 Documentação Vercel: https://vercel.com/docs/frameworks/nextjs"