
import { createUserExperience, deleteUserExperience, getAllUserExperience, updateUserExperience } from "../controllers/experience_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const ExperienceRouter = Router()

ExperienceRouter.post('/users/experiences', checkUserSession, createUserExperience)

ExperienceRouter.get('/users/experiences', checkUserSession, getAllUserExperience)

ExperienceRouter.patch('/users/experiences/:id', checkUserSession, updateUserExperience)


ExperienceRouter.delete('/users/experiences/:id', checkUserSession, deleteUserExperience)