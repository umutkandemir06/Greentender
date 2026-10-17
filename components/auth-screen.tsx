'use client'

import { useState } from 'react'

interface AuthScreenProps {
  onLoginSuccess: (companyData?: any) => void
  onBack: () => void
  registeredCompanies?: any[]
}

const SUB_SECTORS: Record<string, { value: string; label: string }[]> = {
  Yapim: [
    { value: 'Insaat_Bina', label: 'İnşaat & Üst Yapı' },
    { value: 'Insaat_Altyapi', label: 'Altyapı, Karayolu & Baraj' },
    { value: 'Insaat_Tesisat', label: 'Elektrik, Mekanik & Tesisat' },
    { value: 'Insaat_Restorasyon', label: 'Restorasyon & Peyzaj' },
  ],
  Mal: [
    { value: 'Saglik_Medikal', label: 'Medikal, Tıbbi Cihaz & İlaç' },
    { value: 'Bilisim_Donanim', label: 'Bilişim, Donanım & Teknoloji' },
    { value: 'Tasit_IsMakinesi', label: 'Taşıt, Araç & İş Makinesi' },
    { value: 'Gida_Erzak', label: 'Gıda, Erzak & Tarım Ürünleri' },
    { value: 'Enerji_Akaryakit', label: 'Akaryakıt, Enerji & Maden' },
    { value: 'Tekstil_Mobilya', label: 'Mobilya, Tekstil & Büro' },
    { value: 'Kimya_Temizlik', label: 'Kimya & Hijyen Malzemeleri' },
  ],
  Hizmet: [
    { value: 'Yazilim_Danismanlik', label: 'Yazılım, Bilişim & Danışmanlık' },
    { value: 'Yemek_Hizmeti', label: 'Yemek Hazırlama & Dağıtım' },
    { value: 'Temizlik_Hizmeti', label: 'Temizlik & Vektörle Mücadele' },
    { value: 'Guvenlik_Hizmeti', label: 'Özel Güvenlik Hizmetleri' },
    { value: 'Lojistik_Tasima', label: 'Taşıma, Lojistik & Araç Kiralama' },
    { value: 'Muhendislik_Proje', label: 'Harita, Proje & Mühendislik' },
    { value: 'Personel_Hizmeti', label: 'Personel Çalıştırılmasına Dayalı' },
  ]
}

const OFFICIAL_COMPANIES: Record<string, string> = {
  '0910008080': 'Aselsan',
  '8760040353': 'Türk Hava Yolları',
  '8790017566': 'Turkcell',
  '4600010940': 'Havelsan',
  '7350015437': 'Roketsan'
}

function isValidVKN(vkn: string): boolean {
  if (!/^\d{10}$/.test(vkn)) return false
  if (OFFICIAL_COMPANIES[vkn]) return true

  const v = vkn.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let c1 = (v[i] + (9 - i)) % 10
    if (c1 !== 0) {
      let c2 = (c1 * Math.pow(2, 9 - i)) % 9
      sum += (c2 === 0 ? 9 : c2)
    }
  }
  return ((10 - (sum % 10)) % 10) === v[9]
}

export function AuthScreen({ onLoginSuccess, onBack, registeredCompanies = [] }: AuthScreenProps) {
  const [isRegister, setIsRegister] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [taxNumber, setTaxNumber] = useState('')
  const [vknError, setVknError] = useState('')
  const [authError, setAuthError] = useState('')
  const [mainSector, setMainSector] = useState<'Yapim' | 'Mal' | 'Hizmet'>('Yapim')
  const [subSector, setSubSector] = useState('Insaat_Bina')

  const handleMainSectorChange = (sec: 'Yapim' | 'Mal' | 'Hizmet') => {
    setMainSector(sec)
    if (SUB_SECTORS[sec]?.[0]) {
      setSubSector(SUB_SECTORS[sec][0].value)
    }
  }

  const handleTaxNumberChange = (val: string) => {
    const num = val.replace(/\D/g, '').slice(0, 10)
    setTaxNumber(num)
    setVknError(num.length === 10 ? (isValidVKN(num) ? '' : 'Geçersiz VKN!') : '10 haneli VKN giriniz.')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    if (isRegister) {
      if (!taxNumber || taxNumber.length !== 10 || !isValidVKN(taxNumber)) {
        setVknError('Geçerli VKN giriniz.')
        return
      }

      const trimmedName = companyName.trim().toLowerCase()
      const registeredOfficialName = OFFICIAL_COMPANIES[taxNumber]

      if (registeredOfficialName) {
        const expected = registeredOfficialName.toLowerCase()
        if (!trimmedName.includes(expected)) {
          setVknError('Bu VKN başka bir tescilli kuruma aittir! Girdiğiniz firma ünvanı ile uyuşmuyor.')
          return
        }
      }

      onLoginSuccess({ 
        email, 
        password, 
        companyName: companyName.trim() || 'Kayıtlı Firma', 
        taxNumber, 
        mainSector, 
        sector: subSector 
      })
    } else {
      const matched = registeredCompanies.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password)
      if (matched) onLoginSuccess(matched)
      else setAuthError('E-posta veya şifre hatalı!')
    }
  }

  const isFormValid = isRegister ? taxNumber.length === 10 && isValidVKN(taxNumber) : email.length > 0 && password.length > 0
  const iCls = "w-full bg-black border border-gray-800 rounded-xl px-4 py-2 text-white text-xs"

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-xs text-gray-400 bg-gray-900 px-4 py-2 rounded-xl border border-gray-800">Geri</button>
      <div className="w-full max-w-md bg-[#121212] border border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-extrabold text-[#00c875]">GreenTender</h1>
          <p className="text-xs text-gray-400">{isRegister ? 'Firma Kaydı' : 'Giriş Yap'}</p>
        </div>
        {authError && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs text-center">{authError}</div>}
        <div className="grid grid-cols-2 p-1 bg-black rounded-xl border border-gray-800 text-xs font-semibold">
          <button type="button" onClick={() => { setIsRegister(false); setAuthError(''); }} className={!isRegister ? 'py-2 rounded-lg bg-gray-800 text-white' : 'py-2 rounded-lg text-gray-400'}>Giriş Yap</button>
          <button type="button" onClick={() => { setIsRegister(true); setAuthError(''); }} className={isRegister ? 'py-2 rounded-lg bg-[#00c875] text-black font-bold' : 'py-2 rounded-lg text-gray-400'}>Kayıt Ol</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <>
              <div>
                <label className="block text-gray-400 mb-1">Firma Ünvanı *</label>
                <input type="text" required placeholder="Örn: Aselsan A.Ş." value={companyName} onChange={e => setCompanyName(e.target.value)} className={iCls} />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">VKN *</label>
                <input type="text" required placeholder="10 Haneli VKN" value={taxNumber} onChange={e => handleTaxNumberChange(e.target.value)} className={iCls} />
                {vknError && taxNumber.length > 0 && <p className="text-[10px] text-red-400 mt-1">{vknError}</p>}
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Ana Sektör *</label>
                <select value={mainSector} onChange={e => handleMainSectorChange(e.target.value as any)} className={iCls}>
                  <option value="Yapim">1 - Yapım / İnşaat İşleri</option>
                  <option value="Mal">2 - Mal Alımı İhaleleri</option>
                  <option value="Hizmet">3 - Hizmet Alımı İhaleleri</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Yardımcı Sektör / Alt Branş *</label>
                <select value={subSector} onChange={e => setSubSector(e.target.value)} className={iCls}>
                  {SUB_SECTORS[mainSector]?.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-400 mb-1">E-Posta *</label>
            <input type="email" required placeholder="firma@sirket.com" value={email} onChange={e => setEmail(e.target.value)} className={iCls} />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Şifre *</label>
            <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={iCls} />
          </div>
          <button type="submit" disabled={!isFormValid} className={isFormValid ? 'w-full py-3 rounded-xl text-xs font-extrabold bg-[#00c875] text-black' : 'w-full py-3 rounded-xl text-xs font-extrabold bg-gray-800 text-gray-500 cursor-not-allowed'}>
            {isRegister ? 'Kayıt Ol 🚀' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}