import { Education } from "../models/education_model.js";
import { educationSchema } from "../schema/user_schema.js";

export const addEducation = async (req, res) => {

   try {
    const {error, value} = educationSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    console.log('value', value)

    const education = await Education.create(value)
    res.status(201).json({education})

   } catch (error) {
    return res.status(500).send(error)
   }



}



export const getAllEducation = async (req, res) => {

    try {
        const alleducation = await Education.find()
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