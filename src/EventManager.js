import { Main } from './ProjectManager'
import * as Renderer from './RenderUI'

function pageLoadHandlers() {
    let projectAddButton = document.getElementById("project-add-button");
    let taskAddButton = document.getElementById("task-add-button");

    projectAddButton.addEventListener("click", () => {
        Main.addProject();
        Renderer.renderFull();
    });

    taskAddButton.addEventListener("click", () => {
        Main.addTask();
        Renderer.renderTasks();
        Renderer.renderDetails();
    });
}

/** @param {HTMLButtonElement} buttonReference */
function projectButtonHandler(buttonReference) {
    buttonReference.addEventListener("click", () => {
        let index = parseInt(buttonReference.getAttribute("data-index"));
        if (!Main.projects[index].isActive || Main.projects[index].isActive && Main.currentDetail.isTask) {
            Main.setActiveProject(index);
            Renderer.renderFull();
        }
    });
}

/** @param {HTMLButtonElement} buttonReference */
function taskButtonHandler(buttonReference) {
    buttonReference.addEventListener("click", () => {
        let index = parseInt(buttonReference.getAttribute("data-index"));
        if (!Main.currentProject.tasks[index].isActive) {
            Main.setActiveTask(index);
            Renderer.renderTasks();
            Renderer.renderDetails();
        }
    });
}

/** @param {HTMLButtonElement} editButton */
function enableEditsHandler(editButton) {
    editButton.addEventListener("click", () => {
        if (!Main.currentDetail.editing) {
            Renderer.switchEditButton();
            Renderer.switchInput();
            Main.currentDetail.editing = true;
        }
        else {
            let newValues = Renderer.readInput();
            if (Main.currentDetail.isTask) {
                Main.currentDetail.setTask(newValues.header, newValues.description, newValues.date, newValues.priority);
                Main.currentProject.currentTask.updateDetails(newValues.header, newValues.description, newValues.date, newValues.priority);
            }
            else {
                Main.currentDetail.setProject(newValues.header);
                Main.currentProject.name = newValues.header;
            }

            Renderer.renderFull();
            Main.currentDetail.editing = false;
        }
    });
}

/** @param {HTMLButtonElement} deleteButton */
function deleteHandler(deleteButton) {
    deleteButton.addEventListener("click", () => {
        if (Main.currentDetail.isTask) {
            Main.currentProject.deleteTask(Main.currentProject.currentTask.name);
            if (Main.currentProject.tasks.length != 0) {
                Main.currentProject.setActiveTask(Main.currentProject.tasks.length - 1);
                let task = Main.currentProject.currentTask;
                Main.currentDetail.setTask(task.name, task.description, task.dueDate, task.priority);
            }
            else {
                Main.currentProject.currentTask = null;
                Main.currentDetail.setProject(Main.currentProject.name);
            }
        }
        else {
            Main.deleteProject(Main.currentProject.name);
            if (Main.projects.length != 0) {
                Main.setActiveProject(Main.projects.length - 1);
                Main.currentDetail.setProject(Main.currentProject.name);
            }
            else {
                Main.currentProject = null;
                Main.currentDetail.setProject("No projects left");
            }
        }
        Renderer.renderFull();
    });
}

export { pageLoadHandlers, projectButtonHandler, taskButtonHandler, enableEditsHandler as enableEditsHandler, deleteHandler };