import Subject from "../models/subjects.js";
import Department from "../models/department.js";

export const addSubject = async (req, res) =>{
    const {subjectName, subjectDescription, semester, department} = req.body;
    try {
        if(!subjectName){
            return res.status(403).json({
                success: false,
                message: "Subject Name is required."
            })
        }
        const createdSubject = await Subject.create({subjectName, subjectDescription, semester, department})
        await Department.findByIdAndUpdate(department,{
            $push: {
                subjects: createdSubject._id
            }
        })
        return res.status(200).json({
            success: true,
            message: "Subject created Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while creating subject."
        })
    }
}

export const getSubjects = async(req, res) =>{
    try{
        const data = await Subject.find({},{subjectName: true, subjectDescription: true});
        return res.status(200).json({
            success: true,
            message:"Subjects fetched successfully.",
            data
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }
}

export const getSubjectQuestion = async (req, res) =>{
    const {subjectId} = req.params;
    try {
        if(!subjectId){
            return res.status(404).json({
                success: false,
                message: "Subject id is required."
            })
        }
        const questions = await Subject.findById(subjectId).populate({
            path: "question",
            populate:{
                path: "questionTags"
            }
        }).populate({
            path:"question",
            populate:{
                path: "userId",
                select:{role:true, name: true}
            }
        }).populate({
            path:"question",
            populate:{
                path: "answer.userId",
                select:{role:true, name: true}
            }
        })
        return res.status(200).json({
            success: true,
            message: "fetched Successfully.",
            questions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }
}

export const getSubjectQuiz = async (req, res) => {
    const {subjectId} = req.params;
    try {
        if(!subjectId) 
        return res.status(404).json({
            success: false,
            message: "Subject id is required."
        })
        const quizzes = await Subject.findById(subjectId, {select: {quiz: true, subjectName: true, subjectDescription: true}}).populate({
            path: 'quiz',
            populate:{
                path: "authorName",
                select:{role:true, name: true}
            }
        }).select({subjectName: true, subjectDescription: true})
        return res.status(200).json({
            quizzes,
            success: true,
            message: "Quiz fetched Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }
}