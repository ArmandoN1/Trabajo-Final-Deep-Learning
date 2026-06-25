# Trabajo Final Deep Learning - MedAI Diagnostics

## Resumen del Proyecto

MedAI Diagnostics es una aplicación web de presentación para un proyecto final de Deep Learning enfocado en el apoyo al diagnóstico médico. El sistema propone una solución para el Hospital Regional San Martín mediante el uso de redes neuronales convolucionales (CNN) que analizan radiografías de tórax y generan predicciones de neumonía junto con reportes preliminares.

La aplicación está construida con React, TypeScript, Vite y Tailwind CSS, y sirve como portafolio visual para exponer el pipeline completo del proyecto: problemática, dataset, preprocesamiento, arquitectura de modelo, entrenamiento, evaluación, integración hospitalaria y conclusiones.

## Tabla de Contenidos

- [Descripción del Problema](#descripción-del-problema)
- [Datos y Dataset](#datos-y-dataset)
- [Arquitectura del Modelo](#arquitectura-del-modelo)
- [Entrenamiento y Evaluación](#entrenamiento-y-evaluación)
- [Flujo de Integración Hospitalaria](#flujo-de-integración-hospitalaria)
- [Beneficios y Limitaciones](#beneficios-y-limitaciones)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Conclusiones](#conclusiones)

## Descripción del Problema

El proyecto aborda la sobrecarga del departamento de radiología del Hospital Regional San Martín. La situación actual descrita en la aplicación incluye:

- Más de 320 pacientes diarios atendidos por imagenología.
- Un flujo mensual de más de 9,000 imágenes médicas.
- Solo 6 radiólogos disponibles para el análisis.
- Retrasos de diagnóstico de hasta 72 horas.
- Más de 500 imágenes en cola sin procesar.

Esta realidad genera cuellos de botella, aumenta el riesgo de errores por fatiga y retrasa la toma de decisiones clínicas. MedAI Diagnostics propone usar inteligencia artificial para priorizar casos y acelerar el proceso de diagnóstico.

## Datos y Dataset

El proyecto usa el conjunto de datos público de Kaggle "Chest X-Ray Pneumonia Dataset" desarrollado por paultimothymooney. El dataset proviene del Guangzhou Women and Children's Medical Center y contiene radiografías de tórax de pacientes pediátricos.

### Estadísticas clave del dataset

- Entrenamiento: 5,216 imágenes (1,341 normales / 3,875 neumonía)
- Validación: 16 imágenes (8 normales / 8 neumonía)
- Test: 624 imágenes (234 normales / 390 neumonía)
- Total de imágenes: 5,856
- Clases: 2 (Normal / Neumonía)
- Formato: JPEG en escala de grises
- Resolución utilizada para el modelo: 224 × 224 píxeles

### Desbalance de clases

El dataset presenta un desequilibrio notable: aproximadamente 74.3% de las imágenes corresponden a neumonía y 25.7% son normales. Para mitigar este problema, el proyecto menciona:

- Data augmentation
- Pesos de clase (`class weights`)

## Arquitectura del Modelo

La solución de Deep Learning utiliza Transfer Learning con ResNet50 como base. La arquitectura propuesta en el código incluye:

1. Cargar `ResNet50` preentrenado en ImageNet sin la capa superior de clasificación.
2. Congelar las capas del modelo base para preservar la extracción de características.
3. Añadir una capa de pooling global (`GlobalAveragePooling2D`).
4. Añadir capas densas con `ReLU` y `Dropout`:
   - `Dense(512, activation='relu')`
   - `Dropout(0.4)`
   - `Dense(256, activation='relu')`
   - `Dropout(0.3)`
5. Agregar la capa de salida `Dense(1, activation='sigmoid')` para clasificación binaria.

### Compilación

El modelo se compila con:

- Optimizador: `Adam` con tasa de aprendizaje `1e-4`
- Función de pérdida: `binary_crossentropy`
- Métricas: `accuracy`, `precision`, `recall`

## Entrenamiento y Evaluación

El código mostrado incluye una configuración de entrenamiento robusta con callbacks:

- `EarlyStopping`: detiene el entrenamiento cuando la validación no mejora.
- `ModelCheckpoint`: guarda el mejor modelo según la métrica de validación.
- `ReduceLROnPlateau`: reduce la tasa de aprendizaje cuando la métrica se estanca.
- `TensorBoard`: para visualización de métricas en tiempo real.

Durante el entrenamiento se usa:

- `train_generator` y `val_generator` para alimentar las imágenes.
- `class_weight_dict` para equilibrar la influencia de cada clase.
- `epochs=50`.
- Guardado final del modelo como `medai_pneumonia_detector.h5`.

### Evaluación

La evaluación del modelo incluye:

- `model.evaluate` sobre el conjunto de prueba.
- Predicciones binarizadas con umbral `0.5`.
- `classification_report` de sklearn para obtener precision, recall y F1-score.
- `roc_auc_score` para medir la capacidad de discriminación del modelo.
- `confusion_matrix` para examinar verdaderos y falsos positivos/negativos.

### Métricas destacadas

En la interfaz se presentan resultados de desempeño del modelo:

- Accuracy global: `96.7%`
- Sensibilidad / recall de neumonía cercana a `98.1%` en el conjunto de test.
- PPV y NPV también se describen para la confiabilidad de los diagnósticos.

## Flujo de Integración Hospitalaria

El proyecto describe un flujo de integración pensado para hospitales:

1. El hospital detecta nuevas imágenes automáticamente.
2. Las imágenes se envían al modelo de IA.
3. La CNN analiza las imágenes en menos de 2 segundos.
4. Se genera un reporte preliminar con diagnóstico, confianza y recomendaciones.
5. El radiólogo revisa y valida el resultado.
6. El diagnóstico se registra en el sistema hospitalario (HIS).

Este flujo permite priorizar casos urgentes, reducir tiempos de espera y entregar apoyo adicional al personal médico.

## Demostración e Interfaz

La aplicación web incluye una demostración interactiva donde se simula el análisis de imágenes. El frontend también incluye:

- Barra de navegación con secciones del proyecto.
- Hero visual con video de fondo y estadísticas.
- Secciones informativas con tarjetas de resultados, cifras del hospital y recomendaciones.
- Visualizaciones de arquitectura y métricas.
- Sección de preguntas frecuentes y conclusiones.

## Beneficios y Limitaciones

### Beneficios principales

- Mayor precisión diagnóstica mediante IA.
- Reducción de tiempos de espera.
- Priorización automática de casos críticos.
- Apoyo a la toma de decisiones de radiólogos.
- Potencial para escalar a otros centros hospitalarios.

### Limitaciones destacadas

- Requiere validación clínica por especialistas.
- No reemplaza al radiólogo; es un sistema de apoyo.
- Necesita monitorización continua para evitar sesgos.
- Depende de la calidad y representatividad del dataset.

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react
- TensorFlow / Keras (para el modelo descrito en los fragmentos de código)
- scikit-learn (para métricas y reporte de evaluación)

## Estructura del Proyecto

- `src/App.tsx`: entrada principal del frontend, monta todas las secciones.
- `src/components/`: componentes UI que describen el proyecto.
- `src/components/ModelCodeSection.tsx`: presenta fragmentos de código Python del modelo.
- `package.json`: configuración de dependencias y scripts.

## Cómo Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Construir para producción:
   ```bash
   npm run build
   ```
4. Previsualizar el resultado de la build:
   ```bash
   npm run preview
   ```

> Nota: Esta aplicación frontend es una presentación del proyecto. El entrenamiento real del modelo y el manejo de datos se ilustran con fragmentos de código en la interfaz; no hay un backend de entrenamiento incluido en este repositorio.

## Conclusiones

Este repositorio documenta un proyecto final de Deep Learning orientado al diagnóstico médico. Combina una propuesta teórica basada en CNN y Transfer Learning con una interfaz visual explicativa. La aplicación demuestra cómo una solución IA puede apoyar procesos hospitalarios, mejorar tiempos de respuesta y ofrecer un caso de uso real centrado en neumonía en radiografías de tórax.
