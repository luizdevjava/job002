import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acompanhantes VIP - Anúncios de Acompanhantes no Rio de Janeiro",
  description: "Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas. Atendimento discreto e seguro.",
  keywords: ["acompanhantes", "rio de janeiro", "acompanhantes rj", "garotas de programa", "acompanhantes vip"],
  authors: [{ name: "Acompanhantes VIP" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Acompanhantes VIP - Anúncios de Acompanhantes",
    description: "Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas.",
    url: "https://seu-projeto.vercel.app",
    siteName: "Acompanhantes VIP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acompanhantes VIP - Anúncios de Acompanhantes",
    description: "Encontre as melhores acompanhantes no Rio de Janeiro. Anúncios verificados com fotos reais, vídeos e descrições completas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
