import { useState, useRef, useCallback, useEffect } from 'react'
import { Gauge, UserCheck, Target, ArrowUpDown, Maximize, CheckCircle2, Zap, Shield, Clock, ArrowRight } from 'lucide-react'

const benefitsBackground = '/video/moonlit-tree-where-winds-meet-moewalls-com.mp4'

const benefits = [
  {
    id: 'time',
    icon: Gauge,
    title: 'Reducción del Tiempo',
    stat: '2s',
    statLabel: 'POR IMAGEN',
    shortDesc: 'De 72 horas a menos de 2 segundos por imagen.',
    longDesc: 'El modelo de deep learning procesa miles de radiografías de tórax en tiempo real, eliminando los cuellos de botella tradicionales del flujo de trabajo hospitalario. Lo que antes tomaba días de análisis manual, ahora se resuelve en segundos con la misma o mayor precisión.',
    benefits: [
      'Diagnóstico instantáneo sin esperas',
      'Reducción del 99% en tiempo de análisis',
      'Procesamiento paralelo de múltiples imágenes',
      'Integración directa con PACS hospitalario'
    ],
    features: [
      { icon: Zap, label: 'Inferencia en GPU', value: '<2s' },
      { icon: Clock, label: 'Tiempo promedio', value: '1.8s' },
      { icon: Shield, label: 'Disponibilidad', value: '99.9%' }
    ],
    cta: 'Ver Demo en Vivo',
    image: 'https://picsum.photos/seed/medical-time/800/500',
    glowColor: '160, 80%, 60%'
  },
  {
    id: 'load',
    icon: UserCheck,
    title: 'Menor Carga Laboral',
    stat: '-85%',
    statLabel: 'CARGA LABORAL',
    shortDesc: 'Los radiólogos se enfocan en casos complejos.',
    longDesc: 'El sistema filtra automáticamente los resultados normales y prioriza los casos que requieren atención especializada. Esto reduce drásticamente la fatiga decisional de los radiólogos, mejora su calidad de vida profesional y permite que dediquen su expertise donde realmente importa.',
    benefits: [
      'Filtrado automático de casos normales',
      'Reducción de fatiga decisional',
      'Mejor calidad de vida profesional',
      'Enfoque en patologías complejas'
    ],
    features: [
      { icon: Zap, label: 'Casos filtrados', value: '85%' },
      { icon: Clock, label: 'Horas ahorradas/día', value: '6h' },
      { icon: Shield, label: 'Satisfacción', value: '+40%' }
    ],
    cta: 'Conocer Más',
    image: 'https://picsum.photos/seed/medical-doctor/800/500',
    glowColor: '190, 80%, 60%'
  },
  {
    id: 'precision',
    icon: Target,
    title: 'Mayor Precisión',
    stat: '96.7%',
    statLabel: 'PRECISIÓN',
    shortDesc: 'Superando el promedio humano en diagnóstico.',
    longDesc: 'Con un 96.7% de precisión diagnóstica, el modelo supera el promedio de detección humana y reduce los falsos negativos en un 40%. Cada predicción viene acompañada de un nivel de confianza verificable, permitiendo a los médicos tomar decisiones informadas con total transparencia.',
    benefits: [
      '96.7% de precisión diagnóstica',
      '40% menos falsos negativos',
      'Nivel de confianza por predicción',
      'Validación clínica continua'
    ],
    features: [
      { icon: Zap, label: 'Sensibilidad', value: '94.2%' },
      { icon: Clock, label: 'Especificidad', value: '97.1%' },
      { icon: Shield, label: 'AUC-ROC', value: '0.98' }
    ],
    cta: 'Ver Estudios Clínicos',
    image: 'https://picsum.photos/seed/medical-precision/800/500',
    glowColor: '270, 80%, 65%'
  },
  {
    id: 'triage',
    icon: ArrowUpDown,
    title: 'Priorización Inteligente',
    stat: '24/7',
    statLabel: 'MONITOREO',
    shortDesc: 'Triaje automático de casos urgentes.',
    longDesc: 'El sistema identifica y escala inmediatamente las imágenes críticas al especialista correspondiente, reduciendo el tiempo de respuesta en emergencias hasta en un 70%. Funciona las 24 horas, los 7 días de la semana, garantizando que ningún caso urgente pase desapercibido.',
    benefits: [
      'Detección automática de urgencias',
      'Escalado inmediato al especialista',
      'Monitoreo continuo 24/7',
      '70% menos tiempo de respuesta'
    ],
    features: [
      { icon: Zap, label: 'Alertas críticas', value: '<30s' },
      { icon: Clock, label: 'Tiempo respuesta', value: '-70%' },
      { icon: Shield, label: 'Cobertura', value: '24/7' }
    ],
    cta: 'Configurar Alertas',
    image: 'https://picsum.photos/seed/medical-triage/800/500',
    glowColor: '340, 80%, 65%'
  },
  {
    id: 'scale',
    icon: Maximize,
    title: 'Escalabilidad Total',
    stat: '∞',
    statLabel: 'ESCALABLE',
    shortDesc: 'Miles de imágenes sin recursos extras.',
    longDesc: 'El sistema crece con la demanda del hospital sin necesidad de contratar más personal ni expandir infraestructura. Miles de imágenes pueden procesarse simultáneamente manteniendo el mismo rendimiento, haciendo que la solución sea viable desde clínicas pequeñas hasta redes hospitalarias nacionales.',
    benefits: [
      'Procesamiento simultáneo masivo',
      'Sin costos de infraestructura adicional',
      'Escalable de 1 a 1000+ camas',
      'Rendimiento constante bajo carga'
    ],
    features: [
      { icon: Zap, label: 'Imágenes/hora', value: '10K+' },
      { icon: Clock, label: 'Latencia', value: '<2s' },
      { icon: Shield, label: 'Uptime', value: '99.99%' }
    ],
    cta: 'Solicitar Cotización',
    image: 'https://picsum.photos/seed/medical-scale/800/500',
    glowColor: '35, 90%, 60%'
  },
]

export default function BenefitsSection() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const dragStartX = useRef(0)
  const dragStartRotation = useRef(0)

  const totalSlides = benefits.length
  const anglePerSlide = 360 / totalSlides
  const radius = 600

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragStartX.current = clientX
    dragStartRotation.current = rotation
  }, [rotation])

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const deltaX = clientX - dragStartX.current
    setRotation(dragStartRotation.current + deltaX * 0.3)
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    const snapAngle = Math.round(rotation / anglePerSlide) * anglePerSlide
    setRotation(snapAngle)
    const idx = Math.round(((snapAngle % 360) + 360) % 360 / anglePerSlide) % totalSlides
    setActiveIndex(idx)
  }, [rotation, anglePerSlide, totalSlides])

  useEffect(() => {
    if (!isDragging) {
      const normalizedRotation = ((rotation % 360) + 360) % 360
      const idx = Math.round(normalizedRotation / anglePerSlide) % totalSlides
      setActiveIndex(idx)
    }
  }, [rotation, isDragging, anglePerSlide, totalSlides])

  const activeBenefit = benefits[activeIndex]
  const ActiveIcon = activeBenefit.icon

  return (
    <section id="beneficios" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src={benefitsBackground}
      />

      {/* Overlay sutil — REDUCIDO para que el video se vea */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Gradientes decorativos sutiles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.05),transparent_50%)]" />

      <div className="relative max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-white/20 bg-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">Beneficios</span>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[1.1] drop-shadow-lg">
            Ventajas del{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Sistema Inteligente
            </span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg mx-auto drop-shadow">
            Cinco ventajas clave que transforman el diagnóstico médico con inteligencia artificial.
          </p>
        </div>

        {/* ============ CARRUSEL 3D CIRCULAR (TOTALMENTE TRANSPARENTE) ============ */}
<div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center mb-16 select-none bg-transparent">
  
  {/* SE ELIMINÓ: El div que tenía el linear-gradient que oscurecía los lados */}

  <div
    className="relative w-full max-w-[1200px] h-full flex items-center justify-center cursor-grab active:cursor-grabbing bg-transparent"
    style={{ perspective: '1500px' }}
    onMouseDown={handleDragStart}
    onMouseMove={handleDragMove}
    onMouseUp={handleDragEnd}
    onMouseLeave={handleDragEnd}
    onTouchStart={handleDragStart}
    onTouchMove={handleDragMove}
    onTouchEnd={handleDragEnd}
  >
    {benefits.map((b, i) => {
      const slideAngle = i * anglePerSlide
      const totalAngle = rotation + slideAngle
      const normalizedAngle = ((totalAngle % 360) + 360) % 360
      const isFront = normalizedAngle < anglePerSlide / 2 || normalizedAngle > 360 - anglePerSlide / 2
      
      const rad = (totalAngle * Math.PI) / 180
      const x = Math.sin(rad) * radius
      const z = Math.cos(rad) * radius - radius
      const scale = 0.75 + (z + radius) / (2 * radius) * 0.25

      return (
        <div
          key={b.id}
          className="absolute left-1/2 top-1/2 transition-all duration-300 ease-out"
          style={{
            width: '450px',
            height: '320px',
            transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${-totalAngle}deg) scale(${scale})`,
            zIndex: Math.round(z + radius),
            // Mantener las imágenes laterales visibles con brillo suave
            filter: isFront ? 'none' : 'brightness(0.8) saturate(1)',
            cursor: isFront ? 'default' : 'pointer',
          }}
          onClick={() => {
            if (!isFront) {
              const targetRotation = -i * anglePerSlide
              setRotation(targetRotation)
            }
          }}
        >
          {/* Card con borde fino y sombra suave para no ensuciar el video */}
          <div className={`relative w-full h-full rounded-3xl overflow-hidden border transition-colors duration-500 ${isFront ? 'border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'border-white/10'}`}>
            <img src={b.image} alt={b.title} className="w-full h-full object-cover" draggable={false} />
            
            {/* Degradado inferior muy sutil para que las letras se lean sobre el video */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {isFront && (
              <div className="absolute bottom-6 left-8 right-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <p className="text-white text-xl font-black uppercase tracking-tighter drop-shadow-md">{b.title}</p>
                <p className="text-emerald-400 font-bold text-[10px] tracking-[0.2em] uppercase drop-shadow-sm">{b.statLabel}</p>
              </div>
            )}
          </div>
        </div>
      )
    })}
  </div>

  {/* Texto de ayuda inferior */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
    <span className="text-white/40 text-[9px] font-mono tracking-[0.3em] uppercase drop-shadow-md">Desliza para explorar</span>
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
  </div>
</div>
        {/* ============ PANEL DINÁMICO GLASSMORPHISM ============ */}
        <div className="relative max-w-4xl mx-auto">
          {/* Indicadores */}
          <div className="flex justify-center gap-2 mb-8">
            {benefits.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setRotation(-i * anglePerSlide)
                  setActiveIndex(i)
                }}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'bg-white w-10' : 'bg-white/30 w-4 hover:bg-white/50'
                }`}
                aria-label={`Ver ${benefits[i].title}`}
              />
            ))}
          </div>

          {/* Panel Glassmorphism */}
          <div
            key={activeIndex}
            className="relative rounded-2xl overflow-hidden border border-white/20 backdrop-blur-2xl animate-panel-in shadow-2xl shadow-black/40"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: `0 0 80px -20px hsla(${activeBenefit.glowColor}, 0.2), 0 25px 50px -12px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Brillo superior */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Glow de fondo dinámico */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 30% 0%, hsla(${activeBenefit.glowColor}, 0.4), transparent 50%)`,
              }}
            />

            <div className="relative z-10 p-8 sm:p-10">
              {/* Header del panel */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div className="flex items-start gap-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20 shadow-lg"
                    style={{ background: `linear-gradient(135deg, hsla(${activeBenefit.glowColor}, 0.25), hsla(${activeBenefit.glowColor}, 0.08))` }}
                  >
                    <ActiveIcon size={32} className="drop-shadow" style={{ color: `hsl(${activeBenefit.glowColor})` }} />
                  </div>

                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow"
                        style={{ color: `hsl(${activeBenefit.glowColor})` }}
                      >
                        {activeBenefit.stat}
                      </span>
                      <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase">
                        {activeBenefit.statLabel}
                      </span>
                    </div>
                    <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight drop-shadow">
                      {activeBenefit.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl drop-shadow">
                {activeBenefit.longDesc}
              </p>

              {/* Grid: Beneficios + Funcionalidades */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-white/90 text-xs font-bold uppercase tracking-[0.2em] mb-4">Beneficios Clave</h4>
                  <ul className="space-y-3">
                    {activeBenefit.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: `hsl(${activeBenefit.glowColor})` }} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white/90 text-xs font-bold uppercase tracking-[0.2em] mb-4">Métricas</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {activeBenefit.features.map((feature, i) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div
                          key={i}
                          className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 text-center"
                        >
                          <FeatureIcon size={18} className="mx-auto mb-2" style={{ color: `hsl(${activeBenefit.glowColor})` }} />
                          <p className="text-white text-lg font-bold mb-0.5">{feature.value}</p>
                          <p className="text-white/50 text-[10px] uppercase tracking-wider">{feature.label}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Botón de acción */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
                <p className="text-white/50 text-xs">
                  Haz clic en una imagen del carrusel para explorar cada ventaja
                </p>
                <button
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, hsla(${activeBenefit.glowColor}, 0.95), hsla(${activeBenefit.glowColor}, 0.75))`,
                    color: '#0a0a0f',
                    boxShadow: `0 0 40px -5px hsla(${activeBenefit.glowColor}, 0.5), 0 10px 25px -5px rgba(0,0,0,0.3)`,
                  }}
                >
                  {activeBenefit.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes panel-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-panel-in {
          animation: panel-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
      `}</style>
    </section>
  )
}