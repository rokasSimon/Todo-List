import { default as Project } from "./Project";
import { default as Task } from "./Task";
import { default as Details } from "./Details";
import * as Events from './EventManager'
import { Main } from './ProjectManager'

function renderFull() {
    renderProjects();
    renderTasks();
    renderDetails();
}

function renderProjects() {
    let projectContainer = document.getElementById("project-container");

    let newProjects = document.createElement("div");
    newProjects.id = "project-container";

    for (const project of Main.projects) {
        let button = document.createElement("button");
        let index = document.createAttribute("data-index");
        index.value = project.index;
        button.classList.add("project", "project-list-item");
        if (project.isActive) button.classList.add("active-item");
        button.textContent = project.name;
        button.setAttributeNode(index);
        Events.projectButtonHandler(button);

        newProjects.append(button);
    }

    projectContainer.replaceWith(newProjects);
}

function renderTasks() {
    let taskContainer = document.getElementById("task-container");

    let newTasks = document.createElement("div");
    newTasks.id = "task-container";

    for (const task of Main.currentProject.tasks) {
        let button = document.createElement("button");
        let index = document.createAttribute("data-index");
        index.value = task.index;
        button.classList.add("task");
        if (task.isActive) button.classList.add("active-item");
        button.textContent = task.name;
        button.setAttributeNode(index);
        Events.taskButtonHandler(button);

        newTasks.append(button);
    }

    taskContainer.replaceWith(newTasks);
}

function renderDetails() {
    let informationContainer = document.getElementById("information-container");

    let newDetails = document.createElement("div");
    newDetails.id = "information-container";

    if (Main.currentDetail.isTask) {
        let header = document.createElement("input");
        let date = document.createElement("input");
        let description = document.createElement("textarea");
        let priority = document.createElement("select");
        let low = document.createElement("option");
        let medium = document.createElement("option");
        let high = document.createElement("option");
        let buttons = document.createElement("div");
        let update = document.createElement("button");
        let deleteButton = document.createElement("button");

        let editImg = document.createElement("i");
        editImg.classList.add("fas", "fa-edit");
        let delImg = document.createElement("i");
        delImg.classList.add("fas", "fa-trash-alt");

        header.id = "details-header";
        header.classList.add("details");
        header.placeholder = "You haven't set a name";
        header.type = "text";
        header.value = Main.currentDetail.name;
        header.readOnly = true;

        date.id = "details-date";
        date.classList.add("details");
        date.type = "date";
        date.value = Main.currentDetail.dueDate;
        date.placeholder = "You haven't set a date";
        date.readOnly = true;

        description.id = "details-description";
        description.classList.add("details");
        description.placeholder = "You haven't set a description";
        description.value = Main.currentDetail.description;
        description.readOnly = true;

        priority.id = "details-select";
        priority.classList.add("details", "details-select");
        priority.disabled = true;

        low.value = "Low";
        low.textContent = "Low";
        medium.value = "Medium";
        medium.textContent = "Medium";
        high.value = "High";
        high.textContent = "High";

        priority.add(low);
        priority.add(medium);
        priority.add(high);

        priority.value = Main.currentDetail.priority;

        buttons.id = "details-buttons";

        update.id = "details-update";
        update.append(editImg);
        Events.enableEdits(update);
        deleteButton.id = "details-delete";
        deleteButton.append(delImg);

        buttons.append(update, deleteButton);

        newDetails.append(header, date, description, priority, buttons);
    }
    else {
        let header = document.createElement("input");
        let buttons = document.createElement("div");
        let update = document.createElement("button");
        let deleteButton = document.createElement("button");

        let editImg = document.createElement("i");
        editImg.classList.add("fas", "fa-edit");
        let delImg = document.createElement("i");
        delImg.classList.add("fas", "fa-trash-alt");

        header.id = "details-header";
        header.classList.add("details");
        header.placeholder = "You haven't set a name";
        header.type = "text";
        header.value = Main.currentDetail.name;
        header.readOnly = true;

        buttons.id = "details-buttons";

        update.id = "details-update";
        update.append(editImg);
        Events.enableEdits(update);
        deleteButton.id = "details-delete";
        deleteButton.append(delImg);

        buttons.append(update, deleteButton);

        newDetails.append(header, buttons);
    }

    informationContainer.replaceWith(newDetails);
}

function switchEditButton() {
    let editIcon = document.getElementById("details-update").getElementsByTagName("i")[0];

    editIcon.classList.toggle("fa-edit");
    editIcon.classList.toggle("fa-check");
}

function switchInput() {
    let header = document.getElementById("details-header");
    let date = document.getElementById("details-date");
    let description = document.getElementById("details-description");
    let priority = document.getElementById("details-select");

    if (date != null && description != null && priority != null) {
        header.readOnly = false;
        date.readOnly = false;
        description.readOnly = false;
        priority.disabled = false;
    }
    else {
        header.readOnly = header.readOnly ? false : true;
    }
}

function readInput() {
    let header = document.getElementById("details-header");
    let date = document.getElementById("details-date");
    let description = document.getElementById("details-description");
    let priority = document.getElementById("details-select");

    let output = { header: header.value, date: undefined, description: undefined, priority: undefined };

    if (Main.currentDetail.isTask && date != null) {
        output.date = date.value;
        output.description = description.value;
        output.priority = priority.value;
    }

    return output;
}

export { renderFull, renderProjects, renderTasks, renderDetails, switchEditButton, switchInput, readInput };