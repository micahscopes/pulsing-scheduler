/**
 * PulsingTimeline is responsible for storing tasks at a given time and
 * returns what tasks are ready at the current time. Internal to this implementation.
 */
export class PulsingTimeline {
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
//# sourceMappingURL=internal.js.map