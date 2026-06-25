import { BarChart3, Target, Activity, PieChart, CheckCircle, XCircle } from 'lucide-react'

export default function MetricsSection() {
  return (
    <section id="metricas" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(16,185,129,0.04),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <BarChart3 size={12} className="text-emerald-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 3: Métricas de Evaluación</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Rendimiento del <span className="gradient-text-animated">Modelo CNN</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Evaluación exhaustiva del modelo utilizando el conjunto de test (624 imágenes)
            con múltiples métricas de rendimiento.
          </p>
        </div>

        {/* Main metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Accuracy', value: '96.7%', detail: 'Exactitud global del modelo', width: 96.7, color: 'from-blue-600 to-blue-400' },
            { label: 'Precision', value: '95.2%', detail: 'Valores predichos correctamente', width: 95.2, color: 'from-emerald-600 to-emerald-400' },
            { label: 'Recall (Sensibilidad)', value: '98.1%', detail: 'Casos positivos detectados', width: 98.1, color: 'from-purple-600 to-purple-400' },
            { label: 'F1-Score', value: '96.6%', detail: 'Media armónica P y R', width: 96.6, color: 'from-amber-600 to-amber-400' },
          ].map((m) => (
            <div key={m.label} className="liquid-glass-card rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all">
              <div className={`text-3xl font-black mb-1 bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                {m.value}
              </div>
              <div className="text-white text-sm font-bold mb-1">{m.label}</div>
              <div className="text-white/30 text-xs mb-4">{m.detail}</div>
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.width}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Confusion Matrix & additional metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Confusion Matrix */}
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <PieChart size={16} className="text-blue-400" />
              Matriz de Confusión
            </h3>
            <div className="max-w-xs mx-auto">
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div />
                <div className="text-center text-white/30 text-xs font-bold py-2">Pred: Normal</div>
                <div className="text-center text-white/30 text-xs font-bold py-2">Pred: Neumonía</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="flex items-center justify-end pr-3 text-white/30 text-xs font-bold">Real: Normal</div>
                <div className="p-4 rounded-xl bg-emerald-500/10 text-center">
                  <div className="text-emerald-400 text-2xl font-black">221</div>
                  <div className="text-emerald-400/50 text-[10px] mt-1">Verdadero Neg.</div>
                </div>
                <div className="p-4 rounded-xl bg-red-500/10 text-center">
                  <div className="text-red-400 text-2xl font-black">13</div>
                  <div className="text-red-400/50 text-[10px] mt-1">Falso Pos.</div>
                </div>
                <div className="flex items-center justify-end pr-3 text-white/30 text-xs font-bold">Real: Neumonía</div>
                <div className="p-4 rounded-xl bg-amber-500/10 text-center">
                  <div className="text-amber-400 text-2xl font-black">7</div>
                  <div className="text-amber-400/50 text-[10px] mt-1">Falso Neg.</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 text-center">
                  <div className="text-blue-400 text-2xl font-black">383</div>
                  <div className="text-blue-400/50 text-[10px] mt-1">Verdadero Pos.</div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/15">
              <p className="text-emerald-300/60 text-xs leading-relaxed">
                <strong className="text-emerald-300">Resultado:</strong> El modelo identifica correctamente el 98.1% de los
                casos de neumonía (solo 7 falsos negativos de 390), lo cual es crucial en diagnóstico médico donde
                no detectar una enfermedad es más peligroso que una falsa alarma.
              </p>
            </div>
          </div>

          {/* Additional metrics */}
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Activity size={16} className="text-blue-400" />
              Métricas Adicionales
            </h3>
            <div className="space-y-4">
              {[
                { label: 'AUC-ROC', value: '0.987', desc: 'Área bajo la curva ROC — Excelente capacidad discriminativa', color: 'text-blue-400' },
                { label: 'Especificidad', value: '94.4%', desc: '221/(221+13) — Correctos entre los negativos reales', color: 'text-emerald-400' },
                { label: 'NPV (Valor Pred. Neg.)', value: '96.9%', desc: '221/(221+7) — Fiabilidad de los resultados negativos', color: 'text-purple-400' },
                { label: 'PPV (Valor Pred. Pos.)', value: '96.7%', desc: '383/(383+13) — Fiabilidad de los resultados positivos', color: 'text-amber-400' },
                { label: 'Total test evaluado', value: '624 imágenes', desc: '234 Normal + 390 Neumonía del test set', color: 'text-white/60' },
              ].map((m) => (
                <div key={m.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-bold">{m.label}</span>
                      <span className={`text-sm font-black ${m.color}`}>{m.value}</span>
                    </div>
                    <p className="text-white/30 text-xs">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}