import { motion, type Variants } from 'framer-motion'
import { Database, FolderOpen, Image, BarChart3, Download, AlertTriangle, RefreshCw, Activity } from 'lucide-react'
import { useDatasetData } from '../hooks/useDatasetData'
import { STATIC_DATASET_STATS } from '../services/kaggleApi'

// Variantes de animación para fade-in
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Componente para animar números (contador)
function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

interface DatasetCardProps {
  label: string
  title: string
  description: string
  totalImages: number
  pneumoniaCount: number
  normalCount: number
  pneumoniaPercent: number
  normalPercent: number
  split: 'train' | 'val' | 'test'
  delay: number
}

function DatasetCard({ label, title, description, totalImages, pneumoniaCount, normalCount, pneumoniaPercent, normalPercent, split, delay }: DatasetCardProps) {
  return (
    <motion.div
      className="group [background:linear-gradient(#0f172a,#0f172a)_padding-box,linear-gradient(45deg,#1e293b,#47556980,#1e293b)_border-box] relative rounded-2xl border border-transparent overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="relative">
        <div className="px-6 py-5 relative z-10 bg-[#0f172a]">
          <div className="font-serif text-lg text-indigo-500 italic mb-1">{label}</div>
          <div className="text-lg font-bold text-slate-200 mb-1">{title}</div>
          <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>

        <div className="relative h-[240px] w-full bg-[#0f172a] group-hover:-translate-y-2 transition-transform duration-500 ease-in-out">
          <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center p-6">
            {split === 'train' && (
              <div className="w-full h-full flex items-end justify-between gap-3 pb-4 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-4">
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                </div>
                {[0.6, 0.3, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-gradient-to-t from-indigo-950 to-indigo-600 rounded-t-sm"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h * 80}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: delay + i * 0.1 }}
                  />
                ))}
              </div>
            )}

            {split === 'val' && (
              <div className="w-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[240px] bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center gap-4">
                  <div className="flex gap-2 w-full justify-center opacity-30">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-slate-400"></div>)}
                  </div>
                  <div className="text-slate-400 text-xs font-medium tracking-widest uppercase">Enter Pin</div>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="w-10 h-10 bg-slate-900 border border-slate-700 rounded shadow-inner"></div>
                    ))}
                  </div>
                  <div className="flex gap-2 w-full justify-center opacity-30">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-slate-400"></div>)}
                  </div>
                </div>
              </div>
            )}

            {split === 'test' && (
              <div className="w-full h-full flex flex-col justify-center relative px-2">
                <div className="mb-4 space-y-1">
                  <div className="text-slate-500 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span> {totalImages} Total
                  </div>
                  <div className="text-slate-500 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30"></span> {normalCount} Normal
                  </div>
                </div>
                <div className="relative h-24 w-full">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                    <path d="M 0 80 L 50 60 L 100 70 L 150 30 L 200 50 L 250 20 L 300 40" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
                    <path d="M 0 90 L 50 75 L 100 80 L 150 50 L 200 60 L 250 40 L 300 55" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.3" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center p-6">
            {split === 'train' && (
              <div className="w-full h-full flex items-end justify-between gap-3 pb-4 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-4">
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                </div>
                {[0.6, 0.3, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                  <div key={i} className="relative w-full group/bar cursor-pointer">
                    <motion.div
                      className="w-full bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t-sm shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h * 80}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: delay + i * 0.1 }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[10px] whitespace-nowrap z-20 pointer-events-none shadow-xl">
                      <div className="text-white font-bold">${pneumoniaCount}</div>
                      <div className="text-red-400">↓ {normalPercent}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {split === 'val' && (
              <div className="w-full flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[240px] bg-slate-800/60 border border-slate-600 rounded-xl p-6 flex flex-col items-center gap-4 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  <div className="flex gap-2 w-full justify-center opacity-50">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-indigo-400"></div>)}
                  </div>
                  <div className="text-indigo-300 text-xs font-medium tracking-widest uppercase">Enter Pin</div>
                  <div className="flex gap-3">
                    {[4, 7, 4, 9].map((val, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 bg-slate-900 border border-indigo-500/50 rounded flex items-center justify-center text-white font-mono text-lg shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: delay + i * 0.1 }}
                      >
                        {val}
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-2 w-full justify-center opacity-50">
                    {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-indigo-400"></div>)}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-12 bg-indigo-500/30 blur-xl rounded-full"></div>
                </div>
              </div>
            )}

            {split === 'test' && (
              <div className="w-full h-full flex flex-col justify-center relative px-2">
                <div className="mb-4 space-y-1">
                  <div className="text-slate-300 text-xs flex items-center gap-2 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> 124K Visitors
                  </div>
                  <div className="text-slate-400 text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span> 99K New Users
                  </div>
                </div>
                <div className="relative h-24 w-full">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-700"></div>
                  </div>
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                    <motion.path
                      d="M 0 80 L 50 60 L 100 70 L 150 30 L 200 50 L 250 20 L 300 40"
                      fill="none" stroke="#818cf8" strokeWidth="2"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                    />
                    <motion.path
                      d="M 0 90 L 50 75 L 100 80 L 150 50 L 200 60 L 250 40 L 300 55"
                      fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                    />
                  </svg>
                  <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full border border-slate-900 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[10px] whitespace-nowrap shadow-xl">
                      <div className="text-white font-bold">{pneumoniaPercent}% Pneumonia</div>
                      <div className="text-red-400 flex items-center gap-1 justify-end">↓ {normalPercent}%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DatasetAnalysisSection() {
  const { stats, metadata, loading, error, refetch } = useDatasetData()
  
  // Usar datos estáticos como fallback mientras carga
  const displayStats = stats || STATIC_DATASET_STATS
  const displayMetadata = metadata || {
    format: 'JPEG',
    type: 'Escala de grises',
    resolution: '~1000×1000 px',
    modelResize: '224 × 224 px',
    totalImages: 5856,
    classes: '2 (Normal / Neumonía)',
    origin: 'Guangzhou Women and Children\'s Medical Center',
    patientAges: 'Pacientes pediátricos',
    clinicalLabel: 'Consulta para detección de neumonía por imagen',
    url: 'kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
    source: 'Radiografías de tórax pediátricas públicas de Kaggle.',
  }

  const datasetSplits = [
    { 
      label: 'Entrenamiento', 
      normal: displayStats.train.normal, 
      pneumonia: displayStats.train.pneumonia, 
      total: displayStats.train.total 
    },
    { 
      label: 'Validación', 
      normal: displayStats.validation.normal, 
      pneumonia: displayStats.validation.pneumonia, 
      total: displayStats.validation.total 
    },
    { 
      label: 'Test', 
      normal: displayStats.test.normal, 
      pneumonia: displayStats.test.pneumonia, 
      total: displayStats.test.total 
    },
  ]

  const characteristics = [
    { label: 'Formato', value: displayMetadata.format },
    { label: 'Tipo', value: displayMetadata.type },
    { label: 'Resolución variable', value: displayMetadata.resolution },
    { label: 'Resize para modelo', value: displayMetadata.modelResize },
    { label: 'Origen', value: displayMetadata.origin },
    { label: 'Pacientes', value: displayMetadata.patientAges },
    { label: 'Total imágenes', value: displayStats.totalImages.toLocaleString() },
    { label: 'Clases', value: displayMetadata.classes },
  ]

  const definitions = [
    { label: 'Normal', value: 'Radiografías con apariencia pulmonar dentro de límites normales sin signos de infección.' },
    { label: 'Neumonía', value: 'Imágenes con infiltrados o consolidaciones compatibles con infección pulmonar.' },
    { label: 'Split', value: 'Train/Validation/Test separados para entrenar, ajustar y validar el modelo sin filtración de datos.' },
    { label: 'Class weights', value: 'Pesos de clase aplicados para compensar el desbalance entre Normal y Neumonía.' },
  ]

  return (
    <section id="dataset" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45 z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/5453567-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Fondo con gradiente radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_60%)] z-10" />
      <div className="absolute inset-0 bg-black/35 z-10" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] z-10" />
      
      <div className="relative z-20 max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Database size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 1: Análisis del Dataset</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Chest X-Ray <span className="gradient-text-animated">Pneumonia Dataset</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Conjunto de radiografías de tórax pediátricas públicas de Kaggle, utilizado para entrenar y validar un modelo de detección binaria de neumonía. El dataset incluye imágenes en escala de grises, una división de entrenamiento/validación/prueba y un marcado de clases que permite analizar el desbalance y la robustez clínica.
          </p>
          
          {/* Indicador de carga/error */}
          {loading && (
            <motion.div 
              className="mt-4 flex items-center justify-center gap-2 text-blue-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <RefreshCw size={14} className="animate-spin" />
              <span>Cargando datos del dataset...</span>
            </motion.div>
          )}
          
          {error && (
            <motion.div 
              className="mt-4 flex items-center justify-center gap-2 text-amber-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle size={14} />
              <span>{error} - Usando datos locales</span>
              <button 
                onClick={refetch}
                className="underline hover:text-amber-300"
              >
                Reintentar
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Información General del Análisis */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            className="liquid-glass-heavy rounded-2xl p-8 border border-white/5"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 size={20} className="text-blue-400" />
              </div>
              <h3 className="text-white text-xl font-bold">¿Qué hace esta sección?</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Realiza un desglose cuantitativo y técnico del conjunto de datos, identificando la distribución de clases (Normal vs. Neumonía) en cada subconjunto (Entrenamiento, Validación y Test). Expone parámetros críticos como el formato de imagen, la resolución de entrada y el origen institucional de las radiografías pediátricas.
            </p>
          </motion.div>

          <motion.div 
            className="liquid-glass-heavy rounded-2xl p-8 border border-white/5"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Activity size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-bold">¿Cuál es su uso clínico?</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Esta etapa es fundamental para garantizar la transparencia y confiabilidad del modelo. Permite detectar sesgos algorítmicos (como el desbalance de clases), definir preprocesamientos necesarios (resize a 224×224) y asegurar una evaluación rigurosa del rendimiento sobre casos reales que el sistema nunca ha procesado anteriormente.
            </p>
          </motion.div>
        </motion.div>

        {/* Dataset info card unificado */}
        <motion.div 
          className="relative overflow-hidden liquid-glass-heavy rounded-3xl border border-white/10 p-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/video/5453567-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_45%)]" />
          <div className="relative z-20 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FolderOpen size={18} className="text-blue-400" />
                <div>
                  <h3 className="text-white text-2xl font-bold">Estructura del Dataset</h3>
                  <p className="text-white/40 text-xs mt-1">Integración de datos, splits y definiciones clave dentro de una sola vista de análisis.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {datasetSplits.map((split) => (
                  <motion.div 
                    key={split.label} 
                    className="p-5 rounded-3xl bg-white/[0.08] border border-white/[0.08] backdrop-blur"
                    variants={fadeInUp}
                  >
                    <div className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">{split.label}</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-white/70 text-xs">
                        <span>Normal</span>
                        <span className="text-white font-semibold"><AnimatedNumber value={split.normal} /></span>
                      </div>
                      <div className="flex justify-between text-white/70 text-xs">
                        <span>Neumonía</span>
                        <span className="text-white font-semibold"><AnimatedNumber value={split.pneumonia} /></span>
                      </div>
                      <div className="border-t border-white/[0.08] pt-3 flex justify-between text-white/60 text-[11px] uppercase tracking-[0.2em]">
                        <span>Total</span>
                        <span className="text-white font-bold"><AnimatedNumber value={split.total} /></span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="p-4 rounded-3xl bg-amber-500/[0.12] border border-amber-500/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-amber-300/80 text-xs leading-relaxed">
                  <strong className="text-amber-300">⚠️ Nota:</strong> El dataset muestra un desbalance notorio entre clases. Para el entrenamiento se aplicaron técnicas de augmentación y class weights que mejoran la robustez del modelo frente a la sobre-representación de neumonía.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
              <motion.div 
                className="rounded-3xl bg-white/[0.04] border border-white/[0.08] p-6"
                variants={fadeInUp}
              >
                <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                  <Image size={14} className="text-blue-400" />
                  Características del dataset
                </h4>
                <div className="space-y-3 text-white/70 text-xs leading-relaxed">
                  {characteristics.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between py-2 border-b border-white/[0.06] last:border-0"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <span className="text-white/40">{item.label}</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-6">
                <motion.div 
                  className="rounded-3xl bg-white/[0.04] border border-white/[0.08] p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                    <Database size={14} className="text-emerald-400" />
                    Definiciones clave
                  </h4>
                  <div className="space-y-3 text-white/70 text-xs leading-relaxed">
                    {definitions.map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="py-2 border-b border-white/[0.06] last:border-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <div className="font-semibold text-white text-[11px] uppercase tracking-wider mb-1">{item.label}</div>
                        <div>{item.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-6"
                  variants={fadeInUp}
                >
                  <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                    <Download size={14} className="text-emerald-400" />
                    Fuente
                  </h4>
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/[0.06]">
                    <p className="text-white/50 text-xs font-mono break-all leading-relaxed">
                      {displayMetadata.url}
                    </p>
                  </div>
                  <p className="text-white/30 text-xs mt-3">
                    {displayMetadata.source}
                  </p>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-blue-400" />
                Distribución por split
              </h4>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <DatasetCard
                  label="Training Set"
                  title="5,216 Imágenes"
                  description="Desbalance significativo entre clases, con el 74% de las imágenes de neumonía."
                  totalImages={displayStats.train.total}
                  pneumoniaCount={displayStats.train.pneumonia}
                  normalCount={displayStats.train.normal}
                  pneumoniaPercent={displayStats.pneumoniaPercentage}
                  normalPercent={displayStats.normalPercentage}
                  split="train"
                  delay={0.1}
                />
                <DatasetCard
                  label="Validation Set"
                  title="16 Imágenes"
                  description="Split pequeño y balanceado, ideal para ajuste fino del modelo."
                  totalImages={displayStats.validation.total}
                  pneumoniaCount={displayStats.validation.pneumonia}
                  normalCount={displayStats.validation.normal}
                  pneumoniaPercent={50}
                  normalPercent={50}
                  split="val"
                  delay={0.2}
                />
                <DatasetCard
                  label="Test Set"
                  title="624 Imágenes"
                  description="Evaluación final en un conjunto independiente y realista."
                  totalImages={displayStats.test.total}
                  pneumoniaCount={displayStats.test.pneumonia}
                  normalCount={displayStats.test.normal}
                  pneumoniaPercent={62.5}
                  normalPercent={37.5}
                  split="test"
                  delay={0.3}
                />
              </div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="liquid-glass-card rounded-xl p-4 text-center bg-white/[0.05]">
                  <div className="text-white text-2xl font-black">
                    <AnimatedNumber value={displayStats.totalImages} />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Total Imágenes</div>
                </div>
                <div className="liquid-glass-card rounded-xl p-4 text-center bg-white/[0.05]">
                  <div className="text-red-400 text-2xl font-black">
                    <AnimatedNumber value={displayStats.train.pneumonia + displayStats.validation.pneumonia + displayStats.test.pneumonia} />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Total Neumonía</div>
                </div>
                <div className="liquid-glass-card rounded-xl p-4 text-center bg-white/[0.05]">
                  <div className="text-emerald-400 text-2xl font-black">
                    <AnimatedNumber value={displayStats.train.normal + displayStats.validation.normal + displayStats.test.normal} />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Total Normal</div>
                </div>
                <div className="liquid-glass-card rounded-xl p-4 text-center bg-white/[0.05]">
                  <div className="text-amber-400 text-2xl font-black">{displayStats.imbalanceRatio}:1</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Ratio Desbalance</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
        </motion.div>
      </div>
    </section>
  )
}
