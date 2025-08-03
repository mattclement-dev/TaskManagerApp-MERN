import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
},
{timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model('User', UserSchema);