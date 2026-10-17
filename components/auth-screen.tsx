'use client'

import React, { useState } from 'react'

interface AuthScreenProps {
  mode: 'login' | 'register'
  onSuccess: (name?: string) => void
  onBack: () => void
}

export default function AuthScreen({ mode: initialMode, onSuccess, onBack }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  
  // Kayıt ol alanları
  const [companyName, setCompanyName] = useState('')
  const [vkn, setVkn] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Sektör seçim alanları
  const [mainSector, setMainSector] = useState('Yapim')
  const [subSector, setSubSector] = useState('Insaat_Bina')

  const [errorMsg, setErrorMsg] = useState('')

  // Ana sektöre bağlı yan sektör seçenekleri
  const sectorOptions: Record<string, { label: string; value: string }[]> = {
    Yapim: [
      { label: 'İnşaat / Bina Yapım İşleri', value: 'Insaat_Bina' },
      { label: 'Yol, Köprü ve Altyapı İşleri', value: 'Altyapi_Yol' },
      { label: 'Elektrik ve Mekanik Tesisat İşleri', value: 'Tesisat' }
    ],
    Hizmet: [
      { label: 'Bilgi İşlem ve Yazılım Hizmetleri', value: 'Yazilim_IT' },
      { label: 'Temizlik ve Güvenlik Hizmetleri', value: 'Temizlik_Guvenlik' },
      { label: 'Danışmanlık ve Mühendislik Hizmetleri', value: 'Danismanlik' }
    ],
    MalAlimi: [
      { label: 'Tıbbi Cihaz ve Sarf Malzemeleri', value: 'Tibbi_Malzeme' },
      { label: 'Büro ve Kırtasiye Malzemeleri', value: 'Kirtasiye' },
      { label: 'Gıda ve İaşeli Mal Alımları', value: 'Gida' }
    ]
  }

  const handleMainSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMain = e.target.value
    setMainSector(newMain)
    // Ana sektör değiştiğinde ilk yan sektörü varsayılan seç
    if (sectorOptions[newMain] && sectorOptions[newMain].length > 0) {
      setSubSector(sectorOptions[newMain][0].value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const storedUsers = JSON.parse(localStorage.getItem('greentender_users') || '[]')

    if (mode === 'register') {
      if (!companyName || !vkn || !email || !password || !mainSector || !subSector) {
        setErrorMsg('Lütfen tüm kurumsal ve sektörel bilgileri eksiksiz doldurun.')
        return
      }

      const existingUser = storedUsers.find((u: any) => u.email === email)
      if (existingUser) {
        setErrorMsg('Bu e-posta adresi ile daha önce kayıt olunmuş.')
        return
      }

      if (vkn.length !== 10) {
        setErrorMsg('VKN (Vergi Kimlik Numarası) 10 haneli olmalıdır.')
        return
      }

      // Şirket kaydı (sektör bilgileriyle birlikte)
      const newUser = { companyName, vkn, email, password, mainSector, subSector }
      storedUsers.push(newUser)
      localStorage.setItem('greentender_users', JSON.stringify(storedUsers))
      localStorage.setItem('greentender_current_user', companyName)
      localStorage.setItem('greentender_company_profile', JSON.stringify({ companyName, mainSector, sector: subSector }))

      alert('Şirket kaydı ve sektörel tanımlar başarıyla oluşturuldu! Giriş yapılıyor...')
      onSuccess(companyName)
    } else {
      if (!email || !password) {
        setErrorMsg('Lütfen e-posta ve şifrenizi girin.')
        return
      }

      const foundUser = storedUsers.find(
        (u: any) => u.email === email && u.password === password
      )

      if (foundUser) {
        localStorage.setItem('greentender_current_user', foundUser.companyName)
        localStorage.setItem('greentender_company_profile', JSON.stringify({ 
          companyName: foundUser.companyName, 
          mainSector: foundUser.mainSector, 
          sector: foundUser.subSector 
        }))
        onSuccess(foundUser.companyName)
      } else {
        setErrorMsg('E-posta veya şifre hatalı ya da böyle bir şirket kaydı bulunamadı.')
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl shadow-emerald-950/20 relative">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400 tracking-wider uppercase text-left">
            {mode === 'login' ? 'GİRİŞ YAP' : 'ŞİRKET KAYDI'}
          </h2>
          <div className="flex space-x-2 text-xs">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${mode === 'login' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'}`}
            >
              Giriş
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${mode === 'register' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'}`}
            >
              Kayıt Ol
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1.5">
                  Şirket Adı:
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Örn: GreenTender A.Ş."
                  className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1.5">
                  VKN Numarası (Vergi Kimlik No):
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={vkn}
                  onChange={(e) => setVkn(e.target.value)}
                  placeholder="10 haneli VKN giriniz"
                  className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-xs"
                />
              </div>

              {/* Ana Sektör Seçimi */}
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1.5">
                  Ana Sektör:
                </label>
                <select
                  value={mainSector}
                  onChange={handleMainSectorChange}
                  className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors text-xs"
                >
                  <option value="Yapim">Yapım İşleri</option>
                  <option value="Hizmet">Hizmet Alımları</option>
                  <option value="MalAlimi">Mal Alımları</option>
                </select>
              </div>

              {/* Yan Sektör Seçimi */}
              <div>
                <label className="block text-xs font-medium text-emerald-400 mb-1.5">
                  Yan Sektör / Uzmanlık Alanı:
                </label>
                <select
                  value={subSector}
                  onChange={(e) => setSubSector(e.target.value)}
                  className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors text-xs"
                >
                  {sectorOptions[mainSector]?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-1.5">
              Kurumsal E-posta:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sirketadi@sirket.com"
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-1.5">
              Şifre:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-xs"
              required
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#00e676] hover:bg-[#00c853] text-zinc-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center tracking-wide text-xs"
            >
              {mode === 'login' ? 'ONAYLA' : 'HESAP OLUŞTUR'}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center">
          <button
            onClick={onBack}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Ana Sayfaya Dön
          </button>
        </div>

      </div>
    </div>
  )
}