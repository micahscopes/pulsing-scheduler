import { newScheduler, newTimeline } from '@most/scheduler';
import { Metronome } from './Metronome';
import { MetronomeTimer } from './MetronomeTimer';
import { PulsingTimer } from './PulsingTimer';
export * from './Metronome';
export * from './MetronomeTimer';
export * from './progressing';
export * from './PulsingClock';
export * from './PulsingTimer';
/**
 * Create a [PulsingTimer, Scheduler] pair
 */
export const createPulsingScheduler = () => {
    const timer = new PulsingTimer();
    const scheduler = newScheduler(timer, newTimeline());
    return [timer, scheduler];
};
/**
 * Create a [MetronomeTimer, Scheduler] pair
 */
export const createMetronomeScheduler = (tempo, startTimeSeconds = 0, pulsesPerBeat = 960) => {
    const metronome = new Metronome(tempo, startTimeSeconds, pulsesPerBeat);
    const timer = new MetronomeTimer(metronome);
    const scheduler = newScheduler(timer, newTimeline());
    return [timer, scheduler];
};
//# sourceMappingURL=index.js.map