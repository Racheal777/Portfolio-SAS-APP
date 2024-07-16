import { getUser, getUsers, login, logout, signup, token } from "../controllers/user_controller.js";
import { Router } from "express";
import { createUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkUAuth } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/auth/session/login", login);


userRouter.post("/users/auth/token/login", token);

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/logout", logout);

userRouter.get("/users/auth/:userName", getUser);


userRouter.get( "/users/userProfile", checkUAuth, getUserProfile);

userRouter.post(
  "/users/userProfile",
  remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  checkUAuth,
  createUserProfile
);


userRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUAuth,
    updateUserProfile
  );
