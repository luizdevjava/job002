'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Tag } from 'lucide-react'

interface AnuncioCardProps {
  anuncio: {
    id: number
    nome: string
    bairro?: string
    tags?: string
    midias: Array<{
      id: number
      tipo: string
      url: string
    }>
  }
  priority?: boolean
}

export function AnuncioCard({ anuncio, priority = false }: AnuncioCardProps) {
  const imagemPrincipal = anuncio.midias.find(m => m.tipo === 'imagem')
  const tagsArray = anuncio.tags ? anuncio.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []

  return (
    <Link href={`/anuncio/${anuncio.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white border-gray-200">
        <div className="relative aspect-[4/5] overflow-hidden">
          {imagemPrincipal ? (
            <Image
              src={imagemPrincipal.url}
              alt={anuncio.nome}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <div className="text-purple-600 text-6xl opacity-50">
                <Tag className="w-16 h-16" />
              </div>
            </div>
          )}
          
          {anuncio.destaque && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Destaque
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
            {anuncio.nome}
          </h3>
          
          {anuncio.bairro && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {anuncio.bairro}
            </div>
          )}
          
          {tagsArray.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tagsArray.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  {tag}
                </Badge>
              ))}
              {tagsArray.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tagsArray.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}