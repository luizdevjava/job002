'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'

interface FiltersProps {
  onFiltersChange: (filters: { tags: string[]; bairro: string[] }) => void
}

export function Filters({ onFiltersChange }: FiltersProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedBairros, setSelectedBairros] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Mock data - em produção, viria da API
  const availableTags = [
    'Loira', 'Morena', 'Ruiva', 'Mulata', 'Gata', 'Delicada', 
    'Safada', 'Gostosa', 'Ativa', 'Passiva', 'Completinha'
  ]
  
  const availableBairros = [
    'Centro', 'Copacabana', 'Ipanema', 'Leblon', 'Barra', 
    'Botafogo', 'Flamengo', 'Tijuca', 'Lapa', 'Santa Teresa'
  ]

  useEffect(() => {
    onFiltersChange({
      tags: selectedTags,
      bairro: selectedBairros
    })
  }, [selectedTags, selectedBairros, onFiltersChange])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const toggleBairro = (bairro: string) => {
    setSelectedBairros(prev => 
      prev.includes(bairro) 
        ? prev.filter(b => b !== bairro)
        : [...prev, bairro]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSelectedBairros([])
  }

  const hasActiveFilters = selectedTags.length > 0 || selectedBairros.length > 0

  return (
    <div className="w-full mb-6">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedTags.length + selectedBairros.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-lg border border-gray-200`}>
        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <Badge key={tag} variant="default" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {selectedBairros.map(bairro => (
                <Badge key={bairro} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {bairro}
                  <button
                    onClick={() => toggleBairro(bairro)}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Limpar
            </Button>
          </div>
        )}

        {/* Filter options */}
        <div className="space-y-4">
          {/* Tags filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'hover:bg-purple-100 hover:text-purple-700 hover:border-purple-300'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bairros filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Bairros</h3>
            <div className="flex flex-wrap gap-2">
              {availableBairros.map(bairro => (
                <Badge
                  key={bairro}
                  variant={selectedBairros.includes(bairro) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedBairros.includes(bairro)
                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                      : 'hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => toggleBairro(bairro)}
                >
                  {bairro}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}