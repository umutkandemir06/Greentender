'use client'

import { useState } from 'react'

interface UploadScreenProps {
  onAnalyze: (file: File) => void
}

export function UploadScreen({ onAnalyze }: UploadScreenProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFile = (file: File) => {
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const triggerAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile)
    } else {
      // Eğer dosya seçilmediyse demo bir dosya oluşturup analizi başlatıyoruz
      const demoFile = new File(["Demo ihale içeriği"], "ihale-sartnamesi.pdf", { type: "application/pdf" })
      onAnalyze(demoFile)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Yeni İhale Analizi</h1>
        <p className="text-sm text-gray-400">
          İhale ilanı, idari ve teknik şartname içeren PDF dokümanını yükleyin. Analiz yalnızca birkaç saniye sürer.
        </p>
      </div>

      {/* Sürükle Bırak Kutusu */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`w-full p-12 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 bg-[#121212] ${
          dragActive ? 'border-[#00c875] bg-[#00c875]/5' : 'border-gray-800 hover:border-gray-700'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#00c875]/10 border border-[#00c875]/20 flex items-center justify-center text-[#00c875] mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="text-base font-bold text-gray-200 mb-1">
            {selectedFile ? selectedFile.name : 'Dosyayı buraya sürükleyip bırakın'}
          </span>
          <span className="text-xs text-gray-400">
            veya <span className="text-[#00c875] font-semibold underline">bilgisayarınızdan seçin</span>
          </span>
          <span className="text-[11px] text-gray-500 mt-3">Yalnızca PDF • en fazla 50 MB</span>
        </label>
      </div>

      {/* Alt Bilgi & Analiz Et Butonu */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Dokümanlarınız şifrelenir ve analiz sonrası paylaşılmaz.
        </div>

        <button
          onClick={triggerAnalyze}
          className="px-8 py-3.5 bg-[#00c875] hover:bg-[#00b067] text-black font-bold rounded-xl flex items-center gap-2 transition shadow-lg shadow-[#00c875]/20 text-sm"
        >
          <span>✨</span> İhaleyi Analiz Et
        </button>
      </div>

      {/* Özellik Rozetleri */}
      <div className="grid md:grid-cols-3 gap-4 pt-4">
        <div className="bg-[#121212] border border-gray-800/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-gray-300">
          <span className="text-[#00c875]">✨</span>
          <span>Otomatik gereksinim eşleştirme</span>
        </div>
        <div className="bg-[#121212] border border-gray-800/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-gray-300">
          <span className="text-[#00c875]">🛡️</span>
          <span>Risk ve ceza maddesi tespiti</span>
        </div>
        <div className="bg-[#121212] border border-gray-800/80 rounded-xl p-3.5 flex items-center gap-3 text-xs text-gray-300">
          <span className="text-[#00c875]">📄</span>
          <span>Maliyet & takvim çıkarımı</span>
        </div>
      </div>
    </div>
  )
}