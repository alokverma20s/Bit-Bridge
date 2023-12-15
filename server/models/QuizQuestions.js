import mongoose from "mongoose";

const quizQuestionSchema = mongoose.Schema({
    ques: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }],
    ans: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizAnswer'
    },
})

export default mongoose.model("QuizQuestion", quizQuestionSchema);