'use client'

interface ReportDashboardProps {
  report: any
  companyProfile: any
  onNewAnalysis: () => void
}

export default function ReportDashboard({ report, companyProfile, onNewAnalysis }: ReportDashboardProps) {
  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col space-y-6">
      
      {/* Üst Bilgi Kartı */}
      <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            ANALİZ RAPORU
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            {report?.title || '2026/104821_T.C. Sağlık Bakanlığı Analiz Raporu'}
          </h2>
          <p className="text-xs text-zinc-400">
            Kurum: Kamu İhale Kurumu / İlgili İdare / Dosya: {report?.filename || '2026/104821_T.C. Sağlık Bakanlığı.pdf'}
          </p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
        >
          Yeni Analiz Yap
        </button>
      </div>

      {/* Ana Grid Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sol Sütun (7 birim genişlik) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Kritik Riskler */}
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-lg">
              <span>🔴</span>
              <h3>Kritik Riskler</h3>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>Teslimat süresi (30 gün) sektör standartlarına göre oldukça kısa.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>İş deneyim belgesi oranı %80 olarak yüksek belirlenmiş.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>Teknik şartnamede tek bir markaya işaret eden spesifikasyon riski var.</span>
              </li>
            </ul>
          </div>

          {/* İstenen Belgeler (Kazanma Oranından Önce Üstte) */}
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-lg">
              <span>🔵</span>
              <h3>İstenen Belgeler</h3>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>İmza Sirküleri ve Ticaret Sicil Gazetesi</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>Geçici Teminat Mektubu</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>Son 3 Yıla Ait Bilanço ve Gelir Tablosu</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-zinc-500">•</span>
                <span>ISO 9001 ve TSE Kalite Belgesi</span>
              </li>
            </ul>
          </div>

          {/* İhale Kazanma Oranı (En Altta ve Kompakt) */}
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs">
              <span>🔵</span>
              <span>İhale Kazanma Oranı</span>
            </div>
            <span className="text-base font-bold text-emerald-400">
              %{report?.winRate ?? 82}
            </span>
          </div>

        </div>

        {/* Sağ Sütun (5 birim genişlik) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Bütçe ve Teminat Detayları */}
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
              <span>🟢</span>
              <h3>Bütçe ve Teminat Detayları</h3>
            </div>
            <div className="text-xs text-zinc-300 space-y-1.5 pt-1">
              <p><strong className="text-zinc-400 font-normal">Tahmini Bütçe:</strong> {report?.budget || '18.400.000 TL'}</p>
              <p><strong className="text-zinc-400 font-normal">Geçici Teminat (%3):</strong> 375.000 TL</p>
              <p><strong className="text-zinc-400 font-normal">Kesin Teminat (%6):</strong> 750.000 TL</p>
            </div>
          </div>

          {/* Cezalar ve Yükümlülükler */}
          <div className="bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
              <span>🟡</span>
              <h3>Cezalar ve Yükümlülükler</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Gecikilen her takvim günü için ihale bedelinin %0.05 oranında gecikme cezası uygulanır. Üst üste 10 gün gecikme durumunda sözleşme feshedilir.
            </p>
          </div>

          {/* İhalede Düzeltilmesi Gerekenler & Zeyilname Oluşturma */}
          <div className="bg-[#0d0d0f] border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-lime-400 font-bold text-base">
              <span>🟢</span>
              <h3>İhalede Düzeltilmesi Gerekenler & Zeyilname</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Teklif dosyası sunulmadan önce teknik şartnamedeki tekil marka kısıtlaması için idareye resmi zeyilname / açıklama talebi başvurusu yapılması kritik önem taşımaktadır.
            </p>
            <div className="pt-2">
              <button
                onClick={() => alert('Zeyilname talebi/taslağı oluşturuluyor...')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all shadow-md text-center"
              >
                Zeyilname / İtiraz Taslağı Oluştur →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}