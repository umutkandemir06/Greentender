'use client'

import { useState } from 'react'

interface UploadScreenProps {
  companyProfile: any
  onStartAnalysis: (file: File) => void
}

export default function UploadScreen({ companyProfile, onStartAnalysis }: UploadScreenProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-3xl mx-auto w-full text-white">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">EKAP İhale Dosyası Yükle</h2>
        <p className="text-sm text-zinc-400">İhale dokümanını (PDF) yükleyin, yapay zeka hemen risk ve bütçe analizi çıkarsın.</p>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 bg-zinc-900/50 rounded-3xl p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 text-2xl">
          📄
        </div>
        <p className="text-sm font-medium mb-1">{file ? file.name : 'PDF dosyasını buraya sürükleyin ya da seçin'}</p>
        <p className="text-xs text-zinc-500 mb-6">Maksimum dosya boyutu: 50MB</p>
        
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium px-6 py-2.5 rounded-xl cursor-pointer transition-colors"
        >
          Dosya Seç
        </label>
      </div>

      {file && (
        <button
          onClick={() => onStartAnalysis(file)}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 rounded-2xl text-sm shadow-xl shadow-emerald-900/20 transition-all"
        >
          Yapay Zeka Analizini Başlat →
        </button>
      )}
    </div>
  )
}