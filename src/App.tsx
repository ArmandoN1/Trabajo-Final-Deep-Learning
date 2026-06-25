import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroContent from './components/HeroContent'
import HeroVisual from './components/HeroVisual'
import StatsBar from './components/StatsBar'
import ProjectInfoSection from './components/ProjectInfoSection'
import ProblemSection from './components/ProblemSection'
import HospitalStatsSection from './components/HospitalStatsSection'
import DatasetAnalysisSection from './components/DatasetAnalysisSection'
import PreprocessingSection from './components/PreprocessingSection'
import SolutionSection from './components/SolutionSection'
import CNNArchitectureSection from './components/CNNArchitectureSection'
import ArchitectureSection from './components/ArchitectureSection'
import ModelCodeSection from './components/ModelCodeSection'
import TrainingSection from './components/TrainingSection'
import MetricsSection from './components/MetricsSection'
import DashboardSection from './components/DashboardSection'
import DemoSection from './components/DemoSection'
import ResultsVisualizationSection from './components/ResultsVisualizationSection'
import HospitalIntegrationSection from './components/HospitalIntegrationSection'
import BenefitsSection from './components/BenefitsSection'
import LimitationsSection from './components/LimitationsSection'
import ViabilitySection from './components/ViabilitySection'
import QuestionsSection from './components/QuestionsSection'
import ConclusionsSection from './components/ConclusionsSection'
import ReferencesSection from './components/ReferencesSection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import TechBar from './components/TechBar'
import { ChevronUp } from 'lucide-react'


const BG_VIDEO = 'https://cdn.pixabay.com/video/2024/04/11/207835_large.mp4'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* ============================================================
          SECCIÓN 1: HERO
          ============================================================ */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline src={BG_VIDEO}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950/90 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />
        <div className="absolute -top-48 -right-36 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] animate-orb-float z-[2]" />
        <div className="absolute -bottom-36 -left-24 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[100px] animate-orb-float z-[2]" style={{ animationDelay: '-8s' }} />

        <Navbar scrolled={scrolled} />

        <div className="absolute inset-0 z-20 px-6 sm:px-12 pt-24 pb-12 flex items-center">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <HeroContent />
              <HeroVisual />
              </div>
              <div className="mt-12">
                <StatsBar />
                </div>
              </div>
            </div>
      </section>

      {/* SECCIÓN 2: Tech Bar */}
      <TechBar />

      {/* SECCIONES 3-24 */}
      <ProjectInfoSection />
      <ProblemSection />
      <HospitalStatsSection />
      <DatasetAnalysisSection />
      <PreprocessingSection />
      <SolutionSection />
      <CNNArchitectureSection />
      <ArchitectureSection />
      <ModelCodeSection />
      <TrainingSection />
      <MetricsSection />
      <DashboardSection />
      <DemoSection />
      <ResultsVisualizationSection />
      <HospitalIntegrationSection />
      <BenefitsSection />
      <LimitationsSection />
      <ViabilitySection />
      <QuestionsSection />
      <ConclusionsSection />
      <ReferencesSection />
      <TeamSection />

      {/* SECCIÓN 25: Footer */}
      <Footer />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  )
}