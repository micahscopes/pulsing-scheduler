import { deepStrictEqual } from 'assert'

import { PulsingTimer } from './PulsingTimer'

describe('PulsingTimer', () => {
  describe('given a PulsingTimer', () => {
    it('allows running tasks when they are ready', () => {
      const timer = new PulsingTimer()
      const BEAT = 96 // 96 ticks per beat
      let a = false
      timer.setTimer(() => (a = true), BEAT / 4)

      let b = false
      timer.setTimer(() => (b = true), BEAT / 2)

      timer.pulse(BEAT / 8)
      deepStrictEqual(a, false)
      deepStrictEqual(b, false)

      timer.pulse(BEAT / 8)
      deepStrictEqual(a, true)
      deepStrictEqual(b, false)

      timer.pulse(BEAT / 4)
      deepStrictEqual(a, true)
      deepStrictEqual(b, true)
    })
  })
})
