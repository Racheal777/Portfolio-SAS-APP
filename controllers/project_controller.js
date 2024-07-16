import { UserProfile } from "../models/userProfile_model.js";
import { projectSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";

import { Project } from "../models/project_model.js";

export const createUserProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({...req.body, image:req.file.filename});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await Project.create({ ...value, user: userId });

    user.projects.push(project._id)

    await user.save();

    res.status(201).json({ project });
  } catch (error) {
    console.log(error);
  }
};



export const getAllUserProjects = async (req, res) => {
  try {
    //we are fetching Project that belongs to a particular user
    const userId = req.session?.user?.id || req?.user.id;
    const allProject = await Project.find({ user: userId });
    if (allProject.length == 0) {
      return res.status(404).send("No Project added");
    }
    res.status(200).json({ Projects: allProject });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateUserProject = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate({...req.body, image:req.file.filename});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
      res.status(200).json({ project });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteUserProject = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        user.projects.pull(req.params.id);
        await user.save();
      res.status(200).json("Project deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  