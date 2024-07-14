
import { createUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";


export const projectRouter = Router()

projectRouter.post('/users/project', remoteUpload.single('image'), checkUserSession, createUserProject)

projectRouter.get('/users/project', checkUserSession, getAllUserProjects)

projectRouter.patch('/users/project/:id', remoteUpload.single('image'), checkUserSession, updateUserProject)

projectRouter.delete('/users/project/:id',  checkUserSession, deleteUserProject)



