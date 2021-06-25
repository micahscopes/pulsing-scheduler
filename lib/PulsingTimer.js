"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPulsingTimer = void 0;
const internal_1 = require("./internal");
const PulsingClock_1 = require("./PulsingClock");
function createPulsingTimer(clock = PulsingClock_1.createPulsingClock(), defaultDuration = 1) {
    const timeline = new internal_1.PulsingTimeline();
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
        pulse: (duration = defaultDuration) => {
            const time = clock.pulse(duration);
            runTasks();
            return time;
        },
    };
}
exports.createPulsingTimer = createPulsingTimer;
//# sourceMappingURL=PulsingTimer.js.map