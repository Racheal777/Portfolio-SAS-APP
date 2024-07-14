
import express from 'express'
import { dbConnection } from './config/db.js'
import { userRouter } from './routes/user_routes.js'
import { educationRouter } from './routes/education_route.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotenv/config'
import { projectRouter } from './routes/project_route.js'
import { ExperienceRouter } from './routes/experience_route.js'
import { achievementRouter } from './routes/achievement_route.js'
import { skillRouter } from './routes/skills_route.js'
import { volunteeringRouter } from './routes/volunteering_route.js'

const app = express()



const PORT = 7080
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Store session
    store: MongoStore.create({
        mongoUrl: process.env.connectionString
    })
})); 



app.use('/api/v1', userRouter)
app.use('/api/v1', educationRouter)
app.use('/api/v1', projectRouter)
app.use('/api/v1', ExperienceRouter)
app.use('/api/v1', achievementRouter)
app.use('/api/v1', skillRouter)
app.use('/api/v1', volunteeringRouter)

dbConnection()

app.listen(PORT, ()=>{
    console.log(`Server is connected to Port ${PORT}`)
})

