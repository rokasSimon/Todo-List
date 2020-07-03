import { Main } from './ProjectManager'

const PROJECTMANAGER = "projectManager";

function storageAvailable() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");

        return true;
    }
    catch (e) {
        return false;
    }
}

function initStorage() {
    if (storageAvailable() && localStorage.getItem(PROJECTMANAGER) === null) {
        let projectManager = {
            projects: null,
            currentDetail: null,
            currentProject: null,
        };

        localStorage.setItem(PROJECTMANAGER, JSON.stringify(projectManager));

        return true;
    }
    else {
        console.log("Couldn't initialize local storage," +
        "because of something blocking it or because it is already initialized");

        return false;
    }
}

function saveToStorage() {
    if (storageAvailable) {
        let projectManager = {
            projects: null,
            currentDetail: null,
            currentProject: null,
        };

        projectManager.projects = Main.projects;
        projectManager.currentDetail = Main.currentDetail;
        projectManager.currentProject = Main.currentProject;

        localStorage.setItem(PROJECTMANAGER, JSON.stringify(projectManager));
    }
    else {
        console.log("Couldn't save to storage.");
    }
}

export { saveToStorage, initStorage, PROJECTMANAGER };