'use client'

import React, { useState } from 'react'

interface AuthScreenProps {
  mode: 'login' | 'register'
  onSuccess: (name?: string) => void
  onBack: () => void
}

export default function AuthScreen({ mode, onSuccess, onBack }: AuthScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSuccess(username || 'Umut Kandemir')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0d0d0f] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl shadow-emerald-950/20 relative">
        
        <h2 className="text-2xl font-bold text-emerald-400 tracking-wider mb-8 uppercase text-left">
          GİRİŞ YAP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-2">
              Kullanıcı Adı:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-emerald-400 mb-2">
              ŞفRE: (Şifre)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121216] border border-emerald-500/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-colors"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#00e676] hover:bg-[#00c853] text-zinc-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-center tracking-wide"
            >
              ONAYLA
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