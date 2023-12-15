import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import User from "../models/auth.js"
export const getMyResult = async (req, res)=>{
    try {
        const {userid} = req.params;

        const result = await User.findById(userid, {
            result: true
        }).populate({
            path:"result",
            populate:({
                path: "quizId",
                select: {quizName: true, type: true, authorName: true, average: true},
                populate:{
                    path: "authorName",
                    select:{name:true}
                }
            }),
        })
        return res.status(200).json({
            success: true,
            message: "Result fetched successfully.",
            data: result
        })
    } catch (error) {
        
    }
}

export const QuizResult = async (req, res)=>{
    try {
        const {quizid, userid} = req.params;
        const user = await User.findById(userid);
        if(user.role !== "admin" && user.role !== "instructor"){
            return res.status(403).json({
                success: false,
                message: "Your are not allowed to see this section",
                user:user.role
            })
        }
        const quiz = await Quiz.findById(quizid,{average:true, quizName: true, type: true, questions: true}).populate({
            path:"user",
            populate:{
                path: "userName",
                select:{name: true, email: true,}
            }
        })
        return res.status(200).json({
            quiz,
            message: "fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Something went wrong"
        })
    }
}
export const Quizzes = async (req, res)=>{
    try {
        const {userid} = req.params;
        const quiz = await Quiz.find({authorName: userid},{
            quizName: true,
            authorName: true,
            type: true,
            average: true,
        })
        res.status(200).json({
            success: true,
            quiz,
            userid
        })
    } catch (error) {
        console.log(error);
    }
}