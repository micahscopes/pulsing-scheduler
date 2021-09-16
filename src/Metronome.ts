import { Clock, Time } from '@most/types'

import { createPulsingClock, PulsingClock } from './PulsingClock'

export type BeatsPerMinute = number
export type BeatsPerSecond = number
export type PulsesPerSecond = number
export type Beats = Time
export type Seconds = Time

export const beatsPerSecond = (rate: BeatsPerMinute) => (rate / 60) as BeatsPerSecond

export class Metronome implements Clock {
  protected _secondsElapsed: Seconds
  protected _tempo: BeatsPerMinute
  protected pulsesPerBeat: number

  protected originPulses: Time
  protected originSeconds: Seconds
  protected pulsingClock: PulsingClock

  constructor(tempo: BeatsPerMinute, startTimeSeconds: Time = 0, pulsesPerBeat = 960) {
    this.pulsesPerBeat = pulsesPerBeat
    this.pulsingClock = createPulsingClock()
    this._secondsElapsed = this.originSeconds = startTimeSeconds
    this.originPulses = 0
    this._tempo = tempo
  }

  public get BEAT() {
    return this.pulsesPerBeat
  }

  protected setOriginNow() {
    this.originSeconds = this.secondsElapsed
    this.originPulses = this.pulsingClock.now()
  }

  public get tempo(): BeatsPerMinute {
    return this._tempo
  }
  public set tempo(t: BeatsPerMinute) {
    this._tempo = t
    this.setOriginNow()
  }

  now(): Time {
    return this.pulsingClock.now()
  }

  get pulsesElapsed(): Time {
    return this.pulsingClock.now()
  }

  get secondsElapsed(): Seconds {
    return this._secondsElapsed
  }

  get beatsPerSecond(): BeatsPerSecond {
    return beatsPerSecond(this._tempo)
  }

  get pulsesPerSecond(): PulsesPerSecond {
    return this.beatsPerSecond * this.pulsesPerBeat
  }

  beatsElapsed(): Beats {
    return (this.now() / this.pulsesPerBeat) as Beats
  }

  playTo(secondsElapsed: Seconds) {
    this._secondsElapsed = secondsElapsed
    const dSeconds: Seconds = this.secondsElapsed - this.originSeconds
    const pulseDuration = Math.round(dSeconds * this.pulsesPerSecond) - (this.pulsesElapsed - this.originPulses)
    this.pulsingClock.pulse(pulseDuration)
    return pulseDuration
  }
}
