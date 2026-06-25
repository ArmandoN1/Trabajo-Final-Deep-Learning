import { SearchCheck, Tags, AlertCircle, FileText, CheckCircle } from 'lucide-react'

const features = [
  'Análisis de radiografías en menos de 2 segundos',
  'Detección con 96.7% de precisión',
  'Priorización automática de casos urgentes',
  'Reportes preliminares estructurados',
  'Dashboard de monitoreo en tiempo real',
  'Integración con sistemas PACS y HIS',
]

const cards = [
  { icon: SearchCheck, title: 'Detección de Enfermedades', desc: 'Modelo CNN entrenado para identificar neumonía, tuberculosis y fracturas con alta precisión.', tags: ['TensorFlow', 'ResNet50', 'CNN'], gradient: 'from-blue-600 to-blue-400' },
  { icon: Tags, title: 'Clasificación Automática', desc: 'Categorización inteligente según patología, gravedad y área anatómica afectada.', tags: ['Softmax', 'Multi-Class'], gradient: 'from-emerald-600 to-emerald-400' },
  { icon: AlertCircle, title: 'Priorización de Casos', desc: 'Triaje automático que identifica y escala casos urgentes para atención prioritaria.', tags: ['Risk Scoring', 'Alertas'], gradient: 'from-amber-600 to-amber-400' },
  { icon: FileText, title: 'Reportes Automáticos', desc: 'Informes estructurados con hallazgos y recomendaciones para el radiólogo.', tags: ['PDF', 'Templates'], gradient: 'from-purple-600 to-purple-400' },
]

export default function SolutionSection() {
  return (
    <section id="solucion" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Solución Propuesta</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Deep Learning al{' '}
            <span className="gradient-text-animated">Servicio de la Salud</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Un sistema inteligente basado en CNN que automatiza el análisis preliminar
            de imágenes médicas y potencia las capacidades del equipo de radiología.
          </p>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16 max-w-3xl mx-auto">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={12} className="text-emerald-400" />
              </div>
              <span className="text-white/60 text-sm">{f}</span>
            </div>
          ))}
        </div>

        {/* Solution cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="liquid-glass-card rounded-2xl p-7 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${card.gradient} w-0 group-hover:w-full transition-all duration-500`} />
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} bg-opacity-10 flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-[-5deg]`}
                  style={{ background: `linear-gradient(135deg, ${card.gradient.includes('blue') ? 'rgba(37,99,235,0.15)' : card.gradient.includes('emerald') ? 'rgba(5,150,105,0.15)' : card.gradient.includes('amber') ? 'rgba(217,119,6,0.15)' : 'rgba(124,58,237,0.15)'}, transparent)` }}
                >
                  <Icon size={24} className="text-white/80" />
                </div>
                <h3 className="text-white text-base font-bold mb-2">{card.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{card.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.05] text-white/50 text-[10px] font-bold font-mono tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}