/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAGGLE_USERNAME: string
  readonly VITE_KAGGLE_API_KEY: string
  readonly VITE_KAGGLE_DATASET_OWNER: string
  readonly VITE_KAGGLE_DATASET_SLUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}