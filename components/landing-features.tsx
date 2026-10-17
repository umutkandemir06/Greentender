'use client'

export default function LandingFeatures() {
  return (
    <section className="py-20 px-6 bg-zinc-950 border-t border-zinc-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Güçlü Yapay Zeka Özellikleri</h2>
        <p className="text-zinc-400 mb-12">EKAP dokümanlarını saniyeler içinde analiz edin, riskleri önceden görün.</p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-emerald-400">Akıllı Şartname Analizi</h3>
            <p className="text-sm text-zinc-400">Gizli cezai şartları, riskli maddeleri ve dikkat edilmesi gereken noktaları otomatik tarar.</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-emerald-400">Kazanma Oranı Simülasyonu</h3>
            <p className="text-sm text-zinc-400">Firma profilinize ve geçmiş verilere dayanarak ihale kazanma şansınızı yüzde olarak hesaplar.</p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-emerald-400">Otomatik Dosya Kontrolü</h3>
            <p className="text-sm text-zinc-400">Eksik evrak veya hatalı beyan riskini sıfıra indiren eksiksiz evrak listesi sunar.</p>
          </div>
        </div>
      </div>
    </section>
  )
}