'use client'

interface DashboardShellProps {
  userName: string
  onStartAnalysisClick: () => void
  onHistoryClick: () => void
}

export default function DashboardShell({ userName, onStartAnalysisClick, onHistoryClick }: DashboardShellProps) {
  // Örnek son analizler listesi
  const recentAnalyses = [
    { id: '1', title: 'İhale #48291 - Yapım İşi', risk: 'Orta risk', rate: '%82', badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
    { id: '2', title: 'İhale #39201 - Hizmet Alımı', risk: 'Düşük risk', rate: '%91', badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    { id: '3', title: 'İhale #94821 - Mal Alımı', risk: 'Orta risk', rate: '%74', badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
    { id: '4', title: 'İhale #10293 - Yapım İşi', risk: 'Düşük risk', rate: '%88', badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  ]

  return (
    <div className="flex-1 p-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Hoş Geldiniz, <span className="text-zinc-300 font-normal">{userName}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sol Taraf: Son Analizler */}
        <div className="lg:col-span-7 bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white tracking-wide">Son Analizler</h3>
            <span className="text-xs text-zinc-400">Son 4 kayıt</span>
          </div>

          <div className="space-y-3 mb-8">
            {recentAnalyses.map((item) => (
              <div 
                key={item.id}
                onClick={onHistoryClick}
                className="bg-[#121216] hover:bg-[#18181d] border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${item.badgeClass}`}>
                    {item.risk}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-emerald-400">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={onStartAnalysisClick}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center space-x-2"
            >
              <span>İhaleyi Analiz Et</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Sağ Taraf: Özellikler Bilgilendirme Kartları */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">ÖZELLİKLER</div>
          
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Teklif kararınızı verilere dayandırın</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              GreenTender AI, ihale hazırlık ekiplerinin günlerce süren doküman incelemesini dakikalara indirir ve hiçbir kritik maddeyi kaçırmaz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3 text-sm">📋</div>
              <h4 className="text-sm font-bold text-white mb-1">Gereksinim Kontrolü</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">İş deneyim, teminat, sertifika ve personel şartlarını firmanızla otomatik eşleştirir.</p>
            </div>

            <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3 text-sm">🛡️</div>
              <h4 className="text-sm font-bold text-white mb-1">Risk Tespiti</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">Ceza maddeleri, kısa teslim süreleri ve eksik belgeler yüksek/orta/düşük olarak işaretlenir.</p>
            </div>

            <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3 text-sm">📊</div>
              <h4 className="text-sm font-bold text-white mb-1">Maliyet Dağılımı</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">Malzeme, işçilik ve genel giderler üzerinden tahmini bütçe kalemlerini çıkarır.</p>
            </div>

            <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3 text-sm">⏰</div>
              <h4 className="text-sm font-bold text-white mb-1">Takvim & Uyarılar</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">Zeyilname, son teklif ve sözleşme tarihlerini kronolojik olarak sıralar.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}