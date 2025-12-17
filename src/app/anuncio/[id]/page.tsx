'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/Slider'
import { AnuncioCard } from '@/components/AnuncioCard'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  ArrowLeft, 
  MapPin, 
  Tag, 
  Calendar, 
  User, 
  Heart,
  Share2,
  Sparkles
} from 'lucide-react'
import { useAnuncio, useAnuncios } from '@/hooks/useAnuncios'

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-[4/5] w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnuncioPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  const anuncioId = params.id ? parseInt(params.id as string) : null
  const { anuncio, loading, error } = useAnuncio(anuncioId)
  
  // Buscar outros destaques para a sidebar
  const { anuncios: outrosDestaques } = useAnuncios({
    destaque: true,
    ativo: true,
    limit: 3
  })

  useEffect(() => {
    if (error) {
      router.push('/')
    }
  }, [error, router])

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  if (loading || !anuncio) {
    return <LoadingSkeleton />
  }

  const imagens = anuncio.midias.filter(m => m.tipo === 'imagem')
  const video = anuncio.midias.find(m => m.tipo === 'video')
  const tagsArray = anuncio.tags ? anuncio.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []
  const outrosDestaquesFiltrados = outrosDestaques.filter(d => d.id !== anuncio.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h1 className="text-lg font-semibold text-gray-900">
                  {anuncio.nome}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                Favoritar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria de imagens */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Imagem principal */}
                <div className="relative aspect-[4/5] lg:aspect-[16/9] overflow-hidden">
                  {imagens[selectedImageIndex] ? (
                    <Image
                      src={imagens[selectedImageIndex].url}
                      alt={`${anuncio.nome} - Imagem ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <div className="text-purple-600 text-6xl opacity-50">
                        <User className="w-16 h-16" />
                      </div>
                    </div>
                  )}
                  
                  {anuncio.destaque && (
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      Destaque
                    </div>
                  )}
                </div>
                
                {/* Thumbnails */}
                {imagens.length > 1 && (
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {imagens.map((imagem, index) => (
                        <button
                          key={imagem.id}
                          onClick={() => handleImageClick(index)}
                          className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index
                              ? 'border-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={imagem.url}
                            alt={`${anuncio.nome} - Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vídeo (se existir) */}
            {video && (
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      src={video.url}
                      title={`${anuncio.nome} - Vídeo`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informações do anúncio */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {anuncio.nome}
                    </h2>
                    
                    <div className="flex items-center space-x-4 text-gray-600">
                      {anuncio.bairro && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {anuncio.bairro}
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(anuncio.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Tags */}
                  {tagsArray.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {tagsArray.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Descrição */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {anuncio.descricao}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Slider de destaques lateral */}
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center mb-4">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Outros Destaques</h3>
              </div>
              
              {outrosDestaquesFiltrados.length > 0 ? (
                <Slider 
                  anuncios={outrosDestaquesFiltrados} 
                  autoPlay={true}
                  interval={4000}
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Nenhum outro destaque no momento</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mais anúncios destacados */}
        {outrosDestaquesFiltrados.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center mb-6">
              <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Mais Anúncios Destaques</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {outrosDestaquesFiltrados.map((anuncioDestaque) => (
                <AnuncioCard key={anuncioDestaque.id} anuncio={anuncioDestaque} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Acompanhantes VIP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}