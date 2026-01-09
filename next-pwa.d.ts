declare module 'next-pwa';

interface PWAConfig {
  dest?: string;
  register?: boolean;
  skipWaiting?: boolean;
  disable?: boolean;
  buildExcludes?: RegExp[];
  scope?: string;
  sw?: string;
  runtimeCaching?: string | boolean;
  fallbacks?: Record<string, string>;
  cacheOnFrontendNav?: boolean;
  reloadOnOnline?: boolean;
  syncManifestPages?: boolean;
  manifestSyncUrl?: string;
  workboxOptions?: any;
  // Next.js specific options
  swcMinify?: boolean;
  manifestCrossorigin?: string;
  generateSw?: boolean;
  devSw?: boolean;
  type?: 'module' | 'classic' | 'custom';
}

export interface PWAConfigWithDefault extends PWAConfig {
  default: PWAConfig;
}

declare function withPWA(config?: PWAConfig | (() => PWAConfig)): PWAConfigWithDefault;
