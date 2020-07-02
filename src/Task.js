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
}

export default Task;