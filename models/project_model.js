import { Schema, model, Types } from "mongoose";

const projectSchema = new Schema({
    image: { type: String },
     projectName: { type: String },
      description: { type: String },
      contributors: { type: String },
      skills: { type: String },
      link: { type: String },
      nameOfInstitution: { type: String },
      startDate: { type: String },
      endDate: { type: String },
     user: {type: Types.ObjectId, ref: 'User'}

 

    }, {
      timestamps: true
  });

export const Project= model("Project", projectSchema);
