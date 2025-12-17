'use client'

import { useCallback, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnuncioCard } from './AnuncioCard'

interface SliderProps {
  anuncios: Array<{
    id: number
    nome: string
    bairro?: string
    tags?: string
    midias: Array<{
      id: number
      tipo: string
      url: string
    }>
  }>
  autoPlay?: boolean
  interval?: number
}

export function Slider({ anuncios, autoPlay = true, interval = 5000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === anuncios.length - 1 ? 0 : prevIndex + 1
    )
  }, [anuncios.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? anuncios.length - 1 : prevIndex - 1
    )
  }, [anuncios.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || anuncios.length <= 1) return

    const slideInterval = setInterval(nextSlide, interval)
    return () => clearInterval(slideInterval)
  }, [autoPlay, interval, nextSlide, anuncios.length])

  if (anuncios.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Nenhum destaque no momento</p>
      </div>
    )
  }

  return (
    <div className="relative w-full" ref={sliderRef}>
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-96"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {anuncios.map((anuncio, index) => (
            <div key={anuncio.id} className="w-full flex-shrink-0 px-2">
              <AnuncioCard anuncio={anuncio} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {anuncios.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-gray-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-gray-300"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      {anuncios.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {anuncios.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-purple-600 w-8' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}