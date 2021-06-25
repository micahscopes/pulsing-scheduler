import { newScheduler, newTimeline } from '@most/scheduler';
import { createPulsingTimer } from './PulsingTimer';
/**
 * Create a [PulsingTimer, Scheduler] pair
 */
export const createPulsingScheduler = () => {
    const timer = createPulsingTimer();
    const scheduler = newScheduler(timer, newTimeline());
    return [timer, scheduler];
};
//# sourceMappingURL=createPulsingScheduler.js.map