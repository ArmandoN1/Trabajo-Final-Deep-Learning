import { useState, useRef, useCallback } from 'react'
import {
  Upload, CloudUpload, FolderOpen, Trash2, CheckCircle2,
  Stethoscope, Crosshair, ClipboardCheck, Loader2,
  HeartPulse, Bug, Bone, Heart, Info
} from 'lucide-react'

type DiagnosisType = 'neumonia' | 'tuberculosis' | 'fractura' | 'normal'

interface Detection {
  x: number; y: number; w: number; h: number
  label: string; severity: 'danger' | 'warning' | 'success'
  conf: string
}

interface DiagnosisData {
  title: string; sub: string; icon: typeof HeartPulse
  confidence: number; risk: string; priority: string
  riskClass: string; barColor: string; time: string
  probs: Record<string, number>
  rec: string
  detections: Detection[]
}

const diagnosisDB: Record<DiagnosisType, DiagnosisData> = {
  neumonia: {
    title: 'Neumonía Detectada', sub: 'Patrón compatible con neumonía bacteriana',
    icon: HeartPulse, confidence: 87.3, risk: 'Alto', priority: 'Urgente',
    riskClass: 'border-red-400/40 bg-red-500/[0.04]',
    barColor: 'bg-gradient-to-r from-red-600 to-red-400', time: '1.8s',
    probs: { neumonia: 87.3, tb: 8.1, fractura: 1.2, normal: 3.4 },
    rec: 'Se detectan opacidades alveolares compatibles con neumonía bacteriana. Se recomienda evaluación clínica urgente por neumólogo, hemograma completo y PCR. Control en 48-72 horas.',
    detections: [
      { x: 55, y: 40, w: 35, h: 40, label: 'Opacidad alveolar', severity: 'danger', conf: '87.3%' },
      { x: 40, y: 58, w: 20, h: 22, label: 'Infiltrado', severity: 'warning', conf: '62.1%' },
    ],
  },
  tuberculosis: {
    title: 'Tuberculosis Sospechada', sub: 'Hallazgos sugestivos de TB pulmonar',
    icon: Bug, confidence: 73.6, risk: 'Alto', priority: 'Urgente',
    riskClass: 'border-red-400/40 bg-red-500/[0.04]',
    barColor: 'bg-gradient-to-r from-red-600 to-red-400', time: '2.1s',
    probs: { neumonia: 14.2, tb: 73.6, fractura: 0.8, normal: 11.4 },
    rec: 'Se identifican infiltrados apicales y posibles cavitaciones. Se recomienda aislamiento respiratorio, baciloscopia seriada y derivación a programa TB.',
    detections: [
      { x: 22, y: 8, w: 30, h: 30, label: 'Infiltrado apical', severity: 'danger', conf: '73.6%' },
      { x: 52, y: 12, w: 25, h: 25, label: 'Cavitación', severity: 'warning', conf: '58.4%' },
      { x: 35, y: 52, w: 15, h: 15, label: 'Nódulo', severity: 'warning', conf: '42.1%' },
    ],
  },
  fractura: {
    title: 'Fractura Ósea Detectada', sub: 'Línea de fractura identificada',
    icon: Bone, confidence: 91.2, risk: 'Medio', priority: 'Prioridad Media',
    riskClass: 'border-amber-400/40 bg-amber-500/[0.04]',
    barColor: 'bg-gradient-to-r from-amber-600 to-amber-400', time: '1.5s',
    probs: { neumonia: 1.5, tb: 0.8, fractura: 91.2, normal: 6.5 },
    rec: 'Se identifica línea de fractura con posible desplazamiento. Evaluación por traumatología e inmovilización provisional recomendadas.',
    detections: [
      { x: 38, y: 32, w: 32, h: 36, label: 'Línea de fractura', severity: 'danger', conf: '91.2%' },
      { x: 33, y: 48, w: 16, h: 20, label: 'Desplazamiento', severity: 'warning', conf: '67.8%' },
    ],
  },
  normal: {
    title: 'Resultado Normal', sub: 'Sin anomalías significativas',
    icon: Heart, confidence: 95.8, risk: 'Bajo', priority: 'Rutina',
    riskClass: 'border-emerald-400/40 bg-emerald-500/[0.04]',
    barColor: 'bg-gradient-to-r from-emerald-600 to-emerald-400', time: '1.2s',
    probs: { neumonia: 1.8, tb: 0.9, fractura: 1.5, normal: 95.8 },
    rec: 'No se identifican hallazgos patológicos. Campos pulmonares limpios, silueta cardíaca normal. Correlación clínica habitual.',
    detections: [],
  },
}

const sampleButtons: { type: DiagnosisType; icon: typeof HeartPulse; label: string }[] = [
  { type: 'neumonia', icon: HeartPulse, label: 'Neumonía' },
  { type: 'tuberculosis', icon: Bug, label: 'Tuberculosis' },
  { type: 'fractura', icon: Bone, label: 'Fractura' },
  { type: 'normal', icon: Heart, label: 'Normal' },
]

const stages = [
  'Leyendo imagen cargada...', 'Redimensionando a 224×224px...',
  'Normalizando píxeles...', 'Preprocesamiento...', 'Ejecutando CNN ResNet50...',
  'Analizando regiones...', 'Calculando probabilidades...',
  'Marcando zonas detectadas...', '✓ Análisis completado',
]

const probColors: Record<string, string> = {
  neumonia: 'bg-gradient-to-r from-red-600 to-red-400',
  tb: 'bg-gradient-to-r from-amber-600 to-amber-400',
  fractura: 'bg-gradient-to-r from-purple-600 to-purple-400',
  normal: 'bg-gradient-to-r from-emerald-600 to-emerald-400',
}

export default function DemoSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [fileDims, setFileDims] = useState('')
  const [selectedType, setSelectedType] = useState<DiagnosisType | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState('')
  const [result, setResult] = useState<DiagnosisData | null>(null)
  const [showDetections, setShowDetections] = useState(false)
  const [showRequireMsg, setShowRequireMsg] = useState(false)
  const [showScanLine, setShowScanLine] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const loadImage = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      const img = new Image()
      img.onload = () => {
        setImageSrc(src)
        setFileName(file.name)
        setFileSize(formatSize(file.size))
        setFileDims(`${img.naturalWidth} × ${img.naturalHeight}`)
        setImageLoaded(true)
        setShowRequireMsg(false)
        setResult(null)
        setSelectedType(null)
        setShowDetections(false)
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const removeImage = () => {
    setImageLoaded(false)
    setImageSrc('')
    setResult(null)
    setSelectedType(null)
    setShowDetections(false)
    setAnalyzing(false)
    setShowScanLine(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSampleClick = (type: DiagnosisType) => {
    if (!imageLoaded) {
      setShowRequireMsg(true)
      setTimeout(() => setShowRequireMsg(false), 4000)
      return
    }
    setSelectedType(type)
    runAnalysis(type)
  }

  const runAnalysis = (type: DiagnosisType) => {
    const data = diagnosisDB[type]
    if (intervalRef.current) clearInterval(intervalRef.current)

    setAnalyzing(true)
    setResult(null)
    setShowDetections(false)
    setProgress(0)
    setProgressText(stages[0])
    setShowScanLine(true)

    let si = 0
    const pcts = [10, 22, 38, 52, 65, 78, 88, 95, 100]
    intervalRef.current = setInterval(() => {
      if (si < stages.length) {
        setProgress(pcts[si])
        setProgressText(stages[si])
        si++
      }
      if (si >= stages.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimeout(() => {
          setShowScanLine(false)
          setAnalyzing(false)
          setResult(data)
          setTimeout(() => setShowDetections(true), 200)
        }, 400)
      }
    }, 300)
  }

  const sevColors = {
    danger: { border: 'border-red-400', bg: 'bg-red-500/10', shadow: 'shadow-red-500/20', label: 'bg-red-500' },
    warning: { border: 'border-amber-400', bg: 'bg-amber-500/10', shadow: 'shadow-amber-500/20', label: 'bg-amber-600' },
    success: { border: 'border-emerald-400', bg: 'bg-emerald-500/10', shadow: 'shadow-emerald-500/20', label: 'bg-emerald-600' },
  }

  return (
    <section id="demo" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04),transparent_60%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Stethoscope size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Demostración Interactiva</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Simulación del <span className="gradient-text-animated">Análisis Diagnóstico</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Suba una imagen médica real, luego seleccione el tipo de diagnóstico a simular.
            El sistema mostrará la imagen con las zonas afectadas marcadas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Upload panel */}
          <div className="liquid-glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-2.5">
              <Upload size={16} className="text-blue-400" />
              <h3 className="text-white text-sm font-bold">Cargar Imagen Médica</h3>
            </div>

            {/* Upload zone */}
            {!imageLoaded && (
              <div
                className={`m-5 p-12 text-center border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                  dragOver ? 'border-blue-400 bg-blue-500/[0.04] scale-[1.01]' : 'border-white/10 hover:border-blue-400/50 hover:bg-white/[0.01]'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]) }}
              >
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5 transition-transform hover:scale-105">
                  <CloudUpload size={36} className="text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Arrastra tu imagen aquí</h3>
                <p className="text-white/40 text-sm mb-5">o haz clic para seleccionar</p>
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  className="bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-500 transition-colors inline-flex items-center gap-2"
                >
                  <FolderOpen size={14} /> Seleccionar Imagen
                </button>
                <p className="text-white/25 text-xs mt-4">Formatos: JPG, PNG, BMP · Máx. 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) loadImage(e.target.files[0]) }}
                />
              </div>
            )}

            {/* Image preview */}
            {imageLoaded && (
              <div className="m-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Imagen Cargada
                  </h4>
                  <button onClick={removeImage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors">
                    <Trash2 size={12} /> Eliminar
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black">
                  <img src={imageSrc} alt="Imagen médica" className="w-full h-auto max-h-[400px] object-contain" />
                  {/* Scan line */}
                  {showScanLine && (
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent scan-line-active z-20" style={{ boxShadow: '0 0 15px rgba(96,165,250,0.6)' }} />
                  )}
                  {/* Detection boxes */}
                  {showDetections && result?.detections.map((det, i) => {
                    const sc = sevColors[det.severity]
                    return (
                      <div
                        key={i}
                        className={`detection-box absolute border-2 rounded-lg ${sc.border} ${sc.bg} shadow-lg ${sc.shadow}`}
                        style={{
                          left: `${det.x}%`, top: `${det.y}%`,
                          width: `${det.w}%`, height: `${det.h}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        <div className={`absolute -top-6 left-0 ${sc.label} text-white text-[10px] font-bold px-2 py-0.5 rounded-t-md flex items-center gap-1 whitespace-nowrap`}>
                          <Crosshair size={8} /> {det.label} ({det.conf})
                        </div>
                        {/* Corners */}
                        <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${sc.border}`} />
                        <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${sc.border}`} />
                        <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${sc.border}`} />
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${sc.border}`} />
                      </div>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { icon: '📄', text: fileName },
                    { icon: '⚖️', text: fileSize },
                    { icon: '📐', text: fileDims },
                  ].map((info) => (
                    <span key={info.text} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-medium flex items-center gap-1.5">
                      {info.icon} {info.text}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sample buttons */}
            <div className="px-5 pb-5">
              <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                <Stethoscope size={14} className="text-blue-400" /> Seleccionar Diagnóstico
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleButtons.map((s) => {
                  const Icon = s.icon
                  return (
                    <button
                      key={s.type}
                      onClick={() => handleSampleClick(s.type)}
                      className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all text-center ${
                        selectedType === s.type
                          ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]'
                          : 'border-white/[0.06] hover:border-blue-400/40 hover:bg-white/[0.02] hover:-translate-y-1'
                      }`}
                    >
                      <Icon size={24} className={selectedType === s.type ? 'text-blue-400' : 'text-white/30'} />
                      <span className="text-xs font-bold text-white/60">{s.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Require message */}
              {showRequireMsg && (
                <div className="mt-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold flex items-center gap-2">
                  <Info size={16} /> Primero suba una imagen médica para realizar el análisis.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="min-h-[500px]">
            {!result && !analyzing && (
              <div className="liquid-glass-card rounded-2xl p-16 text-center">
                <div className="w-24 h-24 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-6">
                  <Stethoscope size={40} className="text-white/15" />
                </div>
                <h3 className="text-white/30 text-lg font-bold mb-2">Esperando imagen y diagnóstico</h3>
                <p className="text-white/20 text-sm max-w-xs mx-auto">
                  Suba una imagen y seleccione un diagnóstico para ver los resultados del análisis con IA
                </p>
              </div>
            )}

            {(analyzing || result) && (
              <div>
                <div className="liquid-glass-card rounded-t-2xl px-6 py-4 flex items-center justify-between">
                  <h3 className="text-white text-sm font-bold flex items-center gap-2">
                    <Stethoscope size={14} className="text-blue-400" /> Resultado del Análisis
                  </h3>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    analyzing ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {analyzing ? <><Loader2 size={12} className="animate-spin" /> Analizando...</> : <><CheckCircle2 size={12} /> Completado</>}
                  </span>
                </div>

                <div className="liquid-glass-card rounded-b-2xl rounded-t-none border-t-0 p-6">
                  {/* Progress */}
                  {analyzing && (
                    <div className="mb-6">
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-white/40 text-xs text-right font-medium">{progressText}</p>
                    </div>
                  )}

                  {result && (
                    <>
                      {/* Diagnosis box */}
                      <div className={`border-2 rounded-2xl p-6 mb-5 ${result.riskClass}`}>
                        <div className="flex items-center gap-3 mb-5">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            result.risk === 'Alto' ? 'bg-red-500/15 text-red-400' : result.risk === 'Medio' ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'
                          }`}>
                            <result.icon size={22} />
                          </div>
                          <div>
                            <h4 className="text-white font-black text-lg">{result.title}</h4>
                            <p className="text-white/40 text-xs">{result.sub}</p>
                          </div>
                        </div>

                        {/* Confidence */}
                        <div className="mb-5">
                          <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-white/60">Confianza del Modelo</span>
                            <span className="text-white/80">{result.confidence}%</span>
                          </div>
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${result.barColor} transition-all duration-1000`} style={{ width: `${result.confidence}%` }} />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {[
                            { label: 'Nivel de Riesgo', value: result.risk },
                            { label: 'Prioridad', value: result.priority },
                            { label: 'Tiempo', value: result.time },
                            { label: 'Modelo', value: 'CNN ResNet50 v2.1' },
                          ].map((d) => (
                            <div key={d.label} className="p-3 rounded-xl bg-white/[0.05]">
                              <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{d.label}</div>
                              <div className="text-white text-sm font-bold mt-0.5">{d.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Probabilities */}
                        <h5 className="text-white/60 text-xs font-bold mb-3">Probabilidades por Categoría</h5>
                        <div className="space-y-2.5">
                          {[
                            { key: 'neumonia', label: 'Neumonía' },
                            { key: 'tb', label: 'Tuberculosis' },
                            { key: 'fractura', label: 'Fractura' },
                            { key: 'normal', label: 'Normal' },
                          ].map((p) => (
                            <div key={p.key} className="flex items-center gap-3">
                              <span className="w-20 text-xs font-semibold text-white/40 flex-shrink-0">{p.label}</span>
                              <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${probColors[p.key]} transition-all duration-1000`} style={{ width: `${result.probs[p.key]}%` }} />
                              </div>
                              <span className="w-10 text-xs font-bold text-white/50 text-right">{result.probs[p.key]}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="rounded-xl p-5 bg-blue-500/[0.06] border border-blue-500/15">
                        <h4 className="text-blue-300 text-sm font-bold mb-2 flex items-center gap-2">
                          <ClipboardCheck size={14} /> Recomendación Médica Preliminar
                        </h4>
                        <p className="text-blue-200/60 text-sm leading-relaxed">{result.rec}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}