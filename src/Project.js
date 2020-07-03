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
        for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].index = i;
        }
    }

    /** @param {Object} obj */
    setupFromJSON(obj) {
        this.name = obj.name;

        for (const task of obj.tasks) {
            let newTask = new Task(task.index);
            newTask.setupFromJSON(task);
            this.tasks.push(newTask);
        }

        if (obj.currentTask != null) {
            let currentTask = new Task(obj.currentTask.index);
            currentTask.setupFromJSON(obj.currentTask);
            this.currentTask = currentTask;
        }

        this.isActive = obj.isActive;
        this.index = obj.index;
    }
}

export default Project;