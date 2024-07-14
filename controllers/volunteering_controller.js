import { UserProfile } from "../models/userProfile_model.js";
import { projectSchema, volunteeringSchema } from "../schema/user_schema.js";
import { User } from "../models/user_model.js";

import { Project } from "../models/project_model.js";
import { Volunteering } from "../models/volunteering_model.js";

export const createUserVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await Volunteering.create({
      ...value,
      user: userSessionId,
    });

    user.volunteering.push(volunteering._id);

    await user.save();

    res.status(201).json({ volunteering });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserVolunteerings = async (req, res) => {
  try {
    //we are fetching Volunteering that belongs to a particular user
    const userSessionId = req.session.user.id;
    const allVolunteering = await Volunteering.find({ user: userSessionId });
    if (allVolunteering.length == 0) {
      return res.status(404).send("No Volunteering added");
    }
    res.status(200).json({ Volunteerings: allVolunteering });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateUserVolunteering = async (req, res) => {
  try {
    const { error, value } = volunteeringSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await Volunteering.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    res.status(200).json({ Volunteering });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteUserVolunteering = async (req, res) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
    if (!volunteering) {
      return res.status(404).send("Volunteering not found");
    }

    user.volunteering.pull(req.params.id);
    await user.save();

    res.status(200).json("Volunteering deleted");
  } catch (error) {
    return res.status(500).json({ error });
  }
};
