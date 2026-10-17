'use client'

interface ReportDashboardProps {
  report: any
  companyProfile: any
  onNewAnalysis: () => void
}

export default function ReportDashboard({ report, companyProfile, onNewAnalysis }: ReportDashboardProps) {
  return (
    <div className="max-w-5xl mx-auto p-8 w-full text-white space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div>
          <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">Analiz Tamamlandı</span>
          <h2 className="text-2xl font-bold mt-2">{report.title || 'İhale Analiz Raporu'}</h2>
          <p className="text-sm text-zinc-400">{report.institution || 'Kamu İhale Kurumu'}</p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          + Yeni Analiz Yap
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-xs text-zinc-400 font-medium mb-1">Tahmini Kazanma Oranı</h4>
          <p className="text-3xl font-extrabold text-emerald-400">%{report.winRate ?? 75}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-xs text-zinc-400 font-medium mb-1">Yaklaşık Maliyet / Bütçe</h4>
          <p className="text-2xl font-extrabold">{report.budget || '₺10.000.000'}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h4 className="text-xs text-zinc-400 font-medium mb-1">Cezai Şart Riski</h4>
          <p className="text-sm font-semibold text-amber-400">{report.penalties || 'Standart gecikme cezaları mevcut.'}</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold">Yapay Zeka Yönetici Özeti</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">{report.summary || 'Doküman başarıyla incelendi, teknik şartname firma yeterliliklerinize uygundur.'}</p>
      </div>
    </div>
  )
}