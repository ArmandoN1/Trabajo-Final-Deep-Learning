import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '96.7', suffix: '%', label: 'PRECISIÓN IA' },
  { value: '<2', suffix: 's', label: 'TIEMPO ANÁLISIS' },
  { value: '9K', suffix: '+', label: 'IMÁGENES/MES' },
  { value: '24/7', suffix: '', label: 'DISPONIBILIDAD' },
]

export default function StatsBar() {
  return (
    <div className="flex flex-wrap gap-8 sm:gap-12 mt-8 pt-6 border-t border-white/[0.06] opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="text-white text-2xl sm:text-3xl font-bold tracking-tight leading-none mb-1">
            {stat.value}
            <span className="text-blue-300/70 text-sm sm:text-base font-semibold ml-0.5">
              {stat.suffix}
            </span>
          </div>
          <div className="text-white/30 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}