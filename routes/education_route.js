import { addEducation, deleteUserEducation, getAllUserEducation,  updateUserEducation} from "../controllers/education_controller.js";
import { checkUAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const educationRouter = Router()

educationRouter.post('/users/education', checkUAuth, addEducation)

educationRouter.get('/users/education', checkUAuth, getAllUserEducation)

educationRouter.patch('/users/education/:id', checkUAuth, updateUserEducation)

educationRouter.delete('/users/education/:id', checkUAuth, deleteUserEducation)

