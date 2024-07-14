import {Schema, model, Types} from 'mongoose';

// Define the Mongoose schema
const skillSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    levelOfProficiency: {
        type: String,
        enum:['beginner', 'advanced', 'expert']
    },
    user: {type: Types.ObjectId, ref: 'User', select:false}
}, {
    timestamps: true
});

export const Skill = model('Skill', skillSchema);


