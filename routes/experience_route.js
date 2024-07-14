
import { createUserExperience, deleteUserExperience, getAllUserExperience, updateUserExperience } from "../controllers/experience_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const ExperienceRouter = Router()

ExperienceRouter.post('/users/experience', checkUserSession, createUserExperience)

ExperienceRouter.get('/users/experience', checkUserSession, getAllUserExperience)

ExperienceRouter.patch('/users/experience/:id', checkUserSession, updateUserExperience)


ExperienceRouter.delete('/users/experience/:id', checkUserSession, deleteUserExperience)