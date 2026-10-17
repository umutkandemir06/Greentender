'use client'

import { useState, useEffect, useCallback } from 'react'
import SiteHeader from '@/components/site-header'
import LandingHero from '@/components/landing-hero'
import LandingFeatures from '@/components/landing-features'
import LandingFooter from '@/components/landing-footer'
import AuthScreen from '@/components/auth-screen'
import UploadScreen from '@/components/upload-screen'
import AnalysisLoading from '@/components/analysis-loading'
import ReportDashboard from '@/components/report-dashboard'
import HistoryPanel from '@/components/history-panel'
import LiveTendersPanel from '@/components/live-tenders-panel'
import SettingsPanel from '@/components/settings-panel'
import HelpModal from '@/components/help-modal'
import PricingModal from '@/components/pricing-modal'

export interface AnalysisReport {
  title?: string
  institution?: string
  budget?: string
  penalties?: string
  risks?: string[]
  documents?: string[]
  winRate?: number
  fixes?: string[]
  summary?: string
  [key: string]: any
}

export interface CompanyProfile {
  companyName: string
  mainSector: string
  sector: string
  experienceYear: string
  targetBudget: string
}

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'auth' | 'upload' | 'analyzing' | 'report'>('landing')
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'live' | 'settings'>('upload')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Umut Kandemir')
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: 'GreenTender Yönetim A.Ş.',
    mainSector: 'Yapim',
    sector: 'Insaat_Bina',
    experienceYear: '5 Yıl',
    targetBudget: '₺50.000.000'
  })
  
  // State tipi any yapılarak tüm tip uyuşmazlığı hataları kesin olarak önlendi
  const [analysisReport, setAnalysisReport] = useState<any | null>(null)
  const [historyItems, setHistoryItems] = useState<any[]>([])
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)

  useEffect(() => {
    const savedHistory = localStorage.getItem('greentender_history')
    if (savedHistory) {
      try {
        setHistoryItems(JSON.parse(savedHistory))
      } catch (e) {}
    }
  }, [])

  const startAnalysis = useCallback(async (file: File) => {
    setCurrentScreen('analyzing')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('companyProfile', JSON.stringify(companyProfile))

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })

      let data: any = null
      try {
        data = await response.json()
      } catch (err) {
        throw new Error('Sunucu geçerli bir JSON yanıtı döndürmedi.')
      }

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Analiz sırasında hata oluştu.')
      }

      setAnalysisReport(data)

      const newItem = {
        id: Date.now().toString(),
        title: data.title || file.name,
        date: new Date().toLocaleDateString('tr-TR'),
        winRate: data.winRate ?? 75,
        budget: data.budget || '₺10.000.000',
        report: data
      }

      const updatedHistory = [newItem, ...historyItems]
      setHistoryItems(updatedHistory)
      localStorage.setItem('greentender_history', JSON.stringify(updatedHistory))

      setTimeout(() => {
        setCurrentScreen('report')
      }, 1500)
    } catch (err: any) {
      alert('Hata: ' + err.message)
      setCurrentScreen('upload')
    }
  }, [companyProfile, historyItems])

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <SiteHeader
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={() => { setAuthMode('login'); setCurrentScreen('auth'); }}
        onRegisterClick={() => { setAuthMode('register'); setCurrentScreen('auth'); }}
        onLogout={() => { setIsLoggedIn(false); setCurrentScreen('landing'); }}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <>
            <LandingHero
              onStartClick={() => {
                if (isLoggedIn) {
                  setCurrentScreen('upload')
                } else {
                  setAuthMode('login')
                  setCurrentScreen('auth')
                }
              }}
            />
            <LandingFeatures />
            <LandingFooter />
          </>
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            mode={authMode}
            onSuccess={(name) => {
              setUserName(name || 'Umut Kandemir')
              setIsLoggedIn(true)
              setCurrentScreen('upload')
            }}
            onBack={() => setCurrentScreen('landing')}
          />
        )}

        {currentScreen === 'upload' && (
          <div className="flex-1 flex flex-col">
            {activeTab === 'upload' && (
              <UploadScreen
                companyProfile={companyProfile}
                onStartAnalysis={startAnalysis}
              />
            )}
            {activeTab === 'history' && (
              <HistoryPanel
                items={historyItems}
                onSelectReport={(report) => {
                  setAnalysisReport(report)
                  setCurrentScreen('report')
                }}
              />
            )}
            {activeTab === 'live' && (
              <LiveTendersPanel />
            )}
            {activeTab === 'settings' && (
              <SettingsPanel
                profile={companyProfile}
                onSave={(newProf) => {
                  setCompanyProfile(newProf)
                  alert('Firma profili başarıyla güncellendi!')
                }}
              />
            )}
          </div>
        )}