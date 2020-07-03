//#region IMPORTS

import { initStorage, PROJECTMANAGER } from './Storage'
import { Main } from './ProjectManager'
import { pageLoadHandlers } from './EventManager'
import * as Renderer from './RenderUI'
import { Detail } from './Details';
import Project from './Project';

//#endregion IMPORTS

//------------------------------------------------------------------------//
//                    Put page load things here                           //
//------------------------------------------------------------------------//

if (!initStorage()) {
    let projectManager = JSON.parse(localStorage.getItem(PROJECTMANAGER));
    Main.setupProjectManagerFromStorage(projectManager);
}

pageLoadHandlers();
Renderer.renderFull();

//------------------------------------------------------------------------//