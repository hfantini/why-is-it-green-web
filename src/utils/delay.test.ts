import { describe, it, expect, vi } from 'vitest'
import { delay } from './delay'

describe('delay', () => {
  it('resolves after specified time', async () => {
    vi.useFakeTimers()
    const promise = delay(100)
    vi.advanceTimersByTime(100)
    await expect(promise).resolves.toBeUndefined()
  })
})
