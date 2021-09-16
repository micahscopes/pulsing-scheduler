import { Scheduler } from '@most/types'

import { BeatsPerMinute, Seconds } from './Metronome'
import { MetronomeTimer } from './MetronomeTimer'
import { PulsingTimer } from './PulsingTimer'
export * from './Metronome'
export * from './MetronomeTimer'
export * from './progressing'
export * from './PulsingClock'
export * from './PulsingTimer'
/**
 * Create a [PulsingTimer, Scheduler] pair
 */
export declare const createPulsingScheduler: () => readonly [timer: PulsingTimer, scheduler: Scheduler]
/**
 * Create a [MetronomeTimer, Scheduler] pair
 */
export declare const createMetronomeScheduler: (
  tempo: BeatsPerMinute,
  startTimeSeconds?: Seconds,
  pulsesPerBeat?: number,
) => readonly [timer: MetronomeTimer, scheduler: Scheduler]
//# sourceMappingURL=index.d.ts.map
