import * as Events from './EventManager'
import { Main } from './ProjectManager'
import { saveToStorage } from './Storage'

function renderFull() {
    renderProjects();
    renderTasks();
    renderDetails();

    saveToStorage();
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

    if (Main.currentProject != null) {
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
    }

    taskContainer.replaceWith(newTasks);
}

function renderDetails() {
    let informationContainer = document.getElementById("information-container");

    let newDetails = document.createElement("div");
    newDetails.id = "information-container";

    if (Main.currentDetail.isTask) {
        let header = generateHeader();
        let date = generateDate();
        let description = generateDescription();
        let priority = generatePriority();
        let buttons = generateButtonDiv();

        newDetails.append(header, date, description, priority, buttons);
    }
    else {
        let header = generateHeader();
        let buttons = generateButtonDiv();

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

    let output = { header: header.value, date: null, description: null, priority: null };

    if (Main.currentDetail.isTask && date != null) {
        output.date = date.value;
        output.description = description.value;
        output.priority = priority.value;
    }

    return output;
}

function generateHeader() {
    let header = document.createElement("input");

    header.id = "details-header";
    header.classList.add("details");
    header.placeholder = "You haven't set a name";
    header.type = "text";
    header.value = Main.currentDetail.name;
    header.readOnly = true;

    return header;
}

function generateDate() {
    let date = document.createElement("input");

    date.id = "details-date";
    date.classList.add("details");
    date.type = "date";
    date.value = Main.currentDetail.dueDate;
    date.placeholder = "You haven't set a date";
    date.readOnly = true;

    return date;
}

function generateDescription() {
    let description = document.createElement("textarea");

    description.id = "details-description";
    description.classList.add("details");
    description.placeholder = "You haven't set a description";
    description.value = Main.currentDetail.description;
    description.readOnly = true;

    return description;
}

function generatePriority() {
    let priority = document.createElement("select");
    let low = document.createElement("option");
    let medium = document.createElement("option");
    let high = document.createElement("option");

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

    return priority;
}

function generateButtonDiv() {
    let buttons = document.createElement("div");
    let update = document.createElement("button");
    let deleteButton = document.createElement("button");

    let editImg = document.createElement("i");
    editImg.classList.add("fas", "fa-edit");
    let delImg = document.createElement("i");
    delImg.classList.add("fas", "fa-trash-alt");
        
    buttons.id = "details-buttons";

    update.id = "details-update";
    update.append(editImg);
    Events.enableEditsHandler(update);
    deleteButton.id = "details-delete";
    deleteButton.append(delImg);
    Events.deleteHandler(deleteButton);

    buttons.append(update, deleteButton);

    return buttons;
}

export { renderFull, renderProjects, renderTasks, renderDetails, switchEditButton, switchInput, readInput };