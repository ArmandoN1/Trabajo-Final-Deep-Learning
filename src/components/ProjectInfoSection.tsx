import { BookOpen, Target, ClipboardList, GraduationCap, Hospital, Calendar, Users, FileText } from 'lucide-react'

export default function ProjectInfoSection() {
  return (
    <section id="proyecto" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.03),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <BookOpen size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Información del Proyecto</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Trabajo Final: <span className="gradient-text-animated">Deep Learning</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Sistema de diagnóstico médico asistido por Deep Learning para el Hospital Regional San Martín.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <Target size={18} className="text-blue-400" />
              </div>
              Tema del Proyecto
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Implementación de un sistema de diagnóstico médico asistido por deep learning en el Hospital Regional San Martín.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Hospital, label: 'Institución', value: 'Hospital Regional San Martín' },
                { icon: GraduationCap, label: 'Curso', value: 'Deep Learning' },
                { icon: Calendar, label: 'Año', value: '2026' },
                { icon: Users, label: 'Modalidad', value: 'Trabajo Final' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <item.icon size={16} className="text-blue-400 mb-2" />
                  <div className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{item.label}</div>
                  <div className="text-white text-sm font-semibold mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass-heavy rounded-2xl p-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <ClipboardList size={18} className="text-emerald-400" />
              </div>
              Objetivo del Trabajo
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Al finalizar el presente trabajo final, el estudiante tendrá la competencia de poseer un sólido
              entendimiento de los principios fundamentales del Deep Learning, incluyendo la estructura de las
              redes neuronales artificiales, y estar familiarizado con sus principales áreas de aplicación.
            </p>
            <div className="space-y-3">
              {[
                'Cumpliendo las normas técnicas establecidas',
                'Aplicando normas de seguridad y salud en el trabajo',
                'Actuando de manera responsable con el medio ambiente',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/[0.04] border-l-2 border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <span className="text-white/50 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="liquid-glass-card rounded-2xl p-8">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
              <FileText size={18} className="text-purple-400" />
            </div>
            Evidencias a Presentar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: '1', title: 'Análisis del Dataset', desc: 'Analizar el conjunto de datos y aplicar técnicas de preprocesamiento.' },
              { num: '2', title: 'Entrenamiento del Modelo', desc: 'Entrenar y validar un modelo de deep learning para detección de anomalías.' },
              { num: '3', title: 'Evaluación de Métricas', desc: 'Evaluar el rendimiento mediante precisión, sensibilidad y F1-score.' },
              { num: '4', title: 'Interfaz de Visualización', desc: 'Implementar una interfaz para visualizar predicciones y resultados.' },
              { num: '5', title: 'Documentación', desc: 'Documentar el proceso y presentar conclusiones sobre la viabilidad.' },
              { num: '6', title: 'Dataset Público', desc: 'Utilizar Chest X-Ray Dataset de Kaggle (paultimothymooney).' },
            ].map((ev) => (
              <div key={ev.num} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-black">
                    {ev.num}
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">✓ Completado</span>
                </div>
                <h4 className="text-white text-sm font-bold mb-1">{ev.title}</h4>
                <p className="text-white/35 text-xs leading-relaxed">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}