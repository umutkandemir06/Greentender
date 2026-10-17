'use client'

export type DashboardSection = 'overview' | 'new' | 'history' | 'live-tenders' | 'settings'

interface DashboardShellProps {
  section: DashboardSection
  onNavigate: (section: DashboardSection) => void
  onHelp: () => void
  onExit: () => void
  children: React.ReactNode
}

export function DashboardShell({ section, onNavigate, onHelp, onExit, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navbar */}
      <header className="bg-black/80 border-b border-gray-800/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('overview')} className="font-extrabold text-xl tracking-tight text-[#00c875] flex items-center gap-2">
            GreenTender
          </button>

          <nav className="flex gap-2">
            <button
              onClick={() => onNavigate('overview')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                section === 'overview' ? 'bg-[#00c875]/20 text-[#00c875] border border-[#00c875]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              Profil
            </button>

            <button
              onClick={() => onNavigate('new')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                section === 'new' ? 'bg-[#00c875]/20 text-[#00c875] border border-[#00c875]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              ✨ Analiz Et
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                section === 'history' ? 'bg-[#00c875]/20 text-[#00c875] border border-[#00c875]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              Geçmiş
            </button>

            <button
              onClick={() => onNavigate('live-tenders')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                section === 'live-tenders' ? 'bg-[#00c875]/20 text-[#00c875] border border-[#00c875]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              🌐 Güncel İhaleler
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                section === 'settings' ? 'bg-[#00c875]/20 text-[#00c875] border border-[#00c875]/30' : 'text-gray-400 hover:text-white'
              }`}
            >
              Ayarlar
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <button onClick={onHelp} className="text-gray-400 hover:text-white transition">Yardım</button>
          <button onClick={onExit} className="text-red-500 hover:text-red-400 transition font-bold">Çıkış</button>
        </div>
      </header>

      <main className="flex-1 bg-[#0d0d0d]">{children}</main>
    </div>
  )
}