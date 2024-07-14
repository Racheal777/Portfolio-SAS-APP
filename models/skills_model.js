import {Schema, model, Types} from 'mongoose';

// Define the Mongoose schema
const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    levelOfProficiency: {
        type: String,
        required: true,
    },
    user: {type: Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
});


export const Skill = model('Skill', skillSchema);


