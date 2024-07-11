import { Education } from "../models/education_model.js";
import { User } from "../models/user_model.js";
import { educationSchema } from "../schema/user_schema.js";

export const addEducation = async (req, res) => {

   try {
    const {error, value} = educationSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    //create education with the value
    const education = await Education.create(value)

    //after, find the user with the id that you passed when creating the education 
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }

    //if you find the user, push the education id you just created inside
    user.education.push(education._id);
    
    //and save the user now with the educationId
    await user.save();

    //return the education
    res.status(201).json({education})

   } catch (error) {
    return res.status(500).send(error)
   }



}



export const getAllUserEducation = async (req, res) => {

    try {
        //we are fetching education that belongs to a particular user
        const userId = req.params.id
        const alleducation = await Education.find({user: userId})
    if(alleducation.length == 0){
        return res.status(404).send('No education added')
    }
    res.status(200).json({education:alleducation})
    } catch (error) {
        
    }

}

export const getOneEducation = async (req, res) => {

    const education = await Education.findById(req.params.id)
    res.status(200).json(education)

}