/**
 * Create a pulsing clock
 */
export function createPulsingClock(time = 0) {
    return {
        now: () => time,
        pulse: (duration = 1) => (time += duration),
        sync: (phase) => (time = phase),
    };
}
//# sourceMappingURL=PulsingClock.js.map