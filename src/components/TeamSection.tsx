import { useState, useEffect } from 'react'
import { GraduationCap, Award, Plus, Brain, Database, Code, BarChart3, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  area: string
  description: string
  icon: typeof Brain
  color: string
  contributions: string[]
  image: string
  specs: {
    label: string
    value: string
  }[]
  badges: string[]
}

const teamMembers: TeamMember[] = [
  {
    name: 'Elias Gonzales Jenhua',
    role: 'Líder de Proyecto',
    area: 'Arquitectura CNN',
    description: 'Diseño e implementación de la arquitectura ResNet50 con Transfer Learning para clasificación binaria de imágenes radiológicas.',
    icon: Brain,
    color: 'blue',
    contributions: [
      'Diseño de arquitectura ResNet50 + Transfer Learning',
      'Implementación de capas Dense y Dropout',
      'Optimización del modelo (Adam, lr=1e-4)',
      'Coordinación general del equipo',
    ],
    image: 'https://i.postimg.cc/7Z0QX8jn/e27c0c5a-ec36-44d8-9faf-1dd31f20764c.png',
    specs: [
      { label: 'Especialidad', value: 'Deep Learning Architect' },
      { label: 'Tecnología', value: 'TensorFlow / Keras' },
      { label: 'Modelo', value: 'ResNet50 + TL' },
      { label: 'Experiencia', value: 'CNN & Vision' },
    ],
    badges: ['Accuracy 96.7%', 'Líder Técnico', 'IA Médica'],
  },
  {
    name: 'Lucero Rodríguez Salinas',
    role: 'Especialista en Datos',
    area: 'Preprocesamiento',
    description: 'Procesamiento del Chest X-Ray Dataset de Kaggle (5,856 imágenes). Data Augmentation y manejo de desbalance de clases.',
    icon: Database,
    color: 'emerald',
    contributions: [
      'Análisis exploratorio del dataset',
      'Implementación de Data Augmentation',
      'Cálculo de class weights para desbalance',
      'Preparación de generadores de datos',
    ],
    image: 'https://i.postimg.cc/4d6WbzMf/a1d78c1b-6d63-4b1e-8b12-98471810f61e.png',
    specs: [
      { label: 'Especialidad', value: 'Data Engineering' },
      { label: 'Dataset', value: '5,856 imágenes' },
      { label: 'Técnica', value: 'Data Augmentation' },
      { label: 'Herramientas', value: 'NumPy / Pandas' },
    ],
    badges: ['Dataset Expert', 'Augmentation', 'Class Balance'],
  },
  {
    name: 'Joshua Rivera',
    role: 'Backend Developer',
    area: 'API & Despliegue',
    description: 'Desarrollo de la API REST con FastAPI para servir el modelo entrenado e integración con el sistema PACS hospitalario.',
    icon: Code,
    color: 'purple',
    contributions: [
      'Desarrollo de API REST con FastAPI',
      'Endpoint /predict para inferencia',
      'Integración con sistema PACS',
      'Documentación técnica del backend',
    ],
    image: 'https://i.postimg.cc/fRMDxKrj/3064be95-9a93-422c-aaaa-caf01e09bdc4.png',
    specs: [
      { label: 'Especialidad', value: 'Backend Developer' },
      { label: 'Framework', value: 'FastAPI / Python' },
      { label: 'Integración', value: 'PACS / DICOM' },
      { label: 'Tiempo respuesta', value: '< 2 segundos' },
    ],
    badges: ['FastAPI', 'REST API', 'PACS'],
  },
  {
    name: 'Alison Silva Rojas ',
    role: 'Analista de Métricas',
    area: 'Evaluación del Modelo',
    description: 'Evaluación rigurosa con métricas críticas en diagnóstico médico: Accuracy, Recall, F1-Score y AUC-ROC. Matriz de confusión.',
    icon: BarChart3,
    color: 'amber',
    contributions: [
      'Cálculo de métricas (Accuracy, Recall, F1)',
      'Generación de matriz de confusión',
      'Análisis de curvas ROC y AUC',
      'Validación del modelo en test set',
    ],
    image: 'https://i.postimg.cc/tCQxGKsp/94c65574-cb7a-4613-922f-872e48950e73.png',
    specs: [
      { label: 'Especialidad', value: 'Métricas & Validación' },
      { label: 'Accuracy', value: '96.7%' },
      { label: 'Recall', value: '98.1%' },
      { label: 'F1-Score', value: '96.6%' },
    ],
    badges: ['AUC: 0.987', 'Métricas', 'Validación'],
  },
  {
    name: 'Javier Eduardo Castillo',
    role: 'Investigador Clínico & UX',
    area: 'Integración Hospitalaria',
    description: 'Investigación del flujo radiológico, diseño UX/UI del dashboard médico y propuesta de integración con el Hospital San Martín.',
    icon: Stethoscope,
    color: 'cyan',
    contributions: [
      'Investigación clínica del flujo radiológico',
      'Diseño UX/UI del dashboard médico',
      'Propuesta de integración PACS/HIS',
      'Documentación de viabilidad',
    ],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    specs: [
      { label: 'Especialidad', value: 'Clinical Researcher' },
      { label: 'Enfoque', value: 'UX Médico' },
      { label: 'Integración', value: 'PACS / HIS' },
      { label: 'Hospital', value: 'San Martín' },
    ],
    badges: ['UX Médico', 'PACS/HIS', 'Workflow'],
  },
]

const colorMap: Record<string, { text: string; bg: string; gradient: string; shadow: string; accent: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/15', gradient: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/30', accent: '#60a5fa', border: 'border-blue-400' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/15', gradient: 'from-emerald-600 to-emerald-400', shadow: 'shadow-emerald-500/30', accent: '#34d399', border: 'border-emerald-400' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', gradient: 'from-purple-600 to-purple-400', shadow: 'shadow-purple-500/30', accent: '#c084fc', border: 'border-purple-400' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/15', gradient: 'from-amber-600 to-amber-400', shadow: 'shadow-amber-500/30', accent: '#fbbf24', border: 'border-amber-400' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/15', gradient: 'from-cyan-600 to-cyan-400', shadow: 'shadow-cyan-500/30', accent: '#22d3ee', border: 'border-cyan-400' },
}

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleSlideClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === -1 ? 0 : (prev + 1) % teamMembers.length))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === -1 ? teamMembers.length - 1 : (prev - 1 + teamMembers.length) % teamMembers.length))
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  return (
    <section id="equipo" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_60%)]" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <GraduationCap size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Equipo de Investigación</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Integrantes del <span className="gradient-text-animated">Proyecto</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Equipo multidisciplinario de 5 estudiantes que desarrolló el sistema de diagnóstico médico con Deep Learning.
          </p>
        </div>

        {/* ============================================================
            ACCORDION SLIDER CON FLECHAS LATERALES EXTERNAS
            ============================================================ */}
        <div className="relative">
          {/* Container con padding lateral para las flechas */}
          <div className="px-0 md:px-16">
            {/* Top indicator bar */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">Equipo Actual</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <span className="text-white text-xs font-bold">
                  {activeIndex === -1 ? '00' : String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/30 text-xs">/</span>
                <span className="text-white/40 text-xs">{String(teamMembers.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Slider acordeón */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.06]">
              <div className="flex h-[600px] relative">
                {teamMembers.map((member, index) => {
                  const isActive = activeIndex === index
                  const colors = colorMap[member.color]
                  const Icon = member.icon

                  return (
                    <div
                      key={member.name}
                      onClick={() => handleSlideClick(index)}
                      className={`relative cursor-pointer overflow-hidden ${
                        isActive ? 'flex-[2.5]' : 'flex-1'
                      }`}
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                        transition: 'flex 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease',
                      }}
                    >
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={{
                          background: isActive
                            ? `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 70%)`
                            : `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.9) 80%)`,
                        }}
                      />

                      {/* Number badge - cuando NO está activo */}
                      {!isActive && (
                        <div className="absolute bottom-6 left-6 z-10">
                          <div className="text-white/70 text-5xl font-thin leading-none mb-3">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>
                      )}

                      {/* Texto vertical del rol - cuando NO está activo */}
                      {!isActive && (
                        <div
                          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 text-xs font-bold tracking-[0.2em] whitespace-nowrap"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'translateY(-50%) rotate(180deg)',
                          }}
                        >
                          {member.role.toUpperCase()}
                        </div>
                      )}

                      {/* Active content */}
                      {isActive && (
                        <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 animate-fade-up-team">
                          {/* Top section */}
                          <div className="absolute top-8 left-8">
                            <div className={`text-4xl font-thin ${colors.text} leading-none`}>
                              {String(index + 1).padStart(2, '0')}
                            </div>
                          </div>

                          {/* Avatar circle */}
                          <div className="absolute top-8 right-8">
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-black text-xl shadow-2xl ${colors.shadow}`}
                            >
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </div>
                          </div>

                          {/* Role label */}
                          <div className={`text-xs font-bold tracking-wider uppercase ${colors.text} mb-3 flex items-center gap-2`}>
                            <Icon size={12} />
                            {member.role}
                          </div>

                          {/* Name */}
                          <h3 className="text-white text-2xl lg:text-3xl font-black leading-tight mb-2">
                            {member.name}
                          </h3>

                          {/* Area */}
                          <p className="text-white/70 text-base font-medium mb-5">
                            {member.area}
                          </p>

                          {/* Specs grid */}
                          <div className="space-y-2 mb-5">
                            {member.specs.map((spec) => (
                              <div
                                key={spec.label}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-white/50">{spec.label}:</span>
                                <span className="text-white font-semibold">{spec.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            {member.badges.map((badge) => (
                              <div
                                key={badge}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: colors.accent }}
                                />
                                <span className="text-white text-[11px] font-semibold">{badge}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Plus/Close button */}
                      <div
                        className={`absolute bottom-6 right-6 z-20 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'rotate-45' : 'border-white/40 hover:border-white'
                        }`}
                        style={{ borderColor: isActive ? colors.accent : undefined }}
                      >
                        <Plus
                          size={14}
                          className="transition-all duration-300"
                          style={{ color: isActive ? colors.accent : 'white' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ============================================================
              FLECHAS DE NAVEGACIÓN - LATERALES EXTERNAS
              ============================================================ */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] backdrop-blur-md items-center justify-center text-white hover:scale-110 transition-all z-30 shadow-xl"
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] backdrop-blur-md items-center justify-center text-white hover:scale-110 transition-all z-30 shadow-xl"
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>

          {/* Mobile arrows - debajo */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Detail card abajo del slider */}
        {activeIndex !== -1 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up-team">
            <div className="liquid-glass-card rounded-2xl p-6">
              <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                <Award size={14} className={colorMap[teamMembers[activeIndex].color].text} />
                Descripción del Rol
              </h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {teamMembers[activeIndex].description}
              </p>
            </div>

            <div className="liquid-glass-card rounded-2xl p-6">
              <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                <Award size={14} className={colorMap[teamMembers[activeIndex].color].text} />
                Contribuciones Principales
              </h4>
              <ul className="space-y-2">
                {teamMembers[activeIndex].contributions.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/50 leading-relaxed">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: colorMap[teamMembers[activeIndex].color].accent }}
                    />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Helper text */}
        <p className="text-center text-white/30 text-xs mt-6">
          💡 Haz clic en cada integrante o usa las flechas ← → del teclado para explorar
        </p>
      </div>

      {/* Keyframes inline */}
      <style>{`
        @keyframes fadeUpTeam {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-team {
          animation: fadeUpTeam 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  )
}