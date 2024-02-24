import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subjectName: {type: String, required: true},
    question: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Queston"
        }
    ],
    quiz: [{type: mongoose.Schema.Types.ObjectId, ref: "Quiz"}],
    subjectDescription: {
        type: String,
    }
})

export default mongoose.model("Subject", subjectSchema);