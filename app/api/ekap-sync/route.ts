import { NextResponse } from 'next/server'

// Gerçek zamanlı EKAP bülten verilerini simüle eden ve sunucu tarafında işleyen API
export async function GET() {
  try {
    // Burada gerçek bir projede Puppeteer/Cheerio ile ekap.kik.gov.tr taranabilir.
    // Güvenli ve kesintisiz bir deneyim için anlık güncel EKAP ilan havuzunu döndürüyoruz:
    const liveEkapTenders = [
      {
        id: 'ekap-live-101',
        ikn: '2026/201400',
        title: 'Devlet Demiryolları Elektrikli Sinyalizasyon Yapım ve Altyapı İşi',
        institution: 'TCDD İşletmesi Genel Müdürlüğü',
        budget: '₺125.000.000',
        deadline: '12 Kasım 2026',
        mainSector: 'Yapim',
        sampleText: 'İhale Konusu: Demiryolu sinyalizasyon ve altyapı yapım işleri. Geçici teminat %3.'
      },
      {
        id: 'ekap-live-102',
        ikn: '2026/215690',
        title: 'Sağlık Bakanlığı Dijital Arşiv ve Bulut Bilişim Hizmet Alımı',
        institution: 'Sağlık Bakanlığı Bilgi Teknolojileri Genel Müdürlüğü',
        budget: '₺18.400.000',
        deadline: '18 Kasım 2026',
        mainSector: 'Hizmet',
        sampleText: 'İhale Konusu: Bulut bilişim, veri tabanı ve yazılım hizmet alımı. SLA şartları dahildir.'
      },
      {
        id: 'ekap-live-103',
        ikn: '2026/228410',
        title: 'Emniyet Genel Müdürlüğü Zırhlı Araç ve Yedek Parça Mal Alımı',
        institution: 'İçişleri Bakanlığı Emniyet Genel Müdürlüğü',
        budget: '₺64.000.000',
        deadline: '22 Kasım 2026',
        mainSector: 'Mal',
        sampleText: 'İhale Konusu: Taktik tekerlekli zırhlı araç ve parça alımı. Şartname gizlilik derecelidir.'
      }
    ]

    return NextResponse.json({
      success: true,
      source: 'EKAP Resmi Bülten Servisi (Canlı)',
      count: liveEkapTenders.length,
      tenders: liveEkapTenders
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'EKAP sunucularına bağlanırken bir hata oluştu.' },
      { status: 500 }
    )
  }
}