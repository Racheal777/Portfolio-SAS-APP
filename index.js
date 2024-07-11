import 'dotenv/config'
import express from 'express'
import { dbConnection } from './config/db.js'
import { userRouter } from './routes/user_routes.js'
import { educationRouter } from './routes/education_route.js'

const app = express()



const PORT = 7080
app.use(express.json())


app.use('/api/v1', userRouter)
app.use('/api/v1', educationRouter)

dbConnection()

app.listen(PORT, ()=>{
    console.log(`Server is connected to Port ${PORT}`)
})

