import { Disposable, Handle, Timer } from '@most/types'

import { Arity1, PulsingTimeline } from './internal'
import { createPulsingClock, PulsingClock } from './PulsingClock'

/**
 * A PulsingTimer is an extension of @most/core's built-in Timer, but when progressing time
 * it will run any tasks at or before the time progressed to. It implements a Disposable instance
 * in the event you would like to remove all tasks previously scheduled.
 */
export interface PulsingTimer extends Timer, PulsingClock, Disposable {}

export function createPulsingTimer(
  clock: PulsingClock = createPulsingClock(),
  defaultDuration: number = 1,
): PulsingTimer {
  const timeline = new PulsingTimeline()

  function delay(delayPulsings: number, f: Arity1<number, any>): Disposable {
    const time = clock.now() + delayPulsings

    timeline.addTask(time, f)
    return { dispose: () => timeline.removeTask(time, f) }
  }

  function runTasks() {
    const currentTime = clock.now()
    const tasks = timeline.readyTasks(currentTime)

    tasks.forEach((task) => task(currentTime))
  }

  let id = 0
  const disposables = new Map<Handle, Disposable>()

  function setTimer(f: () => void, delayPulsings: number): Handle {
    const handle = id++

    disposables.set(
      handle,
      delay(delayPulsings, () => {
        disposables.delete(handle)
        f()
      }),
    )

    return handle
  }

  function clearTimer(handle: Handle) {
    disposables.get(handle)?.dispose()
  }

  function dispose() {
    disposables.forEach((d) => d.dispose())
    disposables.clear()
  }

  return {
    ...clock,
    setTimer,
    clearTimer,
    dispose,
    pulse: (duration: number = defaultDuration) => {
      const time = clock.pulse(duration)

      runTasks()

      return time
    },
  }
}
