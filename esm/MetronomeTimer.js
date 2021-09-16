import { ProgressingTimeline, ProgressingTimer } from './progressing';
/**
 * A MetronomeTimer is a timer that advances time at a rate given by its tempo.
 */
export class MetronomeTimer extends ProgressingTimer {
    constructor(clock) {
        super();
        this.clock = this.metronome = clock;
        this.timeline = new ProgressingTimeline();
    }
    playTo(secondsElapsed) {
        const pulses = this.clock.playTo(secondsElapsed);
        for (let i = 0; i < pulses; i++) {
            this.runTasks();
        }
        return pulses;
    }
    playToBeats(beatsElapsed) {
        return this.playTo(beatsElapsed / this.metronome.beatsPerSecond);
    }
}
//# sourceMappingURL=MetronomeTimer.js.map