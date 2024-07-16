
import { createUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controllers/project_controller.js";
import { checkUAuth } from "../middlewares/auth.js";

import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";


export const projectRouter = Router()

projectRouter.post('/users/projects', remoteUpload.single('image'), checkUAuth, createUserProject)

projectRouter.get('/users/projects', checkUAuth, getAllUserProjects)

projectRouter.patch('/users/projects/:id', remoteUpload.single('image'), checkUAuth, updateUserProject)

projectRouter.delete('/users/projects/:id',  checkUAuth, deleteUserProject)



