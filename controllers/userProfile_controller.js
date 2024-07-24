import { UserProfile } from "../models/userProfile_model.js";
import { userProfileSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";

export const createUserProfile = async (req, res) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files?.profilePicture[0].filename,
      resume: req.files?.resume[0].filename,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user.id;
   

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const profile = await UserProfile.create({ ...value, user: userId });

    user.userProfile = profile._id;

    await user.save();

    res.status(201).json({ profile });
  } catch (error) {
    console.log(error);
  }
};



export const updateUserProfile = async (req, res) => {
    try {
      const updateFields = { ...req.body };

        if (req.file?.profilePicture) {
            updateFields.profilePicture = req.file.filename;
        } else if (req.files?.profilePicture) {
            updateFields.profilePicture = req.files.profilePicture[0].filename;
        }

        if (req.file?.resume) {
            updateFields.resume = req.file.filename;
        } else if (req.files?.resume) {
            updateFields.resume = req.files.resume[0].filename;
        }

        const { error, value } = userProfileSchema.validate(updateFields);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const profile = await UserProfile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
  
      res.status(201).json({ profile });
    } catch (error) {
      console.log(error);
    }
  };
  



  export const getUserProfile = async (req, res) => {
    try {
    
        const userId = req.session?.user?.id || req?.user.id;
     
      const profile = await UserProfile.findOne({user: userId}).populate({ 
        path: 'user', 
        select: '-password' 
    });
      if (!profile) {
        return res.status(200).json({ profile});
      }
      res.status(200).json({ profile});
    } catch (error) {
      return res.status(500).json({error})
    }
  };