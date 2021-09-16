"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@most/core");
const function_1 = require("fp-ts/function");
const sinon_1 = require("sinon");
const index_1 = require("./index");
describe('MetronomeTimer', () => {
    describe('given a MetronomeTimer/Scheduler pair', () => {
        it('runs effects for a periodic stream at the correct rate', () => {
            const beat = sinon_1.spy();
            const [timer, scheduler] = index_1.createMetronomeScheduler(60);
            const test$ = function_1.pipe(core_1.periodic(timer.metronome.BEAT), // emit every second
            core_1.tap(beat), core_1.take(4));
            core_1.runEffects(test$, scheduler);
            timer.playTo(10);
            sinon_1.assert.callCount(beat, 4);
        });
        it('responds to dynamic tempo changes', () => {
            const beat = sinon_1.spy();
            const [timer, scheduler] = index_1.createMetronomeScheduler(60);
            const test$ = function_1.pipe(core_1.periodic(timer.metronome.BEAT), // emit every second
            core_1.skip(1), core_1.tap(beat));
            core_1.runEffects(test$, scheduler);
            timer.playTo(4);
            timer.metronome.tempo = 30;
            timer.playTo(10);
            sinon_1.assert.callCount(beat, 7);
        });
    });
});
//# sourceMappingURL=MetronomeTimer.test.js.map