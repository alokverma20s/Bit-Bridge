import Option from '../models/Option.js';
import Quiz from '../models/Quiz.js'
import QuizQuestions from '../models/QuizQuestions.js';
import User from '../models/auth.js';
import QuizAnswer from "../models/quizAnswer.js"

export const createQuiz = async (req, res) => {
    try {
        console.log(req.body);
        const { quizName, quizAuthor, quizType, currentquiz } = req.body;

        const quizCreated = await Quiz.create({ quizName: quizName, authorName: quizAuthor, type: quizType });

        currentquiz.forEach(async (question) => {
            const options = question.options;
            const ans = question.ans;
            const answerDescription = question.answerDescription;
            const ques = question.ques;

            const quesDetails = await QuizQuestions.create({ ques });
            var ansDetails;
            options.forEach(async option => {
                var optionDetails = await Option.create({ option });
                await QuizQuestions.findByIdAndUpdate(quesDetails._id, {
                    $push: {
                        options: optionDetails._id
                    }
                }, { new: true })
                if (ans.toLowerCase() === option.toLowerCase()) {
                    ansDetails = await QuizAnswer.create({ answer: optionDetails._id, answerDescription })
                    await QuizQuestions.findByIdAndUpdate(quesDetails._id, { ans: ansDetails._id, answerTitle: option });
                }
            });
            await Quiz.findByIdAndUpdate(quizCreated._id, {
                $push: {
                    questions: quesDetails._id
                }
            }, { new: true })
        })

        res.status(200).json({
            message: "Quiz Created Successfully",
            // data: quizCreated
        });
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't Create a new quiz");
    }
}

export const getAllQuiz = async (req, res) => {
    try {
        const allQuiz = await Quiz.find({}, {
            _id: true,
            quizName: true,
            type: true,
            authorName: true
        }).populate({
            path: "authorName",
            select: { name: true }
        });
        return res.status(200).json({
            success: true,
            allQuiz,
            message: "Quiz fetched Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching quizzes."
        })
    }
}

export const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId)
            .populate(
                {
                    path: "questions",
                    populate: {
                        path: "options",
                    },
                }
            )
            .populate(
                {
                    path: "questions",
                    populate: {
                        path: "ans",
                        populate: {
                            path: "answer"
                        }
                    },
                }
            ).exec();

        return res.status(200).json({
            success: true,
            message: "Quiz fetched Successfully.",
            quiz
        })
    } catch (error) {
        console.log(error);
        res.status(409).json("Unable to fetch quiz");
    }
}

export const addQuestion = async (req, res) => {
    const { quizId, ques, options, ans, answerDescription } = req.body;
    try {
        const quesDetails = await QuizQuestions.create({ ques });
        var ansDetails;
        options.forEach(async option => {
            var optionDetails = await Option.create({ option });
            await QuizQuestions.findByIdAndUpdate(quesDetails._id, {
                $push: {
                    options: optionDetails._id
                }
            }, { new: true })
            if (ans === option) {
                ansDetails = await QuizAnswer.create({ answer: optionDetails._id, answerDescription })
                await QuizQuestions.findByIdAndUpdate(quesDetails._id, { ans: ansDetails._id, answerTitle: option });
            }
        });
        await Quiz.findByIdAndUpdate(quizId, {
            $push: {
                questions: quesDetails._id
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Question Added Successfully."

        })

    } catch (error) {
        return res.status(500).json({
            success: false,

            message: "something went wrong while creating a question.",
            error: error.message
        })
    }
}

export const getAllQuesitons = async (req, res) => {
    try {
        const allQuestion = await QuizQuestions.find({}).populate({ path: "options" }).exec();;
        res.status(200).json({
            success: true,
            data: allQuestion,
            message: "All question fetched successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong while fetching a question."
        })
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        const { quesId } = req.body;
        const questionDetails = await QuizQuestions.findById(quesId);
        questionDetails.options.forEach(async (optionId) => {
            await Option.findByIdAndDelete(optionId);
        })
        await QuizAnswer.findByIdAndDelete(questionDetails.ans);
        await QuizQuestions.findByIdAndDelete(quesId);

        return res.status(200).json({
            success: true,
            message: "Question Deleted Successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while deleting a question."
        })
    }
}

async function deleteQuestionWhileDeletingQuiz(quesId) {
    let message = "";
    try {
        const questionDetails = await QuizQuestions.findById(quesId);
        questionDetails.options.forEach(async (optionId) => {
            await Option.findByIdAndDelete(optionId);
        })
        await QuizAnswer.findByIdAndDelete(questionDetails.ans);
        await QuizQuestions.findByIdAndDelete(quesId);

        message = "Question Deleted Successfully."

        return message;

    } catch (error) {
        message = "Something went wrong.";
        return message;
    }
}

export const deleteQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const quizDetails = await Quiz.findById(quizId);

        quizDetails.questions.forEach(async (question) => {
            deleteQuestionWhileDeletingQuiz(question);
        })
        await Quiz.findByIdAndDelete(quizId);
        res.status(200).json({
            success: true,
            message: "Quiz Deleted Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Something went wrong, while deleting quiz."
        })
    }
}

export const submitQuiz = async (req, res) => {
    try {

        // console.log(req.body);
        const { ansArray, userid, quizid } = req.body;
        let cnt = 0, i = 0;
        let user;
        ansArray.forEach(async (ans) => {
            const check = await QuizAnswer.find({ answer: ans }).exec()
            i++;
            // console.log(check, i, cnt, ansArray.length);
            if (check.length !== 0) {
                cnt++;
                // console.log(cnt);
            }
            if (i === ansArray.length) {
                user = await User.findByIdAndUpdate(userid, {
                    $push: {
                        result: {
                            quizId: quizid,
                            marks: cnt,
                            totalMarks: ansArray.length
                        }
                    }
                }, { new: true })
                const quizDetails = await Quiz.findById(quizid);
                var totalScore = quizDetails.totalScore ?
                    quizDetails.totalScore : 0;
                totalScore = totalScore + cnt;
                var attempts = quizDetails.attempts ? quizDetails.attempts : 0;
                attempts = attempts + 1;
                var average = quizDetails.average ? quizDetails.average : 0;
                average = totalScore/attempts;
                await Quiz.findByIdAndUpdate(quizid, {
                    $set: { totalScore: totalScore, attempts: attempts,
                    average: average },
                    $push:{
                        user:{
                            userName: userid,
                            marks: cnt
                        },

                    }
                }, { upsert: true })
            }
        })


        res.status(200).json({
            success: true,
            message: "Successfully Submitted."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while calculating response."
        })
    }
}