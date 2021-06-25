export declare type Arity1<A, B> = (value: A) => B
/**
 * PulsingTimeline is responsible for storing tasks at a given time and
 * returns what tasks are ready at the current time. Internal to this implementation.
 */
export declare class PulsingTimeline {
  private tasks
  addTask: (time: number, f: Arity1<number, any>) => void
  removeTask: (time: number, f: Arity1<number, any>) => void
  readyTasks: (currentTime: number) => Arity1<number, any>[]
  private getAndDelete
}
//# sourceMappingURL=internal.d.ts.map
