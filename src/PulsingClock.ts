import { Clock, Time } from '@most/types'

/**
 * A `Clock` where time is progressed manually via a `pulse` function.
 */

export interface PulsingClock extends Clock {
  readonly pulse: (duration: Time) => Time
  readonly sync: (phase: Time) => Time
}

/**
 * Create a pulsing clock
 */
export function createPulsingClock(time: Time = 0): PulsingClock {
  return {
    now: () => time,
    pulse: (duration: Time = 1) => (time += duration),
    sync: (phase: Time) => (time = phase),
  }
}
