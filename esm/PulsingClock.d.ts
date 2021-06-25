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
export declare function createPulsingClock(time?: Time): PulsingClock
//# sourceMappingURL=PulsingClock.d.ts.map
