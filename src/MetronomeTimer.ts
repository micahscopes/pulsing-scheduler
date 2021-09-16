import { Time } from '@most/types'

import { Beats, Metronome } from './Metronome'
import { ProgressingTimeline, ProgressingTimer } from './progressing'

/**
 * A MetronomeTimer is a timer that advances time at a rate given by its tempo.
 */

export class MetronomeTimer extends ProgressingTimer {
  readonly clock: Metronome
  readonly metronome: Metronome
  readonly timeline: ProgressingTimeline

  constructor(clock: Metronome) {
    super()
    this.clock = this.metronome = clock
    this.timeline = new ProgressingTimeline()
  }

  playTo(secondsElapsed: Time) {
    const pulses = this.clock.playTo(secondsElapsed)
    for (let i = 0; i < pulses; i++) {
      this.runTasks()
    }

    return pulses
  }

  playToBeats(beatsElapsed: Beats) {
    return this.playTo(beatsElapsed / this.metronome.beatsPerSecond)
  }
}
