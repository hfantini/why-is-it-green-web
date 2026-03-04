import { fireEvent, render, screen } from '@testing-library/vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import App from './App.vue'

describe('App state', () => {
  it('shows loading state initially', () => {
    render(App)

    expect(screen.getByText('⏳')).toBeInTheDocument()
    expect(screen.getByText("Checking if it's still green")).toBeInTheDocument()
  })

  it('shows ready state after app finishes loading', async () => {
    vi.useFakeTimers()

    render(App)

    vi.advanceTimersByTime(3000)

    expect(await screen.findByText('😎')).toBeInTheDocument()
    expect(screen.getByText("Production is chillin'")).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('shows WHY button after loading', async () => {
    vi.useFakeTimers()

    render(App)

    vi.advanceTimersByTime(3000)

    expect(await screen.findByRole('button', { name: 'WHY?' })).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('shows excuse message after delay', async () => {
    vi.useFakeTimers()

    render(App)

    vi.advanceTimersByTime(3000)

    const button = await screen.findByRole('button', { name: 'WHY?' })

    await fireEvent.click(button)

    vi.advanceTimersByTime(1000)

    expect(await screen.findByText(/CI passed on the first try/)).toBeInTheDocument()

    vi.useRealTimers()
  })
})

describe('App events', () => {
  it('shows loader after clicking WHY', async () => {
    vi.useFakeTimers()

    render(App)

    vi.advanceTimersByTime(3000)

    const button = await screen.findByRole('button', { name: 'WHY?' })

    await fireEvent.click(button)

    expect(button).toBeDisabled()
    expect(document.querySelector('.loader')).toBeInTheDocument()

    vi.useRealTimers()
  })
})

describe('App emojis', () => {
  it('shows hourglass emoji while loading', () => {
    render(App)
    expect(screen.getByText('⏳')).toBeInTheDocument()
  })

  it('shows cool emoji after loading finishes', async () => {
    vi.useFakeTimers()

    render(App)

    vi.advanceTimersByTime(3000)

    expect(await screen.findByText('😎')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('renders correct footer icons', () => {
    render(App)

    expect(screen.getByTitle('Version').textContent).toContain('🏷️')
    expect(screen.getByTitle('Environment').textContent).toContain('🚀')
    expect(screen.getByTitle('Build Number').textContent).toContain('🛠️')
    expect(screen.getByTitle('Git SHA').textContent).toContain('🌿')
  })
})

describe('App footer metadata', () => {
  beforeEach(() => {
    window.__RUNTIME_CONFIG__ = {
      environment: 'test',
    }

    // @ts-expect-error test globals
    globalThis.__APP_VERSION__ = '1.0.0'

    // @ts-expect-error test globals
    globalThis.__BUILD_NUMBER__ = '42'

    // @ts-expect-error test globals
    globalThis.__GIT_SHA__ = 'abc123'
  })

  it('renders build metadata in footer', async () => {
    render(App)

    expect(screen.getByTitle('Version')).toHaveTextContent('v1.0.0')
    expect(screen.getByTitle('Environment')).toHaveTextContent('test')
    expect(screen.getByTitle('Build Number')).toHaveTextContent('#42')
    expect(screen.getByTitle('Git SHA')).toHaveTextContent('abc123')
  })
})
