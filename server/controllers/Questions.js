import Questions from '../models/Questions.js'
import mongoose from 'mongoose'
import Subject from '../models/subjects.js';
import Tag from '../models/Tag.js';
import User from '../models/auth.js'
import cloudinary from 'cloudinary'


async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder }
    options.resource_type = "image";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.path, options);
};


export const AskQuestion = async (req, res) => {
    try {
        const postQuestionData = req.body;
        // console.log(req.body);
        // console.log(postQuestionData);
        if (!postQuestionData.questionTitle || !postQuestionData.questionBody || !postQuestionData.userId || !postQuestionData.selectedSubject || !postQuestionData.questionTags) {
            return res.status(500).json({
                success: false,
                message: "All fields are required."
            })
        }

        const file = req.file;
        const validWords = postQuestionData.questionTags;
        
        var postQuestion; // isko mat hatana
        if (file) {
            const response = await uploadFileToCloudinary(file, "Questions");
            // console.log(response);
            postQuestion = await Questions.create({
                questionTitle: postQuestionData.questionTitle,
                questionBody: postQuestionData.questionBody,
                userId: postQuestionData.userId,
                selectedSubject: postQuestionData.selectedSubject,
                imageURL: response.secure_url,
            })
        }
        else {
            postQuestion = await Questions.create({
                questionTitle: postQuestionData.questionTitle,
                questionBody: postQuestionData.questionBody,
                userId: postQuestionData.userId,
                selectedSubject: postQuestionData.selectedSubject,
                questionTagsString: validWords,
            })
        }

        await User.findByIdAndUpdate(postQuestionData.userId, {
            $push: {
                questionAsked: postQuestion._id
            }
        })

        const questionTags = [];
        let temp = "";
        for (let i = 0; i < validWords.length; i++) {
            if (validWords[i] !== " ") {
                temp += validWords[i];
            } else {
                if (temp !== "") {
                    questionTags.push(temp);
                    temp = "";
                }
            }
        }
        if (temp !== "") {
            questionTags.push(temp);
            temp = "";
        }

        questionTags?.forEach(async (tag) => {
            tag = tag.toLowerCase()
            const tagDetails = await Tag.findOne({ tagName: tag });
            if (tagDetails) {
                await Tag.findByIdAndUpdate(tagDetails._id, {
                    $push: {
                        question: postQuestion._id
                    }
                })
                await Questions.findByIdAndUpdate(postQuestion._id, {
                    $push: {
                        questionTags: tagDetails._id
                    }
                })
            } else {
                const newTag = await Tag.create({ tagName: tag, question: [postQuestion._id] })
                await Questions.findByIdAndUpdate(postQuestion._id, {
                    $push: {
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
        const {keyword, sortingcriteria, page} = req.query;
        const resultPerPage = 50;
        const skip = resultPerPage*(page-1);
        console.log(req.query);

        var query = {};
        var sort = {upVotes: -1};
        var count = {};
        if(keyword!=""){
            query = {$or:[
                {
                    questionTitle:{
                    $regex: keyword, 
                    $options: "i", //lowercase
                }},
                {
                    questionBody:{
                    $regex: keyword, //used to find all variaions of keyword 
                    $options: "i", //lowercase
                }},
                {
                    questionTagsString:{
                    $regex: keyword, 
                    $options: "i", //lowercase
                }}
                ]
            }
            count=query;
        }
        if(sortingcriteria==='nto'){
            sort = {askedOn: -1};
        }
        if(sortingcriteria==='otn'){
            sort = {askedOn: 1};
        }


        const questionList = await Questions.find(query).populate({
            path: "questionTags",
            select: { tagName: true, tagDescription: true }
        }).populate({
            path: "userId",
            select: { role: true, name: true }
        }).populate({
            path: "answer.userId",
            select: { role: true, name: true }
        }).populate({
            path: "answer.verifiedBy",
            select: { role: true, name: true }
        }).populate({
            path: "answer.rejectedBy",
            select: { role: true, name: true }
        }).sort(sort).limit(resultPerPage).skip(skip)
        const docCount = await Questions.countDocuments(count);

        res.status(200).json({questionList, docCount});
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
        await Subject.findOneAndUpdate({ subjectName: ques.selectedSubject },
            {
                $pull: {
                    question: ques._id
                }
            })
        await User.findByIdAndUpdate(ques.userId, {
            $pull: {
                questionAsked: ques._id
            }
        })
        ques.questionTags.forEach(async (tag) => {
            const tags = await Tag.findByIdAndUpdate(tag, {
                $pull: {
                    question: ques._id
                }
            })
            if (tags.question.length === 1) {
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
        question.upVotes=question.upVote.length - question.downVote.length
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json("Voted successfully...")
    } catch (error) {
        res.status(404).json({ message: 'id not found...' });
    }
}