/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string,
  readonly VITE_APP_TITLE: string,
  readonly VITE_APP_THEME?: string,
  readonly VITE_APP_COPYRIGHT?: string,
  readonly VITE_APP_UPLOAD_URL?: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
