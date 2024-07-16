
import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteerings, updateUserVolunteering } from "../controllers/volunteering_controller.js";
import { checkUAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUAuth, createUserVolunteering)

volunteeringRouter.get('/users/volunteering', checkUAuth, getAllUserVolunteerings)

volunteeringRouter.patch('/users/volunteering/:id', checkUAuth, updateUserVolunteering)

volunteeringRouter.delete('/users/volunteering/:id', checkUAuth, deleteUserVolunteering)

