import { Main } from "./ProjectManager";

class Task {
    constructor(index) {
        this.name = "";
        this.description = "";
        this.dueDate = "";
        this.priority = "";
        this.isActive = false;
        this.index = index;
    }
    
    updateDetails(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isActive = true;
        this.index = Main.currentProject.currentTask.index;
    }

    setupFromJSON(obj) {
        this.name = obj.name;
        this.description = obj.description;
        this.dueDate = obj.dueDate;
        this.priority = obj.priority;
        this.isActive == obj.isActive;
        this.index = obj.index;
    }
}

export default Task;