import { Brain, Github, Linkedin, Twitter, Mail, ChevronRight } from 'lucide-react'

interface NavLink {
  label: string
  href?: string
}

interface NavCol {
  title: string
  links: NavLink[]
}

const navCols: NavCol[] = [
  {
    title: 'Navegación',
    links: [
      { label: 'Problemática', href: '#problema' },
      { label: 'Solución', href: '#solucion' },
      { label: 'Arquitectura', href: '#arquitectura' },
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Demo', href: '#demo' },
    ],
  },
  {
    title: 'Tecnologías',
    links: [
      { label: 'Python 3.11' },
      { label: 'TensorFlow 2.x' },
      { label: 'FastAPI' },
      { label: 'HTML5/CSS3/JS' },
      { label: 'Chart.js' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'ChestX-ray14' },
      { label: 'MURA Dataset' },
      { label: 'Repositorio' },
      { label: 'Documentación' },
    ],
  },
]

export default function Footer() {
  const scrollTo = (href?: string) => {
    if (!href) return
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-950 border-t border-white/[0.04] pt-20 pb-8">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                <Brain size={18} className="text-white" />
              </div>
              <h3 className="text-white font-bold">MedAI Diagnostics</h3>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              Sistema Inteligente de Apoyo al Diagnóstico Médico mediante Deep Learning
              para el Hospital Regional San Martín.
            </p>
            <div className="space-y-2">
              {['Hospital Regional San Martín', 'Curso: Deep Learning', 'Año 2026'].map((item) => (
                <div key={item} className="text-white/25 text-xs flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white/50 text-[11px] font-bold tracking-widest uppercase mb-5">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-white/30 text-sm hover:text-blue-400 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 MedAI Diagnostics · Hospital Regional San Martín · Hecho con ❤️ para Deep Learning
          </p>
          <div className="flex gap-2.5">
            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all hover:-translate-y-0.5">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}