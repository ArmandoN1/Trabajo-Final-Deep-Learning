import { Gauge, UserCheck, Target, ArrowUpDown, Maximize } from 'lucide-react'

const benefits = [
  { icon: Gauge, title: 'Reducción del Tiempo', desc: 'De 72 horas a menos de 2 segundos por imagen.' },
  { icon: UserCheck, title: 'Menor Carga', desc: 'Radiólogos se enfocan en casos complejos.' },
  { icon: Target, title: 'Mayor Precisión', desc: '96.7% de precisión diagnóstica.' },
  { icon: ArrowUpDown, title: 'Priorización', desc: 'Triaje automático de casos urgentes.' },
  { icon: Maximize, title: 'Escalabilidad', desc: 'Miles de imágenes sin recursos extras.' },
]

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Beneficios</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ventajas del <span className="gradient-text-animated">Sistema Inteligente</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="liquid-glass-card rounded-2xl p-7 text-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 transition-all group-hover:bg-emerald-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                  <Icon size={24} className="text-emerald-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white text-sm font-bold mb-2">{b.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}