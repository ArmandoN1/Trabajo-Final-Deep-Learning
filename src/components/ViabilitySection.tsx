import { Scale, TrendingUp, TrendingDown, DollarSign, Clock, Users } from 'lucide-react'

export default function ViabilitySection() {
  return (
    <section id="viabilidad" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Scale size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Evidencia 5: Viabilidad</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Análisis de <span className="gradient-text-animated">Viabilidad</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before vs After */}
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              Comparativa: Antes vs Después
            </h3>
            <div className="space-y-4">
              {[
                { metric: 'Tiempo de diagnóstico', before: '72 horas', after: '< 2 segundos', improvement: '99.9%' },
                { metric: 'Imágenes/hora por radiólogo', before: '~12', after: '~40 (asistido)', improvement: '+233%' },
                { metric: 'Cola de espera', before: '500+ imágenes', after: '~50 imágenes', improvement: '-90%' },
                { metric: 'Tasa de error por fatiga', before: '~30%', after: '~3.3%', improvement: '-89%' },
                { metric: 'Detección de casos urgentes', before: 'Manual', after: 'Automática', improvement: 'Instantánea' },
              ].map((row) => (
                <div key={row.metric} className="grid grid-cols-4 gap-3 p-3 rounded-xl bg-white/[0.02] items-center">
                  <span className="text-white/50 text-xs font-medium col-span-1">{row.metric}</span>
                  <span className="text-red-400 text-xs font-bold text-center">{row.before}</span>
                  <span className="text-emerald-400 text-xs font-bold text-center">{row.after}</span>
                  <span className="text-blue-400 text-xs font-black text-center">{row.improvement}</span>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-3 text-center">
                <span className="text-white/20 text-[10px] uppercase">Métrica</span>
                <span className="text-red-400/50 text-[10px] uppercase">Sin IA</span>
                <span className="text-emerald-400/50 text-[10px] uppercase">Con IA</span>
                <span className="text-blue-400/50 text-[10px] uppercase">Mejora</span>
              </div>
            </div>
          </div>

          {/* ROI Analysis */}
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <DollarSign size={16} className="text-amber-400" />
              Análisis Costo-Beneficio
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Costo de implementación', value: 'Moderado', desc: 'Infraestructura GPU + desarrollo del sistema', icon: DollarSign, color: 'amber' },
                { label: 'Reducción de errores', value: '-89%', desc: 'Ahorro significativo en re-diagnósticos y tratamientos incorrectos', icon: TrendingDown, color: 'emerald' },
                { label: 'Productividad', value: '+233%', desc: 'Cada radiólogo puede asistir más pacientes por hora', icon: TrendingUp, color: 'blue' },
                { label: 'Tiempo de recuperación', value: '6-12 meses', desc: 'ROI estimado de la inversión inicial', icon: Clock, color: 'purple' },
                { label: 'Satisfacción del paciente', value: '+40%', desc: 'Por reducción en tiempos de espera de resultados', icon: Users, color: 'cyan' },
              ].map((item) => {
                const Icon = item.icon
                const colorClasses: Record<string, string> = {
                  amber: 'bg-amber-500/10 text-amber-400',
                  emerald: 'bg-emerald-500/10 text-emerald-400',
                  blue: 'bg-blue-500/10 text-blue-400',
                  purple: 'bg-purple-500/10 text-purple-400',
                  cyan: 'bg-cyan-500/10 text-cyan-400',
                }
                return (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className={`w-10 h-10 rounded-xl ${colorClasses[item.color].split(' ')[0]} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={colorClasses[item.color].split(' ')[1]} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-bold">{item.label}</span>
                        <span className={`text-sm font-black ${colorClasses[item.color].split(' ')[1]}`}>{item.value}</span>
                      </div>
                      <p className="text-white/30 text-xs">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}