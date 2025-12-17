import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acompanhantes VIP - Anúncios de Acompanhantes no Rio de Janeiro',
  description: 'Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas. Atendimento discreto e seguro.',
  keywords: 'acompanhantes, rio de janeiro, acompanhantes rj, garotas de programa, acompanhantes vip',
  authors: [{ name: 'Acompanhantes VIP' }],
  creator: 'Acompanhantes VIP',
  publisher: 'Acompanhantes VIP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Acompanhantes VIP - Anúncios de Acompanhantes no Rio de Janeiro',
    description: 'Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas.',
    url: '/',
    siteName: 'Acompanhantes VIP',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Acompanhantes VIP',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acompanhantes VIP - Anúncios de Acompanhantes no Rio de Janeiro',
    description: 'Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}