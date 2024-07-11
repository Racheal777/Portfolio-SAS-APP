import { addEducation, getAllEducation } from "../controllers/education_controller.js";

import { Router } from "express";


export const educationRouter = Router()

educationRouter.post('/users/education', addEducation)

educationRouter.get('/users/education', getAllEducation)

