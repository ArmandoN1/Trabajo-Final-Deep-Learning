import { useState, useEffect } from 'react'
import { Users, Images, Clock, Layers, AlertTriangle, TrendingUp, ChevronRight, Activity, ShieldAlert, Zap, Sparkles } from 'lucide-react'

// ============================================================
// DATOS DE LA PROBLEMÁTICA ACTUAL
// ============================================================
const stats = [
  { icon: Users, number: '320+', label: 'Pacientes Diarios', change: '+15% vs 2025', color: 'blue' },
  { icon: Images, number: '9,000+', label: 'Imágenes al Mes', change: '+22% crecimiento', color: 'purple' },
  { icon: Clock, number: '72h', label: 'Retraso Diagnóstico', change: 'Crítico', color: 'red' },
  { icon: Layers, number: '500+', label: 'Imágenes Pendientes', change: 'Acumuladas', color: 'amber' },
]

const colorMap: Record<string, { text: string; bg: string; glow: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' },
  red: { text: 'text-red-400', bg: 'bg-red-500/10', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' },
  amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' },
}

const bottlenecks = [
  { num: '1', title: 'Ingreso de Imágenes', desc: '~320 imágenes diarias capturadas en el Hospital.', color: 'blue' },
  { num: '2', title: 'Cola de Espera', desc: '500+ imágenes sin procesar acumulándose.', color: 'amber' },
  { num: '3', title: 'Análisis Manual', desc: 'Solo 6 radiólogos disponibles para toda la carga.', color: 'red' },
  { num: '4', title: 'Retraso Crítico', desc: 'Hasta 72 horas de espera para obtener resultados.', color: 'red' },
]

export default function ProblemSection() {
  const [activeStat, setActiveStat] = useState<number | null>(null)

  return (
    <section id="problema" className="relative bg-neutral-950 py-24 sm:py-32 overflow-hidden">
      
      {/* Iluminación de Fondo Neutra y Natural */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        
        {/* Header de la sección */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            <AlertTriangle size={12} className="text-red-400 animate-pulse" />
            <span className="text-red-300 text-xs font-bold tracking-wider uppercase">Problemática Actual</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            El Desafío del{' '}
            <span className="gradient-text-animated">Diagnóstico Radiológico</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-semibold">
            El Hospital Regional San Martín enfrenta una sobrecarga crítica en su departamento
            de radiología que compromete directamente la salud de los pacientes.
          </p>
        </div>

        {/* ============================================================
            1. LISTADO DE ESTADÍSTICAS (SIN BORDES, DISEÑO DE FLUJO)
            ============================================================ */}
        <div className="mb-20 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-red-400" size={18} />
            <h3 className="text-white font-black text-sm uppercase tracking-widest">Indicadores de Saturación</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const colors = colorMap[stat.color]
              return (
                <div
                  key={stat.label}
                  onMouseEnter={() => setActiveStat(index)}
                  onMouseLeave={() => setActiveStat(null)}
                  className="group flex flex-col justify-between py-6 border-b md:border-b-0 md:border-r border-white/10 last:border-0 pr-4 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center transition-all duration-300 ${activeStat === index ? colors.glow : ''}`}>
                      <Icon size={22} className={colors.text} />
                    </div>
                    <div>
                      <div className="text-white text-3xl font-black tracking-tight">{stat.number}</div>
                      <div className="text-white/60 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <TrendingUp size={10} />
                      {stat.change}
                    </span>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ============================================================
            2. ANÁLISIS DETALLADO & AVANCE INTERACTIVO (3D FLIP CARD)
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Lado Izquierdo: Lista de Brechas Críticas en la Atención */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-white text-2xl font-extrabold mb-4 tracking-tight">Una Brecha Crítica en la Atención</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8 font-semibold">
                Con solo 6 radiólogos disponibles para analizar más de 9,000 imágenes mensuales, el hospital experimenta cuellos de botella severos que saturan el sistema.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Sobrecarga de Trabajo', desc: 'Cada especialista evalúa aproximadamente 1,500 radiografías mensuales.' },
                { title: 'Ausencia de Filtraje', desc: 'Casos críticos y rutinarios esperan en la misma cola sin clasificación.' },
                { title: 'Error por Cansancio', desc: 'El diagnóstico visual continuo de guardia incrementa falsos negativos.' },
                { title: 'Tiempos de Espera', desc: 'Pacientes de emergencia aguardan hasta 72 horas para un informe escrito.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">{item.title}</h4>
                    <p className="text-white/60 text-xs mt-1 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Centro: Cuellos de Botella (Formato de Lista Limpia) */}
          <div className="lg:col-span-4 bg-neutral-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10">
              <ShieldAlert size={18} className="text-red-400" />
              <h4 className="text-white text-sm font-black uppercase tracking-wider">Flujo de Bloqueo Hospitalario</h4>
            </div>

            <div className="space-y-4">
              {bottlenecks.map((b) => (
                <div
                  key={b.num}
                  className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 transition-all duration-300"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                    b.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : b.color === 'amber' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {b.num}
                  </div>
                  <div>
                    <h5 className="text-white text-xs font-extrabold uppercase tracking-wide">{b.title}</h5>
                    <p className="text-white/50 text-[11px] font-semibold mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Derecho: AVANCE PRÁCTICO DEL MODELO (EFECTO FLIP CARD 3D) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            
            <div className="mb-6 text-center lg:text-left">
              <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Avance de Prototipo</span>
              <h4 className="text-white text-base font-extrabold mt-2">Prueba del Modelo de IA</h4>
              <p className="text-white/50 text-xs mt-1 font-semibold">Pasa el cursor para simular el análisis Grad-CAM de neumonía.</p>
            </div>

            {/* INTEGRACIÓN DIRECTA DE TU CARD FLIP ANIMADA */}
            <div className="card-container">
              <div className="card">
                <div className="content">
                  
                  {/* PARTE TRASERA: Radiografía con Filtro Grad-CAM Analizada */}
                  <div className="back">
                    <div className="back-content">
                      {/* Círculo de calor Grad-CAM animado */}
                      <div className="absolute top-[40%] left-[30%] w-28 h-28 bg-red-600/40 rounded-full blur-xl animate-pulse border border-red-500/30 z-0" />
                      <div className="absolute top-[45%] left-[35%] w-16 h-16 bg-amber-500/50 rounded-full blur-lg z-0" />
                      
                      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-4">
                        <Sparkles size={32} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                        <div className="space-y-1">
                          <strong className="text-white text-sm tracking-widest uppercase font-black">Neumonía Detectada</strong>
                          <p className="text-red-400 text-xs font-bold">Certeza: 98.1% (ResNet50)</p>
                        </div>
                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-bold rounded-md">
                          Prioridad de Triaje: ALTA
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PARTE DELANTERA: Radiografía de Entrada Normal */}
                  <div className="front">
                    <div className="img">
                      {/* Efectos de luces flotantes */}
                      <div className="circle" />
                      <div className="circle" id="right" />
                      <div className="circle" id="bottom" />
                    </div>

                    <div className="front-content">
                      <small className="badge flex items-center gap-1 text-white">
                        <Zap size={10} className="text-cyan-400 animate-bounce" /> Dataset de Entrada
                      </small>
                      
                      <div className="description">
                        <div className="title">
                          <p className="title text-white font-extrabold">
                            <strong>Chest X-Ray #2026-HR</strong>
                          </p>
                          <ChevronRight size={14} className="text-cyan-400" />
                        </div>
                        <p className="card-footer">
                          Resolución DICOM &nbsp; | &nbsp; Pulmón Pediátrico
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================
          HOJA DE ESTILOS CSS (INCLUYE ANIMACIÓN CARD 3D DEL CLIENTE)
          ============================================================ */}
      <style>{`
        /* --- Estilos Flip Card 3D --- */
        .card-container {
          perspective: 1000px;
        }

        .card {
          overflow: visible;
          width: 290px;
          height: 380px;
        }

        .content {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 600ms;
          box-shadow: 0px 10px 30px rgba(0,0,0,0.6);
          border-radius: 16px;
        }

        .front, .back {
          background-color: #0e0e11;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .back {
          justify-content: center;
          display: flex;
          align-items: center;
          transform: rotateY(180deg);
        }

        /* Halo rotativo RGB en la parte posterior */
        .back::before {
          position: absolute;
          content: ' ';
          display: block;
          width: 180px;
          height: 160%;
          background: linear-gradient(90deg, transparent, #ef4444, #f59e0b, #ef4444, transparent);
          animation: rotation_481 6000ms infinite linear;
        }

        .back-content {
          position: absolute;
          width: 98%;
          height: 98%;
          background-color: #0a0a0c;
          border-radius: 14px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .card:hover .content {
          transform: rotateY(180deg);
        }

        @keyframes rotation_481 {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        .front {
          color: white;
        }

        .front .front-content {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 10;
        }

        .front-content .badge {
          background-color: rgba(0,0,0,0.7);
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
          width: fit-content;
          font-weight: bold;
          font-size: 10px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .description {
          box-shadow: 0px 5px 15px rgba(0,0,0,0.6);
          width: 100%;
          padding: 12px;
          background-color: rgba(10,10,12,0.9);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.15);
        }

        .title {
          font-size: 12px;
          max-width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-footer {
          color: rgba(255,255,255,0.5);
          margin-top: 6px;
          font-size: 9px;
          font-weight: 500;
        }

        /* Simulación de placa de rayos X en el fondo delantero */
        .front .img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-image: url('https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80');
          background-size: cover;
          background-position: center;
          filter: grayscale(1) brightness(0.65);
        }

        /* Blobs de luz flotantes */
        .circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: rgba(59,130,246,0.25);
          position: absolute;
          filter: blur(20px);
          animation: floating 3s infinite ease-in-out;
        }

        #bottom {
          background-color: rgba(239,68,68,0.2);
          left: 80px;
          top: 60px;
          width: 150px;
          height: 150px;
          animation-delay: -800ms;
        }

        #right {
          background-color: rgba(245,158,11,0.2);
          left: 190px;
          top: -20px;
          width: 60px;
          height: 60px;
          animation-delay: -1800ms;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  )
}