import { useState, useEffect } from 'react'
import { getDatasetStats, getDatasetMetadata, type DatasetStats } from '../services/kaggleApi'

interface UseDatasetDataReturn {
  stats: DatasetStats | null
  metadata: any
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook personalizado para obtener datos del dataset de Kaggle
 * 
 * Uso:
 * const { stats, metadata, loading, error, refetch } = useDatasetData()
 */
export function useDatasetData(): UseDatasetDataReturn {
  const [stats, setStats] = useState<DatasetStats | null>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [statsData, metadataData] = await Promise.all([
        getDatasetStats(),
        getDatasetMetadata(),
      ])
      
      setStats(statsData)
      setMetadata(metadataData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos del dataset'
      setError(errorMessage)
      console.error('Error en useDatasetData:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    stats,
    metadata,
    loading,
    error,
    refetch: fetchData,
  }
}
