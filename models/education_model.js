import { Schema, model, Types } from "mongoose";

const educationSchema = new Schema({

  schoolName: { type: String },
  location: { type: String },
  program: { type: String },
  qualification: { type: String },
  grade: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  user: {type: Types.ObjectId, ref: 'User'} 
}, {
  timestamps: true
});
export const Education = model("Education", educationSchema);
