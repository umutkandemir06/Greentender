'use client'

import React, { useState } from 'react'

interface AuthScreenProps {
  mode: 'login' | 'register'
  onSuccess: (name?: string) => void
  onBack: () => void
}

export default function AuthScreen({ mode: initialMode, onSuccess, onBack }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const storedUsers = JSON.parse(localStorage.getItem('greentender_users') || '[]')

    if (mode === 'register') {
      if (!username || !password || !name) {
        setErrorMsg('Lütfen tüm alanları doldurun.')
        return
      }

      // Kullanıcı adı daha önce alınmış mı kontrol et
      const existingUser = storedUsers.find((u: any) => u.username === username)
      if (existingUser) {
        setErrorMsg('Bu kullanıcı adı zaten alınmış. Lütfen başka bir tane seçin.')
        return
      }

      // Yeni kullanıcıyı kaydet
      const newUser = { name, username, password }
      storedUsers.push(newUser)
      localStorage.setItem('greentender_users', JSON.stringify(storedUsers))
      localStorage.setItem('greentender_current_user', name)

      alert('Kayıt başarıyla oluşturuldu! Giriş yapılıyor...')
      onSuccess(name)
    } else {
      // Giriş yapma kontrolü
      if (!username || !password) {
        setErrorMsg('Lütfen kullanıcı adı ve şifrenizi girin.')
        return
      }

      // Kayıtlı kullanıcılar arasında ara
      const foundUser = storedUsers.find(
        (u: any) => u.username === username && u.password === password
      )

      if (foundUser) {
        localStorage.setItem('greentender_current_user', foundUser.name)
        onSuccess(foundUser.name)
      } else {
        // Eğer daha önce kayıt olmamışsa ama test için varsayılan bir kullanıcı kabul edilsin istenmiyorsa hata verelim
        setErrorMsg('Kullanıcı adı veya şifre hatalı ya da böyle bir kayıt bulunamadı. Lütfen önce Kayıt Olun.')
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl shadow-emerald-950/20 relative">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400 tracking-wider uppercase text-left">
            {mode === 'login' ? 'GİRİŞ YAP' : 'KAYIT OL'}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-emerald-400 mb-2">
                Ad Soyad:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınızı girin"
                className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-2">
              Kullanıcı Adı:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-2">
              Şifre:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-zinc-600 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#00e676] hover:bg-[#00c853] text-zinc-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center tracking-wide text-sm"
            >
              {mode === 'login' ? 'ONAYLA' : 'HESAP OLUŞTUR'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
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