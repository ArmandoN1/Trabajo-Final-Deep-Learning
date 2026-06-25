import { Activity, BedDouble, Stethoscope, Clock, UserX, TrendingDown, AlertOctagon, HeartCrack } from 'lucide-react'

const detailedStats = [
  { icon: Activity, label: 'Pacientes diarios en radiología', value: '320', detail: 'Promedio mensual: 9,600', color: 'blue' },
  { icon: BedDouble, label: 'Camas hospitalarias totales', value: '450', detail: 'Ocupación promedio: 87%', color: 'emerald' },
  { icon: Stethoscope, label: 'Radiólogos disponibles', value: '6', detail: 'Ratio: 1:1,500 imágenes/mes', color: 'amber' },
  { icon: Clock, label: 'Tiempo promedio de diagnóstico', value: '72h', detail: 'Estándar recomendado: <24h', color: 'red' },
  { icon: UserX, label: 'Tasa de error por fatiga', value: '~30%', detail: 'En turnos superiores a 10 horas', color: 'red' },
  { icon: TrendingDown, label: 'Satisfacción del paciente', value: '62%', detail: 'Por demoras en resultados', color: 'amber' },
  { icon: AlertOctagon, label: 'Imágenes sin analizar', value: '500+', detail: 'Acumuladas en cola de espera', color: 'red' },
  { icon: HeartCrack, label: 'Casos urgentes retrasados', value: '~15%', detail: 'Que requieren atención inmediata', color: 'red' },
]

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400' },
}

export default function HospitalStatsSection() {
  return (
    <section id="estadisticas-hospital" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.03),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Activity size={12} className="text-red-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Situación Actual del Hospital</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Indicadores del <span className="gradient-text-animated">Hospital San Martín</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Análisis detallado de la situación operativa actual del departamento de radiología
            que evidencia la necesidad de implementar un sistema de apoyo con IA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {detailedStats.map((stat) => {
            const Icon = stat.icon
            const colors = colorMap[stat.color]
            return (
              <div key={stat.label} className="liquid-glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <Icon size={22} className={colors.text} />
                </div>
                <div className={`text-2xl font-black mb-1 ${colors.text}`}>{stat.value}</div>
                <div className="text-white/60 text-sm font-medium mb-2">{stat.label}</div>
                <div className="text-white/25 text-xs">{stat.detail}</div>
              </div>
            )
          })}
        </div>

        {/* Caso práctico completo */}
        <div className="mt-12 liquid-glass-heavy rounded-2xl p-8">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
            <AlertOctagon size={18} className="text-red-400" />
            Caso Práctico — Descripción Completa
          </h3>
          <p className="text-white/40 text-sm leading-[1.9]">
            El Hospital Regional San Martín atiende un promedio de <strong className="text-white/70">320 pacientes diarios</strong> en
            el área de radiología, generando más de <strong className="text-white/70">9,000 imágenes médicas al mes</strong> entre
            radiografías, tomografías y resonancias. Sin embargo, solo cuenta con <strong className="text-white/70">6 radiólogos</strong>,
            quienes deben revisar manualmente cada estudio. Esto provoca <strong className="text-white/70">retrasos de hasta 72 horas</strong> en
            los diagnósticos, incremento en los errores por fatiga y una lista de espera que supera las <strong className="text-white/70">500
            imágenes sin analizar</strong>. Ante esta situación, la dirección del hospital busca optimizar el flujo de trabajo
            mediante la incorporación de un sistema de deep learning que ayude a detectar automáticamente posibles anomalías
            y priorizar los casos más urgentes.
          </p>
        </div>
      </div>
    </section>
  )
}