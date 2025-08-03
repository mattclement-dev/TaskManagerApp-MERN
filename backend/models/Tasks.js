import mongoose from 'mongoose';
import { text } from 'express';

const todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },

});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Pending', 'In-Progress', 'Completed'], default: 'Pending' },
    dueDate: { type: Date, default: null },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    attachments: [{ type: String }], // Array of attachment URLs
    todoChecklist: [todoSchema], // Array of todo items
    progress: { type: Number, default: 0 }, // Percentage of task completion

}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields


export default mongoose.model('Task', taskSchema);