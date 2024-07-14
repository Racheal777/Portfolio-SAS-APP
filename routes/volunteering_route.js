
import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteerings, updateUserVolunteering } from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createUserVolunteering)

volunteeringRouter.get('/users/volunteering', checkUserSession, getAllUserVolunteerings)

volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, updateUserVolunteering)

volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteUserVolunteering)

