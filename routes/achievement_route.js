import { createUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements',remoteUpload.single('image'), checkUserSession, createUserAchievement)

achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements)

achievementRouter.patch('/users/achievements/:id', remoteUpload.single('image'), checkUserSession, updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement)

