import { Suspense } from 'react'
import HomePage from '@/components/HomePage'

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
      <HomePage />
    </Suspense>
  )
}