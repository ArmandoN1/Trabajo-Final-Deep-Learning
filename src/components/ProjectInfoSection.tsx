import { useState, useEffect } from 'react'
import { BookOpen, Target, ClipboardList, GraduationCap, Hospital, Calendar, Users, FileText, ArrowLeft, ArrowRight, CheckCircle2, Database, Brain, BarChart3, Monitor, FileCheck, Cloud, ShieldCheck, HeartPulse, Leaf } from 'lucide-react'

// ============================================================
// 6 EVIDENCIAS CON IMÁGENES DE FONDO ENFOCADAS EN RADIOLOGÍA E IA
// ============================================================
interface Evidence {
  num: string
  title: string
  description: string
  fullDescription: string
  icon: typeof Database
  color: string
  image: string
  tags: string[]
}

const evidences: Evidence[] = [
  {
    num: '01',
    title: 'Análisis del Dataset',
    description: 'Analizar el conjunto de datos y aplicar técnicas de preprocesamiento.',
    fullDescription: 'Exploración completa del Chest X-Ray Dataset de Kaggle con 5,856 imágenes radiológicas pediátricas. Filtrado de ruido visual, estandarización de contraste CLAHE y manejo del desbalance con pesos ponderados (class weights).',
    icon: Database,
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['5,856 imágenes', 'Preprocesamiento CLAHE', 'Normalización'],
  },
  {
    num: '02',
    title: 'Entrenamiento del Modelo',
    description: 'Entrenar y validar un modelo de deep learning para detección de anomalías.',
    fullDescription: 'Diseño e implementación de una red neuronal convolucional (CNN) profunda utilizando ResNet50 y Transfer Learning. Optimización mediante algoritmo Adam (lr=1e-4) y parada temprana para evitar el sobreajuste.',
    icon: Brain,
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['ResNet50', 'Transfer Learning', 'TensorFlow/Keras'],
  },
  {
    num: '03',
    title: 'Evaluación de Métricas',
    description: 'Evaluación exhaustiva mediante métricas de grado médico.',
    fullDescription: 'Análisis riguroso del rendimiento del modelo con un enfoque clínico: Sensibilidad (Recall) del 98.1% para evitar falsos negativos, F1-Score del 96.6% y área bajo la curva ROC (AUC-ROC) de 0.987.',
    icon: BarChart3,
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['Sensibilidad: 98.1%', 'F1-Score: 96.6%', 'AUC-ROC: 0.98'],
  },
  {
    num: '04',
    title: 'Interfaz de Visualización',
    description: 'Implementar una interfaz interactiva para el flujo clínico diario.',
    fullDescription: 'Estación de trabajo médica web responsive e intuitiva. Permite a los radiólogos cargar imágenes en formato nativo, procesarlas en tiempo real y visualizar áreas de calor sospechosas mediante mapas de activación (Grad-CAM).',
    icon: Monitor,
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['Grad-CAM Mapas', 'React UI', 'Carga Drag & Drop'],
  },
  {
    num: '05',
    title: 'Documentación y Viabilidad',
    description: 'Documentar el proceso y presentar conclusiones sobre la viabilidad.',
    fullDescription: 'Análisis comprehensivo de viabilidad técnica, operativa y regulatoria. Incluye planes de integración tecnológica para el Hospital Regional San Martín y proyecciones de reducción de tiempo de atención clínica.',
    icon: FileCheck,
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['Estudio de Viabilidad', 'Arquitectura DICOM', 'Reporte PDF'],
  },
  {
    num: '06',
    title: 'Dataset Público',
    description: 'Utilizar Chest X-Ray Dataset de Kaggle.',
    fullDescription: 'Uso certificado de la base de imágenes de rayos X de tórax del Guangzhou Women and Children\'s Medical Center. Datos clínicos categorizados por expertos para garantizar un entrenamiento de alta fidelidad.',
    icon: Cloud,
    color: 'red',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tags: ['Kaggle Dataset', 'Validación Médica', 'Open Source'],
  },
]

const colorMap: Record<string, { bg: string; text: string; gradient: string; shadow: string; accent: string }> = {
  blue: { bg: 'bg-blue-400/20', text: 'text-blue-300', gradient: 'from-blue-400 to-cyan-300', shadow: 'shadow-blue-400/40', accent: '#60a5fa' },
  purple: { bg: 'bg-purple-400/20', text: 'text-purple-300', gradient: 'from-purple-400 to-pink-300', shadow: 'shadow-purple-400/40', accent: '#c084fc' },
  emerald: { bg: 'bg-emerald-400/20', text: 'text-emerald-300', gradient: 'from-emerald-400 to-teal-300', shadow: 'shadow-emerald-400/40', accent: '#34d399' },
  cyan: { bg: 'bg-cyan-400/20', text: 'text-cyan-300', gradient: 'from-cyan-400 to-blue-300', shadow: 'shadow-cyan-400/40', accent: '#22d3ee' },
  amber: { bg: 'bg-amber-400/20', text: 'text-amber-300', gradient: 'from-amber-400 to-orange-300', shadow: 'shadow-amber-400/40', accent: '#fbbf24' },
  red: { bg: 'bg-red-400/20', text: 'text-red-300', gradient: 'from-red-400 to-rose-300', shadow: 'shadow-red-400/40', accent: '#f87171' },
}

// ============================================================
// PROPUESTAS DE INVESTIGACIÓN CON DISEÑO ILUMINADO Y SÓLIDO
// ============================================================
const proposals = [
  {
    icon: ShieldCheck,
    title: 'Normas Técnicas',
    description: 'Estandarización técnica y regulatoria en el desarrollo de software médico.',
    proposal: 'Integración del estándar DICOM para la lectura nativa de las 9,000 imágenes mensuales, compatibilidad con protocolos HL7/FHIR de interoperabilidad hospitalaria, y cumplimiento estricto de la Ley de Protección de Datos Personales (Ley N° 29733) para anonimizar los datos de los pacientes.',
    color: 'blue',
    accentText: 'text-blue-300',
    accentBg: 'bg-blue-400/20 shadow-sm',
    accentBorder: 'border-blue-400/40 hover:border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]',
  },
  {
    icon: HeartPulse,
    title: 'Seguridad y Salud',
    description: 'Aplicación de ergonomía cognitiva y mitigación del error humano por fatiga.',
    proposal: 'Implementación de un motor de triaje inteligente que detecta y prioriza automáticamente las radiografías con anomalías críticas. Esto reduce drásticamente los retrasos de 72 horas y previene el burnout visual y cognitivo de los 6 radiólogos del hospital.',
    color: 'emerald',
    accentText: 'text-emerald-300',
    accentBg: 'bg-emerald-400/20 shadow-sm',
    accentBorder: 'border-emerald-400/40 hover:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
  },
  {
    icon: Leaf,
    title: 'Responsabilidad Ambiental',
    description: 'Sostenibilidad ecológica institucional y optimización de recursos energéticos.',
    proposal: 'Digitalización diagnóstica total para eliminar el uso de placas físicas de acetato y reactivos químicos de revelado altamente contaminantes. Asimismo, se promueve Green AI aplicando técnicas de cuantización del modelo de Deep Learning para reducir el consumo eléctrico de los servidores locales.',
    color: 'cyan',
    accentText: 'text-cyan-300',
    accentBg: 'bg-cyan-400/20 shadow-sm',
    accentBorder: 'border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]',
  },
]

export default function ProjectInfoSection() {
  const [evidenceOrder, setEvidenceOrder] = useState<number[]>([0, 1, 2, 3, 4, 5])

  // Precarga de imágenes
  useEffect(() => {
    evidences.forEach((ev) => {
      const img = new Image()
      img.src = ev.image
    })
  }, [])

  const handleNext = () => {
    setEvidenceOrder((prev) => {
      const newOrder = [...prev]
      const first = newOrder.shift()!
      newOrder.push(first)
      return newOrder
    })
  }

  const handlePrev = () => {
    setEvidenceOrder((prev) => {
      const newOrder = [...prev]
      const last = newOrder.pop()!
      newOrder.unshift(last)
      return newOrder
    })
  }

  return (
    <section id="proyecto" className="relative bg-neutral-950 py-24 sm:py-32 overflow-hidden transition-colors duration-500">
      
      {/* ============================================================
          VIDEO DE FONDO ILUMINADO Y SIN FILTROS OSCUROS/AZULES
          ============================================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-65 scale-100"
        >
          <source 
            src="https://videos.pexels.com/video-files/30739786/30739786-uhd_1440_2560_24fps.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://www.pexels.com/es-es/download/video/30739786/" 
            type="video/mp4" 
          />
        </video>
        {/* Difuminado sutil neutro superior e inferior para suavizar cortes de la sección */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/60" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        
        {/* Header de la Sección */}
        <div className="text-center mb-16 max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white/10 border border-white/35 backdrop-blur-md inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 shadow-md">
            <BookOpen size={12} className="text-white" />
            <span className="text-white text-xs font-bold tracking-wider uppercase">Información del Proyecto</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Trabajo Final: <span className="gradient-text-animated">Deep Learning</span>
          </h2>
          <p className="text-white text-sm sm:text-base leading-relaxed font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Sistema de diagnóstico médico asistido por Inteligencia Artificial para el Hospital Regional San Martín.
          </p>
        </div>

        {/* ============================================================
            SECCIÓN 1: CONTEXTO GENERAL & OBJETIVO (Ficha Técnica + Metas)
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Ficha Técnica del Proyecto (5 Columnas) */}
          <div className="lg:col-span-5 bg-neutral-900/75 border border-white/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div>
              <h3 className="text-white font-extrabold text-lg mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Target size={18} className="text-white" />
                </div>
                Tema del Proyecto
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6 font-semibold">
                Desarrollo e implementación de un prototipo funcional para la detección automatizada de anomalías en radiografías de tórax, optimizando los tiempos de respuesta del departamento de radiología.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Hospital, label: 'Institución', value: 'Hosp. Reg. San Martín' },
                { icon: GraduationCap, label: 'Curso', value: 'Deep Learning' },
                { icon: Calendar, label: 'Año', value: '2026' },
                { icon: Users, label: 'Modalidad', value: 'Trabajo Final' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <item.icon size={16} className="text-white mb-2" />
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider">{item.label}</div>
                  <div className="text-white text-xs font-bold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Objetivo Principal (7 Columnas) */}
          <div className="lg:col-span-7 bg-neutral-900/75 border border-white/20 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div>
              <h3 className="text-white font-extrabold text-lg mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <ClipboardList size={18} className="text-white" />
                </div>
                Objetivo del Trabajo
              </h3>
              <p className="text-white/90 text-base leading-relaxed mb-6 font-semibold">
                Al finalizar el proyecto, el estudiante habrá desarrollado competencias sólidas en la aplicación práctica de arquitecturas complejas de Redes Neuronales Convolucionales (CNN) aplicadas al sector de la salud pública, solventando cuellos de botella mediante metodologías ágiles de ingeniería y despliegue.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/35 flex items-start gap-4 shadow-[0_4px_20px_rgba(16,185,129,0.1)]">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-emerald-300 text-sm font-extrabold">Meta de Impacto Clínico</h4>
                <p className="text-white/90 text-xs mt-1 leading-relaxed font-semibold">
                  Reducir la lista de espera de más de 500 imágenes acumuladas y mitigar el tiempo de respuesta de diagnóstico prioritario a menos de 10 minutos.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================
            SECCIÓN 2: LOS 3 PILARES CON RESPLANDOR (GLOWING CARDS)
            ============================================================ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-white/30 flex-grow" />
            <h4 className="text-white text-xs font-black tracking-widest uppercase shrink-0 drop-shadow-md">Pilares y Directrices del Proyecto</h4>
            <div className="h-px bg-white/30 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proposals.map((prop, index) => {
              const PropIcon = prop.icon
              return (
                <div 
                  key={prop.title}
                  className={`bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 border ${prop.accentBorder} hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
                >
                  <div>
                    {/* Icono y Cabecera */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${prop.accentBg} flex items-center justify-center ${prop.accentText}`}>
                        <PropIcon size={20} />
                      </div>
                      <h4 className="text-white font-extrabold text-base">{prop.title}</h4>
                    </div>

                    {/* Descripción de Contexto */}
                    <p className="text-white/80 text-xs leading-relaxed mb-5 italic font-semibold">
                      "{prop.description}"
                    </p>
                  </div>

                  {/* Propuesta Técnica Concreta */}
                  <div className="p-4 rounded-xl bg-neutral-950/90 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${prop.accentText}`}>
                      Propuesta Tecnológica
                    </div>
                    <p className="text-white text-xs leading-relaxed font-semibold">
                      {prop.proposal}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ============================================================
            🎬 SECCIÓN 3: EVIDENCIAS - SLIDER DE ALTA DEFINICIÓN (H-[600PX])
            ============================================================ */}
        <div className="bg-neutral-900/80 border border-white/20 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-extrabold text-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <FileText size={18} className="text-purple-300" />
              </div>
              Fases y Evidencias del Proyecto
            </h3>

            {/* Navegadores del Slider */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white hover:text-white transition-all hover:scale-110"
                aria-label="Anterior"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white hover:text-white transition-all hover:scale-110"
                aria-label="Siguiente"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
            {evidenceOrder.map((evidenceIndex, position) => {
              const evidence = evidences[evidenceIndex]
              const colors = colorMap[evidence.color]
              const Icon = evidence.icon

              // Posiciones y traslaciones lógicas del slider
              const isFirstOrSecond = position === 0 || position === 1
              const offset = position - 2

              let styleProps: React.CSSProperties = {
                backgroundImage: `url(${evidence.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              }

              if (isFirstOrSecond) {
                // Card Activo Principal (Grande de Fondo)
                styleProps = {
                  ...styleProps,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  transform: 'translate(0, 0)',
                  zIndex: 1,
                }
              } else if (offset >= 0 && offset <= 3) {
                // Previsualización lateral derecha
                styleProps = {
                  ...styleProps,
                  position: 'absolute',
                  top: '50%',
                  left: `calc(50% + ${offset * 180}px)`,
                  width: '160px',
                  height: '280px',
                  borderRadius: '20px',
                  transform: 'translate(0, -50%)',
                  zIndex: 2,
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
                }
              } else {
                // Cards ocultos para flujo infinito
                styleProps = {
                  ...styleProps,
                  position: 'absolute',
                  top: '50%',
                  left: `calc(50% + ${4 * 180}px)`,
                  width: '160px',
                  height: '280px',
                  borderRadius: '20px',
                  transform: 'translate(0, -50%)',
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: 'none',
                }
              }

              return (
                <div key={`${evidence.num}-${position}`} style={styleProps}>
                  
                  {/* Gradiente Oscuro de Contraste con iluminación de base */}
                  <div
                    className="absolute inset-0 rounded-[inherit]"
                    style={{
                      background: isFirstOrSecond
                        ? 'linear-gradient(90deg, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0.55) 45%, rgba(10,10,12,0.1) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,12,0.9) 85%)',
                    }}
                  />

                  {/* Tinte de Color de Enfoque con resplandor */}
                  {position === 1 && (
                    <div
                      className="absolute inset-0 mix-blend-overlay opacity-30 rounded-[inherit]"
                      style={{ background: `linear-gradient(135deg, ${colors.accent}, transparent)` }}
                    />
                  )}

                  {/* Sello de Validación */}
                  {position === 1 && (
                    <div className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/35 backdrop-blur-md border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.35)] animate-pulse">
                      <CheckCircle2 size={12} className="text-emerald-300" />
                      <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider">Validado</span>
                    </div>
                  )}

                  {/* Textos y Acciones del Card Activo */}
                  {position === 1 && (
                    <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 max-w-xl z-10 animate-evidence-content">
                      
                      {/* Cabecera Técnica */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white shadow-2xl ${colors.shadow} shadow-lg`}>
                          <Icon size={26} />
                        </div>
                        <div>
                          <div className={`text-xs font-extrabold uppercase tracking-widest ${colors.text}`}>
                            Fase Operativa
                          </div>
                          <div className="text-white text-4xl font-black leading-none mt-0.5">
                            {evidence.num}
                          </div>
                        </div>
                      </div>

                      {/* Título de la Fase */}
                      <h4 className="text-white text-3xl md:text-4xl font-black mb-4 leading-tight">
                        {evidence.title}
                      </h4>

                      {/* Descripción Completa */}
                      <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                        {evidence.fullDescription}
                      </p>

                      {/* Etiquetas / Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {evidence.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Botón */}
                      <button
                        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-white text-sm font-bold shadow-lg ${colors.shadow} hover:scale-105 transition-all flex items-center gap-2`}
                      >
                        Inspeccionar Módulo
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}

                  {/* Títulos Rápidos de las Previsualizaciones */}
                  {position >= 2 && offset >= 0 && offset <= 3 && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <div className={`text-xs font-black uppercase tracking-wider mb-1 ${colors.text} drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]`}>
                        Fase {evidence.num}
                      </div>
                      <h5 className="text-white text-sm font-bold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {evidence.title}
                      </h5>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Indicadores de Posición en Rango */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {evidences.map((_, index) => {
              const isActive = evidenceOrder[1] === index
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    isActive ? 'w-10 h-1.5 bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.6)]' : 'w-2 h-1.5 bg-white/40'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* ============================================================
          ANIMACIONES CSS DE ENTRADA Y FLUJO DE CONTENIDOS
          ============================================================ */}
      <style>{`
        @keyframes evidenceContent {
          0% {
            opacity: 0;
            transform: translate(0, calc(-50% + 40px));
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: translate(0, -50%);
            filter: blur(0);
          }
        }

        .animate-evidence-content > * {
          opacity: 0;
          animation: evidenceFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-evidence-content > *:nth-child(1) { animation-delay: 0.15s; }
        .animate-evidence-content > *:nth-child(2) { animation-delay: 0.25s; }
        .animate-evidence-content > *:nth-child(3) { animation-delay: 0.35s; }
        .animate-evidence-content > *:nth-child(4) { animation-delay: 0.45s; }
        .animate-evidence-content > *:nth-child(5) { animation-delay: 0.55s; }

        @keyframes evidenceFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  )
}