
import { createUserSkill, deleteUserSkill, getAllUserSkills, updateUserSkill } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const skillRouter = Router()

skillRouter.post('/users/skill', checkUserSession, createUserSkill)

skillRouter.get('/users/skill', checkUserSession, getAllUserSkills)

skillRouter.patch('/users/skill/:id', checkUserSession, updateUserSkill)

skillRouter.delete('/users/skill/:id', checkUserSession, deleteUserSkill)

