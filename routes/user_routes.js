import { getUser, getUsers, login, signup } from "../controllers/user_controller.js";
import { Router } from "express";
import { createUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/signup", signup);

userRouter.post("/users/login", login);

userRouter.get("/users/:userName", getUser);

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
