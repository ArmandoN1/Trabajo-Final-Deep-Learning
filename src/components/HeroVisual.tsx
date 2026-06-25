import { Scan, CheckCircle, Zap, ShieldAlert } from 'lucide-react'

export default function HeroVisual() {
  return (
    <div className="hidden lg:block relative w-full max-w-[640px] opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      {/* ============================================================
          GRID: TARJETAS IZQUIERDA + PANEL DERECHA
          ============================================================ */}
      <div className="flex items-center gap-4">
        {/* COLUMNA IZQUIERDA: 3 TARJETAS FLOTANTES */}
        <div className="flex flex-col gap-4 w-[210px] flex-shrink-0">
          {/* Card 1: Análisis Completado */}
          <div className="liquid-glass-heavy rounded-xl p-4 shadow-2xl animate-float">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold leading-tight">Análisis Completado</p>
                <p className="text-white/40 text-xs mt-1">Precisión: 96.7%</p>
              </div>
            </div>
          </div>

          {/* Card 2: Tiempo */}
          <div
            className="liquid-glass-heavy rounded-xl p-4 shadow-2xl animate-float"
            style={{ animationDelay: '-3s' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold leading-tight">Tiempo: 1.8s</p>
                <p className="text-white/40 text-xs mt-1">vs 72hrs manual</p>
              </div>
            </div>
          </div>

          {/* Card 3: Caso Prioritario */}
          <div
            className="liquid-glass-heavy rounded-xl p-4 shadow-2xl animate-float"
            style={{ animationDelay: '-5s' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                <ShieldAlert size={20} className="text-purple-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold leading-tight">Caso Prioritario</p>
                <p className="text-white/40 text-xs mt-1">Alerta enviada</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL PRINCIPAL */}
        <div className="liquid-glass-heavy rounded-2xl p-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
                <Scan size={22} />
              </div>
              <div className="min-w-0">
                <h4 className="text-white text-sm font-bold">Análisis en Progreso</h4>
                <p className="text-white/40 text-xs">Radiografía Torácica #RT-2847</p>
              </div>
            </div>
            <div className="liquid-glass flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-[11px] font-bold">EN VIVO</span>
            </div>
          </div>

          {/* Scan area */}
          <div className="relative w-full h-56 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-blue-500/10 mb-5 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-line shadow-[0_0_15px_rgba(96,165,250,0.6)]" />
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-blue-400/50" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-blue-400/50" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-blue-400/50" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-blue-400/50" />
            <div className="relative z-10 text-center">
              <Scan size={56} className="text-blue-500/25 mx-auto mb-2" />
              <p className="text-white/30 text-sm font-medium">Procesando imagen DICOM...</p>
            </div>
          </div>

          {/* Results rows */}
          <div className="flex flex-col gap-2">
            {[
              { label: 'Neumonía', value: '87.3%', dotColor: 'bg-red-400', textColor: 'text-red-400', bgColor: 'bg-red-500/10' },
              { label: 'Tuberculosis', value: '12.1%', dotColor: 'bg-amber-400', textColor: 'text-amber-400', bgColor: 'bg-amber-500/10' },
              { label: 'Normal', value: '0.6%', dotColor: 'bg-emerald-400', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-white/60 text-sm font-medium flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                  {item.label}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.textColor} ${item.bgColor}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}