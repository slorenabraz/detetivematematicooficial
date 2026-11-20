declare const __APP_URL__: string | undefined;

type ViteEnvRecord = Record<string, string | boolean | undefined>;

function readViteEnv(): ViteEnvRecord {
  try {
    const meta = import.meta as unknown as { env?: ViteEnvRecord };
    return meta.env || {};
  } catch {
    return {};
  }
}

export function getEnvVar(key: string): string {
  const env = readViteEnv();
  const value = env[key];
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Resolves the public application URL across Vercel, AI Studio, and local dev.
 * Fallback order:
 * 1. APP_URL (injected at build time from Vercel or AI Studio)
 * 2. VITE_APP_URL (optional Vite-prefixed override)
 * 3. window.location.origin (automatic runtime fallback)
 */
export function getAppUrl(): string {
  const buildTimeUrl =
    typeof __APP_URL__ === 'string' ? __APP_URL__.trim() : '';
  if (buildTimeUrl) {
    return buildTimeUrl.replace(/\/+$/, '');
  }

  const viteUrl = getEnvVar('VITE_APP_URL');
  if (viteUrl) {
    return viteUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return '';
}
