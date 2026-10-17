'use client'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Yardım ve Destek</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
        </div>
        <div className="space-y-3 text-sm text-zinc-300">
          <p><strong>GreenTender Nedir?</strong> EKAP ihale dokümanlarını yapay zeka ile saniyeler içinde analiz eden gelişmiş bir asistan sistemidir.</p>
          <p><strong>Nasıl Kullanılır?</strong> "Yeni Analiz" sekmesinden ihale PDF dosyanızı yükleyerek detaylı risk ve bütçe raporu alabilirsiniz.</p>
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl text-sm font-medium">Kapat</button>
        </div>
      </div>
    </div>
  )
}