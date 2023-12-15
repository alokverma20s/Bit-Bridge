import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitle: {type: String, required: 'Question must have a title'},
    questionBody: {type: String, required: 'Question must have a title'},
    questionTags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
    noOfAnswers: {type: Number, default: 0},
    upVote: {type: [String], default:[]},
    downVote: {type: [String], default:[]},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    askedOn: {type: Date, default: Date.now},
    answer:[{
        answerBody: String,
        userAnswered: String,
        userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
        answeredOn: {type: Date, default: Date.now},
    }],
    selectedSubject:{
        type: String,
    }
})
export default mongoose.model("Queston", QuestionSchema);