import { Code, Terminal } from 'lucide-react'

const codeBlocks = [
  {
    title: 'model_architecture.py — Definición del Modelo CNN',
    code: `import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import ResNet50

def create_model():
    """Crear modelo CNN con Transfer Learning (ResNet50)"""

    # 1. Cargar ResNet50 pre-entrenado (sin capa de clasificación)
    base_model = ResNet50(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )

    # 2. Congelar las capas del modelo base
    base_model.trainable = False

    # 3. Construir modelo completo
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.4),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.Dense(1, activation='sigmoid')  # Clasificación binaria
    ])

    # 4. Compilar modelo
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        loss='binary_crossentropy',
        metrics=['accuracy',
                 tf.keras.metrics.Precision(name='precision'),
                 tf.keras.metrics.Recall(name='recall')]
    )

    return model

model = create_model()
model.summary()`,
  },
  {
    title: 'train_model.py — Entrenamiento con Callbacks',
    code: `from tensorflow.keras.callbacks import (
    EarlyStopping, ModelCheckpoint,
    ReduceLROnPlateau, TensorBoard
)
import datetime

# Callbacks para optimizar entrenamiento
callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        'best_model.h5',
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    ),
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.2,
        patience=5,
        min_lr=1e-7,
        verbose=1
    ),
    TensorBoard(
        log_dir='logs/' + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    )
]

# Entrenar modelo con class weights
history = model.fit(
    train_generator,
    epochs=50,
    validation_data=val_generator,
    class_weight=class_weight_dict,
    callbacks=callbacks,
    verbose=1
)

# Guardar modelo final
model.save('medai_pneumonia_detector.h5')
print("Modelo guardado exitosamente.")`,
  },
  {
    title: 'evaluate_model.py — Evaluación y Métricas',
    code: `from sklearn.metrics import (
    classification_report, confusion_matrix,
    roc_auc_score, roc_curve
)
import numpy as np

# Evaluar en test set
test_loss, test_acc, test_prec, test_recall = model.evaluate(
    test_generator, verbose=1
)

# Predicciones
y_pred_prob = model.predict(test_generator)
y_pred = (y_pred_prob > 0.5).astype(int).flatten()
y_true = test_generator.classes

# F1-Score calculado
f1 = 2 * (test_prec * test_recall) / (test_prec + test_recall)

# Reporte completo
print(classification_report(
    y_true, y_pred,
    target_names=['Normal', 'Neumonía']
))

# AUC-ROC
auc_score = roc_auc_score(y_true, y_pred_prob)
print(f"AUC-ROC: {auc_score:.4f}")

# Matriz de confusión
cm = confusion_matrix(y_true, y_pred)
print(f"Matriz de Confusión:\\n{cm}")`,
  },
]

export default function ModelCodeSection() {
  return (
    <section id="codigo-modelo" className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
            <Code size={12} className="text-emerald-400" />
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Código Fuente del Modelo</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Implementación <span className="gradient-text-animated">Python Completa</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed">
            Código completo documentado para la creación, entrenamiento y evaluación del modelo CNN.
          </p>
        </div>

        <div className="space-y-6">
          {codeBlocks.map((block) => (
            <div key={block.title} className="liquid-glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <Terminal size={12} className="text-emerald-400 ml-2" />
                <span className="text-white/50 text-xs font-bold">{block.title}</span>
              </div>
              <div className="p-6 bg-gray-950/50">
                <pre className="text-[10px] sm:text-[11px] leading-relaxed text-white/40 font-mono overflow-x-auto whitespace-pre">
                  {block.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}