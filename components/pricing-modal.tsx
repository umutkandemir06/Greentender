'use client'

interface PricingModalProps {
  open: boolean
  onClose: () => void
  onSelectPlan: () => void
}

export function PricingModal({ open, onClose, onSelectPlan }: PricingModalProps) {
  if (!open) return null

  const plans = [
    {
      name: 'Başlangıç',
      price: '₺1.499',
      period: '/ ay',
      desc: 'Küçük ölçekli firmalar ve bireysel danışmanlar için ideal.',
      features: ['Ayda 15 İhale Analizi', 'Temel VKN Doğrulama', 'Standart Risk Raporu', 'E-Posta Desteği'],
      popular: false
    },
    {
      name: 'Profesyonel',
      price: '₺3.999',
      period: '/ ay',
      desc: 'Aktif olarak kamu ihalelerine giren orta ölçekli şirketler.',
      features: ['Sınırsız İhale Analizi', 'Gelişmiş GİB Mod-10 VKN Güvenliği', 'Zeyilname Taslak Oluşturucu', 'Canlı EKAP İhale Takibi', 'Öncelikli Destek'],
      popular: true
    },
    {
      name: 'Kurumsal',
      price: 'Özel',
      period: ' teklif alın',
      desc: 'Çoklu şirket yapısı ve özel entegrasyon isteyen holdingler.',
      features: ['Sınırsız Kullanıcı & Firma', 'Özel API Entegrasyonları', 'Özel Risk Modelleri', '7/8 Özel Müşteri Temsilcisi'],
      popular: false
    }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-gray-800 rounded-3xl max-w-4xl w-full p-8 relative shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl text-xs"
        >
          Kapat ✕
        </button>

        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-widest uppercase font-bold px-3 py-1 bg-[#00c875]/10 text-[#00c875] border border-[#00c875]/20 rounded-full">
            FİYATLANDIRMA
          </span>
          <h2 className="text-2xl font-extrabold">GreenTender Üyelik Planları</h2>
          <p className="text-xs text-gray-400">Firmancınızın büyüklüğüne uygun paketi seçin, ihale süreçlerinde riskinizi sıfırlayın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`rounded-2xl p-6 border flex flex-col justify-between space-y-4 relative ${
                plan.popular ? 'bg-black border-[#00c875] shadow-lg shadow-[#00c875]/10' : 'bg-black/40 border-gray-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00c875] text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                  En Çok Tercih Edilen
                </span>
              )}
              <div className="space-y-2">
                <h3 className="font-bold text-sm">{plan.name}</h3>
                <p className="text-[10px] text-gray-400">{plan.desc}</p>
                <div className="pt-2">
                  <span className="text-2xl font-extrabold text-[#00c875]">{plan.price}</span>
                  <span className="text-xs text-gray-500">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-900 text-xs">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <span className="text-[#00c875]">✓</span> {feat}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  onClose()
                  onSelectPlan()
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                  plan.popular ? 'bg-[#00c875] text-black hover:bg-[#00b068]' : 'bg-gray-900 border border-gray-800 text-white hover:bg-gray-800'
                }`}
              >
                Hemen Başla 🚀
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}