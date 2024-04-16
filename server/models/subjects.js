import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subjectName: {type: String, required: true},
    semester: {type: Number, enum: [1,2,3,4,5,6,7,8]},
    question: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Queston"
        }
    ],
    quiz: [{type: mongoose.Schema.Types.ObjectId, ref: "Quiz"}],
    subjectDescription: {
        type: String,
    },
    resources:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ]
})

export default mongoose.model("Subject", subjectSchema);