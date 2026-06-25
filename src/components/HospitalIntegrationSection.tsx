import { Hospital, ArrowRight, Monitor, Bell, FileText, Users, Shield, Workflow } from 'lucide-react'

const steps = [
  { icon: Monitor, title: 'Captura DICOM', desc: 'El equipo de radiología captura la imagen y la envía al sistema PACS.' },
  { icon: Workflow, title: 'Envío al modelo', desc: 'El sistema detecta nuevas imágenes y las envía automáticamente al modelo de IA.' },
  { icon: Bell, title: 'Análisis y priorización', desc: 'La CNN analiza en <2 segundos y asigna nivel de prioridad.' },
  { icon: FileText, title: 'Reporte preliminar', desc: 'Se genera un informe con diagnóstico, confianza y recomendaciones.' },
  { icon: Users, title: 'Revisión del radiólogo', desc: 'El radiólogo recibe la imagen con el pre-diagnóstico y toma la decisión final.' },
  { icon: Shield, title: 'Validación y registro', desc: 'El diagnóstico se registra en el HIS para seguimiento y mejora del modelo.' },
]

export default function HospitalIntegrationSection() {
  return (
    <section id="integracion" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Hospital size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Integración Hospitalaria</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Flujo de Trabajo <span className="gradient-text-animated">Integrado</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title}>
                <div className="liquid-glass-card rounded-2xl p-6 flex items-center gap-5 group hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-lg shadow-blue-500/20">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                    <Icon size={20} className="text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold">{step.title}</h4>
                    <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight size={14} className="text-white/10 rotate-90" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}