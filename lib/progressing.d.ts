import { Clock, Disposable, Handle, Timer } from '@most/types'
declare type Arity1<A, B> = (value: A) => B
/**
 * ProgressingTimeline is responsible for storing tasks at a given time and
 * returns what tasks are ready at the current time. Internal to this implementation.
 */
export declare class ProgressingTimeline {
  private tasks
  addTask: (time: number, f: Arity1<number, any>) => void
  removeTask: (time: number, f: Arity1<number, any>) => void
  readyTasks: (currentTime: number) => Arity1<number, any>[]
  private getAndDelete
}
export declare abstract class ProgressingTimer implements Timer, Disposable {
  abstract readonly timeline: ProgressingTimeline
  protected abstract clock: Clock
  delay(delay: number, f: Arity1<number, any>): Disposable
  runTasks(): void
  protected id: number
  protected disposables: Map<any, Disposable>
  setTimer(f: () => void, delayDuration: number): Handle
  clearTimer(handle: Handle): void
  dispose(): void
  now(): number
}
export {}
//# sourceMappingURL=progressing.d.ts.map
