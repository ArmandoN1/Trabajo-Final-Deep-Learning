import { Database, ClipboardCheck, AlertTriangle, Shield } from 'lucide-react'

const limitations = [
  { icon: Database, title: 'Calidad de Datos', desc: 'Rendimiento depende de la calidad de imágenes de entrenamiento.' },
  { icon: ClipboardCheck, title: 'Validación Clínica', desc: 'Todos los diagnósticos requieren validación por un especialista.' },
  { icon: AlertTriangle, title: 'Falsos Positivos', desc: '~3.3% de falsos positivos que generan alarmas innecesarias.' },
  { icon: Shield, title: 'No Reemplaza al Especialista', desc: 'Es herramienta de apoyo; la decisión es del profesional médico.' },
]

export default function LimitationsSection() {
  return (
    <section id="limitaciones" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[960px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <AlertTriangle size={12} className="text-amber-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Limitaciones</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Consideraciones y <span className="gradient-text-animated">Limitaciones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {limitations.map((l) => {
            const Icon = l.icon
            return (
              <div key={l.title} className="liquid-glass-card rounded-2xl p-6 flex gap-4 group hover:translate-x-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">{l.title}</h4>
                  <p className="text-white/35 text-sm leading-relaxed">{l.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}