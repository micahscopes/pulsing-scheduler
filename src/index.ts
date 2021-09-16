import { newScheduler, newTimeline } from '@most/scheduler'
import { Scheduler } from '@most/types'

import { BeatsPerMinute, Metronome, Seconds } from './Metronome'
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
export const createPulsingScheduler = (): readonly [timer: PulsingTimer, scheduler: Scheduler] => {
  const timer: PulsingTimer = new PulsingTimer()
  const scheduler = newScheduler(timer, newTimeline())

  return [timer, scheduler] as const
}

/**
 * Create a [MetronomeTimer, Scheduler] pair
 */
export const createMetronomeScheduler = (
  tempo: BeatsPerMinute,
  startTimeSeconds: Seconds = 0,
  pulsesPerBeat = 960,
): readonly [timer: MetronomeTimer, scheduler: Scheduler] => {
  const metronome = new Metronome(tempo, startTimeSeconds, pulsesPerBeat)
  const timer: MetronomeTimer = new MetronomeTimer(metronome)
  const scheduler = newScheduler(timer, newTimeline())

  return [timer, scheduler] as const
}
