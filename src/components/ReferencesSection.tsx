import { BookOpen, ExternalLink, Database, FileText } from 'lucide-react'

const references = [
  { type: 'Dataset', title: 'Chest X-Ray Images (Pneumonia)', author: 'Paul Timothy Mooney — Kaggle', url: 'kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia', desc: 'Dataset principal utilizado: 5,856 radiografías de tórax pediátricas.' },
  { type: 'Paper', title: 'Deep Residual Learning for Image Recognition', author: 'He, K. et al. (2016) — CVPR', url: 'arxiv.org/abs/1512.03385', desc: 'Paper original de ResNet que introduce las conexiones residuales.' },
  { type: 'Framework', title: 'TensorFlow 2.x / Keras', author: 'Google Brain Team', url: 'tensorflow.org', desc: 'Framework de deep learning utilizado para implementar y entrenar el modelo CNN.' },
  { type: 'Paper', title: 'CheXNet: Radiologist-Level Pneumonia Detection', author: 'Rajpurkar, P. et al. (2017) — Stanford ML', url: 'arxiv.org/abs/1711.05225', desc: 'Referencia para detección de neumonía con deep learning a nivel de radiólogo.' },
  { type: 'API', title: 'FastAPI', author: 'Sebastián Ramírez', url: 'fastapi.tiangolo.com', desc: 'Framework web moderno para crear la API REST del sistema de predicción.' },
  { type: 'Paper', title: 'ImageNet Classification with Deep CNNs', author: 'Krizhevsky, A. et al. (2012)', url: 'papers.nips.cc/paper/4824', desc: 'Trabajo seminal que demostró el poder de las CNNs en clasificación de imágenes.' },
]

export default function ReferencesSection() {
  return (
    <section id="referencias" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <BookOpen size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Referencias y Bibliografía</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Fuentes y <span className="gradient-text-animated">Referencias</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {references.map((ref) => (
            <div key={ref.title} className="liquid-glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  ref.type === 'Dataset' ? 'bg-emerald-500/10 text-emerald-400' :
                  ref.type === 'Paper' ? 'bg-blue-500/10 text-blue-400' :
                  ref.type === 'Framework' ? 'bg-purple-500/10 text-purple-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>{ref.type}</span>
              </div>
              <h4 className="text-white text-sm font-bold mb-1 leading-snug">{ref.title}</h4>
              <p className="text-white/30 text-xs mb-3">{ref.author}</p>
              <p className="text-white/20 text-xs leading-relaxed mb-4">{ref.desc}</p>
              <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-bold font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={10} />
                {ref.url}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}