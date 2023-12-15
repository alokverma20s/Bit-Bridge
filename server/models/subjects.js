import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subjectName: {type: String, required: true},
    question: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Queston"
        }
    ],
    subjectDescription: {
        type: String,
    }
})

export default mongoose.model("Subject", subjectSchema);