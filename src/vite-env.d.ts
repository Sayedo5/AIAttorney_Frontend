/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_TYPESENSE_HOST: string;
  readonly VITE_TYPESENSE_PORT: string;
  readonly VITE_TYPESENSE_PROTOCOL: string;
  readonly VITE_TYPESENSE_API_KEY: string;
  readonly VITE_SPEECHMATICS_API_KEY: string;
  readonly VITE_SPEECHMATICS_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
