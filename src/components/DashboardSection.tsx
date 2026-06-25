import { Images, CheckCircle, AlertTriangle, Skull, Zap, BarChart3, PieChart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const kpis = [
  { icon: Images, value: '9,247', label: 'Total Analizadas', color: 'blue' },
  { icon: CheckCircle, value: '6,834', label: 'Casos Normales', color: 'emerald' },
  { icon: AlertTriangle, value: '1,847', label: 'Sospechosos', color: 'amber' },
  { icon: Skull, value: '566', label: 'Críticos', color: 'red' },
  { icon: Zap, value: '1.8s', label: 'Tiempo Promedio', color: 'purple' },
]

const metrics = [
  { label: 'Accuracy', value: '96.7%', width: 96.7 },
  { label: 'Sensibilidad', value: '95.2%', width: 95.2 },
  { label: 'Especificidad', value: '94.8%', width: 94.8 },
  { label: 'F1-Score', value: '95.9%', width: 95.9 },
]

const colorMap: Record<string, { icon: string; value: string; bar: string }> = {
  blue: { icon: 'bg-blue-500/12 text-blue-400', value: 'text-blue-400', bar: 'bg-blue-500' },
  emerald: { icon: 'bg-emerald-500/12 text-emerald-400', value: 'text-emerald-400', bar: 'bg-emerald-500' },
  amber: { icon: 'bg-amber-500/12 text-amber-400', value: 'text-amber-400', bar: 'bg-amber-500' },
  red: { icon: 'bg-red-500/12 text-red-400', value: 'text-red-400', bar: 'bg-red-500' },
  purple: { icon: 'bg-purple-500/12 text-purple-400', value: 'text-purple-400', bar: 'bg-purple-500' },
}

export default function DashboardSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="dashboard" ref={ref} className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(16,185,129,0.03),transparent_50%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <PieChart size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Dashboard</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Dashboard de <span className="gradient-text-animated">Inteligencia Artificial</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Monitoreo en tiempo real del rendimiento del modelo y distribución de diagnósticos.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            const colors = colorMap[kpi.color]
            return (
              <div key={kpi.label} className="liquid-glass-card rounded-2xl p-6 text-center group hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${colors.bar}`} />
                <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={20} />
                </div>
                <div className={`text-2xl font-black mb-1 ${colors.value}`}>{kpi.value}</div>
                <div className="text-white/40 text-xs font-medium">{kpi.label}</div>
              </div>
            )
          })}
        </div>

        {/* Charts placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {['Distribución de Diagnósticos', 'Precisión por Categoría'].map((title, i) => (
            <div key={title} className="liquid-glass-card rounded-2xl p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-sm font-bold flex items-center gap-2">
                  {i === 0 ? <PieChart size={14} className="text-blue-400" /> : <BarChart3 size={14} className="text-blue-400" />}
                  {title}
                </h3>
              </div>
              <div className="h-64 flex items-center justify-center border border-white/[0.04] rounded-xl bg-white/[0.01]">
                <div className="text-center">
                  {i === 0 ? (
                    <div className="flex items-center justify-center gap-4">
                      {[
                        { label: 'Normal', pct: 74, color: 'bg-emerald-500' },
                        { label: 'Neumonía', pct: 13, color: 'bg-blue-500' },
                        { label: 'TB', pct: 4.5, color: 'bg-amber-500' },
                        { label: 'Fractura', pct: 5.7, color: 'bg-red-500' },
                        { label: 'Otros', pct: 2.8, color: 'bg-purple-500' },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-2`} />
                          <div className="text-white/60 text-xs font-bold">{item.pct}%</div>
                          <div className="text-white/30 text-[10px]">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full px-6 space-y-3">
                      {['Normal', 'Neumonía', 'TB', 'Fractura'].map((cat, ci) => (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="text-white/40 text-xs w-20 text-right">{cat}</span>
                          <div className="flex-1 h-5 bg-white/[0.04] rounded-full overflow-hidden flex gap-0.5">
                            <div className={`h-full rounded-full bg-blue-500/70 transition-all duration-1000 ${visible ? '' : 'w-0'}`}
                              style={{ width: visible ? `${[97.2, 95.8, 94.5, 96.3][ci]}%` : '0%' }} />
                          </div>
                          <span className="text-white/50 text-xs font-bold w-12">{[97.2, 95.8, 94.5, 96.3][ci]}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Model Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="liquid-glass-card rounded-2xl p-6 text-center group hover:-translate-y-1 transition-all">
              <div className="text-2xl font-black text-emerald-400 mb-1">{m.value}</div>
              <div className="text-white/40 text-xs font-medium mb-4">{m.label}</div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-[2s] ease-out"
                  style={{ width: visible ? `${m.width}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}