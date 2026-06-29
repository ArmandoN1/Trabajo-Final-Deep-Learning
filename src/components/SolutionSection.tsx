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
      
      {/* ================= Fondo Tecnológico ================= */}

      {/* Glow superior */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_40%)] pointer-events-none" />

      {/* Glow inferior */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_45%)] pointer-events-none" />

      {/* Grid 3D */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.06]
          pointer-events-none
          [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
          [background-size:45px_45px]
          [transform:perspective(1000px)_rotateX(70deg)_translateY(-180px)]
        "
      />

      {/* Onda central */}
      <div className="wave-bg absolute pointer-events-none" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 max-w-6xl mx-auto">       
          {features.map((f) => (
          <div
            key={f}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-cyan-400/10
              bg-slate-900/70
              backdrop-blur-xl
              px-6
              py-5
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-cyan-400/40
              hover:shadow-[0_0_30px_rgba(34,211,238,.15)]
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_60%)]" />

            {/* Línea inferior */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />

            <div className="relative flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-emerald-500/15
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:rotate-12
                  group-hover:bg-emerald-500/25
                "
              >
                <CheckCircle
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <span className="text-white/80 text-base leading-snug font-medium">
                {f}
              </span>

            </div>
          </div>
        ))}
        </div>

        {/* Solution cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.title}
                className="relative group rounded-3xl overflow-hidden p-[2px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"

                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()

                  e.currentTarget.style.setProperty(
                    "--x",
                    `${e.clientX - rect.left}px`
                  )

                  e.currentTarget.style.setProperty(
                    "--y",
                    `${e.clientY - rect.top}px`
                  )
                }}

                style={{
                  background:
                    "linear-gradient(180deg,#06b6d4,#3b82f6,#14b8a6)",
                  backgroundSize: "100% 300%",
                  animation: "borderRotate 6s linear infinite"
                }}
              >
                <div
                  className="relative rounded-[22px] h-full bg-slate-900 p-7 overflow-hidden"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,.08), transparent 55%)"
                  }}
                >
                  {/* Glow superior */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent pointer-events-none" />

                  {/* Icono */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <Icon
                      size={28}
                      className="text-white"
                    />
                  </div>

                  {/* Título */}
                  <h3 className="text-white text-lg font-bold mt-6 mb-3">
                    {card.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-white/55 text-sm leading-7 mb-6">
                    {card.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[11px] font-semibold border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 transition-all duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-400/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Línea inferior */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}