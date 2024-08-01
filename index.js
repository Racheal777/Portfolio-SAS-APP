import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { educationRouter } from "./routes/education_route.js";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import "dotenv/config";
import { projectRouter } from "./routes/project_route.js";
import { ExperienceRouter } from "./routes/experience_route.js";
import { achievementRouter } from "./routes/achievement_route.js";
import { skillRouter } from "./routes/skills_route.js";
import { volunteeringRouter } from "./routes/volunteering_route.js";
import cors from "cors";
import { restartServer } from "./restart_server.js";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import mongoose from "mongoose";
import passport from "passport";
import { authRouter } from "./routes/auth_route.js";

const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames(), 
})

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors({credentials: true, origin: '*'}));

//passport
app.use(passport.initialize())

//usse google


app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});

app.use( authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", ExperienceRouter);
app.use("/api/v1", achievementRouter);
app.use("/api/v1", skillRouter);
app.use("/api/v1", volunteeringRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

const reboot = async () => {
setInterval(restartServer, process.env.INTERVAL)
}

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
        reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`Server is connected to Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
