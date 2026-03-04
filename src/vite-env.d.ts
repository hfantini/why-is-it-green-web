interface RuntimeConfig {
  environment: string
}

declare global {
  declare const __APP_VERSION__: string
  declare const __BUILD_NUMBER__: string
  declare const __GIT_SHA__: string

  interface Window {
    __RUNTIME_CONFIG__: RuntimeConfig
  }
}

export {}
