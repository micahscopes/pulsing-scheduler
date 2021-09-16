import { Time } from '@most/types'

import { ProgressingTimeline, ProgressingTimer } from './progressing'
import { PulsingClock } from './PulsingClock'
/**
 * PulsingTimer is an extension of @most/core's built-in Timer that advances time in discrete increments
 * of "pulses".
 *
 * Calling `pulse` will increment the timer one pulse at a time for the given number of pulses, running
 * any tasks scheduled along the way, along with previously scheduled tasks that haven't been run yet.
 *
 * It implements a Disposable instance in the event you would like to remove all tasks previously scheduled.
 */
export declare class PulsingTimer extends ProgressingTimer {
  protected clock: PulsingClock
  protected unitPulse: number
  readonly timeline: ProgressingTimeline
  constructor(clock?: PulsingClock, unitPulse?: number)
  pulse(pulses?: Time): number
}
//# sourceMappingURL=PulsingTimer.d.ts.map
