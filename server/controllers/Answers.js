import mongoose, { Query } from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async (req, res) =>{
    const {id: _id} = req.params;
    const {noOfAnswers, answerBody, userAnswered, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    updateNoOfAnswer(_id, noOfAnswers);
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: {'answer' : [{answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion);
    }
    catch(error){
        res.status(400).json(error);
    }
}

const updateNoOfAnswer = async(_id, noOfAnswers)=>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async (req, res)=>{
    const {id: _id} = req.params;
    const {answerId, noOfAnswers} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send('question unavailable...')
    }
    updateNoOfAnswer(_id, noOfAnswers);

    try {
        await Questions.updateOne(
            {_id},
            { $pull: {'answer': { _id: answerId}}}
        )
        res.status(200).json({message: "Successfully deleted..."});
    } catch (error) {
        res.status(404).json(error)
    }
    
}

export const voteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId, answerId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...');
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('Answer unavailable...');
    }

    try {
        const question = await Questions.findById(_id);
        const ansArray = question.answer;
        let targettedAnswer;
        ansArray.forEach(ans => {
            if(ans._id == answerId) {
                targettedAnswer = ans;
            }
        });
        const upIndex = targettedAnswer.upVote.findIndex((id) => id === String(userId));
        const downIndex = targettedAnswer.downVote.findIndex((id) => id === String(userId));

        if (value === 'upVote') {
            if (downIndex !== -1) {
                targettedAnswer.downVote = targettedAnswer.downVote.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                targettedAnswer.upVote.push(userId);
            }
            else {
                targettedAnswer.upVote = targettedAnswer.upVote.filter((id) => id !== String(userId));
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1) {
                targettedAnswer.upVote = targettedAnswer.upVote.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                targettedAnswer.downVote.push(userId);
            }
            else {
                targettedAnswer.downVote = targettedAnswer.downVote.filter((id) => id !== String(userId));
            }
        }
        ansArray.forEach(ans => {
            if(ans._id == answerId) {
                ans = targettedAnswer;
            }
        });
        question.answer = ansArray;
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json("Voted successfully...")
    } catch (error) {
        res.status(404).json({ message: 'id not found...' });
    }
}