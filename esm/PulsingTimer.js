import { PulsingTimeline } from './internal';
import { createPulsingClock } from './PulsingClock';
export function createPulsingTimer(clock = createPulsingClock(), unitPulse = 1) {
    const timeline = new PulsingTimeline();
    function delay(delayPulsings, f) {
        const time = clock.now() + delayPulsings;
        timeline.addTask(time, f);
        return { dispose: () => timeline.removeTask(time, f) };
    }
    function runTasks() {
        const currentTime = clock.now();
        const tasks = timeline.readyTasks(currentTime);
        tasks.forEach((task) => task(currentTime));
    }
    let id = 0;
    const disposables = new Map();
    function setTimer(f, delayPulsings) {
        const handle = id++;
        disposables.set(handle, delay(delayPulsings, () => {
            disposables.delete(handle);
            f();
        }));
        return handle;
    }
    function clearTimer(handle) {
        var _a;
        (_a = disposables.get(handle)) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    function dispose() {
        disposables.forEach((d) => d.dispose());
        disposables.clear();
    }
    return {
        ...clock,
        setTimer,
        clearTimer,
        dispose,
        pulse: (duration = unitPulse) => {
            let time = clock.now();
            // advance time by `unitPulse` until the given duration has passed
            for (let i = 0; i < duration; i += unitPulse) {
                time = clock.pulse(unitPulse);
                runTasks();
            }
            return time;
        },
    };
}
//# sourceMappingURL=PulsingTimer.js.map