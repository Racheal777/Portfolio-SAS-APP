import { Schema, model, Types } from "mongoose";

const achievementSchema = new Schema({
  awards: { type: String },
  description: { type: String },
  image: { type: String },
  date: { type: String },
  nameOfInstitution: { type: String },
  user: {type: Types.ObjectId, ref: 'User', select:false}

 

}, {
  timestamps: true
});
export const Achievement= model("Achievement", achievementSchema);
