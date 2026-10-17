'use client'

interface LandingHeroProps {
  onStartClick: () => void
}

export default function LandingHero({ onStartClick }: LandingHeroProps) {
  return (
    <section className="py-24 px-6 text-center text-white flex flex-col items-center justify-center">
      <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-xs font-medium">
        🚀 Groq Llama AI Destekli İhale Analiz Platformu
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl tracking-tight mb-6">
        EKAP İhalelerini <span className="text-emerald-400">Saniyeler İçinde</span> Analiz Edin
      </h1>
      <p className="text-zinc-400 text-lg max-w-2xl mb-8">
        Kamu ihalesi şartnamelerini yapay zeka ile inceleyin, gizli riskleri görün, kazanma şansınızı artırın.
      </p>
      <button
        onClick={onStartClick}
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-2xl text-base shadow-xl shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5"
      >
        Hemen Analize Başla →
      </button>
    </section>
  )
}