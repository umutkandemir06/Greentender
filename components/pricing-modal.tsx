'use client'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Fiyatlandırma Planları</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          <div className="border border-emerald-500/50 bg-emerald-950/20 p-4 rounded-xl">
            <h4 className="font-bold text-emerald-400">Pro Kurumsal</h4>
            <p className="text-2xl font-ext500 mt-1">₺2.499 <span className="text-xs text-zinc-400">/ ay</span></p>
            <p className="text-xs text-zinc-300 mt-2">Sınırsız EKAP analizi, gelişmiş risk puanlaması ve öncelikli destek.</p>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl text-sm font-medium">Kapat</button>
        </div>
      </div>
    </div>
  )
}