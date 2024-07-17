
import { experienceSchema, userProfileSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";
import { Experience } from "../models/experience_model.js";

export const createUserExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const experience = await Experience.create({ ...value, user: userId });

    user.experiences.push(experience._id)

    await user.save();

    res.status(201).json({ experience });
  } catch (error) {
    console.log(error);
  }
};



export const getAllUserExperience = async (req, res) => {
  try {
    //we are fetching Experience that belongs to a particular user
    const userId = req.session?.user?.id || req?.user.id;
    const allExperience = await Experience.find({ user: userId });
    if (allExperience.length == 0) {
      return res.status(404).send("No Experience added");
    }
    res.status(200).json({ Experience: allExperience });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateUserExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
      res.status(200).json({ experience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteUserExperience = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experiences.pull(req.params.id);
        await user.save();
      res.status(200).json("Experience deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  