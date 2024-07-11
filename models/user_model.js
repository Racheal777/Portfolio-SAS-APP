import { Schema, model } from "mongoose";

const userSchema = new Schema({

    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    userName: { type: String },
    termsAndConditions: { type: Boolean },
});

export const User = model("User", userSchema);
