'use client'

interface SiteHeaderProps {
  onStart: () => void
  onOpenPricing?: () => void
}

export function SiteHeader({ onStart, onOpenPricing }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-900 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00c875] font-black text-black">
            G
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">GreenTender</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <button 
            onClick={onOpenPricing} 
            className="hover:text-white transition-colors text-left bg-transparent border-none cursor-pointer p-0 text-xs font-medium text-gray-400"
          >
            Üyelik Planları
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onStart}
            className="rounded-xl bg-[#00c875] px-4 py-2 text-xs font-extrabold text-black shadow-lg shadow-[#00c875]/20 hover:bg-[#00b068] transition-all"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </header>
  )
}