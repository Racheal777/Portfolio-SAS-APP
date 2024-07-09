import express from 'express'
import { dbConnection } from './config/db.js'


const app = express()



const PORT = 6000
app.use(express.json())
app.use(fruitRouter)

dbConnection()

app.listen(PORT, ()=>{
    console.log(`Server is connected to Port ${PORT}`)
})

