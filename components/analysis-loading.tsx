'use client'

import { useEffect } from 'react'

interface AnalysisLoadingProps {
  fileName: string
  ready: boolean
  error: string | null
  onComplete: () => void
  onRetry: () => void
}

export function AnalysisLoading({ fileName, ready, error, onComplete, onRetry }: AnalysisLoadingProps) {
  useEffect(() => {
    if (ready && !error) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [ready, error, onComplete])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500 text-2xl font-bold">
          !
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Analiz Sırasında Hata Oluştu</h3>
        <p className="text-red-600 mb-6 max-w-md text-sm">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
        >
          Tekrar Deneyin
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">İhale Şartnamesi Analiz Ediliyor...</h3>
      <p className="text-gray-500 text-sm mb-1">{fileName}</p>
      <p className="text-xs text-gray-400">Groq AI maddeleri, bütçeyi ve riskleri tarıyor.</p>
    </div>
  )
}