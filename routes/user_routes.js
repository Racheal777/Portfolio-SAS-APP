import { getUser, login, signup } from "../controllers/user_controller.js";
import { Router } from "express";
import { createUserProfile } from "../controllers/userProfile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


export const userRouter = Router()

userRouter.post('/users/signup', signup)

userRouter.post('/users/login', login)

userRouter.get('/users/:userName', getUser)

userRouter.post('/users/userProfile', checkUserSession, createUserProfile)

