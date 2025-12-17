import { useState, useCallback } from 'react'

interface ApiError {
  message: string
  status?: number
  code?: string
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  refetch: () => Promise<void>
}

export function useApi<T>(url: string, options?: RequestInit): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        ...options
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('API Error:', err)
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'API_ERROR'
      })
    } finally {
      setLoading(false)
    }
  }, [url])

  // Auto-fetch on mount
  useState(() => {
    fetchData()
  })

  return { data, loading, error, refetch: fetchData }
}

// Hook para POST requests
export function useApiPost<T>(url: string): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const postData = useCallback(async (payload: any) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('API POST Error:', err)
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'API_POST_ERROR'
      })
    } finally {
      setLoading(false)
    }
  }, [url])

  return { data, loading, error, postData }
}

// Hook para PUT requests
export function useApiPut<T>(url: string): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const putData = useCallback(async (id: string | number, payload: any) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('API PUT Error:', err)
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'API_PUT_ERROR'
      })
    } finally {
      setLoading(false)
    }
  }, [url])

  return { data, loading, error, putData }
}

// Hook para DELETE requests
export function useApiDelete(url: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const deleteData = useCallback(async (id: string | number) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        )
      }

      return true
    } catch (err) {
      console.error('API DELETE Error:', err)
      setError({
        message: err instanceof Error ? err.message : 'Unknown error occurred',
        code: 'API_DELETE_ERROR'
      })
      return false
    } finally {
      setLoading(false)
    }
  }, [url])

  return { loading, error, deleteData }
}