
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

        req.session.user = { id: addUser.id }

        return res.status(201).send(addUser)
    }


}


// Login user
export const login = async (req, res, next) => {
    try {
       const { userName, email, password } = req.body;
       //  Find a user using their email or username
       const user = await User.findOne(
          { $or: [{ email: email }, { userName: userName }] }
       );
       if (!user) {
          return res.status(401).json('User does not exist')
       }
       // Verify user password
       const correctPass = bcrypt.compareSync(password, user.password)
       if (!correctPass) {
          return res.status(401).json('Invalid login details')
       }
       // Generate a session for the user
       req.session.user = { id: user.id }

       console.log('user', req.session.user)
       // Return response
       res.status(201).json('Login successful')
    } catch (error) {
       next(error)
    }
 }


export const getUser = async (req, res) => {

    
    const userName = req.params.userName

    //get user based on the user id
    //use the select to exclude the password
    //use populate to populate the education
    const userDetails = await User.find({userName})
    .select('-password')
    .populate('education')
    .populate('userProfile')
    
       
    return res.status(201).json({user: userDetails})
    
}

