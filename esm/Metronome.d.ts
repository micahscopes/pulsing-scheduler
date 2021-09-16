import { Clock, Time } from '@most/types'

import { PulsingClock } from './PulsingClock'
export declare type BeatsPerMinute = number
export declare type BeatsPerSecond = number
export declare type PulsesPerSecond = number
export declare type Beats = Time
export declare type Seconds = Time
export declare const beatsPerSecond: (rate: BeatsPerMinute) => number
export declare class Metronome implements Clock {
  protected _secondsElapsed: Seconds
  protected _tempo: BeatsPerMinute
  protected pulsesPerBeat: number
  protected originPulses: Time
  protected originSeconds: Seconds
  protected pulsingClock: PulsingClock
  constructor(tempo: BeatsPerMinute, startTimeSeconds?: Time, pulsesPerBeat?: number)
  get BEAT(): number
  protected setOriginNow(): void
  get tempo(): BeatsPerMinute
  set tempo(t: BeatsPerMinute)
  now(): Time
  get pulsesElapsed(): Time
  get secondsElapsed(): Seconds
  get beatsPerSecond(): BeatsPerSecond
  get pulsesPerSecond(): PulsesPerSecond
  beatsElapsed(): Beats
  playTo(secondsElapsed: Seconds): number
}
//# sourceMappingURL=Metronome.d.ts.map
