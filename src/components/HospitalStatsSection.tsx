import { useState, useEffect, useRef } from 'react'
import { Hospital, Calendar, Users, FileText, ChevronLeft, ChevronRight, BarChart3, Clock, ShieldAlert, HeartPulse, Sparkles, X, Brain, CheckCircle2, FileCheck } from 'lucide-react'

// ============================================================
// 8 INDICADORES CLÍNICOS ENRIQUECIDOS - HOSPITAL SAN MARTÍN
// ============================================================
interface IndicatorSlide {
  kicker: string
  title: string
  text: string
  image: string
  btnText: string
  icon: typeof Hospital
  researchDetail: {
    problemStatement: string
    technicalSolution: string
    guidingAnswer: string 
    estimatedImpact: string
  }
}

const hospitalIndicators: IndicatorSlide[] = [
  {
    kicker: 'Saturación en Radiología',
    title: '320+ Pacientes Diarios',
    text: 'La demanda diagnóstica diaria supera el umbral crítico tolerado. El ingreso masivo de radiografías de tórax, tomografías y resonancias genera un estado de congestión permanente en el sistema PACS.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Ver Ingesta PACS',
    icon: Hospital,
    researchDetail: {
      problemStatement: 'La saturación de 320 pacientes diarios produce más de 9,000 imágenes mensuales que deben ser categorizadas y almacenadas, colapsando el servidor PACS local.',
      technicalSolution: 'Se propone un pipeline asíncrono con colas de mensajería (RabbitMQ) que recibe los archivos en formato DICOM directamente desde los equipos médicos de adquisición antes de enviarlos al visor PACS corporativo.',
      guidingAnswer: '¿Interoperabilidad? La integración se realiza mediante estándares internacionales de salud HL7 y FHIR para mantener la sincronización con la historia clínica electrónica del paciente (HC).',
      estimatedImpact: 'Reducción inmediata del tiempo de espera de procesamiento de archivos DICOM de 15 minutos a menos de 5 segundos por estudio.'
    }
  },
  {
    kicker: 'Infraestructura de Internamiento',
    title: '450 Camas Totales',
    text: 'Con un nivel de ocupación promedio del 87% en hospitalización, la demanda de imágenes diagnósticas es constante. La falta de priorización retrasa las altas médicas y las decisiones terapéuticas urgentes.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Estudio de Camas',
    icon: Calendar,
    researchDetail: {
      problemStatement: 'Los pacientes que ocupan camas de cuidados intensivos e internamiento general dependen de resultados rápidos de rayos X para definir altas o cambios en ventilación asistida.',
      technicalSolution: 'Se vincula el software del censo de camas (HIS) con el ordenamiento lógico de la cola de IA, aplicando mayor factor de ponderación a pacientes hospitalizados graves.',
      guidingAnswer: '¿Red de Apoyo? El modelo optimiza el flujo de toma de decisiones terapéuticas para médicos tratantes en sala, actuando como un consultor digital activo de guardia 24/7.',
      estimatedImpact: 'Disminución del promedio de días de estancia hospitalaria de 8.2 a 6.9 días gracias a diagnósticos rápidos.'
    }
  },
  {
    kicker: 'Brecha de Especialistas',
    title: 'Solo 6 Radiólogos',
    text: 'La escasez de médicos subespecialistas en diagnóstico por imágenes crea una brecha operativa insostenible. Cada profesional debe informar manualmente un promedio de 1,500 estudios al mes.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Ver Carga de Trabajo',
    icon: Users,
    researchDetail: {
      problemStatement: 'Un volumen de 1,500 radiografías mensuales por radiólogo excede en un 150% las directrices ergonómicas internacionales de fatiga cognitiva y salud ocular.',
      technicalSolution: 'Implementación del algoritmo de Deep Learning CNN (ResNet50) para realizar una pre-lectura de la placa de tórax en 0.04 segundos, resaltando las opacidades pulmonares.',
      guidingAnswer: '¿Tipo de Red? Se determinó que las Redes Neuronales Convolucionales (CNN) son las más aptas para visión artificial, permitiendo extraer patrones espaciales y texturas complejas de infecciones alveolares.',
      estimatedImpact: 'Cada radiólogo puede validar un estudio en un promedio de 45 segundos en lugar de realizar una exploración visual manual de 12 minutos.'
    }
  },
  {
    kicker: 'Latencia Operativa Crítica',
    title: '72h Retraso Diagnóstico',
    text: 'La carencia de un sistema automatizado de triaje y priorización resulta en un retardo severo de hasta tres días para la emisión de informes de imágenes de rutina.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Analizar Cuello Botella',
    icon: Clock,
    researchDetail: {
      problemStatement: 'El retraso acumulado de 72 horas para diagnosticar patologías como neumonías bacterianas empeora el pronóstico y aumenta el índice de complicaciones respiratorias severas.',
      technicalSolution: 'Se diseñó un módulo clasificador que ordena la lista de lectura médica del radiólogo de mayor a menor probabilidad de patología, dejando los casos normales al final.',
      guidingAnswer: '¿Cómo integrarlo? La propuesta plantea inyectar el prediagnóstico como metadato DICOM prioritario en la lista de trabajo (Worklist) del radiólogo para su rápida identificación.',
      estimatedImpact: 'Disminución drástica del tiempo máximo de informe clínico crítico a menos de 10 minutos desde la toma de la radiografía.'
    }
  },
  {
    kicker: 'Riesgo de Error Clínico',
    title: '~30% Error por Fatiga',
    text: 'La fatiga cognitiva inducida por jornadas de lectura ininterrumpidas superiores a las 10 horas impacta negativamente la agudeza diagnóstica de los especialistas.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Análisis de Precisión',
    icon: ShieldAlert,
    researchDetail: {
      problemStatement: 'Durante las horas finales del turno nocturno, la fatiga visual provoca omisiones de patrones intersticiales sutiles o derrames pleurales de pequeño volumen.',
      technicalSolution: 'La IA actúa como una doble capa de validación clínica autónoma, dibujando mapas de calor Grad-CAM (Gradientes de Activación) directamente sobre la placa de tórax.',
      guidingAnswer: '¿Métricas de Validación? En salud, la métrica crítica es la Sensibilidad (Recall), optimizada a un 98.1% para reducir a un margen mínimo la tasa de falsos negativos.',
      estimatedImpact: 'Reducción del margen de error diagnóstico por fatiga del radiólogo de un 30% a menos del 2% global.'
    }
  },
  {
    kicker: 'Calidad Percibida',
    title: '62% Satisfacción',
    text: 'La satisfacción de los usuarios clínicos y pacientes se sitúa en un mínimo histórico de 62%, principalmente por la prolongada espera de los informes.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Ver Encuestas',
    icon: HeartPulse,
    researchDetail: {
      problemStatement: 'El descontento generalizado se traduce en quejas administrativas, congestión en el servicio de atención al usuario y pérdida de confianza institucional.',
      technicalSolution: 'Integración de un generador de pre-reportes estructurados automáticos en formato PDF que describe de forma paramétrica los hallazgos volumétricos.',
      guidingAnswer: '¿Beneficios reales? Transparencia clínica y agilidad operativa. El paciente se retira de la institución con un estatus preliminar validado en su primera cita.',
      estimatedImpact: 'Aumento proyectado del índice de satisfacción del paciente de un 62% a un 94% en el primer trimestre pos-despliegue.'
    }
  },
  {
    kicker: 'Inventario Acumulado',
    title: '500+ Sin Analizar',
    text: 'Un inventario flotante de radiografías acumuladas permanece sin lectura diagnóstica formal, postergando la detección de patologías en evolución.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Analizar Rezago',
    icon: FileText,
    researchDetail: {
      problemStatement: 'La acumulación constante de 500 imágenes sin analizar genera retrasos sistémicos imposibles de resolver con fuerza laboral exclusivamente humana.',
      technicalSolution: 'Se propone un despachador programado (Batch Job Processing) que analiza asíncronamente las colas históricas de placas rezagadas en horas de menor consumo del servidor (00:00 - 05:00).',
      guidingAnswer: '¿Bases de datos limitadas? Se aplica Transfer Learning y Data Augmentation (rotación, zoom, corte) sobre datasets públicos como Kaggle Chest X-Ray para entrenar un modelo robusto sin sesgos locales.',
      estimatedImpact: 'Despeje total del rezago de 500+ imágenes históricas del hospital en un plazo máximo de 48 horas de procesamiento nocturno.'
    }
  },
  {
    kicker: 'Casos Críticos Retrasados',
    title: '~15% Emergencias en Espera',
    text: 'Aproximadamente el 15% de los estudios de emergencia contienen hallazgos severos que esperan su turno de lectura manual de manera indiscriminada.',
    image: 'https://images.unsplash.com/photo-1516549558148-79fc9548a31e?auto=format&fit=crop&w=1600&q=80',
    btnText: 'Activar Triaje IA',
    icon: Sparkles,
    researchDetail: {
      problemStatement: 'Casos de neumotórax, neumonía bacteriana masiva o fractura ósea compleja se mezclan con consultas rutinarias de control sin ninguna prioridad.',
      technicalSolution: 'Despliegue del motor clasificador en tiempo real con disparadores de notificación instantánea en los terminales de urgencias mediante sockets dinámicos.',
      guidingAnswer: '¿Limitaciones? Necesidad de calibración inicial para evitar falsos positivos por mala exposición de placa, así como la requerida alfabetización digital para el personal clínico.',
      estimatedImpact: 'Clasificación prioritaria inmediata del 100% de las radiografías de emergencias clínicas críticas en menos de 60 segundos.'
    }
  }
]

export default function HospitalStatsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pos, setPos] = useState(0)
  const [progress, setProgress] = useState(0)
  const [selectedSlide, setSelectedSlide] = useState<IndicatorSlide | null>(null)

  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    index: 0,
    pos: 0,
    dragging: false,
    pointerId: null as number | null,
    startX: 0,
    startTime: 0,
    v: 0,
    t0: 0,
    animating: false,
    hovering: false,
    cycleStartTime: 0,
    pausedAt: 0,
    tiltX: 0,
    tiltY: 0
  })

  // Configuración de visualización ultra-iluminada y nítida
  const [opts, setOpts] = useState({
    gap: 32,
    peek: 0.12,
    rotateY: 18,
    zDepth: 100,
    scaleDrop: 0.08,
    blurMax: 0.4, // Muy ligero para mantener nitidez en las tarjetas asistentes
    activeLeftBias: 0,
    interval: 5500,
    transitionMs: 800
  })

  const n = hospitalIndicators.length
  const slideW = typeof window !== 'undefined' ? Math.min(840, window.innerWidth * (1 - opts.peek * 2)) : 840

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w <= 560) {
        setOpts(prev => ({ ...prev, gap: 12, peek: 0.04, rotateY: 10, zDepth: 40, scaleDrop: 0.05 }))
      } else if (w <= 768) {
        setOpts(prev => ({ ...prev, gap: 16, peek: 0.06, rotateY: 12, zDepth: 60, scaleDrop: 0.06 }))
      } else if (w <= 1000) {
        setOpts(prev => ({ ...prev, gap: 24, peek: 0.08, rotateY: 14, zDepth: 80, scaleDrop: 0.07 }))
      } else {
        setOpts(prev => ({ ...prev, gap: 32, peek: 0.12, rotateY: 18, zDepth: 100, scaleDrop: 0.08 }))
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    stateRef.current.cycleStartTime = performance.now()
    let rafId: number

    const step = (t: number) => {
      const state = stateRef.current
      if (!state.dragging && !state.hovering && !state.animating && !selectedSlide) {
        const elapsed = t - state.cycleStartTime
        const p = Math.min(1, elapsed / opts.interval)
        setProgress(p)
        if (elapsed >= opts.interval) {
          next()
        }
      }
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(rafId)
  }, [opts.interval, currentIndex, selectedSlide])

  const mod = (i: number, n: number) => ((i % n) + n) % n

  const renderProgress = (index: number) => {
    setCurrentIndex(index)
    stateRef.current.index = index
    stateRef.current.cycleStartTime = performance.now()
    setProgress(0)
  }

  const goTo = (targetIndex: number, animate = true) => {
    const state = stateRef.current
    const start = state.pos
    
    let d = targetIndex - Math.round(start)
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    const end = Math.round(start) + d

    const dur = animate ? opts.transitionMs : 0
    const t0 = performance.now()
    const ease = (x: number) => 1 - Math.pow(1 - x, 4)
    state.animating = true

    const animateStep = (now: number) => {
      const t = Math.min(1, (now - t0) / dur)
      const p = dur ? ease(t) : 1
      const currentPos = start + (end - start) * p
      state.pos = currentPos
      setPos(currentPos)

      if (t < 1) {
        requestAnimationFrame(animateStep)
      } else {
        const finalIndex = mod(Math.round(currentPos), n)
        state.pos = finalIndex
        setPos(finalIndex)
        state.animating = false
        renderProgress(finalIndex)
      }
    }
    requestAnimationFrame(animateStep)
  }

  const next = () => {
    goTo(mod(stateRef.current.index + 1, n))
  }

  const prev = () => {
    goTo(mod(stateRef.current.index - 1, n))
  }

  const onDragStart = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const state = stateRef.current
    state.dragging = true
    state.pointerId = e.pointerId
    if (viewportRef.current) {
      viewportRef.current.setPointerCapture(e.pointerId)
    }
    state.startX = e.clientX
    state.t0 = performance.now()
    state.v = 0
    state.pausedAt = performance.now()
  }

  const onDragMove = (e: React.PointerEvent) => {
    const state = stateRef.current
    if (!state.dragging || e.pointerId !== state.pointerId) return
    const dx = e.clientX - state.startX
    const dt = Math.max(16, performance.now() - state.t0)
    state.v = dx / dt
    const slideSpan = slideW + opts.gap
    const calculatedPos = mod(state.index - dx / slideSpan, n)
    state.pos = calculatedPos
    setPos(calculatedPos)
  }

  const onDragEnd = (e: React.PointerEvent) => {
    const state = stateRef.current
    if (!state.dragging || (e && e.pointerId !== state.pointerId)) return
    state.dragging = false
    try {
      if (state.pointerId != null && viewportRef.current) {
        viewportRef.current.releasePointerCapture(state.pointerId)
      }
    } catch {}
    state.pointerId = null

    if (state.pausedAt) {
      state.cycleStartTime += performance.now() - state.pausedAt
      state.pausedAt = 0
    }

    const threshold = 0.18
    const target = Math.round(state.pos - Math.sign(state.v) * (Math.abs(state.v) > threshold ? 0.5 : 0))
    goTo(mod(target, n))
  }

  const onTilt = (e: React.MouseEvent) => {
    if (!viewportRef.current) return
    const r = viewportRef.current.getBoundingClientRect()
    const mx = (e.clientX - r.left) / r.width - 0.5
    const my = (e.clientY - r.top) / r.height - 0.5
    
    stateRef.current.tiltX = my * -4
    stateRef.current.tiltY = mx * 4

    if (rootRef.current) {
      rootRef.current.style.setProperty('--mzaTiltX', (my * -4).toFixed(3))
      rootRef.current.style.setProperty('--mzaTiltY', (mx * 4).toFixed(3))
    }
  }

  return (
    <section 
      id="hospital-stats" 
      ref={rootRef}
      className="relative bg-neutral-950 py-24 sm:py-32 overflow-hidden select-none"
    >
      
      {/* Video de fondo integrado */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.14] scale-100"
        >
          <source src="https://videos.pexels.com/video-files/30739786/30739786-uhd_1440_2560_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        
        {/* Cabecera Principal */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/30 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <BarChart3 size={12} className="text-emerald-400" />
            <span className="text-emerald-300 text-xs font-bold tracking-wider uppercase">Situación Actual del Hospital</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Indicadores del <span className="gradient-text-animated font-black">Hospital San Martín</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-semibold">
            Análisis detallado de la situación operativa del departamento de radiología que evidencia la necesidad urgente de implementar un sistema de apoyo asistido por Inteligencia Artificial.
          </p>
        </div>

        {/* ============================================================
            CARRUSEL DE PARALLAX 3D (ULTRA ILUMINADO / SIN CLIPPING)
            ============================================================ */}
        <div className="mzaCarousel-wrapper relative h-[620px] w-full mt-4">
          <div 
            className="mzaCarousel h-full max-w-full relative px-1 md:px-12 overflow-visible touch-none"
            onMouseEnter={() => {
              stateRef.current.hovering = true
              stateRef.current.pausedAt = performance.now()
            }}
            onMouseLeave={() => {
              if (stateRef.current.pausedAt) {
                stateRef.current.cycleStartTime += performance.now() - stateRef.current.pausedAt
                stateRef.current.pausedAt = 0
              }
              stateRef.current.hovering = false
            }}
          >
            {/* Viewport del Carrusel */}
            <div 
              ref={viewportRef}
              className="mzaCarousel-viewport relative outline-none overflow-visible h-full cursor-grab active:cursor-grabbing"
              onPointerDown={onDragStart}
              onPointerMove={onDragMove}
              onPointerUp={onDragEnd}
              onPointerCancel={onDragEnd}
              onMouseMove={onTilt}
            >
              {/* Contenedor de Tracks 3D */}
              <div className="mzaCarousel-track relative h-[calc(100%-80px)]" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
                {hospitalIndicators.map((slide, i) => {
                  let d = i - pos
                  if (d > n / 2) d -= n
                  if (d < -n / 2) d += n

                  const weight = Math.max(0, 1 - Math.abs(d) * 2)
                  const biasActive = -slideW * opts.activeLeftBias * weight
                  const tx = d * (slideW + opts.gap) + biasActive
                  const depth = -Math.abs(d) * opts.zDepth
                  const rot = -d * opts.rotateY
                  const scale = 1 - Math.min(Math.abs(d) * opts.scaleDrop, 0.42)
                  const blur = Math.min(Math.abs(d) * opts.blurMax, opts.blurMax)
                  const z = Math.round(1000 - Math.abs(d) * 10)

                  const isActive = currentIndex === i

                  // Parallax interno
                  const parBase = Math.max(-1, Math.min(1, -d))
                  const parX = parBase * 24 + stateRef.current.tiltY * 1.5
                  const parY = stateRef.current.tiltX * -1.0
                  const bgX = parBase * -32 + stateRef.current.tiltY * -1.8

                  const SlideIcon = slide.icon

                  return (
                    <article 
                      key={i}
                      className="mzaCarousel-slide absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[24px] overflow-visible transition-all animate-fade-in"
                      style={{
                        width: `${slideW}px`,
                        height: 'min(460px, calc(100% - 20px))',
                        transform: `translate3d(${tx}px, -50%, ${depth}px) rotateY(${rot}deg) scale(${scale})`,
                        filter: `blur(${blur}px)`,
                        zIndex: z,
                        transformStyle: 'preserve-3d',
                      }}
                      data-state={isActive ? 'active' : 'rest'}
                    >
                      <div 
                        className="mzaCard relative w-full h-full rounded-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/15"
                        style={{
                          background: 'rgba(12,12,14,0.85)',
                          backdropFilter: 'blur(16px)'
                        }}
                      >
                        {/* Imagen de Fondo Parallax - ILUMINADA Y CLARA */}
                        <div 
                          className="absolute inset-[-4%] bg-cover bg-center transition-transform duration-700 ease-out z-0"
                          style={{
                            backgroundImage: `url(${slide.image})`,
                            transform: `scale(1.1) translate3d(${bgX}px, ${(parY * 0.25)}px, 0)`,
                            // SE INCREMENTÓ LA LUMINOSIDAD DE FORMA EXPONENCIAL
                            filter: isActive ? 'contrast(1.02) saturate(1.1) brightness(0.95)' : 'contrast(0.95) saturate(0.95) brightness(0.65)'
                          }}
                        />

                        {/* Soft overlay que protege el texto sin opacar el resto del panel */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent z-1" />

                        {/* Contenedor Flex */}
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                          
                          {/* Kicker y Título */}
                          <div 
                            className="space-y-1"
                            style={{
                              transform: `translate3d(${(parX * 0.2)}px, ${(parY * 0.2)}px, 0)`,
                              transition: 'transform 0.4s cubic-bezier(0.2, 0.7, 0, 1)'
                            }}
                          >
                            <span className="text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-widest drop-shadow-md flex items-center gap-1.5">
                              <SlideIcon size={12} /> {slide.kicker}
                            </span>
                            <h3 className="text-white font-extrabold text-xl md:text-3xl tracking-tight leading-tight drop-shadow-lg">
                              {slide.title}
                            </h3>
                          </div>

                          {/* Definición y Botón */}
                          <div 
                            className="space-y-4"
                            style={{
                              transform: `translate3d(${(parX * 0.1)}px, ${(parY * 0.1)}px, 0)`,
                              transition: 'transform 0.4s cubic-bezier(0.2, 0.7, 0, 1)'
                            }}
                          >
                            <p className="text-white text-xs md:text-sm leading-relaxed bg-neutral-950/90 p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-md max-w-3xl font-medium">
                              {slide.text}
                            </p>

                            <button 
                              onClick={() => setSelectedSlide(slide)}
                              className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform duration-200 active:scale-95"
                            >
                              {slide.btnText}
                            </button>
                          </div>

                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* Controles Laterales Flotantes */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all ml-2 md:ml-4 pointer-events-auto active:scale-95 shadow-md animate-pulse"
                aria-label="Previous indicator"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md text-white flex items-center justify-center transition-all mr-2 md:mr-4 pointer-events-auto active:scale-95 shadow-md animate-pulse"
                aria-label="Next indicator"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Paginación de Puntos */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-2.5 z-20">
              {hospitalIndicators.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === i 
                      ? 'w-10 bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]' 
                      : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================
          CONSOLA DE INVESTIGACIÓN (MODAL OVERLAY)
          ============================================================ */}
      {selectedSlide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-neutral-900 border border-white/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-up">
            
            {/* Botón de Cierre */}
            <button 
              onClick={() => setSelectedSlide(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95"
            >
              <X size={16} />
            </button>

            {/* Cabecera del Modal */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Brain size={24} className="animate-pulse" />
              </div>
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{selectedSlide.kicker}</span>
                <h4 className="text-white text-xl md:text-2xl font-black">{selectedSlide.title}</h4>
              </div>
            </div>

            {/* Información Técnica del Trabajo de Investigación */}
            <div className="space-y-6">
              
              {/* Bloque 1: Declaración de Falla/Situación */}
              <div className="space-y-2">
                <h5 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Declaración de la Problemática
                </h5>
                <p className="text-white/80 text-xs leading-relaxed font-semibold bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                  {selectedSlide.researchDetail.problemStatement}
                </p>
              </div>

              {/* Bloque 2: Solución de Ingeniería */}
              <div className="space-y-2">
                <h5 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Propuesta Tecnológica Implementada
                </h5>
                <p className="text-white/80 text-xs leading-relaxed font-semibold bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                  {selectedSlide.researchDetail.technicalSolution}
                </p>
              </div>

              {/* Bloque 3: Fundamento Teórico y Metodológico */}
              <div className="space-y-2">
                <h5 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 text-cyan-400">
                  <FileCheck size={14} /> Fundamento Metodológico (PDF Guía)
                </h5>
                <p className="text-white/80 text-xs leading-relaxed font-semibold bg-cyan-950/10 p-3.5 rounded-xl border border-cyan-500/15">
                  {selectedSlide.researchDetail.guidingAnswer}
                </p>
              </div>

              {/* Bloque 4: Impacto Estimado */}
              <div className="space-y-2">
                <h5 className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={14} /> Impacto Estimado en el Hospital
                </h5>
                <p className="text-emerald-300 text-xs leading-relaxed font-bold bg-emerald-950/15 p-3.5 rounded-xl border border-emerald-500/20">
                  {selectedSlide.researchDetail.estimatedImpact}
                </p>
              </div>

            </div>

            {/* Footer de Consola */}
            <div className="border-t border-white/10 mt-8 pt-4 flex justify-end">
              <button 
                onClick={() => setSelectedSlide(null)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Cerrar Consola
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Barra de Progreso Ciclo Automático */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 origin-left"
          style={{ 
            transform: `scaleX(${progress})`,
            transition: 'transform 30ms linear'
          }}
        />
      </div>

    </section>
  )
}