import joi from 'joi'

export const userSchema = joi.object({
  
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        otherNames: joi.string(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        confirmedPassword: joi.ref('password'),
        userName: joi.string().required(),
        termsAndConditions: joi.boolean(),

    })  .with('password', 'confirmedPassword');



export const userProfileSchema = joi.object({
   
        profilePicture: joi.string(),
        location: joi.string(),
        maritalStatus: joi.string().valid('single', 'married', 'prefer-not-to-say'),
        sex: joi.string().valid('male', 'female'),
        bio: joi.string(),
        about: joi.string(),
        dateOfBirth: joi.date(),
        contact: joi.string(),
        resume: joi.string(),
        languages: joi.array().items(joi.string()),
        user: joi.string().required()
      })



export const educationSchema = joi.object({
  
    
        schoolName: joi.string().required(),
        location: joi.string(),
        program: joi.string().required(),
        qualification: joi.string().required(),
        grade: joi.string(),
        startDate: joi.string().required(),
        endDate: joi.string(),
        user: joi.string()
      })
 
      export const experienceSchema = joi.object({
        companyName: joi.string().required(),
        role: joi.string().required(),
        skills: joi.string().required(),
        responsibility: joi.string().required(),
        location: joi.string().required(),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        user: joi.string().required()
    })


export const skillsSchema = joi.object({
    name: joi.string().required(),
    levelOfProficiency: joi.string().required(),
    user: joi.string().required()
})

export const volunteeringSchema = joi.object({
    organisation: joi.string().required(),
    description: joi.string().required(),
    skills: joi.string(),
    startDate: joi.string().required(),
    endDate: joi.string(),
    role: joi.string().required(),
    responsibility: joi.string().required(),
    location: joi.string(),
    projectName: joi.string().required(),
    user: joi.string().required()
})

export const projectSchema = joi.object({
    image:joi.string().required(),
    projectName: joi.string().required(),
    description: joi.string().required(),
    contributors: joi.string().required(),
    skills: joi.string().required(),
    link: joi.string().required(),
    nameOfInstitution: joi.string().required(),
    startDate: joi.string().required(),
    endDate: joi.string(),
    user:joi.string().required()
})