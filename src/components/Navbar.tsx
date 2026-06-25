import { useState } from 'react'
import { Brain, Menu, X, ChevronDown, Play } from 'lucide-react'

interface NavbarProps {
  scrolled: boolean
}

const navLinks = [
  { label: 'Problemática', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Arquitectura', href: '#arquitectura' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Demo', href: '#demo' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Conclusiones', href: '#conclusiones' },
]

export default function Navbar({ scrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-xl border-b border-white/5 py-3'
          : ''
      }`}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
        className="flex items-center gap-3 text-white font-medium text-base z-50 group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform group-hover:rotate-[-8deg] group-hover:scale-105">
          <Brain size={20} strokeWidth={1.5} />
        </div>
        <div>
          <span className="font-bold text-sm block leading-tight">MedAI Diagnostics</span>
          <span className="text-[10px] text-blue-300/70 font-medium">Hospital San Martín</span>
        </div>
      </a>

      {/* Desktop Nav Pill */}
      <div className="hidden lg:flex liquid-glass items-center gap-0.5 rounded-2xl px-2 py-2">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            className="flex items-center gap-0.5 px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={() => scrollTo('#demo')}
          className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Play size={14} fill="currentColor" />
          Demo
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden liquid-glass text-white p-2.5 rounded-xl z-50"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-4 right-4 z-40 lg:hidden liquid-glass-heavy rounded-2xl p-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              onClick={() => scrollTo('#demo')}
              className="flex-1 bg-white text-gray-900 text-sm font-semibold py-3 rounded-full hover:bg-white/90 transition-colors text-center"
            >
              Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}