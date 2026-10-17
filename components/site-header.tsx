'use client'

interface SiteHeaderProps {
  isLoggedIn: boolean
  userName: string
  onLoginClick: () => void
  onRegisterClick: () => void
  onLogout: () => void
  onOpenHelp: () => void
  onOpenPricing: () => void
  activeTab: string
  setActiveTab: (tab: any) => void
  currentScreen: string
  setCurrentScreen: (screen: any) => void
}

export default function SiteHeader({
  isLoggedIn,
  userName,
  onLoginClick,
  onRegisterClick,
  onLogout,
  onOpenHelp,
  onOpenPricing,
  activeTab,
  setActiveTab,
  currentScreen,
  setCurrentScreen
}: SiteHeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex justify-between items-center text-white">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentScreen('landing')}>
        <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-lg">G</div>
        <span className="font-bold text-lg tracking-tight">GreenTender</span>
      </div>

      {isLoggedIn && currentScreen === 'upload' && (
        <nav className="hidden md:flex space-x-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'upload' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Yeni Analiz
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'history' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Geçmiş Raporlar
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'live' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Canlı İhaleler
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Firma Ayarları
          </button>
        </nav>
      )}

      <div className="flex items-center space-x-3">
        <button onClick={onOpenHelp} className="text-xs text-zinc-400 hover:text-white px-3 py-2">Yardım</button>
        <button onClick={onOpenPricing} className="text-xs text-zinc-400 hover:text-white px-3 py-2">Fiyatlar</button>

        {isLoggedIn ? (
          <div className="flex items-center space-x-3 border-l border-zinc-800 pl-4">
            <span className="text-xs text-zinc-300 font-medium">{userName}</span>
            <button onClick={onLogout} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs px-3 py-1.5 rounded-lg">Çıkış</button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={onLoginClick} className="text-xs px-3 py-2 text-zinc-300 hover:text-white font-medium">Giriş Yap</button>
            <button onClick={onRegisterClick} className="bg-emerald-600 hover:bg-emerald-500 text-xs px-4 py-2 rounded-xl font-medium shadow-lg shadow-emerald-900/20">Kayıt Ol</button>
          </div>
        )}
      </div>
    </header>
  )
}