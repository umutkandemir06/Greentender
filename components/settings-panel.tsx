'use client'

import { useState } from 'react'
import { CompanyProfile } from '@/app/page'

interface SettingsPanelProps {
  profile: CompanyProfile
  onSave: (newProf: CompanyProfile) => void
}

export default function SettingsPanel({ profile, onSave }: SettingsPanelProps) {
  const [formData, setFormData] = useState<CompanyProfile>(profile)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-zinc-900 border border-zinc-800 rounded-2xl mt-8 text-white">
      <h2 className="text-xl font-bold mb-4">Firma Profili ve Ayarlar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Firma Adı</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-emerald-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Deneyim Yılı</label>
          <input
            type="text"
            value={formData.experienceYear}
            onChange={(e) => setFormData({ ...formData, experienceYear: e.target.value })}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-emerald-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Ayarları Kaydet
        </button>
      </form>
    </div>
  )
}