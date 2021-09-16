"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetronomeScheduler = exports.createPulsingScheduler = void 0;
const scheduler_1 = require("@most/scheduler");
const Metronome_1 = require("./Metronome");
const MetronomeTimer_1 = require("./MetronomeTimer");
const PulsingTimer_1 = require("./PulsingTimer");
__exportStar(require("./Metronome"), exports);
__exportStar(require("./MetronomeTimer"), exports);
__exportStar(require("./progressing"), exports);
__exportStar(require("./PulsingClock"), exports);
__exportStar(require("./PulsingTimer"), exports);
/**
 * Create a [PulsingTimer, Scheduler] pair
 */
const createPulsingScheduler = () => {
    const timer = new PulsingTimer_1.PulsingTimer();
    const scheduler = scheduler_1.newScheduler(timer, scheduler_1.newTimeline());
    return [timer, scheduler];
};
exports.createPulsingScheduler = createPulsingScheduler;
/**
 * Create a [MetronomeTimer, Scheduler] pair
 */
const createMetronomeScheduler = (tempo, startTimeSeconds = 0, pulsesPerBeat = 960) => {
    const metronome = new Metronome_1.Metronome(tempo, startTimeSeconds, pulsesPerBeat);
    const timer = new MetronomeTimer_1.MetronomeTimer(metronome);
    const scheduler = scheduler_1.newScheduler(timer, scheduler_1.newTimeline());
    return [timer, scheduler];
};
exports.createMetronomeScheduler = createMetronomeScheduler;
//# sourceMappingURL=index.js.map