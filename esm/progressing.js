/**
 * ProgressingTimeline is responsible for storing tasks at a given time and
 * returns what tasks are ready at the current time. Internal to this implementation.
 */
export class ProgressingTimeline {
    constructor() {
        this.tasks = new Map();
        this.addTask = (time, f) => {
            const tasksAtTime = this.tasks.get(time) || [];
            tasksAtTime.push(f);
            this.tasks.set(time, tasksAtTime);
        };
        this.removeTask = (time, f) => {
            const tasksAtTime = this.tasks.get(time);
            if (!tasksAtTime) {
                return;
            }
            const index = tasksAtTime.findIndex((x) => x === f);
            if (index > -1) {
                tasksAtTime.splice(index, 1);
            }
            if (tasksAtTime.length === 0) {
                this.tasks.delete(time);
            }
        };
        this.readyTasks = (currentTime) => {
            const times = Array.from(this.tasks.keys());
            const timesToRun = times.filter((x) => x <= currentTime).sort();
            return timesToRun.flatMap(this.getAndDelete);
        };
        this.getAndDelete = (time) => {
            const tasks = this.tasks.get(time) || [];
            this.tasks.delete(time);
            return tasks;
        };
    }
}
export class ProgressingTimer {
    constructor() {
        this.id = 0;
        this.disposables = new Map();
    }
    delay(delay, f) {
        const time = this.clock.now() + delay;
        this.timeline.addTask(time, f);
        return { dispose: () => this.timeline.removeTask(time, f) };
    }
    runTasks() {
        const currentTime = this.clock.now();
        const tasks = this.timeline.readyTasks(currentTime);
        tasks.forEach((task) => task(currentTime));
    }
    setTimer(f, delayDuration) {
        const handle = this.id++;
        this.disposables.set(handle, this.delay(delayDuration, () => {
            this.disposables.delete(handle);
            f();
        }));
        return handle;
    }
    clearTimer(handle) {
        var _a;
        (_a = this.disposables.get(handle)) === null || _a === void 0 ? void 0 : _a.dispose();
    }
    dispose() {
        this.disposables.forEach((d) => d.dispose());
        this.disposables.clear();
    }
    now() {
        return this.clock.now();
    }
}
//# sourceMappingURL=progressing.js.map