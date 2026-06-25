import { Database, FolderOpen, Image, BarChart3, CheckCircle, Download } from 'lucide-react'

export default function DatasetAnalysisSection() {
  return (
    <section id="dataset" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Database size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 1: Análisis del Dataset</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Chest X-Ray <span className="gradient-text-animated">Pneumonia Dataset</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Conjunto de datos público de Kaggle utilizado para entrenar y validar el modelo de detección de neumonía.
          </p>
        </div>

        {/* Dataset info cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="liquid-glass-heavy rounded-2xl p-8 lg:col-span-2">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <FolderOpen size={16} className="text-blue-400" />
              Estructura del Dataset
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Entrenamiento', normal: '1,341', pneumonia: '3,875', total: '5,216' },
                { label: 'Validación', normal: '8', pneumonia: '8', total: '16' },
                { label: 'Test', normal: '234', pneumonia: '390', total: '624' },
              ].map((split) => (
                <div key={split.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">{split.label}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-emerald-400 text-xs">Normal</span>
                      <span className="text-white text-xs font-bold">{split.normal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-400 text-xs">Neumonía</span>
                      <span className="text-white text-xs font-bold">{split.pneumonia}</span>
                    </div>
                    <div className="border-t border-white/[0.06] pt-2 flex justify-between">
                      <span className="text-white/50 text-xs">Total</span>
                      <span className="text-white text-xs font-black">{split.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/15">
              <p className="text-amber-300/70 text-xs leading-relaxed">
                <strong className="text-amber-300">⚠️ Nota:</strong> El dataset presenta desbalance de clases
                (74.3% neumonía vs 25.7% normal). Se aplicaron técnicas de data augmentation y class weights
                para mitigar este desbalance durante el entrenamiento.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="liquid-glass-card rounded-2xl p-6">
              <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                <Image size={14} className="text-blue-400" />
                Características
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Formato', value: 'JPEG' },
                  { label: 'Tipo', value: 'Escala de grises' },
                  { label: 'Resolución variable', value: '~1000×1000 px' },
                  { label: 'Resize para modelo', value: '224 × 224 px' },
                  { label: 'Total imágenes', value: '5,856' },
                  { label: 'Clases', value: '2 (Normal / Neumonía)' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-white/40 text-xs">{item.label}</span>
                    <span className="text-white text-xs font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="liquid-glass-card rounded-2xl p-6">
              <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                <Download size={14} className="text-emerald-400" />
                Fuente
              </h4>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <p className="text-white/50 text-xs font-mono break-all leading-relaxed">
                  kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia
                </p>
              </div>
              <p className="text-white/30 text-xs mt-3">
                Guangzhou Women and Children's Medical Center — Radiografías de tórax de pacientes pediátricos.
              </p>
            </div>
          </div>
        </div>

        {/* Distribution visual */}
        <div className="liquid-glass-card rounded-2xl p-8">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" />
            Distribución de Clases (Training Set)
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 w-full">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-red-400 text-sm font-bold">Neumonía</span>
                  <span className="text-white text-sm font-black">3,875 (74.3%)</span>
                </div>
                <div className="h-6 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{ width: '74.3%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-emerald-400 text-sm font-bold">Normal</span>
                  <span className="text-white text-sm font-black">1,341 (25.7%)</span>
                </div>
                <div className="h-6 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: '25.7%' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-white text-3xl font-black">5,856</div>
                <div className="text-white/30 text-xs uppercase tracking-wider">Total imágenes</div>
              </div>
              <div className="text-center">
                <div className="text-amber-400 text-3xl font-black">2.9:1</div>
                <div className="text-white/30 text-xs uppercase tracking-wider">Ratio desbalance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}