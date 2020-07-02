//#region IMPORTS

import { Main } from './ProjectManager'
import { pageLoadHandlers } from './EventManager'
import * as Renderer from './RenderUI'

//#endregion IMPORTS

pageLoadHandlers();
Renderer.renderProjects();
Renderer.renderDetails();