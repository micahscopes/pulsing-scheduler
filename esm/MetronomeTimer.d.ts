import { Time } from '@most/types'

import { Beats, Metronome } from './Metronome'
import { ProgressingTimeline, ProgressingTimer } from './progressing'
/**
 * A MetronomeTimer is a timer that advances time at a rate given by its tempo.
 */
export declare class MetronomeTimer extends ProgressingTimer {
  readonly clock: Metronome
  readonly metronome: Metronome
  readonly timeline: ProgressingTimeline
  constructor(clock: Metronome)
  playTo(secondsElapsed: Time): number
  playToBeats(beatsElapsed: Beats): number
}
//# sourceMappingURL=MetronomeTimer.d.ts.map
