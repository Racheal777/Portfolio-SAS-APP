import { createUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievement', checkUserSession, createUserAchievement)

achievementRouter.get('/users/achievement', checkUserSession, getAllUserAchievements)

achievementRouter.patch('/users/achievement/:id', checkUserSession, updateUserAchievement)

achievementRouter.delete('/users/achievement/:id', checkUserSession, deleteUserAchievement)

