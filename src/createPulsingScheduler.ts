import { newScheduler, newTimeline } from '@most/scheduler'
import { Scheduler } from '@most/types'

import { createPulsingTimer, PulsingTimer } from './PulsingTimer'

/**
 * Create a [PulsingTimer, Scheduler] pair
 */
export const createPulsingScheduler = (): readonly [timer: PulsingTimer, scheduler: Scheduler] => {
  const timer: PulsingTimer = createPulsingTimer()
  const scheduler = newScheduler(timer, newTimeline())

  return [timer, scheduler] as const
}
