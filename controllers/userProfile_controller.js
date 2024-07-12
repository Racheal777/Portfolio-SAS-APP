
import { UserProfile } from "../models/userProfile_model.js";
import { userProfileSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";


export const createUserProfile = async (req, res) => {
    
    try {
        const {error , value} = userProfileSchema.validate(req.body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findById(value.user)
    if(!user){
        return res.status(404).send('User not found')
    }


    const profile = await UserProfile.create(value)

     user.userProfile = profile._id
    

    await user.save()

    res.status(201).json({profile})
    } catch (error) {
        console.log(error)
    }
}