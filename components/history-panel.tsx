'use client'

interface HistoryPanelProps {
  items: any[]
  onSelectReport: (report: any) => void
}

export default function HistoryPanel({ items, onSelectReport }: HistoryPanelProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 w-full text-white">
      <h2 className="text-xl font-bold mb-4">Geçmiş Analizler</h2>
      {items.length === 0 ? (
        <p className="text-zinc-400 text-sm">Henüz gerçekleştirilmiş bir ihale analizi bulunmuyor.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-xs text-zinc-400">Tarih: {item.date} | Kazanma Oranı: %{item.winRate}</p>
              </div>
              <button
                onClick={() => onSelectReport(item.report)}
                className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-xs font-medium"
              >
                Raporu Görüntüle
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}