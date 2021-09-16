"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetronomeTimer = void 0;
const progressing_1 = require("./progressing");
/**
 * A MetronomeTimer is a timer that advances time at a rate given by its tempo.
 */
class MetronomeTimer extends progressing_1.ProgressingTimer {
    constructor(clock) {
        super();
        this.clock = this.metronome = clock;
        this.timeline = new progressing_1.ProgressingTimeline();
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
exports.MetronomeTimer = MetronomeTimer;
//# sourceMappingURL=MetronomeTimer.js.map