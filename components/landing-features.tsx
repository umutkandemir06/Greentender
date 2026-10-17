'use client'

export function LandingFeatures() {
  const features = [
    { title: 'Işık Hızında Analiz', desc: 'Groq Llama 3 altyapısıyla 100 sayfalık şartnameler 2 saniyede taranır.' },
    { title: 'Risk & Ceza Tespiti', desc: 'Gözden kaçan günlük ceza ve kısıtlayıcı maddeler anında listelenir.' },
    { title: 'Belge & Teminat Özeti', desc: 'Geçici/kesin teminat oranları ve gerekli yeterlilik belgeleri özetlenir.' }
  ]

  return (
    <section id="features" className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}