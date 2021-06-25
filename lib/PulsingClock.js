"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPulsingClock = void 0;
/**
 * Create a pulsing clock
 */
function createPulsingClock(time = 0) {
    return {
        now: () => time,
        pulse: (duration = 1) => (time += duration),
        sync: (phase) => (time = phase),
    };
}
exports.createPulsingClock = createPulsingClock;
//# sourceMappingURL=PulsingClock.js.map