/** @type {import('next').NextConfig} */

// Configuração mínima e testada para Vercel + Neon
const nextConfig = {
  // Remove configurações problemáticas
  // Não usar experimental features que podem causar problemas
  // Não usar webpack customizado
  
  // Configuração básica de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Configuração de output
  output: 'standalone',
  
  // Configuração de ambiente
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

// Exportar configuração
module.exports = nextConfig