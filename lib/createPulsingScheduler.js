"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPulsingScheduler = void 0;
const scheduler_1 = require("@most/scheduler");
const PulsingTimer_1 = require("./PulsingTimer");
/**
 * Create a [PulsingTimer, Scheduler] pair
 */
const createPulsingScheduler = () => {
    const timer = PulsingTimer_1.createPulsingTimer();
    const scheduler = scheduler_1.newScheduler(timer, scheduler_1.newTimeline());
    return [timer, scheduler];
};
exports.createPulsingScheduler = createPulsingScheduler;
//# sourceMappingURL=createPulsingScheduler.js.map