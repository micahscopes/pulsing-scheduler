import { ProgressingTimeline, ProgressingTimer } from './progressing';
import { createPulsingClock } from './PulsingClock';
/**
 * PulsingTimer is an extension of @most/core's built-in Timer that advances time in discrete increments
 * of "pulses".
 *
 * Calling `pulse` will increment the timer one pulse at a time for the given number of pulses, running
 * any tasks scheduled along the way, along with previously scheduled tasks that haven't been run yet.
 *
 * It implements a Disposable instance in the event you would like to remove all tasks previously scheduled.
 */
export class PulsingTimer extends ProgressingTimer {
    constructor(clock = createPulsingClock(), unitPulse = 1) {
        super();
        this.unitPulse = unitPulse;
        this.clock = clock;
        this.timeline = new ProgressingTimeline();
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
//# sourceMappingURL=PulsingTimer.js.map