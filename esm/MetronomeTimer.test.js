import { periodic, runEffects, skip, take, tap } from '@most/core';
import { pipe } from 'fp-ts/function';
import { assert, spy } from 'sinon';
import { createMetronomeScheduler } from './index';
describe('MetronomeTimer', () => {
    describe('given a MetronomeTimer/Scheduler pair', () => {
        it('runs effects for a periodic stream at the correct rate', () => {
            const beat = spy();
            const [timer, scheduler] = createMetronomeScheduler(60);
            const test$ = pipe(periodic(timer.metronome.BEAT), // emit every second
            tap(beat), take(4));
            runEffects(test$, scheduler);
            timer.playTo(10);
            assert.callCount(beat, 4);
        });
        it('responds to dynamic tempo changes', () => {
            const beat = spy();
            const [timer, scheduler] = createMetronomeScheduler(60);
            const test$ = pipe(periodic(timer.metronome.BEAT), // emit every second
            skip(1), tap(beat));
            runEffects(test$, scheduler);
            timer.playTo(4);
            timer.metronome.tempo = 30;
            timer.playTo(10);
            assert.callCount(beat, 7);
        });
    });
});
//# sourceMappingURL=MetronomeTimer.test.js.map