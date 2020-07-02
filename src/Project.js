import Task from "./Task";

class Project {
    constructor(name, index) {
        /** @type {string} name */
        this.name = name;
        /** @type {Array.<Task>} tasks */
        this.tasks = [];
        this.currentTask = null;
        this.isActive = false;
        this.index = index;
    }

    /** @param {Task} task */
    addTask(task) {
        this.tasks.push(task);
        this.setActiveTask(task.index);
    }

    /** @param {number} index */
    setActiveTask(index) {
        this.unactivateTasks();
        this.currentTask = this.tasks[index];
        this.tasks[index].isActive = true;
    }

    unactivateTasks() {
        for (const task of this.tasks) {
            task.isActive = false;
        }
    }

    /** @param {string} taskName */
    deleteTask(taskName) {
        let taskIndex = this.tasks.findIndex((x) => x.name == taskName);
        if (taskIndex != -1 ) {
            this.tasks.splice(taskIndex, 1);
        }
    }
}

export default Project;