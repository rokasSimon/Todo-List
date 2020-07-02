import Project from "./Project";
import { Detail } from "./Details";
import Task from "./Task";

class ProjectManager {
    constructor() {
        /** @type {Array.<Project>} projects */
        this.projects = [];
        /** @param {Detail} detail */
        this.currentDetail = Detail;
        /** @type {Project} currentProject */
        this.currentProject = null;
    }

    /** @param {number} index */
    setActiveProject(index) {
        for (const project of this.projects) {
            project.isActive = false;
        }
        this.projects[index].isActive = true;
        this.currentProject = this.projects[index];
        this.currentProject.unactivateTasks();
        this.currentDetail.setProject(this.currentProject.name);
    }

    /** @param {number} index */
    setActiveTask(index) {
        this.currentProject.setActiveTask(index);
        let activeTask = this.currentProject.tasks[index];
        this.currentDetail.setTask(activeTask.name, activeTask.description, activeTask.dueDate, activeTask.priority);
    }

    addProject() {
        let project = new Project("", this.projects.length);
        this.projects.push(project);
        this.setActiveProject(this.projects.length - 1);
    }

    addTask() {
        let newTask = new Task(this.currentProject.tasks.length);
        this.currentProject.addTask(newTask);
        this.currentDetail.setTask();
    }

    /** @param {string} projectName */
    deleteProject(projectName) {
        let projectIndex = this.projects.findIndex((x) => x.name == projectName);
        if (projectIndex != -1 ) {
            this.projects.splice(projectIndex, 1);
        }
    }

    getProjectsFromStorage() {

    }
}

export let Main = new ProjectManager();