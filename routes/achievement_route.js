import { createUserAchievement, deleteUserAchievement, getAllUserAchievements, updateUserAchievement } from "../controllers/achievement_controller.js";
import { checkUAuth } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements',remoteUpload.single('image'), checkUAuth, createUserAchievement)

achievementRouter.get('/users/achievements', checkUAuth, getAllUserAchievements)

achievementRouter.patch('/users/achievements/:id', remoteUpload.single('image'), checkUAuth, updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', checkUAuth, deleteUserAchievement)

