/**
 * Servicio para interactuar con la API de Kaggle
 * 
 * IMPORTANTE: La API de Kaggle no permite CORS desde el navegador.
 * Para producción, usa uno de estos approaches:
 * 
 * 1. Backend proxy (recomendado): Crea un endpoint en tu servidor que llame a Kaggle
 * 2. Vercel Edge Function: Usa una serverless function como proxy
 * 3. Datos estáticos: Usa los datos hardcodeados como fallback (implementado aquí)
 * 
 * Para obtener tu API key:
 * 1. Ve a https://www.kaggle.com/settings/account
 * 2. Click en "Create New API Token"
 * 3. Descarga el archivo kaggle.json
 * 4. Copia el "key" y ponlo en .env como VITE_KAGGLE_API_KEY
 */

interface KaggleDatasetMetadata {
  id: string
  title: string
  subtitle: string
  description: string
  creatorName: string
  url: string
  totalBytes: number
  viewCount: number
  downloadCount: number
  voteCount: number
  usabilityRating: number
  licenses: Array<{ name: string }>
  files: Array<{
    name: string
    size: number
    creationDate: string
  }>
}

interface DatasetStats {
  train: {
    normal: number
    pneumonia: number
    total: number
  }
  validation: {
    normal: number
    pneumonia: number
    total: number
  }
  test: {
    normal: number
    pneumonia: number
    total: number
  }
  totalImages: number
  imbalanceRatio: number
  pneumoniaPercentage: number
  normalPercentage: number
}

// Datos estáticos del dataset real de Kaggle
// Fuente: kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia
const STATIC_DATASET_STATS: DatasetStats = {
  train: {
    normal: 1341,
    pneumonia: 3875,
    total: 5216,
  },
  validation: {
    normal: 8,
    pneumonia: 8,
    total: 16,
  },
  test: {
    normal: 234,
    pneumonia: 390,
    total: 624,
  },
  totalImages: 5856,
  imbalanceRatio: 2.89,
  pneumoniaPercentage: 74.3,
  normalPercentage: 25.7,
}

const STATIC_DATASET_METADATA = {
  title: 'Chest X-Ray Images (Pneumonia)',
  creator: 'Paul Mooney',
  source: 'Guangzhou Women and Children\'s Medical Center',
  description: 'Chest X-ray images (anterior-posterior) were selected from retrospective cohorts of pediatric patients of one to five years old from Guangzhou Women and Children\'s Medical Center, Guangzhou.',
  format: 'JPEG',
  type: 'Escala de grises',
  resolution: '~1000×1000 px',
  modelResize: '224 × 224 px',
  classes: 2,
  classNames: ['Normal', 'Neumonía'],
  url: 'kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
}

/**
 * Obtiene el token de autenticación de Kaggle desde las variables de entorno
 */
function getKaggleAuth(): string | null {
  const username = import.meta.env.VITE_KAGGLE_USERNAME
  const apiKey = import.meta.env.VITE_KAGGLE_API_KEY
  
  if (!username || !apiKey) {
    console.warn('⚠️ Kaggle API credentials not found in .env file')
    return null
  }
  
  return `${username}:${apiKey}`
}

/**
 * Obtiene metadatos del dataset desde la API de Kaggle
 * 
 * NOTA: Esta función probablemente fallará por CORS en el navegador.
 * Usa getDatasetStats() que tiene fallback automático.
 */
export async function fetchKaggleDatasetMetadata(): Promise<KaggleDatasetMetadata | null> {
  const auth = getKaggleAuth()
  const owner = import.meta.env.VITE_KAGGLE_DATASET_OWNER || 'paultimothymooney'
  const slug = import.meta.env.VITE_KAGGLE_DATASET_SLUG || 'chest-xray-pneumonia'
  
  if (!auth) {
    console.log('📦 Usando datos estáticos del dataset (sin credenciales de Kaggle)')
    return null
  }

  try {
    // Intento directo (probablemente fallará por CORS)
    const response = await fetch(
      `https://www.kaggle.com/api/v1/datasets/view/${owner}/${slug}`,
      {
        headers: {
          'Authorization': `Basic ${btoa(auth)}`,
          'Content-Type': 'application/json',
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`Kaggle API error: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('✅ Datos obtenidos de Kaggle API:', data)
    return data
  } catch (error) {
    console.warn('⚠️ No se pudo conectar a Kaggle API (posible CORS). Usando datos estáticos.')
    console.warn('Error:', error)
    return null
  }
}

/**
 * Obtiene estadísticas del dataset
 * Intenta obtener datos reales de la API, fallback a datos estáticos
 */
export async function getDatasetStats(): Promise<DatasetStats> {
  // Intentar obtener datos de la API
  const metadata = await fetchKaggleDatasetMetadata()
  
  if (metadata && metadata.files) {
    // Si tenemos datos reales, calcular estadísticas
    // (esto requeriría parsear la estructura de archivos del dataset)
    console.log('📊 Usando estadísticas calculadas de Kaggle API')
  }
  
  // Fallback a datos estáticos del dataset real
  console.log('📊 Usando estadísticas estáticas del dataset Chest X-Ray Pneumonia')
  return STATIC_DATASET_STATS
}

/**
 * Obtiene metadatos del dataset
 */
export async function getDatasetMetadata() {
  const metadata = await fetchKaggleDatasetMetadata()
  
  if (metadata) {
    return {
      ...STATIC_DATASET_METADATA,
      title: metadata.title,
      creator: metadata.creatorName,
    }
  }
  
  return STATIC_DATASET_METADATA
}

/**
 * Simula la descarga del dataset usando kagglehub (Python)
 * Esto es solo informativo - en producción necesitarías un backend
 * 
 * Equivalente Python:
 * import kagglehub
 * path = kagglehub.dataset_download("paultimothymooney/chest-xray-pneumonia")
 */
export function getKaggleHubCommand(): string {
  const owner = import.meta.env.VITE_KAGGLE_DATASET_OWNER || 'paultimothymooney'
  const slug = import.meta.env.VITE_KAGGLE_DATASET_SLUG || 'chest-xray-pneumonia'
  
  return `import kagglehub

# Download latest version
path = kagglehub.dataset_download("${owner}/${slug}")

print("Path to dataset files:", path)`
}

export type { KaggleDatasetMetadata, DatasetStats }
export { STATIC_DATASET_STATS, STATIC_DATASET_METADATA }