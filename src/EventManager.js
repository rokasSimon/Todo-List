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
        if (!Main.projects[index].isActive) {
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
function enableEdits(editButton) {
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

export { pageLoadHandlers, projectButtonHandler, taskButtonHandler, enableEdits };