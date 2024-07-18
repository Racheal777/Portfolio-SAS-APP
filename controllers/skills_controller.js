
import { Skill } from "../models/skills_model.js";
import { User } from "../models/user_model.js";


import { skillsSchema } from "../schema/user_schema.js";

export const createUserSkill = async (req, res) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skill.create({ ...value, user: userId });

    user.skills.push(skill._id)

    await user.save();

    res.status(201).json({ skill });
  } catch (error) {
    console.log(error);
  }
};



export const getAllUserSkills = async (req, res) => {
  try {
    //we are fetching Skill that belongs to a particular user
    const userId = req.session?.user?.id || req?.user.id;
    const allSkill = await Skill.find({ user: userId });
    if (allSkill.length == 0) {
      return res.status(200).send("No Skill added");
    }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateUserSkill = async (req, res) => {
    try {
      const { error, value } = skillsSchema.validate(req.body);

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skill.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
      res.status(200).json({ skill });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteUserSkill = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
        user.skills.pull(req.params.id);
        await user.save();
      res.status(200).json("Skill deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  