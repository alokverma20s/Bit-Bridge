import Subject from "../models/subjects.js";
import Resource from "../models/resourceModel.js";

import cloudinary from 'cloudinary';


async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder}
    options.resource_type = "auto";
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.path, options);
};


export const addResource = async(req, res)=>{
    try{
        const {resourceName, description, authorId, subjectId, userId} = req.body;
        const file = req.file;

        // console.log(req.file);
        console.log(file);
        

        const response = await uploadFileToCloudinary(file, "Folder1");

        if(!description){
            console.log("incomplete resources");
            return res.status(403).json({
                success: false, message: "Incomplete fields"
            })
        }

        console.log(response);
        const newResource = await Resource.create({resourceName, description, author: authorId, subject: subjectId});
        await Subject.findByIdAndUpdate(subjectId, { 
        $push:{
            resources: newResource._id
        }})

        res.status(200).json({
            success: true, message: "resource added successfully"
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}