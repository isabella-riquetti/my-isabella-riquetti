/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PostHog project key (public, ships in the bundle). Unset: nothing is sent. */
  readonly VITE_POSTHOG_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
