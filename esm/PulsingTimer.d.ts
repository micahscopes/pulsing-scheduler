import { Disposable, Timer } from '@most/types'

import { PulsingClock } from './PulsingClock'
/**
 * A PulsingTimer is an extension of @most/core's built-in Timer, but when progressing time
 * it will run any tasks at or before the time progressed to. It implements a Disposable instance
 * in the event you would like to remove all tasks previously scheduled.
 */
export interface PulsingTimer extends Timer, PulsingClock, Disposable {}
export declare function createPulsingTimer(clock?: PulsingClock, defaultDuration?: number): PulsingTimer
//# sourceMappingURL=PulsingTimer.d.ts.map
