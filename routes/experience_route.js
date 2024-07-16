
import { createUserExperience, deleteUserExperience, getAllUserExperience, updateUserExperience } from "../controllers/experience_controller.js";
import { checkUAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const ExperienceRouter = Router()

ExperienceRouter.post('/users/experiences', checkUAuth, createUserExperience)

ExperienceRouter.get('/users/experiences', checkUAuth, getAllUserExperience)

ExperienceRouter.patch('/users/experiences/:id', checkUAuth, updateUserExperience)


ExperienceRouter.delete('/users/experiences/:id', checkUAuth, deleteUserExperience)