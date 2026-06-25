import { GraduationCap, Play } from 'lucide-react'

const conclusions = [
  { num: '1', title: 'Viabilidad Técnica', text: 'Los modelos CNN con ResNet50 alcanzan 96.7% de precisión, comparable a estudios internacionales.' },
  { num: '2', title: 'Impacto Operativo', text: 'Reduce el tiempo de 72 horas a menos de 2 segundos, liberando 60% de la carga rutinaria.' },
  { num: '3', title: 'Mejora Asistencial', text: 'Priorización automática asegura atención inmediata a pacientes con patologías urgentes.' },
  { num: '4', title: 'Implementación Responsable', text: 'Requiere protocolos de validación clínica, capacitación y supervisión humana continua.' },
  { num: '5', title: 'Escalabilidad', text: 'Arquitectura modular permite replicabilidad en otros centros hospitalarios.' },
]

export default function ConclusionsSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <section id="conclusiones" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_60%)]" />

      <div className="relative max-w-[960px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <GraduationCap size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Conclusiones</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Conclusiones del <span className="gradient-text-animated">Proyecto</span>
          </h2>
        </div>

        <div className="space-y-4 mb-16">
          {conclusions.map((c) => (
            <div key={c.num} className="liquid-glass-card rounded-2xl p-7 flex gap-5 group hover:translate-x-1 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg shadow-blue-500/20">
                {c.num}
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{c.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="liquid-glass-heavy rounded-2xl p-12 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative">
            <h3 className="text-white text-2xl sm:text-3xl font-black mb-4 tracking-tight">
              Transformando el Diagnóstico Médico con IA
            </h3>
            <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto">
              La tecnología y la experiencia humana se complementan para salvar vidas.
            </p>
            <button
              onClick={() => scrollTo('#demo')}
              className="bg-emerald-500 text-white text-sm sm:text-base font-bold px-8 py-4 rounded-full hover:bg-emerald-400 transition-all inline-flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              <Play size={16} fill="currentColor" /> Probar la Demostración
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}