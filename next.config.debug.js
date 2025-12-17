// Configuração de debug para identificar o erro
/** @type {import('next').NextConfig} */

const nextConfig = {
  // Habilitar modo de desenvolvimento detalhado
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Configuração de imagens para domínios externos
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
  
  // Configuração de output para Vercel
  output: 'standalone',
  
  // Configuração de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Adicionar headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig