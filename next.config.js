/** @type {import('next').NextConfig} */

const nextConfig = {
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
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

module.exports = nextConfig