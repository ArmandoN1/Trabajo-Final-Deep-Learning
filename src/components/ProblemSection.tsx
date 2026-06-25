import { Users, Images, Clock, Layers, AlertTriangle, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Users, number: '320+', label: 'Pacientes Diarios', change: '+15% vs 2025', color: 'blue' },
  { icon: Images, number: '9,000+', label: 'Imágenes al Mes', change: '+22% crecimiento', color: 'purple' },
  { icon: Clock, number: '72h', label: 'Retraso Diagnóstico', change: 'Crítico', color: 'red' },
  { icon: Layers, number: '500+', label: 'Imágenes Pendientes', change: 'Acumuladas', color: 'amber' },
]

const colorMap: Record<string, { iconBg: string; iconColor: string; gradientBar: string }> = {
  blue: { iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', gradientBar: 'from-blue-600 to-blue-400' },
  purple: { iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', gradientBar: 'from-purple-600 to-purple-400' },
  red: { iconBg: 'bg-red-500/10', iconColor: 'text-red-400', gradientBar: 'from-red-600 to-red-400' },
  amber: { iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400', gradientBar: 'from-amber-600 to-amber-400' },
}

const bottlenecks = [
  { num: '1', title: 'Ingreso de Imágenes', desc: '~320 imágenes diarias capturadas', color: 'blue' },
  { num: '2', title: 'Cola de Espera', desc: '500+ imágenes sin procesar', color: 'amber' },
  { num: '3', title: 'Análisis Manual', desc: 'Solo 6 radiólogos disponibles', color: 'red' },
  { num: '4', title: 'Retraso Crítico', desc: 'Hasta 72 horas de espera', color: 'red' },
]

export default function ProblemSection() {
  return (
    <section id="problema" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.04),transparent_60%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <AlertTriangle size={12} className="text-amber-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Problemática Actual</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            El Desafío del{' '}
            <span className="gradient-text-animated">Diagnóstico Radiológico</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            El Hospital Regional San Martín enfrenta una sobrecarga crítica en su departamento
            de radiología que compromete la calidad y velocidad del diagnóstico médico.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon
            const colors = colorMap[stat.color]
            return (
              <div
                key={stat.label}
                className="liquid-glass-card rounded-2xl p-7 text-center group hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${colors.gradientBar} w-0 group-hover:w-full transition-all duration-500`} />
                </div>
                <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 group-hover:rotate-[-8deg]`}>
                  <Icon size={28} className={colors.iconColor} />
                </div>
                <div className="text-white text-3xl font-black tracking-tight mb-1">{stat.number}</div>
                <div className="text-white/50 text-sm font-medium mb-2">{stat.label}</div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold">
                  <TrendingUp size={10} />
                  {stat.change}
                </span>
              </div>
            )
          })}
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Text */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4 tracking-tight">Una Brecha Crítica en la Atención</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Con solo 6 radiólogos disponibles para analizar más de 9,000 imágenes mensuales,
              el hospital experimenta cuellos de botella significativos que impactan directamente
              en la salud de los pacientes.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Cada radiólogo analiza ~1,500 imágenes mensuales, superando estándares recomendados.',
                'Diagnósticos urgentes se mezclan con casos rutinarios sin priorización automática.',
                'Fatiga visual incrementa errores diagnósticos hasta en un 30%.',
                'Pacientes críticos esperan hasta 72 horas para recibir resultados.',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/[0.04] border-l-2 border-red-500/30 hover:bg-red-500/[0.08] hover:translate-x-1 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-white/60 text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual panel */}
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <TrendingUp size={16} className="text-red-400" />
              <h4 className="text-white text-sm font-bold">Cuello de Botella Actual</h4>
            </div>
            <div className="flex flex-col gap-3">
              {bottlenecks.map((b) => (
                <div
                  key={b.num}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] hover:translate-x-1.5 transition-all border-l-2 ${
                    b.color === 'blue' ? 'border-l-blue-500' : b.color === 'amber' ? 'border-l-amber-500' : 'border-l-red-500'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    b.color === 'blue' ? 'bg-blue-500/15 text-blue-400' : b.color === 'amber' ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'
                  }`}>
                    {b.num}
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold">{b.title}</h5>
                    <p className="text-white/35 text-xs">{b.desc}</p>
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