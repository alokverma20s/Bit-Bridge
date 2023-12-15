import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    quizName:{
        type: String,
        required: true
    },
    authorName:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizQuestion'
    }],
    type: {
        type: String,
        required: true
    },
    totalScore:{
        type: Number,
        default: 0
    },
    attempts:{
        type: Number,
        default: 0
    },
    average: {
        type: Number,
        default: 0
    },
    user:[
        {
            userName:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            },
            marks:{
                type: Number,
            }
        }

    ]
})

export default mongoose.model("Quiz", quizSchema);