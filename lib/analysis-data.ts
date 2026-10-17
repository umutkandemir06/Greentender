export interface AnalysisReport {
  title: string;
  institution: string;
  budget: string;
  risks: string[];
  documents: string[];
  penalties: string;
  summary?: string;
}export interface AnalysisHistoryItem {
  id: string
  title: string
  institution: string
  fileName: string
  date: string
  winRate: number
  risksCount: number
  reportData: any
}