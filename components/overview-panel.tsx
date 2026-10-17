'use client'

import { type HistoryItem } from './history-panel'

interface OverviewPanelProps {
  userName: string
  onNewAnalysis: () => void
  onSelectHistoryItem: (item: HistoryItem) => void
  recentAnalyses: HistoryItem[]
  allAnalyses?: HistoryItem[] // Kullanıcının tüm analiz geçmişi
}

export function OverviewPanel({ 
  userName, 
  onNewAnalysis, 
  onSelectHistoryItem, 
  recentAnalyses,
  allAnalyses = []
}: OverviewPanelProps) {
  // Dinamik İstatistik Hesaplamaları
  const totalAnalyzed = allAnalyses.length
  
  const averageWinRate = totalAnalyzed > 0 
    ? Math.round(allAnalyses.reduce((acc, item) => acc + (item.winRate || 0), 0) / totalAnalyzed)
    : 0

  // Zeyilname taslak sayısı (Her analizin risk veya düzeltme önerisi kadar veya toplam analiz sayısı bazlı)
  const totalZeyilname = allAnalyses.reduce((acc, item) => {
    const fixesCount = item.reportData?.fixes?.length || 1
    return acc + fixesCount
  }, 0)

  return (
    <div className="space-y-8">
      {/* Firma Yönetim Banner */}
      <div className="bg-[#121212] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="text-[10px] tracking-widest uppercase font-bold px-3 py-1 bg-[#00c875]/10 text-[#00c875] border border-[#00c875]/20 rounded-full">
            FİRMA YÖNETİM PANELİ
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Hoş Geldiniz, <span className="text-[#00c875]">{userName}</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Yapay zeka destekli GreenTender paneli ile ihalelerinizi analiz edin, firmanıza özel kazanma oranlarını görün ve zeyilname stratejileri geliştirin.
          </p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="px-6 py-3 bg-[#00c875] text-black text-xs font-extrabold rounded-2xl shadow-lg hover:bg-[#00b068] transition-all flex items-center gap-2"
        >
          <span>✨</span> Yeni İhale Analiz Et
        </button>
      </div>

      {/* Dinamik İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 space-y-3">
          <p className="text-xs text-gray-400 font-medium">Toplam Analiz Edilen İhale</p>
          <div className="text-4xl font-black text-white">{totalAnalyzed}</div>
          <p className="text-[10px] text-[#00c875]">
            {totalAnalyzed > 0 ? 'Hesabınıza ait aktif analizler' : 'Henüz analiz yapılmadı'}
          </p>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 space-y-3">
          <p className="text-xs text-gray-400 font-medium">Ortalama Kazanma Skoru</p>
          <div className="text-4xl font-black text-white">
            {totalAnalyzed > 0 ? `%${averageWinRate}` : '%0'}
          </div>
          <p className="text-[10px] text-gray-500">Sektör uyumlu ihaleler baz alındı</p>
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 space-y-3">
          <p className="text-xs text-gray-400 font-medium">Oluşturulan Zeyilname Taslağı</p>
          <div className="text-4xl font-black text-white">{totalZeyilname}</div>
          <p className="text-[10px] text-[#00c875]">İdareye sunulmaya hazır</p>
        </div>
      </div>

      {/* Son Analizler Bölümü */}
      <div className="bg-[#121212] border border-gray-800 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>📊</span> Son Analizler
          </h2>
          <span className="text-[10px] text-gray-500">Son 30 güne ait kayıtlar</span>
        </div>

        {recentAnalyses.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl space-y-2">
            <p className="text-xs text-gray-400">Henüz gerçekleştirilmiş bir ihale analizi bulunmuyor.</p>
            <button 
              onClick={onNewAnalysis}
              className="text-xs text-[#00c875] font-bold hover:underline"
            >
              İlk ihale dokümanını yükle →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {recentAnalyses.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectHistoryItem(item)}
                className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-2xl hover:border-gray-700 cursor-pointer transition-all text-xs"
              >
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-[10px] text-gray-400">{item.institution} • {item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-extrabold text-[#00c875]">%{item.winRate}</span>
                    <p className="text-[9px] text-gray-500">Kazanma Şansı</p>
                  </div>
                  <span className="text-gray-600">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}