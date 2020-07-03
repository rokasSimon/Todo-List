class Details {
    constructor() {
        /** @type {string} name */
        this.name = "No projects";
        /** @type {string} description */
        this.description = null;
        /** @type {string} dueDate */
        this.dueDate = null;
        /** @type {string}  */
        this.priority = null;

        this.isProject = false;
        this.isTask = false;
        this.editing = false;
    }

    setProject(name = "") {
        this.name = name;
        this.description = null;
        this.dueDate = null;
        this.priority = null;
        this.isProject = null;
        this.isTask = false;
    }
    
    
    setTask(name = "", description = "", dueDate = "", priority = "") {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isProject = false;
        this.isTask = true;
    }
}

export let Detail = new Details();