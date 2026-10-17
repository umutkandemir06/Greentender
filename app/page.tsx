'use client'

import { useState, useCallback } from 'react'
import { SiteHeader } from '@/components/site-header'
import { LandingHero } from '@/components/landing-hero'
import { LandingFeatures } from '@/components/landing-features'
import { LandingCTA, SiteFooter } from '@/components/landing-footer'
import { DashboardShell, type DashboardSection } from '@/components/dashboard-shell'
import { UploadScreen } from '@/components/upload-screen'
import { AnalysisLoading } from '@/components/analysis-loading'
import { ReportDashboard } from '@/components/report-dashboard'
import { OverviewPanel } from '@/components/overview-panel'
import { HistoryPanel, type HistoryItem } from '@/components/history-panel'
import { SettingsPanel } from '@/components/settings-panel'
import { LiveTendersPanel, type LiveTenderItem } from '@/components/live-tenders-panel'
import { HelpModal } from '@/components/help-modal'
import { AuthScreen } from '@/components/auth-screen'
import { PricingModal } from '@/components/pricing-modal'
import type { AnalysisReport } from '@/lib/analysis-data'

type View = 'landing' | 'login' | 'dashboard' | 'analyzing'

export interface CompanyProfile {
  companyName: string
  taxNumber?: string
  mainSector?: string
  sector: string
  experienceAmount?: string
  email: string
  password?: string
}

export default function Page() {
  const [view, setView] = useState<View>('landing')
  const [section, setSection] = useState<DashboardSection>('overview')
  const [showReport, setShowReport] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [fileName, setFileName] = useState('ihale-dokumani.pdf')
  const [result, setResult] = useState<AnalysisReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Kayıtlı Firmalar Hafızası (Admin ve Normal İkinci Şirket Hesabı Eklendi)
  const [registeredCompanies, setRegisteredCompanies] = useState<CompanyProfile[]>([
    {
      companyName: 'GreenTender Yönetim A.Ş.',
      taxNumber: '0910008080',
      mainSector: 'Hizmet',
      sector: 'Yazilim_Danismanlik',
      email: 'admin@sirket.com',
      password: 'admin'
    },
    {
      companyName: 'Örnek İnşaat Mühendislik Ltd. Şti.',
      taxNumber: '7350015437',
      mainSector: 'Yapim',
      sector: 'Insaat_Bina',
      email: 'admin2@sirket.com',
      password: 'admin2'
    }
  ])

  // Aktif Giriş Yapmış Firma Profil Verisi
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)

  // Her Kullanıcının E-Postasına Göre Geçmiş Analizlerini Saklayan Veritabanı Simülasyonu
  const [userHistories, setUserHistories] = useState<Record<string, HistoryItem[]>>({
    'admin@sirket.com': [],
    'admin2@sirket.com': []
  })

  // Anlık giriş yapan kullanıcının geçmiş listesi
  const currentEmail = companyProfile?.email.toLowerCase() || ''
  const historyList = userHistories[currentEmail] || []

  const setHistoryList = useCallback((updater: HistoryItem[] | ((prev: HistoryItem[]) => HistoryItem[])) => {
    if (!currentEmail) return
    setUserHistories(prev => {
      const currentList = prev[currentEmail] || []
      const newList = typeof updater === 'function' ? updater(currentList) : updater
      return {
        ...prev,
        [currentEmail]: newList
      }
    })
  }, [currentEmail])

  // Giriş veya Kayıt Başarılı Olduğunda
  const handleAuthSuccess = useCallback((formData: CompanyProfile) => {
    setRegisteredCompanies(prev => {
      const exists = prev.some(c => c.email.toLowerCase() === formData.email.toLowerCase())
      return exists ? prev : [...prev, formData]
    })

    const emailKey = formData.email.toLowerCase()
    setUserHistories(prev => ({
      ...prev,
      [emailKey]: prev[emailKey] || []
    }))

    setCompanyProfile(formData)
    setResult(null)
    setShowReport(false)
    setView('dashboard')
    setSection('overview')
    window.scrollTo(0, 0)
  }, [])

  const enterDashboard = useCallback((target: DashboardSection = 'overview') => {
    setView('dashboard')
    setSection(target)
    setShowReport(false)
    window.scrollTo(0, 0)
  }, [])

  const goLogin = useCallback(() => {
    setView('login')
    window.scrollTo(0, 0)
  }, [])

  const goLanding = useCallback(() => {
    setView('landing')
    window.scrollTo(0, 0)
  }, [])

  const navigate = useCallback((target: DashboardSection) => {
    setSection(target)
    setShowReport(false)
    window.scrollTo(0, 0)
  }, [])

  const startNewAnalysis = useCallback(() => {
    setSection('new')
    setShowReport(false)
    setResult(null)
    window.scrollTo(0, 0)
  }, [])

  const startAnalysis = useCallback(async (file: File) => {
    setFileName(file.name)
    setResult(null)
    setError(null)
    setView('analyzing')
    window.scrollTo(0, 0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (companyProfile) {
        formData.append('companyProfile', JSON.stringify(companyProfile))
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60_000),
      })

      let data: any
      try {
        data = await response.json()
      } catch {
        throw new Error('Sunucu geçerli bir JSON yanıtı döndürmedi.')
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || `Sunucu hatası: ${response.status}`)
      }

      setResult(data as AnalysisReport)

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: data.title || file.name,
        institution: data.institution || 'Kamu Kurumu',
        fileName: file.name,
        date: 'Bugün',
        winRate: data.winRate ?? 75,
        risksCount: data.risks?.length || 0,
        reportData: data
      }

      setHistoryList(prev => [newHistoryItem, ...prev])

      setView('dashboard')
      setSection('new')
      setShowReport(true)
    } catch (err: any) {
      console.error('[GreenTender] Analiz hatası:', err)
      setError(err instanceof Error ? err.message : 'İhale analiz edilirken bir hata oluştu.')
    }
  }, [companyProfile, setHistoryList])

  const handleAnalyzeLiveTender = useCallback((tender: LiveTenderItem) => {
    const virtualFile = new File(
      [tender.sampleText],
      `${tender.ikn}_${tender.title.substring(0, 20)}.pdf`,
      { type: 'text/plain' }
    )
    startAnalysis(virtualFile)
  }, [startAnalysis])

  const handleSelectHistoryItem = useCallback((item: HistoryItem) => {
    if (item.reportData) {
      setResult(item.reportData)
    } else {
      setResult({
        title: item.title,
        institution: item.institution,
        budget: 'Tahmini Bütçe: Belirtilmedi',
        penalties: 'Gecikilen her gün için ceza kesilir.',
        risks: ['Mevcut riskler analiz edildi.'],
        documents: ['Geçici Teminat', 'Sicil Gazetesi'],
        winRate: item.winRate,
        fixes: ['Şartname için zeyilname başvurusu yapılmalı.']
      })
    }
    setFileName(item.fileName)
    setSection('new')
    setShowReport(true)
    window.scrollTo(0, 0)
  }, [])

  const finishAnalysis = useCallback(() => {
    setView('dashboard')
    setSection('new')
    setShowReport(true)
    window.scrollTo(0, 0)
  }, [])

  if (view === 'login') {
    return (
      <AuthScreen 
        onLoginSuccess={handleAuthSuccess} 
        onBack={goLanding} 
        registeredCompanies={registeredCompanies}
      />
    )
  }

  if (view === 'analyzing') {
    return (
      <AnalysisLoading
        fileName={fileName}
        ready={result !== null}
        error={error}
        onComplete={finishAnalysis}
        onRetry={() => enterDashboard('new')}
      />
    )
  }

  if (view === 'dashboard') {
    return (
      <>
        <DashboardShell
          section={section}
          onNavigate={navigate}
          onHelp={() => setHelpOpen(true)}
          onExit={goLanding}
        >
          {section === 'overview' && (
            <OverviewPanel
              userName={companyProfile?.companyName || 'Firma Yöneticisi'}
              onNewAnalysis={startNewAnalysis}
              onSelectHistoryItem={handleSelectHistoryItem}
              recentAnalyses={historyList.slice(0, 3)}
              allAnalyses={historyList}
            />
          )}
          {section === 'history' && (
            <HistoryPanel
              historyList={historyList}
              onSelectReport={handleSelectHistoryItem}
            />
          )}
          {section === 'live-tenders' && (
            <LiveTendersPanel 
              onAnalyzeTender={handleAnalyzeLiveTender} 
              companyMainSector={companyProfile?.mainSector} 
              companyEmail={companyProfile?.email}
            />
          )}
          {section === 'settings' && <SettingsPanel />}
          {section === 'new' &&
            (showReport && result ? (
              <ReportDashboard
                data={result}
                fileName={fileName}
                companyName={companyProfile?.companyName}
                onReset={startNewAnalysis}
              />
            ) : (
              <UploadScreen onAnalyze={startAnalysis} />
            ))}
        </DashboardShell>
        <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader onStart={goLogin} onOpenPricing={() => setPricingOpen(true)} />
      <main className="flex-1">
        <LandingHero onStart={goLogin} />
        <LandingFeatures />
        <LandingCTA onStart={goLogin} />
      </main>
      <SiteFooter />
      <PricingModal 
        open={pricingOpen} 
        onClose={() => setPricingOpen(false)} 
        onSelectPlan={goLogin} 
      />
    </div>
  )
}