import { Cog, Maximize, RotateCw, FlipHorizontal2, Sun, Layers, ArrowRight } from 'lucide-react'

const steps = [
  { icon: Maximize, title: 'Resize', desc: 'Redimensionar todas las imágenes a 224×224 píxeles para compatibilidad con ResNet50.' },
  { icon: Sun, title: 'Normalización', desc: 'Escalar valores de píxeles al rango [0,1] dividiendo entre 255.' },
  { icon: RotateCw, title: 'Rotación', desc: 'Rotaciones aleatorias de hasta ±20° para aumentar variabilidad.' },
  { icon: FlipHorizontal2, title: 'Flip Horizontal', desc: 'Espejado horizontal aleatorio para duplicar patrones.' },
  { icon: Layers, title: 'Zoom & Shift', desc: 'Zoom aleatorio (±15%) y desplazamiento horizontal/vertical (±10%).' },
  { icon: Sun, title: 'Brillo & Contraste', desc: 'Variaciones aleatorias de brillo (±20%) para robustez.' },
]

export default function PreprocessingSection() {
  return (
    <section id="preprocesamiento" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.03),transparent_60%)]" />
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Cog size={12} className="text-purple-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Preprocesamiento de Imágenes</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Data Augmentation y <span className="gradient-text-animated">Preprocesamiento</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Técnicas aplicadas para preparar el dataset, manejar el desbalance de clases
            y aumentar la robustez del modelo ante variaciones en las imágenes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="liquid-glass-card rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-purple-500 group-hover:scale-110">
                    <Icon size={20} className="text-purple-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold mb-1">{step.title}</h4>
                    <p className="text-white/35 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Code block for ImageDataGenerator */}
        <div className="liquid-glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-white/50 text-xs font-bold">preprocessing.py — Data Augmentation con Keras</span>
          </div>
          <div className="p-6 bg-gray-950/50">
            <pre className="text-[11px] sm:text-xs leading-relaxed text-white/40 font-mono overflow-x-auto whitespace-pre">{`from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Generador con Data Augmentation para entrenamiento
train_datagen = ImageDataGenerator(
    rescale=1./255,              # Normalización [0,1]
    rotation_range=20,           # Rotación ±20°
    width_shift_range=0.1,       # Desplazamiento horizontal ±10%
    height_shift_range=0.1,      # Desplazamiento vertical ±10%
    shear_range=0.1,             # Cizallamiento
    zoom_range=0.15,             # Zoom ±15%
    horizontal_flip=True,        # Espejado horizontal
    brightness_range=[0.8, 1.2], # Variación de brillo
    fill_mode='nearest'          # Relleno de píxeles
)

# Generador para validación y test (solo normalización)
val_datagen = ImageDataGenerator(rescale=1./255)

# Cargar imágenes desde directorios
train_generator = train_datagen.flow_from_directory(
    'chest_xray/train',
    target_size=(224, 224),      # Resize a 224x224
    batch_size=32,
    class_mode='binary',         # Normal=0, Neumonía=1
    color_mode='rgb'             # 3 canales para ResNet50
)

# Class weights para manejar desbalance
from sklearn.utils.class_weight import compute_class_weight
import numpy as np

class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(train_generator.classes),
    y=train_generator.classes
)
class_weight_dict = dict(enumerate(class_weights))
# Resultado: {0: 1.94, 1: 0.67} → Penaliza más errores en clase minoritaria`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}