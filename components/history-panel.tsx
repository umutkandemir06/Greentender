'use client'

import { useState } from 'react'

export interface HistoryItem {
  id: string
  title: string
  institution: string
  fileName: string
  date: string
  winRate: number
  risksCount: number
  reportData?: any
}

interface HistoryPanelProps {
  historyList?: HistoryItem[]
  onSelectReport?: (item: HistoryItem) => void
}

const DEFAULT_HISTORY: HistoryItem[] = [
  {
    id: '1',
    title: '2026/105190 Karayolları Genel Müdürlüğü Yol Yapım İhalesi',
    institution: 'Karayolları Genel Müdürlüğü',
    fileName: '2026_105190_Karayollari.pdf',
    date: '17 Ekim 2026',
    winRate: 88,
    risksCount: 3
  },
  {
    id: '2',
    title: 'T.C. Sağlık Bakanlığı Tıbbi Cihaz ve Sarf Malzeme Alımı',
    institution: 'Sağlık Bakanlığı',
    fileName: 'Saglik_Bakanligi_Sartname.pdf',
    date: '15 Ekim 2026',
    winRate: 22,
    risksCount: 4
  },
  {
    id: '3',
    title: 'İBB Bilgi İşlem Dairesi Sunucu Hizmet Alımı',
    institution: 'İstanbul Büyükşehir Belediyesi',
    fileName: 'IBB_Sunucu_Ihale.pdf',
    date: '10 Ekim 2026',
    winRate: 94,
    risksCount: 2
  }
]

export function HistoryPanel({ historyList = DEFAULT_HISTORY, onSelectReport }: HistoryPanelProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredHistory = historyList.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.institution.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-6 text-white">
      {/* Üst Başlık & Arama */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212] border border-gray-800/80 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📜</span> İhale Analiz Geçmişi
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Daha önce analiz ettirdiğiniz tüm ihale dosyaları ve rapor kayıtları.
          </p>
        </div>

        <input
          type="text"
          placeholder="İhale veya Kurum Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black/50 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00c875] w-full md:w-72 transition"
        />
      </div>

      {/* Geçmiş Kartlar Grid */}
      <div className="grid gap-4">
        {filteredHistory.length === 0 ? (
          <div className="bg-[#121212] border border-gray-800/80 rounded-2xl p-12 text-center text-gray-500 text-xs">
            Aramanızla eşleşen geçmiş ihale analizi bulunamadı.
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectReport?.(item)}
              className="bg-[#121212] border border-gray-800/80 hover:border-[#00c875]/50 p-5 rounded-2xl shadow-lg transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-800 text-gray-300 rounded-md">
                    {item.date}
                  </span>
                  <span className="text-xs text-gray-400">• {item.institution}</span>
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-[#00c875] transition">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 font-mono">
                  Dosya: {item.fileName}
                </p>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                <div className="text-center">
                  <div className="text-[10px] text-gray-400">Kritik Risk</div>
                  <div className="text-xs font-bold text-red-400 mt-0.5">
                    {item.risksCount} Tespit
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[10px] text-gray-400">Kazanma Oranı</div>
                  <div className={`text-base font-extrabold mt-0.5 ${
                    item.winRate >= 70 ? 'text-[#00c875]' : item.winRate >= 40 ? 'text-amber-400' : 'text-red-500'
                  }`}>
                    %{item.winRate}
                  </div>
                </div>

                <button className="px-4 py-2 bg-gray-900 group-hover:bg-[#00c875] text-gray-300 group-hover:text-black font-bold text-xs rounded-xl transition border border-gray-800 group-hover:border-[#00c875]">
                  Raporu Aç →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}