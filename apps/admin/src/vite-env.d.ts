// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESALA_ADMIN_BACKEND_URL: string
  readonly VITE_RESALA_STOREFRONT_URL: string
  readonly VITE_RESALA_V2: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot: {
    accept: () => void
  }
}

declare const __BACKEND_URL__: string | undefined
declare const __STOREFRONT_URL__: string | undefined
declare const __BASE__: string
