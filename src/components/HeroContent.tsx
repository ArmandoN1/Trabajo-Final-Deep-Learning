import { Play, Lightbulb } from 'lucide-react'

export default function HeroContent() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-2xl opacity-0 animate-fade-up">
      {/* Badge */}
      <div className="liquid-glass inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-white/70 text-xs font-semibold tracking-wide">
          Proyecto Deep Learning · Hospital Regional · 2026
        </span>
      </div>

      {/* Title */}
      <h1 className="text-white text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight mb-6">
        Sistema Inteligente de{' '}
        <span className="gradient-text-animated">
          Apoyo al Diagnóstico
        </span>{' '}
        Médico con Deep Learning
      </h1>

      {/* Description */}
      <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
        Implementación de un sistema basado en{' '}
        <strong className="text-white/80">Redes Neuronales Convolucionales (CNN)</strong>{' '}
        para analizar imágenes médicas, detectar anomalías, priorizar casos urgentes
        y generar reportes preliminares para el{' '}
        <strong className="text-white/80">Hospital Regional San Martín</strong>.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => scrollTo('#demo')}
          className="bg-white text-gray-900 text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/10 hover:-translate-y-0.5"
        >
          <Play size={16} fill="currentColor" />
          Ver Demostración
        </button>
        <button
          onClick={() => scrollTo('#solucion')}
          className="liquid-glass text-white text-sm sm:text-base font-medium px-7 py-3.5 rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Lightbulb size={16} />
          Conocer Solución
        </button>
      </div>
    </div>
  )
}