export default function AnalysisLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-white mb-2">İhale Dokümanı Yapay Zeka ile İnceleniyor...</h2>
      <p className="text-zinc-400 text-sm">Şartname maddeleri, riskler ve bütçe analiz raporu hazırlanıyor, lütfen bekleyin.</p>
    </div>
  )
}