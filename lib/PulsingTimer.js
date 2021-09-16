"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsingTimer = void 0;
const progressing_1 = require("./progressing");
const PulsingClock_1 = require("./PulsingClock");
/**
 * PulsingTimer is an extension of @most/core's built-in Timer that advances time in discrete increments
 * of "pulses".
 *
 * Calling `pulse` will increment the timer one pulse at a time for the given number of pulses, running
 * any tasks scheduled along the way, along with previously scheduled tasks that haven't been run yet.
 *
 * It implements a Disposable instance in the event you would like to remove all tasks previously scheduled.
 */
class PulsingTimer extends progressing_1.ProgressingTimer {
    constructor(clock = PulsingClock_1.createPulsingClock(), unitPulse = 1) {
        super();
        this.unitPulse = unitPulse;
        this.clock = clock;
        this.timeline = new progressing_1.ProgressingTimeline();
    }
    // advances the timer by a given number of discrete pulses
    pulse(pulses = this.unitPulse) {
        let time = this.clock.now();
        // advance time by `unitPulse` until the given duration has passed
        for (let i = 0; i < pulses; i += this.unitPulse) {
            time = this.clock.pulse(this.unitPulse);
            this.runTasks();
        }
        return time;
    }
}
exports.PulsingTimer = PulsingTimer;
//# sourceMappingURL=PulsingTimer.js.map