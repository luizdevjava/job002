import { useState, useEffect } from 'react'

interface Anuncio {
  id: number
  nome: string
  descricao: string
  bairro?: string
  tags?: string
  ativo: boolean
  destaque: boolean
  createdAt: string
  updatedAt: string
  midias: Array<{
    id: number
    tipo: string
    url: string
    createdAt: string
  }>
}

interface UseAnunciosOptions {
  destaque?: boolean
  ativo?: boolean
  tags?: string[]
  bairro?: string
  limit?: number
  offset?: number
}

export function useAnuncios(options: UseAnunciosOptions = {}) {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        
        if (options.destaque !== undefined) {
          params.append('destaque', options.destaque.toString())
        }
        
        if (options.ativo !== undefined) {
          params.append('ativo', options.ativo.toString())
        }
        
        if (options.tags && options.tags.length > 0) {
          params.append('tags', options.tags.join(','))
        }
        
        if (options.bairro) {
          params.append('bairro', options.bairro)
        }
        
        if (options.limit) {
          params.append('limit', options.limit.toString())
        }
        
        if (options.offset) {
          params.append('offset', options.offset.toString())
        }

        const response = await fetch(`/api/anuncios?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar anúncios')
        }

        const data = await response.json()
        setAnuncios(data.anuncios || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        console.error('Erro ao buscar anúncios:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnuncios()
  }, [options.destaque, options.ativo, options.tags, options.bairro, options.limit, options.offset])

  return { anuncios, loading, error, refetch: () => fetchAnuncios() }
}

export function useAnuncio(id: number | null) {
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setAnuncio(null)
      setLoading(false)
      return
    }

    const fetchAnuncio = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/anuncios/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setAnuncio(null)
            return
          }
          throw new Error('Erro ao buscar anúncio')
        }

        const data = await response.json()
        setAnuncio(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        console.error('Erro ao buscar anúncio:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnuncio()
  }, [id])

  return { anuncio, loading, error }
}