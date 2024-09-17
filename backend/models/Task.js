const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
type: String,
enum: ["pending", "completed", "due"],
default: "pending"
    },
    scheduledTime: {
        type: Date,
        required: true
    }
},{timestamps: true});

TaskSchema.index({ user: 1, status: 1, scheduledTime: 1});

module.exports = mongoose.model("Task", TaskSchema);
