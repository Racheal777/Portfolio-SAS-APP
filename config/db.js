
import mongoose from 'mongoose'

const mongo_uri = process.env.connectionString

export const dbConnection = async () => {

   try {
    await mongoose.connect(mongo_uri)
    console.log('Database connected successfully')
   } catch (error) {
    console.log(error)
   }
}



