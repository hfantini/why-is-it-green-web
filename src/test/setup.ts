import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'

// Mock runtime config injected by the platform
Object.defineProperty(window, '__RUNTIME_CONFIG__', {
  value: {
    environment: 'test',
  },
  writable: true,
})

// Mock build-time variables injected by Vite
// @ts-expect-error test global
globalThis.__APP_VERSION__ = '0.0.0-test'

// @ts-expect-error test global
globalThis.__BUILD_NUMBER__ = '0'

// @ts-expect-error test global
globalThis.__GIT_SHA__ = 'test-sha'

// Global rules after each
afterEach(() => {
  vi.useRealTimers()
})
