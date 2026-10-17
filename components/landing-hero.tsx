'use client'

interface LandingHeroProps {
  onStart: () => void
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="py-20 px-6 text-center max-w-4xl mx-auto">
      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-[#00c875] bg-[#00c875]/10 rounded-full border border-[#00c875]/20">
        Yapay Zekâ Destekli EKAP Analitiği
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
        Kamu İhale Şartnamelerini <span className="text-[#00c875]">Saniyeler İçinde</span> Analiz Edin
      </h1>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
        Yüzlerce sayfalık şartnamelerdeki bütçe, teminat, ceza ve risk maddelerini Groq AI hızıyla otomatik çıkarın, ihale süreçlerinde riskinizi sıfırlayın.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 text-base font-bold text-black bg-[#00c875] hover:bg-[#00b067] rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
      >
        İhale Analizini Başlat
      </button>
    </section>
  )
}