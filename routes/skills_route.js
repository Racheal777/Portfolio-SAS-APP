
import { createUserSkill, deleteUserSkill, getAllUserSkills, updateUserSkill } from "../controllers/skills_controller.js";
import { checkUAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const skillRouter = Router()

skillRouter.post('/users/skills', checkUAuth, createUserSkill)

skillRouter.get('/users/skills', checkUAuth, getAllUserSkills)

skillRouter.patch('/users/skills/:id', checkUAuth, updateUserSkill)

skillRouter.delete('/users/skills/:id', checkUAuth, deleteUserSkill)

