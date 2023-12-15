import Questions from '../models/Questions.js'
import mongoose from 'mongoose'
import Subject from '../models/subjects.js';
import Tag from '../models/Tag.js';
export const AskQuestion = async (req, res) => {
    try {
        const postQuestionData = req.body;
        // console.log(postQuestionData);
        if(!postQuestionData.questionTitle || !postQuestionData.questionBody || !postQuestionData.userId || !postQuestionData.selectedSubject){
            return res.status(500).json({
                success: false,
                message:"All fields are required."
            })
        }
        const postQuestion = await Questions.create({questionTitle:postQuestionData.questionTitle,
            questionBody: postQuestionData.questionBody,
            userId: postQuestionData.userId,
            selectedSubject: postQuestionData.selectedSubject
        })
        postQuestionData.questionTags.forEach(async (tag) => {
            tag = tag.toLowerCase()
            const tagDetails = await Tag.findOne({ tagName: tag });
            if (tagDetails) {
                await Tag.findByIdAndUpdate(tagDetails._id, {
                    $push: {
                        question: postQuestion._id
                    }
                })
                await Questions.findByIdAndUpdate(postQuestion._id, {
                    $push:{
                        questionTags: tagDetails._id
                    }
                })
            } else {
                const newTag = await Tag.create({ tagName: tag, question: [postQuestion._id] })
                await Questions.findByIdAndUpdate(postQuestion._id, {
                    $push:{
                        questionTags: newTag._id
                    }
                })
            }
        })
        await Subject.findOneAndUpdate({ subjectName: postQuestion.selectedSubject }, {
            $push: {
                question: postQuestion._id
            }
        })
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't post a new question");
    }
}

export const getAllQuestion = async (req, res) => {
    try {
        const questionList = await Questions.find({}).populate({
            path: "questionTags",
            select:{tagName: true, tagDescription: true}
        }).populate({
            path:"userId",
            select:{role:true, name: true}
        }).populate({
            path:"answer.userId",
            select:{role:true, name: true}
        });;
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteQuestions = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...');
    }
    try {
        const ques = await Questions.findById(_id);
        await Questions.findByIdAndRemove(_id);
        await Subject.findOneAndUpdate({subjectName: ques.selectedSubject},
            {
                $pull:{
                    question: ques._id
                }
            })
        ques.questionTags.forEach(async(tag)=>{
            const tags = await Tag.findByIdAndUpdate(tag,{
                $pull:{
                    question: ques._id
                }
            })
            if(tags.question.length === 1){
                await Tag.findByIdAndRemove(tag);
            }
        })
        res.status(200).json("Question deleted Successfully...");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...');
    }

    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVote.findIndex((id) => id === String(userId));
        const downIndex = question.downVote.findIndex((id) => id === String(userId));

        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                question.upVote.push(userId);
            }
            else {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.downVote.push(userId);
            }
            else {
                question.downVote = question.downVote.filter((id) => id !== String(userId));
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json("Voted successfully...")
    } catch (error) {
        res.status(404).json({ message: 'id not found...' });
    }
}