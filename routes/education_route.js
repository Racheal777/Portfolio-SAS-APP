import { addEducation, deleteUserEducation, getAllUserEducation,  updateUserEducation} from "../controllers/education_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const educationRouter = Router()

educationRouter.post('/users/education', checkUserSession, addEducation)

educationRouter.get('/users/education', checkUserSession, getAllUserEducation)

educationRouter.patch('/users/education/:id', checkUserSession, updateUserEducation)

educationRouter.delete('/users/education/:id', checkUserSession, deleteUserEducation)

