import { useState, useRef, useCallback, useEffect } from 'react'
import { Cog, Maximize, RotateCw, FlipHorizontal2, Sun, Layers, ArrowRight, FileCode, Database, Scale, ZoomIn, AlertTriangle, CheckCircle2, Sparkles, Code2, Lightbulb, Terminal, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

// ============ DATOS DEL CARRUSEL ============
const techniques = [
  {
    id: 'resize',
    title: 'RESIZE',
    subtitle: 'Escalado Uniforme',
    description: 'Redimensionar todas las imágenes a 224×224 píxeles para compatibilidad con ResNet50.',
    image: 'https://picsum.photos/seed/resize-xray/600/800',
    code: `from PIL import Image
import numpy as np

def resize_xray(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img_resized = img.resize(target_size, Image.LANCZOS)
    return np.array(img_resized)

from tensorflow.keras.preprocessing.image import load_img, img_to_array
img = load_img('chest_xray/normal/00000001.jpg', target_size=(224, 224))
x = img_to_array(img)
print(f"Shape: {x.shape}")`,
    codeTitle: 'resize_xray.py',
    codeExplanation: [
      { icon: FileCode, title: 'Importar librerías', desc: 'PIL maneja la apertura y redimensionado de imágenes. NumPy convierte la imagen en un array numérico que Keras puede procesar.' },
      { icon: Scale, title: 'Función resize_xray', desc: 'Abre la imagen y la redimensiona a 224×224 usando LANCZOS (alta calidad para reducir tamaño sin perder detalle).' },
      { icon: Code2, title: 'load_img de Keras', desc: 'Carga la imagen y la redimensiona automáticamente a target_size.' },
      { icon: Database, title: 'Conversión a array', desc: 'img_to_array convierte la imagen PIL en un array NumPy de forma (224, 224, 3).' }
    ]
  },
  {
    id: 'normalization',
    title: 'NORMALIZACIÓN',
    subtitle: 'Rango [0,1]',
    description: 'Escalar valores de píxeles al rango [0,1] dividiendo entre 255.',
    image: 'https://picsum.photos/seed/normalize-hist/600/800',
    code: `import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def normalize_image(image):
    return image / 255.0

datagen = ImageDataGenerator(rescale=1./255)

img = np.random.randint(0, 256, (224, 224, 3))
print(f"Antes: [{img.min()}, {img.max()}]")
print(f"Después: [{img.min()/255:.2f}, {img.max()/255:.2f}]")`,
    codeTitle: 'normalize.py',
    codeExplanation: [
      { icon: Scale, title: 'Función normalize_image', desc: 'Divide cada valor de píxel entre 255. Un píxel blanco (255) pasa a 1.0.' },
      { icon: Code2, title: 'rescale=1./255', desc: 'Parámetro de ImageDataGenerator que aplica la normalización automáticamente.' },
      { icon: Lightbulb, title: '¿Por qué normalizar?', desc: 'Los modelos convergen más rápido con inputs en rango pequeño y consistente.' }
    ]
  },
  {
    id: 'rotation',
    title: 'ROTACIÓN',
    subtitle: '±20° Aleatorio',
    description: 'Rotaciones aleatorias de hasta ±20° para aumentar variabilidad.',
    image: 'https://picsum.photos/seed/rotation-aug/600/800',
    code: `from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

datagen = ImageDataGenerator(rotation_range=20, fill_mode='nearest')

img = load_img('chest_xray/pneumonia/00000003.jpg', target_size=(224, 224))
x = img_to_array(img).reshape(1, 224, 224, 3)

fig, axes = plt.subplots(1, 5, figsize=(15, 3))
axes[0].imshow(x[0].astype('uint8'))
axes[0].set_title('Original')
for i, batch in enumerate(datagen.flow(x, batch_size=1)):
    axes[i+1].imshow(batch[0].astype('uint8'))
    axes[i+1].set_title(f'Rotación {i+1}')
    if i == 3: break`,
    codeTitle: 'rotation_aug.py',
    codeExplanation: [
      { icon: RotateCw, title: 'rotation_range=20', desc: 'Define el rango máximo de rotación aleatoria entre -20° y +20°.' },
      { icon: Code2, title: 'fill_mode="nearest"', desc: 'Rellena las esquinas vacías con el valor del píxel más cercano.' },
      { icon: Database, title: 'datagen.flow()', desc: 'Genera batches de imágenes transformadas infinitamente.' }
    ]
  },
  {
    id: 'flip',
    title: 'FLIP HORIZONTAL',
    subtitle: 'Espejado',
    description: 'Espejado horizontal aleatorio para duplicar patrones.',
    image: 'https://picsum.photos/seed/flip-mirror/600/800',
    code: `from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

datagen = ImageDataGenerator(horizontal_flip=True)

def augment_with_flips(image_array):
    flipped = np.fliplr(image_array)
    return np.vstack([image_array, flipped])

print(f"Dataset original: {len(train_images)} imágenes")
print(f"Dataset augmented: {len(augmented_images)} imágenes")`,
    codeTitle: 'flip_horizontal.py',
    codeExplanation: [
      { icon: RotateCw, title: 'horizontal_flip=True', desc: 'Activa el volteo horizontal aleatorio con 50% de probabilidad.' },
      { icon: Code2, title: 'np.fliplr()', desc: 'Función de NumPy que voltea el array horizontalmente (left-right).' },
      { icon: Lightbulb, title: '¿Por qué no vertical_flip?', desc: 'En rayos X de tórax, voltear verticalmente invertiría la anatomía.' }
    ]
  },
  {
    id: 'zoom',
    title: 'ZOOM & SHIFT',
    subtitle: 'Traducción Espacial',
    description: 'Zoom aleatorio (±15%) y desplazamiento horizontal/vertical (±10%).',
    image: 'https://picsum.photos/seed/zoom-shift/600/800',
    code: `from tensorflow.keras.preprocessing.image import ImageDataGenerator

datagen = ImageDataGenerator(
    zoom_range=0.15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    fill_mode='nearest'
)

img = load_img('chest_xray/normal/00000005.jpg', target_size=(224, 224))
x = img_to_array(img).reshape(1, 224, 224, 3)

for i, batch in enumerate(datagen.flow(x, batch_size=1)):
    save_img(f'augmented/zoom_shift_{i}.jpg', batch[0])
    if i == 4: break`,
    codeTitle: 'zoom_shift.py',
    codeExplanation: [
      { icon: ZoomIn, title: 'zoom_range=0.15', desc: 'Aplica zoom aleatorio entre 85% y 115% del tamaño original.' },
      { icon: Code2, title: 'width_shift_range=0.1', desc: 'Desplaza la imagen horizontalmente hasta ±10% de su ancho.' },
      { icon: Scale, title: 'height_shift_range=0.1', desc: 'Desplaza la imagen verticalmente hasta ±10% de su alto.' }
    ]
  },
  {
    id: 'brightness',
    title: 'BRILLO & CONTRASTE',
    subtitle: 'Variaciones Luminosas',
    description: 'Variaciones aleatorias de brillo (±20%) para robustez.',
    image: 'https://picsum.photos/seed/brightness-light/600/800',
    code: `from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

datagen = ImageDataGenerator(brightness_range=[0.8, 1.2])

img = load_img('chest_xray/pneumonia/00000007.jpg', target_size=(224, 224))
x = img_to_array(img).reshape(1, 224, 224, 3)

fig, axes = plt.subplots(1, 4, figsize=(12, 3))
brightness_values = [0.8, 1.0, 1.2]
for i, batch in enumerate(datagen.flow(x, batch_size=1)):
    axes[i].imshow(batch[0].astype('uint8'))
    axes[i].set_title(f'Brillo: {brightness_values[i]}')
    if i == 2: break`,
    codeTitle: 'brightness_aug.py',
    codeExplanation: [
      { icon: Sun, title: 'brightness_range=[0.8, 1.2]', desc: 'Multiplica los valores de píxel por un factor entre 0.8 y 1.2.' },
      { icon: Lightbulb, title: 'Simulación de exposición', desc: 'Enseña al modelo a ser robusto ante cambios de iluminación.' },
      { icon: Code2, title: 'Comparación visual', desc: 'Muestra 3 versiones: oscura, original y brillante.' }
    ]
  }
]

// ============ DATOS DE LAS 6 CARDS ORIGINALES ============
const steps = [
  { icon: Maximize, title: 'Resize', desc: 'Redimensionar todas las imágenes a 224×224 píxeles para compatibilidad con ResNet50.' },
  { icon: Sun, title: 'Normalización', desc: 'Escalar valores de píxeles al rango [0,1] dividiendo entre 255.' },
  { icon: RotateCw, title: 'Rotación', desc: 'Rotaciones aleatorias de hasta ±20° para aumentar variabilidad.' },
  { icon: FlipHorizontal2, title: 'Flip Horizontal', desc: 'Espejado horizontal aleatorio para duplicar patrones.' },
  { icon: Layers, title: 'Zoom & Shift', desc: 'Zoom aleatorio (±15%) y desplazamiento horizontal/vertical (±10%).' },
  { icon: Sun, title: 'Brillo & Contraste', desc: 'Variaciones aleatorias de brillo (±20%) para robustez.' },
]

// ============ CÓDIGO COMPLETO PREPROCESSING.PY ============
const fullPreprocessingCode = `from tensorflow.keras.preprocessing.image import ImageDataGenerator
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
# Resultado: {0: 1.94, 1: 0.67} → Penaliza más errores en clase minoritaria`

// ============ INFO CARDS (Guía Rápida) ============
const infoCards = [
  { icon: Sparkles, title: '¿Qué es Data Augmentation?', desc: 'Técnica que crea nuevas imágenes aplicando transformaciones (rotar, voltear, cambiar brillo). El modelo "ve" más variedad sin recolectar más datos.', color: 'from-purple-500 to-violet-600' },
  { icon: FileCode, title: 'ImageDataGenerator', desc: 'Herramienta principal de Keras. Configura TODAS las transformaciones en un solo lugar.', color: 'from-cyan-500 to-blue-600' },
  { icon: Scale, title: 'rescale=1./255', desc: 'Normaliza los píxeles dividiéndolos entre 255 para que queden entre 0 y 1.', color: 'from-emerald-500 to-teal-600' },
  { icon: RotateCw, title: 'Rotación y Desplazamiento', desc: 'rotation_range=20 rota ±20°. Los shift mueven la imagen ±10%.', color: 'from-orange-500 to-amber-600' },
  { icon: ZoomIn, title: 'Zoom y Flip', desc: 'zoom_range=0.15 hace zoom ±15%. horizontal_flip=True voltea como espejo.', color: 'from-pink-500 to-rose-600' },
  { icon: Sun, title: 'Brillo y Cizallamiento', desc: 'brightness_range=[0.8, 1.2] cambia la iluminación ±20%.', color: 'from-yellow-500 to-orange-500' },
  { icon: Database, title: 'flow_from_directory', desc: 'Carga imágenes desde carpetas. target_size=(224,224) las redimensiona.', color: 'from-indigo-500 to-purple-600' },
  { icon: AlertTriangle, title: 'Class Weights (Desbalance)', desc: 'compute_class_weight("balanced") calcula pesos {0: 1.94, 1: 0.67}.', color: 'from-red-500 to-rose-600' }
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function PreprocessingSection() {
  // ============ ESTADO DEL CARRUSEL ============
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  const totalSlides = techniques.length
  const getPrevIndex = () => (currentIndex - 1 + totalSlides) % totalSlides
  const getNextIndex = () => (currentIndex + 1) % totalSlides

  const tiltState = useRef(
    techniques.map(() => ({
      rotX: { current: 0, target: 0 },
      rotY: { current: 0, target: 0 },
      imgX: { current: 0, target: 0 },
      imgY: { current: 0, target: 0 },
      isHovering: false,
    }))
  )

  // Loop de animación del carrusel
  useEffect(() => {
    let rafId: number
    const animate = () => {
      tiltState.current.forEach((state, i) => {
        const card = cardRefs.current[i]
        const img = imgRefs.current[i]
        if (!card) return
        const factor = state.isHovering ? 0.07 : 0.03
        state.rotX.current = lerp(state.rotX.current, state.rotX.target, factor)
        state.rotY.current = lerp(state.rotY.current, state.rotY.target, factor)
        state.imgX.current = lerp(state.imgX.current, state.imgX.target, factor)
        state.imgY.current = lerp(state.imgY.current, state.imgY.target, factor)
        card.style.transform = `rotateX(${state.rotX.current.toFixed(2)}deg) rotateY(${state.rotY.current.toFixed(2)}deg)`
        if (img) {
          img.style.transform = `scale(1.12) translate(${state.imgX.current.toFixed(2)}px, ${state.imgY.current.toFixed(2)}px)`
        }
      })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const state = tiltState.current[index]
    state.isHovering = true
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const offsetY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    state.rotY.target = offsetX * -10
    state.rotX.target = offsetY * 10
    state.imgX.target = offsetX * 18
    state.imgY.target = offsetY * 18
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const state = tiltState.current[index]
    state.isHovering = false
    state.rotX.target = 0
    state.rotY.target = 0
    state.imgX.target = 0
    state.imgY.target = 0
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating, currentIndex])

  const goNext = () => goToSlide(getNextIndex())
  const goPrev = () => goToSlide(getPrevIndex())

  const getSlidePosition = (index: number) => {
    if (index === currentIndex) return 'current'
    if (index === getPrevIndex()) return 'previous'
    if (index === getNextIndex()) return 'next'
    return 'hidden'
  }

  const currentTechnique = techniques[currentIndex]

  return (
    <section id="preprocesamiento" className="relative bg-[#0a0a0f] py-24 sm:py-32 overflow-hidden">
      {/* Fondo de video del preprocesamiento */}
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/prepro.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-black/70 pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-6 z-10">

        {/* ============ HEADER ============ */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <Cog size={12} className="text-purple-400" />
            <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Preprocesamiento de Imágenes</span>
          </div>
          <h2 className="text-white text-4xl sm:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
            Data Augmentation y{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Preprocesamiento
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Navega entre las técnicas aplicadas para preparar el dataset y aumentar la robustez del modelo.
          </p>
        </div>

        {/* ============ CARRUSEL CINEMATOGRÁFICO ============ */}
        <div className="relative w-full h-[560px] sm:h-[640px] flex items-center justify-center mb-20">
          <button
            onClick={goPrev}
            disabled={isAnimating}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-all duration-500 group disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>

          <div className="relative w-full max-w-[900px] h-full flex items-center justify-center" style={{ perspective: '1400px' }}>
            {techniques.map((tech, i) => {
              const pos = getSlidePosition(i)
              if (pos === 'hidden') return null
              const isCurrent = pos === 'current'
              return (
                <div
                  key={tech.id}
                  className={`absolute left-1/2 top-1/2 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isCurrent ? 'z-20 opacity-100' : 'z-10'}`}
                  style={{
                    width: '300px',
                    height: '460px',
                    transform: isCurrent
                      ? 'translate(-50%, -50%) translateX(0) scale(1)'
                      : pos === 'next'
                      ? 'translate(-50%, -50%) translateX(108%) scale(0.88) rotateY(-12deg)'
                      : 'translate(-50%, -50%) translateX(-108%) scale(0.88) rotateY(12deg)',
                    transformStyle: 'preserve-3d',
                    opacity: isCurrent ? 1 : 0.6,
                    filter: isCurrent ? 'none' : 'brightness(0.55) saturate(0.6)',
                  }}
                >
                  <div
                    ref={(el) => { cardRefs.current[i] = el }}
                    className="relative w-full h-full rounded-[10px] overflow-hidden border border-white/20 shadow-2xl shadow-black/50 group/card cursor-pointer"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform', transition: 'box-shadow 0.6s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.6s ease' }}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    onClick={() => !isCurrent && goToSlide(i)}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        ref={(el) => { imgRefs.current[i] = el }}
                        src={tech.image}
                        alt={tech.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ transform: 'scale(1.12) translate(0px, 0px)', willChange: 'transform', transition: 'filter 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                        draggable={false}
                        loading="eager"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-[10px] border border-white/[0.08] pointer-events-none" />
                    <div className="absolute left-0 right-0 bottom-0 z-30 p-6 pointer-events-none">
                      <div className="space-y-2">
                        <h3
                          className={`text-white font-black text-[2.2rem] sm:text-[2.6rem] tracking-tight uppercase leading-[0.9] transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em', transitionDelay: isCurrent ? '200ms' : '0ms' }}
                        >
                          {tech.title}
                        </h3>
                        <p
                          className={`text-cyan-400 font-semibold text-[11px] sm:text-xs uppercase tracking-[0.25em] transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          style={{ transitionDelay: isCurrent ? '350ms' : '0ms' }}
                        >
                          {tech.subtitle}
                        </p>
                        <p
                          className={`text-white/70 text-[11px] sm:text-xs font-light leading-relaxed max-w-[220px] transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          style={{ transitionDelay: isCurrent ? '500ms' : '0ms' }}
                        >
                          {tech.description}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 z-30 pointer-events-none">
                      <span className={`text-white/30 text-[10px] font-mono font-bold tracking-widest transition-all duration-500 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={goNext}
            disabled={isAnimating}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center transition-all duration-500 group disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Indicadores del carrusel */}
        <div className="flex justify-center gap-2 mb-4">
          {techniques.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              disabled={isAnimating}
              className={`h-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] disabled:cursor-not-allowed ${i === currentIndex ? 'bg-white w-10' : 'bg-white/20 w-4 hover:bg-white/40'}`}
              aria-label={`Ir a técnica ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex justify-center mb-20">
          <p className="text-white/30 text-xs font-mono tracking-widest">
            <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </p>
        </div>

        {/* ============ BLOQUE DE COMANDOS (código específico por técnica) ============ */}
        <div className="space-y-6 mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Terminal size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg sm:text-xl font-bold">{currentTechnique.codeTitle}</h3>
              <p className="text-white/40 text-xs sm:text-sm">Uso y explicación del código Keras</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-start">
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shadow-2xl shadow-black/30">
              <div className="px-6 py-4 bg-white/[0.03] border-b border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-white/50 text-xs font-bold tracking-wide font-mono">{currentTechnique.codeTitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400/60 text-xs font-mono">Python</span>
                  <div className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse" />
                </div>
              </div>
              <div className="p-6 bg-gray-950/80 overflow-x-auto">
                <pre key={currentTechnique.id} className="text-[11px] sm:text-xs leading-loose text-slate-300/70 font-mono whitespace-pre animate-fade-in">
                  {currentTechnique.code}
                </pre>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shadow-2xl shadow-black/30">
              <div className="px-5 py-4 bg-white/[0.03] border-b border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <BookOpen size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold">¿Qué hace este código?</h4>
                    <p className="text-white/40 text-[10px]">Explicación paso a paso</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-[480px] overflow-y-auto custom-scrollbar">
                {currentTechnique.codeExplanation.map((exp, i) => {
                  const Icon = exp.icon
                  return (
                    <div key={i} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Icon size={14} className="text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-white text-xs font-bold mb-1 leading-tight">{exp.title}</h5>
                          <p className="text-white/50 text-[11px] leading-relaxed">{exp.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============ 6 CARDS ORIGINALES (las que tenías) ============ */}
        <div className="text-center mb-10">
          <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Técnicas de <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Preprocesamiento</span>
          </h3>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Resumen visual de cada transformación aplicada al dataset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-2xl p-6 group hover:-translate-y-2 transition-all duration-300 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.12]">
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

        {/* ============ PREPROCESSING.PY + GUÍA RÁPIDA (70% / 30%) ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 items-start">
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shadow-2xl shadow-black/30 w-full">
            <div className="px-6 py-4 bg-white/[0.03] border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/50 text-xs font-bold tracking-wide font-mono">preprocessing.py — Data Augmentation con Keras</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400/60 text-xs font-mono">Python</span>
                <div className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse" />
              </div>
            </div>
            <div className="p-6 bg-gray-950/80 overflow-x-auto">
              <pre className="text-[11px] sm:text-xs leading-loose text-slate-300/70 font-mono whitespace-pre">
                {fullPreprocessingCode}
              </pre>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm shadow-2xl shadow-black/30">
            <div className="px-5 py-4 bg-white/[0.03] border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Guía Rápida</h4>
                  <p className="text-white/40 text-[10px]">Explicación para exposición</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
              {infoCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <div key={i} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-white text-xs font-bold mb-1 leading-tight">{card.title}</h5>
                        <p className="text-white/50 text-[11px] leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="px-5 py-3 bg-white/[0.03] border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-white/30 text-[10px] font-mono">preprocessing.py</span>
              <span className="text-white/30 text-[10px]">8 conceptos clave</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        .group\\/card:hover { box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.15); }
      `}</style>
    </section>
  )
}