'use client'

import { useState, useEffect } from 'react'

interface LandingCTAProps {
  onStart: () => void
}

export function LandingCTA({ onStart }: LandingCTAProps) {
  return (
    <section className="py-16 text-center bg-emerald-950 text-white px-6">
      <h2 className="text-3xl font-bold mb-4">İhale Süreçlerinizi Hızlandırın</h2>
      <p className="text-emerald-200 mb-6 text-sm">Hemen ilk şartnamenizi yükleyin ve AI raporunuzu alın.</p>
      <button
        onClick={onStart}
        className="px-6 py-3 text-sm font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition"
      >
        Ücretsiz Dene
      </button>
    </section>
  )
}

export function SiteFooter() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="py-6 text-center text-xs text-gray-400 bg-white border-t border-gray-100">
      © {year ?? 2026} GreenTender EKAP AI Analysis. Tüm hakları saklıdır.
    </footer>
  )
}