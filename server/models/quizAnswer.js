import mongoose, { mongo } from "mongoose";

const quizAnswerSchema = new mongoose.Schema({
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Option'
    },
    answerTitle:{
        type:String,
    },
    answerDescription: {
        type:String,
    }
})

export default mongoose.model("QuizAnswer", quizAnswerSchema);
