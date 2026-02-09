// Environment Configuration
// All API endpoints and environment-specific settings

export const ENV_CONFIG = {
  // API Endpoints
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.aiattorney.pk',
  TYPESENSE_HOST: import.meta.env.VITE_TYPESENSE_HOST || 'typesense.aiattorney.pk',
  TYPESENSE_PORT: import.meta.env.VITE_TYPESENSE_PORT || '443',
  TYPESENSE_PROTOCOL: import.meta.env.VITE_TYPESENSE_PROTOCOL || 'https',
  TYPESENSE_API_KEY: import.meta.env.VITE_TYPESENSE_API_KEY || '',
  
  // Speechmatics
  SPEECHMATICS_API_KEY: import.meta.env.VITE_SPEECHMATICS_API_KEY || '',
  SPEECHMATICS_ENDPOINT: import.meta.env.VITE_SPEECHMATICS_ENDPOINT || 'wss://eu2.rt.speechmatics.com/v2',
  
  // Feature Flags
  ENABLE_VOICE_RECORDING: true,
  ENABLE_DOCUMENT_UPLOAD: true,
  ENABLE_WEB_SEARCH: true,
  ENABLE_PREMIUM_FEATURES: true,
  
  // App Settings
  APP_NAME: 'AI Attorney',
  APP_VERSION: '1.0.0',
  MAX_FILE_SIZE_MB: 10,
  SUPPORTED_FILE_TYPES: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'],
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Cache Settings
  CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
  
  // Timeouts
  API_TIMEOUT_MS: 30000,
  SSE_TIMEOUT_MS: 60000,
} as const;

export type EnvConfig = typeof ENV_CONFIG;
