import { useState } from 'react'

interface Tech {
  name: string
  color: string
  bgColor: string
  iconSvg: string
  description: string
}

const technologies: Tech[] = [
  {
    name: 'Python',
    color: '#3776AB',
    bgColor: 'rgba(55, 118, 171, 0.15)',
    description: 'Lenguaje principal',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><linearGradient id="python-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="python-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/></svg>`
  },
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    bgColor: 'rgba(255, 111, 0, 0.15)',
    description: 'Framework de IA',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#E55B2D" d="M67.732 38.388v51.762l22.978 13.27V51.658zM2 38.388l22.978 13.27v-13.27L46.05 50.546V25.118zm63.394 0L42.416 25.118v25.428l22.978-13.158v.999z"/><path fill="#ED8E24" d="M65.394 25.118L42.416 38.388l22.978 13.27 22.978-13.27z"/><path fill="#F8BF3C" d="M126 38.388l-22.978-13.27v25.428l-22.978-12.158v13.27L126 64.928zm-83.584 51.65v25.428l22.978-13.27V77.298zm47.272-25.428L67.732 77.298v25.428l22.978-13.27z"/></svg>`
  },
  {
    name: 'Keras',
    color: '#D00000',
    bgColor: 'rgba(208, 0, 0, 0.15)',
    description: 'Redes Neuronales',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M111.654 4.469H16.341A11.872 11.872 0 0 0 4.469 16.341v95.313a11.872 11.872 0 0 0 11.872 11.872h95.313a11.872 11.872 0 0 0 11.872-11.872V16.341A11.872 11.872 0 0 0 111.654 4.469Zm0 0" fill="#d00000"/><path d="M24.34 25.476h7.32v77.082h-7.32Zm77.32 77.082H92.27L65.605 64.422l-9.07 9.39v28.746h-7.32V25.476h7.32v39.075l34.84-39.075h9.39l-30.36 33.567Zm0 0" fill="#fff"/></svg>`
  },
  {
    name: 'FastAPI',
    color: '#009688',
    bgColor: 'rgba(0, 150, 136, 0.15)',
    description: 'API REST Backend',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="m64 0c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm-7.978 117.998v-44.5h-23.882l39.874-63.498v44.5h23.382z" fill="#05998c"/><path d="m56.022 73.498v44.5l39.874-63.498h-23.382v-44.5z" fill="#ffffff"/></svg>`
  },
  {
    name: 'HTML5',
    color: '#E34F26',
    bgColor: 'rgba(227, 79, 38, 0.15)',
    description: 'Estructura web',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.488l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#FFF" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`
  },
  {
    name: 'CSS3',
    color: '#1572B6',
    bgColor: 'rgba(21, 114, 182, 0.15)',
    description: 'Estilos modernos',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/></svg>`
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    bgColor: 'rgba(247, 223, 30, 0.15)',
    description: 'Interactividad',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>`
  },
  {
    name: 'React',
    color: '#61DAFB',
    bgColor: 'rgba(97, 218, 251, 0.15)',
    description: 'UI Library',
    iconSvg: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2 13.2.3 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zm-3.5 30.9c-2 .7-4.1 1.3-6.3 1.9-1.5-4.7-3.4-9.7-5.7-14.8 2.3-5 4.2-9.9 5.6-14.6 2.2.6 4.4 1.3 6.3 2 10 3.8 16.1 8.9 16.1 13 0 4.5-6.5 9.9-16 13.5z"/></g></svg>`
  },
  {
    name: 'Chart.js',
    color: '#FF6384',
    bgColor: 'rgba(255, 99, 132, 0.15)',
    description: 'Visualización datos',
    iconSvg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#FF6384" d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm8.66 16.802L13.5 20.961v-7.532l7.16-4.135v7.508zM12 4.04l7.156 4.13L12 12.298 4.844 8.17 12 4.04zM3.34 9.294l7.16 4.135v7.532l-7.16-4.159V9.294z"/></svg>`
  },
  {
    name: 'Vite',
    color: '#646CFF',
    bgColor: 'rgba(100, 108, 255, 0.15)',
    description: 'Build Tool',
    iconSvg: `<svg viewBox="0 0 410 404" xmlns="http://www.w3.org/2000/svg"><path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1576 399.641 59.5246Z" fill="#41D1FF"/><path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.510 179.498L188.420 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.180 231.775C182.422 235.487 185.907 238.661 189.532 237.560L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.500 323.500L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="#FFDD35"/></svg>`
  },
]

const duplicatedTechs = [...technologies, ...technologies, ...technologies]

export default function TechBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative bg-gray-950 border-y border-white/[0.04] py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-purple-500/[0.02] to-emerald-500/[0.02]" />

      <div className="relative max-w-[1320px] mx-auto px-6 mb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/40 text-[11px] font-bold tracking-[0.3em] uppercase">
            Tecnologías Utilizadas
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <p className="text-center text-white/30 text-xs mt-2">
          Stack tecnológico del proyecto
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-tech gap-6 w-max">
          {duplicatedTechs.map((tech, index) => {
            const isHovered = hoveredIndex === index

            return (
              <div
                key={`${tech.name}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-white/[0.06] hover:scale-105 hover:-translate-y-1 flex-shrink-0"
                style={{
                  boxShadow: isHovered ? `0 10px 40px -10px ${tech.color}40` : 'none',
                  borderColor: isHovered ? `${tech.color}40` : undefined,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                  style={{ backgroundColor: tech.color, opacity: isHovered ? 0.15 : 0 }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: tech.bgColor }}
                >
                  <div
                    className="w-7 h-7 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                    dangerouslySetInnerHTML={{ __html: tech.iconSvg }}
                  />
                </div>

                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold transition-colors duration-300"
                    style={{ color: isHovered ? tech.color : 'rgba(255,255,255,0.9)' }}
                  >
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-white/40 font-medium">
                    {tech.description}
                  </span>
                </div>

                {isHovered && (
                  <span className="relative flex h-2 w-2 ml-1">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: tech.color }}
                    />
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes scrollTech {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        .animate-scroll-tech {
          animation: scrollTech 40s linear infinite;
        }

        .animate-scroll-tech:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}