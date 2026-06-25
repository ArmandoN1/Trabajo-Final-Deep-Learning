import { useState, useEffect, useRef } from 'react'
import { Brain, Layers, Eye, Shrink, Binary, BarChart, Info, Code, Zap, Target, Cpu, ArrowRight } from 'lucide-react'

interface CNNLayer {
  num: string
  icon: typeof Brain
  name: string
  shortDesc: string
  detail: string
  color: string
  fullDescription: string
  technicalDetails: { label: string; value: string }[]
  purpose: string
  codeSnippet: string
  whyImportant: string
  outputShape: string
  cardImage: string         // ← NUEVO: Imagen para la tarjeta 3D
  backgroundImage: string   // ← Imagen para el fondo de toda la sección
  category: string
}

// ============================================================
// 8 CATEGORÍAS CON SUS IMÁGENES DE FONDO TEMÁTICAS
// ============================================================
const cnnLayers: CNNLayer[] = [
  {
    num: '01',
    icon: Eye,
    name: 'Input Layer',
    shortDesc: 'Imagen RGB redimensionada',
    detail: '224 × 224 × 3',
    color: 'blue',
    category: 'INPUT',
    outputShape: '(None, 224, 224, 3)',
    // 🎴 TARJETA: Radiografía / X-Ray médico
    cardImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Hospital / Quirófano abstracto
    backgroundImage: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'La capa de entrada recibe las imágenes radiológicas preprocesadas. Cada imagen es redimensionada a 224×224 píxeles con 3 canales de color (RGB) para ser compatible con la arquitectura ResNet50.',
    technicalDetails: [
      { label: 'Dimensiones', value: '224 × 224 × 3' },
      { label: 'Formato', value: 'Tensor RGB' },
      { label: 'Tipo de dato', value: 'float32' },
      { label: 'Rango', value: '[0, 1]' },
    ],
    purpose: 'Recibir y estandarizar las imágenes médicas en un formato uniforme procesable por la red neuronal.',
    codeSnippet: `input_layer = layers.Input(
    shape=(224, 224, 3),
    name='input_xray'
)`,
    whyImportant: 'Sin una capa de entrada estandarizada, el modelo no podría procesar imágenes de diferentes tamaños. La normalización a [0,1] mejora la convergencia del entrenamiento.',
  },
  {
    num: '02',
    icon: Brain,
    name: 'ResNet50 Base',
    shortDesc: 'Transfer Learning (ImageNet)',
    detail: '~23M parámetros',
    color: 'purple',
    category: 'CONVOLUTIONAL',
    outputShape: '(None, 7, 7, 2048)',
    // 🎴 TARJETA: Red neuronal AI / Brain
    cardImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Galaxia / Nebulosa cósmica púrpura
    backgroundImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'ResNet50 es el corazón del modelo. Una red de 50 capas con conexiones residuales pre-entrenada en ImageNet (1.2M imágenes). Aprovechamos Transfer Learning para detectar patrones complejos sin entrenar desde cero.',
    technicalDetails: [
      { label: 'Arquitectura', value: 'ResNet50' },
      { label: 'Pre-entrenamiento', value: 'ImageNet 1.2M' },
      { label: 'Parámetros', value: '~23.5M' },
      { label: 'Conexiones', value: 'Residuales' },
    ],
    purpose: 'Extraer características visuales de alto nivel de las radiografías sin entrenar millones de parámetros desde cero.',
    codeSnippet: `base_model = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)
base_model.trainable = False`,
    whyImportant: 'Transfer Learning permite obtener 96.7% accuracy con solo 5,856 imágenes, cuando normalmente se necesitarían millones.',
  },
  {
    num: '03',
    icon: Shrink,
    name: 'Global Avg Pooling',
    shortDesc: 'Reducción dimensional',
    detail: '2048 → 1D',
    color: 'cyan',
    category: 'POOLING',
    outputShape: '(None, 2048)',
    // 🎴 TARJETA: Análisis de datos
    cardImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Océano profundo cyan / Aurora boreal
    backgroundImage: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Reduce drásticamente la dimensionalidad del tensor de salida. Promedia cada mapa de características conservando información crucial mientras reduce parámetros.',
    technicalDetails: [
      { label: 'Entrada', value: '7 × 7 × 2048' },
      { label: 'Salida', value: '2048 (1D)' },
      { label: 'Operación', value: 'Promedio espacial' },
      { label: 'Parámetros', value: '0' },
    ],
    purpose: 'Reducir parámetros y prevenir overfitting al convertir mapas en un vector compacto.',
    codeSnippet: `gap = layers.GlobalAveragePooling2D()(
    base_model.output
)`,
    whyImportant: 'Reduce de 100,352 parámetros (Flatten) a solo 2,048, evitando overfitting sin perder información.',
  },
  {
    num: '04',
    icon: Layers,
    name: 'Dense 512 + ReLU',
    shortDesc: 'Capa fully connected',
    detail: '512 neuronas',
    color: 'emerald',
    category: 'DENSE',
    outputShape: '(None, 512)',
    // 🎴 TARJETA: Red neuronal conexiones
    cardImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Bosque verde místico / Bambú
    backgroundImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Primera capa densa con 512 neuronas y activación ReLU. Aprende combinaciones complejas de las características extraídas por ResNet50, adaptándolas al problema específico.',
    technicalDetails: [
      { label: 'Neuronas', value: '512' },
      { label: 'Activación', value: 'ReLU' },
      { label: 'Parámetros', value: '~1.05M' },
      { label: 'Inicialización', value: 'He uniform' },
    ],
    purpose: 'Aprender representaciones específicas del dominio médico para detectar patrones de patologías pulmonares.',
    codeSnippet: `dense_1 = layers.Dense(
    units=512,
    activation='relu'
)(gap)`,
    whyImportant: 'ReLU acelera el entrenamiento y resuelve el vanishing gradient. 512 neuronas proveen capacidad sin sobreajustar.',
  },
  {
    num: '05',
    icon: Binary,
    name: 'Dropout 0.4',
    shortDesc: 'Regularización',
    detail: '40% dropout',
    color: 'amber',
    category: 'REGULARIZATION',
    outputShape: '(None, 512)',
    // 🎴 TARJETA: Código matrix abstracto
    cardImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Desierto dorado / Atardecer naranja
    backgroundImage: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Desactiva aleatoriamente el 40% de las neuronas durante el entrenamiento. Esta técnica previene el overfitting al evitar dependencia de neuronas específicas.',
    technicalDetails: [
      { label: 'Tasa', value: '0.4 (40%)' },
      { label: 'Solo training', value: 'Sí' },
      { label: 'Parámetros', value: '0' },
      { label: 'Aplicado tras', value: 'Dense 512' },
    ],
    purpose: 'Prevenir overfitting forzando representaciones redundantes y robustas, mejorando la generalización.',
    codeSnippet: `dropout_1 = layers.Dropout(
    rate=0.4,
    name='dropout_1'
)(dense_1)`,
    whyImportant: 'Con solo 5,856 imágenes, el overfitting es un riesgo real. Dropout actúa como ensemble implícito.',
  },
  {
    num: '06',
    icon: Layers,
    name: 'Dense 256 + ReLU',
    shortDesc: 'Capa fully connected',
    detail: '256 neuronas',
    color: 'emerald',
    category: 'DENSE',
    outputShape: '(None, 256)',
    // 🎴 TARJETA: Matemáticas / Fórmulas
    cardImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Montañas verdes / Naturaleza
    backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Segunda capa densa con 256 neuronas. Reduce gradualmente la dimensionalidad creando representaciones más abstractas y específicas del problema.',
    technicalDetails: [
      { label: 'Neuronas', value: '256' },
      { label: 'Activación', value: 'ReLU' },
      { label: 'Parámetros', value: '~131K' },
      { label: 'Reducción', value: '512 → 256' },
    ],
    purpose: 'Refinar características aprendidas creando representaciones más compactas y discriminativas.',
    codeSnippet: `dense_2 = layers.Dense(
    units=256,
    activation='relu'
)(dropout_1)`,
    whyImportant: 'La reducción gradual (512→256→1) crea una estructura piramidal que comprime información de manera progresiva.',
  },
  {
    num: '07',
    icon: Binary,
    name: 'Dropout 0.3',
    shortDesc: 'Regularización',
    detail: '30% dropout',
    color: 'amber',
    category: 'REGULARIZATION',
    outputShape: '(None, 256)',
    // 🎴 TARJETA: Circuitos electrónicos
    cardImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Volcán / Lava dorada
    backgroundImage: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Segunda capa de Dropout con tasa del 30%. Refuerza la regularización antes de la capa de salida.',
    technicalDetails: [
      { label: 'Tasa', value: '0.3 (30%)' },
      { label: 'Solo training', value: 'Sí' },
      { label: 'Parámetros', value: '0' },
      { label: 'Aplicado tras', value: 'Dense 256' },
    ],
    purpose: 'Segunda capa de regularización con menor agresividad, manteniendo más información útil.',
    codeSnippet: `dropout_2 = layers.Dropout(
    rate=0.3,
    name='dropout_2'
)(dense_2)`,
    whyImportant: 'Usar tasas decrecientes (0.4 → 0.3) es estrategia común: más regularización al inicio, menos cerca del output.',
  },
  {
    num: '08',
    icon: BarChart,
    name: 'Dense 1 + Sigmoid',
    shortDesc: 'Normal vs Neumonía',
    detail: 'Salida binaria',
    color: 'red',
    category: 'OUTPUT',
    outputShape: '(None, 1)',
    // 🎴 TARJETA: Doctor / Diagnóstico
    cardImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 🖼️ FONDO: Atardecer rojo dramático / Cielo en llamas
    backgroundImage: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85',
    fullDescription: 'Capa de salida con una neurona y activación sigmoid. Produce un valor entre 0 y 1 que representa la probabilidad de neumonía. Threshold de 0.5 para clasificación.',
    technicalDetails: [
      { label: 'Neuronas', value: '1' },
      { label: 'Activación', value: 'Sigmoid' },
      { label: 'Rango', value: '[0, 1]' },
      { label: 'Threshold', value: '0.5' },
    ],
    purpose: 'Generar predicción final: probabilidad de neumonía. 0=Normal, 1=Neumonía.',
    codeSnippet: `output = layers.Dense(
    units=1,
    activation='sigmoid'
)(dropout_2)`,
    whyImportant: 'Sigmoid es ideal para clasificación binaria. La salida es interpretable como probabilidad, permitiendo ajustar threshold según necesidad clínica.',
  },
]

const colorMap: Record<string, { bg: string; text: string; gradient: string; shadow: string; accent: string; glow: string; rgb: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', gradient: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/40', accent: '#60a5fa', glow: 'rgba(96,165,250,0.4)', rgb: '96,165,250' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', gradient: 'from-purple-600 to-purple-400', shadow: 'shadow-purple-500/40', accent: '#c084fc', glow: 'rgba(192,132,252,0.4)', rgb: '192,132,252' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', gradient: 'from-cyan-600 to-cyan-400', shadow: 'shadow-cyan-500/40', accent: '#22d3ee', glow: 'rgba(34,211,238,0.4)', rgb: '34,211,238' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', gradient: 'from-emerald-600 to-emerald-400', shadow: 'shadow-emerald-500/40', accent: '#34d399', glow: 'rgba(52,211,153,0.4)', rgb: '52,211,153' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', gradient: 'from-amber-600 to-amber-400', shadow: 'shadow-amber-500/40', accent: '#fbbf24', glow: 'rgba(251,191,36,0.4)', rgb: '251,191,36' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', gradient: 'from-red-600 to-red-400', shadow: 'shadow-red-500/40', accent: '#f87171', glow: 'rgba(248,113,113,0.4)', rgb: '248,113,113' },
}

export default function CNNArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<number>(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  const [loadedCount, setLoadedCount] = useState<number>(0)
  const currentLayer = cnnLayers[activeLayer]
  const currentColors = colorMap[currentLayer.color]
  const sectionRef = useRef<HTMLElement>(null)

  // ============================================================
  // PRECARGA DE TODAS LAS IMÁGENES (evita parpadeos)
  // ============================================================
  useEffect(() => {
  const preloadImages = async () => {
    // Precargar tanto cardImage como backgroundImage de cada capa
    const allImages = cnnLayers.flatMap((layer) => [layer.cardImage, layer.backgroundImage])
    
    const promises = allImages.map((imageUrl) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => {
          setLoadedCount((prev) => prev + 1)
          resolve()
        }
        img.onerror = () => {
          setLoadedCount((prev) => prev + 1)
          resolve()
        }
      })
    })

    await Promise.all(promises)
    setImagesLoaded(true)
  }

  preloadImages()
}, [])

  // ============================================================
  // PARALLAX EFFECT EN SCROLL (opcional)
  // ============================================================
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = -rect.top / rect.height
        setScrollY(scrollProgress * 50) // Parallax suave
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================================
  // NAVEGACIÓN
  // ============================================================
  const goToPrevious = () => {
    setActiveLayer((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setActiveLayer((prev) => Math.min(cnnLayers.length - 1, prev + 1))
  }

  return (
    <section
      ref={sectionRef}
      id="cnn-arquitectura"
      className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden"
    >
      {/* ============================================================
          🎨 SISTEMA DE FONDOS DINÁMICOS CON PARALLAX + ZOOM
          ============================================================ */}

      {/* CAPA 1: Imágenes de fondo (todas precargadas, solo se muestra la activa) */}
      <div className="absolute inset-0 overflow-hidden">
        {cnnLayers.map((layer, index) => {
          const isActive = activeLayer === index
          return (
            <div
              key={layer.num}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                opacity: isActive ? 1 : 0,
                transitionDuration: '800ms',
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/* Imagen con efecto Ken Burns (zoom lento) + parallax */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${layer.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: `scale(${isActive ? 1.1 : 1.0}) translateY(${scrollY}px)`,
                  transition: 'transform 8000ms ease-out',
                  animation: isActive ? 'kenBurns 20s ease-in-out infinite alternate' : 'none',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* CAPA 2: Overlay oscuro principal (50-70% según preferencia) */}
      <div className="absolute inset-0 bg-gray-950/70 z-[3]" />

      {/* CAPA 3: Gradiente de color dinámico según capa activa */}
      <div
        className="absolute inset-0 z-[4] transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(${currentColors.rgb}, 0.15), transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(${currentColors.rgb}, 0.12), transparent 50%),
            radial-gradient(ellipse at center, rgba(${currentColors.rgb}, 0.06), transparent 70%)
          `,
        }}
      />

      {/* CAPA 4: Gradiente vertical para legibilidad (oscuro arriba/abajo) */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-gray-950/60 via-transparent to-gray-950/80" />

      {/* CAPA 5: Grid pattern sutil */}
      <div
        className="absolute inset-0 z-[6] opacity-[0.04] transition-colors duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(${currentColors.rgb}, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(${currentColors.rgb}, 1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* CAPA 6: Orbes flotantes (efecto bokeh) */}
      <div className="absolute inset-0 z-[7] overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ease-out"
          style={{ background: currentColors.accent, opacity: 0.1 }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ease-out"
          style={{ background: currentColors.accent, opacity: 0.08 }}
        />
      </div>

      {/* ============================================================
          🔄 INDICADOR DE PRECARGA (mientras cargan las imágenes)
          ============================================================ */}
      {!imagesLoaded && (
  <div className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
      <span className="text-white/70 text-xs font-bold">
        Cargando fondos... {loadedCount}/{cnnLayers.length * 2}
      </span>
    </div>
  </div>
)}

      {/* ============================================================
          🎯 CONTENIDO PRINCIPAL (z-index alto para estar sobre fondos)
          ============================================================ */}
      <div className="relative max-w-[1400px] mx-auto px-6 z-20">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Brain size={12} className="text-purple-400" />
            <span className="text-white/80 text-xs font-bold tracking-wider uppercase">Arquitectura CNN</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4 drop-shadow-2xl">
            Red Neuronal <span className="gradient-text-animated">Convolucional</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed drop-shadow-lg">
            Explora cada capa del modelo CNN con visualización interactiva 3D.
            Haz clic en cualquier capa para ver sus detalles.
          </p>

          {/* Indicador de capa actual */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/[0.08]">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: currentColors.accent }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: currentColors.accent }}
              />
            </span>
            <span className="text-white/80 text-xs font-bold tracking-wider">
              EXPLORANDO: <span className="text-white">{currentLayer.name}</span>
            </span>
          </div>
        </div>

        {/* ============================================================
            VISUALIZACIÓN 3D STACK + DETAIL PANEL
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* STACK 3D */}
          <div className="lg:col-span-2 relative" style={{ perspective: '1800px' }}>
            <div className="relative h-[640px] flex items-center justify-center">
              <div className="relative w-full max-w-[360px]" style={{ transformStyle: 'preserve-3d' }}>
                {cnnLayers.map((layer, index) => {
                  const colors = colorMap[layer.color]
                  const Icon = layer.icon
                  const isActive = activeLayer === index
                  const offset = index - activeLayer
                  const absOffset = Math.abs(offset)

                  return (
                    <div
                      key={layer.num}
                      onClick={() => setActiveLayer(index)}
                      className="absolute inset-x-0 cursor-pointer transition-all duration-700 ease-out"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: `
                          translateY(${offset * 24}px)
                          translateZ(${-absOffset * 70}px)
                          rotateX(${offset * -7}deg)
                          scale(${1 - absOffset * 0.07})
                        `,
                        zIndex: cnnLayers.length - absOffset,
                        opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.18,
                        pointerEvents: absOffset > 3 ? 'none' : 'auto',
                      }}
                    >
                      <div
                        className={`relative h-[420px] rounded-3xl overflow-hidden transition-all duration-500 border ${
                          isActive ? 'border-white/20 shadow-2xl' : 'border-white/[0.06]'
                        }`}
                        style={{
                          boxShadow: isActive
                            ? `0 30px 70px -10px ${colors.glow}, 0 0 40px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                            : '0 10px 30px -5px rgba(0,0,0,0.5)',
                        }}
                      >
                        <div
                          className="absolute inset-0 transition-all duration-700"
                          style={{
                            backgroundImage: `url(${layer.cardImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: isActive ? 'saturate(1.1) brightness(0.9)' : 'grayscale(0.7) brightness(0.5)',
                          }}
                        />
                        <div
                          className="absolute inset-0 transition-opacity duration-500"
                          style={{
                            background: isActive
                              ? `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)`
                              : `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.95) 100%)`,
                          }}
                        />
                        {isActive && (
                          <div
                            className="absolute inset-0 mix-blend-overlay opacity-30"
                            style={{ background: `linear-gradient(135deg, ${colors.accent}, transparent)` }}
                          />
                        )}

                        <div className="relative h-full flex flex-col p-6 z-10">
                          <div className="flex items-start justify-between mb-auto">
                            <div className="flex flex-col">
                              <div className={`text-7xl font-thin leading-none transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                                {layer.num}
                              </div>
                              <div className={`text-[10px] font-bold tracking-[0.2em] mt-2 transition-colors ${isActive ? colors.text : 'text-white/30'}`}>
                                {layer.category}
                              </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
                              isActive ? `bg-gradient-to-br ${colors.gradient} shadow-lg` : 'bg-white/10'
                            }`}>
                              <Icon size={16} className="text-white" />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className={`text-2xl font-black leading-tight transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
                              {layer.name}
                            </h3>
                            <p className={`text-xs leading-relaxed transition-colors ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                              {layer.shortDesc}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold backdrop-blur-md transition-all ${
                                isActive ? 'bg-white/20 text-white border border-white/20' : 'bg-white/10 text-white/60'
                              }`}>
                                {layer.detail}
                              </div>
                              {isActive && (
                                <span className={`text-[10px] font-bold tracking-wider ${colors.text}`}>
                                  CAPA {index + 1}/{cnnLayers.length}
                                </span>
                              )}
                            </div>
                          </div>

                          {isActive && (
                            <div className="absolute top-4 right-4">
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: colors.accent }} />
                                <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: colors.accent }} />
                              </span>
                            </div>
                          )}
                        </div>

                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-1" style={{
                            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                            boxShadow: `0 0 20px ${colors.accent}`,
                          }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dots con preview de imagen */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {cnnLayers.map((layer, index) => {
                const colors = colorMap[layer.color]
                const isActive = activeLayer === index
                return (
                  <button
                    key={layer.num}
                    onClick={() => setActiveLayer(index)}
                    className={`transition-all duration-300 rounded-full relative group ${
                      isActive ? 'w-8 h-2' : 'w-2 h-2 hover:scale-125'
                    }`}
                    style={{ backgroundColor: isActive ? colors.accent : 'rgba(255,255,255,0.15)' }}
                    aria-label={`Ver capa ${index + 1}`}
                  >
                    {/* Tooltip con preview de imagen al hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="px-3 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 whitespace-nowrap">
                        <span className="text-white text-[10px] font-bold">{layer.name}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* PANEL DE DETALLES con GLASSMORPHISM MEJORADO */}
          <div className="lg:col-span-3">
            {(() => {
              const layer = cnnLayers[activeLayer]
              const colors = colorMap[layer.color]
              const Icon = layer.icon

              return (
                <div
                  key={activeLayer}
                  className="rounded-3xl p-8 animate-detail-in h-full backdrop-blur-2xl border border-white/[0.08]"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-2xl ${colors.shadow}`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${colors.text}`}>
                        Capa {layer.num} · {layer.category}
                      </div>
                      <h3 className="text-white text-2xl font-black leading-tight">{layer.name}</h3>
                    </div>
                    <div className={`px-4 py-2 rounded-xl ${colors.bg} backdrop-blur-md border border-white/[0.08]`}>
                      <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Output</div>
                      <div className={`text-sm font-mono font-bold ${colors.text}`}>{layer.outputShape}</div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-6">
                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${colors.text}`}>
                      <Info size={12} />
                      ¿Qué es esta capa?
                    </h5>
                    <p className="text-white/70 text-sm leading-relaxed">{layer.fullDescription}</p>
                  </div>

                  {/* Grid info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="p-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                      <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${colors.text}`}>
                        <Target size={12} />
                        Propósito
                      </h5>
                      <p className="text-white/60 text-xs leading-relaxed">{layer.purpose}</p>
                    </div>
                    <div className="p-4 rounded-xl backdrop-blur-md border" style={{ background: `${colors.glow.replace('0.4', '0.12')}`, borderColor: `${colors.glow.replace('0.4', '0.25')}` }}>
                      <h5 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 ${colors.text}`}>
                        <Zap size={12} />
                        Importancia
                      </h5>
                      <p className="text-white/70 text-xs leading-relaxed">{layer.whyImportant}</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="mb-6">
                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${colors.text}`}>
                      <Cpu size={12} />
                      Especificaciones Técnicas
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {layer.technicalDetails.map((detail) => (
                        <div key={detail.label} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                          <span className="text-white/50 text-xs">{detail.label}</span>
                          <span className="text-white text-xs font-bold font-mono">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Código */}
                  <div>
                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${colors.text}`}>
                      <Code size={12} />
                      Implementación
                    </h5>
                    <div className="rounded-xl overflow-hidden border border-white/[0.08]">
                      <div className="px-4 py-2.5 bg-white/[0.04] backdrop-blur-md border-b border-white/[0.06] flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400/80" />
                          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="text-white/50 text-[10px] font-bold font-mono ml-2">layer_{layer.num}.py</span>
                      </div>
                      <div className="p-4 bg-black/60 backdrop-blur-md">
                        <pre className="text-[11px] leading-relaxed text-white/80 font-mono overflow-x-auto">{layer.codeSnippet}</pre>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.08]">
                    <button
                      onClick={goToPrevious}
                      disabled={activeLayer === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white/70 text-sm font-semibold"
                    >
                      <ArrowRight size={14} className="rotate-180" />
                      Anterior
                    </button>
                    <span className="text-white/50 text-xs font-bold">{activeLayer + 1} de {cnnLayers.length}</span>
                    <button
                      onClick={goToNext}
                      disabled={activeLayer === cnnLayers.length - 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${colors.gradient} text-white text-sm font-bold shadow-lg ${colors.shadow} disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105`}
                    >
                      Siguiente
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Info complementaria con glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 backdrop-blur-2xl border border-white/[0.08]"
            style={{ background: 'rgba(15, 23, 42, 0.6)' }}
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Brain size={16} className="text-purple-400" />
              ¿Por qué ResNet50?
            </h3>
            <div className="space-y-3">
              {[
                'Arquitectura probada en competencias de ImageNet',
                'Conexiones residuales para redes más profundas',
                'Transfer Learning: aprovecha 1.2M imágenes pre-entrenadas',
                '~23M parámetros pre-entrenados disponibles',
                'Validada en literatura de imágenes médicas',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/[0.08] backdrop-blur-md border-l-2 border-purple-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-8 backdrop-blur-2xl border border-white/[0.08]"
            style={{ background: 'rgba(15, 23, 42, 0.6)' }}
          >
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-blue-400" />
              Transfer Learning
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Capas congeladas', value: '175', detail: 'ResNet50 base' },
                { label: 'Capas entrenables', value: '4', detail: 'GAP + Dense + Dropout' },
                { label: 'Parámetros totales', value: '~24.1M', detail: '~23.5M congelados' },
                { label: 'Epochs máximos', value: '50', detail: 'Con EarlyStopping' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.06]">
                  <div>
                    <div className="text-white text-sm font-bold">{item.label}</div>
                    <div className="text-white/40 text-xs">{item.detail}</div>
                  </div>
                  <span className="text-blue-400 text-sm font-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          🎬 ANIMACIONES CSS
          ============================================================ */}
      <style>{`
        @keyframes detailIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-detail-in {
          animation: detailIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Efecto Ken Burns - Zoom y movimiento lento */
        @keyframes kenBurns {
          0% {
            transform: scale(1.1) translate(0, 0);
          }
          50% {
            transform: scale(1.15) translate(-1%, -1%);
          }
          100% {
            transform: scale(1.1) translate(1%, 1%);
          }
        }
      `}</style>
    </section>
  )
}