import { Clock, Disposable, Handle, Timer } from '@most/types'
type Arity1<A, B> = (value: A) => B

/**
 * ProgressingTimeline is responsible for storing tasks at a given time and
 * returns what tasks are ready at the current time. Internal to this implementation.
 */
export class ProgressingTimeline {
  private tasks: Map<number, Arity1<number, any>[]> = new Map()

  public addTask = (time: number, f: Arity1<number, any>) => {
    const tasksAtTime = this.tasks.get(time) || []

    tasksAtTime.push(f)

    this.tasks.set(time, tasksAtTime)
  }

  public removeTask = (time: number, f: Arity1<number, any>) => {
    const tasksAtTime = this.tasks.get(time)

    if (!tasksAtTime) {
      return
    }

    const index = tasksAtTime.findIndex((x) => x === f)

    if (index > -1) {
      tasksAtTime.splice(index, 1)
    }

    if (tasksAtTime.length === 0) {
      this.tasks.delete(time)
    }
  }

  public readyTasks = (currentTime: number) => {
    const times = Array.from(this.tasks.keys())
    const timesToRun = times.filter((x) => x <= currentTime).sort()

    return timesToRun.flatMap(this.getAndDelete)
  }

  private getAndDelete = (time: number) => {
    const tasks = this.tasks.get(time)! || []

    this.tasks.delete(time)

    return tasks
  }
}

export abstract class ProgressingTimer implements Timer, Disposable {
  abstract readonly timeline: ProgressingTimeline
  protected abstract clock: Clock

  delay(delay: number, f: Arity1<number, any>): Disposable {
    const time = this.clock.now() + delay

    this.timeline.addTask(time, f)
    return { dispose: () => this.timeline.removeTask(time, f) }
  }

  runTasks() {
    const currentTime = this.clock.now()
    const tasks = this.timeline.readyTasks(currentTime)

    tasks.forEach((task) => task(currentTime))
  }

  protected id = 0
  protected disposables = new Map<Handle, Disposable>()

  setTimer(f: () => void, delayDuration: number): Handle {
    const handle = this.id++

    this.disposables.set(
      handle,
      this.delay(delayDuration, () => {
        this.disposables.delete(handle)
        f()
      }),
    )

    return handle
  }

  clearTimer(handle: Handle) {
    this.disposables.get(handle)?.dispose()
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose())
    this.disposables.clear()
  }

  now() {
    return this.clock.now()
  }
}
