"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const PulsingTimer_1 = require("./PulsingTimer");
describe('PulsingTimer', () => {
    describe('given a PulsingTimer', () => {
        it('allows running tasks when they are ready', () => {
            const timer = PulsingTimer_1.createPulsingTimer();
            const BEAT = 96; // 96 ticks per beat
            let a = false;
            timer.setTimer(() => (a = true), BEAT / 4);
            let b = false;
            timer.setTimer(() => (b = true), BEAT / 2);
            timer.pulse(BEAT / 8);
            assert_1.deepStrictEqual(a, false);
            assert_1.deepStrictEqual(b, false);
            timer.pulse(BEAT / 8);
            assert_1.deepStrictEqual(a, true);
            assert_1.deepStrictEqual(b, false);
            timer.pulse(BEAT / 4);
            assert_1.deepStrictEqual(a, true);
            assert_1.deepStrictEqual(b, true);
        });
    });
});
//# sourceMappingURL=PulsingTimer.test.js.map