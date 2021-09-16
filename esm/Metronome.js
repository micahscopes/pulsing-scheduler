import { createPulsingClock } from './PulsingClock';
export const beatsPerSecond = (rate) => (rate / 60);
export class Metronome {
    constructor(tempo, startTimeSeconds = 0, pulsesPerBeat = 960) {
        this.pulsesPerBeat = pulsesPerBeat;
        this.pulsingClock = createPulsingClock();
        this._secondsElapsed = this.originSeconds = startTimeSeconds;
        this.originPulses = 0;
        this._tempo = tempo;
    }
    get BEAT() {
        return this.pulsesPerBeat;
    }
    setOriginNow() {
        this.originSeconds = this.secondsElapsed;
        this.originPulses = this.pulsingClock.now();
    }
    get tempo() {
        return this._tempo;
    }
    set tempo(t) {
        this._tempo = t;
        this.setOriginNow();
    }
    now() {
        return this.pulsingClock.now();
    }
    get pulsesElapsed() {
        return this.pulsingClock.now();
    }
    get secondsElapsed() {
        return this._secondsElapsed;
    }
    get beatsPerSecond() {
        return beatsPerSecond(this._tempo);
    }
    get pulsesPerSecond() {
        return this.beatsPerSecond * this.pulsesPerBeat;
    }
    beatsElapsed() {
        return (this.now() / this.pulsesPerBeat);
    }
    playTo(secondsElapsed) {
        this._secondsElapsed = secondsElapsed;
        const dSeconds = this.secondsElapsed - this.originSeconds;
        const pulseDuration = Math.round(dSeconds * this.pulsesPerSecond) - (this.pulsesElapsed - this.originPulses);
        this.pulsingClock.pulse(pulseDuration);
        return pulseDuration;
    }
}
//# sourceMappingURL=Metronome.js.map