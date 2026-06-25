import { Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const exampleResults = [
  { id: 'IMG-001', actual: 'Normal', predicted: 'Normal', confidence: 97.2, correct: true },
  { id: 'IMG-042', actual: 'Neumonía', predicted: 'Neumonía', confidence: 94.8, correct: true },
  { id: 'IMG-087', actual: 'Neumonía', predicted: 'Neumonía', confidence: 89.3, correct: true },
  { id: 'IMG-123', actual: 'Normal', predicted: 'Normal', confidence: 96.1, correct: true },
  { id: 'IMG-156', actual: 'Neumonía', predicted: 'Normal', confidence: 52.3, correct: false },
  { id: 'IMG-198', actual: 'Normal', predicted: 'Neumonía', confidence: 61.7, correct: false },
  { id: 'IMG-234', actual: 'Neumonía', predicted: 'Neumonía', confidence: 98.5, correct: true },
  { id: 'IMG-267', actual: 'Normal', predicted: 'Normal', confidence: 93.4, correct: true },
]

export default function ResultsVisualizationSection() {
  return (
    <section id="resultados" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Eye size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 4: Visualización de Resultados</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Predicciones del <span className="gradient-text-animated">Modelo</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Tabla de resultados con ejemplos de predicciones del modelo sobre el conjunto de test,
            mostrando la confianza y la precisión de cada diagnóstico.
          </p>
        </div>

        {/* Results table */}
        <div className="liquid-glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.04]">
            <h3 className="text-white text-sm font-bold">Muestra de Predicciones del Test Set</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['ID Imagen', 'Clase Real', 'Predicción', 'Confianza', 'Resultado'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-white/30 text-xs font-bold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exampleResults.map((r) => (
                  <tr key={r.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white/60 text-sm font-mono">{r.id}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        r.actual === 'Normal' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>{r.actual}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        r.predicted === 'Normal' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>{r.predicted}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${r.confidence > 80 ? 'bg-emerald-500' : r.confidence > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${r.confidence}%` }} />
                        </div>
                        <span className="text-white text-xs font-bold">{r.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {r.correct ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                          <CheckCircle size={14} /> Correcto
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold">
                          <XCircle size={14} /> Error
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-white/[0.01] border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-white/25 text-xs">Mostrando 8 de 624 predicciones del test set</span>
            <span className="text-emerald-400 text-xs font-bold">Tasa de acierto global: 96.7%</span>
          </div>
        </div>
      </div>
    </section>
  )
}