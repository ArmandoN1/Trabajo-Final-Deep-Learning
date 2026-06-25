import { Database, Cog, Brain, GitBranch, FileText, Monitor, ChevronRight } from 'lucide-react'

const steps = [
  { icon: Database, label: 'Base de Datos', sub: 'ChestX-ray14, MURA', num: '1' },
  { icon: Cog, label: 'Preprocesamiento', sub: 'Resize, augmentation', num: '2' },
  { icon: Brain, label: 'Modelo CNN', sub: 'ResNet50 Transfer', num: '3' },
  { icon: GitBranch, label: 'Clasificación', sub: 'Multi-clase softmax', num: '4' },
  { icon: FileText, label: 'Reportes', sub: 'PDF automático', num: '5' },
  { icon: Monitor, label: 'Interfaz Web', sub: 'Dashboard radiólogo', num: '6' },
]

const codeSnippets = [
  {
    title: 'model.py — CNN Architecture',
    icon: '🧠',
    code: `# CNN Architecture
from tensorflow.keras import layers
from tensorflow.keras.applications import ResNet50

base = ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)
model = models.Sequential([
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dense(512, 'relu'),
    layers.Dropout(0.4),
    layers.Dense(4, 'softmax')
])`,
  },
  {
    title: 'api.py — FastAPI Backend',
    icon: '⚡',
    code: `# FastAPI Backend
from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.post("/predict")
async def predict(file: UploadFile):
    img = preprocess(file)
    pred = model.predict(img)
    result = interpret(pred)
    return {
        "diagnosis": result,
        "confidence": float(max)
    }`,
  },
  {
    title: 'train.py — Training Config',
    icon: '📊',
    code: `# Training Config
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

history = model.fit(
    train_gen,
    epochs=50,
    validation_data=val_gen,
    callbacks=[
        EarlyStopping(patience=10),
        ModelCheckpoint('best.h5')
    ]
)`,
  },
]

export default function ArchitectureSection() {
  return (
    <section id="arquitectura" className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_60%)]" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Arquitectura Técnica</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Pipeline de <span className="gradient-text-animated">Procesamiento</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Flujo completo desde la captura de la imagen médica hasta la entrega del reporte al radiólogo.
          </p>
        </div>

        {/* Pipeline */}
        <div className="overflow-x-auto mb-16 pb-4">
          <div className="flex items-center justify-center gap-3 min-w-[900px] px-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="flex items-center gap-3">
                  <div className="liquid-glass-card rounded-2xl p-6 text-center min-w-[150px] group hover:-translate-y-2 transition-all duration-300 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-[11px] font-black shadow-lg shadow-blue-500/30">
                      {step.num}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3 transition-all group-hover:bg-blue-500 group-hover:text-white">
                      <Icon size={24} className="text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-white text-xs font-bold mb-1">{step.label}</h4>
                    <p className="text-white/35 text-[10px]">{step.sub}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={18} className="text-blue-400/40 flex-shrink-0 animate-pulse" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Code blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {codeSnippets.map((snippet) => (
            <div key={snippet.title} className="liquid-glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-white/50 text-xs font-bold">{snippet.title}</span>
              </div>
              <div className="p-5 bg-gray-950/50">
                <pre className="text-[11px] leading-relaxed text-white/40 font-mono overflow-x-auto whitespace-pre">
                  {snippet.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}