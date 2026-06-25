import { HelpCircle, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const questions = [
  {
    q: '¿Qué tipo de red neuronal es más adecuada para la detección de patrones en imágenes médicas?',
    a: `Las Redes Neuronales Convolucionales (CNN) son las más adecuadas para el análisis de imágenes médicas. Sus capas convolucionales aplican filtros que detectan automáticamente patrones jerárquicos: bordes simples en las primeras capas, texturas y formas en las intermedias, y estructuras complejas (como opacidades pulmonares o líneas de fractura) en las capas más profundas.

En este proyecto se utilizó ResNet50 con Transfer Learning, una arquitectura CNN de 50 capas con conexiones residuales que resuelven el problema del vanishing gradient, permitiendo redes más profundas sin pérdida de rendimiento. El pre-entrenamiento con ImageNet (1.2M imágenes) proporciona una base sólida de extracción de características que se adapta al dominio médico con menos datos.

Alternativas como VGG16, InceptionV3 o DenseNet121 también son viables, pero ResNet50 ofrece el mejor balance entre profundidad, precisión y eficiencia computacional para este caso de uso.`
  },
  {
    q: '¿Cómo se puede mejorar la precisión del modelo con un conjunto de datos limitado?',
    a: `Se aplicaron múltiples técnicas para maximizar el rendimiento con el dataset disponible (5,856 imágenes):

1. Transfer Learning: Se utilizó ResNet50 pre-entrenada en ImageNet, aprovechando los ~23M de parámetros ya entrenados para extraer características visuales relevantes. Solo se entrenaron ~600K parámetros nuevos (capas de clasificación).

2. Data Augmentation: Se aplicaron transformaciones en tiempo real durante el entrenamiento: rotación (±20°), zoom (±15%), flip horizontal, desplazamiento (±10%) y variaciones de brillo (±20%). Esto multiplica virtualmente el tamaño del dataset sin requerir nuevas imágenes.

3. Class Weights: Dado el desbalance (74.3% neumonía vs 25.7% normal), se calcularon pesos de clase balanceados ({0:1.94, 1:0.67}) para que el modelo no sesgue hacia la clase mayoritaria.

4. Regularización: Dropout (0.4 y 0.3) en las capas dense para prevenir sobreajuste.

5. Callbacks: EarlyStopping (patience=10) detiene el entrenamiento cuando la validación deja de mejorar. ReduceLROnPlateau reduce el learning rate automáticamente cuando el loss se estanca.`
  },
  {
    q: '¿Qué métricas permiten evaluar de manera efectiva el desempeño del modelo en diagnóstico médico?',
    a: `En diagnóstico médico, la selección de métricas es crítica porque los costos de los errores son asimétricos:

1. Sensibilidad (Recall) = 98.1%: Es la métrica MÁS IMPORTANTE en diagnóstico médico. Mide la capacidad de detectar todos los casos positivos (neumonía). Un falso negativo (no detectar neumonía) puede ser potencialmente letal, por lo que maximizar el recall es prioritario.

2. Especificidad = 94.4%: Mide la capacidad de identificar correctamente los casos normales. Complementa al recall, pero un falso positivo (alarma innecesaria) es menos peligroso que un falso negativo.

3. F1-Score = 96.6%: Media armónica de Precision y Recall. Proporciona una medida balanceada del rendimiento global, especialmente útil con datasets desbalanceados.

4. AUC-ROC = 0.987: Mide la capacidad discriminativa del modelo independientemente del umbral de decisión. Un valor cercano a 1 indica excelente separación entre clases.

5. Matriz de Confusión: Proporciona visibilidad completa de los 4 posibles resultados (VP, VN, FP, FN), permitiendo ajustar el umbral de decisión según las prioridades clínicas.

La Accuracy (96.7%) sola puede ser engañosa con datasets desbalanceados, por lo que siempre se complementa con las métricas anteriores.`
  },
  {
    q: '¿Cómo podría integrarse el sistema en el flujo de trabajo de los radiólogos del hospital?',
    a: `La integración propuesta sigue un modelo de "Second Reader" (segundo lector), donde el sistema de IA actúa como apoyo al radiólogo, no como reemplazo:

1. Integración con PACS: El sistema se conecta al Picture Archiving and Communication System del hospital. Cuando se captura una nueva radiografía, se envía automáticamente al modelo de IA vía API REST (FastAPI).

2. Análisis automático: El modelo CNN analiza la imagen en <2 segundos y genera: clasificación (Normal/Neumonía), nivel de confianza (%), y nivel de prioridad (Urgente/Alta/Media/Rutina).

3. Priorización de cola: Las imágenes se reordenan automáticamente en la cola del radiólogo según la prioridad detectada por la IA, asegurando que los casos críticos se revisen primero.

4. Dashboard del radiólogo: Una interfaz web muestra la imagen con el pre-diagnóstico de IA, zonas de interés resaltadas, y reporte preliminar. El radiólogo revisa, confirma o corrige.

5. Feedback loop: Las correcciones del radiólogo se almacenan para re-entrenar periódicamente el modelo, mejorando su precisión con datos locales del hospital.

6. Integración con HIS: Los reportes finales se registran en el Hospital Information System para seguimiento del paciente.`
  },
  {
    q: '¿Qué beneficios y limitaciones tendría la implementación de este tipo de sistema en un entorno real?',
    a: `BENEFICIOS:
• Reducción drástica del tiempo de diagnóstico: de 72 horas a <2 segundos para el análisis preliminar.
• Menor carga laboral para radiólogos: la IA filtra ~74% de casos normales, permitiendo que se enfoquen en casos complejos.
• Mayor precisión: 96.7% de accuracy con 98.1% de sensibilidad, reduciendo errores por fatiga.
• Priorización automática: los casos urgentes se identifican inmediatamente, mejorando la atención a pacientes críticos.
• Disponibilidad 24/7: el sistema funciona ininterrumpidamente, a diferencia del personal humano.
• Escalabilidad: puede procesar miles de imágenes adicionales sin costos proporcionales.
• Estandarización: cada imagen se analiza con los mismos criterios, sin variabilidad inter-observador.

LIMITACIONES:
• Dependencia de datos de entrenamiento: el modelo solo detecta lo que aprendió. Si se entrena solo con neumonía, no detectará otras patologías.
• Riesgo de falsos negativos: aunque son solo 1.9%, un caso no detectado puede tener consecuencias graves.
• Sesgos del dataset: el dataset de Kaggle es de pacientes pediátricos, lo que podría limitar la generalización a adultos.
• Necesidad de validación clínica: se requieren estudios prospectivos antes de uso clínico real.
• Infraestructura: requiere servidores con GPU y personal técnico para mantenimiento.
• No reemplaza al especialista: siempre requiere supervisión y validación del radiólogo.
• Regulación: sistemas de IA médica requieren aprobación regulatoria (ej. FDA, CE) para uso clínico.
• Mantenimiento continuo: el modelo necesita re-entrenamiento periódico con nuevos datos.`
  },
]

export default function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="preguntas" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_60%)]" />
      <div className="relative max-w-[960px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <HelpCircle size={12} className="text-blue-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Preguntas Guía</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Respuestas a las <span className="gradient-text-animated">Preguntas Guía</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Desarrollo detallado de las 5 preguntas guía proporcionadas para orientar la solución del caso práctico.
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((item, i) => (
            <div key={i} className="liquid-glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start gap-4 p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-lg shadow-blue-500/20">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm sm:text-base font-bold leading-relaxed pr-4">{item.q}</h4>
                </div>
                <ChevronRight
                  size={18}
                  className={`text-white/30 flex-shrink-0 mt-1 transition-transform duration-300 ${openIndex === i ? 'rotate-90' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 pt-0">
                  <div className="ml-14 p-5 rounded-xl bg-blue-500/[0.04] border border-blue-500/10">
                    <p className="text-white/50 text-sm leading-[1.9] whitespace-pre-line">{item.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}