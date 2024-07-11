
import { User } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {

    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const email = value.email

    const findIfUserExist = await User.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('User has already signed up')
    }else{

        const hashedPassword = await bcrypt.hash(value.password, 12)
         value.password = hashedPassword
        const addUser =  await User.create(value)
        return res.status(201).send(addUser)
    }


}


export const getUser = async (req, res) => {

    
    const userId = req.params.id

    //get user based on the user id
    //use the select to exclude the password
    //use populate to populate the education
    const userDetails = await User.findById(userId)
    .select('-password')
    .populate('education')
    
       
    return res.status(201).json({user: userDetails})
    
}

