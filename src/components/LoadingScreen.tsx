'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, AlertTriangle, Database, Wifi } from 'lucide-react'

interface LoadingState {
  message: string
  icon: React.ReactNode
  details?: string
}

export default function LoadingScreen() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    message: 'Carregando aplicativo...',
    icon: <Loader2 className="w-8 h-8 animate-spin" />
  })

  useEffect(() => {
    // Detectar tipo de erro após alguns segundos
    const timer = setTimeout(() => {
      setLoadingState({
        message: 'Verificando conexão com o banco de dados...',
        icon: <Database className="w-8 h-8 animate-pulse" />,
        details: 'Isso pode levar alguns segundos na primeira vez.'
      })
    }, 3000)

    // Mudar para erro de conexão após 10 segundos
    const errorTimer = setTimeout(() => {
      setLoadingState({
        message: 'Problemas de conexão detectados',
        icon: <Wifi className="w-8 h-8" />,
        details: 'Verifique sua conexão com a internet ou tente recarregar a página.'
      })
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(errorTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-4">
          {/* Ícone animado */}
          <div className="flex justify-center text-purple-600">
            {loadingState.icon}
          </div>
          
          {/* Mensagem principal */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {loadingState.message}
            </h2>
            
            {loadingState.details && (
              <p className="text-sm text-gray-600">
                {loadingState.details}
              </p>
            )}
          </div>
          
          {/* Loading bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
          
          {/* Ações rápidas */}
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
            >
              Recarregar Página
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
            >
              Ir para Página Inicial
            </button>
          </div>
          
          {/* Informações de debug */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>URL: {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
            <p>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'Server-side'}</p>
            <p>Timestamp: {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente para fallback de erro
export function ErrorLoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center text-red-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Falha ao Carregar Aplicativo
            </h2>
            <p className="text-sm text-gray-600">
              Ocorreu um erro crítico durante o carregamento.
            </p>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
            >
              Página Inicial
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}