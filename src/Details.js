class Details {
    constructor() {
        /** @type {string} name */
        this.name = "Unset";
        /** @type {string} description */
        this.description = undefined;
        /** @type {string} dueDate */
        this.dueDate = undefined;
        /** @type {string}  */
        this.priority = undefined;

        this.isProject = false;
        this.isTask = false;
        this.editing = false;
    }

    setProject(name = "") {
        this.name = name;
        this.description = undefined;
        this.dueDate = undefined;
        this.priority = undefined;
        this.isProject = true;
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