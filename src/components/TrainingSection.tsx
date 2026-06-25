import { TrendingUp, Cpu, Timer, Target, Zap, Settings } from 'lucide-react'

export default function TrainingSection() {
  return (
    <section id="entrenamiento" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(59,130,246,0.03),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <TrendingUp size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 2: Entrenamiento</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Proceso de <span className="gradient-text-animated">Entrenamiento</span>
          </h2>
        </div>

        {/* Training config */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Settings, label: 'Optimizador', value: 'Adam', detail: 'Learning rate: 1e-4', color: 'blue' },
            { icon: Target, label: 'Función de pérdida', value: 'Binary Crossentropy', detail: 'Para clasificación binaria', color: 'red' },
            { icon: Cpu, label: 'Batch Size', value: '32', detail: 'Imágenes por lote', color: 'purple' },
            { icon: Timer, label: 'Epochs', value: '50 (máx)', detail: 'Con EarlyStopping patience=10', color: 'amber' },
            { icon: TrendingUp, label: 'ReduceLROnPlateau', value: 'factor=0.2', detail: 'Patience=5, min_lr=1e-7', color: 'emerald' },
            { icon: Zap, label: 'Class Weights', value: '{0:1.94, 1:0.67}', detail: 'Balance automático de clases', color: 'cyan' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="liquid-glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all">
                <Icon size={20} className="text-blue-400 mb-4" />
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-white text-lg font-black mb-1">{item.value}</div>
                <div className="text-white/25 text-xs">{item.detail}</div>
              </div>
            )
          })}
        </div>

        {/* Training results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6">Resultados del Entrenamiento</h3>
            <div className="space-y-4">
              {[
                { epoch: 'Epoch 1', trainAcc: '78.3%', valAcc: '82.1%', trainLoss: '0.489', valLoss: '0.412' },
                { epoch: 'Epoch 10', trainAcc: '91.2%', valAcc: '89.5%', trainLoss: '0.213', valLoss: '0.267' },
                { epoch: 'Epoch 20', trainAcc: '94.8%', valAcc: '92.3%', trainLoss: '0.132', valLoss: '0.198' },
                { epoch: 'Epoch 30', trainAcc: '96.1%', valAcc: '94.7%', trainLoss: '0.098', valLoss: '0.154' },
                { epoch: 'Epoch 38 ★', trainAcc: '97.2%', valAcc: '96.7%', trainLoss: '0.071', valLoss: '0.112' },
              ].map((row) => (
                <div key={row.epoch} className={`flex items-center gap-4 p-3 rounded-xl ${row.epoch.includes('★') ? 'bg-emerald-500/[0.08] border border-emerald-500/20' : 'bg-white/[0.02]'}`}>
                  <span className={`text-xs font-bold w-24 ${row.epoch.includes('★') ? 'text-emerald-400' : 'text-white/40'}`}>{row.epoch}</span>
                  <div className="flex-1 grid grid-cols-4 gap-2 text-center">
                    <div><div className="text-white/30 text-[9px]">Train Acc</div><div className="text-white text-xs font-bold">{row.trainAcc}</div></div>
                    <div><div className="text-white/30 text-[9px]">Val Acc</div><div className="text-emerald-400 text-xs font-bold">{row.valAcc}</div></div>
                    <div><div className="text-white/30 text-[9px]">Train Loss</div><div className="text-white text-xs font-bold">{row.trainLoss}</div></div>
                    <div><div className="text-white/30 text-[9px]">Val Loss</div><div className="text-amber-400 text-xs font-bold">{row.valLoss}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-emerald-400/60 text-xs mt-4">★ EarlyStopping activado en epoch 38 — mejor modelo restaurado</p>
          </div>

          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6">Curvas de Aprendizaje (Simulación)</h3>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm font-bold">Accuracy</span>
                  <div className="flex gap-4">
                    <span className="text-blue-400 text-xs font-bold flex items-center gap-1">
                      <span className="w-3 h-0.5 bg-blue-400 rounded" /> Train
                    </span>
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <span className="w-3 h-0.5 bg-emerald-400 rounded" /> Validation
                    </span>
                  </div>
                </div>
                <div className="h-24 bg-white/[0.02] rounded-xl border border-white/[0.04] flex items-end p-3 gap-[2px]">
                  {Array.from({ length: 38 }, (_, i) => {
                    const trainH = 30 + (i / 37) * 60 + Math.random() * 5
                    const valH = 28 + (i / 37) * 55 + Math.random() * 8
                    return (
                      <div key={i} className="flex-1 flex flex-col gap-[1px] items-center justify-end h-full">
                        <div className="w-full bg-blue-500/50 rounded-t" style={{ height: `${trainH}%` }} />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm font-bold">Loss</span>
                </div>
                <div className="h-24 bg-white/[0.02] rounded-xl border border-white/[0.04] flex items-end p-3 gap-[2px]">
                  {Array.from({ length: 38 }, (_, i) => {
                    const lossH = 80 - (i / 37) * 65 + Math.random() * 8
                    return (
                      <div key={i} className="flex-1 flex items-end h-full">
                        <div className="w-full bg-red-500/40 rounded-t" style={{ height: `${Math.max(lossH, 10)}%` }} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}