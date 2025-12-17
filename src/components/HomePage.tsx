'use client'

import { useState } from 'react'
import { Slider } from '@/components/Slider'
import { AnuncioCard } from '@/components/AnuncioCard'
import { Filters } from '@/components/Filters'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Settings, Sparkles } from 'lucide-react'
import { useAnuncios } from '@/hooks/useAnuncios'

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/5] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [filters, setFilters] = useState({ tags: [] as string[], bairro: [] as string[] })
  
  // Buscar destaques
  const { anuncios: destaques, loading: loadingDestaques } = useAnuncios({
    destaque: true,
    ativo: true,
    limit: 3
  })

  // Buscar todos os anúncios ativos com filtros
  const { anuncios: todosAnuncios, loading: loadingAnuncios } = useAnuncios({
    ativo: true,
    tags: filters.tags.length > 0 ? filters.tags : undefined,
    bairro: filters.bairro.length > 0 ? filters.bairro[0] : undefined
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-bold text-gray-900">Acompanhantes VIP</h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Slider de Destaques */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Destaques</h2>
          </div>
          {loadingDestaques ? (
            <Skeleton className="w-full h-96 rounded-lg" />
          ) : (
            <Slider anuncios={destaques} />
          )}
        </section>

        {/* Filtros */}
        <Filters onFiltersChange={setFilters} />

        {/* Galeria de Anúncios */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filters.tags.length > 0 || filters.bairro.length > 0 
                ? 'Anúncios Filtrados' 
                : 'Todos os Anúncios'
              }
            </h2>
            <span className="ml-3 text-sm text-gray-500">
              ({todosAnuncios.length} encontrados)
            </span>
          </div>
          
          {loadingAnuncios ? (
            <LoadingSkeleton />
          ) : todosAnuncios.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {todosAnuncios.map((anuncio) => (
                <AnuncioCard 
                  key={anuncio.id} 
                  anuncio={anuncio}
                  priority={destaques.some(d => d.id === anuncio.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum anúncio encontrado com os filtros selecionados.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilters({ tags: [], bairro: [] })}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </section>
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