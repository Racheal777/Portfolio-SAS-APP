import { getUser, getUsers, login, signup } from "../controllers/user_controller.js";
import { Router } from "express";
import { createUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/auth/login", login);


userRouter.post("/users/auth/signup", signup);



userRouter.get("/users/auth/:userName", getUser);


userRouter.get( "/users/userProfile", getUserProfile);

userRouter.post(
  "/users/userProfile",
  remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  checkUserSession,
  createUserProfile
);


userRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateUserProfile
  );
