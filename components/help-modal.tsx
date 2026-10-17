'use client'
export function HelpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <h3 className="font-bold text-lg mb-2">Yardım & Destek</h3>
        <p className="text-sm text-gray-600 mb-4">EKAP PDF dosyasını yükleyin veya metni yapıştırın. AI otomatik olarak şartnameyi parçalayacaktır.</p>
        <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg">Kapat</button>
      </div>
    </div>
  )
}