'use client'

import { useState } from 'react'
import type { AnalysisReport } from '@/lib/analysis-data'

interface ReportDashboardProps {
  data: AnalysisReport & { winRate?: number; fixes?: string[] }
  fileName: string
  companyName?: string
  onReset: () => void
}

export function ReportDashboard({ data, fileName, companyName, onReset }: ReportDashboardProps) {
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({})
  const [showModal, setShowModal] = useState(false)

  const toggleDoc = (i: number) => setCheckedDocs(p => ({ ...p, [i]: !p[i] }))
  const winRate = data.winRate ?? 82
  const fixes = data.fixes || [
    'Teknik şartname Madde 4.2’deki marka kısıtlamasına itiraz edilmeli.',
    'Teslimat süresinin 30 günden 60 güne çıkarılması için zeyilname talep edilmeli.'
  ]

  const handleOpenPdf = () => {
    const inst = (data.institution || 'İLGİLİ İDARE MÜDÜRLÜĞÜ').toUpperCase()
    const comp = companyName || 'FİRMA ÜNVANI'
    const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

    const win = window.open('', '_blank')
    if (!win) {
      alert('Açılır pencere engellendi. Lütfen pop-up izinlerini kontrol edin.')
      return
    }

    win.document.write(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Zeyilname Dilekçesi - ${fileName}</title>
  <style>
    @page { size: A4; margin: 25mm 20mm; }
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; color: #000; padding: 30px; }
    .date { text-align: right; font-weight: bold; margin-bottom: 25px; }
    .title { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 35px; }
    .subject { margin-bottom: 20px; }
    .p-text { text-indent: 25px; text-align: justify; margin-bottom: 12px; }
    .fix-item { margin-left: 25px; margin-bottom: 10px; }
    .sign { margin-top: 50px; float: right; text-align: center; width: 220px; }
  </style>
</head>
<body>
  <div class="date">Tarih: ${today}</div>
  <div class="title">T.C.<br/>${inst}</div>
  <div class="subject">
    <div><strong>KONU:</strong> ${data.title} Şartname İtirazı ve Zeyilname Talebi</div>
    <div><strong>İHALE / DOSYA:</strong> ${fileName}</div>
  </div>
  <div class="p-text">İdareniz tarafından açılan ihale dokümanları firmamızca detaylıca incelenmiştir.</div>
  <div class="p-text">4734 Sayılı Kamu İhale Kanunu uyarınca aşağıdaki maddelerde zeyilname düzenlenmesi talep edilmektedir:</div>
  ${fixes.map((f, i) => `<div class="fix-item"><strong>${i + 1}.</strong>${f}</div>`).join('')}
  <div class="p-text" style="margin-top:20px;">Gereğini saygılarımızla arz ve talep ederiz.</div>
  <div class="sign">
    <div style="font-weight:bold; margin-bottom:30px;">${comp}</div>
    <div>Kaşe / Yetkili İmza</div>
  </div>
  <script>window.onload = function() { setTimeout(function() { window.print(); }, 400); }</script>
</body>
</html>`)
    win.document.close()
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-6 text-white">
      {/* Üst Kart */}
      <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold">ANALİZ RAPORU</span>
            {companyName && <span className="px-3 py-1 bg-blue-950 text-blue-400 border border-blue-800 rounded-full text-xs font-semibold">🏢 {companyName} Profili</span>}
          </div>
          <h1 className="text-2xl font-extrabold">{data.title}</h1>
          <p className="text-xs text-gray-400 mt-1">Kurum: {data.institution} | Dosya: {fileName}</p>
        </div>
        <button onClick={onReset} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-xs rounded-xl border border-gray-700">Yeni Analiz Yap</button>
      </div>

      {/* Grid Yapısı */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl space-y-3">
              <h3 className="font-bold text-lg border-b border-gray-800 pb-2">Kritik Riskler ⚠️</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                {data.risks?.map((r, i) => (
                  <li key={i} className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>{r}</span></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl space-y-2">
                <h3 className="font-bold text-sm border-b border-gray-800 pb-2">Bütçe ve Teminat 🏷️</h3>
                <div className="text-xs font-mono text-gray-300 whitespace-pre-line">{data.budget}</div>
              </div>
              <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl space-y-2">
                <h3 className="font-bold text-sm border-b border-gray-800 pb-2">Cezalar ⚖️</h3>
                <div className="text-xs text-gray-300 whitespace-pre-line">{data.penalties}</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-[#121212] border border-gray-800 p-6 rounded-2xl space-y-3">
              <h3 className="font-bold text-lg border-b border-gray-800 pb-2">İstenen Belgeler 📄</h3>
              <div className="space-y-2">
                {data.documents?.map((doc, i) => (
                  <div key={i} onClick={() => toggleDoc(i)} className={`p-3 rounded-xl border text-xs cursor-pointer ${checkedDocs[i] ? 'bg-emerald-950 text-emerald-400 line-through border-emerald-800' : 'bg-black/40 border-gray-800 text-gray-300'}`}>
                    ✓ {doc}
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 bg-[#121212] border border-gray-800 p-6 rounded-2xl flex flex-col justify-between text-center">
              <h3 className="font-bold text-sm border-b border-gray-800 pb-2">Kazanma Oranı</h3>
              <div className="text-5xl font-extrabold text-emerald-400 py-4">%{winRate}</div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-400 h-2" style={{ width: `${winRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Düzeltilmesi Gerekenler */}
        <div className="lg:col-span-4 bg-[#121212] border border-gray-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between min-h-[500px]">
          <div>
            <h2 className="text-xl font-bold border-b border-gray-800 pb-3 mb-4">İhalede Düzeltilmesi Gerekenler</h2>
            <div className="space-y-3">
              {fixes.map((fix, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/50 border border-gray-800 space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">ÖNERİ #{idx + 1}</span>
                  <p className="text-xs text-gray-300">{fix}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-extrabold text-xs shadow-lg shadow-emerald-500/20">
            📝 Zeyilname Dilekçe Taslağı Önizle
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#121212] border border-gray-800 rounded-3xl max-w-xl w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="font-bold text-base">Resmi Zeyilname Dilekçe Taslağı</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 text-lg font-bold">✕</button>
            </div>
            <div className="bg-black/60 border border-gray-800 rounded-xl p-4 text-xs font-mono text-gray-200 whitespace-pre-wrap max-h-[250px] overflow-y-auto">
{`T.C.
${(data.institution || 'İLGİLİ İDARE MÜDÜRLÜĞÜ').toUpperCase()}

KONU: ${data.title} Şartname İtirazı ve Zeyilname Talebi
İHALE / DOSYA: ${fileName}

${fixes.map((f, i) => `${i + 1}.${f}`).join('\n\n')}

Gereğini saygılarımızla arz ederiz.
Başvuru Sahibi: ${companyName || 'Firma Ünvanı'}`}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-800 pt-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-900 text-xs rounded-xl border border-gray-800">Kapat</button>
              <button onClick={handleOpenPdf} className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold rounded-xl flex items-center gap-2">
                🖨️ PDF Olarak Aç / İndir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}