import Subject from "../models/subjects";
import Resource from "../models/resourceModel";

const addResource = async(req, res)=>{
    try{
        const {name, description, authorId, subjectId, pdfFile, userId} = req.body;

        if(!name || !description || !authorId || !subjectId || !userId){
            console.log("incomplete resources");
            res.status(403).json({
                success: false, message: "Incomplete fields"
            })
        }

        const newResource = await Resource.create({name, description, author: authorId, subject: subjectId});
        await Subject.findByIdAndUpdate(subjectId, { 
        $push:{
            resources: newResource._id
        }})
    }catch(e){
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}