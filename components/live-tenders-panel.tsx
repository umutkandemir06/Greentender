'use client'

import { useState } from 'react'

export interface LiveTenderItem {
  id: string
  ikn: string
  title: string
  institution: string
  budget: string
  deadline: string
  mainSector: 'Yapim' | 'Mal' | 'Hizmet'
  sampleText: string
}

interface LiveTendersPanelProps {
  onAnalyzeTender: (tender: LiveTenderItem) => void
  companyMainSector?: string
  companyEmail?: string
}

const INITIAL_TENDERS: LiveTenderItem[] = [
  {
    id: '1',
    ikn: '2026/105420',
    title: 'Üniversite Hastanesi Tıbbi Cihaz ve Sarf Malzeme Alımı',
    institution: 'Sağlık Bakanlığı Üniversite Hastanesi',
    budget: '₺14.500.000',
    deadline: '25 Ekim 2026',
    mainSector: 'Mal',
    sampleText: 'İhale Konusu: Tıbbi cihaz ve sarf malzeme alımı. Geçici teminat oranı %3. Gecikme cezası binde 5tir.'
  },
  {
    id: '2',
    ikn: '2026/118930',
    title: 'Karayolu Üstyapı ve Asfalt Serme Yapım İşi',
    institution: 'Karayolları Genel Müdürlüğü',
    budget: '₺42.000.000',
    deadline: '28 Ekim 2026',
    mainSector: 'Yapim',
    sampleText: 'İhale Konusu: Yol yapım ve asfalt işleri. Benzer iş kolları üst yapı işleridir. Geçici teminat %3.'
  },
  {
    id: '3',
    ikn: '2026/124050',
    title: 'Belediye Bilgi İşlem Yazılım ve Bulut Sunucu Kiralama Hizmeti',
    institution: 'Büyükşehir Belediyesi Bilgi İşlem Daire Başkanlığı',
    budget: '₺8.200.000',
    deadline: '02 Kasım 2026',
    mainSector: 'Hizmet',
    sampleText: 'İhale Konusu: Yazılım danışmanlık ve bulut bilişim hizmet alımı. Personel çalıştırma şartları dahildir.'
  }
]

export function LiveTendersPanel({ onAnalyzeTender, companyMainSector, companyEmail }: LiveTendersPanelProps) {
  const [tenders, setTenders] = useState<LiveTenderItem[]>(INITIAL_TENDERS)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)

  // Admin hesabı ise tüm sektörler serbesttir
  const isAdmin = companyEmail?.toLowerCase() === 'admin@sirket.com'

  const handleSyncEkap = async () => {
    setSyncing(true)
    setSyncMessage(null)
    setWarningMessage(null)

    try {
      const response = await fetch('/api/ekap-sync')
      const data = await response.json()

      if (data.success && data.tenders) {
        setTenders(prev => {
          const existingIds = new Set(prev.map(t => t.id))
          const brandNew = data.tenders.filter((t: LiveTenderItem) => !existingIds.has(t.id))
          return [...brandNew, ...prev]
        })
        setSyncMessage(`EKAP sunucusundan en güncel ilanlar başarıyla çekildi! (${data.source})`)
      } else {
        setSyncMessage('EKAP bülteni güncel, yeni ihale bulunamadı.')
      }
    } catch (err) {
      setSyncMessage('EKAP senkronizasyonu sırasında ağ bağlantı hatası oluştu.')
    } finally {
      setSyncing(false)
    }
  }

  const handleTryAnalyze = (tender: LiveTenderItem) => {
    setWarningMessage(null)

    // Eğer admin değilse ve sektörler uyuşmuyorsa engelle
    if (!isAdmin && companyMainSector && companyMainSector !== tender.mainSector) {
      const sectorNames: Record<string, string> = {
        Yapim: 'Yapım / İnşaat İşleri',
        Mal: 'Mal Alımı İhaleleri',
        Hizmet: 'Hizmet Alımı İhaleleri'
      }
      setWarningMessage(
        `Yetki Hatası: Bu ihale "${sectorNames[tender.mainSector] || tender.mainSector}" kategorisindedir. Kayıtlı olduğunuz sektör (${sectorNames[companyMainSector] || companyMainSector}) bu ihale türünü kapsamamaktadır.`
      )
      return
    }

    onAnalyzeTender(tender)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">Canlı EKAP İhaleleri</h2>
          <p className="text-xs text-gray-400">Kamu İhale Kurumu (EKAP) resmi akışından anlık kamu ihale listesi.</p>
        </div>
        <div className="flex items-center gap-3">
          {companyMainSector && (
            <span className="text-xs px-3 py-1.5 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl">
              Firmanız: <strong className="text-[#00c875]">{isAdmin ? 'Süper Admin (Tüm Sektörler Yetkili)' : companyMainSector}</strong>
            </span>
          )}
          <button
            onClick={handleSyncEkap}
            disabled={syncing}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <span className={syncing ? 'animate-spin' : ''}>🔄</span>
            {syncing ? 'EKAP Bağlanılıyor...' : 'EKAP Senkronize Et'}
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className="p-3 bg-[#00c875]/10 border border-[#00c875]/30 rounded-xl text-[#00c875] text-xs font-medium">
          {syncMessage}
        </div>
      )}

      {warningMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-400 text-xs space-y-2">
          <div className="font-bold flex items-center gap-2">
            <span>⚠️</span> Sektörel Yetki Kısıtlaması
          </div>
          <p>{warningMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tenders.map(tender => {
          const isAuthorized = isAdmin || !companyMainSector || companyMainSector === tender.mainSector

          return (
            <div 
              key={tender.id} 
              className={`bg-[#121212] border rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                isAuthorized ? 'border-gray-800 hover:border-gray-700' : 'border-red-900/40 bg-red-950/5'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-black border border-gray-800 text-gray-400 rounded-md">
                    İKN: {tender.ikn}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    tender.mainSector === 'Yapim' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    tender.mainSector === 'Mal' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {tender.mainSector === 'Yapim' ? 'Yapım' : tender.mainSector === 'Mal' ? 'Mal Alımı' : 'Hizmet'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{tender.title}</h3>
                <p className="text-xs text-gray-400">{tender.institution} • Son Başvuru: {tender.deadline}</p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-800">
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#00c875]">{tender.budget}</div>
                  <p className="text-[10px] text-gray-500">Tahmini Bütçe</p>
                </div>
                <button
                  onClick={() => handleTryAnalyze(tender)}
                  className={`px-4 py.2.5 rounded-xl text-xs font-bold transition-all ${
                    isAuthorized 
                      ? 'bg-[#00c875] text-black hover:bg-[#00b068]' 
                      : 'bg-gray-900 border border-gray-800 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {isAuthorized ? 'Analiz Et 🚀' : 'Yetki Yok 🔒'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}